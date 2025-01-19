import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanFormComponent } from './loan-form.component';
import { AppModule } from '../../app.module';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../../services/authentication.service';
import { provideHttpClient } from '@angular/common/http';

describe('LoanFormComponent', () => {
  let component: LoanFormComponent;
  let fixture: ComponentFixture<LoanFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastrModule.forRoot(), AppModule],
      declarations: [LoanFormComponent],
      providers: [provideHttpClient(), ToastrService, AuthenticationService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
