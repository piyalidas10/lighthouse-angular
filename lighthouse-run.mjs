import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import fs from 'fs';
import path from 'path';

const chrome = await chromeLauncher.launch({
  chromeFlags: ['--headless', '--no-sandbox']
});

const options = {
  logLevel: 'info',
  output: 'html',
  port: chrome.port
};

const url = 'http://localhost:3000';

const runnerResult = await lighthouse(url, options);

// 📁 Create folder if not exists
const dir = './lighthouse';
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

// 📄 Generate unique filename using timestamp
const timestamp = Date.now();
const filePath = path.join(dir, `report-${timestamp}.html`);

fs.writeFileSync(filePath, runnerResult.report);

console.log(`\n📊 Report saved at: ${filePath}`);

const audits = runnerResult.lhr.audits;

console.log('\nCore Web Vitals:');
console.log('LCP:', audits['largest-contentful-paint'].displayValue);
console.log('CLS:', audits['cumulative-layout-shift'].displayValue);
console.log('INP:', audits['interactive'].displayValue);

await chrome.kill();