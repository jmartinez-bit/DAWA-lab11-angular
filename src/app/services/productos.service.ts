import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  url ='http://localhost:3000/productos/'; 

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get(`${this.url}listar`);
  }

  nuevo(producto: any) {
    return this.http.post(`${this.url}`, producto);    
  }

  eliminar(codigo: any) {
    return this.http.delete(`${this.url}${codigo}`, {responseType: 'text'});
  }

  mostrar(codigo: any) {
    return this.http.get(`${this.url}mostrar/${codigo}`);
  }

  actualizar(producto: any) {
    return this.http.put(`${this.url}`, producto);    
  }

}
