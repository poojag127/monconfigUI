import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationMonitorsRoutingComponent } from './configuration-monitors-routing.component';

describe('ConfigurationMonitorsRoutingComponent', () => {
  let component: ConfigurationMonitorsRoutingComponent;
  let fixture: ComponentFixture<ConfigurationMonitorsRoutingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigurationMonitorsRoutingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurationMonitorsRoutingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
