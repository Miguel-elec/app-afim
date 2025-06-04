import { Component, EventEmitter, Input, Output, signal, Signal, effect } from '@angular/core';

@Component({
  selector: 'app-money-box',
  imports: [],
  templateUrl: './money-box.component.html',
  styleUrl: './money-box.component.css'
})
export class MoneyBoxComponent {

  @Input() valor!: string; 
  @Input() imagen!: string; 
  @Input() nombre!: string;
  @Input() id!: string;
  @Input() estadoBoton!: boolean;
  cantidad = signal(0)
  @Input() cantitadReuso!: number;
  private clickTimeout: any;


  @Output() eventoAumentar = new EventEmitter<string>();
  @Output() eventoDisminuir = new EventEmitter<string>();
  @Input() resetSignal!: Signal<number>;


  readonly _ = effect(() => {
    const version = this.resetSignal();
    this.reiniciar(); 
  });

  reiniciar() {
    this.cantidad.set(0);
  }

  aumentarCantidad(){
    if (this.clickTimeout) return; // Si ya está en proceso de detección de dblclick, no ejecuta.

    this.clickTimeout = setTimeout(() => {
      this.eventoAumentar.emit(this.id);
      this.cantidad.update((valor) => valor +1)      
      this.clickTimeout = null;
    }, 300);

  }

  disminirCantidad(){
    if (this.clickTimeout) {
      clearTimeout(this.clickTimeout); 
      this.clickTimeout = null;
    }
    if(this.cantidad()>0){
      this.eventoDisminuir.emit(this.id)
      this.cantidad.update((valor) => valor -1)
    }
  }

}
