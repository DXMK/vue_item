<script>
/*
 * @Author: zhangtao
 * @Date:   2020-11-18 16:32:05
 * @Last Modified by:   Your name
 * @Last Modified time: 2020-12-09 20:09:01
 */
</script>
<template>
  <div class="page-container">
    <div class="table-list-search">
      <el-form ref="listQuery" :model="listQuery" inline size="mini">
        <el-form-item label="项目名称" prop="companyName">
          <el-input v-model="listQuery.companyName" />
        </el-form-item>
        <el-form-item label="项目编号" prop="companyName">
          <el-input v-model="listQuery.companyName" />
        </el-form-item>
        <el-form-item label="项目类型" prop="companyName">
          <el-select>
            <el-option value="1" label="A">A</el-option>
            <el-option value="2" label="B">B</el-option>
            <el-option value="3" label="C">C</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户名称" prop="companyName">
          <el-input v-model="listQuery.companyName" />
        </el-form-item>
        <el-row>
          <el-form-item>
            <el-button size="mini" type="primary" icon="el-icon-search">查 询</el-button>
            <el-button size="mini" @click="listQueryReset">重 置</el-button>
          </el-form-item>
        </el-row>
      </el-form>
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
        <el-table-column type="index" :index="typeIndex" label="序号" fixed="left" align="center" />
        <!-- <el-table-column prop="childProjectNo" label="子项目编号" align="center" width="120" />
        <el-table-column prop="childProjectName" label="子项目名称" align="center" width="280" />
        <el-table-column prop="childProjectLevel" label="所属级别" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.childProjectLevel === 1">A</span>
            <span v-if="scope.row.childProjectLevel === 2">B</span>
            <span v-if="scope.row.childProjectLevel === 3">C</span>
          </template>
        </el-table-column>
        <el-table-column prop="functionClassify" label="支出功能分类" width="230" align="center" />
        <el-table-column prop="ecoClassify" label="国民经济分类" width="220" align="center" />
        <el-table-column prop="riskLevel" label="风险级别" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.riskLevel === 1">高</span>
            <span v-if="scope.row.riskLevel === 2">中</span>
            <span v-if="scope.row.riskLevel === 3">低</span>
          </template>
        </el-table-column> -->
        <!-- <el-table-column prop="workGroupName" label="工作组名称" width="110" align="center" />
        <el-table-column prop="workGroupNo" label="工作组编号" align="center" /> -->
        <el-table-column prop="projectName" label="项目名称" width="140" align="center" />
        <el-table-column prop="projectNo" label="项目编号" width="100" align="center" />
        <el-table-column prop="projectType" label="项目类型" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.projectType === 1">A</span>
            <span v-if="scope.row.projectType === 2">B</span>
            <span v-if="scope.row.projectType === 3">C</span>
          </template>
        </el-table-column>
        <el-table-column prop="clientName" label="客户名称" align="center" />
        <el-table-column prop="designMan" label="编制人" width="" align="center" />
        <el-table-column prop="approvalTime" label="编制时间" width="140" align="center" />
        <el-table-column prop="status" label="编制状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status==1">未编制</span>
            <span v-if="scope.row.status==2">已编制</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="130" fixed="right">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.status === 1"
              size="small"
              plain
              type="primary"
              @click="handelAdd(scope.$index, scope.row)"
            >编制方案</el-button>
            <el-button
              v-if="scope.row.status === 2"
              size="small"
              plain
              type="primary"
              @click="detailHandle(scope.$index, scope.row)"
            >详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- <div class="pagination-container">
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
    </div> -->
    <el-dialog
      width="80%"
      class="dialog"
      title="评价工作方案信息"
      :close-on-click-modal="false"
      :visible.sync="addChildShow"
      @close="closeDialog"
    >
      <div class="dialog-body">
        <el-form :model="addForm" size="small" label-width="180px" label-position="center">
          <el-row>
            <strong>项目信息</strong>
          </el-row>
          <el-divider />
          <el-row>
            <el-col :sm="24" :md="12">
              <el-form-item label="项目编号">
                <el-input v-model="addForm.projectNo" disabled />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="项目名称">
                <el-input v-model="addForm.projectName" disabled />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="项目类型">
                <el-input v-model="addForm.projectType" disabled />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="客户名称">
                <el-input v-model="addForm.clientName" disabled />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="项目负责合伙人">
                <el-input
                  v-model="addForm.partner"
                  placeholder="由子项目名称带出"
                  disabled="disabled"
                />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="项目经理">
                <el-input
                  v-model="addForm.projectManager"
                  placeholder="由子项目名称带出"
                  disabled="disabled"
                />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="项目外勤主管">
                <el-input
                  v-model="addForm.projectOutLeader"
                  placeholder="由子项目名称带出"
                  disabled="disabled"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <strong>评价工作方案</strong>
          </el-row>
          <el-divider />
          <el-row>
            <el-col :sm="24" :md="24">
              <el-form-item label="评价工作方案模板">
                <el-button size="small" type="primary">下载模板</el-button>
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="评价工作方案">
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
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addChildShow = false">取 消</el-button>
        <!-- <el-button type="warning" @click="holdSave">暂 存</el-button> -->
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
      list: [{
        projectNo: '2020-05764',
        projectName: '2020-05764-01-浙江省科学技术厅',
        clientName: '浙江省科学技术厅',
        projectType: 1,
        isSplit: 1,
        childProjectName: '2020-05764-01-浙江省科学技术厅-软件定制开发',
        childProjectNo: '2020-05764-01',
        childProjectLevel: 1,
        functionClassify: '一般公共服务支出-人大事务-机关服务',
        ecoClassify: '采矿业-黑色金属矿采选业-铁矿采选',
        riskLevel: 2,
        status: 2,
        approvalTime: '2020-10-09 10:20:10',
        workGroupName: '2020-05764-01-浙江省科学技术厅工作组',
        workGroupNo: '',
        projectPartnerName: '倪小平',
        projectManager: '张强',
        designMan: '许丹一峰'
      }, {
        projectNo: '2020-05764',
        projectName: '2020-05764-01-浙江省科学技术厅',
        clientName: '浙江省科学技术厅',
        projectType: 2,
        isSplit: 1,
        childProjectName: '2020-05764-01-浙江省科学技术厅-软件定制开发',
        childProjectNo: '2020-05764-01',
        childProjectLevel: 1,
        functionClassify: '一般公共服务支出-人大事务-机关服务',
        ecoClassify: '采矿业-黑色金属矿采选业-铁矿采选',
        riskLevel: 2,
        status: 1,
        approvalTime: '',
        workGroupName: '2020-05764-01-浙江省科学技术厅工作组',
        workGroupNo: '',
        projectPartnerName: '倪小平',
        projectManager: '张强',
        designMan: ''
      }],
      total: 1,
      addChildShow: false,
      addCheckShow: false,
      title: '',
      addForm: {
        projectNo: '2020-05764',
        projectName: '2020-05764-01-浙江省科学技术厅',
        clientName: '浙江省科学技术厅',
        workGroupName: '2020-05764-01-浙江省科学技术厅工作组',
        workGroupNo: '',
        partner: '倪小平',
        projectManager: '张强',
        projectAid: '贾秀林',
        projectOutLeader: '许丹一丰',
        projectType: 'A'
      },
      checkForm: {
        riskLevel: null,
        checkResult: '',
        checkMan: '',
        checkTime: ''
      }
    }
  },
  methods: {
    currentTime() {
      const date = new Date()
      const year = date.getFullYear()
      const mon = date.getMonth() + 1
      const da = date.getDate()
      const h = date.getHours()
      const m = date.getMinutes()
      const s = date.getSeconds()
      const timeStr = year + '年' + mon + '月' + da + '日' + ' ' + h + ':' + m + ':' + s
      this.checkForm.checkTime = timeStr
      console.log(this.checkForm.checkTime)
    },
    // 获取列表
    getList() {},
    // 搜索
    onSeaech() {},
    // 重置
    listQueryReset() {
      this.$refs['listQuery'].resetFields()
    },
    handelAdd() {
      this.addChildShow = true
    },
    closeDialog() {
      this.$refs['addForm'].resetFields()
    },
    holdSave() {
      this.addChildShow = false
    },
    submitSave() {
      this.addChildShow = false
    },
    checkBtn(index, row) {
      this.addCheckShow = true
      this.currentTime()
    },
    checkSave() {
      this.addCheckShow = false
    }
  }
}
</script>
<style rel="stylesheet/less" lang="less" scoped>

</style>
