# 版本更新歷程 (Version History & Changelog)

## [v1.2.0] - 2026-10-05
### SurveyCake 題目頁內直接填答與後台即時收件 (In-Page Live Appraisal Terminal)
- **核心視窗**：於首頁核心區域打造「線上自評填寫終端 (Live Appraisal Terminal)」，完整於網站中展開 SurveyCake 題目內容。
- **後台無縫入庫**：由 SurveyCake 原生引擎直接處理作答校驗與「送出」機制，100% 確保 SurveyCake 後台即時收到回覆。
- **互動控制項**：加入全螢幕專注作答模式（支援 ESC 退出）、重新整理按鈕與安全傳輸標章。
- **導航升級**：將頂部導覽列、Hero 主按鈕與檢查清單（Checklist）100% 解鎖按鈕全面聯動平滑滾動至終端填答區。

## [v1.1.0] - 2026-10-05
### GitHub 部署與公開發布上線 (GitHub Pages Live)
- **正式上線**：網站成功託管並發布至 GitHub Pages：`https://iris870905.github.io/PA-system/`。
- **儲存庫建立**：於 GitHub 建立公開儲存庫 `iris870905/PA-system` 並推播主分支。
- **權限與部署優化**：採用 GitHub Pages 原生分支發布架構，無須複雜 Actions Token 即可實現自動同步。
- **專案文檔**：包含完整 `README.md` 與 `.gitignore`。

## [v1.0.0] - 2026-10-05
### 專案初始化與功能建置
- **核心架構**：建立子公司績效考核自評專用引導門戶網站 (Performance Appraisal Portal)。
- **外部整合**：串接 SurveyCake 官方問卷 (`https://www.surveycake.com/s/w3r4q`)。
- **介面模組**：
  - 沉浸式 Hero 區塊與截止日即時倒數計時器。
  - 考核四大核心維度卡片（成果達成、專業創新、團隊協作、願景成長）。
  - 互動式自評準備檢核表（Readiness Checklist）與進度連動。
  - 雙填寫通道：原生分頁直達 + 頁內即時嵌入彈窗（Modal Iframe）。
  - 考核階段時程軸（Timeline）與常見問題（FAQ）手風琴元件。
  - 深淺雙主題（Dark / Light Theme）切換支援。
