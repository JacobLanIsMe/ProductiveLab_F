import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageMediumComponent } from './manage-medium.component';

describe('ManageMediumComponent', () => {
  let component: ManageMediumComponent;
  let fixture: ComponentFixture<ManageMediumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageMediumComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageMediumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
