import { Component, Input } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-container',
  templateUrl: './page-container.component.html',
  styleUrls: ['./page-container.component.css']
})
export class PageContainerComponent {
  @Input() title: string = '';
  @Input() authenticated: boolean = false;

  isMenuOpen: boolean = false; // Track menu state
  showHamburgerMenu: boolean = false; // Track if hamburger menu should be shown

  // Endpoint logic based on authentication
  get headerEndpoint(): string {
    return this.authenticated ? '/home' : '/login';
  }

  constructor(private authenticationService: AuthenticationService, private router: Router) {
    // Check screen width on initialization
    this.checkScreenWidth();
    // Listen for window resize events
    window.addEventListener('resize', () => this.checkScreenWidth());
  }

  logout() {
    this.toggleMenu();
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  navigate(endpoint: string) {
    this.toggleMenu();
    this.router.navigate([endpoint]);
  }

  // Toggle the mobile menu
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // Check screen width and update showHamburgerMenu
  checkScreenWidth() {
    this.showHamburgerMenu = window.innerWidth <= 900;
  }
}