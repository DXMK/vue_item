<script>
/*
 * @Author: zhangtao
 * @Date:   2020-11-18 09:42:15
 * @Last Modified by:   Your name
 * @Description: 拟定提纲和资料清单
 * @Last Modified time: 2021-01-28 14:31:29
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
        <el-form-item label="风险级别" prop="companyName">
          <el-select>
            <el-option value="1" label="A">A</el-option>
            <el-option value="2" label="B">B</el-option>
            <el-option value="3" label="C">C</el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item class="table-search-button">
          <el-button size="mini" type="primary" class="el-icon-download" @click="chooseItem"> 模板下载</el-button>
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
        <el-table-column prop="projectNo" label="项目编号" width="130" align="center" />
        <el-table-column prop="projectName" label="项目名称" width="" align="center" />
        <el-table-column prop="riskLevel" label="风险级别" width="80" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.riskLevel === 1">A</span>
            <span v-if="scope.row.riskLevel === 2">B</span>
            <span v-if="scope.row.riskLevel === 3">C</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="clientName" label="客户名称" align="center" /> -->
        <el-table-column prop="designMan" label="拟定人" width="80" align="center" />
        <el-table-column prop="approvalTime" label="拟定时间" width="140" align="center" />
        <el-table-column prop="status" label="拟定状态" width="80" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 1">未拟定</span>
            <span v-if="scope.row.status === 2">已拟定</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="150" fixed="right">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.status === 1"
              size="small"
              plain
              type="primary"
              @click="handelAdd(scope.$index, scope.row)"
            >拟定提纲</el-button>
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
    <!--模板下载选择-->
    <el-dialog
      width="80%"
      class="dialog"
      title="模板列表信息"
      :close-on-click-modal="false"
      :visible.sync="partShow"
      @close="closeDialog"
    >
      <div class="dialog-body">
        <el-form :model="addForm" size="small" label-width="180px" label-position="center">
          <el-row>
            <table class="detail-table">
              <tr>
                <td>序号</td>
                <td>模板名称</td>
                <td>操作</td>
              </tr>
              <tr>
                <td>1</td>
                <td class="partStyle">调研提纲.doc</td>
                <td><el-button size="mini" plain type="primary">下载</el-button></td>
              </tr>
              <tr>
                <td>2</td>
                <td class="partStyle">调研资料清单.pdf</td>
                <td><el-button size="mini" plain type="primary">下载</el-button></td>
              </tr>
            </table>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="partShow = false">关 闭</el-button>
      </span>
    </el-dialog>
    <!--详情--->
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
          <el-form :model="addForm" label-width="140px" size="small">
            <el-collapse v-model="checkCut" accordion>
              <el-collapse-item title="项目基本信息" name="1">
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
                    <el-form-item label="业务类型">
                      <el-input value="非鉴证业务-政务软件服务-软件定制开发" disabled />
                    </el-form-item>
                  </el-col>
                  <el-col :sm="24" :md="12">
                    <el-form-item label="项目四级分类">
                      <el-select v-model="addForm.projectType" disabled>
                        <el-option label="财政评价项目" :value="1">财政评价项目</el-option>
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
              </el-collapse-item>
              <el-collapse-item title="提纲" name="2">
                <el-row>
                  <table class="detail-table">
                    <tr>
                      <td width="5%">序号</td>
                      <td>提纲名称</td>
                      <!-- <td width="7%">操作</td> -->
                    </tr>
                    <tr v-for="(item, index) in addForm.outlineArr" :key="item.id">
                      <td>{{ index + 1 }}</td>
                      <td><el-input v-model="item.outlineName" disabled /></td>
                      <!-- <td><el-button type="danger" icon="el-icon-delete" circle @click="outlinepartReduce" /></td> -->
                    </tr>
                  </table>
                </el-row>
              </el-collapse-item>
              <el-collapse-item title="审批记录信息" name="3">
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
                        <td>李宛昱</td>
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
              </el-collapse-item>
            </el-collapse>
          </el-form>
        </div>
        <div style="flex:2;">
          <el-row style="text-align:center;">
            <strong>审批流程节点信息</strong>
          </el-row>
          <div class="stepContent">
            <el-steps direction="vertical" :active="2" finish-status="success">
              <el-step title="李宛昱" description="2020-12-02 11:29:39" />
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
      title="调研提纲和资料清单信息"
      :close-on-click-modal="false"
      :visible.sync="addChildShow"
      @close="closeDialog"
    >
      <div class="dialog-body">
        <el-form :model="addForm" label-width="140px" size="small">
          <el-collapse v-model="checkCut" accordion>
            <el-collapse-item title="项目基本信息" name="1">
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
                    <el-select v-model="addForm.projectType" disabled>
                      <el-option label="财政评价项目" :value="1">财政评价项目</el-option>
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
            </el-collapse-item>
            <el-collapse-item title="提纲" name="2">
              <el-row>
                <el-col :xs="24" class="btn" style="margin:10px 0;">
                  <!-- <span>绩效评价调研提纲</span> -->
                  <el-button style="float:right;" type="primary" size="small" icon="el-icon-circle-plus" @click="outlinepartAdd">添加一行</el-button>
                </el-col>
                <table class="detail-table">
                  <tr>
                    <td width="5%">序号</td>
                    <td>提纲名称</td>
                    <td width="7%">操作</td>
                  </tr>
                  <tr v-for="(item, index) in addForm.outlineArr" :key="item.id">
                    <td>{{ index + 1 }}</td>
                    <td><el-input v-model="item.outlineName" /></td>
                    <td><el-button type="danger" icon="el-icon-delete" circle @click="outlinepartReduce" /></td>
                  </tr>
                </table>
              </el-row>
            </el-collapse-item>
          </el-collapse>
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
        projectNo: '2020-07714-01-Z01',
        projectName: '2020-07714-01-Z01天津市滨海新区财政局-一般公共预算项目绩效评价',
        clientName: '天津市滨海新区财政局',
        projectType: 1,
        projectOutLeader: '李宁',
        projectPartnerName: '贾立华',
        projectManager: '马辉',
        riskLevel: 3,
        status: 1,
        approvalTime: '',
        designMan: ''
      }, {
        projectNo: '2018-06470-01',
        projectName: '2018-06470-01-天津市铁路运输检察院-内部控制体系建设',
        clientName: '天津市铁路运输检察院',
        projectType: 2,
        projectOutLeader: '李宛昱',
        projectPartnerName: '贾立华',
        projectManager: '马辉',
        riskLevel: 3,
        status: 2,
        approvalTime: '2020-10-09 10:20:10',
        designMan: '李宛昱'
      }],
      total: 1,
      addChildShow: false,
      detailShow: false,
      addCheckShow: false,
      partShow: false,
      checkCut: '2',
      title: '',
      addForm: {
        projectNo: '2020-07714-01-Z01',
        projectName: '2020-07714-01-Z01天津市滨海新区财政局-一般公共预算项目绩效评价',
        clientName: '天津市滨海新区财政局',
        projectType: 1,
        projectOutLeader: '李宁',
        projectPartnerName: '贾立华',
        projectManager: '马辉',
        functionClassify: '一般公共服务支出-财政事务',
        ecoClassify: '公共管理、社会保障和社会组织-国家机构-国家行政机构-经济事务管理机构',
        riskLevel: 'C',
        outlineArr: [
          {
            id: 1,
            outlineName: '项目中长期规划'
          }, {
            id: 2,
            outlineName: '项目立项背景、立项依据及程序'
          }, {
            id: 3,
            outlineName: '项目相关政策'
          }, {
            id: 4,
            outlineName: '项目绩效目标与工作要求'
          }, {
            id: 5,
            outlineName: '从业务管理和资金管理角度，项目涉及的相关方有哪些，各相关方在项目流程中承担的职责是什么'
          }, {
            id: 6,
            outlineName: '评价期间项目资金申报、批复、使用、调整及结余情况'
          }, {
            id: 7,
            outlineName: '项目实施与效果情况'
          }, {
            id: 8,
            outlineName: '项目中期监控和成果验收情况'
          }, {
            id: 9,
            outlineName: '项目相关国际或国内实施情况与经验做法'
          }, {
            id: 10,
            outlineName: '项目实施中的经验做法、存在问题与规划建议等'
          }
        ],
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
    // 模板下载选择
    chooseItem() {
      this.partShow = true
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
      this.addCheckShow = true
      this.currentTime()
    },
    checkSave() {
      this.addCheckShow = false
    },
    detailHandle(index, row) {
      this.detailShow = true
    },
    outlinepartAdd() {
      const timepart = {
            id: '',
            outlineName: ''
      }
      this.addForm.outlineArr.push(timepart)
    },
    letterpartAdd() {
      const timepart = {
            id: '',
            letterName: ''
      }
      this.addForm.letterArr.push(timepart)
    },
  }
}
</script>
<style rel="stylesheet/less" lang="less" scoped>
.partStyle{
  color: blue;
  cursor: pointer;
}
.detail-table tr:first-child{
  background-color: #F5FAFF;
}
</style>
