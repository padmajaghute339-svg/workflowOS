from typing import List, Optional
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.schemas import APIResponse, ProjectCreate, ProjectUpdate
from app.services.services import ProjectService
from app.dependencies.auth import get_current_user, require_roles
from app.models.models import User, UserRole
from app.ai.project_risk import assess_project_risk

router = APIRouter(prefix="/api/projects", tags=["Projects"])

@router.get("", response_model=APIResponse[List[dict]])
def get_projects(
    status: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    projects = ProjectService.get_projects(db, status)
    for p in projects:
        p["ai_risk_assessment"] = assess_project_risk(p)
    return APIResponse(success=True, message="Projects fetched successfully", data=projects)

@router.get("/{id}", response_model=APIResponse[dict])
def get_project(
    id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    proj = ProjectService.get_project_by_id(db, id)
    proj["ai_risk_assessment"] = assess_project_risk(proj)
    return APIResponse(success=True, message="Project retrieved successfully", data=proj)

@router.post("", response_model=APIResponse[dict], status_code=status.HTTP_201_CREATED)
def create_project(
    data: ProjectCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles([UserRole.ADMIN, UserRole.MANAGER]))
):
    proj = ProjectService.create_project(db, data)
    return APIResponse(success=True, message="Project created successfully", data=proj)

@router.put("/{id}", response_model=APIResponse[dict])
def update_project(
    id: int,
    data: ProjectUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles([UserRole.ADMIN, UserRole.MANAGER]))
):
    proj = ProjectService.update_project(db, id, data)
    return APIResponse(success=True, message="Project updated successfully", data=proj)

@router.delete("/{id}", response_model=APIResponse[dict])
def delete_project(
    id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles([UserRole.ADMIN]))
):
    ProjectService.delete_project(db, id)
    return APIResponse(success=True, message="Project deleted successfully", data={"id": id})
