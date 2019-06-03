import { Component } from '@angular/core';
import { TareasService } from '../../services/tareas.service';
import { Lista } from '../../models';

@Component({
  selector: 'page-terminados',
  templateUrl: 'terminados.component.html'
})
export class TerminadosPage {

  constructor(private tareasService: TareasService) {
  }

  listaSeleccionada(lista: Lista) {
    console.log(lista)
  }
  
}
