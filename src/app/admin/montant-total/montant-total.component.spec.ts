import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MontantTotalComponent } from './montant-total.component';

describe('MontantTotalComponent', () => {
  let component: MontantTotalComponent;
  let fixture: ComponentFixture<MontantTotalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MontantTotalComponent]
    });
    fixture = TestBed.createComponent(MontantTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
