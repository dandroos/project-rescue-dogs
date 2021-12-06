/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { connect } from "react-redux"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import { useLocation } from "@reach/router"
import defaultOG from "../images/def_og.png"

function Head(props) {
  const { pathname } = useLocation()
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            defaultDescription {
              en
              es
            }
            url
          }
        }
      }
    `
  )

  const { title, titleOverride, description, ogImage, language, siteLang } =
    props

  const metaTitle = title
    ? `${title} | ${site.siteMetadata.title}`
    : site.siteMetadata.title
  const metaDescription =
    description || site.siteMetadata.defaultDescription[siteLang]

  const metaOGImage = ogImage || defaultOG

  return (
    <Helmet
      htmlAttributes={{
        lang: language,
      }}
      title={metaTitle}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: titleOverride
            ? site.siteMetadata.title
            : `${title} | ${site.siteMetadata.title}`,
        },
        {
          property: `og:image`,
          content: site.siteMetadata.url + metaOGImage,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:url`,
          content: `${site.siteMetadata.url}${pathname}`,
        },
        {
          property: `og:site_name`,
          content: site.siteMetadata.title,
        },
        {
          name: `twitter:card`,
          content: `summary_large_image`,
        },
      ].concat(props.meta)}
    />
  )
}

Head.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}
const mapStateToProps = (state) => ({
  siteLang: state.language,
})

export default connect(mapStateToProps)(Head)
