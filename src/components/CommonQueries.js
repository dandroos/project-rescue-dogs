import React from "react"
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material"
import { useStaticQuery, graphql } from "gatsby"
import { ChevronDown } from "@mitch528/mdi-material-ui"

const CommonQueries = ({ language }) => {
  const { dictionary, content } = useStaticQuery(graphql`
    {
      dictionary: file(
        sourceInstanceName: { eq: "language" }
        name: { eq: "dictionary" }
      ) {
        childMarkdownRemark {
          frontmatter {
            common_queries {
              en
              es
            }
          }
        }
      }
      content: file(
        sourceInstanceName: { eq: "static_pages" }
        name: { eq: "contact_us" }
      ) {
        childMarkdownRemark {
          frontmatter {
            contact_us_common_queries {
              en {
                query
                response
              }
              es {
                query
                response
              }
            }
          }
        }
      }
    }
  `)

  const ContactReason = ({ children, summary }) => (
    <Accordion>
      <AccordionSummary expandIcon={<ChevronDown />}>
        <Typography>{summary}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{children}</Typography>
      </AccordionDetails>
    </Accordion>
  )
  return (
    <>
      <Typography variant="h3">
        {dictionary.childMarkdownRemark.frontmatter.common_queries[language]}
      </Typography>
      {content.childMarkdownRemark.frontmatter.contact_us_common_queries[
        language
      ].map((i, ind) => (
        <ContactReason key={ind} summary={i.query}>
          {i.response}
        </ContactReason>
      ))}
    </>
  )
}

export default CommonQueries
