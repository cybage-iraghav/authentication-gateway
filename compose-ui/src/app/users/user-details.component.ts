import { Component, OnInit } from '@angular/core';
import { TopNavigationService } from '@mapp-ui/common';
import { APIService } from '../api.service';

declare const require: any;

@Component({
  templateUrl: './user-details.component.html',
})
export class UserDetailsComponent implements OnInit {

  user: any=[];

  constructor(private tns: TopNavigationService, private apiService: APIService) { }

  ngOnInit() {
    this.apiService.getUserDetails().subscribe((data) =>{
      this.user = <any>data;
    });
  }

}
