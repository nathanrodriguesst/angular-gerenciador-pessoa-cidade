import { Cidade } from "../cidade/cidade.model";

export interface PageableResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  pageable: Pageable;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface Pessoa {
  id: number;
  nome: string;
  cpf: string;
  endereco: string;
  numero: string;
  bairro: string;
  cep: string;
  cidade: Cidade;
  telefone: string;
  email: string;
}