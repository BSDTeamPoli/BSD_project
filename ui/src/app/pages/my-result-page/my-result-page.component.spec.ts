import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyResultPageComponent } from './my-result-page.component';

describe('MyResultPageComponent', () => {
  let component: MyResultPageComponent;
  let fixture: ComponentFixture<MyResultPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyResultPageComponent]
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
