import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentityAccessComponent } from './identity-access.component';

describe('IdentityAccessComponent', () => {
  let component: IdentityAccessComponent;
  let fixture: ComponentFixture<IdentityAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdentityAccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentityAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
