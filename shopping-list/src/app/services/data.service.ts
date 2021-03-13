import { Injectable } from '@angular/core';
import { Item } from "../interfaces/item";
import { Storage } from "@ionic/storage";

// import { startingItems } from '../../assets/items'
import { IdService } from './id.service'

@Injectable({
  providedIn: 'root'
})

export class DataService {
  itemArray: Item[] = [];
  key: string = "items";

  constructor(private storage: Storage, private idService: IdService) { 
    this.getData().then((items) => {
      if (items) {
        this.itemArray = items;
      } else {
        this.setData(this.key, []);
      }
    })
  }

  getData() {
    return this.storage.get(this.key);
  }

  setData(key: string, data: Item[]){
    this.storage.set(key, data);
  }

  getItem(id: string){
    for (let i = 0; i < this.itemArray.length; i++){
      if (id.localeCompare(this.itemArray[i].id) == 0){
        return this.itemArray[i];
      }
    }
    return null;
  }

  editComment(item: Item, comment: string) {
    for (let i = 0; i < this.itemArray.length; i++){
      if (item == this.itemArray[i]){
        this.itemArray[i].comment = comment;
      }
    }
  }

  addItem(itemObj: Item){
    if (itemObj != null){
      itemObj.comment = "";
      itemObj.id = this.idService.generateId();
      this.itemArray.push(itemObj);
      this.setData(this.key, this.itemArray);
      return this.itemArray;
    } else {
      return null;
    }
  }

  deleteItem(item: Item){
    for (let i = 0; i < this.itemArray.length; i++){
      if (item == this.itemArray[i]){
        this.itemArray.splice(i, 1);
      }
    }
    this.setData(this.key, this.itemArray);
    return this.itemArray;
  }

  toggleComplete(item: Item){
    for(let i = 0; i < this.itemArray.length; i++){
      if (item == this.itemArray[i]){
        this.itemArray[i].completed = !this.itemArray[i].completed;
      }
    }
    this.setData(this.key, this.itemArray);
    return this.itemArray;
  }

  clear(list: string){
    if(list.localeCompare("list") == 0){
      for(let i = 0; i < this.itemArray.length; i++){
        if (this.itemArray[i].completed == false){
          this.itemArray.splice(i, 1);
          i--;
        }
      }
    } else {
      for(let i = 0; i < this.itemArray.length; i++){
        if (this.itemArray[i].completed == true){
          this.itemArray.splice(i, 1);
          i--;
        }
      }
    }
    this.setData(this.key, this.itemArray);
    return this.itemArray;
  }
}
