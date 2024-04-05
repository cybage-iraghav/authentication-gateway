import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeoutService } from './timeout.service';

@Component({
  selector: 'app-modal-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timeout.component.html',
  styleUrls: ['./timeout.component.css']
})
export class TimeoutComponent {

    constructor(private timeoutService: TimeoutService) { }
    
    resetSession() {
        this.timeoutService.resetSession();
    }

    close() {
        this.timeoutService.close();
    }
}