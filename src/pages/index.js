import { Grid, IconButton } from "@mui/material"
import { Box } from "@mui/system"
import detectBrowserLanguage from "detect-browser-language"
import { graphql, Link, navigate, useStaticQuery } from "gatsby"
import React from "react"
import ReactCountryFlag from "react-country-flag"
import { connect } from "react-redux"

import { setDisablePrompt, setLanguage } from "../redux/actions"

const Index = ({ dispatch, isMobile }) => {
  const [showFlags, setShowFlags] = React.useState(false)
  const { supportedLanguages } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          supportedLanguages
        }
      }
    }
  `).site.siteMetadata
  React.useEffect(() => {
    const browserLang = detectBrowserLanguage().substr(0, 2)
    const storedLang = localStorage.getItem("fdr_def_lang")
    if (storedLang) {
      dispatch(setLanguage(storedLang))
      navigate(`/${storedLang}/`)
    } else {
      if (supportedLanguages.includes(browserLang)) {
        dispatch(setLanguage(browserLang))
        navigate(`/${browserLang}/`)
      } else {
        setShowFlags(true)
      }
    }
    //eslint-disable-next-line
  }, [])
  const LanguageButton = ({ lang, flagCode }) => (
    <Grid item xs={12} md={6} sx={{ textAlign: "center" }}>
      <IconButton
        component={Link}
        to={`/${lang}`}
        onClick={() => dispatch(setDisablePrompt(true))}
      >
        <ReactCountryFlag
          style={{
            height: isMobile ? "6rem" : "12rem",
            width: isMobile ? "6rem" : "12rem",
          }}
          svg
          countryCode={flagCode}
        />
      </IconButton>
    </Grid>
  )
  return (
    showFlags && (
      <Box
        sx={{
          height: "100vh",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid container spacing={2}>
          <LanguageButton lang="en" flagCode="GB" />
          <LanguageButton lang="es" flagCode="ES" />
        </Grid>
      </Box>
    )
  )
}

const mapStateToProps = (state) => ({
  isMobile: state.isMobile,
})

export default connect(mapStateToProps)(Index)
