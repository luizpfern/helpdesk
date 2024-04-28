import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PatrimoniosPage } from './patrimonios.page';

describe('PatrimoniosPage', () => {
  let component: PatrimoniosPage;
  let fixture: ComponentFixture<PatrimoniosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PatrimoniosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
