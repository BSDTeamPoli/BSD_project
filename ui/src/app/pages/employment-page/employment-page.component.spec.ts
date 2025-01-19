import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploymentPageComponent } from './employment-page.component';
import { AppModule } from '../../app.module';
import { provideHttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../../services/authentication.service';
import { EmploymentService } from '../../services/employment.service';

describe('EmploymentPageComponent', () => {
  let component: EmploymentPageComponent;
  let fixture: ComponentFixture<EmploymentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [EmploymentPageComponent],
      providers: [provideHttpClient(), ToastrService, AuthenticationService, EmploymentService]

    })
      .compileComponents();

    fixture = TestBed.createComponent(EmploymentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
