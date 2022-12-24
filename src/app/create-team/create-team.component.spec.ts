import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, NgModel } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { RouterTestingModule } from '@angular/router/testing';

import { CreateTeamComponent } from './create-team.component';

describe('CreateTeamComponent', () => {
  let component: CreateTeamComponent;
  let fixture: ComponentFixture<CreateTeamComponent>;
  let label: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        MatDialogModule,
        MatInputModule,
        FormsModule ],
      declarations: [ CreateTeamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTeamComponent);
    component = fixture.componentInstance;
    label = fixture.nativeElement.querySelector('label')
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('radio button should have', () => {
    expect(label.textContent).toContain("Professional");
  })

  it('button can be clicked', fakeAsync(() => {
    spyOn(component, 'createTeam');

    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();

    tick();

    expect(component.createTeam).toHaveBeenCalled();
  }));
});
