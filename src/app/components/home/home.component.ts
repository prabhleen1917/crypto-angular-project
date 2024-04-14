import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CryptoService } from '../../../services/crypto.service';
import { SearchbarComponent } from '../searchbar/searchbar.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';

// interface Bitcoin {
//   name: string;
//   imageUrl: string;
//   description: string;
// }

 interface Coin {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
  image: string;
  price_change_percentage_24h: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, NgIf, SearchbarComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  coins: Coin[] = [];
  filteredCoins: Coin[] = [];
  isLoading: boolean = false;
  error: string = '';

  constructor(private cryptoService: CryptoService) { }

  ngOnInit() {
    this.isLoading = true;
    this.cryptoService.getCoins().subscribe({
      next: (data) => {
        console.log('data',data);
        this.coins = data;
        this.filteredCoins = data; // Initially, filteredCoins will show all coins
        this.isLoading = false;
      },
      error: (err) => {
        this.error = err;
        this.isLoading = false;
      }
    });
  }

  handleSearch(searchTerm: string) {
    this.filteredCoins = this.coins.filter(coin =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}
