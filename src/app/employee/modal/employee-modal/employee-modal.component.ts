import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ACTIONS } from '../../../../config/constants';
import { EmployeeService } from './../../services/employee.service';

export interface EmployeeAction {
  empData: object;
  action: string;
}

@Component({
  selector: 'app-employee-modal',
  templateUrl: './employee-modal.component.html',
  styleUrls: ['./employee-modal.component.scss']
})
export class EmployeeModalComponent {
  ACTIONS = ACTIONS;
  employeeForm = new FormGroup({});
  allDepartments = [];

  headerText = '';

  constructor(
    public dialogRef: MatDialogRef<EmployeeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EmployeeAction,
    private employeeService: EmployeeService
  ) {
    this.employeeForm = this.generateReactiveForm(data.empData);
    this.headerText = this.data.action.toUpperCase() + ' EMPLOYEE';
    this.getDepartments();
  }

  onClose(): void {
    this.dialogRef.close();
  }

  getDepartments() {
    this.employeeService.getAllDepartments().subscribe(depts => this.allDepartments = depts.data);
  }

  generateReactiveForm(emptData) {
    return new FormGroup({
      id: new FormControl(emptData.id),
      first_name: new FormControl(emptData.first_name, [Validators.required]),
      last_name: new FormControl(emptData.last_name || '', [Validators.required]),
      age: new FormControl(emptData.age, [Validators.required, Validators.pattern('^[0-9]*$')]),
      email: new FormControl(emptData.email || '',
        [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]),
      departmentId: new FormControl(emptData.departmentId, [Validators.required])
    }, this.formControlDisabler.bind(this));
  }

  formControlDisabler(form) {
    if (this.data.action === ACTIONS['view']) {
      form.disable();
    }
  }

  addEmployee() {
    this.employeeService.addEmployee(this.employeeForm.getRawValue()).subscribe(resp => {
      this.dialogRef.close(resp);
    });
  }

  updateEmployee() {
    this.employeeService.updateEmployee(this.employeeForm.getRawValue()).subscribe(resp => {
      this.dialogRef.close(resp);
    });
  }

}
