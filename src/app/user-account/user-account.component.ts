import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service'
@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {

  user$ = this.authService.user$;

  constructor(
    private readonly authService: AuthService,
  ) { }

  ngOnInit(): void {
  }

}
