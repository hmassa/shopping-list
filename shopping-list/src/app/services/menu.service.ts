import { Injectable } from '@angular/core';
import { IdService } from './id.service'

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private storage: Storage, private idService: IdService) { }
}
