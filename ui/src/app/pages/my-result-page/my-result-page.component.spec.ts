import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyResultPageComponent } from './my-result-page.component';
import { AppModule } from '../../app.module';
import { provideHttpClient } from '@angular/common/http';
import { ResultService } from '../../services/result.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';

describe('MyResultPageComponent', () => {
  let component: MyResultPageComponent;
  let fixture: ComponentFixture<MyResultPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastrModule.forRoot(), AppModule],
      declarations: [MyResultPageComponent],
      providers: [provideHttpClient(), ResultService, ToastrService],
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyResultPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
