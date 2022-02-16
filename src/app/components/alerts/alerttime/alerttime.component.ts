import { Component, Injectable, Input } from '@angular/core';

@Component({
  selector: 'app-alerttime',
  templateUrl: './alerttime.component.html',
  styleUrls: ['./alerttime.component.css'],
})
@Injectable({
  providedIn: 'root',
})
export class AlerttimeComponent {
  @Input() data: any = {};
  constructor() {}
}
