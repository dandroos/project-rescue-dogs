import MuiLink from "@mui/material/Link"
import { Link as GatsbyLink } from "gatsby"
import * as React from "react"

export const Link = React.forwardRef(function Link(props, ref) {
  return <MuiLink component={GatsbyLink} ref={ref} {...props} />
})
