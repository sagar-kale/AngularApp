import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Job } from './job';
import { User } from './user';

const httpOptions = {
  headers: new HttpHeaders({ 'Accept-Language': 'mr' })
};
@Injectable({
  providedIn: 'root'
})
export class MultilangService {

  private global_url = "http://localhost:8080/demo/test_locale/";

  constructor(
    private http: HttpClient
  ) { }

  getListOfMultiLangNames(name: String) {
    return this.http.get(this.global_url + name, httpOptions)
  }
}
