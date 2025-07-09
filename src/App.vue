<script setup>
import {RouterView} from 'vue-router'
import {useAppStore} from "@/stores/AppSetting.js";
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const appStore = useAppStore()
appStore.initThemeColor()

const font = reactive({
  color: 'rgba(0, 0, 0, .15)',
})


const locale = zhCn


</script>

<template>
  <el-config-provider :locale="locale">
    <el-watermark style="height: 100%" :font="font" :content="appStore.watermarking?'VuePwd':''" :zIndex="9999">
      <RouterView/>
    </el-watermark>
  </el-config-provider>

</template>

<style scoped>
@import './assets/styles/font.css';
</style>
