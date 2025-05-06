import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(private router: Router) {}

  login(username: string, password: string) {
    if (username !== '' && password !== '') {
      this.loggedIn.next(true);
      this.router.navigate(['/rick-morty']);
    }
  }

  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  getToken(): string {
    return localStorage.getItem('auth_token') || '';
  }
}