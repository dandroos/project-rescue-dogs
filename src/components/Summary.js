import React from "react"
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Typography,
  List,
} from "@mui/material"
import "moment/locale/en-gb"
import {
  Cake,
  GenderMaleFemale,
  DogSide,
  Calendar,
  HumanChild,
  Dog as DogIcon,
  Cat,
  AlertCircleOutline,
} from "@mitch528/mdi-material-ui"
import { connect } from "react-redux"
import { useStaticQuery, graphql } from "gatsby"

const Summary = ({
  breed,
  date_entered,
  dob,
  ppp,
  sex,
  sociability,
  language,
}) => {
  const dictionary = useStaticQuery(graphql`
    {
      file(sourceInstanceName: { eq: "language" }, name: { eq: "dictionary" }) {
        childMarkdownRemark {
          frontmatter {
            age {
              en
              es
            }
            breed {
              en
              es
            }
            came_in {
              en
              es
            }
            cats {
              en
              es
            }
            sex {
              en
              es
            }
            ppp {
              en
              es
            }
            children {
              en
              es
            }
            dogs {
              en
              es
            }
            profile {
              en
              es
            }
            sociability {
              en
              es
            }
          }
        }
      }
    }
  `).file.childMarkdownRemark.frontmatter
  const Detail = ({ label, children, Icon, noDivider }) => (
    <ListItem divider={!noDivider}>
      <ListItemIcon sx={{ minWidth: 30 }}>
        <Icon sx={{ fontSize: 18 }} />
      </ListItemIcon>
      <ListItemText
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        primary={label}
        primaryTypographyProps={{ variant: "overline" }}
        secondary={children}
        secondaryTypographyProps={{ variant: "body1", color: "text.primary" }}
      />
    </ListItem>
  )
  return (
    <>
      <Typography variant="h5">{dictionary.profile[language]}</Typography>
      <List>
        <Detail label={dictionary.age[language]} Icon={Cake}>
          {dob}
        </Detail>
        <Detail label={dictionary.sex[language]} Icon={GenderMaleFemale}>
          {sex}
        </Detail>
        <Detail label={dictionary.breed[language]} Icon={DogSide}>
          {breed}
        </Detail>
        <Detail label={dictionary.ppp[language]} Icon={AlertCircleOutline}>
          {ppp}
        </Detail>
        <Detail label={dictionary.came_in[language]} Icon={Calendar} noDivider>
          {date_entered}
        </Detail>
        <ListSubheader
          disableGutters
          disableSticky
          sx={{
            mt: 2,
            py: 0,
            lineHeight: "inherit",
            background: "transparent",
          }}
        >
          {dictionary.sociability[language]}
        </ListSubheader>
        <Detail label={dictionary.children[language]} Icon={HumanChild}>
          {sociability.children}
        </Detail>
        <Detail label={dictionary.dogs[language]} Icon={DogIcon}>
          {sociability.dogs}
        </Detail>
        <Detail label={dictionary.cats[language]} Icon={Cat} noDivider>
          {sociability.cats}
        </Detail>
      </List>
    </>
  )
}

const mapStateToProps = (state) => ({
  isMobile: state.isMobile,
  language: state.language,
})

export default connect(mapStateToProps)(Summary)
