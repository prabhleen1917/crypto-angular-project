import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { SearchbarComponent } from '../searchbar/searchbar.component';
interface Bitcoin {
  name: string;
  imageUrl: string;
  description: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SearchbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
