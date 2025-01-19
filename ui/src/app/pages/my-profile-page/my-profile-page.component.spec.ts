import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProfilePageComponent } from './my-profile-page.component';
import { UserService } from '../../services/user.service';
import { provideHttpClient } from '@angular/common/http';
import { AppModule } from '../../app.module';

describe('MyProfilePageComponent', () => {
  let component: MyProfilePageComponent;
  let fixture: ComponentFixture<MyProfilePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [MyProfilePageComponent],
      providers: [UserService, provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
