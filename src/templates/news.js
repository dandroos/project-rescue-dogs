import { BookOpen } from "@mitch528/mdi-material-ui"
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Pagination,
  Typography,
} from "@mui/material"
import { graphql, navigate } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import moment from "moment"
import React from "react"
import { connect } from "react-redux"

import { Link } from "../components/Link"
import PageWrapper from "../components/PageWrapper"
import useNav from "../hooks/useNav"
import { setLanguage, setLocationId } from "../redux/actions"

import "moment/locale/en-gb"
import "moment/locale/es"

const News = ({ dispatch, pageContext, data, currLang }) => {
  const { numPages, currentPage, language } = pageContext

  moment.locale(
    (() => {
      switch (language) {
        case "en":
          return "en-gb"
        case "es":
          return "es"
        default:
          return "en-gb"
      }
    })()
  )

  const { internal } = useNav()
  React.useEffect(() => {
    dispatch(setLocationId({ id: "news" }))
    if (currLang !== language) {
      dispatch(setLanguage(language))
    }
    //eslint-disable-next-line
  }, [])

  const articles = data.pagination.nodes.map((article) => {
    return {
      date: article.childMarkdownRemark.frontmatter.date,
      title: article.childMarkdownRemark.frontmatter.title,
      img: getImage(article.childMarkdownRemark.frontmatter.featured_image),
      excerpt: article.childMarkdownRemark.excerpt,
      slug: `/${language}${
        internal.filter((i) => i.id === "news")[0].url[language]
      }${article.childMarkdownRemark.fields.slug}`,
    }
  })

  const dictionary = data.dictionary.childMarkdownRemark.frontmatter

  const Article = ({ title, img, slug, date, excerpt }) => (
    <Card elevation={0} square variant="outlined">
      <CardActionArea component={Link} to={slug}>
        <CardMedia>
          {" "}
          <GatsbyImage alt={title} image={img} />{" "}
        </CardMedia>
        <CardContent sx={{ px: 2 }}>
          <Typography variant="h3" variantMapping={{ h4: "h3" }}>
            {title}
          </Typography>
          <Typography variant="overline">
            {moment(date).format("LL")}
          </Typography>
          <Typography>{excerpt}</Typography>
        </CardContent>
        <CardActions>
          <Button fullWidth startIcon={<BookOpen />}>
            {dictionary.read_more[language]}
          </Button>
        </CardActions>
      </CardActionArea>
    </Card>
  )
  return (
    <PageWrapper
      title={internal.filter((i) => i.id === "news")[0].label[language]}
    >
      <Grid container spacing={2}>
        {articles.map(({ title, img, date, excerpt, slug }, ind) => (
          <Grid item xs={12} key={ind}>
            <Article
              title={title}
              img={img}
              date={date}
              excerpt={excerpt}
              slug={slug}
            />
          </Grid>
        ))}
      </Grid>
      <Pagination
        sx={{ mt: 3 }}
        count={numPages}
        page={currentPage}
        onChange={(_, v) => {
          if (v === 1) {
            navigate(`/${language}/news`)
          } else {
            navigate(`/${language}/news/${v}`)
          }
        }}
        style={{
          marginBottom: ".35rem",
          display: "flex",
          justifyContent: "center",
        }}
      />
    </PageWrapper>
  )
}

const mapStateToProps = (state) => ({
  isMobile: state.isMobile,
  currLang: state.language,
})

export default connect(mapStateToProps)(News)

export const homeQuery = graphql`
  query homeQuery($skip: Int!, $limit: Int!, $sourceInstance: String!) {
    dictionary: file(
      sourceInstanceName: { eq: "language" }
      name: { eq: "dictionary" }
    ) {
      childMarkdownRemark {
        frontmatter {
          read_more {
            en
            es
          }
        }
      }
    }
    pagination: allFile(
      limit: $limit
      skip: $skip
      filter: {
        sourceInstanceName: { eq: $sourceInstance }
        extension: { eq: "md" }
      }
      sort: { fields: childMarkdownRemark___frontmatter___date, order: DESC }
    ) {
      nodes {
        childMarkdownRemark {
          fields {
            slug
          }
          id
          frontmatter {
            title
            featured_image {
              childImageSharp {
                gatsbyImageData(aspectRatio: 1.85)
              }
            }
            date
          }
          html
          excerpt(pruneLength: 100)
        }
      }
    }
  }
`
