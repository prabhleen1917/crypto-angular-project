import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


interface Coin {
  uuid: string;
  symbol: string;
  name: string;
  color: string | null;
  iconUrl: string;
  marketCap: string;
  price: string;
  listedAt: number;
  tier: number;
  change: string;
  rank: string;
  sparkline: Array<string | null>;
  lowVolume: boolean;
  coinrankingUrl: string;
  btcPrice: string;
  contractAddresses?: Array<{
    network: string;
    address: string;
  }>;
}

interface ApiResponse {
  status: string;
  data: {
    coins: Coin[];
  };
}

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.css'
})
export class SearchbarComponent {
  searchTerm: string = '';
  coins: Coin[] = [];

  // constructor(private http: HttpClient) { }

  search() {
    // const apiUrl = 'https://api.coinranking1.p.rapidapi.com/coins';
    // const headers = {
    //   'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    //   'x-rapidapi-key': '23084697ffmsh66891a17478cb86p1778a1jsne0902ba87745' // Replace with your actual RapidAPI key
    // };

    // this.http.get<ApiResponse>(apiUrl, { headers }).subscribe(
    //   response => {
    //     console.log('Coins:', response.data.coins);
    //     this.coins = response.data.coins;
    //   },
    //   error => {
    //     console.error('Failed to fetch coins:', error);
    //   }
    // );
  }
}
