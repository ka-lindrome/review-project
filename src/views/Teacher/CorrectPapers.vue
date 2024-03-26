<template>
  <div style="width: 1000px;">
    <div class="demo-image__preview">
      <el-image
          style="width: 40px; height: 40px"
          :src="url"
          :zoom-rate="1.2"
          :max-scale="7"
          :min-scale="0.2"
          :preview-src-list="srcList"
          :initial-index="4"
          fit="cover"
      />
      <el-button style="margin-left:20px" size="small" @click="operateAll"> {{ msg }}</el-button>
      <span>当前得分:</span>
      <sapn>{{ grade }}</sapn>
      <el-icon @click="handleFullScreen" style="cursor: pointer; margin-left:20px">
        <component :is="curIcon"/>
      </el-icon>

    </div>
    <el-collapse v-model="activeItems" @change="handleChange">
      <el-collapse-item title="选择题" name="1">
        <div>
          Consistent with real life: in line with the process and logic of real life, and comply with languages and
          habits that the users are used to;
          Consistent within interface: all elements should be consistent, such as: design style, icons and texts,
          position of elements, etc.
        </div>
        <el-progress
            :percentage="percentage"
            :format="formatScore"
            @click="handleProgressClick"
        ></el-progress>
      </el-collapse-item>
      <el-collapse-item title="填空题" name="2">
        <div>
          Consistent with real life: in line with the process and logic of real life, and comply with languages and
          habits that the users are used to;
          Consistent within interface: all elements should be consistent, such as: design style, icons and texts,
          position of elements, etc.
        </div>
      </el-collapse-item>
      <el-collapse-item title="填空题" name="3">
        <div>
          Consistent with real life: in line with the process and logic of real life, and comply with languages and
          habits that the users are used to;
          Consistent within interface: all elements should be consistent, such as: design style, icons and texts,
          position of elements, etc.
        </div>
      </el-collapse-item>
      <el-collapse-item title="填空题" name="4">
        <div>
          Consistent with real life: in line with the process and logic of real life, and comply with languages and
          habits that the users are used to;
          Consistent within interface: all elements should be consistent, such as: design style, icons and texts,
          position of elements, etc.
        </div>
      </el-collapse-item>


    </el-collapse>

    <el-card style="width:100%;margin-top:20px;" shadow="none">
      <template #header>
        <div class="card-header">
          <span>试卷分析</span>
        </div>
      </template>
      <p v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</p>
      <template #footer>评语部分</template>
    </el-card>
  </div>
</template>

<script setup>
import {ref} from 'vue'

let activeItems = ref([])
let flg = ref(false)
let msg = ref("全部展开")
import API from '@/utils/axiosInference'

let operateAll = () => {
  if (!flg.value) {
    activeItems.value = ['1', '2', '3', '4']
    msg.value = "全部折叠"
    flg.value = true
  } else if (flg.value) {
    activeItems.value = []
    msg.value = "全部展开"
    flg.value = false
  }
}

let percentage = ref(70)


let getScore = (percentage) => {
  return Math.round(percentage / 10)
}
let formatScore = (percentage) => {
  return `${percentage}% - 对应的分数:${getScore(percentage)}`
}

let handleProgressClick = (percentage) => {
  console.log(percentage)
  let score = getScore(percentage)
  alert(`你得到了${score}分`)
}


let isFull = ref(false)

let handleFullScreen = () => {

  if (!isFull.value) {
    isFull.value = true
    curIcon.value = 'BottomLeft'
  } else if (isFull.value) {
    isFull.value = false
    curIcon.value = 'FullScreen'
  }

}

let curIcon = ref("FullScreen")

let grade = ref(78)

let updateInfo = () => {
  console.log("更新当前学生成绩")
  API({
    method: 'post',
    data: grade.value,
    url: ''
  }).then(res => {
    console.log(res)

    grade.value = 0
  })

}

let nxtOne = () => {


}

let preOne = () => {


}


const url = ref('https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg')

const srcList = [
  'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
  'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
  'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
  'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
  'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
  'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
  'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',
]


</script>

<style scoped>
.demo-image__error .image-slot {
  font-size: 30px;
}

.demo-image__error .image-slot .el-icon {
  font-size: 30px;
}

.demo-image__error .el-image {
  width: 100%;
  height: 200px;
}
</style>
