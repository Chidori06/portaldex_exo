import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaneteCard } from './planete-card';

describe('PlaneteCard', () => {
  let component: PlaneteCard;
  let fixture: ComponentFixture<PlaneteCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaneteCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaneteCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
