from typing import List, Optional
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.schemas import APIResponse, TaskCreate, TaskUpdate
from app.services.services import TaskService
from app.dependencies.auth import get_current_user
from app.models.models import User

router = APIRouter(prefix="/api/tasks", tags=["Tasks"])

@router.get("", response_model=APIResponse[List[dict]])
def get_tasks(
    project_id: Optional[int] = None,
    assigned_to_id: Optional[int] = None,
    status: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    tasks = TaskService.get_tasks(db, project_id, assigned_to_id, status)
    return APIResponse(success=True, message="Tasks fetched successfully", data=tasks)

@router.post("", response_model=APIResponse[dict], status_code=status.HTTP_201_CREATED)
def create_task(
    data: TaskCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    task = TaskService.create_task(db, data, current_user.id)
    return APIResponse(success=True, message="Task created successfully", data=task)

@router.put("/{id}", response_model=APIResponse[dict])
def update_task(
    id: int,
    data: TaskUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    task = TaskService.update_task(db, id, data)
    return APIResponse(success=True, message="Task updated successfully", data=task)

@router.delete("/{id}", response_model=APIResponse[dict])
def delete_task(
    id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    TaskService.delete_task(db, id)
    return APIResponse(success=True, message="Task deleted successfully", data={"id": id})
