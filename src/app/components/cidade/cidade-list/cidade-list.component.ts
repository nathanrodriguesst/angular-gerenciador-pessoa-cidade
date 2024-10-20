import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Cidade, PageableResponse } from '../../../models/cidade/cidade.model';
import { CidadeService } from '../../../services/cidade/cidade.service';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-cidade-list',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCheckboxModule, FormsModule, ReactiveFormsModule, MatPaginatorModule],
  templateUrl: './cidade-list.component.html',
  styleUrl: './cidade-list.component.css'
})
export class CidadeListComponent implements OnInit {
  searchForm: FormGroup;
  cidades: Cidade[] = [];
  selectedCidadeId: number | null = null;
  pageSize: number = 5;
  currentPage: number = 0;
  totalElements: number = 0;
  query: string = '';

  constructor(
    private fb: FormBuilder,
    private cidadeService: CidadeService,
    private toastr: ToastrService,
  ) {  
    this.searchForm = this.fb.group({
      searchQuery: ['']
    });
  }

  ngOnInit(): void {
    this.fetchCidades(this.currentPage);
  }

  fetchCidades(currentPage: number): void {
    this.cidadeService.searchCidade(this.query, currentPage, this.pageSize).subscribe((data: PageableResponse<Cidade>) => {
      this.cidades = data.content;
      this.currentPage = data.number;
      this.totalElements = data.totalElements;
      this.currentPage = data.number;
    })
  }

  pageChanged(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.fetchCidades(this.currentPage)
  }

  deleteCidade(id: number): void {
    if (confirm('Tem certeza que deseja deletar essa cidade?')) {
      this.cidadeService.deleteCidade(id).subscribe({
        next: () => {
          this.fetchCidades(this.currentPage);
          this.toastr.success('Cidade deletada com sucesso.', 'Sucesso!')
        }, 
        error: (error) => {
          this.toastr.error( error.error, 'Erro!');
        }
      })
    }
  }

  selectCidade(cidadeId: number): void {
    this.selectedCidadeId = this.selectedCidadeId === cidadeId ? null : cidadeId;
  }

  onSubmit(): void {
    this.query = this.searchForm.value.searchQuery;
    this.fetchCidades(this.currentPage);
  }
}
