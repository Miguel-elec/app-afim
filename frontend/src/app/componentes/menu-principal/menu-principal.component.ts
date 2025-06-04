import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MonedasService } from '../../servicios/operation.service';


@Component({
  selector: 'app-menu-principal',
  imports: [FormsModule],
  templateUrl: './menu-principal.component.html',
  styleUrl: './menu-principal.component.css'
})
export class MenuPrincipalComponent {

  router = inject(Router);
  monedasService = inject(MonedasService);

  cantidadInicial!: number;
  @Input() cantidadIntroducida!: number;
  @Input() resto!: number;
  @Input() speak!: () => void;

  @Output() eventoCantidadIntroducida = new EventEmitter<number>();
  @Output() eventoCambio = new EventEmitter<number>();

  establecerCantidad() {
    this.eventoCantidadIntroducida.emit(this.cantidadInicial);
  }

  irPanginaDinero() {
    console.log("Navegando a /cambio con cambio =", String(this.resto));

    const nuevaMoneda = {
      cantidad: this.cantidadInicial,
      saldo: this.cantidadIntroducida,
      cambio: this.resto
    };

    this.monedasService.crearMoneda(nuevaMoneda).subscribe({
      next: () => {
        console.log('Moneda guardada en la base de datos');
        this.router.navigate(['cambio'], {
          queryParams: { cambio: String(this.resto) }
        });
      },
      error: (err) => {
        console.error('Error guardando la moneda', err);
      }
    });

    this.router.navigate(['cambio'], {
      queryParams: { cambio: String(this.resto) }
    });
  }

}
