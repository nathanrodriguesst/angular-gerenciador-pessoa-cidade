import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Cidade, PageableResponse } from '../models/cidade/cidade.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CidadeService {
  private apiUrl = `${environment.apiUrl}/gerenciador/cidade`;

  constructor(private http: HttpClient) { }

  createCidade(formData: FormData) {
    return this.http.post<Cidade>(`${this.apiUrl}/create`, formData);
  }

  updateCidade(id: number, formData: FormData) {
    return this.http.put<Cidade>(`${this,this.apiUrl}/update/${id}`, formData);
  }

  deleteCidade(id: number) {
    return this.http.delete<Cidade>(`${this.apiUrl}/delete/${id}`);         
  }

  getById(id: number) {
    return this.http.get<Cidade>(`${this.apiUrl}/id/${id}`);
  }

  getAll() {
    return this.http.get<Cidade[]>(`${this.apiUrl}/all`);
  }

  searchCidade(query: string, page: number, size: number): Observable<PageableResponse<Cidade>> {
    return this.http.get<PageableResponse<Cidade>>(`${this.apiUrl}/search`, { params: { query, page, size } });
  }
}
