import React from "react"
import { Typography, List, ListItem, ListItemText } from "@mui/material"
import { graphql, useStaticQuery } from "gatsby"
import { connect } from "react-redux"
import getDays from "../util/getDays"

const OpeningHours = ({ language }) => {
  const { schedule, dictionary } = useStaticQuery(graphql`
    {
      schedule: file(
        sourceInstanceName: { eq: "contact_details" }
        name: { eq: "opening_hours" }
      ) {
        childMarkdownRemark {
          frontmatter {
            days {
              entry {
                day
                time
              }
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
          }
        }
      }
    }
  `)
  return (
    <>
      <Typography variant="h4">
        {dictionary.childMarkdownRemark.frontmatter.opening_hours[language]}
      </Typography>
      <List sx={{ maxWidth: 350, m: "0 auto" }}>
        {schedule.childMarkdownRemark.frontmatter.days.map((i, ind) => (
          <ListItem key={ind}>
            <ListItemText
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                alignItems: "center",
              }}
              primary={(() =>
                getDays({ day: i.entry.day, language: language }))()}
              secondary={i.entry.time}
              secondaryTypographyProps={{ color: "inherit" }}
            />
          </ListItem>
        ))}
      </List>
    </>
  )
}

export default connect(({ language }) => ({ language: language }))(OpeningHours)
