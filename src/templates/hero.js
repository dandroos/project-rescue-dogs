import { Dog, Newspaper } from "@mitch528/mdi-material-ui"
import { Button, Container, Grid, Typography, useTheme } from "@mui/material"
import { Box } from "@mui/system"
import { graphql, useStaticQuery } from "gatsby"
import BackgroundImage from "gatsby-background-image"
import { getImage } from "gatsby-plugin-image"
import { convertToBgImage } from "gbimage-bridge"
import * as React from "react"
import { connect } from "react-redux"
import Footer from "../components/Footer"

import { Link } from "../components/Link"
import Seo from "../components/seo"
import useNav from "../hooks/useNav"
import { setLanguage, setLocationId } from "../redux/actions"

const Index = ({ dispatch, pageContext, isMobile, currLang }) => {
  const { language } = pageContext
  React.useEffect(() => {
    dispatch(setLocationId({ id: "home" }))
    if (currLang !== language) {
      dispatch(setLanguage(language))
    }
    //eslint-disable-next-line
  }, [])
  const { content } = useStaticQuery(graphql`
    {
      content: file(
        sourceInstanceName: { eq: "static_pages" }
        name: { eq: "homepage" }
      ) {
        childMarkdownRemark {
          frontmatter {
            homepage_main_image_landscape {
              childImageSharp {
                gatsbyImageData(
                  aspectRatio: 2.2
                  quality: 100
                  transformOptions: { cropFocus: CENTER }
                )
              }
            }
            homepage_main_image_portrait {
              childImageSharp {
                gatsbyImageData(aspectRatio: 0.75, quality: 100)
              }
            }
            homepage_subheading {
              en
              es
            }
            homepage_cta_1 {
              homepage_cta_1_button_text {
                en
                es
              }
              homepage_cta_1_page
            }
            homepage_cta_2 {
              homepage_cta_2_button_text {
                en
                es
              }
              homepage_cta_2_page
            }
            homepage_heading {
              es
              en
            }
          }
        }
      }
    }
  `)

  const image = getImage(
    content.childMarkdownRemark.frontmatter.homepage_main_image_landscape
  )
  const mobileImage = getImage(
    content.childMarkdownRemark.frontmatter.homepage_main_image_portrait
  )
  const bgImage = isMobile
    ? convertToBgImage(mobileImage)
    : convertToBgImage(image)

  const { internal } = useNav()

  const Cta = ({ page, text, secondary }) => (
    <Button
      size="large"
      component={Link}
      color={secondary ? "secondary" : "primary"}
      endIcon={(() => {
        switch (page) {
          case "news":
            return <Newspaper />
          case "the-dogs":
            return <Dog />
          case "about":
            return
          default:
            return
        }
      })()}
      to={`/${currLang}${
        internal.filter((i) => i.id === page)[0].url[currLang]
      }`}
    >
      {text}
    </Button>
  )

  return (
    <>
      <Seo language={language} />
      <BackgroundImage {...bgImage}>
        <Box
          minHeight="100vh"
          width="100%"
          display="flex"
          alignItems="flex-end"
        >
          <Box
            color={useTheme().palette.common.white}
            sx={{
              pb: 8,
              pt: 12,
              width: "100%",
              background: `linear-gradient(to top, ${
                useTheme().palette.common.black
              }, transparent)`,
            }}
          >
            <Container maxWidth="lg">
              <Typography variant="h2" variantMapping={{ h1: "h2" }}>
                {
                  content.childMarkdownRemark.frontmatter.homepage_heading[
                    language
                  ]
                }
              </Typography>
              <Typography paragraph variant="lead">
                {
                  content.childMarkdownRemark.frontmatter.homepage_subheading[
                    language
                  ]
                }
              </Typography>
              <Grid container spacing={1}>
                <Grid item>
                  <Cta
                    page={
                      content.childMarkdownRemark.frontmatter.homepage_cta_1
                        .homepage_cta_1_page
                    }
                    text={
                      content.childMarkdownRemark.frontmatter.homepage_cta_1
                        .homepage_cta_1_button_text[language]
                    }
                  />
                </Grid>
                <Grid item>
                  <Cta
                    page={
                      content.childMarkdownRemark.frontmatter.homepage_cta_2
                        .homepage_cta_2_page
                    }
                    text={
                      content.childMarkdownRemark.frontmatter.homepage_cta_2
                        .homepage_cta_2_button_text[language]
                    }
                    secondary
                  />
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Box>
      </BackgroundImage>
      <Footer />
    </>
  )
}

const mapStateToProps = (state) => ({
  isMobile: state.isMobile,
  currLang: state.language,
})

export default connect(mapStateToProps)(Index)
