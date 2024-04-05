import { Component, OnInit } from '@angular/core';
import { TopNavigationService } from '@mapp-ui/common';
import { ThemePalette } from '@angular/material/core';
import { FormControl, Validators } from '@angular/forms';
import { AcceptValidator, MaxSizeValidator } from '@angular-material-components/file-input';
import { HttpClient } from '@angular/common/http';

declare const require: any;

const presetFile = new File([], "file 1");

@Component({
  templateUrl: './content-store.component.html',
  styleUrls: ['./content-store.component.css']
})
export class ContentStoreComponent implements OnInit {

  showMessage = true;
  color: ThemePalette = 'primary';
  accept: string;
  contentName: string;
  contentDescription: string;
  maxSize= 1;
  disabled: boolean = false;

  fileControl: FormControl;
  public files: any;

  constructor(private tns: TopNavigationService, private http:HttpClient) {
	this.fileControl = new FormControl(this.files, [
		Validators.required,
		MaxSizeValidator(this.maxSize * 1024)
	]);
	this.accept = "video/*,image/*";
  }

  ngOnInit() {
    // this.tns.addServiceVersionInfo('first service: 1.2.3');
    // this.tns.addServiceVersionInfo('second service: 1.2.5');
	this.fileControl.valueChanges.subscribe((files: any) => {
      this.files = [files];
    })
	
  }

  onFileSelected(event: any): void {
	  console.log(this.fileControl);
  }
  
  onUpload() {
    const formData = new FormData();
	formData.append('name', this.contentName);
    formData.append('description', this.contentDescription);
    formData.append('file', this.files[0]);
 
    this.http.post<any>('http://localhost:8000/api/content-store/cs-elements', formData).subscribe(
      (response) => {
        console.log('Image uploaded successfully:', response);
      },
      (error) => {
        console.error('Error uploading image:', error);
      }
    );
  }
  
  clearForm(): void {
    this.contentName = '';
    this.contentDescription = '';
    this.files = null;
  }
}