import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../models/employee';
import { EmployeeService } from '../services/employee.service';


@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
  employee: Employee | undefined;
  id: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.id = idParam ? +idParam : null; 
    if (this.id !== null) {
      this.fetchEmployee();
    } else {
      console.error('Invalid employee ID');
    }
  }

  fetchEmployee(): void {
    if (this.id !== null) {
      this.employeeService.getEmployeeById(this.id).subscribe(
        employee => {
          this.employee = employee;
        },
        error => {
          console.error('Error fetching employee:', error);
        }
      );
    }
  }
  goBack(): void {
    this.router.navigate(['/employees']);
  }
}
