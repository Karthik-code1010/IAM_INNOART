import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAccountThemeComponent } from './create-account-theme.component';

describe('CreateAccountThemeComponent', () => {
  let component: CreateAccountThemeComponent;
  let fixture: ComponentFixture<CreateAccountThemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAccountThemeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAccountThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
