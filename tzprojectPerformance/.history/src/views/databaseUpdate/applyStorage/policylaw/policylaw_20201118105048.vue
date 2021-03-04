<template>
  <div class="page-container">
    <div class="table-list-search">
      <el-form ref="listQuery" :model="listQuery" inline>
        <el-form-item label="文号" prop="companyName">
          <el-input v-model="listQuery.companyName" size="small" />
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" icon="el-icon-search">查询</el-button>
          <el-button size="small" @click="listQueryReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="header-operation">
      <el-button type="primary" size="small" icon="el-icon-edit" @click="handelAdd">新增</el-button>
    </div>
    <!--新增-->
    <div class="table-list">
      <el-table
        v-loading="listLoading"
        :data="list"
        border
        element-loading-text="给我一点时间"
        fit
        highlight-current-row
        stripe
        header-row-class-name="table-header"
        size="small"
        max-height="420"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <!-- v-loading="listLoading" -->
        <el-table-column type="index" :index="typeIndex" label="序号" align="center" />
        <el-table-column prop="projectNo" label="文号" align="center" />
        <el-table-column prop="clientName" label="政策法规名称" align="center" />
        <el-table-column prop="childProjectName" label="发文单位" align="center" />
        <el-table-column prop="childProjectNo" label="关键词" align="center" />
        <el-table-column prop="functionClassify" label="行政地区" align="center" />
        <el-table-column prop="ecoClassify" label="正文" align="center">
          <template>
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
              :limit="3"
              :on-exceed="handleExceed"
              :file-list="fileList"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template>
            <el-button
              size="small"
              plain
              type="primary"
            >修改</el-button>
            <el-button
              size="small"
              plain
              type="primary"
            >详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        :current-page="listQuery.current"
        :page-sizes="[10,20,30, 50]"
        :page-size="listQuery.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <!-- 新增子项目弹窗 -->
    <el-dialog width="55%" class="dialog" :title="title" :visible.sync="addShow" @close="closeDialog">
      <div class="dialog-body">
        <div class="table-list">
          <el-table
            v-loading="listLoading"
            :data="parentList"
            border
            element-loading-text="给我一点时间"
            fit
            highlight-current-row
            stripe
            header-row-class-name="table-header"
            size="small"
            max-height="420"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="index" :index="typeIndex" label="序号" align="center" />
            <el-table-column prop="projectNo" label="文号" align="center" />
            <el-table-column prop="clientName" label="政策法规名称" align="center" />
            <el-table-column prop="childProjectName" label="发文单位" align="center" />
            <el-table-column prop="childProjectNo" label="关键词" align="center" />
            <el-table-column prop="functionClassify" label="行政地区" align="center" />
            <el-table-column align="center" label="操作" fixed="right">
              <template slot-scope="scope">
                <el-button size="small" plain type="primary" @click="creatChildProject(scope.$index, scope.row)">创建</el-button>
                <!-- <el-button size="small" plain type="primary">详情</el-button> -->
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="pagination-container">
          <el-pagination
            background
            :current-page="parentListQuery.current"
            :page-sizes="[10,20,30, 50]"
            :page-size="parentListQuery.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="parentTotal"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { tableListMixin, globalMixin } from '@/utils/mixin'
export default {
  name: 'ApprovalApply',
  mixins: [tableListMixin, globalMixin],
  data() {
    return {
      listQuery: {
        current: 1,
        size: 10
      },
      parentListQuery: {
        current: 1,
        size: 10
      },
      list: [{
        projectNo: '〔2020〕AA号',
        clientName: '法规A',
        childProjectName: '单位A',
        childProjectNo: '',
        functionClassify: '地区A',
        riskLevel: 2,
        status: 1
      }, {
        projectNo: '〔2020〕BB号',
        clientName: '法规B',
        childProjectName: '单位B',
        childProjectNo: '',
        functionClassify: '地区B',
        riskLevel: 1,
        status: 2
      }, {
        projectNo: '〔2020〕CC号',
        clientName: '法规C',
        childProjectName: '单位C',
        childProjectNo: '',
        functionClassify: '地区C',
        riskLevel: 3,
        status: 4
      }],
      total: null,
      parentTotal: null,
      addShow: false,
      addChildShow: false,
      title: '',
      addForm: {
        companyType: 1,
        childProjectArr: [
          {
            childProjectName: '',
            childProjectNo: ''
          }
        ]
      },
      parentList: [
        {
          projectNo: 'P0101',
          clientName: '宋江',
          projectType: 1,
          isSplit: 1
        },
        {
          projectNo: 'P002',
          clientName: '李逵',
          projectType: 2,
          isSplit: 2
        },
        {
          projectNo: 'P003',
          clientName: '卢俊义',
          projectType: 1,
          isSplit: 1
        }
      ]
    }
  },
  methods: {
    // 获取列表
    getList() {},
    // 搜索
    onSeaech() {},
    // 重置
    listQueryReset() {
      this.$refs['listQuery'].resetFields()
    },
    handelAdd() {
      this.title = '立项申请'
      this.addShow = true
      this.addForm.companyType = '' // 经营体名称
    },
    closeDialog() {
      this.$refs['addForm'].resetFields()
    },
    timeAdd() {
      console.log(this.addForm.childProjectArr)
      if (this.addForm.childProjectArr.length > 4) {
        this.$message({
          type: 'warning',
          message: '最多设置5个子项目!'
        })
        return false
      }
      const timepart = {
        childProjectName: '',
        childProjectNo: ''
      }
      this.addForm.childProjectArr.push(timepart)
    },
    creatChildProject(index, row) {
      this.addChildShow = true
    },
    holdSave() {
      this.addChildShow = false
      this.addShow = false
    },
    submitSave() {
      this.addChildShow = false
      this.addShow = false
    }
  }
}
</script>
<style rel="stylesheet/less" lang="less" scoped>

</style>
