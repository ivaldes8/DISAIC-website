import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselTeamaComponent } from './carousel-teama.component';

describe('CarouselTeamaComponent', () => {
  let component: CarouselTeamaComponent;
  let fixture: ComponentFixture<CarouselTeamaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarouselTeamaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselTeamaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
