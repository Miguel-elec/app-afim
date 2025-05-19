import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatosService } from '../../servicios/datos.service';
import { MoneyBoxComponent } from "../../componentes/money-box/money-box.component";

@Component({
  selector: 'app-pagina-dinero',
  standalone: true,
  imports: [MoneyBoxComponent],
  templateUrl: './pagina-dinero.component.html',
  styleUrl: './pagina-dinero.component.css'
})
export class PaginaDineroComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private datos = inject(DatosService);

  cambio = 0;
  resetSignal = signal(0);
  listaMonedas = signal<any[]>([]);

  ngOnInit() {
    const params = this.route.snapshot.queryParams;
    console.log('params:', params);
  
    const valor = parseFloat(params['cambio']);
    if (!isNaN(valor)) {
      this.cambio = valor;
      console.log("Cambio recibido:", this.cambio);
      this.calcularCambioSimplificado();
      console.log(this.listaMonedas())
    } else {
      console.warn('No se recibió valor válido de cambio.');
    }
  }

  calcularCambioSimplificado() {
    const denominaciones = [50, 20, 10, 5, 2, 1, 0.5, 0.2, 0.1];
    let cambioRestante = this.cambio;
    const resultado: any[] = [];

    denominaciones.forEach(denominacion => {
      const cantidad = Math.floor(cambioRestante / denominacion);
      if (cantidad > 0) {
        const moneda = this.datos.getDatos().find(item => item.valor === denominacion);
        if (moneda) {
          resultado.push({ ...moneda, cantidad });
        }
        cambioRestante -= cantidad * denominacion;
        cambioRestante = parseFloat(cambioRestante.toFixed(2));
      }
    });

    this.listaMonedas.set(resultado);
  }

  irPanginaDinero() {
    this.router.navigate(['']);
  }
}