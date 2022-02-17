import { Component, Injectable, Input, SimpleChanges } from '@angular/core';

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
  public animation:number = -3
  public sleep = (ms: any) => new Promise((r) => setTimeout(r, ms));
  constructor() {}
  async ngOnChanges(changes: SimpleChanges) {
    for (let index = -3; index < 6; index++)  {
       this.animation = index;
       await this.sleep(10);

    }
    this.animation = 0;
    await this.sleep(4000);

    this.data.show = await false;
  }
}
