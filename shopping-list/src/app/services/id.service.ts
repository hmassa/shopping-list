import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdService {

  constructor() { }

  generateId() {
    var id = "";
    var numChars = 16;

    var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var len = charset.length;

    var dateTime = Date.now();
    while (dateTime > 0){
      var val = dateTime%len;
      id += charset.charAt(val);
      var dateTime = Math.floor(dateTime/len);
    }

    for (var i = id.length; i < numChars; i++){
      id += charset.charAt(Math.floor(Math.random()*len));
    }

    return id;
  }
}

