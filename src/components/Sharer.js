import { Facebook, Gmail, Twitter, Whatsapp } from "@mitch528/mdi-material-ui"
import { IconButton, Tooltip } from "@mui/material"
import { Box } from "@mui/system"
import React from "react"
import { graphql, useStaticQuery } from "gatsby"

const Sharer = ({ align = "left", language, title }) => {
  const siteTitle = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
        }
      }
    }
  `).site.siteMetadata.title

  const ShareButton = ({ href, platform, color, Icon }) => (
    <Tooltip title={platform}>
      <IconButton href={href} target="_blank" color={color}>
        <Icon />
      </IconButton>
    </Tooltip>
  )

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: align,
      }}
    >
      <ShareButton
        href={`https://www.facebook.com/sharer.php?u=${window.location.href}`}
        platform="Facebook"
        color="facebook"
        Icon={Facebook}
      />
      <ShareButton
        href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
          `${window.location.href} ${title} - ${siteTitle}`
        )}`}
        platform="WhatsApp"
        color="whatsapp"
        Icon={Whatsapp}
      />
      <ShareButton
        href={`https://twitter.com/intent/tweet?url=${window.location.href}`}
        platform="Twitter"
        color="twitter"
        Icon={Twitter}
      />
      <ShareButton
        href={`mailto:?subject=${encodeURIComponent(
          `${title} - ${siteTitle}`
        )}&body=${window.location.href}`}
        platform="Email"
        color="google"
        Icon={Gmail}
      />
    </Box>
  )
}

export default Sharer
