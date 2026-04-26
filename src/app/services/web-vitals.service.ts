import { Injectable } from '@angular/core';
import { onLCP, onCLS, onINP } from 'web-vitals';

export interface WebVitalMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  timestamp: number;
}

@Injectable({
  providedIn: 'root'
})
export class WebVitalsService {
  private metrics: WebVitalMetric[] = [];

  constructor() {
    this.init();
  }

  private init() {
    const capture = (metric: any) => {
      const data: WebVitalMetric = {
        name: metric.name,
        value: metric.value,
        rating: metric.rating,
        timestamp: Date.now()
      };

      this.metrics.push(data);

      // ✅ Persist in localStorage
      localStorage.setItem('webVitals', JSON.stringify(this.metrics));

      console.log('📊 Web Vital:', data);
    };

    onLCP(capture);
    onCLS(capture);
    onINP(capture);
  }

  // 🔹 Get all metrics
  getMetrics(): WebVitalMetric[] {
    return this.metrics;
  }

  // 🔹 Download JSON file
  downloadJSON() {
    if (this.metrics.length === 0) {
      alert('No Web Vitals collected yet!');
      return;
    }

    const dataStr = JSON.stringify(this.metrics, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    a.href = url;
    a.download = `web-vitals-${timestamp}.json`;

    a.click();
    window.URL.revokeObjectURL(url);
  }

  // 🔹 Optional: Send to backend
  sendToBackend() {
    fetch('/api/web-vitals', {
      method: 'POST',
      body: JSON.stringify(this.metrics),
      headers: { 'Content-Type': 'application/json' }
    });
  }
}