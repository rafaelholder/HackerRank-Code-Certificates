'use strict';

const fs = require('fs');
const assert = require('assert');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
  inputString += inputStdin;
});

process.stdin.on('end', function() {
  inputString = inputString.split('\n');
  main();
});

function readLine() {
  return inputString[currentLine++];
}

const counter = (function counter() {
  let value = 0;
  return {
    getValue: function() {
      return value;
    },
    changeBy: function(k) {
      value += k;
    },
  };
})();

function getFixedCounter(k) {
  const step = k;
  return {
    increment() {
      counter.changeBy(step);
    },
    decrement() {
      counter.changeBy(-step);
    },
    getValue() {
      return counter.getValue();
    }
  };
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const val = parseInt(readLine().trim(), 10);

  const c = getFixedCounter(val);
  // ensure we didn't accidentally expose changeBy
  assert(!('changeBy' in c));

  const n = parseInt(readLine().trim(), 10);
  for (let i = 0; i < n; ++i) {
    const op = readLine().trim();
    if (op === '+') {
      c.increment();
    } else if (op === '-') {
      c.decrement();
    } else if (op === '?') {
      ws.write(`${c.getValue()}\n`);
    }
  }
  ws.end();
}
