import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BankDetailsService {
  urlCity: string = 'https://fyle-spring.herokuapp.com/api/city?';
  urlBranch: string = 'https://fyle-spring.herokuapp.com/api/branches?';
  urlBranchAuto: string = 'https://fyle-spring.herokuapp.com/api/branches/autocomplete?';
  currbank:any;
  responseCache = new Map();
  constructor(private http: HttpClient) {}
  getByCity(city: string, limit: number,offset:number) {
    var URLC=this.urlCity + 'q=' + city + '&limit=' + limit+'&offset='+offset;
    const cacheCity=this.responseCache.get(URLC);
    if(cacheCity){
      // console.log('data present');
      return of(cacheCity);
    }
    const response =this.http.get(URLC);
    response.subscribe(beers=>this.responseCache.set(URLC,beers));
    return response;
  }

  getByBranch(branch: string, limit: number,offset:number) {
    var URLB=this.urlBranch + 'q=' + branch + '&limit=' + limit+'&offset='+offset;

    const cacheBranch=this.responseCache.get(URLB);
    if(cacheBranch){
      // console.log('data present');
      return of(cacheBranch);
    }
    const response =this.http.get(URLB);
    response.subscribe(beers=>this.responseCache.set(URLB,beers));
    return response;
  }

  getByBranchAuto(term: string, limit: number,offset:number) {
    var URLBA=this.urlBranchAuto + 'q=' + term + '&limit=' + limit+'&offset='+offset;
    const cacheBranch=this.responseCache.get(URLBA);
    if(cacheBranch){
      // console.log('data present');
      return of(cacheBranch);
    }
    const response =this.http.get(URLBA);
    response.subscribe(beers=>this.responseCache.set(URLBA,beers));
    return response;
  }
  getBankById(bankId:string){
    var URLId:string='https://fyle-spring.herokuapp.com/api/banks/';
    return this.http.get(URLId+bankId);
   }
}
