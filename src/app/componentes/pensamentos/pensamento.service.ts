import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Pensamento } from './pensamento';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PensamentoService {

  private readonly API = 'http://localhost:3000/pensamentos';
  constructor(private http: HttpClient) {

  }
  listar(pagina: Number, filtro: string, favorito: boolean): Observable<Pensamento[]> {
    const itensPagina = 6
    let params = new HttpParams()
      .set('_page', pagina + "")
      .set('_limit', itensPagina)
    if (favorito) {
      params = params.set('favorito', favorito)
    }
    if (filtro.trim().length > 2) {
      params = params.set('q', filtro)
    }
    return this.http.get<Pensamento[]>(this.API, { params })
  }

  criar(pensamento: Pensamento): Observable<Pensamento> {

    return this.http.post<Pensamento>(this.API, pensamento)
  }
  editar(pensamento: Pensamento): Observable<Pensamento> {
    const url = `${this.API}/${pensamento.id}`;
    return this.http.put<Pensamento>(url, pensamento);
  }
  excluir(id: Number): Observable<Pensamento> {
    const url = `${this.API}/${id}`;
    return this.http.delete<Pensamento>(url);
  }
  buscarPorId(id: Number): Observable<Pensamento> {
    const url = `${this.API}/${id}`;
    return this.http.get<Pensamento>(url);
  }

  mudarFavorito(pensamento: Pensamento): Observable<Pensamento> {
    pensamento.favorito = !pensamento.favorito
    return this.editar(pensamento)
  }

}
