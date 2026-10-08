from typing import Dict, Any, List

def predict_team_workload(department_id: int, total_tasks: int, total_employees: int) -> Dict[str, Any]:
    """
    Predicts workload saturation and capacity for a given team or department.
    """
    if total_employees == 0:
        return {"capacity_status": "UNKNOWN", "recommended_headcount": 1}

    tasks_per_employee = total_tasks / total_employees
    if tasks_per_employee > 8:
        status = "OVER_CAPACITY"
        recommended_hires = max(1, int(total_tasks / 5 - total_employees))
    elif tasks_per_employee > 4:
        status = "OPTIMAL"
        recommended_hires = 0
    else:
        status = "UNDER_UTILIZED"
        recommended_hires = 0

    return {
        "department_id": department_id,
        "tasks_per_employee": round(tasks_per_employee, 2),
        "capacity_status": status,
        "recommended_additional_hires": recommended_hires,
        "predicted_completion_velocity": f"{round(total_tasks * 1.2, 1)} task points/week"
    }
