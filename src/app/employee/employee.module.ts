import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeService } from './services/employee.service';
import { MaterialModule } from './../material.module';
import { EmployeeModalComponent } from './modal/employee-modal/employee-modal.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [DashboardComponent, EmployeeModalComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [EmployeeService],
  entryComponents: [EmployeeModalComponent]
})
export class EmployeeModule { }
