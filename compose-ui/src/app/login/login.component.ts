import { Component, OnInit } from '@angular/core';
import { TopNavigationService } from '@mapp-ui/common';
import { APIService } from '../api.service';
import { AuthService } from '../auth.service';

declare const require: any;

@Component({
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  showMessage = true;

  constructor(private tns: TopNavigationService, private apiService: APIService, private authService: AuthService) { }

  ngOnInit() {
    
  }

  loginOnClick() {
    //this.authService.logout().subscribe();
    window.location.href = 'http://localhost:8000/login';
  }

}
