import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {

  @ViewChild('deleteModal') deleteModal?: ElementRef;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private toastr: ToastrService,
  ) { }

  loading = false;

  ngOnInit(): void {
  }

  openModal() {
    if (this.deleteModal) {
      this.deleteModal.nativeElement.classList.add('show');
      this.deleteModal.nativeElement.style.display = 'block';
    }
  }

  closeModal() {
    if (this.deleteModal) {
      this.deleteModal.nativeElement.classList.remove('show');
      this.deleteModal.nativeElement.style.display = 'none';
    }
  }

  deleteItem() {
    const currentUser = this.authService.getCurrentUser();
    this.loading = true;
    this.authService.deleteUser(currentUser.id ?? 0).subscribe((data: any) => {
      this.toastr.success('Account deleted successfully');
      this.authService.logout();
      this.router.navigate(['/login']);
    }, (error: any) => {
      this.loading = false;
      console.error('Error:', error);
      if (error.status === 404) {
        this.toastr.error('Account not found');
      } else {
        this.toastr.error('Error deleting account');
      }
    }
    );
  }
}