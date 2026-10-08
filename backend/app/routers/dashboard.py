from typing import List, Dict, Any
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.schemas import APIResponse
from app.services.services import DashboardService
from app.dependencies.auth import get_current_user
from app.models.models import User

router = APIRouter(prefix="/api/dashboard", tags=["Dashboard"])

@router.get("/stats", response_model=APIResponse[Dict[str, Any]])
def get_dashboard_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    stats = DashboardService.get_stats(db)
    return APIResponse(success=True, message="Dashboard stats retrieved", data=stats)

@router.get("/attendance-chart", response_model=APIResponse[List[Dict[str, Any]]])
def get_attendance_chart(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    chart_data = DashboardService.get_attendance_chart(db)
    return APIResponse(success=True, message="Attendance chart data retrieved", data=chart_data)

@router.get("/task-statistics", response_model=APIResponse[List[Dict[str, Any]]])
def get_task_statistics(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    task_stats = DashboardService.get_task_statistics(db)
    return APIResponse(success=True, message="Task statistics retrieved", data=task_stats)

@router.get("/project-progress", response_model=APIResponse[List[Dict[str, Any]]])
def get_project_progress(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    proj_progress = DashboardService.get_project_progress(db)
    return APIResponse(success=True, message="Project progress data retrieved", data=proj_progress)

@router.get("/recent-activity", response_model=APIResponse[List[Dict[str, Any]]])
def get_recent_activity(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    activities = DashboardService.get_recent_activity(db)
    return APIResponse(success=True, message="Recent activity retrieved", data=activities)
