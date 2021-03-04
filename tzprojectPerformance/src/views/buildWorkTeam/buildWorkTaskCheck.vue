<script>
/*
 * @Author:张涛
 * @Date:   2020-12-01 18:10:24
 * @Last Modified by:   Your name
 * @Last Modified time: 2021-01-15 17:24:38
 */
</script>
/* eslint-disable no-dupe-keys */
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
        <el-form-item label="是否已分配任务" prop="companyName">
          <el-select>
            <el-option value="1" label="已分配" />
            <el-option value="2" label="未分配" />
          </el-select>
        </el-form-item>
        <el-collapse-transition>
          <div v-show="bottomSearchBoxShow" style="display:inline-block;">

            <el-form-item label="项目名称" prop="companyName">
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
        <el-table-column prop="workGroupNo" label="工作组编号" width="100" align="center" />
        <el-table-column prop="partner" label="项目负责合伙人" align="center" />
        <el-table-column prop="projectManager" label="项目经理" align="center" />
        <!-- <el-table-column prop="projectAid" label="项目秘书" align="center" /> -->
        <el-table-column prop="projectOutLeader" label="项目外勤主管" align="center" />
        <!-- <el-table-column prop="projectOutCrew" label="项目组员" align="center" /> -->
        <!-- <el-table-column prop="projectNo" label="项目编号" width="100" align="center" /> -->
        <el-table-column prop="projectName" label="项目名称" width="110" align="center" />
        <el-table-column prop="clientName" label="客户名称" align="center" />
        <el-table-column prop="riskLevel" label="风险级别" width="80" align="center">
          <template slot-scope="scope">
            <span
              v-if="scope.row.riskLevel === 1"
            >A</span>
            <span
              v-if="scope.row.riskLevel === 2"
            >B</span>
            <span
              v-if="scope.row.riskLevel === 3"
            >C</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="childProjectNo" label="子项目编号" width="110" align="center" />
        <el-table-column prop="childProjectName" label="子项目名称" width="110" align="center" /> -->
        <!-- <el-table-column prop="isSure" label="是否已分配任务" width="80" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.isSure === 1">未分配</span>
            <span v-if="scope.row.isSure === 2">分配中</span>
            <span v-if="scope.row.isSure === 3">已分配</span>
          </template>
        </el-table-column> -->
        <!-- <el-table-column prop="basicCondition" label="项目基本情况"  align="center"></el-table-column>
        <el-table-column prop="evaluateTarget" label="绩效评价目标"  align="center"></el-table-column>
        <el-table-column prop="workAsk" label="工作要求"  align="center"></el-table-column>
        <el-table-column prop="linkman" label="工作联系人名称"  align="center"></el-table-column>
        <el-table-column prop="linkmanPhone" label="工作联系人联系方式"  align="center"></el-table-column> -->
        <el-table-column prop="checkTime" label="审核时间" width="140" align="center" />
        <el-table-column prop="checkStatus" label="审核状态" align="center" />
        <el-table-column align="center" label="操作" width="150" fixed="right">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.checkStatus=='待审核'"
              size="small"
              plain
              type="primary"
              @click="checkBtn(scope.$index, scope.row)"
            >审核</el-button>
            <el-button
              size="small"
              plain
              type="primary"
              @click="taskLook(scope.$index, scope.row)"
            >详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 详情弹窗 -->
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
          <el-form :model="detailForm" size="small" label-width="140px" label-position="center">
            <el-row>
              <strong>项目信息</strong>
            </el-row>
            <el-divider />
            <el-row>
              <el-form-item label="工作组名称">
                <el-col :span="18">
                  <el-input v-model="detailForm.workGroupName" disabled />
                </el-col>
              </el-form-item>
              <el-form-item label="工作组编号">
                <el-col :span="18">
                  <el-input v-model="detailForm.workGroupNo" disabled />
                </el-col>
              </el-form-item>
              <el-form-item label="项目编号">
                <el-col :span="18">
                  <el-input v-model="detailForm.projectNo" disabled />
                </el-col>
              </el-form-item>
              <el-form-item label="项目名称">
                <el-col :span="18">
                  <el-input v-model="detailForm.projectName" disabled />
                </el-col>
              </el-form-item>
              <el-form-item label="客户名称">
                <el-col :span="18">
                  <el-input v-model="detailForm.clientName" disabled />
                </el-col>
              </el-form-item>
              <el-form-item label="风险级别">
                <el-col :span="18">
                  <el-select v-model="detailForm.riskLevel" disabled>
                    <el-option label="A" :value="1" />
                    <el-option label="B" :value="2" />
                    <el-option label="C" :value="3" />
                  </el-select>
                </el-col>
              </el-form-item>
              <el-form-item label="业务类型">
                <el-col :span="18">
                  <el-input value="非鉴证业务-政务软件服务-软件定制开发" disabled />
                </el-col>
              </el-form-item>
              <el-form-item label="项目属性">
                <el-col :span="18">
                  <el-input disabled placeholder="信息从管理平台带出" />
                </el-col>
              </el-form-item>
              <el-col :sm="24" :md="24">
                <el-form-item label="项目四级分类">
                  <el-select>
                    <el-option label="财政评价项目" :value="1" selected="selected">财政评价项目</el-option>
                    <el-option label="部门评价项目" :value="2">部门评价项目</el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-form-item label="预算支出功能分类">
                <el-col :span="18">
                  <el-input v-model="detailForm.functionClassify" disabled />
                </el-col>
              </el-form-item>
              <el-form-item label="国民经济行业分类">
                <el-col :span="18">
                  <el-input v-model="detailForm.ecoClassify" disabled />
                </el-col>
              </el-form-item>
              <!-- <el-form-item label="风险级别">
                <el-col :span="18">
                  <el-input v-model="detailForm.riskLevel" disabled />
                </el-col>
              </el-form-item> -->
              <el-form-item label="项目负责合伙人">
                <el-col :span="18">
                  <el-input v-model="detailForm.partner" disabled />
                </el-col>
              </el-form-item>
              <el-form-item label="项目经理">
                <el-col :span="18">
                  <el-input v-model="detailForm.projectManager" disabled />
                </el-col>
              </el-form-item>
              <el-form-item label="项目秘书">
                <el-col :span="18">
                  <el-input v-model="detailForm.projectAid" disabled />
                </el-col>
              </el-form-item>
            </el-row>
            <el-row>
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
              <el-step title="马辉" />
            </el-steps>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="detailShow = false">关 闭</el-button>
      </span>
    </el-dialog>
    <!-- 审核详情弹窗 -->
    <el-dialog
      width="90%"
      class="dialog"
      title="审核信息"
      :close-on-click-modal="false"
      :visible.sync="checkShow"
      @close="closeDialog"
    >
      <div class="dialog-body" style="display:flex;">
        <div style="flex:4">
          <el-form :model="detailForm" size="small" label-width="140px" label-position="center">
            <el-row>
              <strong>项目信息</strong>
            </el-row>
            <el-divider />
            <el-row>
              <el-form-item label="工作组名称">
                <el-col :span="18">
                  <el-input v-model="detailForm.workGroupName" disabled />
                </el-col>
              </el-form-item>
              <el-form-item label="工作组编号">
                <el-col :span="18">
                  <el-input v-model="detailForm.workGroupNo" disabled />
                </el-col>
              </el-form-item>
              <el-form-item label="项目编号">
                <el-col :span="18">
                  <el-input v-model="detailForm.projectNo" disabled />
                </el-col>
              </el-form-item>
              <el-form-item label="项目名称">
                <el-col :span="18">
                  <el-input v-model="detailForm.projectName" disabled />
                </el-col>
              </el-form-item>
              <el-form-item label="客户名称">
                <el-col :span="18">
                  <el-input v-model="detailForm.clientName" disabled />
                </el-col>
              </el-form-item>
              <el-form-item label="风险级别">
                <el-col :span="18">
                  <el-select v-model="detailForm.riskLevel" disabled>
                    <el-option label="A" :value="1" />
                    <el-option label="B" :value="2" />
                    <el-option label="C" :value="3" />
                  </el-select>
                </el-col>
              </el-form-item>
              <el-form-item label="业务类型">
                <el-col :span="18">
                  <el-input value="非鉴证业务-政务软件服务-软件定制开发" disabled />
                </el-col>
              </el-form-item>
              <el-form-item label="项目属性">
                <el-col :span="18">
                  <el-input disabled placeholder="信息从管理平台带出" />
                </el-col>
              </el-form-item>
              <el-col :sm="24" :md="24">
                <el-form-item label="项目四级分类">
                  <el-select>
                    <el-option label="财政评价项目" :value="1" selected="selected">财政评价项目</el-option>
                    <el-option label="部门评价项目" :value="2">部门评价项目</el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-form-item label="预算支出功能分类">
                <el-col :span="18">
                  <el-input v-model="detailForm.functionClassify" disabled />
                </el-col>
              </el-form-item>
              <el-form-item label="国民经济行业分类">
                <el-col :span="18">
                  <el-input v-model="detailForm.ecoClassify" disabled />
                </el-col>
              </el-form-item>
              <!-- <el-form-item label="风险级别">
                <el-col :span="18">
                  <el-input v-model="detailForm.riskLevel" disabled />
                </el-col>
              </el-form-item> -->
              <el-form-item label="项目负责合伙人">
                <el-col :span="18">
                  <el-input v-model="detailForm.partner" disabled />
                </el-col>
              </el-form-item>
              <el-form-item label="项目经理">
                <el-col :span="18">
                  <el-input v-model="detailForm.projectManager" disabled />
                </el-col>
              </el-form-item>
              <el-form-item label="项目秘书">
                <el-col :span="18">
                  <el-input v-model="detailForm.projectAid" disabled />
                </el-col>
              </el-form-item>
            </el-row>
            <el-row>
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
              <el-step title="马辉" />
            </el-steps>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="checkShow = false">关 闭</el-button>
        <el-button type="primary" @click="agreementSave(1)">通 过</el-button>
        <el-button type="danger" @click="agreementSave(0)">不通过</el-button>
      </span>
    </el-dialog>
    <!--审批-->
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
          workGroupName: '一般公共预算项目绩效评价-工作组',
          workGroupNo: 'G-2020-001',
          buildTime: '',
          buildMan: '',
          projectNo: '2020-07714-01-Z01',
          projectName: '2020-07714-01-Z01-天津市滨海新区财政局-一般公共预算项目绩效评价',
          clientName: '天津市滨海新区财政局',
          riskLevel: 3,
          partner: '贾立华',
          projectManager: '马辉',
          projectAid: '李宁',
          projectOutLeader: '李宁',
          projectOutCrew: '朱晓琳',
          isSure: 1,
          isSplit: 1,
          checkTime: '',
          checkStatus: '待审核'
        },
        {
          workGroupName: '一般公共预算项目绩效评价-工作组',
          workGroupNo: 'G-2020-002',
          buildTime: '2020-12-01 11:28:12',
          buildMan: '马辉',
          projectNo: '2020-07714-01-Z02',
          projectName: '2020-07714-01-Z02-天津市滨海新区财政局-一般公共预算项目绩效评价',
          clientName: '天津市滨海新区财政局',
          riskLevel: 3,
          partner: '贾立华',
          projectManager: '马辉',
          projectAid: '李宁',
          projectOutLeader: '李宁',
          projectOutCrew: '朱晓琳',
          isSure: 2,
          isSplit: 1,
          checkTime: '',
          checkStatus: '待审核'
        },
        {
          workGroupName: '内部控制体系建设-工作组',
          workGroupNo: 'G-2020-002',
          buildTime: '2020-12-01 11:28:12',
          buildMan: '马辉',
          projectNo: '2018-06470-01',
          projectName: '2018-06470-01-天津市铁路运输检察院-内部控制体系建设',
          clientName: '天津市铁路运输检察院',
          riskLevel: 3,
          partner: '贾立华',
          projectManager: '马辉',
          projectAid: '李宛昱',
          projectOutLeader: '李宛昱',
          projectOutCrew: '周梦岩',
          isSure: 3,
          isSplit: 1,
          checkTime: '2020-12-21 11:28:12',
          checkStatus: '已审核'
        }
      ],
      total: 1,
      addShow: false,
      detailShow: false,
      checkShow: false,
      detailForm: {
        workGroupName: '一般公共预算项目绩效评价-工作组',
        workGroupNo: 'G-2020-001',
        projectNo: '2020-07714-01',
        projectName: '2020-07714-01-天津市滨海新区财政局-一般公共预算项目绩效评价',
        clientName: '天津市滨海新区财政局',
        projectType: 1,
        functionClassify: '一般公共服务支出-财政事务',
        ecoClassify: '公共管理、社会保障和社会组织-国家机构-国家行政机构-经济事务管理机构',
        riskLevel: 3,
        partner: '贾立华',
        projectManager: '马辉',
        projectAid: '李宁',
        projectOutLeader: '李宁',
        projectOutCrew: '朱晓琳',
      },
      bottomSearchBoxShow: false,
      title: '',
      addForm: {
        workGroupName: '一般公共预算项目绩效评价-工作组',
        workGroupNo: 'G-2020-001',
        projectNo: '2020-07714-01',
        projectName: '2020-07714-01-天津市滨海新区财政局-一般公共预算项目绩效评价',
        clientName: '天津市滨海新区财政局',
        projectType: 1,
        functionClassify: '一般公共服务支出-财政事务',
        ecoClassify: '公共管理、社会保障和社会组织-国家机构-国家行政机构-经济事务管理机构',
        riskLevel: 3,
        partner: '贾立华',
        projectManager: '马辉',
        projectAid: '李宁',
        projectOutLeader: '李宁',
        projectOutCrew: '朱晓琳',
        buildMan: '马辉',
        buildTime: '2020-12-09 11:29:10',
        linkmanArr: [
          {
            linkmanId: '',
            linkmanName: '',
            linkmanPhone: ''
          }
        ]
      },
      peopleArr: [
        {
          peopleRole: '外勤主管',
          peopleNo: '202019942',
          peopleName: '李宁',
          workAsk: ''
        }, {
          peopleRole: '组员',
          peopleNo: '202019929',
          peopleName: '朱晓琳',
          workAsk: ''
        }
      ],
      checkForm: {
        riskLevel: 1,
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
    checkBtn() {
      this.checkShow = true
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
    closeDialog() {
      this.$refs['addForm'].resetFields()
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
            linkmanId: '',
            linkmanName: '',
            linkmanPhone: ''
      }
      this.addForm.linkmanArr.push(timepart)
    },
    // 删除
    partReduce(index) {
      this.addForm.linkmanArr.splice(index, 1)
    },
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
