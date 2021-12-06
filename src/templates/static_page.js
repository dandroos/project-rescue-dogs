import { Button, Link as MLink, Typography } from "@mui/material"
import { Link } from "../components/Link"
import { Box } from "@mui/system"
import { graphql } from "gatsby"
import React from "react"
import ReactMarkdown from "react-markdown"
import { connect } from "react-redux"
import PageWrapper from "../components/PageWrapper"
import useNav from "../hooks/useNav"
import { setLanguage, setLocationId } from "../redux/actions"
import { Phone } from "@mitch528/mdi-material-ui"
import PaypalButton from "../components/PaypalButton"

const Static_page = ({ data, pageContext, dispatch, isMobile }) => {
  React.useEffect(() => {
    dispatch(setLanguage(pageContext.language))
    if (pageContext.howTo) {
      dispatch(setLocationId({ staticPage: true, id: pageContext.location }))
    } else {
      dispatch(setLocationId({ id: pageContext.location }))
    }
    //eslint-disable-next-line
  }, [])

  const { internal } = useNav()

  return (
    <PageWrapper
      title={
        pageContext.howTo
          ? internal
              .filter((i) => i.id === "how-to")[0]
              .options.filter((j) => j.id === pageContext.location)[0].label[
              pageContext.language
            ]
          : internal.filter((i) => i.id === pageContext.location)[0].label[
              pageContext.language
            ]
      }
      img={
        isMobile
          ? data.mobileImg.frontmatter.main_image
          : data.main.frontmatter.main_image
      }
    >
      <ReactMarkdown
        includeElementIndex
        children={data.main.frontmatter.content[pageContext.language]}
        components={{
          p: ({ ...props }) => {
            if (props.children[0] === "{{paypal}}") {
              return <PaypalButton language={pageContext.language} />
            }
            return (
              <Typography
                variant={props.index === 0 ? "lead" : undefined}
                paragraph
              >
                {props.children}
              </Typography>
            )
          },
          a: ({ ...props }) => (
            <MLink href={props.href}>{props.children}</MLink>
          ),
        }}
      />

      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h6">
          {
            data.dictionary.childMarkdownRemark.frontmatter.for_more_info[
              pageContext.language
            ]
          }
        </Typography>
        <Button
          component={Link}
          to={`/${pageContext.language}${
            internal.filter((i) => i.id === "contact")[0].url[
              pageContext.language
            ]
          }
          `}
          endIcon={<Phone />}
        >
          {
            internal.filter((i) => i.id === "contact")[0].label[
              pageContext.language
            ]
          }
        </Button>
      </Box>
    </PageWrapper>
  )
}

export default connect((state) => ({ isMobile: state.isMobile }))(Static_page)

export const pageQuery = graphql`
  query ($id: String!) {
    main: markdownRemark(id: { eq: $id }) {
      frontmatter {
        main_image {
          childImageSharp {
            gatsbyImageData(aspectRatio: 1.35)
          }
        }
        content {
          en
          es
        }
      }
    }
    mobileImg: markdownRemark(id: { eq: $id }) {
      frontmatter {
        main_image {
          childImageSharp {
            gatsbyImageData(aspectRatio: 1.5)
          }
        }
      }
    }
    dictionary: file(
      sourceInstanceName: { eq: "language" }
      name: { eq: "dictionary" }
    ) {
      childMarkdownRemark {
        frontmatter {
          for_more_info {
            en
            es
          }
        }
      }
    }
  }
`
