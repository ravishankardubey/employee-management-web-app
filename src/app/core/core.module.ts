import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MaterialModule } from './../material.module';
import { FooterComponent } from './component/footer/footer.component';
import { HeaderComponent } from './component/header/header.component';
import { ApiService } from './services/api/api.service';
import { RouterModule } from '@angular/router';
import { ConfirmationComponent } from './modal/confirmation/confirmation.component';
import { SnackbarComponent } from './snackbar/snackbar/snackbar.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ConfirmationComponent,
    SnackbarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ],
  providers: [
    ApiService
  ],
  entryComponents: [ConfirmationComponent, SnackbarComponent]
})
export class CoreModule { }
