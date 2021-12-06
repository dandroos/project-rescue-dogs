const path = require("path")
const config = require("./gatsby-config")
const { createFilePath } = require("gatsby-source-filesystem")
const useNav = require("./src/hooks/useNav")

exports.onCreateNode = async ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { internal } = useNav()
  const fetchUrl = ({ lang, linkId }) => {
    return `${lang + internal.filter((i) => i.id === linkId)[0].url[lang]}`
  }
  const { createPage } = actions
  config.siteMetadata.supportedLanguages.map(async (language) => {
    let pQuery = async () => {
      if (language === "es") {
        return await graphql(`
          {
            allFile(
              filter: {
                sourceInstanceName: { eq: "articles_es" }
                extension: { eq: "md" }
              }
              sort: {
                fields: childMarkdownRemark___frontmatter___date
                order: DESC
              }
            ) {
              edges {
                node {
                  childMarkdownRemark {
                    fields {
                      slug
                    }
                  }
                }
              }
            }
          }
        `)
      }
      if (language === "en") {
        return await graphql(`
          {
            allFile(
              filter: {
                sourceInstanceName: { eq: "articles_en" }
                extension: { eq: "md" }
              }
              sort: {
                fields: childMarkdownRemark___frontmatter___date
                order: DESC
              }
            ) {
              edges {
                node {
                  childMarkdownRemark {
                    fields {
                      slug
                    }
                  }
                }
              }
            }
          }
        `)
      }
    }
    const paginationQuery = await pQuery()
    if (paginationQuery.errors) {
      reporter.panicOnBuild("Error while running Pagination query")
      return
    }

    const posts = paginationQuery.data.allFile.edges
    const postsPerPage = 5
    const numPages = Math.ceil(posts.length / postsPerPage)
    Array.from({ length: numPages }).forEach(async (_, i) => {
      await createPage({
        path:
          i === 0
            ? `${fetchUrl({ lang: language, linkId: "news" })}/`
            : `${fetchUrl({ lang: language, linkId: "news" })}/${i + 1}`,
        component: path.resolve("src/templates/news.js"),
        context: {
          sourceInstance: `articles_${language}`,
          language: language,
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i + 1,
        },
      })
    })

    const articleTemplate = path.resolve("src/templates/article.js")
    const aQuery = async () => {
      if (language === "es") {
        return await graphql(`
          {
            allFile(
              filter: {
                sourceInstanceName: { eq: "articles_es" }
                extension: { eq: "md" }
              }
            ) {
              edges {
                node {
                  childMarkdownRemark {
                    id
                    fields {
                      slug
                    }
                  }
                }
              }
            }
          }
        `)
      }
      if (language === "en") {
        return await graphql(`
          {
            allFile(
              filter: {
                sourceInstanceName: { eq: "articles_en" }
                extension: { eq: "md" }
              }
            ) {
              edges {
                node {
                  childMarkdownRemark {
                    id
                    fields {
                      slug
                    }
                  }
                }
              }
            }
          }
        `)
      }
    }
    const articlesQuery = await aQuery()
    if (articlesQuery.errors) {
      reporter.panicOnBuild("Error while running article query")
      return
    }
    articlesQuery.data.allFile.edges.forEach(({ node }) => {
      createPage({
        path: `${fetchUrl({ lang: language, linkId: "news" })}${
          node.childMarkdownRemark.fields.slug
        }`,
        component: articleTemplate,
        context: { id: node.childMarkdownRemark.id, language: language },
      })
    })
    createPage({
      path: `/${language}`,
      component: path.resolve("src/templates/hero.js"),
      context: {
        language: language,
      },
    })
    const theDogsTemplate = path.resolve("src/templates/the-dogs.js")
    createPage({
      path: fetchUrl({ lang: language, linkId: "the-dogs" }),
      component: theDogsTemplate,
      context: { language },
    })
    const dogTemplate = path.resolve("src/templates/dog.js")
    const dogsQuery = await graphql(`
      {
        allFile(
          filter: {
            sourceInstanceName: { eq: "dogs" }
            extension: { eq: "md" }
          }
        ) {
          edges {
            node {
              childMarkdownRemark {
                id
                fields {
                  slug
                }
                frontmatter {
                  dog_images {
                    childImageSharp {
                      id
                    }
                  }
                }
              }
            }
          }
        }
      }
    `)
    if (dogsQuery.errors) {
      reporter.panicOnBuild("Error while running dogs query")
    }
    dogsQuery.data.allFile.edges.forEach(({ node }) => {
      createPage({
        path: `${fetchUrl({ linkId: "the-dogs", lang: language })}${
          node.childMarkdownRemark.fields.slug
        }`,
        component: dogTemplate,
        context: {
          id: node.childMarkdownRemark.id,
          language: language,
          profile:
            node.childMarkdownRemark.frontmatter.dog_images[0].childImageSharp
              .id,
        },
      })
    })
    createPage({
      path: fetchUrl({ lang: language, linkId: "contact" }),
      component: path.resolve("src/templates/contact.js"),
      context: {
        language,
      },
    })
    const createStaticPage = async ({ id, filename, howTo = true }) => {
      const query = await graphql(`
      {
        file(
          sourceInstanceName: { eq: "static_pages" }
          name: { eq: "${filename}" }
        ) {
          childMarkdownRemark {
            id
          }
        }
      }
    `)
      if (query.errors) {
        reporter.panicOnBuild(`Error while running ${id} query`)
      }
      if (howTo) {
        createPage({
          path: `${
            language +
            internal
              .filter((i) => i.id === "how-to")[0]
              .options.filter((j) => j.id === id)[0].url[language]
          }`,
          component: path.resolve("src/templates/static_page.js"),
          context: {
            language,
            id: query.data.file.childMarkdownRemark.id,
            howTo: true,
            location: id,
          },
        })
      } else {
        createPage({
          path: fetchUrl({ lang: language, linkId: id }),
          component: path.resolve("src/templates/static_page.js"),
          context: {
            language,
            id: query.data.file.childMarkdownRemark.id,
            location: id,
          },
        })
      }
    }
    createStaticPage({ id: "about", filename: "about_us", howTo: false })
    createStaticPage({ id: "adopt", filename: "adopt" })
    createStaticPage({ id: "foster", filename: "foster" })
    createStaticPage({ id: "donate", filename: "donate" })
    createStaticPage({ id: "volunteer", filename: "volunteer" })
  })
}
