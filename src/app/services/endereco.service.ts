import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Endereco } from '../models/endereco/endereco.model';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  private apiUrl = `${environment.apiUrl}/api/v1/consultar/cep`;
  
  constructor(private http: HttpClient) { }

  getEndereco(cep: string) {
    return this.http.get<Endereco>(`${this.apiUrl}/${cep}`);
  }
}
