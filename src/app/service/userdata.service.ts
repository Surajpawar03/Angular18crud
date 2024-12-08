import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserdataService {
  private baseApiUrl: string = "http://localhost:3000/users";
  subject = new Subject<any>();

  setData(data: any) {
    this.subject.next(data)
  }

  constructor(private http: HttpClient) { }

  public getUserList() {
    return this.http.get(`${this.baseApiUrl}`);
  }
  public addUser(user: any) {
    return this.http.post(`${this.baseApiUrl}`, user)
  }
  
  public update(id: number, user: any) {
    return this.http.put(`${this.baseApiUrl}/${id}`, user)
  }

  public delteUser(id: number) {
    return this.http.delete(`${this.baseApiUrl}/${id}`)
  }
  
}
