import React from "react"
import { Grid, Button, Typography } from "@mui/material"
import { Disqus, CommentCount } from "gatsby-plugin-disqus"
import { useStaticQuery, graphql } from "gatsby"
import { Comment } from "@mitch528/mdi-material-ui"

const Comments = ({ config, language }) => {
  const [showComments, setShowComments] = React.useState(false)
  const { show_comments, hide_comments, third_party_ads } =
    useStaticQuery(graphql`
      {
        dictionary: file(
          sourceInstanceName: { eq: "language" }
          name: { eq: "dictionary" }
        ) {
          childMarkdownRemark {
            frontmatter {
              show_comments {
                en
                es
              }
              hide_comments {
                en
                es
              }
              third_party_ads {
                en
                es
              }
            }
          }
        }
      }
    `).dictionary.childMarkdownRemark.frontmatter
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sx={{ textAlign: "center" }}>
        <Button
          onClick={() => setShowComments(!showComments)}
          startIcon={<Comment />}
        >
          {showComments ? hide_comments[language] : show_comments[language]}

          <Typography variant="caption" sx={{ ml: 1 }}>
            (<CommentCount config={config}>0</CommentCount>)
          </Typography>
        </Button>
        <Typography variant="caption" display="block">
          {third_party_ads[language]}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        {showComments && <Disqus config={config} />}
      </Grid>
    </Grid>
  )
}

export default Comments
