import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HeaderData } from './header.data.model';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private _headerData = new BehaviorSubject<HeaderData>({
    title: 'App Eventos com Angular 11 e .Net Core 2.2',
    icon: 'Home',
    routeUrl: ''
  })

  constructor() { }

  get headerData(): HeaderData{
    return this._headerData.value;
  }

  set headerData(headerData: HeaderData){
     this._headerData.next(headerData);
  }
}
