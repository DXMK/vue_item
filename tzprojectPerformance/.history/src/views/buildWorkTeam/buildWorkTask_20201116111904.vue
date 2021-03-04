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
    <!-- <div class="header-operation">
      <el-button
        type="primary"
        size="small"
        @click="taskAdd"
      >任务新增</el-button>
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
        <el-table-column type="index" :index="typeIndex" label="序号" fixed="left" align="center" />
        <el-table-column prop="projectNo" label="项目编号" align="center" />
        <el-table-column prop="clientName" label="客户名称" align="center" />
        <el-table-column prop="childProjectName" label="子项目名称" align="center" />
        <el-table-column prop="childProjectNo" label="子项目编号" align="center" />
        <el-table-column prop="partner" label="项目负责合伙人" align="center" />
        <el-table-column prop="projectManager" label="项目经理" align="center" />
        <el-table-column prop="projectAid" label="项目秘书" align="center" />
        <el-table-column prop="projectOutLeader" label="项目外勤主管" align="center" />
        <el-table-column prop="projectOutCrew" label="项目组员" align="center" />
        <el-table-column prop="isSure" label="是否明确" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.isSure === 1">是</span>
            <span v-if="scope.row.isSure === 2">否</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="basicCondition" label="项目基本情况"  align="center"></el-table-column>
        <el-table-column prop="evaluateTarget" label="绩效评价目标"  align="center"></el-table-column>
        <el-table-column prop="workAsk" label="工作要求"  align="center"></el-table-column>
        <el-table-column prop="linkman" label="工作联系人名称"  align="center"></el-table-column>
        <el-table-column prop="linkmanPhone" label="工作联系人联系方式"  align="center"></el-table-column> -->
        <el-table-column align="center" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.isSure==2"
              size="small"
              plain
              type="primary"
              @click="taskAdd(scope.$index, scope.row)"
            >任务</el-button>
            <el-button
              v-if="scope.row.isSure==1"
              size="small"
              plain
              type="primary"
              @click="taskLook(scope.$index, scope.row)"
            >查看</el-button>
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
    <el-dialog
      width="60%"
      class="dialog"
      title="新增工作任务"
      :close-on-click-modal="false"
      :visible.sync="addShow"
      @close="closeDialog"
    >
      <div class="dialog-body">
        <el-form :model="addForm" size="small" label-width="140px" :label-position="center">
          <el-row>
            <el-col :sm="24" :md="12">
              <el-form-item label="客户名称">
                <el-input size="small" placeholder="请输入内容" prefix-icon="el-icon-search" />
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
              <el-form-item label="子项目名称">
                <el-input size="small" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="子项目编号">
                <el-input
                  size="small"
                  placeholder="由子项目名称带出"
                  disabled="disabled"
                />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="项目负责合伙人">
                <el-input
                  size="small"
                  placeholder="由子项目名称带出"
                  disabled="disabled"
                />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="项目经理">
                <el-input
                  placeholder="由子项目名称带出"
                  disabled="disabled"
                />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="项目秘书">
                <el-input
                  placeholder="由子项目名称带出"
                  disabled="disabled"
                />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="项目基本情况">
                <el-input />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="绩效评价目标">
                <el-input />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="工作要求">
                <el-input />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="工作联系人名称">
                <el-input />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="工作联系人联系方式">
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
    <!-- 详情弹窗 -->
    <el-dialog
      width="50%"
      class="dialog"
      title="详情"
      :visible.sync="detailShow"
    >
      <div class="dialog-body">
        <el-form :model="addForm" size="small" label-width="140px" :label-position="center">
          <el-row>
            <el-col :sm="24" :md="12">
              <el-form-item label="客户名称">
                <el-input size="small" placeholder="请输入内容" prefix-icon="el-icon-search" />
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
              <el-form-item label="子项目名称">
                <el-input size="small" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="子项目编号">
                <el-input
                  size="small"
                  placeholder="由子项目名称带出"
                  disabled="disabled"
                />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="项目负责合伙人">
                <el-input
                  size="small"
                  placeholder="由子项目名称带出"
                  disabled="disabled"
                />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="项目经理">
                <el-input
                  placeholder="由子项目名称带出"
                  disabled="disabled"
                />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="项目秘书">
                <el-input
                  placeholder="由子项目名称带出"
                  disabled="disabled"
                />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="项目基本情况">
                <el-input />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="绩效评价目标">
                <el-input />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="工作要求">
                <el-input />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="工作联系人名称">
                <el-input />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="工作联系人联系方式">
                <el-input />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="detailShow = false">关 闭</el-button>
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
          childProjectName: '子项目A',
          childProjectNo: 'P001A001',
          partner: '高球',
          projectManager: '鲁智深',
          projectAid: '潘金莲',
          projectOutLeader: '武松',
          projectOutCrew: '张三,李四',
          isSure: 1
        },
        {
          projectNo: 'P002',
          clientName: '李逵',
          childProjectName: '子项目A',
          childProjectNo: 'P001A001',
          partner: '高球',
          projectManager: '鲁智深',
          projectAid: '潘金莲',
          projectManager: '鲁智深',
          projectAid: '潘金莲',
          projectOutLeader: '武松',
          projectOutCrew: '张三,李四',
          isSure: 1
        }, {
          projectNo: 'P003',
          clientName: '卢俊义',
          childProjectName: '子项目A',
          childProjectNo: 'P001A001',
          partner: '高球',
          projectManager: '鲁智深',
          projectAid: '潘金莲',
          projectManager: '鲁智深',
          projectAid: '潘金莲',
          projectOutLeader: '武松',
          projectOutCrew: '张三,李四',
          isSure: 2
        }
      ],
      total: null,
      addShow: false,
      detailShow: false,
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
    taskAdd(index, row) {
      this.addShow = true
    },
    taskLook() {
      this.detailShow = true
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

</style>
