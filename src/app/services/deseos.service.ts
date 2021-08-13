import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';

@Injectable({
  providedIn: 'root'
})
export class DeseosService {
  
  public listas : Lista[] = []; 

  constructor() {
    this.cargarStorage();
  }

  crearLista(titulo:string){
    const nuevaLista = new Lista(titulo);
    this.listas.push(nuevaLista);
    this.guardarStorage();
    return nuevaLista.id; 
  }

  obtenerLista(id:string|number){
    id = Number(id);
    return this.listas.find(listaData => {
      return listaData.id === id; 
    })
  }

  borrarLista(listaId:number){
    this.listas = this.listas.filter(listaData => {
      return listaData.id != listaId; 
    })
  }

  actualizarLista(lista: Lista, listaTitulo:string){
    this.listas.find(listaData => {
      return listaData.id === lista.id; 
    }).titulo = listaTitulo; 
  }

  guardarStorage(){
    localStorage.setItem('data',JSON.stringify(this.listas));
  }

  cargarStorage(){
    if (JSON.parse(localStorage.getItem('data'))){
      this.listas = JSON.parse(localStorage.getItem('data'));
    }
  }
  
}


