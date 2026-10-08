import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.database import Base, engine

client = TestClient(app)

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"

def test_auth_and_protected_routes():
    # 1. Register User
    reg_data = {
        "email": "testuser@workflowos.com",
        "password": "TestPassword123!",
        "first_name": "Test",
        "last_name": "User",
        "role": "EMPLOYEE"
    }
    response = client.post("/api/auth/register", json=reg_data)
    assert response.status_code in [201, 400] # 400 if already exists

    # 2. Login User
    login_data = {
        "email": "testuser@workflowos.com",
        "password": "TestPassword123!"
    }
    response = client.post("/api/auth/login", json=login_data)
    assert response.status_code == 200
    json_resp = response.json()
    assert json_resp["success"] is True
    token = json_resp["data"]["access_token"]
    assert token is not None

    # 3. Access Protected Route (/api/auth/me)
    headers = {"Authorization": f"Bearer {token}"}
    response = client.get("/api/auth/me", headers=headers)
    assert response.status_code == 200
    assert response.json()["data"]["email"] == "testuser@workflowos.com"

def test_dashboard_endpoints():
    login_data = {"email": "testuser@workflowos.com", "password": "TestPassword123!"}
    login_res = client.post("/api/auth/login", json=login_data)
    token = login_res.json()["data"]["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    # Test /api/dashboard/stats
    stats_res = client.get("/api/dashboard/stats", headers=headers)
    assert stats_res.status_code == 200
    assert "total_employees" in stats_res.json()["data"]

    # Test /api/dashboard/task-statistics
    task_res = client.get("/api/dashboard/task-statistics", headers=headers)
    assert task_res.status_code == 200
    assert isinstance(task_res.json()["data"], list)
