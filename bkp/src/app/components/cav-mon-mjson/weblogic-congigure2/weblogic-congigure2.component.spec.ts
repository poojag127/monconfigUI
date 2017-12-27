import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeblogicCongigure2Component } from './weblogic-congigure2.component';

describe('WeblogicCongigure2Component', () => {
  let component: WeblogicCongigure2Component;
  let fixture: ComponentFixture<WeblogicCongigure2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeblogicCongigure2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeblogicCongigure2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
