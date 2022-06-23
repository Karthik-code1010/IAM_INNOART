import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAccountDetailsComponent } from './create-account-details.component';

describe('CreateAccountDetailsComponent', () => {
  let component: CreateAccountDetailsComponent;
  let fixture: ComponentFixture<CreateAccountDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAccountDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAccountDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
