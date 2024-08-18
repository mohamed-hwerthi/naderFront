import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideAdminComponent } from './side-admin.component';

describe('SideAdminComponent', () => {
  let component: SideAdminComponent;
  let fixture: ComponentFixture<SideAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SideAdminComponent]
    });
    fixture = TestBed.createComponent(SideAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
