import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicTableviewComponent } from './dynamic-tableview.component';

describe('DynamicTableviewComponent', () => {
  let component: DynamicTableviewComponent;
  let fixture: ComponentFixture<DynamicTableviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicTableviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicTableviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
