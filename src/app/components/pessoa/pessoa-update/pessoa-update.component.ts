import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { PessoaService } from '../../../services/pessoa.service';
import { ToastrService } from 'ngx-toastr';
import { CidadeService } from '../../../services/cidade.service';
import { Cidade } from '../../../models/cidade/cidade.model';
import { NgxMaskDirective } from 'ngx-mask';
import { EnderecoService } from '../../../services/endereco.service';

@Component({
  selector: 'app-pessoa-update',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, RouterModule, NgxMaskDirective],
  templateUrl: './pessoa-update.component.html',
  styleUrl: './pessoa-update.component.css'
})
export class PessoaUpdateComponent implements OnInit {
  pessoaForm: FormGroup;
  cidades: Cidade[] = [];

  constructor(
    private pessoaService: PessoaService,
    private cidadeService: CidadeService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private enderecoService: EnderecoService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.pessoaForm = this.fb.group({
      id: [''],
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      telefone: [''],
      email: [''],
      endereco: [''],
      numero: [''],
      bairro: [''],
      cidadeId: [''],
      cep: ['']
    })
  }

  ngOnInit(): void {
    this.cidadeService.getAll().subscribe(cidades => {
      this.cidades = cidades;  
    })

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fetchPessoa(+id);
    }
  }

  
  findCep(event: any): void {    
    var cep = event.target.value;

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

  fetchPessoa(id: number): void {
    this.pessoaService.getById(id).subscribe(pessoa => {
      if (pessoa) {
        this.pessoaForm.patchValue({
          id: pessoa.id,
          nome: pessoa.nome,
          cpf: pessoa.cpf,
          telefone: pessoa.telefone,
          email: pessoa.email,
          endereco: pessoa.endereco,
          numero: pessoa.numero,
          bairro: pessoa.bairro,
          cidadeId: pessoa.cidade ? pessoa.cidade.id : null,
          cep: pessoa.cep
        });
      }
    }, () => {
      this.toastr.error('Erro ao recuperar pessoa', 'Erro!');
    });
  }

  onSubmit(): void {
    if (this.pessoaForm.valid) {

      const id = this.pessoaForm.get('id')!.value;

      this.pessoaService.updatePessoa(id, this.pessoaForm.value).subscribe({
        next: () => {
          this.toastr.success('Pessoa atualizada com sucesso.', 'Sucesso!');
          this.router.navigate(['/pessoa-list']);
        },
        error: () => {
          this.toastr.error('Erro ao atualizar pessoa.', 'Erro!');
        }
      });
    } else {
      this.toastr.error('Por favor, preencha todos os campos do formulário.', 'Erro!')
    }
  }
}