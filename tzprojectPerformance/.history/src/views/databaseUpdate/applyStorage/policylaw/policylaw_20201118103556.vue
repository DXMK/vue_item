<template>
  <div class="page-container">
    <div class="table-list-search">
      <el-form ref="listQuery" :model="listQuery" inline>
        <el-form-item label="项目编号" prop="companyName">
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
    <!--子项目列表-->
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
        <el-table-column type="index" :index="typeIndex" label="序号" fixed="left" align="center" />
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
        <el-table-column align="center" label="操作" fixed="right">
          <template>
            <!-- <el-button
              size="small"
              plain
              type="primary"
            >修改</el-button> -->
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
    <el-dialog width="50%" class="dialog" :title="title" :visible.sync="addShow" @close="closeDialog">
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
            <el-table-column type="index" :index="typeIndex" label="序号" fixed="left" align="center" />
            <el-table-column prop="projectNo" label="项目编号" align="center" />
            <el-table-column prop="clientName" label="客户名称" align="center" />
            <el-table-column prop="projectType" label="项目类型" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.projectType === 1" style="color:#5CB89D">类型A</span>
                <span v-if="scope.row.projectType === 2" style="color:red">类型B</span>
              </template>
            </el-table-column>
            <el-table-column prop="isSplit" label="是否拆分子项目" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.isSplit === 1">是</span>
                <span v-if="scope.row.isSplit === 2">否</span>
              </template>
            </el-table-column>
            <!-- <el-table-column prop="status" label="状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 1" style="color:blue">暂存</span>
            <span v-if="scope.row.status === 2">已送审</span>
            <span v-if="scope.row.status === 3">待审批</span>
            <span v-if="scope.row.status === 4" style="color:green">已审批</span>
          </template>
        </el-table-column> -->
            <el-table-column align="center" label="操作" width="200" fixed="right">
              <template slot-scope="scope">
                <el-button size="small" plain type="primary" @click="creatChildProject(scope.$index, scope.row)">创建子项目</el-button>
                <el-button size="small" plain type="primary">详情</el-button>
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
    <el-dialog
      width="50%"
      class="dialog"
      title="新增子项目"
      :close-on-click-modal="false"
      :visible.sync="addChildShow"
      @close="closeDialog"
    >
      <div class="dialog-body">
        <el-form :model="addForm" size="small" label-width="120px" :label-position="center">
          <el-row>
            <el-col :sm="24" :md="12">
              <el-form-item label="项目编号">
                <el-input />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="客户名称">
                <el-input size="small" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="项目类型">
                <el-input size="small" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="是否拆分子项目">
                <el-select v-model="addForm.companyType" placeholder="请选择">
                  <el-option label="是" value="1" />
                  <el-option label="否" value="2" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-row v-if="addForm.companyType==1">
              <div v-for="item in addForm.childProjectArr" :key="item.childProjectNo">
                <el-col :sm="24" :md="12">
                  <el-form-item label="子项目名称">
                    <el-input />
                  </el-form-item>
                </el-col>
                <el-col :sm="24" :md="12">
                  <el-form-item label="子项目编号">
                    <el-input />
                  </el-form-item>
                </el-col>
              </div>
              <el-col :xs="24" class="btn" style="text-align:center;">
                <el-button type="parmary" icon="el-icon-plus" circle @click="timeAdd" />
              </el-col>
            </el-row>
            <el-col :sm="24" :md="12">
              <el-form-item label="支出功能分类">
                <el-input />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="国民经济分类">
                <el-input />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="风险级别">
                <el-select v-model="addForm.riskLevel" placeholder="请选择">
                  <el-option label="请选择" value />
                  <el-option label="高" value="1" />
                  <el-option label="中" value="2" />
                  <el-option label="低" value="3" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addChildShow = false">取 消</el-button>
        <el-button type="warning" @click="holdSave">暂 存</el-button>
        <el-button type="primary" @click="submitSave">提 交</el-button>
      </span>
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
        projectNo: 'P001',
        clientName: '宋江',
        projectType: 1,
        isSplit: 1,
        childProjectName: '子项目A',
        childProjectNo: 'P001A001',
        functionClassify: '',
        ecoClassify: '',
        riskLevel: 2,
        status: 1
      }, {
        projectNo: 'P002',
        clientName: '张飞',
        projectType: 2,
        isSplit: 2,
        childProjectName: '',
        childProjectNo: '',
        functionClassify: '',
        ecoClassify: '',
        riskLevel: 1,
        status: 2
      }, {
        projectNo: 'P003',
        clientName: '卢俊义',
        projectType: 1,
        isSplit: 1,
        childProjectName: '子项目B',
        childProjectNo: 'P003B001',
        functionClassify: '',
        ecoClassify: '',
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
          projectNo: 'P001',
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
