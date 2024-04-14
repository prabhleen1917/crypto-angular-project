import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';


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
  imports: [NgFor,FormsModule],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.css'
})
export class SearchbarComponent {
  @Output() search = new EventEmitter<string>();
  searchTerm: string = '';

  onSearch() {
    this.search.emit(this.searchTerm);
  }
}
