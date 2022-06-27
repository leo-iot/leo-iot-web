import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorboxStatusComponent } from './sensorbox-status.component';

describe('SensorboxStatusComponent', () => {
  let component: SensorboxStatusComponent;
  let fixture: ComponentFixture<SensorboxStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SensorboxStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorboxStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
