import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CidadeService } from '../../../services/cidade.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-cidade-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './cidade-create.component.html',
  styleUrl: './cidade-create.component.css'
})
export class CidadeCreateComponent {
  cidadeForm: FormGroup;
  
  
  constructor(
    private fb: FormBuilder,
    private cidadeService: CidadeService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.cidadeForm = this.fb.group({
      nome: ['', Validators.required],
      ibge: ['', Validators.required],
      uf: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.cidadeForm.valid) {
      this.cidadeService.createCidade(this.cidadeForm.value).subscribe({
        next: () => {
          this.toastr.success('Cidade cadastrada com sucesso.', 'Sucesso!')
          this.router.navigate(['/cidade-list']);
        },
        error: () => {
          this.toastr.error('Erro inesperado ao cadastrar cidade.', 'Erro!')
        }
      })
    } else {
      this.toastr.warning('Por favor, preencha todos os campos.', 'Alerta!')
    }
  }
}
