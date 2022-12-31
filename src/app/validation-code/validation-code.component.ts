import { Component, ViewChild } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TeamService } from '../services/teams/team.service';

@Component({
  selector: 'app-validation-code',
  templateUrl: './validation-code.component.html',
  styleUrls: ['./validation-code.component.css']
})
export class ValidationCodeComponent{
  otp: string | null = null;
  isOtpValid: boolean = false;
  showOtpComponent = true;

  constructor(
    public apiService: ApiService,
    private readonly router: Router,
    public dialogRef: MatDialog,
    public teamService: TeamService
  ) { }

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

  onConfigChange() {
    this.showOtpComponent = false;
    this.otp = null;
    setTimeout(() => {
      this.showOtpComponent = true;
    }, 0);
  }

  async joinTeam(): Promise<void> {
    this.apiService.joinTeam(this.otp!, this.apiService.userToken!);
    this.teamService.isModalOpen = false;
    this.dialogRef.closeAll();
  }
}
