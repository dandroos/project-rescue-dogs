import { Container, Typography } from "@mui/material"
import React from "react"

import Seo from "../components/seo"

const NotFound = () => {
  return (
    <>
      <Seo title="Page Not Found" />
      <Container>
        <Typography variant="h1" variantMapping={{ h1: "h2" }} gutterBottom>
          Hmm...
        </Typography>
        <Typography>
          It seems like that page doesn't exist. Please check the address and
          try again!
        </Typography>
      </Container>
    </>
  )
}

export default NotFound
