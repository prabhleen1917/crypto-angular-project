import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoinService } from '../../../services/coin.service';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexYAxis,
  ApexTitleSubtitle,
  NgApexchartsModule,
  ApexFill
} from 'ng-apexcharts';
import { NgIf } from '@angular/common';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  fill: ApexFill;
};

@Component({
  selector: 'app-coin-detail',
  standalone: true,
  imports: [NgIf, NgApexchartsModule],
  templateUrl: './coin-detail.component.html',
  styleUrl: './coin-detail.component.css'
})


export class CoinDetailComponent implements OnInit {
  coin: any;
  isLoading = true;
  error: string | null = null;
  chartOptions: Partial<ChartOptions>;
  days: number = 7; // Default to last 7 days

  constructor(private coinService: CoinService, private route: ActivatedRoute) {
    this.chartOptions = {
      series: [{
        name: "Price",
        data: []
      }],
      fill: {
        colors: ['#2E93fA', '#66DA26', '#546E7A', '#E91E63', '#FF9800']
      },
      chart: {
        type: "line",
        height: 350,
        toolbar: {
          show: true,
          offsetX: 0,
          offsetY: 0,
          tools: {
            download: true,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
          }
        }
      },
      xaxis: {
        type: "datetime"
        
      },
      dataLabels: {
        enabled: false,
        style: {
          colors: ['#F44336', '#E91E63', '#9C27B0']
        }
      },
      tooltip: {
        style: {
          fontSize: '16px',
          fontFamily: undefined
        },
        x: {
          format: 'dd MMM yyyy'
        },
        theme: 'dark',
      }
    };
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.fetchCoinData(id);
      this.fetchMarketChart(id, this.days);
    });
  }

  private fetchCoinData(id: string): void {
    this.coinService.getCoinData(id).subscribe({
      next: (data) => {
        this.coin = data;
        console.log("coin data", this.coin);
        this.isLoading = false;
      },
      error: (error) => {
        this.error = 'Failed to load data.';
        this.isLoading = false;
      }
    });
  }

  private fetchMarketChart(id: string, days: number): void {
    this.coinService.getMarketChart(id, days).subscribe({
      next: (data) => {
        this.updateChart(data.prices);
      },
      error: (error) => {
        console.error('Error fetching market chart:', error);
        this.error = 'Failed to load market chart data.';
      }
    });
  }

  private updateChart(prices: any[]): void {
    if (prices) {
      this.chartOptions.series = [{
        name: "Market Price",
        data: prices.map((price: [number, number]) => ({
          x: new Date(price[0]),
          y: price[1]
        }))
      }];
    }
  }
  
}
