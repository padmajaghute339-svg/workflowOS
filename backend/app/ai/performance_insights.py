from typing import Dict, Any, List

def generate_performance_insights(employee_data: Dict[str, Any]) -> Dict[str, Any]:
    """
    AI-Ready heuristic & statistical analytical engine for evaluating employee productivity trends.
    """
    overall = employee_data.get("latest_performance_score", 85.0)
    attendance = employee_data.get("attendance_rate", 95.0)
    active_tasks = employee_data.get("active_tasks_count", 3)

    recommendations = []
    risk_level = "LOW"

    if overall >= 90:
        summary = "Exceptional high performer with strong velocity across deliverables."
        recommendations.append("Consider for leadership or senior project ownership.")
    elif overall >= 75:
        summary = "Consistent contributor operating within expected performance standards."
        recommendations.append("Encourage cross-departmental collaboration.")
    else:
        summary = "Performance metric below target threshold; requires focused mentoring."
        risk_level = "MEDIUM"
        recommendations.append("Schedule 1-on-1 performance review and align on milestones.")

    if active_tasks > 6:
        recommendations.append("High active task load detected; consider redistribution to prevent burnout.")
        risk_level = "HIGH" if risk_level == "MEDIUM" else "MEDIUM"

    if attendance < 90.0:
        recommendations.append("Attendance fluctuation detected; verify leave logs and remote balance.")

    return {
        "employee_id": employee_data.get("id"),
        "predicted_rating": "A+" if overall >= 90 else ("A" if overall >= 80 else "B"),
        "burnout_risk": risk_level,
        "summary": summary,
        "actionable_insights": recommendations
    }
