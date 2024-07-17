import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  selectedEmployeeId: number | null = null;
  showModal: boolean = false;

  constructor(
    private router: Router,
    private employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
    this.fetchEmployees();
  }

  fetchEmployees(): void {
    this.employeeService.getEmployees().subscribe(employees => {
      this.employees = employees;
    },
    error => {
      console.error('Error fetching employees:', error);
    });
  }

  addEmployee(): void {
    this.router.navigate(['/employee-form']);
  }

  editEmployee(employeeId: number): void {
    this.router.navigate(['/employee-form', employeeId]);
  }

  openDeleteModal(employeeId: number): void {
    this.selectedEmployeeId = employeeId;
    this.showModal = true;
  }

  closeDeleteModal(): void {
    this.showModal = false;
    this.selectedEmployeeId = null;
  }

  deleteEmployee(): void {
    if (this.selectedEmployeeId !== null) {
      this.employeeService.deleteEmployee(this.selectedEmployeeId).subscribe(() => {
        this.fetchEmployees();
        this.closeDeleteModal();
      });
    }
  }
}
