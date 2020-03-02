import { Injectable } from '@angular/core';
import { SnackbarComponent } from './../../snackbar/snackbar/snackbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SNACKBAR_TIME } from '../../../../config/constants';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private snackBar: MatSnackBar
  ) { }

  openSnackBar(msg) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: msg,
      duration: SNACKBAR_TIME * 1000
    });
  }
}
