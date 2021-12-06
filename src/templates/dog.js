import { ImageAlbum } from "@mitch528/mdi-material-ui"
import { Button, CardActionArea, Grid, Typography } from "@mui/material"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import React from "react"
import ReactMarkdown from "react-markdown"
import { connect } from "react-redux"
import Gallery from "../components/Gallery"
import PageWrapper from "../components/PageWrapper"
import Sharer from "../components/Sharer"
import Summary from "../components/Summary"
import { setLanguage, setLocationId, setShowGallery } from "../redux/actions"
import getDogData from "../util/getDogData"

const Dog = ({ pageContext, dispatch, data, language }) => {
  React.useEffect(() => {
    dispatch(setLanguage(pageContext.language))
    dispatch(
      setLocationId({
        id: "the-dogs",
        dog: data.main.fields.slug,
      })
    )
    //eslint-disable-next-line
  }, [])

  const { main, thumbnails, og, profile } = data
  const dictionary = data.dictionary.childMarkdownRemark.frontmatter
  const dog = getDogData({
    dog: main,
    language: pageContext.language,
  })

  const images = main.frontmatter.dog_images.map((i) => {
    return {
      id: i.id,
      image: i,
      thumb: thumbnails.frontmatter.dog_images.filter((t) => {
        return i.id === t.id
      })[0],
    }
  })

  const handleOpenGallery = () => {
    dispatch(setShowGallery(true))
  }

  return (
    <>
      <Gallery images={images} />
      <PageWrapper title={dog.name} og={getImage(og).images.fallback.src}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
            <Summary {...dog} />
          </Grid>
          <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
            <>
              <CardActionArea>
                <GatsbyImage
                  alt="Dog"
                  image={getImage(profile)}
                  onClick={handleOpenGallery}
                />
              </CardActionArea>
              <Button
                fullWidth
                endIcon={<ImageAlbum />}
                sx={{ mt: 1 }}
                onClick={handleOpenGallery}
              >
                {dictionary.view_photos[language] + ` (${images.length})`}
              </Button>
            </>
          </Grid>
          <Grid item xs={12} order={3}>
            <Typography variant="h6" align="center">
              {dictionary.share[language]}
            </Typography>
            <Sharer align="center" />
          </Grid>
          <Grid item xs={12} order={4}>
            <Typography variant="h5">
              {dictionary.description[language]}
            </Typography>
            <ReactMarkdown
              includeElementIndex
              components={{
                p: ({ node, ...props }) => {
                  const { value } = node.children[0]
                  return (
                    <Typography
                      variant={props.index === 0 ? "lead" : undefined}
                      paragraph
                    >
                      {value}
                    </Typography>
                  )
                },
              }}
            >
              {dog.description}
            </ReactMarkdown>
          </Grid>
        </Grid>
      </PageWrapper>
    </>
  )
}

export default connect(({ isMobile, language }) => ({
  isMobile,
  language,
}))(Dog)

export const pageQuery = graphql`
  query ($id: String!, $profile: String!) {
    dictionary: file(
      sourceInstanceName: { eq: "language" }
      name: { eq: "dictionary" }
    ) {
      childMarkdownRemark {
        frontmatter {
          share {
            en
            es
          }
          view_photos {
            es
            en
          }
          description {
            en
            es
          }
        }
      }
    }
    main: markdownRemark(id: { eq: $id }) {
      fields {
        slug
      }
      frontmatter {
        dog_breed {
          en
          es
        }
        dog_date_entered
        dog_date_of_birth
        dog_description {
          en
          es
        }
        dog_images {
          id
          childImageSharp {
            gatsbyImageData(quality: 100, transformOptions: { fit: CONTAIN })
          }
        }
        dog_name
        dog_ppp
        dog_sex
        dog_sociability {
          cats
          children
          dogs
        }
      }
    }
    profile: imageSharp(id: { eq: $profile }) {
      gatsbyImageData(aspectRatio: 0.8, transformOptions: { cropFocus: CENTER })
    }
    thumbnails: markdownRemark(id: { eq: $id }) {
      frontmatter {
        dog_images {
          id
          childImageSharp {
            gatsbyImageData(height: 40, width: 40)
          }
        }
      }
    }
    og: imageSharp(id: { eq: $profile }) {
      gatsbyImageData(
        height: 627
        width: 1200
        layout: FIXED
        transformOptions: { cropFocus: CENTER }
      )
    }
  }
`
