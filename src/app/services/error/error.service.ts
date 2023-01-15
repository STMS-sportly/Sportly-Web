import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorHandlerComponent } from 'src/app/error-handler/error-handler.component';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(
    private apiService: ApiService,
    private dialogRef: MatDialog,
  ) { }

  displayErrorMsg(): void {
    if(this.apiService.errorMessage != null){
      return;
    }
    this.clearErrorMsg();
  }

  clearErrorMsg(): void {
    this.apiService.errorMessage = null;
  }
}
