import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(
    private modal: NgbModal,
    public dialog: MatDialog
  ) { }

}
