const XLSX = require('xlsx');

const filePath = process.argv[2] || 'g:\\aiagent\\worker_view_cal\\ref-data\\2026-3月派工\\2026-3月.xlsx';
const workbook = XLSX.readFile(filePath);
const outWorkbook = XLSX.utils.book_new();

workbook.SheetNames.forEach(sheetName => {
    const sheet = workbook.Sheets[sheetName];
    // 將 sheet 轉換為 2D 陣列
    const data = XLSX.utils.sheet_to_json(sheet, { header: 1, raw: false, defval: '' });

    // 過濾掉完全空白的列 (將所有欄位轉成字串並檢查是否為空)
    const filteredData = data.filter(row => row.some(cell => cell.toString().trim() !== ''));

    // 如果這個工作表還有資料，就將其寫入新的工作表
    if (filteredData.length > 0) {
        const newSheet = XLSX.utils.aoa_to_sheet(filteredData);
        XLSX.utils.book_append_sheet(outWorkbook, newSheet, sheetName);
    }
});

const outputPath = 'g:\\aiagent\\worker_view_cal\\excel_output.xlsx';
XLSX.writeFile(outWorkbook, outputPath);
console.log(`Excel 解析完成，檔案已儲存至: ${outputPath}`);
