import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';
import { Lista } from '../../models/lista.model';
import { DeseosService } from '../../services/deseos.service';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {
  
  @ViewChild(IonList) lista: IonList;
  @Input() terminada: boolean = true;

  constructor(private routers: Router, public deseosService: DeseosService, private alertCtrl: AlertController) {
    
   }

  ngOnInit() {}

  listaSeleccionada(lista: Lista){
    console.log(lista);
    console.log(this.terminada);
    if(this.terminada){

      this.routers.navigateByUrl(`/tabs/tab2/agregar/${lista.id}`);

    }
    else{

      this.routers.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`);
    }


  }

  eliminarLista(lista: Lista){
      this.deseosService.eliminarLista(lista);
  }

  async cambiarNombre(lista: Lista){

    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Renombrar Lista',
      inputs:[
        {
          name: 'titulo',
          type: 'text',
          value: lista.titulo,
          placeholder: 'Nombre de la lista'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () =>{
            console.log('Cancelar');
            this.lista.closeSlidingItems();
          }
        },
        {
          text: 'Cambiar',
          handler: (data) =>{
            console.log(data);
            if(data.titulo.length === 0){
              return;
            }

            lista.titulo = data.titulo;
            this.deseosService.guardarStorage();
            this.lista.closeSlidingItems();
            //this.deseosService.cambiarNombre(lista, data.titulo)
          }
        }
      ]
    });
   await alert.present();

  }
}
