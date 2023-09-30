import { Injectable } from '@angular/core';
import BlogDEJSON from '../jsons/blog-DE.json';
import { BlogEntry } from '../models/blogEntry.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private allBlogEntriesDE: BlogEntry[] = BlogDEJSON.entries;

  constructor() { }

  getBlogEntries(): BlogEntry[] {
    return this.allBlogEntriesDE;
  }

  getBlogEntry(id: number): BlogEntry {
    return this.allBlogEntriesDE.find((entry) => entry.id === id)!;
  }
}
