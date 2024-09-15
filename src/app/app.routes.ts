import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PessoaCreateComponent } from './components/pessoa/pessoa-create/pessoa-create.component';
import { PessoaUpdateComponent } from './components/pessoa/pessoa-update/pessoa-update.component';
import { PessoaListComponent } from './components/pessoa/pessoa-list/pessoa-list.component';
import { CidadeListComponent } from './components/cidade/cidade-list/cidade-list.component';
import { CidadeUpdateComponent } from './components/cidade/cidade-update/cidade-update.component';
import { CidadeCreateComponent } from './components/cidade/cidade-create/cidade-create.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home page'
  },
  {
    path: 'pessoa-create',
    component: PessoaCreateComponent,
    title: 'Cadastrar Pessoa'
  },
  {
    path: 'pessoa-update/:id',
    component: PessoaUpdateComponent,
    title: 'Editar Pessoa'
  },
  {
    path: 'pessoa-list',
    component: PessoaListComponent,
    title: 'Visualizar Pessoa'
  },
  {
    path: 'cidade-create',
    component: CidadeCreateComponent,
    title: 'Cadastrar Cidade'
  },
  {
    path: 'cidade-update/:id',
    component: CidadeUpdateComponent,
    title: 'Editar Cidade'
  },
  {
    path: 'cidade-list',
    component: CidadeListComponent,
    title: 'Visualizar Cidade'
  }
];