import { Component, inject } from '@angular/core';
import { WebVitalsService } from './services/web-vitals.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'lighthouse-angular';
  private webVitals: WebVitalsService = inject(WebVitalsService);

  download() {
    this.webVitals.downloadJSON(); // ✅ triggers file download
  }

  handleClick() {
    console.log('User interaction triggered');
  }
}
