import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DsodashboardComponent } from './dsodashboard.component';

describe('DsodashboardComponent', () => {
  let component: DsodashboardComponent;
  let fixture: ComponentFixture<DsodashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DsodashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DsodashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
