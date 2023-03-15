import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperateSpermComponent } from './operate-sperm.component';

describe('OperateSpermComponent', () => {
  let component: OperateSpermComponent;
  let fixture: ComponentFixture<OperateSpermComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperateSpermComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperateSpermComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
