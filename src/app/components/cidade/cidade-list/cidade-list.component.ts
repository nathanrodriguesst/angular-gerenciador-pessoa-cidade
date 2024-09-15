import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Cidade } from '../../../models/cidade/cidade.model';
import { CidadeService } from '../../../services/cidade.service';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-cidade-list',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCheckboxModule, FormsModule, ReactiveFormsModule],
  templateUrl: './cidade-list.component.html',
  styleUrl: './cidade-list.component.css'
})
export class CidadeListComponent implements OnInit {
  searchForm: FormGroup;
  cidades: Cidade[] = [];
  selectedCidadeId: number | null = null;

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
    this.fetchCidades();
  }

  fetchCidades(): void {
    this.cidadeService.getAll().subscribe(cidades => {
      this.cidades = cidades;
    })
  }

  deleteCidade(id: number): void {
    if (confirm('Tem certeza que deseja deletar essa cidade?')) {
      this.cidadeService.deleteCidade(id).subscribe({
        next: () => {
          this.fetchCidades();
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
    const searchQuery = this.searchForm.value.searchQuery;

    if (searchQuery == "") {
      this.fetchCidades();
    } else {
      this.cidadeService.getByNome(searchQuery).subscribe(cidades => {
        this.cidades = cidades;
      });
    }
  }
}
