import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { EditTeamInfoComponent } from './edit-team-info.component';

describe('EditTeamInfoComponent', () => {
  let component: EditTeamInfoComponent;
  let fixture: ComponentFixture<EditTeamInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        MatDialogModule,
        MatInputModule,
        BrowserAnimationsModule ],
      declarations: [ EditTeamInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTeamInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
