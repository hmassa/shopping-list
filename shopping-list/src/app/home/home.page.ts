import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Item } from "../interfaces/item";

import { DataService } from "../services/data.service";


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  itemArray: Item[] = [];
  listArray: Item[] = [];
  cartArray: Item[] = [];
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
        this.updateSortedLists();
      }
    });
  }

  private updateSortedLists() {
    this.cartArray = this.itemArray.filter(item => item.completed === true);
    this.listArray = this.itemArray.filter(item => item.completed === false);
  }

  addItem(){
    this.itemArray = this.model.addItem(this.addItemForm.value);
    if(this.itemArray == null){
      alert("Something isn't right");
    } else {
      this.updateSortedLists();
      this.addItemForm.patchValue({
        title: '',
        quantity: '',
        unit: '',
        completed: false
      });
    }
  }

  deleteItem(item: Item){
    this.itemArray = this.model.deleteItem(item);
    this.updateSortedLists();
  }

  toggleComplete(item: Item){
    this.itemArray = this.model.toggleComplete(item);
    this.updateSortedLists();
  }

  editItem(item: Item){
    this.itemArray = this.model.deleteItem(item);
    this.updateSortedLists();

    this.addItemForm.patchValue({
      title: item.title,
      quantity: item.quantity,
      unit: item.unit,
      completed: item.completed
    });
  }

  clear(list: string){
    this.itemArray = this.model.clear(list);
    this.updateSortedLists();
  }
}
