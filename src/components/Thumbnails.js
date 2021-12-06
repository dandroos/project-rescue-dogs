import React from "react"
import { useTheme, Box, Grid } from "@mui/material"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { connect } from "react-redux"
import { setSelectedImage } from "../redux/actions"

const Thumbnails = ({ dispatch, selectedImage, images }) => {
  const theme = useTheme()

  const Thumbnail = ({ image, ind }) => (
    <Grid item key={ind}>
      <GatsbyImage
        onClick={() => dispatch(setSelectedImage(ind))}
        alt=""
        image={getImage(image)}
        style={{
          cursor: "pointer",
          border:
            selectedImage === ind
              ? `4px solid ${theme.palette.primary.main}`
              : `4px solid transparent`,
        }}
      />
    </Grid>
  )
  return (
    <Box
      sx={{
        background: `${theme.palette.common.black}bb`,
        position: "absolute",
        py: 1,
        bottom: 0,
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Grid container justifyContent="center" alignItems="center">
        {images.map(({ thumb }, ind) => (
          <Thumbnail image={thumb} ind={ind} key={ind} />
        ))}
      </Grid>
    </Box>
  )
}

const mapStateToProps = (state) => ({
  selectedImage: state.selectedImage,
})

export default connect(mapStateToProps)(Thumbnails)
