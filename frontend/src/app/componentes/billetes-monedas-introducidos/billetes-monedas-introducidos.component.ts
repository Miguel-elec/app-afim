import { Component, inject, Input, SimpleChanges } from '@angular/core';
import { DatosService } from '../../servicios/datos.service'

@Component({
  selector: 'app-billetes-monedas-introducidos',
  imports: [],
  templateUrl: './billetes-monedas-introducidos.component.html',
  styleUrl: './billetes-monedas-introducidos.component.css'
})
export class BilletesMonedasIntroducidosComponent {

  @Input() id: string =  "";
  @Input() cantidad!: number;
  
  datos = inject(DatosService)
  dato : any;

  //constructor(){
  //  this.dato = this.datos.getDatosById(this.id)
  //}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['id'] && this.id) {
      this.dato = this.datos.getDatosById(this.id);  // Llamar al método cuando se reciba el id
    }
  }
  
}
