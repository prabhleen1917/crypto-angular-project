import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Coin, CryptoService } from '../../../services/crypto.service';

@Component({
  selector: 'app-crypto',
  standalone: true,
  imports: [NgIf, NgFor, NgClass],
  templateUrl: './crypto.component.html',
  styleUrls: ['./crypto.component.css'] // This should be styleUrls
})
export class CryptoComponent implements OnInit {
  coins: Coin[] = [];
  isLoading: boolean = true;
  favorites: Set<string> = new Set();

  constructor(public authService: AuthService, private cryptoService: CryptoService) {}

  ngOnInit(): void {
    this.retrieveFavorites();

    this.cryptoService.getCoins().subscribe({
      next: (data) => {
        this.coins = data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        // Handle any errors here
      }
    });
  }

  toggleFavorite(coinId: string): void {
    if (this.authService.isLoggedIn()) { // Make sure this checks the actual login status
      if (this.favorites.has(coinId)) {
        this.favorites.delete(coinId);
      } else {
        this.favorites.add(coinId);
      }
      this.saveFavorites();
    } else {
      // Handle the case when user is not logged in, maybe prompt to log in
    }
  }

  isFavorite(coinId: string): boolean {
    return this.favorites.has(coinId);
  }

  private saveFavorites(): void {
    const favoritesArray = Array.from(this.favorites);
    localStorage.setItem('favorites', JSON.stringify(favoritesArray));
  }

  private retrieveFavorites(): void {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      this.favorites = new Set(JSON.parse(storedFavorites));
    }
  }
}
