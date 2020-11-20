<template>
  <div class="top"></div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import Header from '@/components/layout/Header.vue'

export default defineComponent({
  name: 'Top',
  components: {
    Header
  },
  setup() {
    const pageTitle = ref('猫グッズ')
    const subTitle = ref('オススメの猫用品が探せます')
    return {
      pageTitle,
      subTitle
    }
  }
})
</script>
