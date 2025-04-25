'use strict';

const fs = require('fs');
const https = require('https');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;
process.stdin.on('data', chunk => inputString += chunk);
process.stdin.on('end', () => {
    inputString = inputString.split('\n');
    main();
});
function readLine() {
    return inputString[currentLine++];
}

// Helper to GET JSON from a URL
function fetchJson(url) {
    return new Promise((resolve, reject) => {
        https.get(url, res => {
            let body = '';
            res.on('data', c => body += c);
            res.on('end', () => {
                try { resolve(JSON.parse(body)); }
                catch (e) { reject(e); }
            });
        }).on('error', reject);
    });
}

/*
 * Complete the 'getWinnerTotalGoals' function below.
 */
async function getWinnerTotalGoals(competition, year) {
    // 1) Fetch the competition to find the winner
    const compUrl = 
      `https://jsonmock.hackerrank.com/api/football_competitions` +
      `?name=${encodeURIComponent(competition)}` +
      `&year=${year}`;
    const compRes = await fetchJson(compUrl);
    const winner = compRes.data[0].winner;

    let totalGoals = 0;

    // 2) Define a small helper to sum goals for one side (team1 or team2)
    async function sumSideGoals(side) {
        // side is either 'team1' or 'team2'
        const goalField = side + 'goals';        // 'team1goals' or 'team2goals'
        const teamParam = `${side}=${encodeURIComponent(winner)}`;
        // first page to get total_pages
        const firstUrl = 
          `https://jsonmock.hackerrank.com/api/football_matches` +
          `?competition=${encodeURIComponent(competition)}` +
          `&year=${year}` +
          `&${teamParam}` +
          `&page=1`;
        const firstRes = await fetchJson(firstUrl);
        const pages = firstRes.total_pages;

        // process page 1
        let sum = firstRes.data.reduce((acc, match) =>
          acc + parseInt(match[goalField], 10), 0);

        // process remaining pages if any
        for (let p = 2; p <= pages; p++) {
            const url = firstUrl.replace('&page=1', `&page=${p}`);
            const res = await fetchJson(url);
            sum += res.data.reduce((acc, match) =>
              acc + parseInt(match[goalField], 10), 0);
        }
        return sum;
    }

    // Sum goals scored as home and away
    totalGoals += await sumSideGoals('team1');
    totalGoals += await sumSideGoals('team2');

    return totalGoals;
}


async function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
    const competition = readLine();
    const year = parseInt(readLine().trim(), 10);
    const result = await getWinnerTotalGoals(competition, year);
    ws.write(result + '\n');
    ws.end();
}
