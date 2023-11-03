import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-midnight-countdown',
  templateUrl: './midnight-countdown.component.html',
  styleUrls: ['./midnight-countdown.component.css']
})
export class MidnightCountdownComponent implements OnInit, OnDestroy {
  timeToMidnight: any;
  private timerInterval: any;

  constructor() {
    this.updateTimeToMidnight();
  }

  ngOnInit() {
    this.timerInterval = setInterval(() => {
      this.updateTimeToMidnight();
    }, 1000);
  }

  ngOnDestroy() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  private updateTimeToMidnight() {
    const now = new Date();
    const utcMidnight = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1));
    const timeDiff = utcMidnight.getTime() - now.getTime();

    const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
    const seconds = Math.floor((timeDiff / 1000) % 60);

    this.timeToMidnight = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
}
