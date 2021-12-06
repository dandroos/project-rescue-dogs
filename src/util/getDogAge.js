import moment from "moment"
import "moment/locale/en-gb"
import "moment/locale/es"

const getDogAge = (birthday, language) => {
  moment.locale(
    (() => {
      switch (language) {
        case "en":
          return "en-gb"
        case "es":
          return "es"
        default:
          return "en-gb"
      }
    })()
  )
  return moment(birthday).toNow(true)
}

export default getDogAge
