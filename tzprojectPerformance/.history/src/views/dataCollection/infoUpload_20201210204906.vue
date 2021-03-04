<script>
/*
 * @Author: zhangtao
 * @Date:   2020-12-02 11:41:43
 * @Last Modified by:   Your name
 * @Last Modified time: 2020-12-09 11:52:29
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
        <!-- <el-form-item label="客户名称" prop="companyName">
          <el-input v-model="listQuery.companyName" />
        </el-form-item> -->
        <el-form-item class="table-search-button">
          <el-button type="primary" size="mini" icon="" @click="buildList">资料上传</el-button>
        </el-form-item>
        <!-- <el-collapse-transition>
          <div v-show="bottomSearchBoxShow" style="display:inline-block;">
            <el-form-item label="项目经理">
              <el-input v-model="listQuery.clientName" />
            </el-form-item>
            <el-form-item label="项目外勤主管">
              <el-input v-model="listQuery.clientCode" />
            </el-form-item>
            <el-form-item label="拟定状态" prop="companyName">
              <el-select>
                <el-option value="1" label="未拟定" />
                <el-option value="2" label="暂存" />
                <el-option value="3" label="审批中" />
                <el-option value="4" label="已审批" />
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
        <el-form-item>
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
            <el-button size="small" type="primary">模板下载</el-button>
          </el-upload>
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
        <el-table-column prop="dataDetailList" label="项目资料名称" width="330" align="center" />
        <el-table-column prop="buildMan" label="上传人" width="" align="center" />
        <el-table-column prop="approvalTime" label="上传时间" width="" align="center" />
        <el-table-column prop="status" label="审批状态" width="" align="center">
          <template slot-scope="scope">
            <!-- <span v-if="scope.row.status === 1">未拟定</span> -->
            <span v-if="scope.row.status === 1">暂存</span>
            <span v-if="scope.row.status === 2">审核中</span>
            <span v-if="scope.row.status === 3">已审核</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="160" fixed="right">
          <template slot-scope="scope">
            <!-- <el-button
              v-if="scope.row.status === 1"
              size="small"
              plain
              type="primary"
              @click="handelAdd(scope.$index, scope.row)"
            >清单拟定</el-button> -->
            <el-button
              v-if="scope.row.status === 1"
              size="small"
              plain
              type="primary"
              @click="handelAdd(scope.$index, scope.row)"
            >修改</el-button>
            <el-button
              v-if="scope.row.status === 3||scope.row.status === 2"
              size="small"
              plain
              type="primary"
              @click="detailHandle(scope.$index, scope.row)"
            >详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog width="90%" class="dialog" title="项目资料信息" :visible.sync="addShow" @close="closeDialog">
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
            <el-table-column prop="projectName" label="项目名称" align="center" />
            <el-table-column prop="clientName" label="客户名称" align="center" />
            <el-table-column prop="projectType" label="项目类型" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.projectType === 1">A</span>
                <span v-if="scope.row.projectType === 2">B</span>
                <span v-if="scope.row.projectType === 3">C</span>
              </template>
            </el-table-column>
            <el-table-column prop="projectManager" label="项目经理" align="center" />
            <!-- <el-table-column prop="approvalTime" label="立项时间" width="140" align="center" /> -->
            <el-table-column align="center" label="操作" width="" fixed="right">
              <template slot-scope="scope">
                <el-button size="small" plain type="primary" @click="handelAdd(scope.$index, scope.row)">资料上传</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addShow = false">关 闭</el-button>
      </span>
    </el-dialog>
    <el-dialog
      width="90%"
      class="dialog"
      title="项目资料上传信息"
      :close-on-click-modal="false"
      :visible.sync="addChildShow"
      @close="closeDialog"
    >
      <div class="dialog-body">
        <el-form :model="addForm" size="small" label-width="120px" label-position="center">
          <el-row>
            <strong>项目基本信息</strong>
          </el-row>
          <el-divider />
          <el-row>
            <el-col :sm="24" :md="12">
              <el-form-item label="项目编号">
                <el-input
                  v-model="addForm.projectNo"
                  disabled="disabled"
                />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="项目名称">
                <el-input
                  v-model="addForm.projectNo"
                  disabled="disabled"
                />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="客户名称">
                <el-input v-model="addForm.clientName" placeholder="请输入内容" disabled />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="项目类型">
                <el-input v-model="addForm.projectType" disabled />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="项目负责合伙人">
                <el-input
                  v-model="addForm.partner"
                  disabled="disabled"
                />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="项目经理">
                <el-input
                  v-model="addForm.projectManager"
                  disabled="disabled"
                />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="项目外勤主管">
                <el-input
                  v-model="addForm.projectOutLeader"
                  disabled="disabled"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <strong>资料上传信息</strong>
          </el-row>
          <el-divider />
          <el-row>
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
          <el-row style="margin-top:20px;">
            <el-col>
              <el-form-item label="资料上传" label-width="100px" label-position="left">
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
        <el-button type="warning" @click="holdSave">暂 存</el-button>
        <el-button type="primary" @click="submitSave">提 交</el-button>
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
              <div style="margin-left:10px;">
                <div>资料清单附件 <span style="margin-left:30px;color:blue;cursor:pointer;">XX项目绩效评价需提供的资料清单.doc</span></div>
              </div>
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
        isSplit: 1,
        projectType: 1,
        childProjectName: '2020-05764-01-浙江省科学技术厅-软件定制开发',
        childProjectNo: '2020-05764-01',
        partner: '倪小平',
        projectManager: '张强',
        projectAid: '贾秀林',
        projectOutLeader: '许丹一丰',
        projectOutCrew: '张涛,沈帆',
        status: 1,
        dataDetailList: 'XX项目绩效评价需提供的资料清单',
        workGroupName: '2020-05764-01-浙江省科学技术厅工作组',
        workGroupNo: '',
        approvalTime: '2020-10-09 10:20:10',
        buildMan: '许丹一丰'
      }, {
        projectNo: '2020-05764',
        projectName: '2020-05764-01-浙江省科学技术厅',
        clientName: '浙江省科学技术厅',
        isSplit: 1,
        projectType: 2,
        childProjectName: '2020-05764-01-浙江省科学技术厅-软件定制开发',
        childProjectNo: '2020-05764-01',
        partner: '倪小平',
        projectManager: '张强',
        projectAid: '贾秀林',
        projectOutLeader: '许丹一丰',
        projectOutCrew: '张涛,沈帆',
        dataDetailList: 'XX项目绩效评价需提供的资料清单',
        status: 3,
        workGroupName: '2020-05764-01-浙江省科学技术厅工作组',
        workGroupNo: '',
        approvalTime: '2020-10-09 10:20:10',
        buildMan: '许丹一丰'
      }, {
        projectNo: '2020-05764',
        projectName: '2020-05764-01-浙江省科学技术厅',
        clientName: '浙江省科学技术厅',
        isSplit: 1,
        projectType: 1,
        childProjectName: '2020-05764-01-浙江省科学技术厅-软件定制开发',
        childProjectNo: '2020-05764-01',
        partner: '倪小平',
        projectManager: '张强',
        projectAid: '贾秀林',
        projectOutLeader: '许丹一丰',
        projectOutCrew: '张涛,沈帆',
        dataDetailList: 'XX项目绩效评价需提供的资料清单',
        status: 2,
        workGroupName: '2020-05764-01-浙江省科学技术厅工作组',
        workGroupNo: '',
        approvalTime: '2020-10-09 10:20:10',
        buildMan: '许丹一丰'
      }, {
        projectNo: '2020-05764',
        projectName: '2020-05764-01-浙江省科学技术厅',
        clientName: '浙江省科学技术厅',
        isSplit: 1,
        projectType: 3,
        childProjectName: '2020-05764-01-浙江省科学技术厅-软件定制开发',
        childProjectNo: '2020-05764-01',
        partner: '倪小平',
        projectManager: '张强',
        projectAid: '贾秀林',
        projectOutLeader: '许丹一丰',
        projectOutCrew: '张涛,沈帆',
        dataDetailList: 'XX项目绩效评价需提供的资料清单',
        status: 2,
        workGroupName: '2020-05764-01-浙江省科学技术厅工作组',
        workGroupNo: '',
        approvalTime: '2020-10-09 10:20:10',
        buildMan: '许丹一丰'
      }],
      total: 1,
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
        projectType: 'A',
        workGroupName: '2020-05764-01-浙江省科学技术厅工作组',
        workGroupNo: ''
      },
      detailShow: false,
      bottomSearchBoxShow: false,
      addShow: false,
      parentList: [{
        projectNo: '2020-05764',
        projectName: '2020-05764-01-浙江省科学技术厅',
        clientName: '浙江省科学技术厅',
        projectManager: '张强',
        projectType: 1
      }, {
        projectNo: '2020-05764',
        projectName: '2020-05764-01-浙江省科学技术厅',
        clientName: '浙江省科学技术厅',
        projectManager: '张强',
        projectType: 1
      }, {
        projectNo: '2020-05764',
        projectName: '2020-05764-01-浙江省科学技术厅',
        clientName: '浙江省科学技术厅',
        projectManager: '张强',
        projectType: 1
      }],
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
      }]
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
    buildList() {
      this.addShow = true
    },
    detailHandle(index, row) {
      this.detailShow = true
    }
  }
}
</script>
<style rel="stylesheet/less" lang="less" scoped>

</style>
