import random
from datetime import datetime, date, timedelta
from sqlalchemy.orm import Session
from app.database import SessionLocal, engine, Base
from app.models.models import (
    User, Employee, Department, Project, Task, Attendance,
    LeaveRequest, Performance, Notification, project_members,
    UserRole, EmployeeStatus, ProjectStatus, Priority, TaskStatus,
    AttendanceStatus, LeaveType, LeaveStatus, NotificationType
)
from app.utils.security import get_password_hash

def seed_database():
    print("Initializing WorkFlowOS database seed...")
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

    db: Session = SessionLocal()
    code_counter = 100000

    def next_code():
        nonlocal code_counter
        code_counter += 1
        return f"EMP-{code_counter}"

    try:
        # 1. Departments (6)
        dept_data = [
            ("Engineering", "ENG", "Core software development & infrastructure"),
            ("Product & Design", "PRD", "Product strategy, UX research & visual design"),
            ("Human Resources", "HR", "Talent acquisition, employee success & payroll"),
            ("Marketing & Growth", "MKT", "Brand management, performance marketing & PR"),
            ("Sales & Business Dev", "SLS", "Enterprise sales, client relations & growth"),
            ("Customer Support", "SUP", "24/7 technical support & customer satisfaction")
        ]

        departments = []
        for name, code, desc in dept_data:
            d = Department(name=name, code=code, description=desc)
            db.add(d)
            departments.append(d)
        db.flush()

        # 2. Key Users & Employees
        first_names = [
            "Alex", "Sarah", "Michael", "Elena", "David", "Jessica", "James", "Emily", "Robert", "Sophia",
            "Daniel", "Olivia", "Matthew", "Ava", "Joseph", "Isabella", "Andrew", "Mia", "William", "Charlotte",
            "Ethan", "Amelia", "Alexander", "Harper", "Benjamin", "Evelyn", "Lucas", "Abigail", "Mason", "Emily",
            "Logan", "Elizabeth", "Oliver", "Sofia", "Jacob", "Avery", "Liam", "Ella", "Noah", "Scarlett"
        ]
        last_names = [
            "Mercer", "Connor", "Ross", "Rostova", "Miller", "Vance", "Wright", "Watson", "Hayes", "Martinez",
            "Taylor", "Anderson", "Thomas", "Jackson", "White", "Harris", "Martin", "Thompson", "Garcia", "Martinez",
            "Robinson", "Clark", "Rodriguez", "Lewis", "Lee", "Walker", "Hall", "Allen", "Young", "Hernandez",
            "King", "Wright", "Lopez", "Hill", "Scott", "Green", "Adams", "Baker", "Gonzalez", "Nelson"
        ]

        # Admin user
        admin_emp = Employee(
            employee_code=next_code(),
            first_name="Admin",
            last_name="WorkFlowOS",
            email="admin@workflowos.com",
            phone="+1 (555) 019-2831",
            department_id=departments[0].id,
            position="Chief Technology Officer",
            joining_date=date(2023, 1, 15),
            salary=160000.0,
            status=EmployeeStatus.ACTIVE,
            avatar_url="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
        )
        db.add(admin_emp)
        db.flush()

        admin_user = User(
            email="admin@workflowos.com",
            password_hash=get_password_hash("Admin123!"),
            role=UserRole.ADMIN,
            employee_id=admin_emp.id
        )
        db.add(admin_user)

        # 2 HR Users
        hr_users = []
        for i in range(2):
            fn = first_names[i + 1]
            ln = last_names[i + 1]
            email = f"hr{i+1}@workflowos.com"
            hr_emp = Employee(
                employee_code=next_code(),
                first_name=fn,
                last_name=ln,
                email=email,
                phone=f"+1 (555) 019-382{i}",
                department_id=departments[2].id,
                position="HR Specialist",
                joining_date=date(2023, 3, 1),
                salary=85000.0,
                status=EmployeeStatus.ACTIVE,
                avatar_url=f"https://api.dicebear.com/7.x/avataaars/svg?seed={fn}"
            )
            db.add(hr_emp)
            db.flush()
            u = User(
                email=email,
                password_hash=get_password_hash("Password123!"),
                role=UserRole.HR,
                employee_id=hr_emp.id
            )
            db.add(u)
            hr_users.append(hr_emp)

        # 5 Managers
        managers = []
        for i in range(5):
            fn = first_names[i + 3]
            ln = last_names[i + 3]
            email = f"manager{i+1}@workflowos.com"
            mgr_emp = Employee(
                employee_code=next_code(),
                first_name=fn,
                last_name=ln,
                email=email,
                phone=f"+1 (555) 019-492{i}",
                department_id=departments[i % 6].id,
                position=f"{departments[i % 6].name} Manager",
                joining_date=date(2023, 5, 10),
                salary=120000.0,
                status=EmployeeStatus.ACTIVE,
                avatar_url=f"https://api.dicebear.com/7.x/avataaars/svg?seed={fn}"
            )
            db.add(mgr_emp)
            db.flush()

            # Assign as manager of department
            departments[i % 6].manager_id = mgr_emp.id

            u = User(
                email=email,
                password_hash=get_password_hash("Password123!"),
                role=UserRole.MANAGER,
                employee_id=mgr_emp.id
            )
            db.add(u)
            managers.append(mgr_emp)

        # Remaining ~40 Employees
        all_employees = [admin_emp] + hr_users + managers
        positions = [
            "Senior Frontend Developer", "Backend Engineer", "DevOps Specialist", "QA Automation Engineer",
            "Product Designer", "UX Researcher", "Growth Marketing Lead", "Sales Executive", "Support Specialist",
            "Data Analyst", "Security Engineer"
        ]

        for i in range(8, 48):
            fn = first_names[i % len(first_names)]
            ln = last_names[i % len(last_names)]
            email = f"{fn.lower()}.{ln.lower()}{i}@workflowos.com"
            dept = departments[i % len(departments)]
            pos = positions[i % len(positions)]
            
            emp = Employee(
                employee_code=next_code(),
                first_name=fn,
                last_name=ln,
                email=email,
                phone=f"+1 (555) 019-70{i:02d}",
                department_id=dept.id,
                position=pos,
                joining_date=date(2024, (i % 12) + 1, (i % 25) + 1),
                salary=75000.0 + (i * 1200),
                status=EmployeeStatus.ACTIVE if i % 9 != 0 else EmployeeStatus.ON_LEAVE,
                avatar_url=f"https://api.dicebear.com/7.x/avataaars/svg?seed={fn}{ln}"
            )
            db.add(emp)
            db.flush()

            u = User(
                email=email,
                password_hash=get_password_hash("Password123!"),
                role=UserRole.EMPLOYEE,
                employee_id=emp.id
            )
            db.add(u)
            all_employees.append(emp)

        db.commit()

        # 3. Projects (10)
        project_titles = [
            ("WorkFlowOS Mobile App", "Native React Native application for iOS and Android enterprise clients", departments[0], 85, ProjectStatus.IN_PROGRESS),
            ("Cloud Migration & Kubernetes", "Transition core infrastructure from bare metal to AWS EKS", departments[0], 100, ProjectStatus.COMPLETED),
            ("Design System v2.0", "Figma design kit and React Tailwind component system", departments[1], 90, ProjectStatus.IN_PROGRESS),
            ("AI Talent Matching", "Machine learning algorithm for candidate screening", departments[2], 40, ProjectStatus.IN_PROGRESS),
            ("Q4 Global Marketing Blitz", "Multi-channel advertising push across LinkedIn and TechCrunch", departments[3], 65, ProjectStatus.IN_PROGRESS),
            ("Enterprise Sales Portal", "Custom portal for B2B procurement and contract execution", departments[4], 30, ProjectStatus.PLANNING),
            ("24/7 Support Bot Integration", "LLM-driven automated customer service agent", departments[5], 50, ProjectStatus.IN_PROGRESS),
            ("ISO 27001 Compliance Audit", "Comprehensive security audit and SOC2 Type II certification", departments[0], 100, ProjectStatus.COMPLETED),
            ("Performance Analytics Engine", "Real-time dashboard charting for executive suite", departments[1], 75, ProjectStatus.IN_PROGRESS),
            ("Automated Payroll Gateway", "Stripe and Wise integration for global team compensation", departments[2], 15, ProjectStatus.PLANNING)
        ]

        projects = []
        for name, desc, dept, prog, stat in project_titles:
            p = Project(
                name=name,
                description=desc,
                department_id=dept.id,
                manager_id=managers[len(projects) % len(managers)].id,
                start_date=date(2026, 1, 15),
                deadline=date(2026, 12, 20),
                priority=random.choice([Priority.MEDIUM, Priority.HIGH, Priority.URGENT]),
                status=stat,
                progress=prog
            )
            # Assign random team members
            p.members = random.sample(all_employees, min(6, len(all_employees)))
            db.add(p)
            projects.append(p)
        db.commit()

        # 4. Tasks (100+)
        task_prefixes = [
            "Implement", "Refactor", "Optimize", "Fix critical bug in", "Write unit tests for",
            "Design mockup for", "Audit security of", "Configure CI/CD pipeline for", "Review PR for", "Deploy"
        ]
        task_modules = [
            "Authentication flow", "JWT token refresh", "Database migrations", "Kanban drag-and-drop",
            "Recharts visualization", "PDF report generation", "Role-based authorization", "CSV export helper",
            "User avatar uploader", "Password reset API", "Dark theme toggle", "Notification WebSocket",
            "Audit logging service", "Redis cache layer", "Docker build container", "GraphQL endpoint"
        ]

        tasks_created = 0
        for p in projects:
            for k in range(11):
                tasks_created += 1
                prefix = task_prefixes[tasks_created % len(task_prefixes)]
                module = task_modules[(tasks_created + k) % len(task_modules)]
                assigned = random.choice(p.members) if p.members else random.choice(all_employees)
                
                status_choice = TaskStatus.COMPLETED if p.status == ProjectStatus.COMPLETED else random.choice([TaskStatus.TODO, TaskStatus.IN_PROGRESS, TaskStatus.REVIEW, TaskStatus.COMPLETED])

                t = Task(
                    title=f"{prefix} {module}",
                    description=f"Standard task requirement for {p.name}. Verify test coverage and document code changes.",
                    project_id=p.id,
                    assigned_to_id=assigned.id,
                    created_by_id=admin_user.id,
                    priority=random.choice([Priority.LOW, Priority.MEDIUM, Priority.HIGH, Priority.URGENT]),
                    status=status_choice,
                    due_date=date.today() + timedelta(days=random.randint(1, 30))
                )
                db.add(t)
        db.commit()

        # 5. Attendance Records
        today = date.today()
        for i in range(14):
            past_date = today - timedelta(days=i)
            for emp in all_employees[:30]:
                att = Attendance(
                    employee_id=emp.id,
                    date=past_date,
                    check_in=datetime.combine(past_date, datetime.min.time()) + timedelta(hours=9, minutes=random.randint(0, 20)),
                    check_out=datetime.combine(past_date, datetime.min.time()) + timedelta(hours=17, minutes=random.randint(30, 60)),
                    status=AttendanceStatus.PRESENT if random.random() > 0.1 else AttendanceStatus.LATE,
                    working_hours=8.5,
                    notes="Automated check-in"
                )
                db.add(att)
        db.commit()

        # 6. Leave Requests
        for emp in all_employees[:10]:
            leave = LeaveRequest(
                employee_id=emp.id,
                leave_type=random.choice([LeaveType.CASUAL, LeaveType.SICK, LeaveType.PAID]),
                start_date=today + timedelta(days=random.randint(1, 10)),
                end_date=today + timedelta(days=random.randint(11, 15)),
                reason="Personal time off for family vacation and rest.",
                status=random.choice([LeaveStatus.PENDING, LeaveStatus.APPROVED, LeaveStatus.REJECTED]),
                reviewed_by_id=admin_user.id
            )
            db.add(leave)
        db.commit()

        # 7. Performance Records
        for emp in all_employees[:20]:
            prod = round(random.uniform(75, 98), 1)
            att_s = round(random.uniform(85, 100), 1)
            task_s = round(random.uniform(80, 96), 1)
            proj_s = round(random.uniform(78, 95), 1)
            overall = round((prod + att_s + task_s + proj_s) / 4.0, 1)

            perf = Performance(
                employee_id=emp.id,
                review_period="Q3 2026",
                overall_score=overall,
                productivity_score=prod,
                attendance_score=att_s,
                task_completion_score=task_s,
                project_contribution_score=proj_s,
                feedback="Consistently delivers high-quality code and adheres to project deadlines.",
                evaluated_by_id=admin_user.id
            )
            db.add(perf)
        db.commit()

        # 8. Initial Notifications
        for u in [admin_user]:
            n1 = Notification(
                user_id=u.id,
                title="System Initialized",
                message="WorkFlowOS database seed completed successfully.",
                type=NotificationType.SYSTEM
            )
            n2 = Notification(
                user_id=u.id,
                title="Q4 Sprint Launch",
                message="Projects and milestone tasks have been assigned across engineering & product.",
                type=NotificationType.PROJECT_UPDATE
            )
            db.add_all([n1, n2])
        db.commit()

        print(f"Successfully seeded WorkFlowOS! Created 6 Departments, {len(all_employees)} Employees/Users, 10 Projects, {tasks_created} Tasks, Attendance logs, Leaves, and Performance evaluations.")

    except Exception as e:
        print(f"Error seeding database: {e}")
        db.rollback()
        raise e
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()
