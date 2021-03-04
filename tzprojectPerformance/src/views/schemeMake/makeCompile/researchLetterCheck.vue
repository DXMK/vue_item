<script>
/*
 * @Author: zhangtao
 * @Date:   2020-11-19 09:42:15
 * @Last Modified by:   Your name
 * @Last Modified time: 2020-12-22 14:51:57
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
        <el-form-item label="风险级别" prop="companyName">
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
        </el-table-column>
        <el-table-column prop="approvalTime" label="申请时间" width="140" align="center" /> -->
        <!-- <el-table-column prop="workGroupName" label="工作组名称" width="110" align="center" />
        <el-table-column prop="workGroupNo" label="工作组编号" align="center" /> -->
        <el-table-column prop="projectName" label="项目名称" width="130" align="center" />
        <el-table-column prop="projectNo" label="项目编号" width="130" align="center" />
        <el-table-column prop="riskLevel" label="风险级别" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.riskLevel === 1">A</span>
            <span v-if="scope.row.riskLevel === 2">B</span>
            <span v-if="scope.row.riskLevel === 3">C</span>
          </template>
        </el-table-column>
        <el-table-column prop="clientName" label="客户名称" align="center" />
        <el-table-column prop="approvalTime" label="拟定时间" width="140" align="center" />
        <el-table-column prop="designMan" label="拟定人" width="" align="center" />
        <el-table-column prop="checkTime" label="审核时间" width="140" align="center" />
        <!-- <el-table-column prop="checkMan" label="审核人" width="" align="center" /> -->
        <el-table-column prop="status" label="审核状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status==1">待审核</span>
            <span v-if="scope.row.status==2">已审核</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.status === 1"
              size="small"
              plain
              type="primary"
              @click="checkBtn(scope.$index, scope.row)"
            >审核</el-button>
            <el-button
              v-if="scope.row.status === 2"
              size="small"
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
    <!--审批-->
    <el-dialog
      width="90%"
      class="dialog"
      title="调研函信息"
      :close-on-click-modal="false"
      :visible.sync="addChildShow"
      @close="closeDialog"
    >
      <div class="dialog-body" style="display:flex;">
        <div style="flex:4">
          <el-form :model="addForm" size="small" label-width="140px">
            <el-row>
              <strong>项目信息</strong>
            </el-row>
            <el-divider />
            <el-row>
              <el-col :sm="24" :md="24">
                <el-form-item label="项目名称">
                  <el-input v-model="addForm.projectName" disabled />
                </el-form-item>
              </el-col>
              <el-col :sm="24" :md="12">
                <el-form-item label="项目编号">
                  <el-input v-model="addForm.projectNo" disabled />
                </el-form-item>
              </el-col>
              <el-col :sm="24" :md="12">
                <el-form-item label="客户名称">
                  <el-input v-model="addForm.clientName" disabled />
                </el-form-item>
              </el-col>
              <el-col :sm="24" :md="12">
                <el-form-item label="业务类型">
                  <el-input value="非鉴证业务-政务软件服务-软件定制开发" disabled />
                </el-form-item>
              </el-col>
              <el-col :sm="24" :md="12">
                <el-form-item label="项目属性">
                  <el-input disabled placeholder="信息从管理平台带出" />
                </el-form-item>
              </el-col>
              <el-col :sm="24" :md="12">
                <el-form-item label="财政合并项目">
                  <el-select>
                    <el-option label="财政评价项目" :value="1" selected="selected">财政评价项目</el-option>
                    <el-option label="部门评价项目" :value="2">部门评价项目</el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :sm="24" :md="12">
                <el-form-item label="风险级别">
                  <el-input v-model="addForm.riskLevel" disabled />
                </el-form-item>
              </el-col>
              <el-form-item label="预算支出功能分类">
                <el-col :span="24">
                  <el-input v-model="addForm.functionClassify" disabled />
                </el-col>
              </el-form-item>
              <el-form-item label="国民经济行业分类">
                <el-col :span="24">
                  <el-input v-model="addForm.ecoClassify" disabled />
                </el-col>
              </el-form-item>
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
              <strong>调研函信息</strong>
            </el-row>
            <el-divider />
            <el-row>
              <!-- <el-col :sm="24" :md="12">
              <el-form-item label="调研函模板">
                <el-button size="small" type="primary">下载模板</el-button>
              </el-form-item>
            </el-col> -->
              <el-col :sm="24" :md="12">
                <el-form-item label="调研函">
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
                    <el-button size="small" type="primary">点击查看</el-button>
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row style="margin-top:20px;">
              <strong>审批记录信息</strong>
            </el-row>
            <el-divider />
            <el-row>
              <el-col :sm="24" :md="24">
                <table class="detail-table">
                  <tr>
                    <td>序号</td>
                    <td>审批结果</td>
                    <td>审批意见</td>
                    <td>审批人</td>
                    <td>审批时间</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>通过</td>
                    <td>同意</td>
                    <td>李宁</td>
                    <td>2020-12-02 11:29:39</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>通过</td>
                    <td>同意</td>
                    <td>马辉</td>
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
              <el-step title="李宁" description="2020-12-02 11:29:39" />
              <el-step title="马辉" description="2020-12-03 15:49:25" />
              <el-step title="贾立华" description="" />
            </el-steps>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addChildShow = false">取 消</el-button>
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
      title="调研函详情信息"
      :close-on-click-modal="false"
      :visible.sync="detailShow"
      @close="closeDialog"
    >
      <div class="dialog-body" style="display:flex;">
        <div style="flex:4">
          <el-form :model="addForm" size="small" label-width="140px">
            <el-row>
              <strong>项目信息</strong>
            </el-row>
            <el-divider />
            <el-row>
              <el-col :sm="24" :md="24">
                <el-form-item label="项目名称">
                  <el-input v-model="addForm.projectName" disabled />
                </el-form-item>
              </el-col>
              <el-col :sm="24" :md="12">
                <el-form-item label="项目编号">
                  <el-input v-model="addForm.projectNo" disabled />
                </el-form-item>
              </el-col>
              <el-col :sm="24" :md="12">
                <el-form-item label="客户名称">
                  <el-input v-model="addForm.clientName" disabled />
                </el-form-item>
              </el-col>
              <el-col :sm="24" :md="12">
                <el-form-item label="业务类型">
                  <el-input value="非鉴证业务-政务软件服务-软件定制开发" disabled />
                </el-form-item>
              </el-col>
              <el-col :sm="24" :md="12">
                <el-form-item label="项目属性">
                  <el-input disabled placeholder="信息从管理平台带出" />
                </el-form-item>
              </el-col>
              <el-col :sm="24" :md="12">
                <el-form-item label="财政合并项目">
                  <el-select>
                    <el-option label="财政评价项目" :value="1" selected="selected">财政评价项目</el-option>
                    <el-option label="部门评价项目" :value="2">部门评价项目</el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :sm="24" :md="12">
                <el-form-item label="风险级别">
                  <el-input v-model="addForm.riskLevel" disabled />
                </el-form-item>
              </el-col>
              <el-form-item label="预算支出功能分类">
                <el-col :span="24">
                  <el-input v-model="addForm.functionClassify" disabled />
                </el-col>
              </el-form-item>
              <el-form-item label="国民经济行业分类">
                <el-col :span="24">
                  <el-input v-model="addForm.ecoClassify" disabled />
                </el-col>
              </el-form-item>
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
              <strong>调研函信息</strong>
            </el-row>
            <el-divider />
            <el-row>
              <!-- <el-col :sm="24" :md="12">
              <el-form-item label="调研函模板">
                <el-button size="small" type="primary">下载模板</el-button>
              </el-form-item>
            </el-col> -->
              <el-col :sm="24" :md="12">
                <el-form-item label="调研函">
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
                    <el-button size="small" type="primary">点击查看</el-button>
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row style="margin-top:20px;">
              <strong>审批记录信息</strong>
            </el-row>
            <el-divider />
            <el-row>
              <el-col :sm="24" :md="24">
                <table class="detail-table">
                  <tr>
                    <td>序号</td>
                    <td>审批结果</td>
                    <td>审批意见</td>
                    <td>审批人</td>
                    <td>审批时间</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>通过</td>
                    <td>同意</td>
                    <td>李宁</td>
                    <td>2020-12-02 11:29:39</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>通过</td>
                    <td>同意</td>
                    <td>马辉</td>
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
              <el-step title="李宁" description="2020-12-02 11:29:39" />
              <el-step title="马辉" description="2020-12-03 15:49:25" />
              <el-step title="贾立华" description="" />
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
      list: [{
        projectNo: '2020-07714-01-Z01',
        projectName: '2020-07714-01-Z01天津市滨海新区财政局-一般公共预算项目绩效评价',
        clientName: '天津市滨海新区财政局',
        projectType: 1,
        projectOutLeader: '李宁',
        projectPartnerName: '贾立华',
        projectManager: '马辉',
        riskLevel: 3,
        status: 2,
        approvalTime: '2020-10-09 10:20:10',
        designMan: '李宁',
        checkTime: '2020-11-09 10:40:12',
        checkMan: '张强'
      }, {
        projectNo: '2018-06470-01',
        projectName: '2018-06470-01-天津市铁路运输检察院-内部控制体系建设',
        clientName: '天津市铁路运输检察院',
        projectType: 2,
        projectOutLeader: '李宛昱',
        projectPartnerName: '贾立华',
        projectManager: '马辉',
        riskLevel: 3,
        status: 1,
        approvalTime: '2020-10-09 10:20:10',
        designMan: '许丹一丰',
        checkTime: '',
        checkMan: ''
      }],
      total: 1,
      addCheckShow: false,
      title: '',
      addForm: {
        projectNo: '2018-06470-01',
        projectName: '2018-06470-01-天津市铁路运输检察院-内部控制体系建设',
        clientName: '天津市铁路运输检察院',
        projectType: 'A',
        projectOutLeader: '李宛昱',
        partner: '贾立华',
        projectManager: '马辉',
        projectAid: '李宛昱',
        functionClassify: '一般公共服务支出-财政事务',
        ecoClassify: '公共管理、社会保障和社会组织-国家机构-国家行政机构-经济事务管理机构',
        riskLevel: 'C'
      },
      checkForm: {
        riskLevel: null,
        checkResult: '',
        checkMan: '',
        checkTime: ''
      },
      addChildShow: false,
      detailShow: false
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
    checkBtn(index, row) {
      this.addChildShow = true
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
    handleDetail() {
      this.detailShow = true
    },
    checkSave() {
      this.addCheckShow = false
    }
  }
}
</script>
<style rel="stylesheet/less" lang="less" scoped>
.detail-table tr:first-child{
  background-color: #F5FAFF;
}
</style>
