import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent  {



  showLogoutModal = false;

  constructor(public router: Router) {}

  logout() {
    this.showLogoutModal = true; // Show the confirmation modal
  }

  confirmLogout() {
    // Logic for logging out (e.g., clearing tokens, redirecting to login)
    this.router.navigate(['/login']); // Navigate back to login
  }

  stayOnPage() {
    this.showLogoutModal = false; // Close the modal and stay on the page
  }

}