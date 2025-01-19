import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanPageComponent } from './loan-page.component';
import { AppModule } from '../../app.module';
import { provideHttpClient } from '@angular/common/http';

describe('LoanPageComponent', () => {
  let component: LoanPageComponent;
  let fixture: ComponentFixture<LoanPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [LoanPageComponent],
      providers: [provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
