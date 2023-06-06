import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { PostModel } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PostComponent implements OnInit {

  @Input() post!: PostModel;
  @Output() deletePost = new EventEmitter<void>();

  name: string = "Ksum Nole";
  username: string = "ksumnole_";
  timestamp: string = '';

  showDeleteModal: boolean = false;

  constructor() {
  }
  
  ngOnInit(): void {
    this.calculateTime();
  }

  calculateTime() {
    // creating the current date
    let current_date = new Date();
      
    // previous date
    let previous_date = new Date(this.post?.timestamp);
    
    // finding the difference in total seconds between two dates
    let second_diff = (current_date.getTime() - previous_date.getTime()) / 1000;
    
    // showing the relative timestamp.
    if (second_diff < 60) {
       this.timestamp = Math.floor(second_diff) + "s";
    } else if (second_diff < 3600) {
       this.timestamp = Math.floor(second_diff / 60) + "m";
    } else if (second_diff < 86400) {
       this.timestamp = Math.floor(second_diff / 3600) + "h";
    } else if (second_diff < 2620800) {
       this.timestamp = Math.floor(second_diff / 86400) + "d";
    } else if (second_diff < 31449600) {
       this.timestamp = Math.floor(second_diff / 2620800) + "months";
    } else {
       this.timestamp = Math.floor(second_diff / 31449600) + "y";
    }
  }

  handleDeletePost() {
   this.deletePost.emit()
  }
}
