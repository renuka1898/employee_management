import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit{
  employeeForm: FormGroup;
  employeeId: number | null = null;
  formChanged = false; 

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.employeeForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      department: ['', Validators.required],
      salary: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.employeeId = +id;
        this.loadEmployee();
      }
    });

    this.employeeForm.valueChanges.subscribe(() => {
      this.formChanged = true;
    });
  }

  loadEmployee(): void {
    if (this.employeeId !== null) {
      this.employeeService.getEmployeeById(this.employeeId).subscribe(employee => {
        this.employeeForm.patchValue(employee);
        this.formChanged = false;
      });
    }
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      const employee: Employee = this.employeeForm.value;
      if (this.employeeId !== null) {
        this.employeeService.updateEmployee(this.employeeId, employee).subscribe(() => {
          this.router.navigate(['/employees']);
        });
      } else {
        this.employeeService.addEmployee(employee).subscribe(() => {
          this.router.navigate(['/employees']);
        });
      }
    } else {
      this.markFormGroupTouched(this.employeeForm);
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/employees']);
  }

}
