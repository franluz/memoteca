import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-pensamento',
  templateUrl: './pensamento.component.html',
  styleUrls: ['./pensamento.component.css']
})
export class PensamentoComponent implements OnInit {
  @Input() pensamento = {
    conteudo: 'I Love Angular',
    autoria: 'Fran luz',
    modelo: 'modelo3'
  }
  constructor() { }

  ngOnInit(): void {
  }

}
