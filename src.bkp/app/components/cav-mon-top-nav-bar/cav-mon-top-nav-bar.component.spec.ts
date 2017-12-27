import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CavMonTopNavBarComponent } from './cav-mon-top-nav-bar.component';

describe('CavMonTopNavBarComponent', () => {
  let component: CavMonTopNavBarComponent;
  let fixture: ComponentFixture<CavMonTopNavBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CavMonTopNavBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CavMonTopNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
