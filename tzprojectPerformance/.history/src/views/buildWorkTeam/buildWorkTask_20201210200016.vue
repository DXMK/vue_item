<script>
/*
 * @Author:张涛
 * @Date:   2020-12-01 18:10:24
 * @Last Modified by:   Your name
 * @Last Modified time: 2020-12-09 10:30:44
 */
</script>
/* eslint-disable no-dupe-keys */
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
        <el-collapse-transition>
          <div v-show="bottomSearchBoxShow" style="display:inline-block;">
            <el-form-item label="工作组编号">
              <el-input v-model="listQuery.clientName" />
            </el-form-item>
            <el-form-item label="工作组名称">
              <el-input v-model="listQuery.clientCode" />
            </el-form-item>
            <el-form-item label="是否已分配" prop="companyName">
              <el-select>
                <el-option value="1" label="已分配" />
                <el-option value="2" label="未分配" />
              </el-select>
            </el-form-item>
          </div>
        </el-collapse-transition>
        <el-form-item>
          <el-button class="moreSearch" type="text" @click="searchBoxShow" v-text="bottomSearchBoxShow?'收起':'更多筛选'" />
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" icon="el-icon-search">查 询</el-button>
          <el-button size="mini" @click="listQueryReset">重 置</el-button>
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
        <el-table-column prop="workGroupName" label="工作组名称" width="110" align="center" />
        <el-table-column prop="workGroupNo" label="工作组编号" align="center" />
        <el-table-column prop="partner" label="项目负责合伙人" align="center" />
        <el-table-column prop="projectManager" label="项目经理" align="center" />
        <!-- <el-table-column prop="projectAid" label="项目秘书" align="center" /> -->
        <el-table-column prop="projectOutLeader" label="项目外勤主管" align="center" />
        <!-- <el-table-column prop="projectOutCrew" label="项目组员" align="center" /> -->
        <!-- <el-table-column prop="projectNo" label="项目编号" width="100" align="center" /> -->
        <el-table-column prop="projectName" label="项目名称" width="110" align="center" />
        <el-table-column prop="clientName" label="客户名称" align="center" />
        <!-- <el-table-column prop="isSplit" label="是否拆分子项目" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.isSplit === 1">是</span>
            <span v-if="scope.row.isSplit === 2">否</span>
          </template>
        </el-table-column>
        <el-table-column prop="childProjectNo" label="子项目编号" width="110" align="center" />
        <el-table-column prop="childProjectName" label="子项目名称" width="110" align="center" /> -->
        <el-table-column prop="isSure" label="是否已分配任务" width="80" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.isSure === 1">已分配</span>
            <span v-if="scope.row.isSure === 2">未分配</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="basicCondition" label="项目基本情况"  align="center"></el-table-column>
        <el-table-column prop="evaluateTarget" label="绩效评价目标"  align="center"></el-table-column>
        <el-table-column prop="workAsk" label="工作要求"  align="center"></el-table-column>
        <el-table-column prop="linkman" label="工作联系人名称"  align="center"></el-table-column>
        <el-table-column prop="linkmanPhone" label="工作联系人联系方式"  align="center"></el-table-column> -->
        <el-table-column prop="buildTime" label="最后调整时间" width="140" align="center" />
        <el-table-column prop="buildMan" label="分配人" align="center" />
        <el-table-column align="center" label="操作" width="130" fixed="right">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.isSure==2"
              size="small"
              plain
              type="primary"
              @click="taskAdd(scope.$index, scope.row)"
            >分配工作任务</el-button>
            <el-button
              v-if="scope.row.isSure==1"
              size="small"
              plain
              type="primary"
              @click="taskLook(scope.$index, scope.row)"
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
      title="评价工作任务信息"
      :close-on-click-modal="false"
      :visible.sync="addShow"
      @close="closeDialog"
    >
      <div class="dialog-body">
        <el-form :model="addForm" size="small" label-width="140px">
          <el-row>
            <strong>项目基本信息</strong>
          </el-row>
          <el-divider />
          <el-row>
            <el-col :sm="24" :md="12">
              <el-form-item label="项目编号">
                <el-input
                  v-model="addForm.projectNo"
                  placeholder="由客户名称带出"
                  disabled="disabled"
                />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="项目名称">
                <el-input
                  v-model="addForm.projectName"
                  placeholder="由客户名称带出"
                  disabled="disabled"
                />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="客户名称">
                <el-input v-model="addForm.clientName" placeholder="请输入内容" disabled />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="24">
              <el-form-item label="项目基本情况">
                <el-input type="textarea" :rows="3" placeholder="请输入" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="24">
              <el-form-item label="绩效评价目标">
                <el-input type="textarea" :rows="3" placeholder="请输入" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="工作联系人名称">
                <el-input placeholder="请输入" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="工作联系人联系方式">
                <el-input placeholder="请输入" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <strong>工作组信息</strong>
          </el-row>
          <el-divider />
          <el-row>
            <el-col :sm="24" :md="12">
              <el-form-item label="工作组编号">
                <el-input
                  v-model="addForm.workGroupNo"
                  placeholder="由子项目名称带出"
                  disabled="disabled"
                />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="工作组名称">
                <el-input
                  v-model="addForm.workGroupName"
                  placeholder="由子项目名称带出"
                  disabled="disabled"
                />
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
              <el-form-item label="项目秘书">
                <el-input
                  v-model="addForm.projectAid"
                  placeholder="由子项目名称带出"
                  disabled="disabled"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <strong>评价工作任务信息</strong>
          </el-row>
          <el-divider />
          <el-row>
            <el-col :sm="24" :md="24">
              <table class="detail-table">
                <tr>
                  <td>序号</td>
                  <td>员工编号</td>
                  <td>员工姓名</td>
                  <td>项目角色</td>
                  <td>工作任务</td>
                </tr>
                <tr v-for="(item, index) in peopleArr" :key="item.peopleName">
                  <td>{{ index + 1 }}</td>
                  <td>{{ item.peopleNo }}</td>
                  <td>{{ item.peopleName }}</td>
                  <td>{{ item.peopleRole }}</td>
                  <td><el-input type="text" /></td>
                </tr>
              </table>
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
      width="90%"
      class="dialog"
      title="详情"
      :close-on-click-modal="false"
      :visible.sync="detailShow"
      @close="closeDialog"
    >
      <div class="dialog-body">
        <el-form size="small" label-width="140px" :label-position="center">
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
          workGroupName: '浙江省科学技术厅-工作组',
          workGroupNo: 'G2020001',
          buildTime: '',
          buildMan: '',
          projectNo: '2020-05764',
          projectName: '2020-05764-01-浙江省科学技术厅',
          clientName: '浙江省科学技术厅',
          childProjectName: '2020-05764-01-浙江省科学技术厅-软件定制开发',
          childProjectNo: '2020-05764-01',
          partner: '倪小平',
          projectManager: '张强',
          projectAid: '贾秀林',
          projectOutLeader: '许丹一丰',
          projectOutCrew: '张涛,沈帆',
          isSure: 2,
          isSplit: 1
        },
        {
          workGroupName: '浙江省科学技术厅-工作组',
          workGroupNo: 'G2020002',
          buildTime: '2020-12-01 11:28:12',
          buildMan: '张强',
          projectNo: '2020-05764',
          projectName: '2020-05764-01-浙江省科学技术厅',
          clientName: '浙江省科学技术厅',
          childProjectName: '2020-05764-01-浙江省科学技术厅-软件定制开发',
          childProjectNo: '2020-05764-01',
          partner: '倪小平',
          projectManager: '张强',
          projectAid: '贾秀林',
          projectOutLeader: '许丹一丰',
          projectOutCrew: '张涛,沈帆',
          isSure: 1,
          isSplit: 1
        },
        {
          workGroupName: '浙江省科学技术厅-工作组',
          workGroupNo: 'G2020003',
          buildTime: '',
          buildMan: '',
          projectNo: '2020-05764',
          projectName: '2020-05764-01-浙江省科学技术厅',
          clientName: '浙江省科学技术厅',
          childProjectName: '2020-05764-01-浙江省科学技术厅-软件定制开发',
          childProjectNo: '2020-05764-01',
          partner: '倪小平',
          projectManager: '张强',
          projectAid: '贾秀林',
          projectOutLeader: '许丹一丰',
          projectOutCrew: '张涛,沈帆',
          isSure: 2,
          isSplit: 1
        }
      ],
      total: 1,
      addShow: false,
      detailShow: false,
      bottomSearchBoxShow: false,
      title: '',
      addForm: {
        projectNo: '2020-05764',
        projectName: '2020-05764-01-浙江省科学技术厅',
        clientName: '浙江省科学技术厅',
        childProjectName: '2020-05764-01-浙江省科学技术厅-软件定制开发',
        childProjectNo: '2020-05764-01',
        partner: '倪小平',
        projectManager: '张强',
        projectAid: '贾秀林',
        projectOutLeader: '许丹一丰',
        projectOutCrew: '张涛,沈帆',
        companyType: 1,
        workGroupName: '浙江省科学技术厅-工作组',
          workGroupNo: 'G2020003'
      },
      peopleArr: [
        {
          peopleRole: '外勤主管',
          peopleNo: '202019942',
          peopleName: '张涛',
          workAsk: ''
        }, {
          peopleRole: '组员',
          peopleNo: '202019929',
          peopleName: '沈帆',
          workAsk: ''
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
    // 展开查询更多
    searchBoxShow() {
      this.bottomSearchBoxShow = !this.bottomSearchBoxShow
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
  strong{
    color: blue;
  }
  .detail-table{
    margin-bottom: 20px;
  }
  .detail-table tr:first-child{
    background-color: #F5FAFF;
  }
</style>
