import React from "react"
import {
  Card,
  Fab,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material"
import { InformationVariant } from "@mitch528/mdi-material-ui"
import { Link } from "./Link"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

const DogCard = ({ language, name, slug, image, sex, age }) => {
  const { male, female } = useStaticQuery(graphql`
    {
      dictionary: file(
        sourceInstanceName: { eq: "language" }
        name: { eq: "dictionary" }
      ) {
        childMarkdownRemark {
          frontmatter {
            male {
              en
              es
            }
            female {
              en
              es
            }
          }
        }
      }
    }
  `).dictionary.childMarkdownRemark.frontmatter

  return (
    <Card elevation={0} variant="outlined" sx={{ position: "relative" }}>
      <Fab
        size="small"
        color="primary"
        sx={{ position: "absolute", top: 15, right: 15, zIndex: 50 }}
        component={Link}
        to={slug}
      >
        <InformationVariant />
      </Fab>
      <CardActionArea component={Link} to={slug}>
        <CardMedia>
          <GatsbyImage image={image} alt={name} />
        </CardMedia>
        <CardContent sx={{ textAlign: "center" }}>
          <Typography variant="h3">{name}</Typography>
          <Typography>
            {sex === "0" ? male[language] : female[language]}
            {` | `}
            {age}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default DogCard
