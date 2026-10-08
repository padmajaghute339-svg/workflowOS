from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.schemas import APIResponse
from app.services.services import NotificationService
from app.dependencies.auth import get_current_user
from app.models.models import User

router = APIRouter(prefix="/api/notifications", tags=["Notifications"])

@router.get("", response_model=APIResponse[List[dict]])
def get_notifications(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    notifs = NotificationService.get_user_notifications(db, current_user.id)
    return APIResponse(success=True, message="Notifications retrieved", data=notifs)

@router.put("/{id}/read", response_model=APIResponse[dict])
def mark_read(
    id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    NotificationService.mark_read(db, id, current_user.id)
    return APIResponse(success=True, message="Notification marked as read", data={"id": id})

@router.put("/read-all", response_model=APIResponse[dict])
def mark_all_read(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    NotificationService.mark_all_read(db, current_user.id)
    return APIResponse(success=True, message="All notifications marked as read", data={})
