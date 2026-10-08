from typing import List, Optional
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.schemas import APIResponse, PerformanceCreate
from app.services.services import PerformanceService
from app.dependencies.auth import get_current_user, require_roles
from app.models.models import User, UserRole

router = APIRouter(prefix="/api/performance", tags=["Performance"])

@router.get("", response_model=APIResponse[List[dict]])
def get_performance(
    employee_id: Optional[int] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    records = PerformanceService.get_performance(db, employee_id)
    return APIResponse(success=True, message="Performance records retrieved", data=records)

@router.post("", response_model=APIResponse[dict], status_code=status.HTTP_201_CREATED)
def create_performance(
    data: PerformanceCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles([UserRole.ADMIN, UserRole.HR, UserRole.MANAGER]))
):
    record = PerformanceService.create_performance(db, data, current_user.id)
    return APIResponse(success=True, message="Performance evaluation recorded", data=record)
