import { Grid, Typography } from "@mui/material"
import { graphql, useStaticQuery } from "gatsby"
import { getImage } from "gatsby-plugin-image"
import React from "react"
import ReactMarkdown from "react-markdown"
import { connect } from "react-redux"
import DogCard from "../components/DogCard"
import { Link } from "../components/Link"
import PageWrapper from "../components/PageWrapper"
import useNav from "../hooks/useNav"
import { setLanguage, setLocationId } from "../redux/actions"
import getDogAge from "../util/getDogAge"

const TheDogs = ({ dispatch, pageContext, currLang }) => {
  const { language } = pageContext

  React.useEffect(() => {
    dispatch(setLocationId({ id: "the-dogs" }))
    if (currLang !== language) {
      dispatch(setLanguage(language))
    }
    //eslint-disable-next-line
  }, [])

  const { dogsQuery, staticContent } = useStaticQuery(graphql`
    {
      dogsQuery: allFile(
        filter: { sourceInstanceName: { eq: "dogs" }, extension: { eq: "md" } }
      ) {
        nodes {
          childMarkdownRemark {
            fields {
              slug
            }
            frontmatter {
              dog_date_of_birth
              dog_images {
                childImageSharp {
                  gatsbyImageData(
                    aspectRatio: 1
                    transformOptions: { cropFocus: CENTER }
                  )
                }
              }
              dog_name
              dog_sex
            }
          }
        }
      }
      staticContent: file(
        sourceInstanceName: { eq: "static_pages" }
        name: { eq: "the_dogs" }
      ) {
        childMarkdownRemark {
          frontmatter {
            dogs_intro_text {
              en
              es
            }
          }
        }
      }
    }
  `)
  const dogData = dogsQuery.nodes
  const { internal } = useNav()
  const dogs = dogData.map(({ childMarkdownRemark }) => ({
    name: childMarkdownRemark.frontmatter.dog_name,
    sex: childMarkdownRemark.frontmatter.dog_sex,
    image: getImage(childMarkdownRemark.frontmatter.dog_images[0]),
    age: getDogAge(childMarkdownRemark.frontmatter.dog_date_of_birth, language),
    slug: `/${language}${
      internal.filter((i) => i.id === "the-dogs")[0].url[language]
    }${childMarkdownRemark.fields.slug}`,
  }))

  const title = useNav().internal.filter((i) => i.id === "the-dogs")[0].label[
    language
  ]

  return (
    <PageWrapper title={title}>
      <ReactMarkdown
        includeElementIndex
        children={
          staticContent.childMarkdownRemark.frontmatter.dogs_intro_text[
            language
          ]
        }
        components={{
          p: ({ node, ...props }, ind) => {
            return (
              <Typography
                variant={props.index === 0 ? "lead" : undefined}
                paragraph
              >
                {props.children}
              </Typography>
            )
          },
          a: ({ ...props }) => <Link href={props.href}>{props.children}</Link>,
        }}
      />
      <Grid container spacing={2}>
        {dogs.map((dog, ind) => (
          <Grid item xs={12} md={6} key={ind}>
            <DogCard language={language} {...dog} />
          </Grid>
        ))}
      </Grid>
    </PageWrapper>
  )
}

export default connect((state) => ({
  currLang: state.language,
}))(TheDogs)
