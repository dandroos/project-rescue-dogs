import { Alert, Grid, Typography } from "@mui/material"
import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import { connect } from "react-redux"
import ContactForm from "../components/ContactForm"
import PageWrapper from "../components/PageWrapper"
import { setLocationId, setLanguage } from "../redux/actions"
import useNav from "../hooks/useNav"
import LocationMap from "../components/LocationMap"
import OpeningHours from "../components/OpeningHours"
import CommonQueries from "../components/CommonQueries"
import ContactButtons from "../components/ContactButtons"

const Contact = ({ dispatch, currLang, pageContext }) => {
  const { content } = useStaticQuery(graphql`
    {
      content: file(
        sourceInstanceName: { eq: "static_pages" }
        name: { eq: "contact_us" }
      ) {
        childMarkdownRemark {
          frontmatter {
            contact_us_buttons_intro_text {
              en
              es
            }
            contact_us_common_queries_alert {
              en
              es
            }
            contact_us_contact_form_intro_text {
              en
              es
            }
          }
        }
      }
    }
  `)

  const data = {
    ...content.childMarkdownRemark.frontmatter,
  }

  const { internal } = useNav()

  React.useEffect(() => {
    dispatch(setLocationId({ id: "contact" }))
    if (currLang !== pageContext.language) {
      dispatch(setLanguage(pageContext.language))
    }
    //eslint-disable-next-line
  }, [])

  return (
    <PageWrapper
      title={
        internal.filter((i) => i.id === "contact")[0].label[
          pageContext.language
        ]
      }
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={7}>
              <LocationMap />
            </Grid>
            <Grid item xs={12} md={5} sx={{ textAlign: "center" }}>
              <OpeningHours />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Alert severity="warning" variant="outlined">
            {data.contact_us_common_queries_alert[pageContext.language]}
          </Alert>
        </Grid>
        <Grid item xs={12}>
          <CommonQueries language={pageContext.language} />
        </Grid>
        <Grid item xs={12}>
          <Typography paragraph>
            {data.contact_us_buttons_intro_text[pageContext.language]}
          </Typography>
        </Grid>
        <ContactButtons language={pageContext.language} />
        <Grid item xs={12}>
          <Typography gutterBottom>
            {data.contact_us_contact_form_intro_text[pageContext.language]}
          </Typography>
          <ContactForm />
        </Grid>
      </Grid>
    </PageWrapper>
  )
}

export default connect((state) => ({
  currLang: state.language,
}))(Contact)
