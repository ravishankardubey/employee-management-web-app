import { Injectable } from '@angular/core';
import { ApiService } from './../../core/services/api/api.service';
import { environment as ENV } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private EMP_BASE = ENV.API_BASE_URL + ENV.API_URL.EMPLOYEE;
  private DEPT_BASE = ENV.API_BASE_URL + ENV.API_URL.DEPARTMENT;
  private URL_GET_ALL_EMPLOYEES = this.EMP_BASE + ENV.API_URL.GET_ALL_EMPLOYEES;
  private URL_GET_EMPLOYEE = this.EMP_BASE + ENV.API_URL.GET_EMPLOYEE;
  private URL_ADD_EMPLOYEE = this.EMP_BASE + ENV.API_URL.ADD_EMPLOYEE;
  private URL_UPDATE_EMPLOYEE = this.EMP_BASE + ENV.API_URL.UPDATE_EMPLOYEE;
  private URL_DELETE_EMPLOYEE = this.EMP_BASE + ENV.API_URL.DELETE_EMPLOYEE;
  private URL_GET_ALL_DEPARTMENTS = this.DEPT_BASE + ENV.API_URL.GET_ALL_DEPARTMENTS;

  constructor(
    private apiService: ApiService
  ) { }

  getAllEmployees() {
    return this.apiService.get(this.URL_GET_ALL_EMPLOYEES);
  }

  getEmployee(employeeId) {
    return this.apiService.get(this.URL_GET_EMPLOYEE + '/' + employeeId);
  }

  addEmployee(payload) {
    return this.apiService.post(this.URL_ADD_EMPLOYEE, payload);
  }

  updateEmployee(payload) {
    return this.apiService.put(this.URL_UPDATE_EMPLOYEE, payload);
  }

  deleteEmployee(payload) {
    return this.apiService.post(this.URL_DELETE_EMPLOYEE, payload);
  }

  getAllDepartments() {
    return this.apiService.get(this.URL_GET_ALL_DEPARTMENTS);
  }
}
