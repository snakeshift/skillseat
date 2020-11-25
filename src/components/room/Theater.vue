<template>
  <div class="theater pa-10 w100p h100p pos-rel" :style="gridStyles">
    <div class="companyInfo flex-column" :class="{ sorted: sorted }">
      <div class="name">{{ company.name }}</div>
      <div class="slogan">{{ company.slogan }}</div>
    </div>
    <div class="h100p d-flex">
      <div
        class="seats flex-grow-1"
        :class="{ sorted: sorted }"
        ref="seatsGrid"
      >
        <template v-for="seat in seats">
          <Seat
            :key="seat.id"
            :seat="seat"
            :sorted="sorted"
            :position="gridPositions[seat.id]"
            :animationMilliseconds="animationMilliseconds"
          />
        </template>
      </div>
      <div class="d-flex flex-column">
        <transition
          enter-active-class="animate__animated animate__lightSpeedInRight"
        >
          <div v-if="sorted" class="sections">
            <div>
              <p class="ml-2 overline mb-0">Sections</p>
              <template v-for="section in mainSections">
                <div :key="section.id" v-if="grid.sections[section.id]">
                  <v-chip
                    :color="section.seatColor"
                    label
                    x-small
                    class="ma-2"
                    @click="setFilterBySection(section.id)"
                  />
                  <span class="sectionName">{{ section.sectionName }}</span>
                </div>
              </template>
            </div>
          </div>
        </transition>
        <transition
          enter-active-class="animate__animated animate__lightSpeedInRight"
        >
          <div v-if="sorted" class="skills">
            <div>
              <p class="ml-2 overline mb-0">Skills</p>
              <template v-for="language in languages">
                <div :key="language.id">
                  <!-- <v-chip
                    :color="section.seatColor"
                    label
                    x-small
                    class="ma-2"
                  /> -->
                  <!-- <img :src="require(`@/assets/imgs/logo/skill/language/javascript.svg`)"> -->
                  <!-- <img :src="language.logo" width="20" height="20" />
                  <span class="sectionName">{{ language.languageName }}</span> -->
                </div>
              </template>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  ref,
  computed,
  onMounted
} from '@vue/composition-api'
import { Company } from '@/types/config/company/company'
import Seat from '@/components/room/Seat.vue'
import { MAIN_SECTIONS } from '@/config/company/mainSections'
import { LANGUAGES } from '@/config/skill/language'
import { useSeat } from '@/composable/seat'
import { useGrid } from '@/composable/grid'

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
    const sorted = ref(false)
    const animationMilliseconds = ref(1000) // オープン時アニメーション(ms)
    const maxColNumPerSection = 5 // 1セクションにつき何行までか

    const { seats, setFilterBySection, initSeats } = useSeat({
      sorted,
      animationMilliseconds,
      company: props.company
    })

    const {
      seatsGrid,
      grid,
      gridStyles,
      gridPositions,
      initGridAnimation
    } = useGrid({
      company: props.company,
      maxColNumPerSection
    })

    const mainSections = computed(() => MAIN_SECTIONS)
    const languages = computed(() => LANGUAGES)

    onMounted(() => {
      initSeats()
      initGridAnimation()
    })

    return {
      seats,
      animationMilliseconds,
      sorted,
      grid,
      gridStyles,
      gridPositions,
      seatsGrid,
      mainSections,
      languages,
      setFilterBySection
    }
  }
})
</script>

<style lang="scss" scoped>
.theater {
  /* グリッド生成のためのcss変数定義 */
  --max-row-num: 0; // 最大横列数
  --max-col-num: 0; // 最大縦列数

  .companyInfo {
    z-index: 1;
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translateY(-55%) translateX(-50%);
    text-align: center;
    width: 100%;
    transition: 1.8s;
    &.sorted {
      top: 80px;
    }
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
    height: 100%;
    text-align: center;
    position: relative;
    display: grid;
    justify-content: center;
    grid-auto-rows: 50px;
    // grid-template-rows: repeat(auto-fill, 50px);
    grid-template-columns: repeat(auto-fill, 50px);
    // grid-auto-flow: column;
    // grid-auto-rows: 50px;
    // grid-auto-columns: 50px;
    transition: 0.5s;
    &.sorted {
      top: 110px;
      height: calc(100% - 110px);
      grid-template-rows: repeat(var(--max-row-num), 40px);
      grid-template-columns: repeat(var(--max-col-num), 40px);
    }
  }
  .sections,
  .skills {
    width: 250px;
    margin-top: 20px;
    .sectionName {
      font-size: 12px;
    }
  }
  .sections {
    margin-top: 110px;
  }
}
</style>
