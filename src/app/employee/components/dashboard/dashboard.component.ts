import { Component, OnInit, ViewChild, } from '@angular/core';
import { EmployeeService } from './../../services/employee.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { EmployeeModalComponent } from '../../modal/employee-modal/employee-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ACTIONS } from '../../../../config/constants';
import { ConfirmationComponent } from './../../../core/modal/confirmation/confirmation.component';
import { CommonService } from './../../../core/services/common/common.service';

export interface EmployeeData {
  id: number;
  first_name: string;
  last_name: string;
  age: number;
  email: string;
  department: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  ACTIONS = ACTIONS;
  displayedColumns: string[] = ['select', 'id', 'first_name', 'last_name', 'age', 'email', 'department', 'action'];
  dataSource: MatTableDataSource<EmployeeData>;
  selection = new SelectionModel<EmployeeData>(true, []);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private employeeService: EmployeeService,
    private dialog: MatDialog,
    private commonService: CommonService
  ) { }

  ngOnInit() {
    this.fetchAllEmployees();
    this.dataSource = new MatTableDataSource([]);
  }

  fetchAllEmployees() {
    this.employeeService.getAllEmployees().subscribe(employees => {
      this.initTable(employees.data);
    });
  }

  fetchEmployee(employeeId) {
    this.employeeService.getEmployee(employeeId).subscribe(employee => {
    });
  }

  initTable(data) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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

  checkboxLabel(row?: EmployeeData): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  addEmployee(action) {
    this.openEmpDialog(action, {});
  }

  editEmployee(action, empData) {
    this.openEmpDialog(action, empData);
  }

  viewEmployee(action, empData) {
    this.openEmpDialog(action, empData);
  }


  openEmpDialog(action, empData): void {
    const dialogRef = this.dialog.open(EmployeeModalComponent, {
      width: '500px', data: { empData: empData, action: action }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchAllEmployees();
        this.commonService.openSnackBar('Employee Created/Updated Successfully');
      }
    });
  }

  deleteEmployee(id) {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '500px',
      data: { msg: 'Do you want to delete this employee ?' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteEmployeeCall({ employeeIds: [id] });
      }
    });
  }

  deleteMultipleEmployee() {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '500px',
      data: { msg: 'Do you want to delete selected employee(s) ?' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const deleteEmp = this.selection.selected.map(item => item.id);
        this.deleteEmployeeCall({ employeeIds: deleteEmp });
      }
    });
  }

  deleteEmployeeCall(empIds) {
    this.employeeService.deleteEmployee(empIds).subscribe(res => {
      this.fetchAllEmployees();
      this.commonService.openSnackBar('Employee(s) deleted Successfully');
    });
  }


}
