import * as React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider } from "@mui/material/styles"
import theme from "../../src/theme"
import { fonts } from "../../style"
import FontFaceObserver from "fontfaceobserver"
import { connect } from "react-redux"
import { setAtTop, setFontsLoaded } from "../../src/redux/actions"
import { Box } from "@mui/system"
import { CircularProgress } from "@mui/material"

function TopLayout({ children, dispatch, fontsLoaded }) {
  const loadFonts = () => {
    const hFont = new FontFaceObserver(fonts.heading.family)
    const bFont = new FontFaceObserver(fonts.body.family)
    Promise.all([hFont.load(), bFont.load()]).then(() => {
      dispatch(setFontsLoaded(true))
    }, loadFonts)
  }

  React.useEffect(() => {
    loadFonts()
    document.addEventListener("scroll", () => {
      dispatch(setAtTop(window.scrollY === 0))
    })
    //eslint-disable-next-line
  }, [])
  return (
    <React.Fragment>
      <Helmet>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link
          href={`https://fonts.googleapis.com/css2?family=${fonts.heading.family.replaceAll(
            " ",
            "+"
          )}${
            fonts.heading.weight && `:wght@${fonts.heading.weight}`
          }&family=${fonts.body.family.replaceAll(" ", "+")}${
            fonts.body.weight && `:wght@${fonts.body.weight}`
          }&display=swap`}
          rel="stylesheet"
        />
      </Helmet>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {fontsLoaded ? (
          <>{children}</>
        ) : (
          <Box
            height="100vh"
            width="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <CircularProgress size={80} />
          </Box>
        )}
      </ThemeProvider>
    </React.Fragment>
  )
}

TopLayout.propTypes = {
  children: PropTypes.node,
}

const mapStateToProps = (state) => ({
  fontsLoaded: state.fontsLoaded,
})

export default connect(mapStateToProps)(TopLayout)
