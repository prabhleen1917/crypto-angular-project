import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router'; // Import RouterModule
import { ReactiveFormsModule } from '@angular/forms';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { AboutComponent } from './components/about/about.component';
import { NewsComponent } from './components/news/news.component';
import { CryptoComponent } from './components/crypto/crypto.component';
import { routes } from './app.routes';
import { HomeComponent } from './components/home/home.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { LoginComponent } from './components/login/login.component';
import { CoinDetailComponent } from './components/coin-detail/coin-detail.component';
import { HomeLayoutComponent } from './components/home-layout/home-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchbarComponent,
    AboutComponent,
    NewsComponent,
    CryptoComponent,
    HomeComponent,
    LoginComponent,
    CoinDetailComponent,
    HomeLayoutComponent
    // your components
  ],
  imports: [
    BrowserModule,
    FormsModule, // Add FormsModule here
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    CarouselModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
