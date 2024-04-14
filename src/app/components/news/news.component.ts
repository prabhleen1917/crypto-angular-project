import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Article, NewsService } from '../../../services/news.service';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent {
  articles: Article[] = [];
  isLoading: boolean = true;
  error: string = '';

  constructor(private newsService: NewsService) {}

  ngOnInit() {
    this.newsService.getNews('pegasus', 'en').subscribe({
      next: (data: { results: Article[]; }) => {
        this.articles = data.results;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching news:', err);
        this.error = 'Failed to load news articles.';
        this.isLoading = false;
      }
    });
  }
}
