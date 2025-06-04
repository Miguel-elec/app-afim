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

  private apiUrl = '';

  constructor(private http: HttpClient) {}

  getMonedas(): Observable<Moneda[]> {
    return this.http.get<Moneda[]>(`${this.apiUrl}/api/monedas`);
  }

  getMoneda(id: string): Observable<Moneda> {
    return this.http.get<Moneda>(`${this.apiUrl}/api/monedas/${id}`);
  }

  crearMoneda(moneda: Moneda): Observable<Moneda> {
    return this.http.post<Moneda>(`${this.apiUrl}/api/monedas`, moneda);
  }

  actualizarMoneda(id: string, moneda: Moneda): Observable<Moneda> {
    return this.http.put<Moneda>(`${this.apiUrl}/api/monedas/${id}`, moneda);
  }

  borrarMoneda(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/monedas/${id}`);
  }
}
