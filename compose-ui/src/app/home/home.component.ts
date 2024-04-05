import { Component, OnInit } from '@angular/core';
import { TopNavigationService } from '@mapp-ui/common';
import { APIService } from '../api.service';
import { AuthService } from '../auth.service';

declare const require: any;
const versionInfo = require('./version.json');

@Component({
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  version = versionInfo.version;
  showMessage = true;

  constructor(private tns: TopNavigationService, private apiService: APIService, private authService: AuthService) { }

  ngOnInit() {    
  }

  logoutOnClick() {
    //this.authService.logout().subscribe();
    window.location.href = 'http://localhost:8000/logout';
  }

}
