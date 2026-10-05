# 版本更新歷程 (Version History & Changelog)

## [v1.1.0] - 2026-10-05
### GitHub 部署與公開發布支援 (GitHub Pages Ready)
- **CI/CD 工作流**：新增 `.github/workflows/deploy.yml`，支援 main 分支推播時自動發布至 GitHub Pages。
- **專案文檔**：新增 `README.md` 與標準 `.gitignore` 檔案。
- **全域整合**：預備透過 GitHub Pages 建立線上公開訪問網址。

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
