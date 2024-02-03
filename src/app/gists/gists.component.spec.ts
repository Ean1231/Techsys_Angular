import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GistsComponent } from './gists.component';

describe('GistsComponent', () => {
  let component: GistsComponent;
  let fixture: ComponentFixture<GistsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GistsComponent]
    });
    fixture = TestBed.createComponent(GistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
