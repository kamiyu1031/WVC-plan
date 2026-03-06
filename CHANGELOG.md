# 更新日誌 (Changelog)

所有關於 WVC-plan (工班出勤排班表) 的重要更新與版本紀錄將會在此檔案中維護。

## [1.0.1] - 2026-03-06

### 變更 (Changed)
- 將主程式 `wvc-1.html` 更名為 `index.html`，以便未來部署至 GitHub Pages 時可以直接透過網址讀取。

## [Initial Version] - 2026-03-06

### 新增 (Added)
- 建立專案基礎架構，使用純前端技術 (HTML + React CDN + Tailwind CDN)。
- 建立 `wvc-1.html` 主程式。
- 實作視覺化月曆排班介面，包含周末、假日紅字與農曆提示。
- 實作點擊日期彈出 Modal 單獨設定人員排班狀態的功能。
- 實作匯入 Excel (`.xlsx`) 自動解析「工班清單」與自訂「狀態顏色」功能。
- 實作「文字輸入排班」解析器，支援多行文字智慧轉譯班表。
- 實作匯出 JSON 備份檔及匯入 JSON 還原功能。
- 實作利用 `html2canvas` 與 `jsPDF` 將月曆轉換並匯出橫版 A4 PDF 的功能。
