import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CavMonHomeRightPaneComponent } from './cav-mon-home-right-pane.component';

describe('CavMonHomeRightPaneComponent', () => {
  let component: CavMonHomeRightPaneComponent;
  let fixture: ComponentFixture<CavMonHomeRightPaneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CavMonHomeRightPaneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CavMonHomeRightPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
