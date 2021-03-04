<script>
/*
 * @Author: zhangtao
 * @Date:   2020-11-18 09:42:15
 * @Last Modified by:   Your name
 * @Last Modified time: 2020-12-09 14:14:01
 */
</script>
<template>
  <div class="page-container">
    <div class="table-list-search">
      <el-form ref="listQuery" :model="listQuery" inline size="mini">
        <el-form-item label="项目编号" prop="companyName">
          <el-input v-model="listQuery.companyName" />
        </el-form-item>
        <el-form-item label="项目名称" prop="companyName">
          <el-input v-model="listQuery.companyName" />
        </el-form-item>
        <el-form-item label="A/B/C分类" prop="companyName">
          <el-select>
            <el-option value="1" label="A">A</el-option>
            <el-option value="2" label="B">B</el-option>
            <el-option value="3" label="C">C</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户名称" prop="companyName">
          <el-input v-model="listQuery.companyName" />
        </el-form-item>
        <el-form-item class="table-search-button">
          <el-button size="small" type="primary">模板下载</el-button>
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
        <!-- <el-table-column type="selection" width="55" align="center" fixed="left" /> -->
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
        <el-table-column prop="projectNo" label="项目编号" width="100" align="center" />
        <el-table-column prop="projectName" label="项目名称" width="110" align="center" />
        <el-table-column prop="projectType" label="A/B/C分类" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.projectType === 1">A</span>
            <span v-if="scope.row.projectType === 2">B</span>
            <span v-if="scope.row.projectType === 3">C</span>
          </template>
        </el-table-column>
        <el-table-column prop="clientName" label="客户名称" align="center" />
        <el-table-column prop="projectPartnerName" label="项目负责合伙人" align="center" />
        <el-table-column prop="projectManager" label="项目经理" align="center" />
        <!-- <el-table-column prop="projectSecretary" label="项目秘书" align="center" /> -->
        <el-table-column prop="designMan" label="拟定人" width="" align="center" />
        <el-table-column prop="approvalTime" label="拟定时间" width="140" align="center" />
        <el-table-column prop="status" label="拟定状态" width="80" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 1">未拟定</span>
            <span v-if="scope.row.status === 2">已拟定</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="140" fixed="right">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.status === 1"
              size="small"
              plain
              type="primary"
              @click="handelAdd(scope.$index, scope.row)"
            >拟定调研安排</el-button>
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
    <el-dialog
      width="90%"
      class="dialog"
      title="详情"
      :close-on-click-modal="false"
      :visible.sync="detailShow"
      @close="closeDialog"
    >
      <div class="dialog-body" style="display:flex;">
        <div style="flex:4">
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
                <el-form-item label="A/B/C分类">
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
              <strong>调研安排信息</strong>
            </el-row>
            <el-divider />
            <el-row>
              <table class="detail-table">
                <tr>
                  <td>序号</td>
                  <td>名称</td>
                  <td>文件记录</td>
                  <td>操作</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>调研安排模板</td>
                  <td class="partStyle">调研安排模板.doc</td>
                  <td><el-button size="mini" plain type="primary">下载</el-button></td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>调研地安排</td>
                  <td class="partStyle">调研地安排表.doc</td>
                  <td><el-button size="mini" plain type="primary">查看</el-button></td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>调研行程安排</td>
                  <td class="partStyle">调研行程安排表.pdf</td>
                  <td><el-button size="mini" plain type="primary">查看</el-button></td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>调研人员安排</td>
                  <td class="partStyle">调研人员安排表.doc</td>
                  <td><el-button size="mini" plain type="primary">查看</el-button></td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>调研差费旅备用金申请表</td>
                  <td class="partStyle">调研差费旅备用金申请表.doc</td>
                  <td><el-button size="mini" plain type="primary">查看</el-button></td>
                </tr>
                <tr>
                  <td>6</td>
                  <td>出差调研注意事项</td>
                  <td class="partStyle">出差调研注意事项.doc</td>
                  <td><el-button size="mini" plain type="primary">查看</el-button></td>
                </tr>
              </table>
            </el-row>
            <el-row>
              <strong>审批记录信息</strong>
            </el-row>
            <el-divider />
            <el-row>
              <el-col :sm="24" :md="24">
                <table class="detail-table">
                  <tr>
                    <td>审批结果</td>
                    <td>审批意见</td>
                    <td>审批人</td>
                    <td>审批时间</td>
                  </tr>
                  <tr>
                    <td>通过</td>
                    <td>同意</td>
                    <td>许丹一峰</td>
                    <td>2020-12-02 11:29:39</td>
                  </tr>
                  <tr>
                    <td>通过</td>
                    <td>同意</td>
                    <td>张强</td>
                    <td>2020-12-03 15:49:25</td>
                  </tr>
                </table>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div style="flex:2;">
          <el-row style="text-align:center;">
            <strong>审批流程节点信息</strong>
          </el-row>
          <div class="stepContent">
            <el-steps direction="vertical" :active="2" finish-status="success">
              <el-step title="许丹一丰" description="2020-12-02 11:29:39" />
              <el-step title="张强" description="2020-12-03 15:49:25" />
              <el-step title="倪小平" description="" />
            </el-steps>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="detailShow = false">关 闭</el-button>
      </span>
    </el-dialog>
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
      title="调研安排信息"
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
              <el-form-item label="A/B/C分类">
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
            <strong>调研安排信息</strong>
          </el-row>
          <el-divider />
          <el-row>
            <table class="detail-table">
              <tr>
                <td>序号</td>
                <td>名称</td>
                <td>文件记录</td>
                <td>操作</td>
              </tr>
              <tr>
                <td>1</td>
                <td>调研安排模板</td>
                <td class="partStyle">调研安排模板.doc</td>
                <td><el-button size="mini" plain type="primary">下载</el-button></td>
              </tr>
              <tr>
                <td>2</td>
                <td>调研地安排</td>
                <td class="partStyle">调研地安排表.doc</td>
                <td><el-button size="mini" plain type="primary">上传</el-button></td>
              </tr>
              <tr>
                <td>3</td>
                <td>调研行程安排</td>
                <td class="partStyle">调研行程安排表.pdf</td>
                <td><el-button size="mini" plain type="primary">上传</el-button></td>
              </tr>
              <tr>
                <td>4</td>
                <td>调研人员安排</td>
                <td class="partStyle">调研人员安排表.doc</td>
                <td><el-button size="mini" plain type="primary">上传</el-button></td>
              </tr>
              <tr>
                <td>5</td>
                <td>调研差费旅备用金申请表</td>
                <td class="partStyle">调研差费旅备用金申请表.doc</td>
                <td><el-button size="mini" plain type="primary">上传</el-button></td>
              </tr>
              <tr>
                <td>6</td>
                <td>出差调研注意事项</td>
                <td class="partStyle">出差调研注意事项.doc</td>
                <td><el-button size="mini" plain type="primary">上传</el-button></td>
              </tr>
            </table>
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
        status: 1,
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
        projectType: 1,
        isSplit: 1,
        childProjectName: '2020-05764-01-浙江省科学技术厅-软件定制开发',
        childProjectNo: '2020-05764-01',
        childProjectLevel: 1,
        functionClassify: '一般公共服务支出-人大事务-机关服务',
        ecoClassify: '采矿业-黑色金属矿采选业-铁矿采选',
        riskLevel: 3,
        status: 2,
        approvalTime: '2020-10-09 10:20:10',
        workGroupName: '2020-05764-01-浙江省科学技术厅工作组',
        workGroupNo: '',
        projectPartnerName: '倪小平',
        projectManager: '张强',
        designMan: '许丹一峰'
      }],
      total: 2,
      addChildShow: false,
      detailShow: false,
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
        projectOutLeader: '许丹一丰'
      },
      multipleSelection: []
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
    handleSelectionChange(selection, row) {
      this.multipleSelection = selection
    },
    handelAdd() {
      // if (this.multipleSelection.length <= 0) {
      //   this.$alert('请勾选要操作的项目！', '温馨提示', {
      //     confirmButtonText: '确定',
      //     type: 'warning'
      //   })
      //   return
      // } else if (this.multipleSelection.length > 1) {
      //   this.$alert('您只能勾选一条订单操作！', '温馨提示', {
      //     confirmButtonText: '确定',
      //     type: 'warning'
      //   })
      //   return
      // } else {
        this.addChildShow = true
      // }
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
    detailHandle(index, row) {
      this.detailShow = true
    }
  }
}
</script>
<style rel="stylesheet/less" lang="less" scoped>
.partStyle{
  color: blue;
  cursor: pointer;
}
.detail-table tr:first-child{
  background-color: #FAF5FF;
}
</style>
