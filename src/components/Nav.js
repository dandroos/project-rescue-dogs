import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { graphql, navigate, useStaticQuery } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Menu } from "@mitch528/mdi-material-ui"
import React from "react"
import { connect } from "react-redux"

import useNav from "../hooks/useNav"
import { setShowMobileNav } from "../redux/actions"
import Dropdown from "./Dropdown"
import { Link } from "./Link"
import MobileNav from "./MobileNav"
import LanguageSelector from "./LanguageSelector"
import SocialLinks from "./SocialLinks"

const Nav = ({ dispatch, atTop, isMobile, language }) => {
  const { siteLogo, siteLogoSmall, siteTitle } = useStaticQuery(graphql`
    {
      siteLogo: file(
        sourceInstanceName: { eq: "images" }
        name: { eq: "logo" }
      ) {
        childImageSharp {
          gatsbyImageData(height: 55, quality: 100, placeholder: NONE)
        }
      }
      siteLogoSmall: file(
        sourceInstanceName: { eq: "images" }
        name: { eq: "logo" }
      ) {
        childImageSharp {
          gatsbyImageData(height: 45, quality: 100, placeholder: NONE)
        }
      }
      siteTitle: site {
        siteMetadata {
          title
        }
      }
      social: file(
        sourceInstanceName: { eq: "contact_details" }
        name: { eq: "email_and_social" }
      ) {
        childMarkdownRemark {
          frontmatter {
            facebook_id
            instagram_id
          }
        }
      }
    }
  `)

  const logo = getImage(siteLogo)
  const smallLogo = getImage(siteLogoSmall)
  const navigation = useNav()

  return (
    language && (
      <>
        <MobileNav />
        <AppBar color="secondary" elevation={2}>
          <Toolbar
            variant={atTop ? "regular" : "dense"}
            sx={{ transition: "all .2s" }}
          >
            <Box
              style={{ cursor: "pointer" }}
              display="flex"
              alignItems="center"
              onClick={() => navigate("/")}
            >
              <GatsbyImage
                image={atTop ? (!isMobile ? logo : smallLogo) : smallLogo}
                alt="FDR logo"
                style={{ marginRight: 8 }}
              />
              {!isMobile ? (
                <Typography
                  variant="h6"
                  variantMapping={{ h6: "h1" }}
                  display="inline-block"
                >
                  {siteTitle.siteMetadata.title}
                </Typography>
              ) : (
                <Typography
                  variant="h6"
                  variantMapping={{ h6: "h1" }}
                  fontSize={14}
                >
                  {siteTitle.siteMetadata.title}
                </Typography>
              )}
            </Box>
            <Box flexGrow={1} />
            {isMobile ? (
              <IconButton
                color="inherit"
                edge="end"
                onClick={() => dispatch(setShowMobileNav(true))}
              >
                <Menu />
              </IconButton>
            ) : (
              <>
                {navigation.internal.map(
                  ({ id, label, url, dropdown, options }, ind) => {
                    if (label) {
                      return dropdown ? (
                        <Dropdown
                          label={label[language]}
                          options={options}
                          key={ind}
                          id={id}
                        />
                      ) : (
                        <Button
                          key={ind}
                          variant="text"
                          color="inherit"
                          component={Link}
                          to={`/${language + url[language]}`}
                          style={{ marginRight: 20 }}
                        >
                          {label[language]}
                        </Button>
                      )
                    }
                    return null
                  }
                )}
                <SocialLinks />
                <LanguageSelector />
              </>
            )}
          </Toolbar>
        </AppBar>
      </>
    )
  )
}

const mapStateToProps = (state) => ({
  isMobile: state.isMobile,
  atTop: state.atTop,
  language: state.language,
})

export default connect(mapStateToProps)(Nav)
