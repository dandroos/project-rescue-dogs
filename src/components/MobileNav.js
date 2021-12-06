import {
  Dialog,
  Fab,
  List,
  ListItem,
  ListItemText,
  Portal,
  Slide,
} from "@mui/material"
import { Box } from "@mui/system"
import { StaticImage } from "gatsby-plugin-image"
import { Close } from "@mitch528/mdi-material-ui"
import React from "react"
import { connect } from "react-redux"

import useNav from "../hooks/useNav"
import { setShowMobileNav } from "../redux/actions"
import Dropdown from "./Dropdown"
import { Link } from "./Link"
import LanguageSelector from "./LanguageSelector"
import SocialLinks from "./SocialLinks"

const MobileNav = ({ dispatch, isOpen, language }) => {
  const navigation = useNav()

  const handleClose = () => {
    dispatch(setShowMobileNav(false))
  }

  return (
    <Portal>
      <Dialog
        fullScreen
        open={isOpen}
        onClose={handleClose}
        TransitionComponent={Slide}
      >
        <Fab
          onClick={handleClose}
          color="primary"
          style={{ position: "fixed", top: 20, right: 20 }}
        >
          <Close />
        </Fab>
        <Box
          display="flex"
          height="100vh"
          width="100%"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          sx={{ pb: 4 }}
        >
          <StaticImage
            src="../images/logo.png"
            alt="FDR logo"
            placeholder="none"
            width={125}
            quality={100}
          />
          <List style={{ width: "100%" }}>
            {navigation.internal.map(
              ({ label, url, dropdown, options }, ind) => {
                if (label) {
                  return dropdown ? (
                    <Dropdown
                      label={label[language]}
                      options={options}
                      mobile
                      key={ind}
                    />
                  ) : (
                    <ListItem
                      key={ind}
                      button
                      component={Link}
                      to={`/${language}${url[language]}`}
                      onClick={handleClose}
                      style={{ paddingTop: 4, paddingBottom: 4 }}
                    >
                      <ListItemText
                        primary={label[language].toUpperCase()}
                        primaryTypographyProps={{ align: "center" }}
                      />
                    </ListItem>
                  )
                }
                return null
              }
            )}
          </List>
          <Box mb={1}>
            <SocialLinks />
          </Box>
          <LanguageSelector />
        </Box>
      </Dialog>
    </Portal>
  )
}

const mapStateToProps = (state) => ({
  isOpen: state.showMobileNav,
  language: state.language,
})

export default connect(mapStateToProps)(MobileNav)
