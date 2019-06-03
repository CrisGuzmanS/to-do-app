import { Component, Input } from '@angular/core';
import { TareasService } from '../services/tareas.service';
import { AgregarPage } from '../pages/agregar/agregar.component';
import { NavController, AlertController, ItemSliding } from 'ionic-angular';
import { Lista } from '../models';

@Component({
  selector: 'app-listas',
  templateUrl: 'listas.component.html'
})
export class ListasComponent {

  @Input() terminada: boolean;

  constructor(private tareasService: TareasService, private navController: NavController, private alertController: AlertController) {

  }

  listaSeleccionada(lista: Lista) {
    this.navController.push(AgregarPage, {
      titulo: lista.titulo,
      lista: lista
    });
  }

  borrarLista(lista: Lista) {
    this.tareasService.borrarLista(lista);
  }

  editarLista(lista: Lista, itemSliding:ItemSliding) {

    itemSliding.close();

    const alerta = this.alertController.create({
      title: 'EDITAR LISTA',
      message: 'Editar el nombre de la lista',
      inputs: [{
        name: 'titulo',
        placeholder: 'Nombre de la lista',
        value: lista.titulo
      }],
      buttons: [{
        text: 'CANCELAR'
      }, {
        text: 'GUARDAR',
        handler: data => {
          if (data.titulo.lenght === 0) {
            return;
          }
          lista.titulo = data.titulo;
          this.tareasService.guardarStorage();
        }
      }]
    });

    alerta.present();
  }
}
