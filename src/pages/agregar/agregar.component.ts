import { Component } from '@angular/core';
import { TareasService } from '../../services/tareas.service';
import { Lista, ListaItem } from '../../models';
import { NavParams } from 'ionic-angular';

@Component({
  selector: 'pages-agregar',
  templateUrl: 'agregar.component.html'
})
export class AgregarPage {

  lista: Lista;
  nombreItem: string = "";

  constructor(private tareasService: TareasService, private navParams: NavParams) {

    const titulo = this.navParams.get('titulo');

    if (this.navParams.get('lista')) {
      this.lista = this.navParams.get('lista');
    } else {
      this.lista = new Lista(titulo);
      this.tareasService.agregarLista(this.lista);
    }
  }

  agregarItem() {

    if (this.nombreItem.length === 0) {
      return;
    }

    const nuevoItem = new ListaItem(this.nombreItem);
    this.lista.items.push(nuevoItem);
    this.tareasService.guardarStorage();
    this.nombreItem = "";

  }

  actualizarItem(item: ListaItem) {
    item.completado = !item.completado;

    const numPendientes = this.lista.items.filter( item => !item.completado).length;
    console.log(numPendientes);

    if(numPendientes === 0){
      this.lista.terminada = true;
      this.lista.fechaTerminada = new Date();
    }else{
      this.lista.terminada = false;
      this.lista.fechaTerminada = null;
    }

    this.tareasService.guardarStorage();
  }

  borrar(idx: number) {
    this.lista.items.splice(idx, 1);
    this.tareasService.guardarStorage();
  }
}
