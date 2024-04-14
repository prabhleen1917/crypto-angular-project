// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface User {
  email: string;
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
 

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('user');
    this.userSubject = new BehaviorSubject<User | null>(storedUser ? JSON.parse(storedUser) : null);
  }

  public get user(): Observable<User | null> {
    return this.userSubject.asObservable();
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>('https://puce-betta-cape.cyclic.app/users/signin', { email, password }, { withCredentials: true }).pipe(
      map(user => {
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }

  register(username: string, email: string, password: string): Observable<User> {
    return this.http.post<User>('https://puce-betta-cape.cyclic.app/users/signup', { username, email, password }, { withCredentials: true }).pipe(
      map(user => {
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      })
    );
  }

  public get currentUserValue(): User | null {
    return this.userSubject.value;
  }
  public isLoggedIn(): boolean {
    return this.currentUserValue !== null;
  }
}
