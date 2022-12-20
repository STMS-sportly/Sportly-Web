import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { RouterTestingModule } from '@angular/router/testing';

import { ChangeRoleDialogComponent } from './change-role-dialog.component';

describe('ChangeRoleDialogComponent', () => {
  let component: ChangeRoleDialogComponent;
  let fixture: ComponentFixture<ChangeRoleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        MatDialogModule,
        MatInputModule,
        MatRadioModule,
        FormsModule ],
      declarations: [ ChangeRoleDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeRoleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
