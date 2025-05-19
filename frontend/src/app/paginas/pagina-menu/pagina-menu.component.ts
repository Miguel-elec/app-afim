import { Component, computed, inject, signal } from '@angular/core';
import { DatosService } from '../../servicios/datos.service'
import { MoneyBoxComponent } from '../../componentes/money-box/money-box.component';
import { MenuPrincipalComponent } from '../../componentes/menu-principal/menu-principal.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-pagina-menu',
  standalone: true,
  imports: [MoneyBoxComponent, MenuPrincipalComponent],
  templateUrl: './pagina-menu.component.html',
  styleUrl: './pagina-menu.component.css'
})
export class PaginaMenuComponent {

  datos = inject(DatosService)
  listaMonedas: any[] = []
  router = inject(Router);

  cantidadIntroducada = signal(0)
  total = signal(0)
  resto = signal(0)
  totalRedondeado = computed(() => +this.total().toFixed(2))
  restoRedondeado = computed(() => +this.resto().toFixed(2))
  resetSignal = signal(0);

  estadoBotonCajas = signal(true)

  cuenta = signal<{ [key: string]: number }>({
    "50": 0,
    "20": 0,
    "10": 0,
    "5": 0,
    "2": 0,
    "1": 0,
    "0.5": 0,
    "0.2": 0,
    "0.1": 0,
  });

  constructor() {
    this.listaMonedas = this.datos.getDatos();
  }

  aumentarCantidad(event: string) {
    this.cuenta.update(cuentaActual => ({
      ...cuentaActual,
      [event]: (cuentaActual[event] || 0) + 1
    }))
    this.total.update(valor => valor + parseFloat(event))

    if (this.cantidadIntroducada() <= this.total()) {
      this.resto.set(this.total() - this.cantidadIntroducada())
      this.estadoBotonCajas.set(true)
    } else {
      this.resto.set(0)
    }
  }

  disminuirCantidad(event: string) {
    this.cuenta.update(cuentaActual => ({
      ...cuentaActual,
      [event]: (cuentaActual[event] || 0) - 1
    }))
    this.total.update(valor => valor - parseFloat(event))

    if (this.cantidadIntroducada() <= this.total()) {
      this.resto.set(this.total() - this.cantidadIntroducada())
      this.estadoBotonCajas.set(true)
    } else {
      this.resto.set(0)
    }
  }

  establecerCantidadInicial(event: number) {
    this.estadoBotonCajas.set(false)
    this.cantidadIntroducada.set(event)

    const cuentaVacia: { [key: string]: number } = {};

    Object.keys(this.cuenta()).forEach(clave => {
      cuentaVacia[clave] = 0;
    });
  
    this.cuenta.set(cuentaVacia);
    this.resto.set(0)
    this.total.set(0)
    this.resetSignal.update(v => v + 1);
  } 

  speak = () => {
    const utterance = new SpeechSynthesisUtterance(`La cantidad introducida es ${this.cantidadIntroducada()} euros, por ahora as introducido ${this.totalRedondeado()} euros y el cambio es ${this.restoRedondeado()} euros`);
  
    const voices = speechSynthesis.getVoices();
    utterance.voice = voices[0]; 

    speechSynthesis.speak(utterance);
  }

}