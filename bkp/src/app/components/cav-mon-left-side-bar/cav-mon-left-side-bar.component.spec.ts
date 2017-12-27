import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CavMonLeftSideBarComponent } from './cav-mon-left-side-bar.component';

describe('CavMonLeftSideBarComponent', () => {
  let component: CavMonLeftSideBarComponent;
  let fixture: ComponentFixture<CavMonLeftSideBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CavMonLeftSideBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CavMonLeftSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
