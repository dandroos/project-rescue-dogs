import React from "react"
import { Button } from "@mui/material"
import { InlineIcon } from "@iconify/react"
import PayPal from "@iconify/icons-simple-icons/paypal"
import { graphql, useStaticQuery } from "gatsby"

const PaypalButton = ({ language }) => {
  const { paypal_donate_button_text } = useStaticQuery(graphql`
    {
      file(sourceInstanceName: { eq: "static_pages" }, name: { eq: "donate" }) {
        childMarkdownRemark {
          frontmatter {
            paypal_donate_button_text {
              en
              es
            }
          }
        }
      }
    }
  `).file.childMarkdownRemark.frontmatter

  return (
    <form
      action="https://www.paypal.com/cgi-bin/webscr"
      method="post"
      target="_blank"
    >
      <input type="hidden" name="cmd" value="_donations" />
      <input
        type="hidden"
        name="business"
        value="info@fuerteventuradogrescue.org"
      />
      <input type="hidden" name="currency_code" value="EUR" />
      <Button
        variant="contained"
        type="submit"
        startIcon={<InlineIcon icon={PayPal} />}
        sx={{ mb: 4 }}
      >
        {paypal_donate_button_text[language]}
      </Button>
    </form>
  )
}

export default PaypalButton
