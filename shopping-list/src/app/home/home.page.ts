import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


import { Item } from "../interfaces/item";
import { startingItems } from '../../assets/items'

import { DataService } from "../services/data.service";


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  itemArray: Item[] = [];
  addItemForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private model: DataService,
    private router: Router, 
    private route: ActivatedRoute
    ) {
    this.addItemForm = this.formBuilder.group({
      title: ["", Validators.required],
      quantity: ["", [Validators.required, Validators.pattern('[0-9\.\/\,]*')]],
      unit: ["", Validators.pattern('[a-zA-Z ]*')],
      completed: false
    });

    this.model.getData().then((items) => {
      if (items) {
        this.itemArray = items;
      } else {
        this.itemArray = startingItems;
      }
    })
  }

  addItem(){
    this.itemArray = this.model.addItem(this.addItemForm.value);
    if(this.itemArray == null){
      alert("Something isn't right");
    } else {
      this.addItemForm.patchValue({
        title: '',
        quantity: '',
        unit: '',
        completed: false
      });
    }
  }

  deleteItem(item){
    this.itemArray = this.model.deleteItem(item);
  }

  toggleComplete(item){
    this.itemArray = this.model.toggleComplete(item);
  }

  editItem(item){
    this.itemArray = this.model.deleteItem(item);
    this.addItemForm.patchValue({
      title: item.title,
      quantity: item.quantity,
      unit: item.unit,
      completed: item.completed
    });
  }

  clear(list: string){
    this.itemArray = this.model.clear(list);
  }
}
