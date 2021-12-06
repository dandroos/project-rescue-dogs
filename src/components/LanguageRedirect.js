import { Portal } from "@mui/core"
import {
  Dialog,
  DialogContent,
  Typography,
  FormControlLabel,
  Checkbox,
  DialogActions,
  Button,
} from "@mui/material"
import detectBrowserLanguage from "detect-browser-language"
import { navigate, graphql, useStaticQuery } from "gatsby"
import React from "react"
import { connect } from "react-redux"
import useNav from "../hooks/useNav"
import { setDisablePrompt, setLanguage } from "../redux/actions"

const LanguageRedirect = ({
  dispatch,
  language,
  locationId,
  disablePrompt,
}) => {
  const [showDialog, setShowDialog] = React.useState(false)
  const [checked, setChecked] = React.useState(false)
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
    if (
      !localStorage.getItem("fdr_ignore_lang_redirect") &&
      language &&
      !disablePrompt
    ) {
      const browserLang = detectBrowserLanguage().substr(0, 2)
      if (
        supportedLanguages.includes(browserLang) &&
        language !== browserLang &&
        !localStorage.getItem("fdr_def_lang")
      ) {
        setShowDialog(true)
      }
    }
    //eslint-disable-next-line
  }, [language])

  const handleClose = () => {
    setShowDialog(false)
  }

  const { internal } = useNav()

  const handleClick = (e) => {
    dispatch(setDisablePrompt(true))
    handleClose()
    if (checked) {
      localStorage.setItem("fdr_ignore_lang_redirect", "y")
    }
    switch (e.target.id) {
      case "yes":
        const browserLang = detectBrowserLanguage().substr(0, 2)
        dispatch(setLanguage(browserLang))
        let redirectUrl
        if (locationId.staticPage) {
          redirectUrl = internal
            .filter((i) => i.id === "how-to")[0]
            .options.filter((j) => j.id === locationId.id)[0].url[browserLang]
        } else {
          redirectUrl = `${
            internal.filter((i) => {
              return i.id === locationId.id
            })[0].url[browserLang]
          }${locationId !== `home` ? "/" : ""}`
        }
        navigate(
          `/${browserLang}${redirectUrl}${locationId.dog ? locationId.dog : ""}`
        )
        break
      case "no":
        // do more stuff
        break
      default:
        break
    }
  }

  return (
    <Portal>
      <Dialog open={showDialog} maxWidth="sm" fullWidth>
        <DialogContent>
          <Typography>
            Would you like to change the language to your browser default?
          </Typography>
        </DialogContent>
        <DialogActions>
          <FormControlLabel
            label={
              <Typography variant="caption">
                Don't show this again in future
              </Typography>
            }
            control={
              <Checkbox
                checked={checked}
                onChange={() => setChecked(!checked)}
              />
            }
            disableTypography
          />
          <Button id="yes" color="success" onClick={handleClick}>
            Yes
          </Button>
          <Button id="no" color="error" onClick={handleClick}>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </Portal>
  )
}

export default connect((state) => ({
  language: state.language,
  disablePrompt: state.disablePrompt,
  locationId: state.locationId,
}))(LanguageRedirect)
