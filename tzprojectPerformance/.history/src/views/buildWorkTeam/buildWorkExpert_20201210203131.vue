<script>
/*
 * @Author: 张涛
 * @Date:   2020-12-02 09:59:11
 * @Last Modified by:   Your name
 * @Last Modified time: 2020-12-09 10:51:51
 */
</script>
<template>
  <div class="page-container">
    <div class="table-list-search">
      <el-form ref="listQuery" :model="listQuery" inline size="mini">
        <!-- <el-form-item label="项目编号" prop="companyName">
          <el-input v-model="listQuery.companyName" />
        </el-form-item> -->
        <el-form-item label="工作组名称">
          <el-input v-model="listQuery.clientCode" />
        </el-form-item>
        <el-form-item label="工作组编号">
          <el-input v-model="listQuery.clientName" />
        </el-form-item>
        <el-form-item class="table-search-button">
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="professorAdd">组建专家组</el-button>
        </el-form-item>
        <el-collapse-transition>
          <div v-show="bottomSearchBoxShow" style="display:inline-block;">
            <el-form-item label="项目名称" prop="companyName">
              <el-input v-model="listQuery.companyName" />
            </el-form-item>
            <el-form-item label="客户名称" prop="companyName">
              <el-input v-model="listQuery.companyName" />
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
        <el-table-column prop="workGroupName" label="工作组名称" align="center" />
        <el-table-column prop="workGroupNo" label="工作组编号" align="center" />
        <el-table-column prop="partner" label="项目负责合伙人" align="center" />
        <el-table-column prop="projectManager" label="项目经理" align="center" />
        <!-- <el-table-column prop="projectAid" label="项目秘书" align="center" /> -->
        <el-table-column prop="projectOutLeader" label="项目外勤主管" align="center" />
        <!-- <el-table-column prop="projectOutCrew" label="项目组员" align="center" /> -->
        <!-- <el-table-column prop="projectNo" label="项目编号" width="100" align="center" /> -->
        <el-table-column prop="projectName" label="项目名称" width="110" align="center" />
        <el-table-column prop="clientName" label="客户名称" align="center" />
        <el-table-column prop="clientName" label="客户名称" align="center" />
        <el-table-column prop="childProjectNo" label="子项目编号" width="110" align="center" />
        <el-table-column prop="childProjectName" label="子项目名称" width="110" align="center" /> -->
        <!-- <el-table-column prop="status" label="是否已组建" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status==1">已组建</span>
            <span v-if="scope.row.status==2">未组建</span>
          </template>
        </el-table-column> -->
        <el-table-column prop="buildMan" label="组建人" align="center" />
        <el-table-column prop="buildTime" label="组建时间" align="center" />
        <el-table-column align="center" label="操作" width="180" fixed="right">
          <template slot-scope="scope">
            <el-button
              size="mini"
              plain
              type="primary"
              @click="professorAdd(scope.$index, scope.row)"
            >修改</el-button>
            <el-button
              size="mini"
              plain
              type="primary"
              @click="handleDetail(scope.$index, scope.row)"
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
      width="90%"
      class="dialog"
      title="专家信息"
      :close-on-click-modal="false"
      :visible.sync="addShow"
      @close="closeDialog"
    >
      <div class="dialog-body">
        <el-form :model="addForm" size="small" label-width="140px" label-position="center">
          <el-row>
            <strong>项目基本信息</strong>
          </el-row>
          <el-divider />
          <el-row>
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
              <el-form-item label="项目编号">
                <el-input
                  v-model="addForm.projectNo"
                  disabled="disabled"
                />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="A/B/C分类">
                <el-input
                  v-model="addForm.projectType"
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
              <el-form-item label="工作组名称">
                <el-input v-model="detailForm.workGroupName" disabled />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="工作组编号">
                <el-input v-model="detailForm.workGroupNo" disabled />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="项目负责合伙人">
                <el-input v-model="detailForm.partner" disabled />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="项目经理">
                <el-input v-model="detailForm.projectManager" disabled />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="项目秘书">
                <el-input v-model="detailForm.projectAid" disabled />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="项目外勤主管">
                <el-input v-model="detailForm.projectOutLeader" disabled />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="项目组员">
                <el-input v-model="detailForm.projectOutCrew" disabled />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <strong>工作任务信息</strong>
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
          <el-row style="margin-top:20px;">
            <strong>专家组信息</strong>
          </el-row>
          <el-divider />
          <el-row>
            <el-col :xs="24" class="btn" style="text-align:left; margin-bottom:10px;">
              <el-button type="primary" icon="el-icon-circle-plus-outline" @click="partAdd">添加一行</el-button>
              <el-button type="primary" icon="el-icon-download" @click="testclick">专家导入</el-button>
            </el-col>
            <table class="detail-table">
              <tr>
                <td>专家姓名</td>
                <td>专家职称</td>
                <td>主要研究方向</td>
                <td>主要服务分所</td>
                <td>电话</td>
                <td>操作</td>
              </tr>
              <tr v-for="(item) in addForm.professorArr" :key="item.professorName">
                <td><el-input /></td>
                <td><el-input placeholder="" /></td>
                <td><el-input placeholder="" /></td>
                <td><el-input placeholder="" /></td>
                <td><el-input placeholder="" /></td>
                <td><el-button type="danger" icon="el-icon-delete" circle @click="partReduce" /></td>
              </tr>
            </table>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addShow = false">取 消</el-button>
        <el-button type="warning" @click="holdSave">暂 存</el-button>
        <el-button type="primary" @click="submitSave">提 交</el-button>
      </span>
    </el-dialog>
    <el-dialog
      width="90%"
      class="dialog"
      title="专家库信息"
      :close-on-click-modal="false"
      :visible.sync="addFrameShow"
      @close="closeDialog"
    >
      <div class="dialog-body">
        <el-form :model="addForm" size="small" label-width="120px" label-position="center">
          <el-table
            v-loading="listLoading"
            :data="professorList"
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
            <el-table-column type="selection" width="55" fixed="left" align="center" />
            <el-table-column type="index" :index="typeIndex" label="序号" fixed="left" align="center" />
            <el-table-column prop="professorName" label="专家姓名" align="center" width="120" />
            <el-table-column prop="professorLevel" label="专家级别" align="center" width="" />
            <el-table-column prop="professorTitle" label="专家职称" width="" align="center" />
            <el-table-column prop="professorEducation" label="主要研究方向" width="" align="center" />
            <el-table-column prop="professorSeverBranch" label="主要服务分所" width="" align="center" />
            <el-table-column prop="professorPhone" label="电话" width="" align="center" />
          </el-table>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addFrameShow = false">取 消</el-button>
        <!-- <el-button type="warning" @click="holdSave">暂 存</el-button> -->
        <el-button type="primary" @click="submitSave">提 交</el-button>
      </span>
    </el-dialog>
    <!-- 详情弹窗 -->
    <el-dialog
      width="90%"
      class="dialog"
      title="详情"
      :visible.sync="detailShow"
    >
      <div class="dialog-body" style="display:flex;">
        <div style="flex:4">
          <el-form :model="detailForm" size="small" inline label-width="140px" label-position="center">
            <el-row>
              <strong>项目信息</strong>
            </el-row>
            <el-divider />
            <el-row>
              <el-col :sm="24" :md="12">
                <el-form-item label="项目编号">
                  <el-input v-model="detailForm.projectNo" disabled="disabled" />
                </el-form-item>
              </el-col>
              <el-col :sm="24" :md="12">
                <el-form-item label="项目名称">
                  <el-input v-model="detailForm.projectName" disabled />
                </el-form-item>
              </el-col>
              <el-col :sm="24" :md="12">
                <el-form-item label="客户名称">
                  <el-input v-model="detailForm.clientName" disabled />
                </el-form-item>
              </el-col>
              <el-col :sm="24" :md="12">
                <el-form-item label="A/B/C分类">
                  <el-select v-model="detailForm.projectType" disabled>
                    <el-option label="A" :value="1" />
                    <el-option label="B" :value="2" />
                    <el-option label="C" :value="3" />
                  </el-select>
                </el-form-item>
              </el-col>
            <!--<el-col :sm="24" :md="12">
              <el-form-item label="子项目编号">
                <el-input v-model="detailForm.childProjectNo" disabled="disabled" />
              </el-form-item>
            </el-col> -->
            </el-row>
            <el-row>
              <strong>工作组信息</strong>
            </el-row>
            <el-divider />
            <el-row>
              <el-col :sm="24" :md="12">
                <el-form-item label="工作组名称">
                  <el-input v-model="detailForm.workGroupName" disabled />
                </el-form-item>
              </el-col>
              <el-col :sm="24" :md="12">
                <el-form-item label="工作组编号">
                  <el-input v-model="detailForm.workGroupNo" disabled />
                </el-form-item>
              </el-col>
              <el-col :sm="24" :md="12">
                <el-form-item label="项目负责合伙人">
                  <el-input v-model="detailForm.partner" disabled />
                </el-form-item>
              </el-col>
              <el-col :sm="24" :md="12">
                <el-form-item label="项目经理">
                  <el-input v-model="detailForm.projectManager" disabled />
                </el-form-item>
              </el-col>
              <el-col :sm="24" :md="12">
                <el-form-item label="项目秘书">
                  <el-input v-model="detailForm.projectAid" disabled />
                </el-form-item>
              </el-col>
              <el-col :sm="24" :md="12">
                <el-form-item label="项目外勤主管">
                  <el-input v-model="detailForm.projectOutLeader" disabled />
                </el-form-item>
              </el-col>
              <el-col :sm="24" :md="24">
                <el-form-item label="项目组员">
                  <el-input v-model="detailForm.projectOutCrew" type="textarea" disabled />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <strong>专家组信息</strong>
            </el-row>
            <el-divider />
            <el-row>
              <table class="detail-table">
                <tr>
                  <td>专家姓名</td>
                  <td>专家职称</td>
                  <td>主要研究方向</td>
                  <td>主要服务分所</td>
                  <td>电话</td>
                </tr>
                <tr v-for="(item) in addForm.professorArr" :key="item.professorName">
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
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
              <el-step title="倪小平" />
            </el-steps>
          </div>
        </div>
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
        size: 10,
        expertName: ''
      },
      addFrameShow: false,
      list: [
        {
          workGroupName: '浙江省科学技术厅-工作组',
          workGroupNo: 'G2020001',
          buildTime: '2020-12-01 11:28:12',
          buildMan: '张强',
          projectNo: '2020-05764',
          projectName: '2020-05764-01-浙江省科学技术厅',
          clientName: '浙江省科学技术厅',
          isSplit: 1,
          childProjectName: '2020-05764-01-浙江省科学技术厅-软件定制开发',
          childProjectNo: '2020-05764-01',
          partner: '倪小平',
          projectManager: '张强',
          projectAid: '贾秀林',
          projectOutLeader: '许丹一丰',
          projectOutCrew: '张涛,沈帆',
          status: 2,

        },
        {
          workGroupName: '浙江省科学技术厅-工作组',
          workGroupNo: 'G2020002',
          buildTime: '2020-12-01 11:28:12',
          buildMan: '张强',
          projectNo: '2020-05764',
          projectName: '2020-05764-01-浙江省科学技术厅',
          clientName: '浙江省科学技术厅',
          isSplit: 1,
          childProjectName: '2020-05764-01-浙江省科学技术厅-软件定制开发',
          childProjectNo: '2020-05764-01',
          partner: '倪小平',
          projectManager: '张强',
          projectAid: '贾秀林',
          projectOutLeader: '许丹一丰',
          projectOutCrew: '张涛,沈帆',
          status: 1
        },
        {
          workGroupName: '浙江省科学技术厅-工作组',
          workGroupNo: 'G2020003',
          buildTime: '2020-12-01 11:28:12',
          buildMan: '张强',
          projectNo: '2020-05764',
          projectName: '2020-05764-01-浙江省科学技术厅',
          clientName: '浙江省科学技术厅',
          isSplit: 1,
          childProjectName: '2020-05764-01-浙江省科学技术厅-软件定制开发',
          childProjectNo: '2020-05764-01',
          partner: '倪小平',
          projectManager: '张强',
          projectAid: '贾秀林',
          projectOutLeader: '许丹一丰',
          projectOutCrew: '张涛,沈帆',
          status: 2
        },
        {
          workGroupName: '浙江省科学技术厅-工作组',
          workGroupNo: 'G2020004',
          buildTime: '2020-12-01 11:28:12',
          buildMan: '张强',
          projectNo: '2020-05764',
          projectName: '2020-05764-01-浙江省科学技术厅',
          clientName: '浙江省科学技术厅',
          isSplit: 1,
          childProjectName: '2020-05764-01-浙江省科学技术厅-软件定制开发',
          childProjectNo: '2020-05764-01',
          partner: '倪小平',
          projectManager: '张强',
          projectAid: '贾秀林',
          projectOutLeader: '许丹一丰',
          projectOutCrew: '张涛,沈帆',
          status: 1
        }
      ],
      total: 1,
      addShow: false,
      bottomSearchBoxShow: false,
      detailShow: false,
      title: '',
      addForm: {
          workGroupName: '浙江省科学技术厅-工作组',
          workGroupNo: 'G2020004',
          buildTime: '2020-12-01 11:28:12',
          buildMan: '张强',
          projectNo: '2020-05764',
          projectName: '2020-05764-01-浙江省科学技术厅',
          clientName: '浙江省科学技术厅',
        professorArr: [
        {
          professorName: '',
          professorLevel: '',
          professorTitle: '',
          professorEducation: '',
          professorSeverBranch: '',
          professorPhone: ''
        }
      ]
      },
      professorList: [
        {
          professorName: '胡长飞',
          professorLevel: '教授',
          professorTitle: '正高',
          professorEducation: '政协事务',
          professorSeverBranch: '天津分所',
          professorPhone: '13587234544'
        }, {
          professorName: '罗琴',
          professorLevel: '研究员',
          professorTitle: '正高',
          professorEducation: '技术研究与开发',
          professorSeverBranch: '北京分所',
          professorPhone: '13387298023'
        }, {
          professorName: '蓝颖',
          professorLevel: '副教授',
          professorTitle: '副高',
          professorEducation: '审计事务',
          professorSeverBranch: '浙江分所',
          professorPhone: '13587263101'
        }
      ],
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
      ],
      detailForm: {
        projectNo: '2020-05764',
        projectName: '2020-05764-01-浙江省科学技术厅',
        clientName: '浙江省科学技术厅',
        isSplit: 1,
        workGroupName: '浙江省科学技术厅-工作组',
        workGroupNo: 'G-2020-002',
        childProjectName: '2020-05764-01-浙江省科学技术厅-软件定制开发',
        childProjectNo: '2020-05764-01',
        partner: '倪小平',
        projectManager: '张强',
        projectAid: '贾秀林',
        projectOutLeader: '许丹一丰',
        projectOutCrew: '张涛,沈帆',
        projectType: 1,
        professorName: '',
        professorLevel: '',
        professorTitle: '',
        professorEducation: '',
        professorSeverBranch: '',
        professorPhone: ''
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
    professorAdd() {
      this.addShow = true
    },
    closeDialog() {
      this.$refs['addForm'].resetFields()
    },
    // 展开查询更多
    searchBoxShow() {
      this.bottomSearchBoxShow = !this.bottomSearchBoxShow
    },
    testclick() {
      this.addFrameShow = true
    },
    // 添加
    partAdd() {
      // if (this.addForm.professorArr.length > 4) {
      //   this.$message({
      //     type: 'warning',
      //     message: '最多设置5个子项目!'
      //   })
      //   return false
      // }
      const timepart = {
          professorName: '',
          professorLevel: '',
          professorTitle: '',
          professorEducation: '',
          professorSeverBranch: '',
          professorPhone: ''
      }
      this.addForm.professorArr.push(timepart)
    },
    // 删除
    partReduce(index) {
      this.addForm.professorArr.splice(index, 1)
    },
    handleDetail(index, row) {
      this.detailShow = true
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .detail-table tr:first-child{
    background-color: #F5FAFF;
  }
  strong{
    color: blue;
  }
</style>
