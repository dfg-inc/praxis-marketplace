import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Praxis",
  description: "Role plugins, method, and catalog",
  themeConfig: {
    nav: [
      { text: "Plugins", link: "/plugins/" },
      { text: "Method", link: "/method/" },
      { text: "Catalog", link: "/catalog/" },
      { text: "Changelog", link: "/changelog" },
    ],
    sidebar: {
      "/plugins/": [
        { text: "Overview", link: "/plugins/" },
        { text: "BA", link: "/plugins/ba" },
        { text: "Architect", link: "/plugins/architect" },
        { text: "Developer", link: "/plugins/developer" },
      ],
      "/method/": [
        { text: "Overview", link: "/method/" },
        { text: "Roles", link: "/method/roles" },
        { text: "RBPIV", link: "/method/rbpiv" },
      ],
      "/catalog/": [{ text: "Catalog", link: "/catalog/" }],
    },
  },
});
