<template>
  <section class="login-box">
    <main class="login-main">
      <!-- <ZyLogo class="logo"/> -->
      <section class="login-form-box">
        <div class="form-box-head">
          <h1>HKIC No. Check Digital</h1>
          <p>
            This is a demo
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
          <el-form-item label="HKIC No Src" prop="hkicSrc">
            <el-input
                v-model="ruleForm.hkicSrc"
                type="text"
                autocomplete="off"
                placeholder="C111111"
                maxlength = 8
                @input = 'hkicLimit'
                @keyup.enter="submitForm(ruleFormRef)"
                @blur="submitForm(ruleFormRef)"
            />
          </el-form-item>
          <el-form-item label="Whole HKIC No." prop="hkicTar">
            <el-input v-model="ruleForm.hkicTar" 
                      type="text" autocomplete="off"
                      placeholder="C1111114"
                      />
          </el-form-item>
        </el-form>
        <div class="form-box-footer">
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
      </div>
    </aside>

  </section>
</template>

<script setup>

const ruleFormRef = ref()


const ruleForm = reactive({
  hkicSrc: '',
  hkicTar: '',
})

const rules = reactive({
  hkicSrc: [
    {required: true, 
      message: 'can not be null', 
      trigger: 'blur'
    },
    { 
      validator: (rule, value, callback) => {
        // 假设我们用正则验证是否为有效的电子邮件
        const hkidPatten1 = /^[ ]*[A-Z]{1,2}[0-9]{6}$/;
        const hkidPatten2 = /^[ ]*[A-TV-Z]{1,2}[0-9]{6}$/;
        if (!value) {
          return callback(new Error('This field is required'));
        }
        if ((!hkidPatten1.test(value)) && (!hkidPatten2.test(value)) ) {
          return callback(new Error('Invalid hkic format'));
        }
        callback(); // 验证通过
      },
      trigger: 'blur' 
    }
  
  ],
  hkicTar: [{required: false, message: '', trigger: 'blur'}],
})

const hkicLimit = ()=>{
  ruleForm.hkicSrc =  ruleForm.hkicSrc.toUpperCase()
}


  // 字母对应数字的键值对
  let alphaDict = {};
    for (let i = 0; i < 26; i++) {
        let letter = String.fromCharCode(65 + i); // 65 是 'A' 的 ASCII 码
        alphaDict[letter] = i + 1; // 'A' -> 1, 'B' -> 2, ..., 'Z' -> 26
    }

const submitForm = ()=>{
        var engVal = 0;
        var firstIdx = 0;
        var firstMul = 0;
        if(ruleForm.hkicSrc.length == 8){
            //计算规则不具有普遍性（字母全0）
            engVal = (alphaDict[ruleForm.hkicSrc[0]] + alphaDict[ruleForm.hkicSrc[1]])* 8  ;
            firstIdx=2;
            firstMul = 7;
        }
        else{
            engVal = alphaDict[ruleForm.hkicSrc[0]]*8;
            firstIdx=1;
            firstMul = 7;
        }

        var numVal = 0;
        var index = firstMul;
        for (let i = firstIdx; i < ruleForm.hkicSrc.length ; i++) {
            numVal += ruleForm.hkicSrc[firstIdx]*index;
            firstIdx++;
            index--;
       }

        var divVal = (engVal + numVal) % 11;
        switch(divVal)
        {
            case 0:
                ruleForm.hkicTar = (`${ruleForm.hkicSrc}${divVal}`);
                 break;
            case 1:
                ruleForm.hkicTar  =(`${ruleForm.hkicSrc}A`);
                break;
            default:
                ruleForm.hkicTar  =(`${ruleForm.hkicSrc}${11-divVal}`);
                break;
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

