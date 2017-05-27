const Rx = require('rxjs');

const events = new EventSource('subscribe');

Rx.Observable.fromEvent(events, 'message')
.map(event => 180 * Number.parseFloat(JSON.parse(event.data)))
.subscribe(data => {
  document.getElementById('gauge-dial').style.transform = `rotate(${angle}deg)`;
});