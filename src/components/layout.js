import { useMediaQuery, useTheme } from "@mui/material"
import React, { useEffect } from "react"
import { connect } from "react-redux"

import { setIsMobile } from "../redux/actions"
import LanguageRedirect from "./LanguageRedirect"
import Nav from "./Nav"

const Layout = ({ dispatch, children, location }) => {
  const isMobile = useMediaQuery(useTheme().breakpoints.down("md"))

  useEffect(() => {
    dispatch(setIsMobile(isMobile))
    //eslint-disable-next-line
  }, [isMobile])

  return (
    <>
      {location.pathname !== "/" && <LanguageRedirect />}
      {location.pathname !== "/" && <Nav />}
      {children}
    </>
  )
}

export default connect()(Layout)
