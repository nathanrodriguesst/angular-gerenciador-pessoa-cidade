import { Component, Injectable } from '@angular/core';
import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';


export function CustomPaginator(): MatPaginatorIntl {
  const customPaginatorIntl = new MatPaginatorIntl();

  customPaginatorIntl.itemsPerPageLabel = 'Itens por página';
  customPaginatorIntl.nextPageLabel = 'Próxia';
  customPaginatorIntl.previousPageLabel = 'Anterior';
  customPaginatorIntl.firstPageLabel = 'Primeira página';
  customPaginatorIntl.lastPageLabel = 'Última página';

  customPaginatorIntl.getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return `Página 1 de 1`;
    }
    const totalPages = Math.ceil(length / pageSize);
    return `Página ${page + 1} de ${totalPages}`;
  };

  return customPaginatorIntl;
}

@Component({
  selector: 'app-custom-paginator',
  standalone: true,
  imports: [MatPaginatorModule],
  templateUrl: './custom-paginator.component.html',
  styleUrl: './custom-paginator.component.css'
})
export class CustomPaginatorComponent {}
