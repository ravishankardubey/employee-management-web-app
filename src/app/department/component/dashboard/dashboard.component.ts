import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { ACTIONS } from '../../../../config/constants';
import { CommonService } from './../../../core/services/common/common.service';
import { ConfirmationComponent } from './../../../core/modal/confirmation/confirmation.component';
import { DepartmentService } from './../../service/department.service';
import { DepartmentModalComponent } from '../../modal/department-modal/department-modal.component';

export interface DepartmentData {
  id: number;
  name: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  ACTIONS = ACTIONS;
  displayedColumns: string[] = ['select', 'id', 'name', 'action'];
  dataSource: MatTableDataSource<DepartmentData>;
  selection = new SelectionModel<DepartmentData>(true, []);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    private departmentService: DepartmentService,
    private dialog: MatDialog,
    private commonService: CommonService
  ) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource([]);
    this.fetchAllDepartments();
  }

  fetchAllDepartments() {
    this.departmentService.getAllDepartment().subscribe(depts => {
      this.initTable(depts.data);
    });
  }

  initTable(data) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  fetchDepartment(deptId) {
    this.departmentService.getDepartment(deptId).subscribe(dept => {
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: DepartmentData): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  addDepartment(action) {
    this.openDeptDialog(action, {});
  }

  editDepartment(action, deptData) {
    this.openDeptDialog(action, deptData);
  }

  viewDepartment(action, deptData) {
    this.openDeptDialog(action, deptData);
  }
  openDeptDialog(action, deptData): void {
    const dialogRef = this.dialog.open(DepartmentModalComponent, {
      width: '500px', data: { deptData: deptData, action: action }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchAllDepartments();
        this.commonService.openSnackBar('Department Created/Updated Successfully');
      }
    });
  }


  deleteDepartment(id) {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '500px',
      data: { msg: 'Do you want to delete this Department ?' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteDepartmentCall({ departmentIds: [id] });
      }
    });
  }

  deleteMultipleDepartment() {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '500px',
      data: { msg: 'Do you want to delete selected Department(s) ?' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const deleteDept = this.selection.selected.map(item => item.id);
        this.deleteDepartmentCall({ departmentIds: deleteDept });
      }
    });
  }

  deleteDepartmentCall(deptIds) {
    this.departmentService.deleteDepartment(deptIds).subscribe(res => {
      this.fetchAllDepartments();
      this.commonService.openSnackBar('Department(s) deleted Successfully');
    });
  }

}
