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
  listar(pagina: Number): Observable<Pensamento[]> {
    const itensPagina = 6
    let param = new HttpParams()
      .set('_page', pagina + "")
      .set('_limit', itensPagina)
    return this.http.get<Pensamento[]>(this.API, { params: param })
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
    console.log('URL', url)
    return this.http.get<Pensamento>(url);
  }

}
