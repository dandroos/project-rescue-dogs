import { Container, Grid, Link, Typography, useTheme } from "@mui/material"
import { Box } from "@mui/system"
import { graphql, useStaticQuery } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import React from "react"
import { connect } from "react-redux"
import LocationMap from "./LocationMap"
import OpeningHours from "./OpeningHours"
import SocialLinks from "./SocialLinks"

const Footer = ({ isMobile, language }) => {
  const { email_and_social, address, dictionary } = useStaticQuery(graphql`
    {
      email_and_social: file(
        sourceInstanceName: { eq: "contact_details" }
        name: { eq: "email_and_social" }
      ) {
        childMarkdownRemark {
          frontmatter {
            email_address
          }
        }
      }
      address: file(
        sourceInstanceName: { eq: "contact_details" }
        name: { eq: "location" }
      ) {
        childMarkdownRemark {
          frontmatter {
            address {
              address_line
            }
          }
        }
      }
      dictionary: file(
        sourceInstanceName: { eq: "language" }
        name: { eq: "dictionary" }
      ) {
        id
        childMarkdownRemark {
          frontmatter {
            opening_hours {
              en
              es
            }
            all_rights_reserved {
              en
              es
            }
            site_by {
              en
              es
            }
          }
        }
      }
    }
  `)
  const getCopyrightYear = () => {
    const currentYear = new Date().getFullYear()
    return currentYear !== 2021 ? `2021 - ${currentYear}` : 2021
  }
  const theme = useTheme()
  return (
    <Box
      py={2}
      bgcolor="primary.main"
      color={theme.palette.primary.contrastText}
      boxShadow={4}
    >
      <Container maxWidth={isMobile ? false : "lg"} disableGutters={isMobile}>
        <Grid container spacing={isMobile ? 4 : 2} alignItems="center">
          <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
            <StaticImage
              src="../images/logo.png"
              alt="FDR logo"
              width={90}
              style={{ marginBottom: 10 }}
            />
            {address.childMarkdownRemark.frontmatter.address.map((i, ind) => (
              <Typography
                key={ind}
                paragraph={
                  ind ===
                  address.childMarkdownRemark.frontmatter.address.length - 1
                }
              >
                {i.address_line}
              </Typography>
            ))}
            <Link
              href={`mailto:${email_and_social.childMarkdownRemark.frontmatter.email_address}`}
              color="common.white"
              underline="hover"
            >
              {email_and_social.childMarkdownRemark.frontmatter.email_address}
            </Link>
            <Box mt={2}>
              <SocialLinks />
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <LocationMap />
          </Grid>
          <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
            <OpeningHours />
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="caption" display="block" sx={{ mb: 1 }}>
                {dictionary.childMarkdownRemark.frontmatter.site_by[language]}
              </Typography>
              <StaticImage
                src="../images/fuertecode_logo_white.png"
                width={50}
                placeholder="none"
                quality={100}
                alt=""
                style={{ marginBottom: 15 }}
              />
              <Typography variant="caption" display="block">
                &copy; {getCopyrightYear()} Fuertecode.{" "}
                {
                  dictionary.childMarkdownRemark.frontmatter
                    .all_rights_reserved[language]
                }
                .
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default connect(({ isMobile, language }) => ({
  isMobile,
  language,
}))(Footer)
