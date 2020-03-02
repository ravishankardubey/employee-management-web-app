import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { DepartmentRoutingModule } from './department-routing.module';
import { DepartmentModalComponent } from './modal/department-modal/department-modal.component';
import { DepartmentService } from './service/department.service';
import { MaterialModule } from './../material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';



@NgModule({
  declarations: [DashboardComponent, DepartmentModalComponent],
  imports: [
    CommonModule,
    DepartmentRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [DepartmentService],
  entryComponents: [DepartmentModalComponent]
})
export class DepartmentModule { }
