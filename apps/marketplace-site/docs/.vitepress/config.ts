import { defineConfig } from "vitepress";

const enNav = [
  { text: "Guide", link: "/guide/start" },
  { text: "Plugins", link: "/plugins/" },
  { text: "Method", link: "/method/" },
  { text: "Catalog", link: "/catalog/" },
  { text: "Changelog", link: "/changelog" },
];

const ruNav = [
  { text: "Гайд", link: "/ru/guide/start" },
  { text: "Плагины", link: "/ru/plugins/" },
  { text: "Метод", link: "/ru/method/" },
  { text: "Каталог", link: "/catalog/" },
  { text: "Changelog", link: "/changelog" },
];

const enSidebar = {
  "/guide/": [
    { text: "Getting started", link: "/guide/start" },
    { text: "How roles work together", link: "/guide/" },
    { text: "Shared context", link: "/guide/context" },
    { text: "Handoffs and data", link: "/guide/handoffs" },
    { text: "Run and verify", link: "/guide/run" },
  ],
  "/plugins/": [
    { text: "Overview", link: "/plugins/" },
    { text: "BA", link: "/plugins/ba" },
    { text: "Architect", link: "/plugins/architect" },
    { text: "Developer", link: "/plugins/developer" },
    { text: "Quality", link: "/plugins/quality" },
  ],
  "/method/": [
    { text: "Overview", link: "/method/" },
    { text: "Roles", link: "/method/roles" },
    { text: "RBPIV", link: "/method/rbpiv" },
  ],
  "/catalog/": [{ text: "Catalog", link: "/catalog/" }],
};

const ruSidebar = {
  "/ru/guide/": [
    { text: "С чего начать", link: "/ru/guide/start" },
    { text: "Как роли связаны", link: "/ru/guide/" },
    { text: "Общий контекст", link: "/ru/guide/context" },
    { text: "Handoff и данные", link: "/ru/guide/handoffs" },
    { text: "Запуск и проверка", link: "/ru/guide/run" },
  ],
  "/ru/plugins/": [
    { text: "Обзор", link: "/ru/plugins/" },
    { text: "BA", link: "/ru/plugins/ba" },
    { text: "Architect", link: "/ru/plugins/architect" },
    { text: "Developer", link: "/ru/plugins/developer" },
    { text: "Quality", link: "/ru/plugins/quality" },
  ],
  "/ru/method/": [
    { text: "Обзор", link: "/ru/method/" },
    { text: "Роли", link: "/ru/method/roles" },
    { text: "RBPIV", link: "/ru/method/rbpiv" },
  ],
};

export default defineConfig({
  title: "Praxis",
  description: "Role plugins, method, and catalog",
  locales: {
    root: {
      label: "English",
      lang: "en",
      themeConfig: {
        nav: enNav,
        sidebar: enSidebar,
      },
    },
    ru: {
      label: "Русский",
      lang: "ru",
      link: "/ru/",
      themeConfig: {
        nav: ruNav,
        sidebar: ruSidebar,
      },
    },
  },
});
