import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureWeblogicComponent } from './configure-weblogic.component';

describe('ConfigureWeblogicComponent', () => {
  let component: ConfigureWeblogicComponent;
  let fixture: ComponentFixture<ConfigureWeblogicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigureWeblogicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigureWeblogicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
