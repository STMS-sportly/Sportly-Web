import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import {Clipboard} from '@angular/cdk/clipboard';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-validation-code-pop-up',
  templateUrl: './validation-code-pop-up.component.html',
  styleUrls: ['./validation-code-pop-up.component.css']
})
export class ValidationCodePopUpComponent implements OnInit {

  constructor(
    public apiService: ApiService,
    private clipboard: Clipboard,
    private dialogRef: MatDialog
  ) { }

  ngOnInit(): void {
  }

  copyCode(): void {
    this.clipboard.copy(this.apiService.invitationCode.code);
    this.dialogRef.closeAll();
  }

}
