import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-pensamento',
  templateUrl: './listar-pensamento.component.html',
  styleUrls: ['./listar-pensamento.component.css']
})
export class ListarPensamentoComponent implements OnInit {
  listaPensamentos: Pensamento[] = [];
  paginaAtual: number = 1;
  haMaisPensamentos: boolean = true;
  filtro: string = '';
  favoritos: boolean = false;
  listaFavoritos: Pensamento[] = [];
  titulo = "Meus pensamentos";

  constructor(private service: PensamentoService,
    private router: Router
  ) { }
  recarregarComponente() {
    this.titulo = "Meus pensamentos";
    this.favoritos = false;
    this.paginaAtual = 1;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false
    this.router.onSameUrlNavigation = 'reload'
    this.router.navigate([this.router.url])
  }

  ngOnInit(): void {
    this.listarTodosOsPensamentos();
  }
  listarTodosOsPensamentos() {
    this.service.listar(this.paginaAtual, this.filtro, false).subscribe((listaPensamentos) => {
      this.listaPensamentos = listaPensamentos
    });
  }

  carregarMaisPensamentos() {
    this.service.listar(++this.paginaAtual, this.filtro, this.favoritos)
      .subscribe((listaPensamentos) => {
        this.listaPensamentos.push(...listaPensamentos);
        if (!listaPensamentos.length) {
          this.haMaisPensamentos = false
        }
      })
  }
  pesquisarPensamentos() {
    this.haMaisPensamentos = true;
    this.paginaAtual = 1;
    this.service.listar(this.paginaAtual, this.filtro, this.favoritos)
      .subscribe(listaPensamentos => {
        this.listaPensamentos = listaPensamentos
      })

  }
  listarFavoritos() {
    this.titulo = "Meus favoritos"
    this.favoritos = true
    this.paginaAtual = 1;
    this.haMaisPensamentos = true
    this.service.listar(this.paginaAtual, this.filtro, this.favoritos)
      .subscribe(listaFavoritos => {
        this.listaPensamentos = listaFavoritos,
          this.listaFavoritos = listaFavoritos
      })
  }
}
