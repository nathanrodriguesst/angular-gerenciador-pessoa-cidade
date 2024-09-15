import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Cidade } from '../../../models/cidade/cidade.model';
import { PessoaService } from '../../../services/pessoa.service';
import { CidadeService } from '../../../services/cidade.service';
import { ToastrService } from 'ngx-toastr';
import { NgxMaskDirective } from 'ngx-mask';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { EnderecoService } from '../../../services/endereco.service';
import { Endereco } from '../../../models/endereco/endereco.model';

@Component({
  selector: 'app-pessoa-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, NgxMaskDirective],
  templateUrl: './pessoa-create.component.html',
  styleUrl: './pessoa-create.component.css'
})
export class PessoaCreateComponent implements OnInit {
  pessoaForm: FormGroup;
  cidades: Cidade[] = [];

  constructor(
    private fb: FormBuilder,
    private pessoaService: PessoaService,
    private cidadeService: CidadeService,
    private enderecoService: EnderecoService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.pessoaForm = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      endereco: [''],
      numero: [''],
      bairro: [''],
      cep: [''],
      cidadeId: [''],
      telefone: [''],
      email: ['']
    })
  }

  ngOnInit(): void {
    this.cidadeService.getAll().subscribe(cidades => {
      this.cidades = cidades;  
    })
  }

  findCep(event: any): void {    
    var cep = event.target.value;

    if (cep.lenght >= 9) {
      this.enderecoService.getEndereco(cep).subscribe({
        next: (end) => {
            this.pessoaForm.patchValue({
              endereco: end.logradouro,
              bairro: end.bairro,
              cidadeId: end.cidade.id
            });
        },
        error: (error) => {
          console.log(error.error);
        }
      })
    }
  }

  onSubmit(): void {
    if (this.pessoaForm.valid) {
      this.pessoaService.createPessoa(this.pessoaForm.value).subscribe({
        next: () => {
          this.toastr.success('Pessoa cadastrada com sucesso.', 'Sucesso!');
          this.router.navigate(['/pessoa-list']);
        },
        error: () => {
          this.toastr.error('Erro inesperado ao cadastrar Pessoa.', 'Erro!')
        }
      })
    } else {
      this.toastr.warning('Por favor, preencha todos os campos obrigatórios.', 'Aviso!')
    }
  }
}
