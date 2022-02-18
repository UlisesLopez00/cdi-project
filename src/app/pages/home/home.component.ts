import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public dataPie: any = {
    labels: ['Client', 'Viewer'],
    datasets: [
      {
        label: 'Visitantes',
        data: [5, 19],
        borderWidth: 1,
      },
    ],
  };
  public dataBar: any = {
    labels: [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ],
    datasets: [
      {
        label: '# de ventas',
        data: [12, 19, 3, 5, 2, 3, 5, 6, 4, 7, 8, 12],
        borderWidth: 1,
      },
    ],
  };
  public optionsBar: any = {
    responsive: true,
    maintainAspectRatio: false,
  };
  constructor() {}

  ngOnInit(): void {}
}
