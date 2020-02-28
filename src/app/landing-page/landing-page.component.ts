import { Component, OnInit } from '@angular/core';
import { ROUTES } from './../../config/constants';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  ROUTES = ROUTES;

  constructor() { }

  ngOnInit() {
  }

}
