import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Cidade } from '../../../models/cidade/cidade.model';
import { CidadeService } from '../../../services/cidade/cidade.service';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cidade-update',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, RouterModule],
  templateUrl: './cidade-update.component.html',
  styleUrl: './cidade-update.component.css'
})
export class CidadeUpdateComponent implements OnInit {
  cidadeForm: FormGroup;
  fetchedCidade: Cidade | null = null;

  constructor(
    private cidadeService: CidadeService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.cidadeForm = this.fb.group({
      id: [''],
      nome: ['', Validators.required],
      ibge: ['', Validators.required],
      uf: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fetchCidade(+id);
    }
  }

  fetchCidade(id: number): void {
    this.cidadeService.getById(id).subscribe(cidade => {
      if (cidade) {
        this.fetchedCidade = cidade;

        this.cidadeForm.patchValue({
          id: cidade.id,
          nome: cidade.nome,
          ibge: cidade.ibge,
          uf: cidade.uf
        });
      }
    }, () => {
      this.toastr.error('Erro ao recuperar a cidade', 'Erro!');
    });
  }

  onSubmit(): void {
    if (this.cidadeForm.valid) {
      const id = this.cidadeForm.get('id')!.value;

      this.cidadeService.updateCidade(id, this.cidadeForm.value).subscribe({
        next: () => {
          this.toastr.success('Cidade atualizada com sucesso.', 'Sucesso!');
          this.router.navigate(['/cidade-list']);
        },
        error: () => {
          this.toastr.error('Erro ao atualizar a cidade.', 'Erro!');
        }
      });
    } else {
      this.toastr.error('Por favor, preencha todos os campos do formulário.', 'Erro!')
    }
  }

}
