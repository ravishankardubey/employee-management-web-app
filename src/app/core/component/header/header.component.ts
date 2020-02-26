import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { THEMES, DEFAULT_THEME } from '../../../../config/constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() changeTheme: EventEmitter<any> = new EventEmitter();
  selectedTheme: string = DEFAULT_THEME;
  THEMES = THEMES;
  constructor() { }

  ngOnInit() {
  }

  onThemeChange(theme) {
    this.selectedTheme = theme;
    this.changeTheme.emit(theme);
  }

}
