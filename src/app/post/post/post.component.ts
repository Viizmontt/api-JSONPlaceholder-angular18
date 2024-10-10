import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, FormsModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent implements OnInit{

  constructor(private postService: PostService) { }

  post: Post = { userId: 1, id: 0, title: '', body: '' };
  isEditing = false;

  ngOnInit(): void {
    
  }

  // Crear o actualizar el post
  savePost(): void {
    if (this.isEditing) {
      this.updatePost();
    } else {
      this.createPost();
    }
  }

  // Crear nuevo post
  createPost(): void {
    this.postService.createPost(this.post).subscribe({
      next: (newPost) => {
        
        this.clearForm();
        alert('Post creado con éxito');
      },
      error: (error) => console.error("Error al crear el Post", error)
    });
  }

  // Actualizar post existente
  updatePost(): void {
    this.postService.updatePost(this.post.id, this.post).subscribe({
      next: (updatedPost) => {
        
        this.clearForm();
        alert('Post actualizado con éxito');
      },
      error: (error) => console.error("Error al actualizar el Post", error)
    });
  }

  // Cargar datos del post en el formulario para editar
  editPost(post: Post): void {
    this.post = { ...post };
    this.isEditing = true;
  }



  // Limpiar el formulario y reiniciar estado
  clearForm(): void {
    this.post = { userId: 1, id: 0, title: '', body: '' };
    this.isEditing = false;
  }

  // Cancelar edición
  cancelEdit(): void {
    this.clearForm();
  }
}
