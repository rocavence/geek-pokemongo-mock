# 老手機通過 Play Integrity 自救指南

一個 macOS 風格的靜態單頁，整理「root / 改機的舊手機如何重新通過 **Play Integrity**」，好讓銀行、Google 錢包、串流等正常 App 在自訂 ROM / root 環境下還能用。2026 版。

> **範圍**：只處理通過認證 / 隱藏 root 這一層，目的是自用 App 能跑。**不含** GPS 假定位或繞過任何遊戲反作弊。針對自己的裝置、合法改機。

目標機型：小米8（Android 10）、小米11 Lite 5G NE（Android 13）。

## 線上

GitHub Pages：https://rocavence.github.io/geek-pokemongo-mock/

## 重點（2026 現況）

- SafetyNet 已退役，全看 Play Integrity 三級：`BASIC` / `DEVICE` / `STRONG`。多數銀行只要 BASIC。
- 2025/5 起 `DEVICE` 在 **Android 13+ 要求 bootloader 上鎖訊號** → A13 要 DEVICE 得靠 TrickyStore + 有效 keybox；A12 以下不受此限。
- 真正瓶頸是 keybox（OEM 外洩、會被持續撤銷）。先試「只過 BASIC」最省。

## 本地運行

```bash
git clone https://github.com/rocavence/geek-pokemongo-mock.git
cd geek-pokemongo-mock
python3 -m http.server 8000   # 開 http://localhost:8000
```

## 結構

```
geek-pokemongo-mock/
├── index.html   # 內容（殼吃 .card / 目錄錨點 / pre 區塊）
├── style.css    # macOS 風格樣式、深色模式
├── script.js    # 平滑捲動、複製、搜尋、深色切換
└── README.md
```

## 參考

- [Play Integrity Fork（osm0sis）](https://github.com/osm0sis/PlayIntegrityFork)
- [Play Integrity Fix（KOWX712）](https://github.com/KOWX712/PlayIntegrityFix)
- [TrickyStore（5ec1cff）](https://github.com/5ec1cff/TrickyStore)
- [Tricky Store 討論串（XDA）](https://xdaforums.com/t/tricky-store-bootloader-keybox-spoofing.4683446/)

## 授權

MIT。工具皆為公開開源專案，本頁僅為個人技術筆記。
