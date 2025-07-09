<script setup>

import {usersList} from "@/api/modules/api.users";
import {TimeUtils} from "utils/util.time";
import {Confirm, CustNotification} from "@/utils/util.toast.js";
import GetPage from "@/views/components/page/get-page.vue";
import ViewPage from "@/views/components/page/view-page.vue";
import GetItems from "@/views/pwd/item/get-items.vue";
import ViewItems from "@/views/pwd/item/view-items.vue";

const tableData = ref([])
const fields = reactive([
  // {key: 'checkBox', name: '选择', show: true, align: "center", enableSort: false, fixed: false},
  {key: 'name', name: '名称', show: true, align: "left", enableSort: false, fixed: false},
  {key: 'url', name: '网址', show: true, align: "left", enableSort: false, fixed: false},
  {key: 'logonName', name: '登录名', show: true, align: "left", enableSort: false, fixed: false},
  {key: 'logonPwd', name: '登录密码', show: true, align: "center", enableSort: false, fixed: false},
  {key: 'createdAt', name: '创建时间', show: true, align: "center", enableSort: true, fixed: false},
  {key: 'updatedAt', name: '更新时间', show: true, align: "center", enableSort: false, fixed: false},
  {key: 'toolButton', name: '操作', show: true, align: "center", width: '220', enableSort: false, fixed: 'right'},
])
const loading = ref({
  list: false,
  text: '加载中...'
})
// 列表查询参数
const query = reactive({
  params: {},
  pagination: {
    current: 1,
    pageSize: 15
  },
  sort: {
    columnKey: "createdAt",
    order: "ascend"
  }
})

// 查询参数验证逻辑
const queryRule = {}
const tempData = reactive({
  total: 0,
  showView: false,
  showEdit: false,
  dialogTitle: '',
})
// 每页
const sizeChange = (pageSize) => {
  query.pagination.pageSize = pageSize || 15
  goPage(1)
}
// 当前页
const currentChange = (current) => {
  goPage(current)
}
// 排序
const handleSortChange = ({column, prop, order}) => {
  query.sort.order = order
  query.sort.columnKey = prop
  goPage(1)
}
// 表格实例
const datatableRef = ref()
// 表格选择
const handleSelectionChange = (selection) => {
  console.log(datatableRef.value?.tableRef)
  console.log(selection)
}
// 查询
const goPage = (num = 1) => {
  query.pagination.current = num
  getDataList()
}
// 重置
const goReset = () => {
  query.params = {}
  goPage(1)
}

function traverseTree(node) {
  // 处理当前节点
  node.createdAt = TimeUtils.formatTime(node.createdAt)
  node.updatedAt = TimeUtils.formatTime(node.updatedAt)
  // 递归遍历子节点
  if (node.children) {
    node.children.forEach(child => {
      traverseTree(child);
    });
  }
}

// 加载列表数据
const getDataList = async () => {
  try {
    loading.value.list = true
    // const dataList = await usersList(query)
    const dataList = {
      data: {
        current: 1,
        pageSize: 10,
        total: 100,
        result: [
          {
            "_id": "64a6767b2f517ae48b51de4a",
            "name": "ASL",
            "sortOrder": 0,
            "createdAt": "2023-07-06T08:08:27.735Z",
            "updatedAt": "2023-07-18T03:16:59.334Z",
            "disabled": false
          },
          {
            "_id": "64a676872f517ae48b51de50",
            "name": "ASL_EPMI",
            "sortOrder": 0,
            "status": true,
            "createdAt": "2023-07-06T08:08:39.650Z",
            "updatedAt": "2023-07-06T13:26:57.493Z",
            "disabled": false,
            "children": [
              {
                "_id": "64a676942f517ae48b51de56",
                "name": "Jira",
                "url":"http://baidu.com",
                "logonName":"Test",
                "logonPwd":"Abcd1234",
                "sortOrder": 0,
                "createdAt": "2023-07-06T08:08:52.375Z",
                "updatedAt": "2023-07-07T02:37:51.339Z",
                "disabled": false,
              },
              {
                "_id": "64a6f171d2fac9dd58d3025c",
                "name": "哔哩哔哩",
                "url":"http://bilibili.com",
                "logonName":"Test",
                "logonPwd":"Abcd1234",
                "sortOrder": 0,
                "createdAt": "2023-07-06T08:08:52.375Z",
                "updatedAt": "2023-07-07T02:37:51.339Z",
                "disabled": false,
                "children": [
                  {
                    "_id": "64a6f171d2fac9dd58d3025d",
                    "name": "主号",
                    "logonName":"Test1111",
                    "logonPwd":"Abcd12341111",
                    "sortOrder": 0,
                    "status": true,
                    "createdAt": "2023-07-06T16:53:05.026Z",
                    "updatedAt": "2023-07-06T16:53:05.026Z",
                    "disabled": false
                  },
                  {
                    "_id": "64a6f171d2fac9dd58d3025e",
                     "name": "小号",
                    "logonName":"Test2222",
                    "logonPwd":"Abcd12342222",
                    "sortOrder": 0,
                    "status": true,
                    "createdAt": "2023-07-06T16:53:05.026Z",
                    "updatedAt": "2023-07-06T16:53:05.026Z",
                    "disabled": false
                  },
                ]
              }
            ]
          }
        ]
      }
    }
    const {current, pageSize, result, total} = dataList.data
    query.pagination.current = current
    query.pagination.pageSize = pageSize
    tempData.total = total
    for (const data of result) {
      data.createdAt = TimeUtils.formatTime(data.createdAt)
      data.updatedAt = TimeUtils.formatTime(data.updatedAt)
    }
    result.forEach(node => {
      traverseTree(node);
    });
    tableData.value = result
    loading.value.list = false
  } catch (e) {
    loading.value.list = false
  }
}
// 修改
const goEdit = (row, title,add) => {
  tempData.showEdit = true
  tempData.updateData = row ? {...row} : {}
  if (add || !row){
    tempData.updateData.add=true
  }
  tempData.dialogTitle = title ? title : row ? '修改' : '新增'
}
// 删除
const goDelete = (row) => {
  Confirm('确认删除该条数据？').then(ok => {
    // ok && fwsbRemove(row.id).then(res => {
    //   if (res.data) {
    //     goPage(1)
    //     CustNotification.success('删除成功！')
    //   }
    // })
  })
}
// 详情
const goView = (row) => {
  tempData.updateData = row
  tempData.showView = true
}

