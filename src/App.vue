<template>
  <div id="containerbar" class="container-fluid">
    <div class="rightbar">
      <Header/>
      <Breadcrumbar />
      <div class="contentbar">  
          <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Header from './layout/Header'
import Breadcrumbar from './layout/Breadcrumbar'

export default {
  name: 'App',
  components: {
    Header, 
    Breadcrumbar
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
