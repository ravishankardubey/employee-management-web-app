import { Injectable } from '@angular/core';
import { ApiService } from './../../core/services/api/api.service';
import { environment as ENV } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private DEPT_BASE = ENV.API_BASE_URL + ENV.API_URL.DEPARTMENT;
  private GET_ALL_DEPT = this.DEPT_BASE + ENV.API_URL.GET_ALL_DEPARTMENTS;
  private GET_DEPT = this.DEPT_BASE + ENV.API_URL.GET_DEPARTMENT;
  private ADD_DEPT = this.DEPT_BASE + ENV.API_URL.ADD_DEPARTMENT;
  private UPDATE_DEPT = this.DEPT_BASE + ENV.API_URL.UPDATE_DEPARTMENT;
  private DELETE_DEPT = this.DEPT_BASE + ENV.API_URL.DELETE_DEPARTMENT;

  constructor(
    private apiService: ApiService
  ) { }

  getAllDepartment() {
    return this.apiService.get(this.GET_ALL_DEPT);
  }

  getDepartment(deptId) {
    return this.apiService.get(this.GET_DEPT + '/' + deptId);
  }

  addDepartment(payload) {
    return this.apiService.post(this.ADD_DEPT, payload);
  }

  updateDepartment(payload) {
    return this.apiService.put(this.UPDATE_DEPT, payload);
  }

  deleteDepartment(deptIds) {
    return this.apiService.post(this.DELETE_DEPT, deptIds);
  }
}
