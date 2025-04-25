'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding("ascii");
let inputString = "";
let currentLine = 0;

process.stdin.on("data", function (chunk) {
    inputString += chunk;
});
process.stdin.on("end", function () {
    inputString = inputString.split('\n');
    main();
});

function readLine() {
  return inputString[currentLine++];
}


class ParkingLot {
  constructor(slotCount) {
    // keep a sorted list of “free” slot numbers
    this.freeSlots = [];
    for (let i = 1; i <= slotCount; i++) {
      this.freeSlots.push(i);
    }
    // the “ground truth” array of length = slotCount,
    // index 0⇔slot 1, …, index n–1⇔slot n
    this.slots = new Array(slotCount).fill(null);
  }

  park(carId) {
    if (this.freeSlots.length === 0) {
      return false;         // no space left
    }
    const slot = this.freeSlots.shift();  // take the smallest free slot
    this.slots[slot - 1] = carId;
    return true;
  }

  getSlots() {
    // return exactly [carId|null,…] for slots 1…n
    return this.slots;
  }

  remove(carId) {
    // find which slot the car is in
    const idx = this.slots.indexOf(carId);
    if (idx === -1) {
      return false;         // car not found
    }
    // free it
    this.slots[idx] = null;
    // put that slot number back into the free list
    this.freeSlots.push(idx + 1);
    // re-sort so shift() continues to give the smallest
    this.freeSlots.sort((a, b) => a - b);
    return true;
  }
}



function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
    
    const numberOfSlots = parseInt(readLine().trim());
    const parkingLotObj = new ParkingLot(numberOfSlots);
    ws.write(`Parking Lot created with number of slots as ${numberOfSlots}\n`);
    
    let numberOfOperations = parseInt(readLine().trim());
    while (numberOfOperations-- > 0) {
        const inputs = readLine().trim().split(' ');
        const operation = inputs[0];
        const carId = inputs[1];

        switch(operation) {
            case 'Park':
                if (parkingLotObj.park(carId)) {
                    ws.write(`Parking Started: ${carId}\n`);
                } else {
                    ws.write(`Parking Full: ${carId}\n`);
                }
                break;
            case 'Remove':
                if (parkingLotObj.remove(carId)) {
                    ws.write(`Car id ${carId} removed from parking\n`);
                } else {
                    ws.write(`Car: ${carId} not found\n`);
                }
                break;
            case 'GetSlots':
                const status = parkingLotObj.getSlots();
                status.forEach((obj, i) => {
                    if (obj) {
                        ws.write(`Parked at slot ${i + 1}: ${obj}\n`);
                    } else {
                        ws.write(`Slot ${i + 1} is empty\n`);
                    }
                })
                break;
            default:
                break;
        }
    }
    ws.end();
}