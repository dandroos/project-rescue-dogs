import { Container, Toolbar, Typography } from "@mui/material"
import { connect } from "react-redux"
import { Box } from "@mui/system"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import React from "react"
import Seo from "./seo"
import Footer from "./Footer"

const PageWrapper = ({ isMobile, title = "", children, img, language, og }) => {
  if (img) {
    img = getImage(img)
  }
  return (
    <>
      <Seo title={title} language={language} ogImage={og ? og : undefined} />
      <Toolbar />
      {img && (
        <Container
          maxWidth={isMobile ? false : "md"}
          sx={{ mt: isMobile ? 0 : 3 }}
          disableGutters={isMobile}
        >
          <GatsbyImage image={img} alt={title} />
        </Container>
      )}
      <Box py={4}>
        <Container>
          <Typography
            variant={isMobile ? "h2" : "h1"}
            variantMapping={{ h1: "h2" }}
          >
            {title}
          </Typography>
          {children}
        </Container>
      </Box>
      <Footer />
    </>
  )
}

const mapStateToProps = (state) => ({
  isMobile: state.isMobile,
})

export default connect(mapStateToProps)(PageWrapper)
