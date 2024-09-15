import { Cidade } from "../cidade/cidade.model";

export interface Endereco {
    logradouro: string;
    bairro: string;
    ibge: number;
    cidade: Cidade;
}