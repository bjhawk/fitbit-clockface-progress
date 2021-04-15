// TODO: PERMISSIONS
import { battery } from 'power';
import { BodyPresenceSensor } from 'body-presence';
import clock from 'clock';
import { display } from 'display';
import document from 'document';
import { HeartRateSensor } from 'heart-rate';
import { me } from 'appbit';
import { today } from 'user-activity';

const clockElement = document.getElementById('time');
clock.granularity = 'seconds';
clock.ontick = function (clockTickEvent) {
  
  // todo: respect 12/24 hr in format
  const hours = clockTickEvent.date.getHours();
  const minutes = clockTickEvent.date.getMinutes();
  // const seconds = clockTickEvent.date.getSeconds();

  // console.log(JSON.stringify(clockTickEvent.date.getDay()));
  // TODO: date... oi.

  // clockElement.text = `${hours}:${minutes}:${seconds}`;
  // clockElement.text = `${hours}:${minutes}`;
}

// stat element
const statElement = document.getElementById('stat');

// HRM
const hrElement = document.getElementById('hr');
let hrm = null;
if (HeartRateSensor && !hrm) {
  hrm = new HeartRateSensor();

  hrm.onreading = function () {
    hrElement.text = `${hrm.heartRate}`;
  };

  hrm.start();
}

// on-wrist and screen-on detection
let body = null
// if (hrm && BodyPresenceSensor && !body) {
//   body = new BodyPresenceSensor();
//   body.onreading = () => {
// 		if (!body.present && hrm.activated) {
// 			hrm.stop();
// 		} else if (body.present && !hrm.activated) {
// 			hrm.start();
// 		}

//     debug();
// 	};
// 	body.start();
// }
// todo: screen off = hrm off AND body off
display.addEventListener('change', () => {
  if (display.on) {
    handleDisplayOn();
  } else {
    handleDisplayOff();
  }

  debug();
});

function handleDisplayOn() {
  if (hrm && !hrm.activated) {
    hrm.start();
  }

  if (body && !body.activated) {
    body.start();
  }
}

function handleDisplayOff() {
  if (hrm && hrm.activated) {
    hrm.stop();
  }

  if (body && body.activated) {
    body.stop();
  }
}

// Battery display
const batteryElement = document.getElementById('battery');
batteryElement.text = Math.floor(battery.chargeLevel) + '%';

const stats = [
  {
    name: 'steps',
    init() {
      statElement.text = `${today.adjusted.steps || 0}`;
    },
    halt() {},
  },
  {
    name: 'calories',
    init() {
      statElement.text = `${today.adjusted.calories || 0}`;
    },
    halt() {},
  },
  {
    name: 'distance',
    init() {
      // todo: convert units
      statElement.text = `${today.adjusted.distance || 0}`;
    },
    halt() {},
  },
  {
    name: 'activeMinutes',
    init() {
      // todo: convert units
      statElement.text = `${today.adjusted.activeZoneMinutes.total || 0}`;
    },
    halt() {},
  },
  {
    name: 'elevationGain',
    init() {
      // todo: convert units
      statElement.text = `${today.adjusted.elevationGain || 0}`;
    },
    halt() {},
  },
];

let state = 0;
stats[state].init();

// stat click handling
statElement.onclick = () => {
  setTimeout(() => {
    // halt current state
    stats[state].halt();
    
    // increment states
    state = (state + 1) % stats.length;

    // init next state
    stats[state].init();
  }, 300)
};

// TODO: REMOVE
function debug() {
  const debugElement = document.getElementById('debug');
  let debugStatement = '';

  if (hrm.activated) {
    debugStatement += 'H';
  } else {
    debugStatement += '_';
  }

  if (body.activated) {
    debugStatement += 'B';
  } else {
    debugStatement += '_';
  }

  if (display.on) {
    debugStatement += 'D';
  } else {
    debugStatement += '_';
  }
  console.log(`Debug: ${debugStatement}`);
  debugElement.text = debugStatement;
}