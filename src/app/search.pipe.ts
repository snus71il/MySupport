import {Pipe, PipeTransform} from "@angular/core";
import {Ticket} from "./interfaces";

@Pipe({
  name: 'searchPosts'
})

export class SearchPipe implements PipeTransform{
  transform(posts: Ticket[], search = ''): Ticket[] {
    if (!search.trim()) {return posts} else {return posts.filter(post => {return post.title.includes(search)})}
  }
}
