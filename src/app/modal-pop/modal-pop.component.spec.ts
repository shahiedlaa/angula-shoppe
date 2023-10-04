import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPopComponent } from './modal-pop.component';

describe('ModalPopComponent', () => {
  let component: ModalPopComponent;
  let fixture: ComponentFixture<ModalPopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalPopComponent]
    });
    fixture = TestBed.createComponent(ModalPopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
