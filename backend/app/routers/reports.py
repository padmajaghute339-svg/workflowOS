from typing import Optional, Dict, Any, List
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.schemas import APIResponse
from app.services.services import EmployeeService, ProjectService, TaskService, AttendanceService, LeaveService, PerformanceService
from app.dependencies.auth import get_current_user
from app.models.models import User

router = APIRouter(prefix="/api/reports", tags=["Reports"])

@router.get("/summary", response_model=APIResponse[Dict[str, Any]])
def get_report_summary(
    report_type: str = Query("employees", description="Type of report: employees, attendance, tasks, projects, leaves, performance"),
    department_id: Optional[int] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if report_type == "employees":
        data = EmployeeService.get_employees(db, dept_id=department_id)
    elif report_type == "projects":
        data = ProjectService.get_projects(db)
    elif report_type == "tasks":
        data = TaskService.get_tasks(db)
    elif report_type == "attendance":
        data = AttendanceService.get_attendance(db)
    elif report_type == "leaves":
        data = LeaveService.get_leaves(db)
    elif report_type == "performance":
        data = PerformanceService.get_performance(db)
    else:
        data = []

    return APIResponse(
        success=True,
        message=f"{report_type.capitalize()} report generated successfully",
        data={
            "report_type": report_type,
            "generated_at": "2026-10-08",
            "total_records": len(data),
            "records": data
        }
    )
