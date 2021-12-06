import moment from "moment"

const data = ({ dog, language }) => {
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
  return {
    name: dog.frontmatter.dog_name,
    dob: moment(dog.frontmatter.dog_date_of_birth).toNow(true),
    breed: dog.frontmatter.dog_breed[language],
    date_entered: moment(dog.frontmatter.dog_date_entered).fromNow(),
    description: dog.frontmatter.dog_description[language],
    ppp: (() => {
      switch (dog.frontmatter.dog_ppp) {
        case "0":
          switch (language) {
            case "en":
              return "No"
            case "es":
              return "No"
            default:
              return ""
          }
        case "1":
          switch (language) {
            case "en":
              return "Yes"
            case "es":
              return "Sí"
            default:
              return ""
          }
        default:
          return ""
      }
    })(),
    sex: (() => {
      switch (dog.frontmatter.dog_sex) {
        case "0":
          switch (language) {
            case "en":
              return "Male"
            case "es":
              return "Macho"
            default:
              return ""
          }
        case "1":
          switch (language) {
            case "en":
              return "Female"
            case "es":
              return "Hembra"
            default:
              return ""
          }
        default:
          return ""
      }
    })(),
    sociability: (() => {
      const o = (i) => {
        switch (i) {
          case "0":
            switch (language) {
              case "en":
                return "No"
              case "es":
                return "No"
              default:
                return ""
            }
          case "1":
            switch (language) {
              case "en":
                return "Yes"
              case "es":
                return "Sí"
              default:
                return ""
            }
          case "2":
            switch (language) {
              case "en":
                return "TBC"
              case "es":
                return "Por confirmar"
              default:
                return ""
            }
          default:
            return ""
        }
      }
      return {
        cats: o(dog.frontmatter.dog_sociability.cats),
        dogs: o(dog.frontmatter.dog_sociability.dogs),
        children: o(dog.frontmatter.dog_sociability.children),
      }
    })(),
  }
}

export default data
