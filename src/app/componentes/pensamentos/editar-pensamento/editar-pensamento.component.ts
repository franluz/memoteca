import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-pensamento',
  templateUrl: './editar-pensamento.component.html',
  styleUrls: ['./editar-pensamento.component.css']
})
export class EditarPensamentoComponent implements OnInit {
  private id?: any;
  formulario!: FormGroup
  constructor(private service: PensamentoService,
    private router: Router,
    private route: ActivatedRoute,
    private formBulder: FormBuilder
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.id = id;
    console.log(`teste de id {}`, id)
    this.service.buscarPorId(parseInt(id!)).subscribe((pensamento) =>
      this.formulario = this.formBulder.group({
        id:[this.id],
        conteudo: [pensamento.conteudo,
          Validators.compose([
            Validators.required,
            Validators.pattern(/(.|\s)*\S(.|\s)*/),
          ],)],

        autoria: [pensamento.autoria, Validators.compose([
          Validators.required,
          Validators.minLength(3)
        ])],
        modelo: [pensamento.modelo],
        favoritos:[pensamento.favorito]
      }))
  }
  editarPensamento() {
      this.service.editar(this.formulario.value).subscribe(() =>
      this.router.navigate(['/listarPensamento']))
  }
  cancelar() {
    this.router.navigate(['/listarPensamento'])
  }
  habilitarBotao(): String {
    if (this.formulario.valid) {
      return 'botao';
    } else {
      return 'botao__desabilitado';
    }
  }

}
