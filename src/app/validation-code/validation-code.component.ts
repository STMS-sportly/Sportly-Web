import { Component, ViewChild } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';

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
  ) { }

  @ViewChild('ngOtpInput', { static: false}) ngOtpInput: any;
  config = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '7rem',
      'height': '10rem'
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
    const userToken = await Promise.resolve(firebase.auth().currentUser?.getIdToken(true));
    this.apiService.joinTeam(this.otp!, userToken!);
    this.router.navigateByUrl('loginPage');
    this.apiService.getTeams(userToken!);
  }
}
