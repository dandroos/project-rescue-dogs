const { Facebook, Instagram } = require("@mitch528/mdi-material-ui")

module.exports = () => {
  return {
    internal: [
      {
        id: "home",
        label: false,
        url: {
          en: "/",
          es: "/",
        },
      },
      {
        id: "news",
        label: {
          en: "News",
          es: "Noticias",
        },
        url: {
          en: "/news",
          es: "/noticias",
        },
      },
      {
        id: "the-dogs",
        label: {
          en: "The Dogs",
          es: "Los Perros",
        },
        url: {
          en: "/the_dogs",
          es: "/los_perros",
        },
      },
      {
        dropdown: true,
        id: "how-to",
        label: {
          en: "How to...",
          es: "Cómo...",
        },
        options: [
          {
            id: "adopt",
            label: {
              en: "Adopt",
              es: "Adoptar",
            },
            url: {
              en: "/adopt",
              es: "/adoptar",
            },
          },
          {
            id: "foster",
            label: {
              en: "Foster",
              es: "Coger",
            },
            url: {
              en: "/foster",
              es: "/coger",
            },
          },
          {
            id: "donate",
            label: {
              en: "Donate",
              es: "Donar",
            },
            url: {
              en: "/donate",
              es: "/donar",
            },
          },
          {
            id: "volunteer",
            label: {
              en: "Volunteer",
              es: "Ser Voluntario",
            },
            url: {
              en: "/volunteer",
              es: "/ser_voluntario",
            },
          },
        ],
      },
      {
        id: "about",
        label: {
          en: "About us",
          es: "Sobre nosotros",
        },
        url: {
          en: "/about_us",
          es: "/sobre_nosotros",
        },
      },
      {
        id: "contact",
        label: {
          en: "Contact us",
          es: "Contáctenos",
        },
        url: {
          en: "/contact_us",
          es: "/contactenos",
        },
      },
    ],
    external: [
      {
        Icon: Facebook,
        baseUrl: "https://facebook.com/",
        graphqlQuery: "facebook_id",
      },
      {
        Icon: Instagram,
        baseUrl: "https://instagram.com/",
        graphqlQuery: "instagram_id",
      },
    ],
  }
}
