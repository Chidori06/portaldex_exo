import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Planetes } from './planetes';

describe('Planetes', () => {
  let component: Planetes;
  let fixture: ComponentFixture<Planetes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Planetes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Planetes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
