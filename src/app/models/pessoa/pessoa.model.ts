import { Cidade } from "../cidade/cidade.model";

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