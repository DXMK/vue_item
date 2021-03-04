<!--
 * @Author: zhangtao
 * @Date: 2020-11-17 11:32:06
 * @LastEditTime: 2020-11-17 17:50:46
 * @LastEditors: Please set LastEditors
 * @Description: 指标设计
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
        <!-- <el-form-item class="table-search-button">
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="handelAdd">设计指标体系</el-button>
        </el-form-item> -->
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
        <!-- <el-table-column prop="workGroupName" label="工作组名称" width="110" align="center" />
        <el-table-column prop="workGroupNo" label="工作组编号" align="center" /> -->
        <el-table-column prop="projectName" label="项目名称" width="110" align="center" />
        <el-table-column prop="projectNo" label="项目编号" width="100" align="center" />
        <el-table-column prop="projectType" label="项目类型" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.projectType === 1">A</span>
            <span v-if="scope.row.projectType === 2">B</span>
            <span v-if="scope.row.projectType === 3">C</span>
          </template>
        </el-table-column>
        <el-table-column prop="clientName" label="客户名称" align="center" />
        <el-table-column prop="projectPartnerName" label="项目负责合伙人" align="center" />
        <el-table-column prop="projectManager" label="项目经理" align="center" />
        <el-table-column prop="projectOutLeader" label="项目外勤主管" align="center" />
        <el-table-column prop="approvalTime" label="设计时间" width="140" align="center" />
        <el-table-column prop="designMan" label="设计人" width="" align="center" />
        <el-table-column prop="designStatus" label="设计状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.designStatus==1">未设计</span>
            <span v-if="scope.row.designStatus==2">暂存</span>
            <span v-if="scope.row.designStatus==3">已设计</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="160" fixed="right">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.designStatus==1"
              size="mini"
              plain
              type="primary"
              @click="handelAdd(scope.$index, scope.row)"
            >设计指标体系</el-button>
            <el-button
              v-if="scope.row.designStatus==2"
              size="mini"
              plain
              type="primary"
              @click="handelAdd(scope.$index, scope.row)"
            >修改指标体系</el-button>
            <el-button
              v-if="scope.row.designStatus==3"
              size="mini"
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
      width="90%"
      class="dialog"
      title="项目支出绩效评价指标库"
      :close-on-click-modal="false"
      :visible.sync="addFrameShow"
      @close="closeDialog"
    >
      <div class="dialog-body">
        <el-form :model="addForm" size="small" label-width="120px" label-position="center">
          <el-table
            v-loading="listLoading"
            :data="indexList"
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
            <el-table-column prop="indexCode" label="指标编码" align="center" width="120" />
            <el-table-column prop="" label="绩效指标" align="center" width="">
              <el-table-column prop="indexOneLevel" label="一级指标" width="" align="center" />
              <el-table-column prop="indexTwoLevel" label="二级指标" width="" align="center" />
              <el-table-column prop="indexThreeLevel" label="三级指标" width="" align="center" />
            </el-table-column>
            <el-table-column prop="indexExplain" label="指标解释" width="" align="center" />
          </el-table>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addFrameShow = false">取 消</el-button>
        <!-- <el-button type="warning" @click="holdSave">暂 存</el-button> -->
        <el-button type="primary" @click="submitSave">提 交</el-button>
      </span>
    </el-dialog>
    <el-dialog
      width="90%"
      class="dialog"
      title="拟定指标体系"
      :close-on-click-modal="false"
      :visible.sync="addChildShow"
      @close="closeDialog"
    >
      <div class="dialog-body">
        <el-form :model="addForm" size="mini" label-width="120px" label-position="center">
          <el-row>
            <strong>项目信息</strong>
          </el-row>
          <el-divider />
          <el-row>
            <el-col :sm="24" :md="12">
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
            <strong>指标信息</strong>
          </el-row>
          <el-divider />
          <el-row>
            <el-col :xs="24" class="btn" style="text-align:left; margin-bottom:10px;">
              <el-button type="primary" icon="el-icon-circle-plus-outline" @click="partAdd">添加一行</el-button>
              <el-button type="primary" icon="el-icon-download" @click="testclick">指标导入</el-button>
            </el-col>
          </el-row>
          <el-row>
            <table border="1" class="detail-table">
              <tr class="rowStyle">
                <td colspan="7">绩效评价指标体系</td>
                <!-- <td colspan="3">指标评价情况</td>
                <td colspan="4">指标设计准备情况</td> -->
                <td rowspan="2">操作</td>
              </tr>
              <tr class="rowStyle">
                <td>一级指标</td>
                <!-- <td>分值</td> -->
                <td>二级指标</td>
                <!-- <td>分值</td> -->
                <td>三级指标</td>
                <td>分值</td>
                <td>指标解释</td>
                <td>指标说明</td>
                <td>评价标准及评分规则</td>
                <!-- <td>评价得分</td>
                <td>扣分说明</td>
                <td>指标完成情况</td>
                <td>考核对象</td>
                <td>发现问题</td>
                <td>数据来源</td>
                <td>备注</td> -->
              </tr>
              <tr v-for="item in addForm.professorArr" :key="item.id" class="inputStyle">
                <td><el-input v-model="item.oneLevelIndex" /></td>
                <td><el-input v-model="item.oneScore" /></td>
                <td><el-input v-model="item.twoLevelIndex" /></td>
                <td><el-input v-model="item.twoScore" /></td>
                <td><el-input v-model="item.threeLevelIndex" type="textarea" :rows="4" /></td>
                <td style="text-align:left;" v-html="item.pointDes" />
                <td><el-input type="textarea" :rows="4" /></td>
                <td><el-button type="danger" icon="el-icon-delete" circle @click="partReduce" /></td>
              </tr>
              <tr>
                <td colspan="3">合计</td>
                <td />
                <td />
                <td />
                <td />
                <td />
              </tr>
            </table>
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
      width="80%"
      class="dialog"
      title="指标说明设置"
      :close-on-click-modal="false"
      :visible.sync="addCheckShow"
      @close="closeDialog"
    >
      <div class="dialog-body">
        <el-form :model="questionTypeForm" size="small" label-width="120px" label-position="center">
          <el-row>
            <el-col :sm="24" :md="12">
              <el-form-item label="评分要点">
                <el-select v-model="questionTypeForm.questionType" placeholder="请选择">
                  <el-option :value="1" label="1">1</el-option>
                  <el-option :value="2" label="2">2</el-option>
                  <el-option :value="3" label="3">3</el-option>
                  <el-option :value="4" label="4">4</el-option>
                  <el-option :value="5" label="5">5</el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCheckShow = false">取 消</el-button>
        <el-button type="primary" @click="typeUpload(questionTypeForm)">确 认</el-button>
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
      addCheckShow: false,
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
        childProjectLevel: 1,
        functionClassify: '一般公共服务支出-人大事务-机关服务',
        ecoClassify: '采矿业-黑色金属矿采选业-铁矿采选',
        riskLevel: 2,
        status: 1,
        approvalTime: '2020-10-09 10:20:10',
        designMan: '许丹一峰',
        designStatus: 1,
        workGroupName: '2020-05764-01-浙江省科学技术厅工作组',
        workGroupNo: '',
        projectOutLeader: '许丹一峰',
        projectPartnerName: '倪小平',
        projectManager: '张强'
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
        riskLevel: 2,
        status: 1,
        approvalTime: '2020-10-09 10:20:10',
        designMan: '许丹一峰',
        designStatus: 2,
        workGroupName: '2020-05764-01-浙江省科学技术厅工作组',
        workGroupNo: '',
        projectOutLeader: '许丹一峰',
        projectPartnerName: '倪小平',
        projectManager: '张强'
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
        riskLevel: 2,
        status: 1,
        approvalTime: '2020-10-09 10:20:10',
        designMan: '许丹一峰',
        designStatus: 3,
        workGroupName: '2020-05764-01-浙江省科学技术厅工作组',
        workGroupNo: '',
        projectOutLeader: '许丹一峰',
        projectPartnerName: '倪小平',
        projectManager: '张强'
      }],
      total: 1,
      parentTotal: null,
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
            oneScore: null,
            twoLevelIndex: '',
            twoScore: null,
            threeLevelIndex: '',
            threeScore: null,
            pointDes: ''
          }
        ]
      },
      questionTypeForm: {
        questionType: null
      },
      indexList: [
        {
          indexCode: 'gx010101',
          indexOneLevel: '产出指标',
          indexTwoLevel: '数量指标',
          indexThreeLevel: '培训班次（会议次数）',
          indexExplain: '反映组织会议培训数量情况。'
        },
        {
          indexCode: 'gx010102',
          indexOneLevel: '产出指标',
          indexTwoLevel: '数量指标',
          indexThreeLevel: '培训（参会）人次',
          indexExplain: '反映会议培训参加人次情况。'
        },
        {
          indexCode: 'gx010103',
          indexOneLevel: '产出指标',
          indexTwoLevel: '数量指标',
          indexThreeLevel: '培训（会议）天数',
          indexExplain: '反映会议培训举办天数情况。'
        },
        {
          indexCode: 'gx010104',
          indexOneLevel: '产出指标',
          indexTwoLevel: '数量指标',
          indexThreeLevel: '培训（会议）完成率',
          indexExplain: '反映组织会议培训完成情况。'
        },
        {
          indexCode: 'gx010201',
          indexOneLevel: '产出指标',
          indexTwoLevel: '质量指标',
          indexThreeLevel: '培训人员合格率',
          indexExplain: '反映参加培训人员学习质量情况。'
        },
        {
          indexCode: 'gx010301',
          indexOneLevel: '产出指标',
          indexTwoLevel: '时效指标',
          indexThreeLevel: '培训计划按期完成率',
          indexExplain: '反映培训计划按期完成情况。'
        },
        {
          indexCode: 'gx010401',
          indexOneLevel: '产出指标',
          indexTwoLevel: '成本指标',
          indexThreeLevel: '人均培训成本控制率',
          indexExplain: '反映严格执行人均培训标准的情况。'
        },
        {
          indexCode: 'gx010901',
          indexOneLevel: '满意度指标',
          indexTwoLevel: '服务对象满意度指标',
          indexThreeLevel: '培训（参会）人员满意度',
          indexExplain: '反映参加会议培训人员满意情况。'
        },
        {
          indexCode: 'gx020101',
          indexOneLevel: '产出指标',
          indexTwoLevel: '数量指标',
          indexThreeLevel: '开展研究项目数量',
          indexExplain: '反映开展研究项目情况。'
        },
        {
          indexCode: 'gx020102',
          indexOneLevel: '产出指标',
          indexTwoLevel: '数量指标',
          indexThreeLevel: '完成调研报告数量',
          indexExplain: '反映报告数量完成情况。'
        }
      ],
      addFrameShow: false
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
      this.addCheckShow = true
    },
    typeUpload(val) {
      if (val.questionType === 4) {
        const timepart = {
          oneLevelIndex: '',
          oneScore: null,
          twoLevelIndex: '',
          twoScore: null,
          threeLevelIndex: '',
          threeScore: null,
          pointDes: `<div>1.<input class="addDom" type="text"/></div>
          <div>2.<input class="addDom" type="text"/></div>
          <div>3.<input class="addDom" type="text"/></div>
          <div>4.<input class="addDom" type="text"/></div>
          `
        }
        this.addForm.professorArr.push(timepart)
      } else if (val.questionType === 3) {
        const timepart = {
          oneLevelIndex: '',
          oneScore: null,
          twoLevelIndex: '',
          twoScore: null,
          threeLevelIndex: '',
          threeScore: null,
          pointDes: `<div>1.<input class="addDom" type="text"/></div>
          <div>2.<input class="addDom" type="text"/></div>
          <div>3.<input class="addDom" type="text"/></div>
          `
        }
        this.addForm.professorArr.push(timepart)
      } else if (val.questionType === 2) {
        const timepart = {
          oneLevelIndex: '',
          oneScore: null,
          twoLevelIndex: '',
          twoScore: null,
          threeLevelIndex: '',
          threeScore: null,
          pointDes: `<div>1.<input class="addDom" type="text"/></div>
          <div>2.<input class="addDom" type="text"/></div>
          `
        }
        this.addForm.professorArr.push(timepart)
      } else if (val.questionType === 1) {
        const timepart = {
          oneLevelIndex: '',
          oneScore: null,
          twoLevelIndex: '',
          twoScore: null,
          threeLevelIndex: '',
          threeScore: null,
          pointDes: `<div>1.<input class="addDom" type="text"/></div>
          `
        }
        this.addForm.professorArr.push(timepart)
      } else if (val.questionType === 5) {
        const timepart = {
          oneLevelIndex: '',
          oneScore: null,
          twoLevelIndex: '',
          twoScore: null,
          threeLevelIndex: '',
          threeScore: null,
          pointDes: `<div>1.<input class="addDom" type="text"/></div>
          <div>2.<input class="addDom" type="text"/></div>
          <div>3.<input class="addDom" type="text"/></div>
          <div>4.<input class="addDom" type="text"/></div>
          <div>5.<input class="addDom" type="text"/></div>
          `
        }
        this.addForm.professorArr.push(timepart)
      }
      this.addCheckShow = false
    },
    // 删除
    partReduce(index) {
      this.addForm.professorArr.splice(index, 1)
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
  /deep/ .addDom{
      width: 280px;
      height: 30px;
      margin-left: 10px;
      margin-bottom: 10px;
      border: 1px solid #DCDFE6;
      border-radius: 4px;
      outline-color:#DCDFE6;
    }
</style>
