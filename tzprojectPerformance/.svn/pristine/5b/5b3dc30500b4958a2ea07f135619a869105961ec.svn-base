<script>
/*
 * @Author: Your name
 * @Date:   2020-12-03 10:34:06
 * @Last Modified by:   Your name
 * @Last Modified time: 2020-12-09 11:54:57
 */
</script>
<template>
  <div class="page-container">
    <div class="table-list-search">
      <el-form ref="listQuery" :model="listQuery" inline size="mini">
        <el-form-item label="项目资料名称" prop="companyName">
          <el-input v-model="listQuery.companyName" />
        </el-form-item>
        <el-form-item label="上传人" prop="companyName">
          <el-input v-model="listQuery.companyName" />
        </el-form-item>
        <el-form-item label="审批状态" prop="companyName">
          <el-select>
            <el-option value="1" label="暂存">暂存</el-option>
            <el-option value="2" label="审核中">审核中</el-option>
            <el-option value="3" label="已审核">已审核</el-option>
          </el-select>
        </el-form-item>
        <!-- <el-collapse-transition>
          <div v-show="bottomSearchBoxShow" style="display:inline-block;">
            <el-form-item label="项目经理">
              <el-input v-model="listQuery.clientName" />
            </el-form-item>
            <el-form-item label="项目外勤主管">
              <el-input v-model="listQuery.clientCode" />
            </el-form-item>
            <el-form-item label="审批状态" prop="companyName">
              <el-select>
                <el-option value="1" label="待审批" />
                <el-option value="2" label="已审批" />
              </el-select>
            </el-form-item>
          </div>
        </el-collapse-transition> -->
        <!-- <el-form-item>
          <el-button class="moreSearch" type="text" @click="searchBoxShow" v-text="bottomSearchBoxShow?'收起':'更多筛选'" />
        </el-form-item> -->
        <el-form-item>
          <el-button size="mini" type="primary" icon="el-icon-search">查 询</el-button>
          <el-button size="mini" @click="listQueryReset">重 置</el-button>
        </el-form-item>
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
        <!-- <el-table-column prop="childProjectNo" label="子项目编号" width="110" align="center" />
        <el-table-column prop="childProjectName" label="子项目名称" width="110" align="center" /> -->
        <!-- <el-table-column prop="workGroupName" label="工作组名称" width="110" align="center" />
        <el-table-column prop="workGroupNo" label="工作组编号" align="center" /> -->
        <!-- <el-table-column prop="projectNo" label="项目编号" width="100" align="center" /> -->
        <el-table-column prop="projectName" label="项目名称" width="110" align="center" />
        <el-table-column prop="clientName" label="客户名称" align="center" />
        <el-table-column prop="projectType" label="A/B/C分类" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.projectType === 1">A</span>
            <span v-if="scope.row.projectType === 2">B</span>
            <span v-if="scope.row.projectType === 3">C</span>
          </template>
        </el-table-column>
        <el-table-column prop="partner" label="项目负责合伙人" align="center" />
        <el-table-column prop="projectManager" label="项目经理" align="center" />
        <!-- <el-table-column prop="projectAid" label="项目秘书" align="center" /> -->
        <el-table-column prop="projectOutLeader" label="项目外勤主管" align="center" />
        <!-- <el-table-column prop="projectOutCrew" label="项目组员" align="center" /> -->
        <!-- <el-table-column prop="dataDetailList" label="资料清单" width="120" align="center">
          <template>
            <el-button size="small" type="primary">点击预览</el-button>
          </template>
        </el-table-column> -->
        <el-table-column prop="dataDetailList" label="项目资料名称" width="" align="center" />
        <el-table-column prop="buildMan" label="上传人" width="" align="center" />
        <el-table-column prop="approvalTime" label="上传时间" width="" align="center" />
        <el-table-column prop="status" label="审批状态" width="80" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 1">待审批</span>
            <span v-if="scope.row.status === 2">已审批</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="approvalTime" label="审批时间" width="140" align="center" /> -->
        <!-- <el-table-column prop="buildMan" label="审批人" width="140" align="center" /> -->
        <el-table-column align="center" label="操作" width="160" fixed="right">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.status === 1"
              size="small"
              plain
              type="primary"
              @click="checkBtn(scope.$index, scope.row)"
            >审批</el-button>
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
    <!--审批-->
    <el-dialog
      width="90%"
      class="dialog"
      title="审批信息"
      :close-on-click-modal="false"
      :visible.sync="approveShow"
      @close="closeDialog"
    >
      <div class="dialog-body" style="display:flex;">
        <div style="flex:4">
          <el-form :model="addForm" size="small" inline label-width="140px" label-position="center">
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
                <el-form-item label="客户名称">
                  <el-input v-model="addForm.clientName" disabled />
                </el-form-item>
              </el-col>
              <el-col :sm="24" :md="12">
                <el-form-item label="A/B/C分类">
                  <el-select v-model="addForm.projectType" disabled>
                    <el-option label="A" :value="1" />
                    <el-option label="B" :value="2" />
                    <el-option label="C" :value="3" />
                  </el-select>
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
              <strong>项目资料信息</strong>
            </el-row>
            <el-divider />
            <el-row style="margin-bottom:20px;">
              <div style="margin-left:10px;margin-bottom:10px;">已上传项目资料列表</div>
              <div class="table-list">
                <el-table
                  v-loading="listLoading"
                  :data="fileUploadList"
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
                  <el-table-column prop="fileName" label="文件名称" align="center">
                    <template slot-scope="scope">
                      <span style="color:blue;cursor:pointer;">{{ scope.row.fileName }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="fileSize" label="文件大小" align="center" />
                  <el-table-column prop="uploadMan" label="上传人" align="center" />
                  <el-table-column prop="uploadTime" label="上传时间" width="140" align="center" />
                  <el-table-column align="center" label="操作" width="" fixed="right">
                    <template slot-scope="scope">
                      <el-button size="small" plain type="primary" @click="handelAdd(scope.$index, scope.row)">下载</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
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
        <el-button @click="approveShow = false">取 消</el-button>
        <el-button type="primary" @click="agreementSave(1)">通 过</el-button>
        <el-button type="danger" @click="agreementSave(0)">不通过</el-button>
      </span>
    </el-dialog>
    <el-dialog
      width="50%"
      class="dialog"
      title="审批"
      :close-on-click-modal="false"
      :visible.sync="addCheckShow"
      @close="closeDialog"
    >
      <div class="dialog-body">
        <el-form :model="checkForm" size="small" label-width="120px" label-position="center">
          <el-row>
            <el-col :sm="24" :md="12">
              <el-form-item label="审批结果">
                <el-radio-group v-model="checkForm.riskLevel">
                  <el-radio :label="1">通过</el-radio>
                  <el-radio :label="2">不通过</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="24">
              <el-form-item label="审批意见">
                <el-input v-model="checkForm.checkResult" type="textarea" :rows="2" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="审批人">
                <span>{{ $store.state.user.name }}</span>
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="审批时间">
                <el-input v-model="checkForm.checkTime" disabled />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="附件">
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
        <el-button @click="addCheckShow = false">取 消</el-button>
        <el-button type="primary" @click="checkSave">审 批</el-button>
      </span>
    </el-dialog>
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
          <el-form :model="addForm" size="small" inline label-width="140px" label-position="center">
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
                <el-form-item label="客户名称">
                  <el-input v-model="addForm.clientName" disabled />
                </el-form-item>
              </el-col>
              <el-col :sm="24" :md="12">
                <el-form-item label="A/B/C分类">
                  <el-select v-model="addForm.projectType" disabled>
                    <el-option label="A" :value="1" />
                    <el-option label="B" :value="2" />
                    <el-option label="C" :value="3" />
                  </el-select>
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
              <strong>项目资料信息</strong>
            </el-row>
            <el-divider />
            <el-row style="margin-bottom:20px;">
              <div style="margin-left:10px;margin-bottom:10px; margin-top:20px;">已上传资料清单列表</div>
              <div class="table-list">
                <el-table
                  v-loading="listLoading"
                  :data="fileUploadList"
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
                  <el-table-column prop="fileName" label="文件名称" align="center">
                    <template slot-scope="scope">
                      <span style="color:blue;cursor:pointer;">{{ scope.row.fileName }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="fileSize" label="文件大小" align="center" />
                  <el-table-column prop="uploadMan" label="上传人" align="center" />
                  <el-table-column prop="uploadTime" label="上传时间" width="140" align="center" />
                  <el-table-column align="center" label="操作" width="" fixed="right">
                    <template slot-scope="scope">
                      <el-button size="small" plain type="primary" @click="handelAdd(scope.$index, scope.row)">下载</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
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
                    <td>许丹一丰</td>
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
        status: 1,
        projectType: 1,
        workGroupName: '2020-05764-01-浙江省科学技术厅工作组',
        workGroupNo: '',
        approvalTime: '',
        buildMan: '',
        dataDetailList: 'XX项目绩效评价需提供的资料清单'
      }, {
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
        status: 2,
        projectType: 2,
        workGroupName: '2020-05764-01-浙江省科学技术厅工作组',
        workGroupNo: '',
        approvalTime: '2020-12-02 11:12:35',
        buildMan: '张强',
        dataDetailList: 'XX项目绩效评价需提供的资料清单'
      }, {
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
        status: 2,
        projectType: 3,
        workGroupName: '2020-05764-01-浙江省科学技术厅工作组',
        workGroupNo: '',
        approvalTime: '2020-12-02 11:12:35',
        buildMan: '张强',
        dataDetailList: 'XX项目绩效评价需提供的资料清单'
      }],
      total: 1,
      addCheckShow: false,
      addChildShow: false,
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
        companyType: 1
      },
      checkForm: {
        riskLevel: null,
        checkResult: '',
        checkTime: ''
      },
      fileUploadList: [{
        fileName: '相关行业标准及专业技术规范.doc',
        fileSize: '12.2MB',
        uploadMan: '许丹一丰',
        uploadTime: '2020-12-08 19:12:22'
      }, {
        fileName: '相关行业标准及专业技术规范.doc',
        fileSize: '20.3MB',
        uploadMan: '许丹一丰',
        uploadTime: '2020-12-08 19:12:22'
      }, {
        fileName: '相关管理制度.pdf',
        fileSize: '2.8MB',
        uploadMan: '许丹一丰',
        uploadTime: '2020-12-08 19:12:22'
      }],
      detailShow: false,
      bottomSearchBoxShow: false,
      approveShow: false
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
    },
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
      // this.addCheckShow = true
      // this.currentTime()
      this.approveShow = true
    },
    agreementSave(val) {
      if (val === 1) {
        this.checkForm.riskLevel = 1
      } else if (val === 0) {
        this.checkForm.riskLevel = 2
      }
      this.addCheckShow = true
      this.currentTime()
    },
    checkSave() {
      this.addCheckShow = false
    },
    detailHandle(index, row) {
      this.detailShow = true
    }
  }
}
</script>
<style rel="stylesheet/less" lang="less" scoped>

</style>
