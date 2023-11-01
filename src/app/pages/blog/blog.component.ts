import { Component } from '@angular/core';
import { BlogService } from 'src/app/shared/services/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent {

  public blogEntries = this.blogService.getBlogEntries();

  public blogTitle = this.blogService.getBlogTitle();

  constructor(public blogService: BlogService) {

  }

}
