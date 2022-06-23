import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobaldataprivacyComponent } from './globaldataprivacy.component';

describe('GlobaldataprivacyComponent', () => {
  let component: GlobaldataprivacyComponent;
  let fixture: ComponentFixture<GlobaldataprivacyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlobaldataprivacyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobaldataprivacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
