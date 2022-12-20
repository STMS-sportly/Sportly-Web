import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersTeamsComponent } from './users-teams.component';

describe('UsersTeamsComponent', () => {
  let component: UsersTeamsComponent;
  let fixture: ComponentFixture<UsersTeamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersTeamsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
