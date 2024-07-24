/* eslint-disable */

<script>
import Loading1 from './loading1.vue'
import Loading2 from './loading2.vue'
import Loading3 from './loading3.vue'
import Loading4 from './loading4.vue'
import Loading5 from './loading5.vue'

export default {
  name: 'QiunLoading',
  components: { Loading1, Loading2, Loading3, Loading4, Loading5 },
  props: {
    loadingType: {
      type: Number,
      default: 2,
    },
  },
  data() {
    return {

    }
  },
}
</script>

<template>
  <view>
    <Loading1 v-if="loadingType === 1" />
    <Loading2 v-if="loadingType === 2" />
    <Loading3 v-if="loadingType === 3" />
    <Loading4 v-if="loadingType === 4" />
    <Loading5 v-if="loadingType === 5" />
  </view>
</template>

<style>

</style>
