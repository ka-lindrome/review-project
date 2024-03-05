<template>
  <div style="font-size:240px;text-align: center">
    <span class="hour" style="margin-left: 5px;">{{ time.hour }}</span>
    <a class="split">:</a>
    <span class="minute">{{ time.minute }}</span>
    <a class="split">:</a>
    <span class="second">{{ time.second }}</span>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue'

let time = ref({hour: '', minute: '', second: ''})

let timeFormate = () => {
  const newTime = new Date();


  time.value.hour = newTime.getHours().toString().padStart(2,'0');
  time.value.minute = newTime.getMinutes().toString().padStart(2,'0');
  time.value.second = newTime.getSeconds().toString().padStart(2,'0');
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
