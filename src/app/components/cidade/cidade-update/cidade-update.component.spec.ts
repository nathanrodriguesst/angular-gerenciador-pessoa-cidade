import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CidadeUpdateComponent } from './cidade-update.component';

describe('CidadeUpdateComponent', () => {
  let component: CidadeUpdateComponent;
  let fixture: ComponentFixture<CidadeUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CidadeUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CidadeUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
