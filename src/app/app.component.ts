import { Component, OnInit } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { LIGHT_THEME, DARK_THEME, DEFAULT_THEME } from '../config/constants';
import { LoaderService } from './core/services/loader/loader.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'employee-management';
  themeClass = '';
  isLoaderActive = false;

  constructor(
    private overlayContainer: OverlayContainer,
    private loaderService: LoaderService
  ) { }

  ngOnInit() {
    this.onThemeChange(DEFAULT_THEME);
    this.loaderService.loaderStatus.subscribe(isLoaderActive => this.isLoaderActive = isLoaderActive);
  }

  onThemeChange(event) {
    if (this.themeClass) {
      this.overlayContainer.getContainerElement().classList.remove(this.themeClass);
    }

    switch (event) {
      case LIGHT_THEME:
        this.themeClass = 'employee-light-theme';
        break;

      case DARK_THEME:
        this.themeClass = 'employee-dark-theme';
        break;
    }

    this.overlayContainer.getContainerElement().classList.add(this.themeClass);
  }
}
