import { ChevronDown, ChevronUp } from "@mitch528/mdi-material-ui"
import {
  Button,
  Menu,
  MenuItem,
  Collapse,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material"
import { Box } from "@mui/system"
import React from "react"
import { connect } from "react-redux"
import { setLocationId, setShowMobileNav } from "../redux/actions"
import { Link } from "./Link"

const Dropdown = ({ dispatch, mobile, label, options, language }) => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [collapse, setCollapse] = React.useState(false)

  const handleClose = () => {
    setAnchorEl(null)
  }

  const toggleCollapse = () => {
    setCollapse(!collapse)
  }
  return mobile ? (
    <>
      <ListItem
        button
        onClick={toggleCollapse}
        style={{ paddingBottom: 4, paddingTop: 4 }}
      >
        <Box
          style={{
            width: "55%",
            margin: "auto",
            display: "flex",
            alignItems: "center",
          }}
        >
          {collapse ? (
            <ChevronDown color="action" />
          ) : (
            <ChevronUp color="action" />
          )}
          <ListItemText
            primary={
              <>
                <Typography
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {label.toUpperCase()}
                </Typography>
              </>
            }
            disableTypography
          />
          {collapse ? (
            <ChevronDown color="action" />
          ) : (
            <ChevronUp color="action" />
          )}
        </Box>
      </ListItem>
      <Collapse in={!collapse}>
        <List component="div" dense disablePadding>
          {options.map(({ id, label, url }, ind) => (
            <ListItem
              key={ind}
              button
              component={Link}
              to={`/${language + url[language]}`}
              onClick={() => {
                dispatch(setShowMobileNav(false))
                dispatch(setLocationId(id))
              }}
            >
              <ListItemText
                primary={label[language]}
                primaryTypographyProps={{ align: "center" }}
              />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  ) : (
    <>
      <Button
        variant="text"
        color="inherit"
        style={{ marginRight: 20 }}
        endIcon={<ChevronDown />}
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        {label}
      </Button>
      <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={handleClose}>
        {options.map(({ id, label, url }, ind) => (
          <MenuItem
            onClick={handleClose}
            component={Link}
            to={`/${language + url[language]}`}
            key={ind}
          >
            {label[language]}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

const mapStateToProps = (state) => ({
  language: state.language,
})

export default connect(mapStateToProps)(Dropdown)
