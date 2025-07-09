<template>
  <section class="login-box">
    <main class="login-main">
      <!-- <ZyLogo class="logo"/> -->
      <section class="login-form-box">
        <div class="form-box-head">
          <h1>Password Management</h1>
          <p>
            登录您的帐户
          </p>
        </div>
        <el-form
            @submit.native.prevent
            ref="ruleFormRef"
            style="width: 300px"
            :model="ruleForm"
            status-icon
            :rules="rules"
            label-position="top"
            label-width="auto"
            class="demo-ruleForm"
            size="large"
        >
          <el-form-item label="用户名" prop="username">
            <el-input
                v-model="ruleForm.username"
                type="text"
                autocomplete="off"
                placeholder="admin"
                @keyup.enter="submitForm(ruleFormRef)"
            />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password" @keyup.enter="submitForm(ruleFormRef)" placeholder="123456"
                      type="password" autocomplete="off"/>
          </el-form-item>
          <el-form-item style="margin-top: 55px">
            <el-button style="width: 100%" type="primary" @click="submitForm(ruleFormRef)" :loading="loading">
              登录
            </el-button>
          </el-form-item>
        </el-form>
        <div class="form-box-footer">
          <p class="tips">支持以下登录方式（推荐使用）</p>
          <div class="footer-other">
            <el-icon style="margin-right: 8px">
              <IconCommunity/>
            </el-icon>
            <el-icon style="margin-right: 8px">
              <IconOne/>
            </el-icon>
            <el-icon style="margin-right: 8px">
              <IconTwo/>
            </el-icon>
            <el-icon>
              <IconCommunity/>
            </el-icon>
          </div>
        </div>

      </section>

    </main>
    <aside class="login-aside">
      <div class="aside-info">
        <div class="info-t">
          <span>“</span>
        </div>
        <div class="info-desc">
                    XXXXXXXXXXXXXXXXXXXXXXXX
                    <br/>
                    XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                    <br/>
                    XXXXXXXXXX
        </div>
        <div class="info-b">
          <span>”</span>
        </div>
        
        <!-- <ZyLogo/> -->
      </div>
    </aside>

  </section>
</template>

<script setup>
import {useAuthStore} from "@/stores/Users.js";
import IconCommunity from "@/components/icons/IconCommunity.vue";

const userStore = useAuthStore()
const ruleFormRef = ref()
const loading = ref(false)


const ruleForm = reactive({
  username: '',
  password: '',
})

const rules = reactive({
  username: [{required: true, message: '用户名不能为空', trigger: 'blur'}],
  password: [{required: true, message: '密码不能为空', trigger: 'blur'}],
})

const submitForm = (formEl) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      loading.value = true
      userStore.login(ruleForm).then(res => {
        loading.value = false
        ElMessage({
          message: `登录成功，欢迎回来: ${res.userInfo.nickname}`,
          type: 'success',
        })
      }).catch(err => {
        loading.value = false
      })
    } else {
      console.log('error submit!')
      resetForm
    }
  })
}

const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}


</script>

<style lang="scss" scoped>
.login-box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  .login-main {
    width: 40%;
    height: 100%;
    background-color: var(--menu-background);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, .1), 0 4px 6px -4px rgba(0, 0, 0, .1);


    border-right: 1px solid var(--el-border-color);
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    .logo {
      position: absolute;
      top: 15px;
      left: 20px;
    }

    .login-form-box {
      padding: 35px;
      border-radius: 8px;

      .form-box-head {
        margin-bottom: 2.5rem;
       
        h1 {
          font-size: 1.875rem;
          line-height: 2.25rem;
          margin: .8rem 0
        }

        p {
          font-size: .875rem;
          line-height: 1.25rem;
          color: #6c6c6c;
        }
      }

      .form-box-footer {
        border-top: 1px solid var(--el-border-color);
        margin-top: 25px;
        padding-top: 10px;

        .tips {
          font-size: 12px;
          color: #6c6c6c;
        }

        .footer-other {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          font-size: 25px;
          padding: 15px 0;
        }
      }
    }


  }

  .login-aside {
    height: 100%;
    width: 60%;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;


    .aside-info {
      max-width: 32rem;
      max-height: 32rem;
      position: relative;

      .info-t {
        position: absolute;
        left: -2rem;
        top: -100px;
        font-size: 160px;
        color: #eeeeee;
        z-index: -1;
      }

      .info-b {
        position: absolute;
        left: -2rem;
        top: 100px;
        font-size: 160px;
        color: #eeeeee;
        z-index: -1;
      }

      .info-desc {
        font-size: 1.5rem;
        line-height: 2.25rem;
        color: #606164;
        font-weight: bold;
        letter-spacing: 2px;
        margin-bottom: 1.5rem;
        font-family: 楷体;
        text-indent: 2em;

      }

    }

  }

}
</style>

