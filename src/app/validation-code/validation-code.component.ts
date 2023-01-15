import { Component, ViewChild, OnDestroy } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TeamService } from '../services/teams/team.service';
import { ErrorService } from '../services/error/error.service';

@Component({
  selector: 'app-validation-code',
  templateUrl: './validation-code.component.html',
  styleUrls: ['./validation-code.component.css']
})
export class ValidationCodeComponent implements OnDestroy{
  otp: string | null = null;
  isOtpValid: boolean = false;
  showOtpComponent = true;

  constructor(
    public apiService: ApiService,
    public dialogRef: MatDialog,
    public teamService: TeamService,
    public errorService: ErrorService
  ) { }

  ngOnDestroy(): void {
    this.teamService.menuAction();
  }

  @ViewChild('ngOtpInput', { static: false}) ngOtpInput: any;
  config = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '4rem',
      'height': '6rem'
    }
  };

  onOtpChange(otp: any) {
    this.otp = otp;
    if(this.otp?.length != 6){
      this.isOtpValid = false;
    }else{
      this.isOtpValid = true;
    }
  }

  setVal(val: any) {
    this.ngOtpInput.setValue(val);
  }

  toggleDisable(){
    if(this.ngOtpInput.otpForm){
      if(this.ngOtpInput.otpForm.disabled){
        this.ngOtpInput.otpForm.enable();
      }else{
        this.ngOtpInput.otpForm.disable();
      }
    }
  }

  onConfigChange(): void {
    this.showOtpComponent = false;
    this.otp = null;
    setTimeout(() => {
      this.showOtpComponent = true;
    }, 0);
  }

  joinTeam(): void {
    this.apiService.joinTeam(this.otp!, this.apiService.userToken!);
    if(this.apiService.errorMessage == null){
      this.dialogRef.closeAll();
    }
  }
}
