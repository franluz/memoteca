import { Component, OnInit, Input } from '@angular/core';
import { Pensamento } from '../pensamento';
import { FormGroup } from '@angular/forms';
import { PensamentoService } from '../pensamento.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pensamento',
  templateUrl: './pensamento.component.html',
  styleUrls: ['./pensamento.component.css']
})
export class PensamentoComponent implements OnInit {
  @Input() pensamento: Pensamento = {
    id: 0,
    conteudo: 'I Love Angular',
    autoria: 'Fran luz',
    modelo: 'modelo3',
    favorito: false
  }
  @Input() listaFavoritos: Pensamento[] = []

  constructor(private service: PensamentoService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  larguraPensamento(): string {
    if (this.pensamento.conteudo.length >= 256) {
      return "pensamento-g";
    }
    return "pensamento-p";
  }
  mudarIconeFavorito(): string {
    if (this.pensamento.favorito == false) {
      return "inativo";
    } else {
      return "ativo"
    }
  }
  atualizarFavorito() {
    this.service.mudarFavorito(this.pensamento).subscribe(() =>
      this.listaFavoritos.splice(this.listaFavoritos.indexOf(this.pensamento), 1))
  }
}
