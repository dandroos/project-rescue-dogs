const {
  SET_IS_MOBILE,
  SET_SHOW_MOBILE_NAV,
  SET_FONTS_LOADED,
  SET_AT_TOP,
  SET_SHOW_GALLERY,
  SET_SELECTED_IMAGE,
  SET_LANGUAGE,
  SET_LOCATION_ID,
  SET_DISABLE_PROMPT,
} = require("./types")

const initialState = {
  locationId: "",
  language: null,
  isMobile: false,
  atTop: true,
  showMobileNav: false,
  fontsLoaded: false,
  showGallery: false,
  selectedImage: null,
  disablePrompt: false,
}

const reducer = (state = initialState, { type, payload }) => {
  const newState = Object.assign({}, state)

  switch (type) {
    case SET_LOCATION_ID:
      newState.locationId = payload
      break
    case SET_IS_MOBILE:
      newState.isMobile = payload
      break
    case SET_AT_TOP:
      newState.atTop = payload
      break
    case SET_SHOW_MOBILE_NAV:
      newState.showMobileNav = payload
      break
    case SET_FONTS_LOADED:
      newState.fontsLoaded = payload
      break
    case SET_SHOW_GALLERY:
      newState.showGallery = payload
      break
    case SET_SELECTED_IMAGE:
      newState.selectedImage = payload
      break
    case SET_LANGUAGE:
      newState.language = payload
      break
    case SET_DISABLE_PROMPT:
      newState.disablePrompt = payload
      break
    default:
      break
  }

  return newState
}

export default reducer
