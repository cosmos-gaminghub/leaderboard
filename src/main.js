import Vue from 'vue'
import App from './App.vue'

import "@/assets/plugins/datatables/dataTables.bootstrap4.min.css"
import "@/assets/css/bootstrap.min.css"
import "@/assets/css/style.css"

import VueApollo from 'vue-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import VueRouter from 'vue-router'
import routers from './routes'

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import Bus from '@/plugins/bus'
Vue.use(Bus)

const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: 'https://neuron-dev.gamenet.one/graphql',
})

const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  }
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

Vue.use(VueApollo)
Vue.use(VueRouter)
Vue.use(Toast, {});

Vue.config.productionTip = false

const router = new VueRouter({
  mode: 'history',
  routes: routers,
})

new Vue({
  apolloProvider,
  router,
  render: h => h(App),
}).$mount('#app')
