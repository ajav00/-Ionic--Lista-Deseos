import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';

@Injectable({
  providedIn: 'root'
})
export class DeseosService {

  listas: Lista[] = [];

  constructor() { 
    this.cargarStorage();
  }

  crearListas( titulo: string){
    const listaNueva = new Lista(titulo);
    this.listas.push(listaNueva);
    this.guardarStorage();
    return listaNueva.id;
  }

  guardarStorage(){
    localStorage.setItem('data', JSON.stringify(this.listas));
  }

  obtenerLista(id: string | number){
    id = Number(id);

    return this.listas.find(listaData => listaData.id === id);
  }

  cargarStorage(){
    if(localStorage.getItem('data')){
      this.listas = JSON.parse(localStorage.getItem('data'));
    }
    else{
      this.listas=[];  
    }
  }

  eliminarLista(lista: Lista){
    this.listas = this.listas.filter(listaData => {
      return listaData.id !== lista.id;
    });

    this.guardarStorage();
  }

  cambiarNombre(lista: Lista, nombre: string){
    
  }
}
