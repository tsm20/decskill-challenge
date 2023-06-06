import { Injectable } from '@angular/core';

export interface PostModel {
  id: string;
  text: string;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(
  ) { }

  getPosts(): [] {
    const result = localStorage.getItem("posts");
    return result ? JSON.parse(result) : [];
  }

  setPosts(posts: PostModel[]) {
    localStorage.setItem("posts", JSON.stringify(posts));
  }

  addPost(post: PostModel) {
    const posts: PostModel[] = this.getPosts();
    this.setPosts([post, ...posts]);
  }

  deletePost(post: PostModel) {
    let posts: PostModel[] = this.getPosts();
    posts = posts?.filter(item => item.id !== post.id);
    this.setPosts(posts);
  }
}