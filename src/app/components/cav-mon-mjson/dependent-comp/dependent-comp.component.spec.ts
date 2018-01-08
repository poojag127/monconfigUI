import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DependentCompComponent } from './dependent-comp.component';

describe('DependentCompComponent', () => {
  let component: DependentCompComponent;
  let fixture: ComponentFixture<DependentCompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DependentCompComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DependentCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
