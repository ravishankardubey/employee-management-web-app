import { Component, OnInit } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { LIGHT_THEME, DARK_THEME, DEFAULT_THEME } from '../config/constants';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'employee-management';
  themeClass = '';

  constructor(
    private overlayContainer: OverlayContainer
  ) { }

  ngOnInit() {
    this.onThemeChange(DEFAULT_THEME);
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
