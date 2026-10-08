from typing import List, Optional
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.schemas import APIResponse, LeaveCreate, LeaveReview
from app.services.services import LeaveService
from app.dependencies.auth import get_current_user, require_roles
from app.models.models import User, UserRole

router = APIRouter(prefix="/api/leaves", tags=["Leaves"])

@router.get("", response_model=APIResponse[List[dict]])
def get_leaves(
    employee_id: Optional[int] = None,
    status: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    leaves = LeaveService.get_leaves(db, employee_id, status)
    return APIResponse(success=True, message="Leave requests fetched successfully", data=leaves)

@router.post("", response_model=APIResponse[dict], status_code=status.HTTP_201_CREATED)
def create_leave(
    data: LeaveCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    leave = LeaveService.create_leave(db, data)
    return APIResponse(success=True, message="Leave request submitted successfully", data=leave)

@router.post("/{id}/approve", response_model=APIResponse[dict])
def approve_leave(
    id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles([UserRole.ADMIN, UserRole.HR, UserRole.MANAGER]))
):
    leave = LeaveService.approve_leave(db, id, current_user.id)
    return APIResponse(success=True, message="Leave request approved", data=leave)

@router.post("/{id}/reject", response_model=APIResponse[dict])
def reject_leave(
    id: int,
    data: Optional[LeaveReview] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles([UserRole.ADMIN, UserRole.HR, UserRole.MANAGER]))
):
    reason = data.rejection_reason if data else None
    leave = LeaveService.reject_leave(db, id, current_user.id, reason)
    return APIResponse(success=True, message="Leave request rejected", data=leave)
