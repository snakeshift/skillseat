<template>
  <v-app>
    <div class="d-flex flex-column h100p">
      <Header />
      <Navigation />
      <div class="w100p flex-grow-1">
        <transition
          enter-active-class="animate__animated animate__fadeIn"
          leave-active-class="animate__animated animate__fadeOut"
        >
          <router-view />
        </transition>
      </div>
    </div>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import Header from '@/components/layout/Header.vue'
import Navigation from '@/components/layout/Navigation.vue'

export default defineComponent({
  name: 'App',
  components: {
    Header,
    Navigation
  },
  setup() {
    return {}
  }
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Kosugi+Maru&display=swap');
</style>

<style lang="scss">
@import '~animate.css/animate.min.css';
@import './assets/scss/index.scss';
.v-application--wrap {
  background: #292b39;
}
.v-application {
  font-family: 'Kosugi Maru', sans-serif !important;
}
</style>
