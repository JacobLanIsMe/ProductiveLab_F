import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMediumInfoComponent } from './show-medium-info.component';

describe('ShowMediumInfoComponent', () => {
  let component: ShowMediumInfoComponent;
  let fixture: ComponentFixture<ShowMediumInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowMediumInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowMediumInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
