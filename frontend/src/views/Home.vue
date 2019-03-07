<template>
  <div class="home">
    <TestResult/>
  </div>
</template>

<script>
// @ is an alias to /src
import TestResult from '@/components/TestResult.vue'

export default {
  name: 'home',
  components: {
    TestResult
  }
}
</script>
