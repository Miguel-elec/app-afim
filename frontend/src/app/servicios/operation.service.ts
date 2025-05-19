// src/app/services/monedas.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Moneda {
  _id?: string;
  cantidad: number;
  saldo: number;
  cambio:number;
}

@Injectable({
  providedIn: 'root'
})
export class MonedasService {

  private apiUrl = 'http://localhost:3001/api/monedas';

  constructor(private http: HttpClient) {}

  getMonedas(): Observable<Moneda[]> {
    return this.http.get<Moneda[]>(this.apiUrl);
  }

  getMoneda(id: string): Observable<Moneda> {
    return this.http.get<Moneda>(`${this.apiUrl}/${id}`);
  }

  crearMoneda(moneda: Moneda): Observable<Moneda> {
    return this.http.post<Moneda>(this.apiUrl, moneda);
  }

  actualizarMoneda(id: string, moneda: Moneda): Observable<Moneda> {
    return this.http.put<Moneda>(`${this.apiUrl}/${id}`, moneda);
  }

  borrarMoneda(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
