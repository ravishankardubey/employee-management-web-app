import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ACTIONS } from '../../../../config/constants';
import { DepartmentService } from './../../service/department.service';

export interface DepartmentAction {
  deptData: object;
  action: string;
}

@Component({
  selector: 'app-department-modal',
  templateUrl: './department-modal.component.html',
  styleUrls: ['./department-modal.component.scss']
})
export class DepartmentModalComponent {
  ACTIONS = ACTIONS;
  departmentForm = new FormGroup({});

  headerText = '';
  constructor(
    public dialogRef: MatDialogRef<DepartmentModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DepartmentAction,
    private departmentService: DepartmentService
  ) {
    this.departmentForm = this.generateReactiveForm(data.deptData);
    this.headerText = this.data.action.toUpperCase() + ' DEPARTMENT';
  }

  onClose(): void {
    this.dialogRef.close();
  }



  generateReactiveForm(deptData) {
    return new FormGroup({
      id: new FormControl(deptData.id),
      name: new FormControl(deptData.name, [Validators.required]),
    }, this.formControlDisabler.bind(this));
  }

  formControlDisabler(form) {
    if (this.data.action === ACTIONS['view']) {
      form.disable();
    }
  }

  addDepartment() {
    this.departmentService.addDepartment(this.departmentForm.getRawValue()).subscribe(resp => {
      this.dialogRef.close(resp);
    });
  }

  updateDepartment() {
    this.departmentService.updateDepartment(this.departmentForm.getRawValue()).subscribe(resp => {
      this.dialogRef.close(resp);
    });
  }
}
