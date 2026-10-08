from typing import Dict, Any

def assess_project_risk(project_data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Evaluates project risk of delay based on current progress vs time elapsed.
    """
    progress = project_data.get("progress", 0)
    status = project_data.get("status", "IN_PROGRESS")
    
    risk_score = 100 - progress
    if status == "COMPLETED":
        risk_level = "NONE"
        risk_score = 0
    elif progress < 30:
        risk_level = "HIGH"
    elif progress < 70:
        risk_level = "MEDIUM"
    else:
        risk_level = "LOW"

    return {
        "project_id": project_data.get("id"),
        "risk_level": risk_level,
        "calculated_risk_score": risk_score,
        "delay_probability_pct": min(95, max(5, int((100 - progress) * 0.85))),
        "mitigation_suggestion": "Increase sprint capacity and reallocate pending tasks." if risk_level in ["HIGH", "MEDIUM"] else "Maintain current trajectory."
    }
