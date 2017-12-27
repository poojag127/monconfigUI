import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CavMonHeaderTopNavBarComponent } from './cav-mon-header-top-nav-bar.component';

describe('CavMonHeaderTopNavBarComponent', () => {
  let component: CavMonHeaderTopNavBarComponent;
  let fixture: ComponentFixture<CavMonHeaderTopNavBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CavMonHeaderTopNavBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CavMonHeaderTopNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
