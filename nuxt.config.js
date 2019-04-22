import pkg from './package'
import webpack from 'webpack'


export default {
  mode: 'universal',



  /*
  ** Headers of the page
  */
  head: {
    title: 'Cursos Online',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    script: [

    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }

    ]
  },

  "scripts": {
    "dev": "nuxt --hostname myhost --port 3333"
  },

  server: {
    port: 8585, // default: 3000
    host: '0.0.0.0', // default: localhost
  },


  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    "~/assets/css/main.css",
    "~/assets/css/font-awesome.css",

  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: 'http://192.168.0.100:8989/'
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    },

    plugins: [
      new webpack.ProvidePlugin({
        Cookie: 'js-cookie',

      })
    ]
  }
}
