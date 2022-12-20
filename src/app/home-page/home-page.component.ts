import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { ApiService } from '../services/api/api.service';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent{

  login$!: Observable<any>;

  constructor(
    public angularFireAuth: AngularFireAuth,
    private readonly authService: AuthService,
    private readonly router: Router,
    public apiService: ApiService,
  ) { }

  async login(): Promise<void> {
    this.login$ = this.authService.login().
      pipe(
        tap(() =>
        this.router.navigateByUrl('/loginPage'))
      );
  }

  mobileApp(): void {
    this.router.navigateByUrl('/mobileapp');
  }

}
