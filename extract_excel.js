const XLSX = require('xlsx');

const filePath = 'g:\\aiagent\\worker_view_cal\\ref-data\\2026-3月派工\\2026-3月.xlsx';
const workbook = XLSX.readFile(filePath);
let locations = new Set();

workbook.SheetNames.forEach(sheetName => {
    const sheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    for (let rowIdx = 0; rowIdx < data.length; rowIdx++) {
        const row = data[rowIdx];
        if (!row) continue;

        let targetCol = -1;
        for (let colIdx = 0; colIdx < row.length; colIdx++) {
            if (typeof row[colIdx] === 'string' && row[colIdx].includes('地點')) {
                targetCol = colIdx;
                break;
            }
        }

        if (targetCol !== -1) {
            for (let r = rowIdx + 1; r < data.length; r++) {
                if (!data[r]) continue;
                const val = data[r][targetCol];
                const col0 = data[r][0]; // To check for "車號" which might be in column 0

                if (col0 && typeof col0 === 'string' && (col0.includes('車號') || col0.includes('施作人員'))) {
                    break;
                }

                if (val && typeof val === 'string' && val.trim() !== '') {
                    if (val.includes('車號') || val.includes('施作人員')) break;
                    // Exclude some obvious non-locations like "請假" or noise if needed, but let's grab all text for now
                    locations.add(val.trim());
                }
            }
        }
    }
});

console.log(JSON.stringify(Array.from(locations), null, 2));
