import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Pessoa } from '../../../models/pessoa/pessoa.model';
import { PessoaService } from '../../../services/pessoa/pessoa.service';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { ToastrService } from 'ngx-toastr';
import { MatCheckbox } from '@angular/material/checkbox';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { PageableResponse } from '../../../models/cidade/cidade.model';

@Component({
  selector: 'app-pessoa-list',
  standalone: true,
  imports: [ 
    CommonModule, 
    RouterLink, 
    NgxMaskDirective, 
    NgxMaskPipe,
    MatCheckbox,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule
  ],
  templateUrl: './pessoa-list.component.html',
  styleUrl: './pessoa-list.component.css'
})
export class PessoaListComponent implements OnInit {
  searchForm: FormGroup;
  pessoas: Pessoa[] = [];
  selectedPessoaId: number | null = null;
  pageSize: number = 5;
  currentPage: number = 0;
  totalElements: number = 0;

  constructor(
    private fb: FormBuilder,
    private pessoaService: PessoaService,
    private toastr: ToastrService,
  ) { 
    this.searchForm = this.fb.group({
      searchQuery: [''],
    });
  }

  ngOnInit(): void {
    this.fetchPessoas(this.currentPage);
  }

  fetchPessoas(currentPage: number): void {
    this.pessoaService.getAllPageable(currentPage, this.pageSize).subscribe((data: PageableResponse<Pessoa>) => {
      this.pessoas = data.content;
      this.currentPage = data.number;
      this.totalElements = data.totalElements;
      this.currentPage = data.number;
    })
  }

  pageChanged(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.fetchPessoas(this.currentPage)
  }

  deletePessoa(id: number): void {
    if (confirm('Tem certeza que deseja deletar essa pessoa?')) {
      this.pessoaService.deletePessoa(id).subscribe({
        next: () => {
          this.fetchPessoas(this.currentPage);
          this.toastr.success('Pessoa deletada com sucesso.', 'Sucesso!')
        }, 
        error: () => {
          this.toastr.error('Erro ao deletar Pessoa.', 'Erro!');
        }
      })
    }
  }

  selectPessoa(pessoaId: number): void {
    this.selectedPessoaId = this.selectedPessoaId === pessoaId ? null : pessoaId;
  }

  onSubmit(): void {
    const searchQuery = this.searchForm.value.searchQuery;

    if (searchQuery == "") {
      this.fetchPessoas(this.currentPage);
    } else {
      this.pessoaService.searchPessoa(searchQuery).subscribe(pessoas => {
        this.pessoas = pessoas;
      });
    }
  }
}