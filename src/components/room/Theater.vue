<template>
  <div class="theater mx-10">
    <v-row class="companyInfo flex-column">
      <v-col class="name">{{ company.name }}</v-col>
      <v-col class="slogan">{{ company.slogan }}</v-col>
    </v-row>
    <div class="seats">
      <template v-for="employee in company.employees">
        <Seat :employee="employee" :key="employee.id" :sort="sortType" />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from '@vue/composition-api'
import { Company } from '@/types/company/company'
import Seat from '@/components/room/Seat.vue'

export default defineComponent({
  name: 'Theater',
  components: {
    Seat
  },
  props: {
    company: {
      type: Object as PropType<Company>,
      default: () => {
        return {}
      }
    }
  },
  setup(props) {
    const sortType = ref(1)
    const checkSeatsPosition = () => {
      // セクションごとに分ける
      // const sections = {}
      // for (const ) {

      // }
      // props.company.employees.forEach(())
      // console.log(props.company)
      return ''
    }
    console.log(checkSeatsPosition())
    return {
      sortType
    }
  }
})
</script>

<style lang="scss" scoped>
.theater {
  .companyInfo {
    margin-top: 30px;
    text-align: center;
    .name {
      font-size: 20px;
    }
    .slogan {
      font-size: 14px;
      color: #9296ad;
      padding-top: 0;
    }
  }
  .seats {
    text-align: center;
    margin-top: 20px;
    position: relative;
    display: grid;
    justify-content: center;
    grid-template-columns: 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px;
    grid-template-rows: 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px;
  }
}
</style>
