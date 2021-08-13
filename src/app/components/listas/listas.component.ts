import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeseosService } from '../../services/deseos.service';
import { Lista } from 'src/app/models/lista.model';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent{

  @ViewChild(IonList) lista: IonList; 
  @Input() terminada = true; 

  constructor(public deseosService:DeseosService, 
            private router:Router, 
            private alertCtrl:AlertController) { }

  listaSeleccionada(lista:Lista){
    if(this.terminada){
      this.router.navigateByUrl(`/tabs/tab2/agregar/${lista.id}`)
    }else{
      this.router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`)
    }
  }

  borrarLista(listaId:number){
    this.deseosService.borrarLista(listaId);
    this.deseosService.guardarStorage();
  }

  async actualizarLista(lista:Lista){
    const alert = await this.alertCtrl.create({
      header: 'Nombre de la lista', 
      inputs : [
        {
          name:'titulo',
          type:'text',
          value: lista.titulo, 
          placeholder: 'Nombre de la lista'
        }
      ],
      buttons: [
        {
          text: 'Cancelar', 
          role: 'cancel', 
          handler: () => {
            this.lista.closeSlidingItems();
          }
        },
        {
          text: 'Actualizar', 
          handler : (data) =>{
            if (data.titulo.lenght === 0){
              return;
            }else{
            this.deseosService.actualizarLista(lista,data.titulo);
            this.deseosService.guardarStorage(); 
            this.lista.closeSlidingItems();
            }
          }
        }
      ]
    })
    alert.present();
  }
}
