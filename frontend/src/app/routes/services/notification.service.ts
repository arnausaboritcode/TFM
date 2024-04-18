import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private toastr: ToastrService) {}

  showSuccess(message: string): void {
    this.toastr.success(`${message}`, 'Success', {
      positionClass: 'toast-top-center',
      enableHtml: true,
      timeOut: 3000,
    });
  }

  showError(message: string): void {
    this.toastr.error(`${message}`, 'Error', {
      positionClass: 'toast-top-center',
      enableHtml: true,
      timeOut: 3000,
    });
  }
}
