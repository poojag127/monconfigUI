import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CavMonMenuComponent } from './cav-mon-menu.component';

describe('CavMonMenuComponent', () => {
  let component: CavMonMenuComponent;
  let fixture: ComponentFixture<CavMonMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CavMonMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CavMonMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
