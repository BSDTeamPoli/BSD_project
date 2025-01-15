import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() title: string = ''; // Title to display on the left
  @Input() endpoint?: string;  // Optional endpoint to navigate to on click

  constructor(private router: Router) {}

  // Navigate to the endpoint if provided
  navigate() {
    if (this.endpoint) {
      this.router.navigate([this.endpoint]);
    }
  }
}
