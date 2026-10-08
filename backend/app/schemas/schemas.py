from datetime import datetime, date
from typing import Optional, List, Generic, TypeVar, Any
from pydantic import BaseModel, EmailStr, Field, ConfigDict
from app.models.models import (
    UserRole, EmployeeStatus, ProjectStatus, Priority,
    TaskStatus, AttendanceStatus, LeaveType, LeaveStatus, NotificationType
)

T = TypeVar("T")

# Standardized API Response Wrapper
class APIResponse(BaseModel, Generic[T]):
    success: bool = True
    message: str = "Success"
    data: Optional[T] = None
    error: Optional[str] = None

# Token Schemas
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: Any

class TokenData(BaseModel):
    user_id: Optional[int] = None

# User Schemas
class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserRegister(BaseModel):
    email: EmailStr
    password: str
    first_name: str
    last_name: str
    role: Optional[UserRole] = UserRole.EMPLOYEE

class UserOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    email: str
    role: UserRole
    is_active: bool
    employee_id: Optional[int] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    avatar_url: Optional[str] = None

# Department Schemas
class DepartmentBase(BaseModel):
    name: str
    code: str
    description: Optional[str] = None
    manager_id: Optional[int] = None

class DepartmentCreate(DepartmentBase):
    pass

class DepartmentUpdate(BaseModel):
    name: Optional[str] = None
    code: Optional[str] = None
    description: Optional[str] = None
    manager_id: Optional[int] = None

class DepartmentOut(DepartmentBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: datetime
    updated_at: datetime
    employee_count: Optional[int] = 0
    manager_name: Optional[str] = None

# Employee Schemas
class EmployeeBase(BaseModel):
    employee_code: str
    first_name: str
    last_name: str
    email: EmailStr
    phone: Optional[str] = None
    department_id: Optional[int] = None
    position: str
    joining_date: Optional[date] = None
    salary: Optional[float] = 0.0
    status: Optional[EmployeeStatus] = EmployeeStatus.ACTIVE
    avatar_url: Optional[str] = None

class EmployeeCreate(EmployeeBase):
    role: Optional[UserRole] = UserRole.EMPLOYEE
    password: Optional[str] = "Password123!"

class EmployeeUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    department_id: Optional[int] = None
    position: Optional[str] = None
    joining_date: Optional[date] = None
    salary: Optional[float] = None
    status: Optional[EmployeeStatus] = None
    avatar_url: Optional[str] = None

class EmployeeOut(EmployeeBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: datetime
    updated_at: datetime
    department_name: Optional[str] = None

class EmployeeDetailOut(EmployeeOut):
    active_tasks_count: Optional[int] = 0
    completed_projects_count: Optional[int] = 0
    attendance_rate: Optional[float] = 0.0
    latest_performance_score: Optional[float] = 0.0

# Project Schemas
class ProjectBase(BaseModel):
    name: str
    description: Optional[str] = None
    department_id: Optional[int] = None
    manager_id: Optional[int] = None
    start_date: date
    deadline: date
    priority: Optional[Priority] = Priority.MEDIUM
    status: Optional[ProjectStatus] = ProjectStatus.PLANNING
    progress: Optional[int] = 0

class ProjectCreate(ProjectBase):
    member_ids: Optional[List[int]] = []

class ProjectUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    department_id: Optional[int] = None
    manager_id: Optional[int] = None
    start_date: Optional[date] = None
    deadline: Optional[date] = None
    priority: Optional[Priority] = None
    status: Optional[ProjectStatus] = None
    progress: Optional[int] = None
    member_ids: Optional[List[int]] = None

class ProjectOut(ProjectBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: datetime
    updated_at: datetime
    department_name: Optional[str] = None
    manager_name: Optional[str] = None
    member_count: Optional[int] = 0

# Task Schemas
class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    project_id: int
    assigned_to_id: Optional[int] = None
    priority: Optional[Priority] = Priority.MEDIUM
    status: Optional[TaskStatus] = TaskStatus.TODO
    due_date: Optional[date] = None

class TaskCreate(TaskBase):
    pass

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    project_id: Optional[int] = None
    assigned_to_id: Optional[int] = None
    priority: Optional[Priority] = None
    status: Optional[TaskStatus] = None
    due_date: Optional[date] = None

class TaskOut(TaskBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_by_id: Optional[int] = None
    created_at: datetime
    updated_at: datetime
    project_name: Optional[str] = None
    assigned_to_name: Optional[str] = None

# Attendance Schemas
class AttendanceCheckIn(BaseModel):
    employee_id: int
    notes: Optional[str] = None

class AttendanceCheckOut(BaseModel):
    employee_id: int
    notes: Optional[str] = None

class AttendanceOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    employee_id: int
    employee_name: Optional[str] = None
    date: date
    check_in: Optional[datetime] = None
    check_out: Optional[datetime] = None
    status: AttendanceStatus
    working_hours: float
    notes: Optional[str] = None

# Leave Schemas
class LeaveCreate(BaseModel):
    employee_id: int
    leave_type: LeaveType
    start_date: date
    end_date: date
    reason: str

class LeaveReview(BaseModel):
    rejection_reason: Optional[str] = None

class LeaveOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    employee_id: int
    employee_name: Optional[str] = None
    leave_type: LeaveType
    start_date: date
    end_date: date
    reason: str
    status: LeaveStatus
    reviewed_by_id: Optional[int] = None
    rejection_reason: Optional[str] = None
    created_at: datetime

# Performance Schemas
class PerformanceCreate(BaseModel):
    employee_id: int
    review_period: str
    productivity_score: float
    attendance_score: float
    task_completion_score: float
    project_contribution_score: float
    feedback: Optional[str] = None

class PerformanceOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    employee_id: int
    employee_name: Optional[str] = None
    department_name: Optional[str] = None
    review_period: str
    overall_score: float
    productivity_score: float
    attendance_score: float
    task_completion_score: float
    project_contribution_score: float
    feedback: Optional[str] = None
    created_at: datetime

# Notification Schemas
class NotificationOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    user_id: int
    title: str
    message: str
    type: NotificationType
    is_read: bool
    created_at: datetime

# Dashboard Stats Schemas
class DashboardStatsOut(BaseModel):
    total_employees: int
    active_projects: int
    pending_tasks: int
    employees_on_leave: int
    attendance_rate: float
    completed_projects: int
    total_departments: int

class ActivityFeedItem(BaseModel):
    id: int
    user_name: str
    action: str
    entity: str
    target: str
    timestamp: str
