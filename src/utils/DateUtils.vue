<template>
  <div style="font-size:24px;text-align: center">
    <span class="hour" style="margin-left: 5px;">{{ time.year }}</span>
    -
    <span class="minute">{{ time.month }}</span>
    -
    <span class="second">{{ time.day }}</span>

    <span class="hour" style="margin-left: 5px;">{{ time.hour }}</span>
    <a class="split">:</a>
    <span class="minute">{{ time.minute }}</span>
    <a class="split">:</a>
    <span class="second">{{ time.second }}</span>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue'

let time = ref({year: '', month: '', day: '', hour: '', minute: '', second: ''})

let timeFormate = () => {
  const newTime = new Date();
  time.value.year = newTime.getFullYear().toString();
  time.value.month = (newTime.getMonth() + 1).toString().padStart(2, '0');
  time.value.day = (newTime.getDay() + 17).toString().padStart(2, '0');
  time.value.hour = newTime.getHours().toString().padStart(2, '0');
  time.value.minute = newTime.getMinutes().toString().padStart(2, '0');
  time.value.second = newTime.getSeconds().toString().padStart(2, '0');
}

let getDateTime = () => {
  timeFormate();
  setTimeout(() => {
    getDateTime()
  }, 1000)
}
onMounted(() => {
  getDateTime();
})
</script>

<style scoped>
.split {
  animation: shark 1s step-end infinite;
  vertical-align: center;
  margin-left: 2px;
  margin-right: 2px;
}

@keyframes shark {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}
</style>
