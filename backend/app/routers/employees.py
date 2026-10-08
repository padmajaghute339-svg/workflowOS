from typing import List, Optional
from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.schemas import APIResponse, EmployeeCreate, EmployeeUpdate
from app.services.services import EmployeeService
from app.dependencies.auth import get_current_user, require_roles
from app.models.models import User, UserRole
from app.ai.performance_insights import generate_performance_insights

router = APIRouter(prefix="/api/employees", tags=["Employees"])

@router.get("", response_model=APIResponse[List[dict]])
def get_employees(
    search: Optional[str] = None,
    department_id: Optional[int] = None,
    status: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    employees = EmployeeService.get_employees(db, search, department_id, status)
    return APIResponse(success=True, message="Employees fetched successfully", data=employees)

@router.get("/{id}", response_model=APIResponse[dict])
def get_employee(
    id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    emp = EmployeeService.get_employee_by_id(db, id)
    # Include AI performance insights
    ai_insights = generate_performance_insights(emp)
    emp["ai_insights"] = ai_insights
    return APIResponse(success=True, message="Employee retrieved successfully", data=emp)

@router.post("", response_model=APIResponse[dict], status_code=status.HTTP_201_CREATED)
def create_employee(
    data: EmployeeCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles([UserRole.ADMIN, UserRole.HR]))
):
    emp = EmployeeService.create_employee(db, data)
    return APIResponse(success=True, message="Employee created successfully", data=emp)

@router.put("/{id}", response_model=APIResponse[dict])
def update_employee(
    id: int,
    data: EmployeeUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles([UserRole.ADMIN, UserRole.HR, UserRole.MANAGER]))
):
    emp = EmployeeService.update_employee(db, id, data)
    return APIResponse(success=True, message="Employee updated successfully", data=emp)

@router.delete("/{id}", response_model=APIResponse[dict])
def delete_employee(
    id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles([UserRole.ADMIN, UserRole.HR]))
):
    EmployeeService.delete_employee(db, id)
    return APIResponse(success=True, message="Employee deleted successfully", data={"id": id})
