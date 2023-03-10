import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { map, Subject } from 'rxjs';

import { Post } from "./post.model";

@Injectable({providedIn:"root"})
export class PostsService {
    private posts: Post[] = [];
    private postUpdated = new Subject<Post[]>()

    constructor(private http: HttpClient){}

    getPosts() {
        this.http.get<{message: string, posts: any}>('http://localhost:3000/api/posts')
        .pipe(map((postData) => {
            return postData.posts.map((post: any) => {
                return {
                    title: post.title,
                    content: post.content,
                    id: post._id
                }
            })
        } ))
        .subscribe( (posts) => {
            this.posts = posts
            this.postUpdated.next([...this.posts]);
        });
    }
    
    getPostUpdateListener(){
        return this.postUpdated.asObservable()
    }

    addPost(title: string, content: string){
        const post: Post = { id: null, title: title, content: content};
        this.http.post<{message: string, postId:string}>('http://localhost:3000/api/posts', post)
            .subscribe((responseData) => {
                const postId = responseData.postId;
                post.id = postId;
                this.posts.push(post);
                this.postUpdated.next([...this.posts]);
            })

    }

    deletePost(postId: string){
        this.http.delete("http://localhost:3000/api/posts/"+postId)
            .subscribe(() => {
                const updatedPosts = this.posts.filter(post => post.id !== postId);
                this.posts = updatedPosts;
                this.postUpdated.next([...this.posts]);
            })
    }
}