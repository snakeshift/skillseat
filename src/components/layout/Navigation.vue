<template>
  <div class="navigation"></div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'Navigation',
  setup() {
    return {}
  }
})
</script>

<style scoped lang="scss">
.navigation {
  display: flex;
  background: #2f3243;
  width: 100%;
  height: 50px;
}
</style>
