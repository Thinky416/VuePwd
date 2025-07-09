<template>
  <template v-for="route in routes">
    <el-sub-menu
        :key="route.path"
        v-if="route.children"
        :index="route.path"
    >
      <template #title>
        <i class="menu-icon" v-if="route.meta.icon"  :class="`iconfont ${route.meta.icon}`"></i>
        <i  v-else class="menu-icon iconfont icon-a-setup"></i>
        <span>{{ route.meta.title }}</span>
      </template>
      <MenuItems :routes="route.children"/>
    </el-sub-menu>

    <el-menu-item
        v-else
        :key="route.path"
        :index="route.path"
        @click="goPage(route)"
    >
      <i class="menu-icon" v-if="route.meta.icon"  :class="`iconfont ${route.meta.icon}`"></i>
      <i v-else class="menu-icon iconfont icon-a-setup"></i>
      <span>{{ route.meta.title }}</span>
    </el-menu-item>
  </template>
</template>

<script setup>

import router from "@/router/index.js";
import {useTagsViewStore} from "@/stores/TagsView.js";

const TagsViewStore = useTagsViewStore()
const props = defineProps({
  routes: {
    type: Array,
    required: true
  }
})
// 跳转页面
const goPage = (v) => {

  if (v.meta.isLink) {
    window.open(v.path, '_blank')
    return
  }
  // 添加 tagView
  TagsViewStore.addTag(v)
  router.push({path: v.path})
}

</script>
<style>
.menu-icon {
  margin-right: 5px;
}
</style>
