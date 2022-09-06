import {Pipe, PipeTransform} from "@angular/core";
import {Ticket} from "./interfaces";

@Pipe({
  name: 'UserFilter'
})

export class UserPipe implements PipeTransform{
  transform(posts: Ticket[], nickname = ''): Ticket[] {
    if (!nickname.trim()) {return posts} else {return posts.filter(post => {return post.author === nickname})}
  }
}
