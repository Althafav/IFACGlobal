/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://https://ifacglobal.com/",
  generateRobotsTxt: true,
  sitemapSize: 100000,
  generateIndexSitemap: false,
  transform: async (config, path) => {
    let priority = 0.7;

    if (path === "/") {
      priority = 1.0;
    } else if (path.startsWith("/about")) {
      priority = 0.9;
    } 

    return {
      loc: path,
      changefreq: "weekly",
      priority: priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
};
