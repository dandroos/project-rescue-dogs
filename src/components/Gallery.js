import { ChevronLeft, ChevronRight, Close } from "@mitch528/mdi-material-ui"
import { Portal } from "@mui/core"
import { useSwipeable } from "react-swipeable"
import { Dialog, Fab, useTheme } from "@mui/material"
import { Box } from "@mui/system"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import React from "react"
import { connect } from "react-redux"
import { setShowGallery, setSelectedImage } from "../redux/actions"
import Thumbnails from "./Thumbnails"

const DogGallery = ({ dispatch, selectedImage, isOpen, isMobile, images }) => {
  const handleClose = () => {
    dispatch(setShowGallery(false))
  }

  const handleChange = (adj) => {
    switch (adj) {
      case -1:
        if (indexRef.current !== 0) {
          dispatch(setSelectedImage(indexRef.current - 1))
        } else {
          dispatch(setSelectedImage(images.length - 1))
        }
        break
      case 1:
        if (indexRef.current !== images.length - 1) {
          dispatch(setSelectedImage(indexRef.current + 1))
        } else {
          dispatch(setSelectedImage(0))
        }
        break
      default:
        break
    }
  }

  const indexRef = React.useRef(0)

  React.useEffect(() => {
    indexRef.current = selectedImage
  }, [selectedImage])

  React.useEffect(() => {
    dispatch(setSelectedImage(0))
    //eslint-disable-next-line
  }, [isOpen])

  const handleKeyDown = (e) => {
    switch (e.key) {
      case "ArrowLeft":
        handleChange(-1)
        break
      case "ArrowRight":
        handleChange(1)
        break
      default:
        break
    }
  }
  React.useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
    //eslint-disable-next-line
  }, [])
  const theme = useTheme()

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleChange(1),
    onSwipedRight: () => handleChange(-1),
  })

  return (
    <Portal>
      <Dialog
        open={isOpen}
        fullScreen
        PaperProps={{ sx: { background: theme.palette.common.black } }}
        onClose={handleClose}
      >
        <Box
          {...swipeHandlers}
          sx={{
            height: "100vh",
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Fab
            onClick={handleClose}
            color="primary"
            size="medium"
            sx={{ position: "fixed", top: 15, right: 15, zIndex: 2000 }}
          >
            <Close />
          </Fab>
          <Fab
            onClick={() => handleChange(-1)}
            size={isMobile ? "small" : "large"}
            sx={{
              background: `${theme.palette.common.white}99`,
              position: "fixed",
              zIndex: 1000,
              left: isMobile ? 5 : 15,
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            <ChevronLeft />
          </Fab>
          <Fab
            onClick={() => handleChange(1)}
            size={isMobile ? "small" : "large"}
            sx={{
              background: `${theme.palette.common.white}99`,
              position: "fixed",
              zIndex: 1000,
              right: isMobile ? 5 : 15,
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            <ChevronRight />
          </Fab>
          {selectedImage !== null && (
            <GatsbyImage
              image={getImage(images[selectedImage].image)}
              alt=""
              style={{
                maxHeight: "100vh",
              }}
              imgStyle={{ objectFit: "contain" }}
            />
          )}
          <Thumbnails images={images} />
        </Box>
      </Dialog>
    </Portal>
  )
}

const mapStateToProps = (state) => ({
  isOpen: state.showGallery,
  isMobile: state.isMobile,
  selectedImage: state.selectedImage,
})

export default connect(mapStateToProps)(DogGallery)
