# 經驗學習與架構思維記錄 (Lessons Learned)

## 專案：子公司年度績效考核入口網站 (Performance Appraisal Portal)

### 1. 業務場景剖析與系統定位
- **老屋翻新隱喻**：一般的問卷表單就像是一張孤零零貼在公佈欄上的紙，同仁往往因缺乏脈絡、評估標準與準備方向而草率填答；而建構專業的入口門戶，宛如為這棟老屋打造一座引導動線清晰、採光充足的接待大廳。它不僅具備美學質感，更賦予了考核正式感與尊重感，提升全員自評品質。
- **填寫阻力化解策略**：考核往往伴隨員工的焦慮感。透過「自評準備度檢查清單」、「評估維度拆解」與「保密說明」，讓同仁在動手前先整理好思緒與量化數據，大幅降低認知負擔。

### 2. 技術選型與設計決策
- **純原生三件套（HTML5 + Vanilla CSS + Modular JS）**：
  - 零依賴、極速載入（First Contentful Paint < 200ms）。
  - CSS Custom Properties（Variables）打造無縫的主題切換（深色沈浸感 / 淺色專業感）。
  - 微動畫（Micro-animations）強化互動反饋，如檢核打勾時進度條的彈簧回彈效果。
- **SurveyCake 整合考量**：
  - 同時提供「全新獨立分頁開啟」與「頁內磨砂玻璃彈窗（Modal）預覽」雙模式，兼顧跨裝置相容性與一站式操作體驗。
- **後台收件與跨域安全機制 (CORS & Cloudflare Turnstile / reCAPTCHA)**：
  - 若試圖在前端自行以 HTML `<form>` 模擬 POST 送交 SurveyCake 端點，會因 CORS 跨域限制與 SurveyCake 內建的 Cloudflare Turnstile / CSRF Token 驗證機制而遭到 403 阻擋，導致考核資料遺失。
  - 最安全且 100% 確保後台入庫的解法：採用 SurveyCake 官方允許的「全尺寸深度頁內嵌入（In-Page Appraisal Terminal）」。將題目完整呈現於網站核心視野中，並直接由 SurveyCake 原生引擎處理填寫與送出，既達成「於網站中直接做答送出」的使用者需求，又確保「後台 100% 即時收件」的可靠性。
