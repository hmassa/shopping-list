import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../interfaces/item';

import { DataService } from "../services/data.service";

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage {
  id: string;
  item: Item;

  commentForm: FormGroup;

  constructor(
    private model: DataService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute) { 
      this.route.paramMap.subscribe(params => {
        this.item = this.model.getItem(params.get('id'));
        this.commentForm = this.formBuilder.group({
          comment: [this.item.comment]
        });
      });
    }

  save() {
    console.log(this.commentForm.value.comment);
    this.model.editComment(this.item, this.commentForm.value.comment);
    this.router.navigate(['/']);
  }
}
