import { Component } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { ErrorService } from '../services/error/error.service';

@Component({
  selector: 'app-error-handler',
  templateUrl: './error-handler.component.html',
  styleUrls: ['./error-handler.component.css']
})
export class ErrorHandlerComponent {

  constructor(
    public apiService: ApiService,
    private errorService: ErrorService
  ){}

}
