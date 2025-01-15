import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanListItemComponent } from './loan-list-item.component';

describe('LoanListItemComponent', () => {
  let component: LoanListItemComponent;
  let fixture: ComponentFixture<LoanListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoanListItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
