import { Component, OnInit } from '@angular/core';
import { Producto } from '../interfaces/producto.interface';
import { ProductosService } from '../services/productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  // productos: Producto[] = [];
  // prod: Producto = {codigo: 0, descripcion: '', precio: 0};
  

  constructor() { }

  ngOnInit(): void {
  }

  


}
