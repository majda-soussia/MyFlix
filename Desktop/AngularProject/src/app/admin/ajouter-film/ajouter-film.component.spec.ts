import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterFilmComponent } from './ajouter-film.component';

describe('AjouterFilmComponent', () => {
  let component: AjouterFilmComponent;
  let fixture: ComponentFixture<AjouterFilmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjouterFilmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterFilmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
