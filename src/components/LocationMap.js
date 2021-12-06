import React from "react"

import {  MapContainer, Marker, TileLayer } from "react-leaflet"
import { Icon } from "leaflet"
import logoPin from "../images/logopin.png"
import { graphql, useStaticQuery } from "gatsby"
import { Paper } from "@mui/material"

export default function LocationMap() {
  const { latitude, longitude } = useStaticQuery(graphql`
    {
      file(
        sourceInstanceName: { eq: "contact_details" }
        name: { eq: "location" }
      ) {
        childMarkdownRemark {
          frontmatter {
            gps_coordinates {
              latitude
              longitude
            }
          }
        }
      }
    }
  `).file.childMarkdownRemark.frontmatter.gps_coordinates
  return typeof window !== "undefined" ? (
    <Paper elevation={3}>
      <MapContainer
        center={[latitude, longitude]}
        zoom={13}
        style={{
          height: "20rem",
          width: "100%",
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker
          position={[28.609654, -13.92936]}
          icon={
            new Icon({
              iconUrl: logoPin,
              iconAnchor: [20, 80],
            })
          }
        />
      </MapContainer>
    </Paper>
  ) : null
}
