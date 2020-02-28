import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ROUTES } from '../config/constants';


const routes: Routes = [
  { path: ROUTES['home'], component: LandingPageComponent },
  { path: '', redirectTo: ROUTES['home'], pathMatch: 'full' },
  { path: ROUTES['employee'], loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule) },
  { path: ROUTES['department'], loadChildren: () => import('./department/department.module').then(m => m.DepartmentModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
