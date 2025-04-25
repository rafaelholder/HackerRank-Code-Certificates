'use strict';

const fs = require('fs');
const https = require('https');

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

/*
 * Complete the 'getNumDraws' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER year as parameter.
 */

function fetchJson(url) {
    return new Promise((resolve, reject) => {
        https.get(url, res => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(body));
                } catch (e) {
                    reject(e);
                }
            });
        }).on('error', reject);
    });
}

async function getNumDraws(year) {
    let totalDraws = 0;
    // no team scores more than 10 goals
    for (let goals = 0; goals <= 10; goals++) {
        const url = 
            `https://jsonmock.hackerrank.com/api/football_matches` +
            `?year=${year}` +
            `&team1goals=${goals}` +
            `&team2goals=${goals}` +
            `&page=1`;
        const resp = await fetchJson(url);
        // resp.total is the total number of matches for this exact score
        totalDraws += resp.total;
    }
    return totalDraws;
}

async function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const year = parseInt(readLine().trim(), 10);
    const result = await getNumDraws(year);

    ws.write(result + '\n');
    ws.end();
}
