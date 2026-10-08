from datetime import date
from typing import List, Optional
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.schemas import APIResponse, AttendanceCheckIn, AttendanceCheckOut
from app.services.services import AttendanceService
from app.dependencies.auth import get_current_user
from app.models.models import User

router = APIRouter(prefix="/api/attendance", tags=["Attendance"])

@router.get("", response_model=APIResponse[List[dict]])
def get_attendance(
    employee_id: Optional[int] = None,
    start_date: Optional[date] = None,
    end_date: Optional[date] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    records = AttendanceService.get_attendance(db, employee_id, start_date, end_date)
    return APIResponse(success=True, message="Attendance records retrieved", data=records)

@router.post("/check-in", response_model=APIResponse[dict])
def check_in(
    data: AttendanceCheckIn,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    record = AttendanceService.check_in(db, data)
    return APIResponse(success=True, message="Check-in successful", data=record)

@router.post("/check-out", response_model=APIResponse[dict])
def check_out(
    data: AttendanceCheckOut,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    record = AttendanceService.check_out(db, data)
    return APIResponse(success=True, message="Check-out successful", data=record)
