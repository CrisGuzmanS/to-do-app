import { Component } from '@angular/core';
import { TareasService } from '../../services/tareas.service';
import { Lista } from '../../models';
import { AgregarPage } from '../agregar/agregar.component';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'pages-pendientes',
  templateUrl: 'pendientes.component.html'
})
export class PendientesPage {

  constructor(private tareasService: TareasService,
    private navController: NavController,
    private alertController: AlertController) {
  }

  listaSeleccionada(lista: Lista) {
    this.navController.push(AgregarPage, {
      titulo: lista.titulo,
      lista: lista
    });
  }

  agregarLista() {

    const alerta = this.alertController.create({
      title: 'NUEVA LISTA',
      message: 'Escribe el nombre de la lista que deseas añadir.',
      inputs: [{
        name: 'titulo',
        placeholder: 'Nombre de la lista'
      }],
      buttons: [{
        text: 'Cancelar'
      }, {
        text: 'Agregar',
        handler: data => {

          if (data.length != 0) {
            this.navController.push(AgregarPage, {
              titulo: data.titulo
            });

          }
        }
      }]
    });

    alerta.present();

  }

}
