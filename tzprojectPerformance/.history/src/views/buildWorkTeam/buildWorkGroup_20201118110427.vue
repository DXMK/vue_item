<template>
  <div class="page-container">
    <div class="table-list-search">
      <el-form ref="listQuery" :model="listQuery" inline>
        <el-form-item label="项目编号" prop="companyName">
          <el-input v-model="listQuery.companyName" size="small" />
        </el-form-item>
        <el-form-item>
          <el-button
            size="small"
            type="primary"
            icon="el-icon-search"
          >查 询</el-button>
          <el-button size="small" @click="listQueryReset">重 置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- <div class="header-operation">
      <el-button type="primary" size="small">组 建</el-button>
    </div> -->
    <div class="table-list">
      <el-table
        :data="list"
        border
        element-loading-text="给我一点时间"
        fit
        highlight-current-row
        stripe
        v-loading="listLoading"
        header-row-class-name="table-header"
        size="small"
        max-height="420"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="index"
          :index="typeIndex"
          label="序号"
          fixed="left"
          align="center"
        />
        <el-table-column
          prop="projectNo"
          label="项目编号"
          align="center"
        />
        <el-table-column
          prop="clientName"
          label="客户名称"
          align="center"
        />
        <el-table-column prop="projectType" label="项目类型" align="center">
          <template slot-scope="scope">
            <span
              v-if="scope.row.projectType === 1"
              style="color: #5CB89D"
            >类型A</span>
            <span
              v-if="scope.row.projectType === 2"
              style="color: red"
            >类型B</span>
          </template>
        </el-table-column>
        <el-table-column prop="isSplit" label="是否拆分子项目" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.isSplit === 1">是</span>
            <span v-if="scope.row.isSplit === 2">否</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="childProjectName"
          label="子项目名称"
          align="center"
        />
        <el-table-column
          prop="childProjectNo"
          label="子项目编号"
          align="center"
        />
        <el-table-column
          prop="functionClassify"
          label="支出功能分类"
          align="center"
        />
        <el-table-column
          prop="ecoClassify"
          label="国民经济分类"
          align="center"
        />
        <el-table-column prop="riskLevel" label="风险级别" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.riskLevel === 1">高</span>
            <span v-if="scope.row.riskLevel === 2">中</span>
            <span v-if="scope.row.riskLevel === 3">低</span>
          </template>
        </el-table-column>
        <el-table-column prop="isBuild" label="是否组建" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.isBuild === 1">是</span>
            <span v-if="scope.row.isBuild === 2">否</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="projectPartnerName" label="项目负责合伙人" align="center"></el-table-column>
        <el-table-column prop="projectManager" label="项目经理" align="center"></el-table-column>
        <el-table-column prop="projectSecretary" label="项目秘书" align="center"></el-table-column> -->
        <el-table-column align="center" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.isBuild === 2"
              size="small"
              plain
              type="primary"
              @click="creatProjectGroup(scope.$index, scope.row)"
            >创建工作组</el-button>
            <el-button
              v-if="scope.row.isBuild === 1"
              size="small"
              plain
              type="primary"
            >查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        :current-page="listQuery.current"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="listQuery.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <el-dialog
      width="60%"
      class="dialog"
      title="新增工组"
      :close-on-click-modal="false"
      :visible.sync="addShow"
      @close="closeDialog"
    >
      <div class="dialog-body">
        <el-form
          :model="addForm"
          size="small"
          label-width="120px"
          :label-position="center"
        >
          <el-row>
            <el-col>
              <strong>基本团队</strong>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="24" :md="12">
              <el-form-item label="客户名称">
                <el-input placeholder="请输入内容" prefix-icon="el-icon-search" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="项目编号">
                <el-input
                  placeholder="由客户名称带出"
                  disabled="disabled"
                />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="项目负责合伙人">
                <el-input />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="项目经理">
                <el-input size="small" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="项目秘书">
                <el-input size="small" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="">
                <el-button type="primary" icon="el-icon-edit" circle title="委派" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <strong>子团队</strong>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="24" :md="12">
              <el-form-item label="子项目名称">
                <el-input placeholder="请输入内容" prefix-icon="el-icon-search" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="客户名称">
                <el-input
                  placeholder="由子项目名称带出"
                  disabled="disabled"
                />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="项目编号">
                <el-input
                  placeholder="由子项目名称带出"
                  disabled="disabled"
                />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="子项目编号">
                <el-input
                  placeholder="由子项目名称带出"
                  disabled="disabled"
                />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="项目负责合伙人">
                <el-input
                  placeholder="由子项目名称带出"
                  disabled="disabled"
                />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="项目经理">
                <el-input
                  size="small"
                  placeholder="由子项目名称带出"
                  disabled="disabled"
                />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="项目秘书">
                <el-input
                  size="small"
                  placeholder="由子项目名称带出"
                  disabled="disabled"
                />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="项目外勤主管">
                <el-input />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="项目组员">
                <el-input />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="">
                <el-button type="primary" icon="el-icon-edit" circle title="委派" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <strong>专家组</strong>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="24" :md="12">
              <el-form-item label="客户名称">
                <el-input placeholder="请输入内容" prefix-icon="el-icon-search" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="项目编号">
                <el-input
                  placeholder="由客户名称带出"
                  disabled="disabled"
                />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="专家姓名">
                <el-input />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addShow = false">取 消</el-button>
        <el-button type="warning" @click="holdSave">暂 存</el-button>
        <el-button type="primary" @click="submitSave">提 交</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { tableListMixin, globalMixin } from '@/utils/mixin'
export default {
  name: 'ProjectLedger',
  mixins: [tableListMixin, globalMixin],
  data() {
    return {
      listQuery: {
        current: 1,
        size: 10
      },
      list: [
        {
          projectNo: 'P001',
          clientName: '宋江',
          projectType: 1,
          isSplit: 1,
          childProjectName: '子项目A',
          childProjectNo: 'P001A001',
          functionClassify: '',
          ecoClassify: '',
          riskLevel: 2,
          status: 1,
          isBuild: 1
        },
        {
          projectNo: 'P002',
          clientName: '李逵',
          projectType: 1,
          isSplit: 1,
          childProjectName: '子项目A',
          childProjectNo: 'P001A001',
          functionClassify: '',
          ecoClassify: '',
          riskLevel: 2,
          status: 1,
          isBuild: 2
        }
      ],
      total: null,
      addShow: false,
      title: '',
      addForm: {
        companyType: 1
      }
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
    creatProjectGroup(index, row) {
      this.addShow = true
    },
    holdSave() {
      this.addShow = false
    },
    submitSave() {
      this.addShow = false
    },
    closeDialog() {
      this.$refs['addForm'].resetFields()
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
strong{
    color: cadetblue;
    font-weight: bold;
}
</style>
