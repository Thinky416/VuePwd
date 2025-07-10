<script setup>
import {CustNotification} from "@/utils/util.toast.js";

const ruleFormRef = ref()
const loading = ref(false)


let ruleForm = ref({})

const rules = reactive({
  name: [{required: true, message: '站点名称不能为空', trigger: 'blur'}],
  urlAddr: [{required: false, message: '网址为空', trigger: 'blur'}],
  group: [{required: false, message: '未选择分组', trigger: 'blur'}],
})
const emits = defineEmits(['save', 'close'])
const props = defineProps({
  updateData: {
    type: Object,
    default: () => {
    }
  }
})

ruleForm.value = {...props.updateData}

const submitForm = (formEl) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      /*let FUC = ruleForm.value._id ? 'update' : 'save'
      FUC(ruleForm.value).then(res => {
        emits('close', true)
        CustNotification.success('操作成功！')
      })*/
      emits('close', true)
      CustNotification.success('操作成功！')
    } else {
      console.log('error submit!')
    }
  })
}

const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}
const close = (formEl) => {
  emits('close')
}


onMounted(() => {

})
</script>

<template>
  <section>
    <el-form ref="ruleFormRef" @submit.native.prevent :model="ruleForm" status-icon :rules="rules" label-position="top"
             label-width="auto" class="demo-ruleForm" size="default">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="站点名称" prop="name">
            <el-input v-model="ruleForm.name" autocomplete="off"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="所属分组" prop="group">
            <el-input v-model="ruleForm.group" autocomplete="off"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="网址" prop="urlAddr">
            <el-input v-model="ruleForm.urlAddr" autocomplete="off"/>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="form-footer">
      <el-button type="primary" size="default" @click="submitForm(ruleFormRef)" :loading="loading">
        保存
      </el-button>
      <el-button size="default" @click="resetForm(ruleFormRef)">重置</el-button>
      <el-button size="default" @click="close">取消</el-button>
    </div>
  </section>

</template>

<style scoped lang="scss">

</style>