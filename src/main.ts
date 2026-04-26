import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));


/**
 * Real User Monitoring (RUM) – Production Level
 * npm install web-vitals
 * Send data to backend
 */

// import { onCLS, onINP, onLCP } from 'web-vitals';

// function sendToAnalytics(metric: any) {
//   console.log(metric);

//   // Send to backend / analytics
//   fetch('/analytics', {
//     method: 'POST',
//     body: JSON.stringify(metric),
//     keepalive: true
//   });
// }

// onLCP(sendToAnalytics);
// onINP(sendToAnalytics);
// onCLS(sendToAnalytics);
