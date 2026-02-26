import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpPage } from './up-page';

describe('UpPage', () => {
  let component: UpPage;
  let fixture: ComponentFixture<UpPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpPage],
    }).compileComponents();

    fixture = TestBed.createComponent(UpPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
