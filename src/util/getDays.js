const day = ({ day, language }) => {
  switch (day) {
    case "monday":
      switch (language) {
        case "en":
          return "Monday"
        case "es":
          return "Lunes"
        default:
          return "Monday"
      }
    case "tuesday":
      switch (language) {
        case "en":
          return "Tuesday"
        case "es":
          return "Martes"
        default:
          return "Tuesday"
      }
    case "wednesday":
      switch (language) {
        case "en":
          return "Wednesday"
        case "es":
          return "Miercoles"
        default:
          return "Wednesday"
      }
    case "thursday":
      switch (language) {
        case "en":
          return "Thursday"
        case "es":
          return "Jueves"
        default:
          return "Thursday"
      }
    case "friday":
      switch (language) {
        case "en":
          return "Friday"
        case "es":
          return "Viernes"
        default:
          return "Friday"
      }
    case "saturday":
      switch (language) {
        case "en":
          return "Saturday"
        case "es":
          return "Sábado"
        default:
          return "Saturday"
      }
    case "sunday":
      switch (language) {
        case "en":
          return "Sunday"
        case "es":
          return "Domingo"
        default:
          return "Sunday"
      }
    case "holidays":
      switch (language) {
        case "en":
          return "Public holidays"
        case "es":
          return "Festivos"
        default:
          return "Public holidays"
      }
    default:
      return ""
  }
}

export default day
