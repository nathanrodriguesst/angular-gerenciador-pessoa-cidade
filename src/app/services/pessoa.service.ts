import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Pessoa } from '../models/pessoa/pessoa.model';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {
  private apiUrl = `${environment.apiUrl}/gerenciador/pessoa`;

  constructor(private http: HttpClient) { }

  createPessoa(formData: FormData) {
    return this.http.post<Pessoa>(`${this.apiUrl}/create`, formData);
  }

  updatePessoa(id: number, formData: FormData) {
    return this.http.put<Pessoa>(`${this.apiUrl}/update/${id}`, formData);
  }

  deletePessoa(id: number) {
    return this.http.delete<Pessoa>(`${this.apiUrl}/delete/${id}`);
  }

  getAll() {
    return this.http.get<Pessoa[]>(`${this.apiUrl}/all`);
  }

  getById(id: number) {
    return this.http.get<Pessoa>(`${this.apiUrl}/id/${id}`);
  }

  searchPessoa(query: string) {
    return this.http.get<Pessoa[]>(`${this.apiUrl}/search`, { params: { query } });
  }
}
