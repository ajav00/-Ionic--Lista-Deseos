

export class ListaItem{
    desc: string;
    completado: boolean;

    constructor( private descr: string){
        this.desc = descr;
    }
}