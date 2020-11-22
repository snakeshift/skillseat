<template>
  <div class="header">
    <v-row>
      <v-col class="title ml-5">SkillSeat</v-col>
      <v-col class="mr-5 text-right">
        <v-btn text :to="{ name: 'Top' }">
          1
        </v-btn>
        <v-btn text :to="{ name: 'Room' }">
          2
        </v-btn>

        <!-- <v-avatar color="indigo" size="36">
          <v-icon dark>
            mdi-account
          </v-icon>
        </v-avatar> -->
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'Header',
  setup() {
    return {}
  }
})
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Hammersmith+One&display=swap');
.header {
  .title {
    font-family: 'Hammersmith One', sans-serif !important;
  }
}
</style>
