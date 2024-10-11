import { CommonModule } from '@angular/common';  // Módulo que proporciona funcionalidades comunes de Angular
import { Component, OnInit } from '@angular/core';  // Importación de componentes y del ciclo de vida OnInit
import { RouterModule, RouterOutlet } from '@angular/router';  // Módulos de enrutamiento para Angular
import { Post } from '../models/post';  // Modelo Post que define la estructura de un post
import { PostService } from '../services/post.service';  // Servicio para realizar operaciones CRUD con los posts
import { FormsModule } from '@angular/forms';  // Módulo para gestionar formularios
declare var bootstrap: any;  // Declaración para poder usar Bootstrap de manera global


@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [RouterModule, RouterOutlet, CommonModule, FormsModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent implements OnInit {

  posts: Post[] = [];  // Lista que almacenará todos los posts
  post: Post = { userId: 0, id: 0, title: '', body: '' };  // Objeto que representa el post actual
  isEditing = false;  // Bandera para determinar si estamos en modo edición o creación
  modal: any;  // Referencia al modal de Bootstrap para crear/editar posts

  constructor(private postService: PostService) {}  // Inyección de dependencia del servicio PostService

  ngOnInit(): void {
    this.loadAllPosts();  // Al inicializar el componente, cargamos todos los posts
  }

  // Método para cargar todos los posts desde el servicio
  loadAllPosts(): void {
    this.postService.getAll().subscribe({
      next: (data) => this.posts = data,  // Asignamos los datos de los posts a la lista
      error: (error) => console.error("Error al cargar los Posts", error)  // Manejamos el error en caso de que falle
    });
  }

  // Método para abrir el modal de Bootstrap, ya sea para crear o editar un post
  openModal(post?: Post): void {
    if (post) {
      // Si se pasa un post, es modo edición: llenamos el formulario con los datos del post
      this.post = { ...post };
      this.isEditing = true;
    } else {
      // Si no se pasa un post, es modo creación: limpiamos el formulario
      this.clearForm();
      this.isEditing = false;
    }
    // Inicializamos y mostramos el modal de Bootstrap
    this.modal = new bootstrap.Modal(document.getElementById('postModal'));
    this.modal.show();
  }

  // Método para guardar el post, dependiendo del modo (creación o edición)
  savePost(): void {
    if (this.isEditing) {
      this.updatePost();  // Si estamos editando, actualizamos el post
    } else {
      this.createPost();  // Si no, creamos un nuevo post
    }
  }

  // Método para crear un nuevo post usando el servicio
  createPost(): void {
    this.postService.createPost(this.post).subscribe({
      next: (newPost) => {
        this.posts.push(newPost);  // Agregamos el nuevo post a la lista
        this.clearForm();  // Limpiamos el formulario
        this.modal.hide();  // Ocultamos el modal
        alert('Post creado con éxito');  // Mostramos una alerta de éxito
      },
      error: (error) => console.error("Error al crear el Post", error)  // Manejamos errores si ocurre alguno
    });
  }

  // Método para actualizar un post existente
  updatePost(): void {
    this.postService.updatePost(this.post.id, this.post).subscribe({
      next: (updatedPost) => {
        const index = this.posts.findIndex(p => p.id === updatedPost.id);  // Buscamos el post por su id en la lista
        if (index > -1) {
          this.posts[index] = updatedPost;  // Reemplazamos el post en la lista con los datos actualizados
        }
        this.clearForm();  // Limpiamos el formulario
        this.modal.hide();  // Ocultamos el modal
        alert('Post actualizado con éxito');  // Mostramos una alerta de éxito
      },
      error: (error) => console.error("Error al actualizar el Post", error)  // Manejamos errores si ocurre alguno
    });
  }

  // Método para eliminar un post
  deletePost(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar este post?')) {
      // Confirmamos la eliminación del post
      this.postService.deleteById(id).subscribe({
        next: () => {
          this.posts = this.posts.filter(post => post.id !== id);  // Eliminamos el post de la lista
          alert('Post eliminado');  // Mostramos una alerta de éxito
        },
        error: (error) => console.error("Error al eliminar el Post", error)  // Manejamos errores si ocurre alguno
      });
    }
  }

  // Método para limpiar el formulario y restablecer el objeto post a sus valores iniciales
  clearForm(): void {
    this.post = { userId: 0, id: 0, title: '', body: '' };  // Restablecemos los valores por defecto
  }
}