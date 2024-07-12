import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarPropietarioComponent } from './agregar-propietario.component';

describe('AgregarPropietarioComponent', () => {
  let component: AgregarPropietarioComponent;
  let fixture: ComponentFixture<AgregarPropietarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarPropietarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarPropietarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
