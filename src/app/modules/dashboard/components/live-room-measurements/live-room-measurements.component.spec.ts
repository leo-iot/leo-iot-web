import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveRoomMeasurementsComponent } from './live-room-measurements.component';

describe('LiveRoomMeasurementsComponent', () => {
  let component: LiveRoomMeasurementsComponent;
  let fixture: ComponentFixture<LiveRoomMeasurementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveRoomMeasurementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveRoomMeasurementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
