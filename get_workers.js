const XLSX = require('./lib/xlsx.full.min.js');
const fs = require('fs');

const wbWorkers = XLSX.read(fs.readFileSync('260303-workers list.xlsx'), {type: 'buffer'});
const sheetWorkers = wbWorkers.Sheets['工班清單'];
const dataWorkers = XLSX.utils.sheet_to_json(sheetWorkers);
const out = dataWorkers.map(r => ({id: r['工班員'], name: String(r['姓名']), short: String(r['簡稱'])}));
fs.writeFileSync('workers_out.json', JSON.stringify(out, null, 2));
