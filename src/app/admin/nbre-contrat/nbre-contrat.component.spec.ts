import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NbreContratComponent } from './nbre-contrat.component';

describe('NbreContratComponent', () => {
  let component: NbreContratComponent;
  let fixture: ComponentFixture<NbreContratComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NbreContratComponent]
    });
    fixture = TestBed.createComponent(NbreContratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
