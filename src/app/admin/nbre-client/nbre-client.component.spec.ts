import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NbreClientComponent } from './nbre-client.component';

describe('NbreClientComponent', () => {
  let component: NbreClientComponent;
  let fixture: ComponentFixture<NbreClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NbreClientComponent]
    });
    fixture = TestBed.createComponent(NbreClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
