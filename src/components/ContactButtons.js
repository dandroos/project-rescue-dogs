import React from "react"
import { Grid, Button, ListItemText } from "@mui/material"
import { useStaticQuery, graphql } from "gatsby"
import { FacebookMessenger, Email } from "@mitch528/mdi-material-ui"

const ContactButtons = ({ language }) => {
  const { dictionary, email_and_social } = useStaticQuery(graphql`
    {
      dictionary: file(
        sourceInstanceName: { eq: "language" }
        name: { eq: "dictionary" }
      ) {
        childMarkdownRemark {
          frontmatter {
            email {
              en
              es
            }
          }
        }
      }
      email_and_social: file(
        sourceInstanceName: { eq: "contact_details" }
        name: { eq: "email_and_social" }
      ) {
        childMarkdownRemark {
          frontmatter {
            facebook_id
            email_address
          }
        }
      }
    }
  `)
  const ContactButton = ({ primary, secondary, href, Icon }) => {
    return (
      <Grid item xs={12} md={6}>
        <Button
          sx={{ pt: 1.5, flexDirection: "column", textAlign: "center" }}
          fullWidth
          size="large"
          href={href}
          target="_blank"
        >
          <Icon fontSize="large" />
          <ListItemText
            primary={primary}
            primaryTypographyProps={{ sx: { fontWeight: 900 } }}
            secondary={secondary}
            secondaryTypographyProps={{
              variant: "caption",
              sx: { textTransform: "lowercase" },
            }}
          />
        </Button>
      </Grid>
    )
  }
  return (
    <>
      <ContactButton
        primary="Messenger"
        secondary="fuerteventuradogrescue"
        href={`http://m.me/${email_and_social.childMarkdownRemark.frontmatter.facebook_id}`}
        Icon={FacebookMessenger}
      />
      <ContactButton
        primary={dictionary.childMarkdownRemark.frontmatter.email[language]}
        secondary="info@fuerteventuradogrescue.org"
        href={`mailto:${email_and_social.childMarkdownRemark.frontmatter.email_address}`}
        Icon={Email}
      />
    </>
  )
}

export default ContactButtons
