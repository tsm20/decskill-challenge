import { Component, OnInit } from '@angular/core';
import {v4 as uuidv4} from 'uuid';
import { LocalStorageService, PostModel } from './services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'challenge';
  value: string = '';
  inputLen: number = 0;
  posts: PostModel[] = [];

  constructor(
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.refreshPosts();
  }

  autoGrowTextZone(e: any) {
    e.target.style.height = "0px";
    e.target.style.height = e.target.scrollHeight + "px";
  }

  calculateCharsLeft() {
    this.inputLen = this.value.length;
  }

  createPost() {
    const myuuid = uuidv4();
    const post: PostModel = {
      id: myuuid,
      text: this.value,
      timestamp: new Date()
    }
    this.localStorageService.addPost(post);
    this.value = '';
    this.inputLen = 0;
    this.refreshPosts();
  }

  refreshPosts() {
    this.posts = this.localStorageService.getPosts();
  }

  handleDeletePost(post: PostModel) {
    this.localStorageService.deletePost(post);
    this.refreshPosts();
  }
}
