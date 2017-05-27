const Rx = require('rxjs');

const events = new EventSource('subscribe');

Rx.Observable.fromEvent(events, 'message')
.map(event => event.data)
.subscribe(data => {
  console.log(data)
});

 
events.onmessage = function (event) {
  const value = Number.parseFloat(JSON.parse(event.data));
  const angle = 180 * value;

  document.getElementById('gauge-dial').style.transform = `rotate(${angle}deg)`;
}
