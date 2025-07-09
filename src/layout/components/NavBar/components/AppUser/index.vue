<script setup>
import {useAuthStore} from "@/stores/Users.js";
import {SwitchButton, Star, Refresh} from "@element-plus/icons-vue";

const userStore = useAuthStore()
const handleCommand = (command) => {
  switch (command) {
    case 'SwitchAccount':
      // 这里换一下新账号
      ElMessageBox.confirm(
          '确定切换账号吗?',
          'Warning',
          {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
          }
      )
          .then(() => {
            userStore.logout()
          })
          break;
    case 'Exit':
      ElMessageBox.confirm(
          '确定注销并退出系统吗?',
          'Warning',
          {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
          }
      )
          .then(() => {
            userStore.logout()
          })

      break;
  }

}
</script>

<template>
  <el-dropdown @command="handleCommand">
    <div class="right-item">
      <div class="user-icon">
        <span>C柠檬呐</span>
        <el-avatar :size="25" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"/>
      </div>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="SwitchAccount" :icon="Refresh">切换账号</el-dropdown-item>
        <el-dropdown-item command="Exit" :icon="SwitchButton">退出系统</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style scoped lang="scss">

.user-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  text-wrap: nowrap;

  span {
    margin-right: 5px;
  }
}

</style>