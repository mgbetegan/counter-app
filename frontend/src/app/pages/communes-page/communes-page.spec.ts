import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunesPage } from './communes-page';

describe('CommunesPage', () => {
  let component: CommunesPage;
  let fixture: ComponentFixture<CommunesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommunesPage],
    }).compileComponents();

    fixture = TestBed.createComponent(CommunesPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
