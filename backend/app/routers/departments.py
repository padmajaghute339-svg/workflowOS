from typing import List
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.schemas import APIResponse, DepartmentCreate, DepartmentUpdate
from app.services.services import DepartmentService
from app.dependencies.auth import get_current_user, require_roles
from app.models.models import User, UserRole
from app.ai.workload_prediction import predict_team_workload

router = APIRouter(prefix="/api/departments", tags=["Departments"])

@router.get("", response_model=APIResponse[List[dict]])
def get_departments(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    depts = DepartmentService.get_departments(db)
    for d in depts:
        d["ai_workload"] = predict_team_workload(d["id"], d["employee_count"] * 4, d["employee_count"])
    return APIResponse(success=True, message="Departments fetched successfully", data=depts)

@router.post("", response_model=APIResponse[dict], status_code=status.HTTP_201_CREATED)
def create_department(
    data: DepartmentCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles([UserRole.ADMIN, UserRole.HR]))
):
    dept = DepartmentService.create_department(db, data)
    return APIResponse(success=True, message="Department created successfully", data=dept)

@router.put("/{id}", response_model=APIResponse[dict])
def update_department(
    id: int,
    data: DepartmentUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles([UserRole.ADMIN, UserRole.HR]))
):
    dept = DepartmentService.update_department(db, id, data)
    return APIResponse(success=True, message="Department updated successfully", data=dept)

@router.delete("/{id}", response_model=APIResponse[dict])
def delete_department(
    id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles([UserRole.ADMIN]))
):
    DepartmentService.delete_department(db, id)
    return APIResponse(success=True, message="Department deleted successfully", data={"id": id})
