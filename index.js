const Rx = require('rxjs');

const events = new EventSource('subscribe');

const getValue = event => Number.parseFloat(JSON.parse(event.data));
const getAngle = number => 180 * number;

const updateDial = (dial, angle) => {
  document.querySelector(`#${dial} .gauge-dial`).style.transform = `rotate(${angle}deg`;
}

Rx.Observable.fromEvent(events, 'message')
.map(getValue)
.map(getAngle)
.subscribe(angle => updateDial('instant', angle));

let count = 0;
Rx.Observable.fromEvent(events, 'message')
.map(getValue)
.scan((average, current) => (average * count + current)/++count, 0)
.map(getAngle)
.subscribe(angle => {
  updateDial('average', angle);
});