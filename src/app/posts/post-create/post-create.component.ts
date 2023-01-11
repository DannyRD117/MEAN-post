
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import {ActivatedRoute, ParamMap} from '@angular/router';

import { PostsService } from "../posts.service";

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
    
    enteredContent:string = "";
    enteredTitle:string = "";
    private mode: string = "create"

    
    constructor(private postsService: PostsService, public route: ActivatedRoute){

    }
    ngOnInit(): void {
        this.route.paramMap.subscribe((paramMap: ParamMap) => {

        });
    }

    onAddPost(form: NgForm){

        if (form.invalid) 
            return;
        this.postsService.addPost(form.value.title, form.value.content)
        form.resetForm();
    }
}