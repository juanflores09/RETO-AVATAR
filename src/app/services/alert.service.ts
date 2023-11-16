import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogWarningComponent } from '../components/alerts/dialog-warning/dialog-warning.component';
import { DialogLoadingComponent } from '../components/alerts/dialog-loading/dialog-loading.component';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private dialogAlert: MatDialog,
  ) { }

  public warningDialog(message: string) {
    this.dialogAlert.open(DialogWarningComponent, {
      maxWidth: '400px',
      data: {
        message: message
      }
    });
  }

  public dialogLoading: any;
  public loadingDialogShow(message: string) {
    this.dialogLoading = this.dialogAlert.open(DialogLoadingComponent, {
      data: {
        message: message
      },
      disableClose: true
    });
  }
  public loadingDialogClose() {
    this.dialogLoading.close();
  }
}
