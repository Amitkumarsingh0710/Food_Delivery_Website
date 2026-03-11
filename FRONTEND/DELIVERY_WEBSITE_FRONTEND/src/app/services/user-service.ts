import { Injectable } from '@angular/core';
import { UserModel } from '../model/UserModel';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { populateUserList } from '../dataLayer/populaateUserList';
@Injectable({
  providedIn: 'root',
})

export class UserService {

  dummyUserList: UserModel[] = populateUserList();


  private currentUserSubject = new BehaviorSubject<UserModel | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  private loginSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loginSubject.asObservable();

  constructor(private router: Router) { }

  getUsers() {
    return this.dummyUserList;
  }


  getUserById(id: number) {
    return this.dummyUserList.find(user => user.id === id);
  }


  addUser(user: any): void {
    console.log("Inside the Userservice");
    console.log(user);
    let genId:number = Math.floor(Math.random()*(250-100))+1;
    if (user) {
      this.dummyUserList.push({ ...user, id:genId, role: "user" });
    }
    localStorage.setItem("userList", JSON.stringify(this.dummyUserList));
    console.log("After adding the user");
    console.log(this.dummyUserList)
  }


  validateUser(email: string, password: string): boolean {
    console.log(email);
    console.log(password);
    let storedList = localStorage.getItem('userList');
    const userList: UserModel[] = storedList ? JSON.parse(storedList) : this.dummyUserList;
    if (userList) {
      const foundUser = userList.find(u => u.email === email && u.password === password);
      console.log(this.dummyUserList);
      console.log("User Found ...");
      console.log(foundUser);
      if (foundUser) {
        this.currentUserSubject.next(foundUser);
        this.loginSubject.next(true);
        return true;
      }
      else return false;
    }
    else return false;
  }


  updateUser(updatedUser: UserModel): void {
    console.log("Upadted user Inside user Service...");
    console.log(updatedUser);
    const index = this.dummyUserList.findIndex(u => u.id === updatedUser.id);
    if (index !== -1) {
      console.log("The index is ... " + index);
      this.dummyUserList = this.dummyUserList.filter((u) => u.id !== updatedUser.id);
      console.log("Filtered Out...");
      console.log(this.dummyUserList);
      this.dummyUserList.push(updatedUser);
      localStorage.setItem("userList", JSON.stringify(this.dummyUserList));
    }
    else {
      this.dummyUserList.push(updatedUser);
      localStorage.setItem("userList", JSON.stringify(this.dummyUserList));
    }
    this.currentUserSubject.next(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    console.log("List After Update....");
    console.log(this.dummyUserList)
  }


  logout() {
    this.currentUserSubject.next(null);
    this.loginSubject.next(false);
    this.router.navigate(['/login']);
  }

}
