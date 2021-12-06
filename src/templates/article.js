import { Divider, Grid, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { graphql } from "gatsby"
import { getImage } from "gatsby-plugin-image"
import parse, { domToReact } from "html-react-parser"
import moment from "moment"
import "moment/locale/en-gb"
import "moment/locale/es"
import React from "react"
import { connect } from "react-redux"
import Comments from "../components/Comments"
import PageWrapper from "../components/PageWrapper"
import Sharer from "../components/Sharer"
import { setLanguage, setLocationId } from "../redux/actions"

const Article = ({ dispatch, pageContext, data, isMobile, currLang }) => {
  const { language } = pageContext

  const commentConfig = {
    url: `https://fuerteventuradogrescue.org${window.location.pathname}`,
    identifier: pageContext.id,
    title: data.article.frontmatter.title,
    language: (() => {
      switch (language) {
        case "en":
          return "en_GB"
        case "es":
          return "es_ES"
        default:
          return "en_GB"
      }
    })(),
  }

  const desktopImage = getImage(
    data.article_image_desktop.frontmatter.featured_image
  )
  const mobileImage = getImage(
    data.article_image_mobile.frontmatter.featured_image
  )

  React.useEffect(() => {
    dispatch(setLocationId({ id: "news" }))
    if (currLang !== language) {
      dispatch(setLanguage(language))
    }
    //eslint-disable-next-line
  }, [])
  moment.locale(
    (() => {
      switch (language) {
        case "en":
          return "en-gb"
        case "es":
          return "es"
        default:
          return "en-gb"
      }
    })()
  )
  return typeof window !== "undefined" ? (
    <PageWrapper
      title={data.article.frontmatter.title}
      img={isMobile ? mobileImage : desktopImage}
      language={language}
      og={getImage(data.og.frontmatter.featured_image).images.fallback.src}
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="overline">
            {moment(data.article.frontmatter.date).format("LL")}
          </Typography>
          <Box>
            <Sharer title={data.article.frontmatter.title} />
          </Box>
          <Divider sx={{ mb: 3 }} />
          {parse(data.article.html, {
            replace: (domNode) => {
              if (domNode.type === "tag" && domNode.name === "p") {
                if (!domNode.prev) {
                  return (
                    <Typography variant="lead" paragraph>
                      {domToReact(domNode.children)}
                    </Typography>
                  )
                }
                return (
                  <Typography paragraph>
                    {domToReact(domNode.children)}
                  </Typography>
                )
              }
            },
          })}
        </Grid>
        <Grid item xs={12}>
          <Comments config={commentConfig} language={language} />
        </Grid>
      </Grid>
    </PageWrapper>
  ) : null
}

const mapStateToProps = (state) => ({
  isMobile: state.isMobile,
  currLang: state.language,
})

export const pageQuery = graphql`
  query ($id: String!) {
    article: markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        date
      }
      html
    }
    article_image_desktop: markdownRemark(id: { eq: $id }) {
      frontmatter {
        featured_image {
          childImageSharp {
            gatsbyImageData(
              aspectRatio: 1.35
              transformOptions: { cropFocus: CENTER }
            )
          }
        }
      }
    }
    article_image_mobile: markdownRemark(id: { eq: $id }) {
      frontmatter {
        featured_image {
          childImageSharp {
            gatsbyImageData(
              aspectRatio: 1.5
              transformOptions: { cropFocus: CENTER }
            )
          }
        }
      }
    }
    og: markdownRemark(id: { eq: $id }) {
      frontmatter {
        featured_image {
          childImageSharp {
            gatsbyImageData(width: 1200, height: 627, layout: FIXED)
          }
        }
      }
    }
  }
`

export default connect(mapStateToProps)(Article)
