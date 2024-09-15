import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoaUpdateComponent } from './pessoa-update.component';

describe('PessoaUpdateComponent', () => {
  let component: PessoaUpdateComponent;
  let fixture: ComponentFixture<PessoaUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PessoaUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PessoaUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
