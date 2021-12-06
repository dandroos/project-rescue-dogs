import {
  ListItemIcon,
  ListItemText,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material"
import { navigate } from "gatsby"
import React from "react"
import ReactCountryFlag from "react-country-flag"
import { connect } from "react-redux"
import useNav from "../hooks/useNav"
import { setDisablePrompt, setLanguage } from "../redux/actions"

const LanguageSelector = ({ dispatch, isMobile, language, locationId }) => {
  const getCountryCode = () => {
    switch (language) {
      case "en":
        return "GB"
      case "es":
        return "ES"
      default:
        return "GB"
    }
  }

  const [countryCode, setCountryCode] = React.useState("GB")

  React.useEffect(() => {
    setCountryCode(getCountryCode(language))
    //eslint-disable-next-line
  }, [language])

  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const changeLanguage = (l) => {
    dispatch(setDisablePrompt(true))
    dispatch(setLanguage(l))
    handleClose()
    localStorage.setItem("fdr_def_lang", l)
    redirect(l)
  }

  const { internal } = useNav()

  const redirect = (lang) => {
    let redirectUrl
    if (locationId.staticPage) {
      redirectUrl = internal
        .filter((i) => i.id === "how-to")[0]
        .options.filter((j) => j.id === locationId.id)[0].url[lang]
    } else {
      redirectUrl = `${
        internal.filter((i) => {
          return i.id === locationId.id
        })[0].url[lang]
      }${locationId.id !== `home` ? "/" : ""}`
    }
    navigate(`/${lang}${redirectUrl}${locationId.dog ? locationId.dog : ""}`)
  }
  return (
    <>
      <IconButton edge={isMobile ? false : "end"} onClick={handleClick}>
        <ReactCountryFlag svg countryCode={countryCode} />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            changeLanguage("en")
          }}
        >
          <ListItemIcon>
            <ReactCountryFlag svg countryCode="GB" />
          </ListItemIcon>
          <ListItemText primary="English" />
        </MenuItem>
        <MenuItem
          onClick={() => {
            changeLanguage("es")
          }}
        >
          <ListItemIcon>
            <ReactCountryFlag svg countryCode="ES" />
          </ListItemIcon>
          <ListItemText primary="Español" />
        </MenuItem>
      </Menu>
    </>
  )
}

const mapStateToProps = (state) => ({
  language: state.language,
  locationId: state.locationId,
  isMobile: state.isMobile,
})

export default connect(mapStateToProps)(LanguageSelector)
