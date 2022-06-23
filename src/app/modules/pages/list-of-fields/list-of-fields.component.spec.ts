import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfFieldsComponent } from './list-of-fields.component';

describe('ListOfFieldsComponent', () => {
  let component: ListOfFieldsComponent;
  let fixture: ComponentFixture<ListOfFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfFieldsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
