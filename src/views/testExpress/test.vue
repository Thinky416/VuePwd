<template>
  <section class="login-box">
    <main class="login-main">
     <el-form>
          <el-form-item label="用户名" prop="test">
            <el-input
                v-model="ruleForm.test"
                type="text"
                autocomplete="off"
                placeholder="admin"
                @keyup.enter="submitForm(ruleFormRef)"
            />
          </el-form-item>
     </el-form>
    </main>
  </section>
</template>

<script setup>
import axios from 'axios';


const ruleFormRef = ref()
const loading = ref(false)
const ruleForm = reactive({
  test: '',
})

const rules = reactive({
  test: [{required: false, message: '用户名不能为空', trigger: 'blur'}],
})

const getDataList = async () => {
  try {
    loading.value.list = true
    // const dataList = await usersList(query)
    const data = await axios.get("localhost:3001")
    ruleForm.test = data;

  }catch {

   }
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

