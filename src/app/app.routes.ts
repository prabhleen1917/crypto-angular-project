import { Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { NewsComponent } from './components/news/news.component';
import { CryptoComponent } from './components/crypto/crypto.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'news', component: NewsComponent },
  { path: 'crypto', component: CryptoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];

