import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { ROUTES } from './../../config/constants';

const routes: Routes = [
  {
    path: '', component: EmployeeComponent,
    children: [
      { path: ROUTES['dashboard'], component: DashboardComponent },
      { path: '', redirectTo: ROUTES['dashboard'] },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
