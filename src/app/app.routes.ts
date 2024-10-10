import { Routes } from '@angular/router';
import { PostsComponent } from './post/posts/posts.component';
import { PostComponent } from './post/post/post.component';

export const routes: Routes = [
    {path:"posts", component:PostsComponent},
    {path:"create", component:PostComponent},
    {path:"edit/:id", component:PostComponent}
];
