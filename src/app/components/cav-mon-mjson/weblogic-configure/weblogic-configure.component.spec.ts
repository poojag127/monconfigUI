import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeblogicConfigureComponent } from './weblogic-configure.component';

describe('WeblogicConfigureComponent', () => {
  let component: WeblogicConfigureComponent;
  let fixture: ComponentFixture<WeblogicConfigureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeblogicConfigureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeblogicConfigureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
