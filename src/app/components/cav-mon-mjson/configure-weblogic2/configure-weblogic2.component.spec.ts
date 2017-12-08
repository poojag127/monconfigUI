import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureWeblogic2Component } from './configure-weblogic2.component';

describe('ConfigureWeblogic2Component', () => {
  let component: ConfigureWeblogic2Component;
  let fixture: ComponentFixture<ConfigureWeblogic2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigureWeblogic2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigureWeblogic2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
