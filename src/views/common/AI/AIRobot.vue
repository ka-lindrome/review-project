<template>
    <div class="home card">
        <el-container>
            <el-header>
                <div class="header">
                    基于文心一言的学科知识问答机器人
                </div>
            </el-header>
            <el-main>
                <div class="chatbox">
            
                </div>
                <div class="inputbox">
                    <el-input class="input" placeholder="请输入">
                    </el-input>
                    <el-button class="submit">
                        提交
                    </el-button>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script setup>

</script>

<style scoped>
@import "./index.scss";

.chatbox {
    width:100px;
    height:100px;
    background-color: antiquewhite;
    align-items: center;
    justify-content: center;

}

.inputbox{
    display: flex;
}

.submit{
    background-color: aqua;
}
</style>
