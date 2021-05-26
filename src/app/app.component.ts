import { Component, OnInit } from '@angular/core';
import { ProductosService } from './services/productos.service';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget | any;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  file?: File;
  photoSelected?: string | ArrayBuffer;

  title = 'angularLab11';
  lista: any = [];

  prod = {
    codigo: null,
    descripcion: null,
    precio: null,
  }

  constructor(private productosServicio: ProductosService) { }

  ngOnInit(): void {
    this.recuperarTodos();
  }

  recuperarTodos() {
    this.productosServicio.listar().subscribe((result: any) => {
      this.lista = result;
    });
  }

  nuevo() {
    this.productosServicio.nuevo(this.prod, this.file!).subscribe(result => {
      if (result) {
        this.limpiar();
        this.recuperarTodos();
      }
    });
  }

  eliminar(codigo: any) {
  	if(!confirm("Esta seguro que desea eliminar este registro?"))
  		return;
    this.productosServicio.eliminar(codigo).subscribe(result => {
      if (result) {
        this.recuperarTodos();
      }
    });
  }

  actualizar() {
    this.productosServicio.actualizar(this.prod).subscribe((result:any) => {
      if (result) {
        this.limpiar();
        this.recuperarTodos();
      }
    });    
  }
  
  mostrar(codigo: any) {
    this.productosServicio.mostrar(codigo).subscribe((result: any) => {
      this.prod = result[0];
      if(result[0].image_path) {
        const url = result[0].image_path.replace('public','');
        this.photoSelected = 'http://localhost:3000' + url;
      }else {
        this.photoSelected = undefined;
      }
    });
  }

  hayRegistros() {
    return true;
  }

  limpiar(){
    this.prod = { 
      codigo:null, 
      descripcion:null, 
      precio:null
    };
    this.photoSelected = undefined;
  }

  onPhotoSelected(event: HtmlInputEvent): void {
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.photoSelected = reader.result!;
      reader.readAsDataURL(this.file);
    }
  }
}
