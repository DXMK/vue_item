<!--
 * @Author: zhangtao
 * @Date: 2020-11-17 11:32:06
 * @LastEditTime: 2020-11-17 17:50:46
 * @LastEditors: Please set LastEditors
 * @Description: 审核指标设计
 * @FilePath: \newproject-develop1.0d:\tzprojectPerformance\src\views\schemeMake\schemeCompile.vue
-->
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
        <el-table-column prop="projectManager" label="项目经理" align="center" />
        <el-table-column prop="projectOutLeader" label="项目外勤主管" align="center" />
        <!-- <el-table-column prop="checkObj" label="指标体系" width="110" align="center">
          <template>
            <el-button size="small" type="primary" @click="handelAdd">点击查看</el-button>
          </template>
        </el-table-column> -->
        <el-table-column prop="approvalTime" label="设计时间" width="140" align="center" />
        <el-table-column prop="designMan" label="设计人" width="" align="center" />
        <el-table-column prop="status" label="审批状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status==1">待审批</span>
            <span v-if="scope.row.status==2">已审批</span>
          </template>
        </el-table-column>
        <el-table-column prop="checkTime" label="审批时间" width="140" align="center" />
        <el-table-column prop="checkMan" label="审批人" width="" align="center" />
        <el-table-column align="center" label="操作" width="" fixed="right">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.status==1"
              size="small"
              plain
              type="primary"
              @click="checkBtn(scope.$index, scope.row)"
            >审批</el-button>
            <el-button
              v-if="scope.row.status==2"
              size="small"
              plain
              type="primary"
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
      title="指标体系信息"
      :close-on-click-modal="false"
      :visible.sync="addChildShow"
      @close="closeDialog"
    >
      <div class="dialog-body" style="display:flex;">
        <div style="flex:4">
          <el-form :model="addForm" size="mini" label-width="120px" label-position="center">
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
                <el-form-item label="项目类型">
                  <el-input v-model="addForm.projectType" disabled />
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
              <strong>指标设计信息</strong>
            </el-row>
            <el-divider />
            <el-table
              v-loading="listLoading"
              :data="dataList"
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
              <el-table-column label="绩效评价指标体系" align="center">
                <el-table-column prop="oneLevelIndex" label="一级指标" align="center" />
                <!-- <el-table-column prop="oneScore" label="分值" align="center" /> -->
                <el-table-column prop="twoLevelIndex" label="二级指标" align="center" />
                <!-- <el-table-column prop="twoScore" label="分值" align="center" /> -->
                <el-table-column prop="threeLevelIndex" label="三级指标" align="center" />
                <el-table-column prop="threeScore" label="分值" align="center" />
                <el-table-column prop="indexExplain" label="指标解释" align="center">
                  <template slot-scope="scope">
                    <el-popover
                      placement="top-start"
                      width="200"
                      trigger="click"
                      :content="scope.row.indexExplain"
                    />
                    <span slot="reference">{{ shortName(scope.row.indexExplain) }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="indexDescription" label="指标说明" align="center">
                  <template slot-scope="scope">
                    <el-popover
                      placement="top-start"
                      width="200"
                      trigger="hover"
                      :content="scope.row.indexDescription"
                    />
                    <span slot="reference">{{ shortName(scope.row.indexDescription) }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="scoreRule" label="评价标准及评分规则" align="center" />
              </el-table-column>
            <!-- <el-table-column label="指标评价情况" align="center">
              <el-table-column prop="evaluateGoal" label="评价得分" align="center" />
              <el-table-column prop="pointsDescription" label="扣分说明" align="center" />
              <el-table-column prop="indexPerformance" label="指标完成情况" align="center" />
            </el-table-column>
            <el-table-column label="指标设计准备情况" align="center">
              <el-table-column prop="checkObj" label="考核对象" align="center" />
              <el-table-column prop="findProblem" label="发现问题" align="center" />
              <el-table-column prop="dataFrom" label="数据来源" align="center" />
              <el-table-column prop="remark" label="备注" align="center" />
            </el-table-column> -->
            </el-table>
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
        <el-button @click="addChildShow = false">关 闭</el-button>
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
// import { mapState } from 'vuex'
import { tableListMixin, globalMixin } from '@/utils/mixin'
import { shortName } from '@/utils'
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
        projectType: 1,
        isSplit: 1,
        childProjectName: '2020-05764-01-浙江省科学技术厅-软件定制开发',
        childProjectNo: '2020-05764-01',
        projectManager: '张强',
        projectOutLeader: '许丹一丰',
        childProjectLevel: 1,
        functionClassify: '一般公共服务支出-人大事务-机关服务',
        ecoClassify: '采矿业-黑色金属矿采选业-铁矿采选',
        riskLevel: 2,
        status: 1,
        approvalTime: '2020-10-09 10:20:10',
        designMan: '许丹一峰',
        checkTime: '',
        checkMan: '',
        workGroupName: '2020-05764-01-浙江省科学技术厅工作组',
        workGroupNo: ''
      }, {
        projectNo: '2020-05764',
        projectName: '2020-05764-01-浙江省科学技术厅',
        clientName: '浙江省科学技术厅',
        projectType: 1,
        isSplit: 1,
        childProjectName: '2020-05764-01-浙江省科学技术厅-软件定制开发',
        childProjectNo: '2020-05764-01',
        childProjectLevel: 1,
        projectManager: '张强',
        projectOutLeader: '许丹一丰',
        functionClassify: '一般公共服务支出-人大事务-机关服务',
        ecoClassify: '采矿业-黑色金属矿采选业-铁矿采选',
        riskLevel: 2,
        status: 2,
        approvalTime: '2020-10-09 10:20:10',
        designMan: '许丹一峰',
        checkTime: '2020-10-11 12:23:12',
        checkMan: '张强',
        workGroupName: '2020-05764-01-浙江省科学技术厅工作组',
        workGroupNo: ''
      }],
      dataList: [{
        oneLevelIndex: '决策',
        oneScore: 8,
        twoLevelIndex: '绩效目标',
        twoScore: 7,
        threeLevelIndex: '绩效指标明确性',
        threeScore: 9,
        indexExplain: '依据绩效目标设定的绩效指标是否清晰、细化、可衡量等，用以反映和考核项目绩效目标的明细化情',
        indexDescription: '评价要点：①是否将项目绩效目标细化分解为具体的绩效指标；②是否通过清晰、可衡量的指标值予以体现；③是否与项目目标任务数或计划数相对应。'
      }],
      total: 1,
      parentTotal: null,
      addCheckShow: false,
      addChildShow: false,
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
        professorArr: [
          {
            id: '',
            oneLevelIndex: '',
            oneScore: 1,
            twoLevelIndex: '',
            twoScore: 2,
            threeLevelIndex: '',
            threeScore: 3
          }
        ]
      },
      checkForm: {
        riskLevel: 1,
        checkResult: '',
        checkMan: '',
        checkTime: ''
      }
    }
  },
  //   computed: {
  //     ...mapState(['name'])
  //   },
  created() {},
  methods: {
    shortName,
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
      // this.addCheckShow = true
      // this.currentTime()
      this.addChildShow = true
    },
    agreeCheck(val) {
      this.addCheckShow = true
      this.currentTime()
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
    }
  }
}
</script>
<style rel="stylesheet/less" lang="less" scoped>
  .rowStyle{
    background-color: #F5F7FA;
  }
  .inputStyle{
    .el-input{
        width: 100px;
    }
  }
</style>
