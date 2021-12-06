module.exports = {
  siteMetadata: {
    title: "Fuerteventura Dog Rescue",
    shortTitle: "FDR",
    defaultDescription: {
      en: "We are a dog rescue association based in La Oliva, Fuerteventura.",
      es: "Somos una asociación de rescate de perros con sede en La Oliva, Fuerteventura.",
    },
    supportedLanguages: [`en`, `es`],
    url: "https://localhost:8000",
  },
  plugins: [
    "gatsby-plugin-framer-motion",
    "gatsby-plugin-top-layout",
    "gatsby-plugin-react-helmet",
    // If you want to use styled components you should add the plugin here.
    // 'gatsby-plugin-styled-components',
    "gatsby-plugin-mui-emotion",
    "gatsby-plugin-redux-wrapper",
    `gatsby-plugin-netlify-cms`,
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
        shortname: `fuerteventura-dog-rescue`,
      },
    },
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/static`,
        name: "assets",
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `dogs`,
        path: `${__dirname}/content/dogs`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `language`,
        path: `${__dirname}/content/language`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `static_pages`,
        path: `${__dirname}/content/static_pages`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `articles_en`,
        path: `${__dirname}/content/articles/english`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `articles_es`,
        path: `${__dirname}/content/articles/espanol`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `contact_details`,
        path: `${__dirname}/content/contact`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          // gatsby-remark-relative-images must go before gatsby-remark-images
          {
            resolve: `gatsby-remark-relative-images-v2`,
            options: {
              staticFolderName: "content/site_images",
            },
            // options: {
            // [Optional] The root of "media_folder" in your config.yml
            // Defaults to "static"
            // staticFolderName: 'static',
            // [Optional] Include the following fields, use dot notation for nested fields
            // All fields are included by default
            // include: ['featured'],
            // [Optional] Exclude the following fields, use dot notation for nested fields
            // No fields are excluded by default
            // exclude: ['featured.skip'],
            // },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 500,
              linkImagesToOriginal: false,
              withWebp: true,
            },
          },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-react-leaflet",
      options: {
        linkStyles: true, // (default: true) Enable/disable loading stylesheets via CDN
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `fuerteventura-dog-rescue`,
        short_name: `fdr`,
        start_url: `/`,
        background_color: require("./style.js").palette.primary,
        theme_color: require("./style.js").palette.primary,
        display: `minimal-ui`,
        icon: `src/images/logo.png`, // This path is relative to the root of the site.
      },
    },
  ],
}
