<!--
 * @Author: zhangtao
 * @Date: 2020-11-17 11:28:00
 * @LastEditTime: 2020-11-17 14:50:30
 * @LastEditors: Please set LastEditors
 * @Description: 拟定底稿设计
 * @FilePath: \newproject-develop1.0d:\tzprojectPerformance\src\views\schemeMake\beforehandResearch\draftDesign.vue
-->
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
        <el-table-column prop="designMan" label="拟定人" width="" align="center" />
        <el-table-column prop="approvalTime" label="拟定时间" width="140" align="center" />
        <el-table-column prop="status" label="拟定状态" width="80" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 1">未拟定</span>
            <span v-if="scope.row.status === 2">已拟定</span>
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
            >底稿填写</el-button>
            <el-button
              v-if="scope.row.status === 2"
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
      title="底稿设计信息"
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
        </el-form>
        <el-row>
          <strong>底稿设计表头信息</strong>
        </el-row>
        <el-divider />
        <div class="table-list">
          <el-table
            v-loading="listLoading"
            :data="threeList"
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
            <el-table-column prop="threeIndex" label="三级指标" align="center" width="120" />
            <el-table-column prop="threeScore" label="分值" align="center" />
            <el-table-column prop="indexExplain" label="指标解释" width="160" align="center" />
            <el-table-column prop="indexDescription" label="指标说明" width="160" align="center" />
            <el-table-column prop="scoreRule" label="评价标准及评分规则" width="230" align="center" />
            <el-table-column prop="appraiseScore" label="评价得分" width="" align="center" />
            <el-table-column prop="deductionDes" label="扣分说明" width="140" align="center" />
            <el-table-column prop="indexComplete" label="指标完成情况" width="100" align="center" />
            <el-table-column prop="checkObj" label="考核对象" width="140" align="center" />
            <el-table-column prop="findProblem" label="发现问题" align="center" />
            <el-table-column prop="dataFrom" label="数据来源" width="200" align="center" />
            <el-table-column prop="remark" label="备注" align="center" />
            <el-table-column prop="status" label="状态" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.status==1">未拟定</span>
                <span v-if="scope.row.status==2">暂存</span>
                <span v-if="scope.row.status==3">待审批</span>
                <span v-if="scope.row.status==4">已审批</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作" width="130" fixed="right">
              <template slot-scope="scope">
                <el-button
                  v-if="scope.row.status === 1"
                  size="small"
                  plain
                  type="primary"
                  @click="typeSelect(scope.$index, scope.row)"
                >填写工作底稿</el-button>
                <el-button
                  v-if="scope.row.status === 2"
                  size="small"
                  plain
                  type="primary"
                >修改</el-button>
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
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addChildShow = false">关 闭</el-button>
      </span>
    </el-dialog>
    <!--工作底稿-->
    <el-dialog
      width="90%"
      class="dialog"
      title="工作底稿信息"
      :close-on-click-modal="false"
      :visible.sync="addCommonShow"
      @close="closeDialog"
    >
      <div class="dialog-body">
        <el-form size="small" :model="draftForm" label-position="left">
          <el-row>
            <el-col :span="12">
              <el-form-item label="底稿类型" prop="draftType">
                <el-select v-model="draftForm.draftType">
                  <el-option :value="1" label="常规类底稿">常规类底稿</el-option>
                  <el-option :value="2" label="满意度类底稿">满意度类底稿</el-option>
                  <el-option :value="3" label="问题建议类底稿">问题建议类底稿</el-option>
                  <el-option :value="4" label="调研总结类底稿">调研总结类底稿</el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="draftForm.draftType==1">
            <el-col :span="12">
              <el-form-item label="评价期间年度数" prop="companyName">
                <el-select v-model="draftForm.yearEvaluate">
                  <el-option :value="1" selected="selected" label="1">1</el-option>
                  <el-option :value="2" label="2">2</el-option>
                  <el-option :value="3" label="3">3</el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col v-if="draftForm.yearEvaluate==1">
              <table class="detail-table">
                <tr>
                  <td rowspan="2">序号</td>
                  <td rowspan="2">部门（单位）</td>
                  <td colspan="2">评分要点</td>
                  <td rowspan="2">合计</td>
                  <td rowspan="2">存在问题</td>
                  <td rowspan="2">原因分析</td>
                </tr>
                <tr class="headerStyle">
                  <td>活动1（开展值为1，未开展值为0）</td>
                  <td>活动2（开展值为1，未开展值为0）</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td><el-input type="text" /></td>
                  <td><el-input type="text" /></td>
                  <td><el-input type="text" /></td>
                  <td><el-input type="text" /></td>
                  <td><el-input type="text" /></td>
                  <td><el-input type="text" /></td>
                </tr>
              </table>
            </el-col>
            <el-col v-if="draftForm.yearEvaluate==2">
              <table class="detail-table">
                <tr>
                  <td rowspan="3">序号</td>
                  <td rowspan="3">部门（单位）</td>
                  <td colspan="6">评分要点</td>
                  <td rowspan="3">存在问题</td>
                  <td rowspan="3">原因分析</td>
                </tr>
                <tr class="headerStyle">
                  <td colspan="3">2019年度</td>
                  <td colspan="3">2018年度</td>
                </tr>
                <tr class="headerStyle">
                  <td>活动1（开展值为1，未开展值为0）</td>
                  <td>活动2（开展值为1，未开展值为0）</td>
                  <td>合计</td>
                  <td>活动1（开展值为1，未开展值为0）</td>
                  <td>活动2（开展值为1，未开展值为0）</td>
                  <td>合计</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td><el-input type="text" /></td>
                  <td><el-input type="text" /></td>
                  <td><el-input type="text" /></td>
                  <td><el-input type="text" /></td>
                  <td><el-input type="text" /></td>
                  <td><el-input type="text" /></td>
                  <td><el-input type="text" /></td>
                  <td><el-input type="text" /></td>
                  <td><el-input type="text" /></td>
                </tr>
              </table>
            </el-col>
            <el-col v-if="draftForm.yearEvaluate==3">
              <table class="detail-table">
                <tr>
                  <td rowspan="3">序号</td>
                  <td rowspan="3">部门（单位）</td>
                  <td colspan="9">评分要点</td>
                  <td rowspan="3">存在问题</td>
                  <td rowspan="3">原因分析</td>
                </tr>
                <tr class="headerStyle">
                  <td colspan="3">2019年度</td>
                  <td colspan="3">2018年度</td>
                  <td colspan="3">2017年度</td>
                </tr>
                <tr class="headerStyle">
                  <td>活动1（开展值为1，未开展值为0）</td>
                  <td>活动2（开展值为1，未开展值为0）</td>
                  <td>合计</td>
                  <td>活动1（开展值为1，未开展值为0）</td>
                  <td>活动2（开展值为1，未开展值为0）</td>
                  <td>合计</td>
                  <td>活动1（开展值为1，未开展值为0）</td>
                  <td>活动2（开展值为1，未开展值为0）</td>
                  <td>合计</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td><el-input type="text" /></td>
                  <td><el-input type="text" /></td>
                  <td><el-input type="text" /></td>
                  <td><el-input type="text" /></td>
                  <td><el-input type="text" /></td>
                  <td><el-input type="text" /></td>
                  <td><el-input type="text" /></td>
                  <td><el-input type="text" /></td>
                  <td><el-input type="text" /></td>
                  <td><el-input type="text" /></td>
                  <td><el-input type="text" /></td>
                  <td><el-input type="text" /></td>
                </tr>
              </table>
            </el-col>
          </el-row>
          <!--满意度类--->
          <el-row v-if="draftForm.draftType==2">
            <table class="detail-table">
              <tr>
                <td rowspan="2">事项</td>
                <td colspan="2">评分要点</td>
              </tr>
              <tr class="headerStyle">
                <td>①满意度1</td>
                <td>②满意度2</td>
              </tr>
              <tr>
                <td>满意度</td>
                <td>
                  <el-input type="text" />
                </td>
                <td><el-input type="text" /></td>
              </tr>
              <tr>
                <td>评价得分</td>
                <td><el-input type="text" /></td>
                <td><el-input type="text" /></td>
              </tr>
              <tr>
                <td>存在问题</td>
                <td><el-input type="text" /></td>
                <td><el-input type="text" /></td>
              </tr>
              <tr>
                <td>原因分析</td>
                <td><el-input type="text" /></td>
                <td><el-input type="text" /></td>
              </tr>
            </table>
          </el-row>
          <!--问题建议类-->
          <el-row v-if="draftForm.draftType==3">
            <table class="detail-table">
              <tr>
                <td>序号</td>
                <td>部门（单位）</td>
                <td>经验做法</td>
                <td>存在的问题、困难</td>
                <td>有关建议</td>
                <td>其他</td>
              </tr>
              <tr>
                <td>1</td>
                <td><el-input type="text" /></td>
                <td><el-input type="text" /></td>
                <td><el-input type="text" /></td>
                <td><el-input type="text" /></td>
                <td><el-input type="text" /></td>
              </tr>
            </table>
          </el-row>
          <!--调研总结类-->
          <el-row v-if="draftForm.draftType==4">
            <table class="detail-table">
              <tr>
                <td>序号</td>
                <td>部门（单位）</td>
                <td>对被调研地项目必要性的看法</td>
                <td>对被调研地项目实施效果的评价</td>
                <td>对项目组织实施的建议</td>
                <td>其他</td>
              </tr>
              <tr>
                <td>1</td>
                <td><el-input type="text" /></td>
                <td><el-input type="text" /></td>
                <td><el-input type="text" /></td>
                <td><el-input type="text" /></td>
                <td><el-input type="text" /></td>
              </tr>
            </table>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCommonShow = false">取 消</el-button>
        <!-- <el-button type="warning">暂 存</el-button> -->
        <el-button type="primary">提 交</el-button>
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
        projectType: 1,
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
      addCommonShow: false,
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
      draftForm: {
        draftType: 1,
        yearEvaluate: 1
      },
      threeList: [
        {
          threeIndex: 'XX活动完成率',
          threeScore: 5,
          indexExplain: '项目实施的实际产出数与计划产出数的比率，用以反映和考核项目产出数量目标的实现程度。',
          indexDescription: '评分要点：①活动1；②活动2。',
          scoreRule: '分值共10分，得分=实际产出数/计划产出数*100%*分值；计划产出数≥ 8项',
          appraiseScore: '',
          deductionDes: '',
          indexComplete: '',
          checkObj: '地方单位',
          findProblem: '',
          dataFrom: '活动方案、照片、视频、总结等',
          remark: '',
          status: 1
        },
        {
          threeIndex: 'XX活动完成率',
          threeScore: 5,
          indexExplain: '项目实施的实际产出数与计划产出数的比率，用以反映和考核项目产出数量目标的实现程度。',
          indexDescription: '评分要点：①活动1；②活动2。',
          scoreRule: '分值共10分，得分=实际产出数/计划产出数*100%*分值；计划产出数≥ 8项',
          appraiseScore: '',
          deductionDes: '',
          indexComplete: '',
          checkObj: '地方单位',
          findProblem: '',
          dataFrom: '活动方案、照片、视频、总结等',
          remark: '',
          status: 2
        }
      ],
      multipleSelection: []
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
    handelAdd() {
      this.addChildShow = true
    },
    holdSave() {
      this.addChildShow = false
    },
    submitSave() {
      this.addChildShow = false
    },
    checkBtn(index, row) {
      this.addCommonShow = true
      this.currentTime()
    },
    checkSave() {
      this.addCommonShow = false
    },
    handleSelectionChange(selection, row) {
      this.multipleSelection = selection
    },
    typeSelect() {
      this.addCommonShow = true
    }
  }
}
</script>
<style rel="stylesheet/less" lang="less" scoped>
  .detail-table tr:first-child,.headerStyle{
    background-color: #F5FAFF;
    td el-input{
      border: none;
    }
  }
</style>
