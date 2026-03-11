import { Injectable } from '@angular/core';
import { UserModel } from '../model/UserModel';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
// import { populateUserList } from '../dataLayer/populaateUserList';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})

export class UserService {

constructor(private http: HttpClient,private router: Router) { }

 createUser(user: any): Observable<any> {
  return this.http.post(
    'http://localhost:8000/auth/register',
    user,
    { withCredentials: true }   // <-- send cookies/credentials
  );
}

loginUser(formData:any):Observable<any>{
    console.log("Inside user service login ...",formData);
      return this.http.post(
    'http://localhost:8000/auth/login',
      formData,
    { withCredentials: true }   
  );
}

  getUserProfile():Observable<any>{
       console.log("Inside user service Get Profile ...");
      return this.http.get(
    'http://localhost:8000/auth/profile',
    { withCredentials: true }   
);
  }

  updateUser(userId :string |undefined, formData:any):Observable<any>{
    console.log("User profile ID...",userId);
    console.log("Inside user service Get Profile...",formData);
      return this.http.patch(
    `http://localhost:8000/users/edit/${userId}`,formData,
    { withCredentials: true } )
  };

  logoutUser(){
     console.log("Inside user service Get Profile ...");
      return this.http.post(
    `http://localhost:8000/auth/logout`,{},
    { withCredentials: true } )
  }

  getRefreshToken():Observable<any>{
     return this.http.post('http://localhost:8000/auth/refresh',{},{withCredentials:true});
  }




}
