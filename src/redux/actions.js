import {
  SET_AT_TOP,
  SET_FONTS_LOADED,
  SET_IS_MOBILE,
  SET_SHOW_MOBILE_NAV,
  SET_SHOW_GALLERY,
  SET_SELECTED_IMAGE,
  SET_LANGUAGE,
  SET_LOCATION_ID,
  SET_DISABLE_PROMPT,
} from "./types"

export const setIsMobile = (payload) => ({
  type: SET_IS_MOBILE,
  payload,
})

export const setAtTop = (payload) => ({
  type: SET_AT_TOP,
  payload,
})

export const setShowMobileNav = (payload) => ({
  type: SET_SHOW_MOBILE_NAV,
  payload,
})

export const setFontsLoaded = (payload) => ({
  type: SET_FONTS_LOADED,
  payload,
})

export const setShowGallery = (payload) => ({
  type: SET_SHOW_GALLERY,
  payload,
})

export const setSelectedImage = (payload) => ({
  type: SET_SELECTED_IMAGE,
  payload,
})

export const setLanguage = (payload) => ({
  type: SET_LANGUAGE,
  payload,
})

export const setLocationId = (payload) => ({
  type: SET_LOCATION_ID,
  payload,
})

export const setDisablePrompt = (payload) => ({
  type: SET_DISABLE_PROMPT,
  payload,
})
