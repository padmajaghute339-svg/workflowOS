from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.schemas import APIResponse, UserRegister, UserLogin, UserOut
from app.services.services import AuthService
from app.dependencies.auth import get_current_user
from app.models.models import User

router = APIRouter(prefix="/api/auth", tags=["Authentication"])

@router.post("/register", response_model=APIResponse[UserOut], status_code=status.HTTP_201_CREATED)
def register(data: UserRegister, db: Session = Depends(get_db)):
    user = AuthService.register_user(db, data)
    user_out = UserOut.model_validate(user)
    if user.employee:
        user_out.first_name = user.employee.first_name
        user_out.last_name = user.employee.last_name
        user_out.avatar_url = user.employee.avatar_url
    return APIResponse(success=True, message="User registered successfully", data=user_out)

@router.post("/login", response_model=APIResponse[dict])
def login(data: UserLogin, db: Session = Depends(get_db)):
    auth_data = AuthService.authenticate_user(db, data.email, data.password)
    return APIResponse(success=True, message="Login successful", data=auth_data)

@router.get("/me", response_model=APIResponse[UserOut])
def get_me(current_user: User = Depends(get_current_user)):
    user_out = UserOut.model_validate(current_user)
    if current_user.employee:
        user_out.first_name = current_user.employee.first_name
        user_out.last_name = current_user.employee.last_name
        user_out.avatar_url = current_user.employee.avatar_url
    return APIResponse(success=True, message="User profile retrieved", data=user_out)

@router.post("/refresh", response_model=APIResponse[dict])
def refresh_token(current_user: User = Depends(get_current_user)):
    auth_data = AuthService.authenticate_user(current_user.email, "dummy")
    return APIResponse(success=True, message="Token refreshed", data=auth_data)
