import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranstornosPage } from './transtornos.page';

describe('TranstornosPage', () => {
  let component: TranstornosPage;
  let fixture: ComponentFixture<TranstornosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TranstornosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
