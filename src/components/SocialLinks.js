import React from "react"
import { IconButton } from "@mui/material"
import { useStaticQuery, graphql } from "gatsby"
import useNav from "../hooks/useNav"

const SocialLinks = ({ centered = true }) => {
  const { social } = useStaticQuery(graphql`
    {
      social: file(
        sourceInstanceName: { eq: "contact_details" }
        name: { eq: "email_and_social" }
      ) {
        childMarkdownRemark {
          frontmatter {
            facebook_id
            instagram_id
          }
        }
      }
    }
  `)

  const { external } = useNav()

  const SocialLink = ({ href, Icon, end }) => (
    <IconButton
      color="inherit"
      href={href}
      target="_blank"
      edge={end ? "end" : undefined}
    >
      <Icon />
    </IconButton>
  )

  return (
    <>
      {external.map(({ Icon, baseUrl, graphqlQuery }, ind) => (
        <SocialLink
          key={ind}
          color="inherit"
          href={baseUrl + social.childMarkdownRemark.frontmatter[graphqlQuery]}
          Icon={Icon}
          end={!centered && ind === external.length - 1}
        />
      ))}
    </>
  )
}

export default SocialLinks
