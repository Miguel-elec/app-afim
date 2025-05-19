import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatosService {
  datos =[
      {
        "id": 50,
        "nombre": "Billete de 50 Euros",
        "valor": 50,
        "imagen": "assets/img/b50.jpeg"
      },
      {
        "id": 20,
        "nombre": "Billete de 20 Euros",
        "valor": 20,
        "imagen": "assets/img/b20.jpeg"
      },
      {
        "id": 10,
        "nombre": "Billete de 10 Euros",
        "valor": 10,
        "imagen": "assets/img/b10.jpg"
      },
      {
        "id": 5,
        "nombre": "Billete de 5 Euros",
        "valor": 5,
        "imagen": "assets/img/b5.jpeg"
      },
      {
        "id": 2,
        "nombre": "Moneda de 2 Euros",
        "valor": 2,
        "imagen": "assets/img/m2.jpeg"
      },
      { 
        "id": 1,
        "nombre": "Moneda de 1 Euro",
        "valor": 1,
        "imagen": "assets/img/m1.jpeg"
      },
      {
        "id": 0.5,
        "nombre": "Moneda de 0.5 Euros",
        "valor": 0.5,
        "imagen": "assets/img/m05.jpeg"
      },
      {
        "id": 0.2,
        "nombre": "Moneda de 0.2 Euros",
        "valor": 0.2,
        "imagen": "assets/img/m02.jpeg"
      },
      {
        "id": 0.1,
        "nombre": "Moneda de 0.1 Euros",
        "valor": 0.1,
        "imagen": "assets/img/m01.jpeg"
      }
    ]
  

  constructor(){}

  getDatos(){
    return this.datos;
  }

  getDatosById(id: string){
    const resultado = this.datos.find(item => item.id === parseFloat(id));
    if (!resultado) {
      console.error(`No se encontró un elemento con id: ${id}`);
    }
    return resultado;
  }
}