// 关闭
const close = (_t) => {
  tempData.showView = false
  tempData.showEdit = false
  tempData.updateData={}
  _t && goPage(1)
}

goPage(1)
</script>

<template>
  <section>
    <transition
        enter-active-class="animate__animated animate__fadeIn"
        mode="out-in"
    >
      <section>
        <ZyTableQueryForm
            :ruleForm="query.params"
            :rules="queryRule"
            @query="goPage(1)"
            @reset="goReset"
        >
          <el-form-item prop="name">
            <el-input v-model="query.params.name" clearable @change="goPage(1)" placeholder="数据名称查询"/>
          </el-form-item>
        </ZyTableQueryForm>
        <ZyTableFilter :fields="fields"
                       :showDelete="false"
                       @add="goEdit"/>
        <ZyElTable :datas="tableData"
                   ref="datatableRef"
                   :loading="loading.list"
                   :loading-txt="loading.text"
                   @sortChange="handleSortChange"
                   @selectionChange="handleSelectionChange"
        >
          <template v-for="field in fields" :key="field.key">
            <template v-if="field.show">
              <el-table-column v-if="field.key==='checkBox'"
                               :align="field.align"
                               type="selection"></el-table-column>
              <el-table-column v-else-if="field.key==='auth'"
                               :label="field.name"
                               :width="field.width"
                               :fixed="field.fixed"
                               :align="field.align">
                <template #default="scope">
                  <el-tag :type="scope.row.auth?'success':'info'">{{ scope.row.auth ? '是' : '否' }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column v-else-if="field.key==='status'"
                               :label="field.name"
                               :width="field.width"
                               :fixed="field.fixed"
                               :align="field.align">
                <template #default="scope">
                  <el-switch
                      active-text="正常"
                      inactive-text="停用"
                      v-model="scope.row.status"></el-switch>
                </template>
              </el-table-column>
              <el-table-column v-else-if="field.key==='key'"
                               :label="field.name"
                               :width="field.width"
                               :fixed="field.fixed"
                               :align="field.align">
                <template #default="scope">
                  <el-tag v-if="scope.row.key">{{ scope.row.key }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column v-else-if="field.key==='parent_key'"
                               :label="field.name"
                               :width="field.width"
                               :fixed="field.fixed"
                               :align="field.align">
                <template #default="scope">
                  <el-tag v-if="scope.row.parent_key">{{ scope.row.parent_key }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column v-else-if="field.key==='toolButton'"
                               :align="field.align"
                               :label="field.name"
                               :width="field.width"
                               :fixed="field.fixed">
                <template #default="scope">
                  <ZyTableButtons
                      viewAuth="sys:users:list"
                      editAuth="sys:users:update"
                      deleteAuth="sys:users:delete"
                      :showView="false"
                      @view="goView(scope.row)"
                      @edit="goEdit(scope.row)"
                      @delete="goDelete(scope.row)"
                  >
                    <el-button type="primary" @click="goEdit(scope.row,'新增下级','add')">新增下级</el-button>
                  </ZyTableButtons>
                </template>
              </el-table-column>
              <el-table-column
                  v-else
                  show-overflow-tooltip
                  :prop="field.key"
                  :align="field.align"
                  :label="field.name"
                  :width="field.width"
                  :sortable="field.enableSort?'custom':false"
                  :fixed="field.fixed"
              ></el-table-column>
            </template>
          </template>
        </ZyElTable>
        <!--        <ZyElPagination-->
        <!--            :currentPage="query.pagination.current"-->
        <!--            :pageSize="query.pagination.pageSize"-->
        <!--            :total="tempData.total"-->
        <!--            @sizeChange="sizeChange"-->
        <!--            @currentChange="currentChange"-->
        <!--        />-->
      </section>
    </transition>

    <ZyElDialog :show="tempData.showEdit"
                width="40%"
                :title="tempData.dialogTitle"
                @close="close">
      <GetItems :update-data="tempData.updateData" @close="close"/>
    </ZyElDialog>
    <ZyElDialog :show="tempData.showView"
                title="查看详情"
                @close="close">
      <ViewItems :update-data="tempData.updateData" @close="close"/>
    </ZyElDialog>

  </section>
</template>

<style scoped lang="scss">

</style>
