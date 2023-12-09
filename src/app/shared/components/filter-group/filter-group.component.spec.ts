import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterGroupComponent } from './filter-group.component';

describe('FilterGroupComponent', () => {
  let component: FilterGroupComponent;
  let fixture: ComponentFixture<FilterGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FilterGroupComponent]
    });
    fixture = TestBed.createComponent(FilterGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
