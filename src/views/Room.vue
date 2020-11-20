<template>
  <div class="room">
    <v-row class="flex-column">
      <Theater :company="company" />
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@vue/composition-api'
import Theater from '@/components/room/Theater.vue'
import { Company } from '@/types/company/company'
import { employees } from '@/mock/company/employees'

export default defineComponent({
  name: 'Room',
  components: {
    Theater
  },
  setup() {
    const company = reactive<Company>({
      name: 'Fullon株式会社',
      slogan: 'IT + α で世の中をFullonに！',
      employees
    })
    return {
      company
    }
  }
})
</script>

<style lang="scss" scoped>
.companyTitle {
  text-align: center;
  font-size: 20px;
}
.slogan {
  text-align: center;
}
</style>
