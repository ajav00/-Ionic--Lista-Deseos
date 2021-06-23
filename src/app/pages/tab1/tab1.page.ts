import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DeseosService } from '../../services/deseos.service';
import { Lista } from '../../models/lista.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  tareas: any[] = [];

  constructor(public deseosService: DeseosService,
    private routers: Router,
    private alertCtrl: AlertController) {
    console.log(deseosService);
    this.tareas = deseosService.listas;
    console.log(this.tareas);
  }

  

  async agregarLista(){
    
    console.log("Click");
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Nueva Lista',
      inputs:[
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'Nombre de la lista'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () =>{
            console.log('Cancelar');
          }
        },
        {
          text: 'Crear',
          handler: (data) =>{
            console.log(data);
            if(data.titulo.length === 0){
              return;
            }
            const listaId = this.deseosService.crearListas(data.titulo);
            console.log(listaId);
            this.routers.navigateByUrl(`/tabs/tab1/agregar/${listaId}`);
          }
        }
      ]
    });
  alert.present;


  await alert.present();
  console.log("Click 2");
  }

}
