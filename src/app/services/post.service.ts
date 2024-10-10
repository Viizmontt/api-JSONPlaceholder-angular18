import { HttpClient } from '@angular/common/http';  // Cliente HTTP de Angular para hacer peticiones HTTP
import { Injectable } from '@angular/core';  // Decorador Injectable para marcar la clase como un servicio que se puede inyectar
import { Observable, throwError } from 'rxjs';  // Observable para manejar flujos de datos asíncronos, throwError para manejar errores
import { catchError, map } from 'rxjs/operators';  // Operadores de RxJS para transformar los datos y manejar errores
import { Post } from '../models/post';  // Modelo Post que define la estructura de un post

@Injectable({
  providedIn: 'root'  // Proveedor del servicio a nivel global (raíz de la aplicación)
})
export class PostService {

  private api = 'https://jsonplaceholder.typicode.com/posts';  // URL base de la API para los posts

  constructor(private http: HttpClient) {}  // Inyección de dependencia de HttpClient para realizar solicitudes HTTP

  // Método para obtener todos los posts desde la API
  getAll(): Observable<Post[]> {
    return this.http.get<Post[]>(this.api).pipe(
      map((data: Post[]) => data),  // Transformamos la respuesta para que sea un arreglo de posts
      catchError(this.handleError)  // Manejo de errores en caso de que ocurra algún problema con la petición
    );
  }

  // Método para obtener un post por su ID
  getById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.api}/${id}`).pipe(
      map((data: Post) => data),  // Transformamos la respuesta para que sea un post individual
      catchError(this.handleError)  // Manejo de errores
    );
  }

  // Método para crear un nuevo post en la API
  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.api, post).pipe(
      map((data: Post) => data),  // Transformamos la respuesta para obtener el nuevo post creado
      catchError(this.handleError)  // Manejo de errores
    );
  }

  // Método para actualizar un post existente
  updatePost(id: number, post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.api}/${id}`, post).pipe(
      map((data: Post) => data),  // Transformamos la respuesta para obtener el post actualizado
      catchError(this.handleError)  // Manejo de errores
    );
  }

  // Método para eliminar un post por su ID
  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`).pipe(
      catchError(this.handleError)  // Manejo de errores en caso de fallo
    );
  }

  // Método privado para manejar errores en las peticiones HTTP
  private handleError(error: any): Observable<never> {
    console.error('Error occurred:', error);  // Mostramos el error en la consola
    return throwError(() => new Error('Something went wrong; please try again later.'));  // Devolvemos un error personalizado al flujo
  }
}
