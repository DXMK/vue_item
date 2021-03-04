<script>
/*
 * @Author: zhangtao
 * @Date:   2020-11-18 16:32:05
 * @Last Modified by:   Your name
 * @Last Modified time: 2021-02-02 14:59:07
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
        <el-table-column prop="projectNo" label="项目编号" width="140" align="center" />
        <el-table-column prop="projectName" label="项目名称" width="" align="center" />
        <el-table-column prop="riskLevel" label="风险级别" width="100" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.riskLevel === 1">A</span>
            <span v-if="scope.row.riskLevel === 2">B</span>
            <span v-if="scope.row.riskLevel === 3">C</span>
          </template>
        </el-table-column>
        <el-table-column prop="approvalTime" label="立项时间" width="140" align="center" />
        <!-- <el-table-column prop="clientName" label="客户名称" align="center" /> -->
        <!-- <el-table-column prop="" label="评价工作方案" width="140" align="center">
          <template>
            <el-button size="small" type="primary">点击预览</el-button>
          </template>
        </el-table-column> -->
        <!-- <el-table-column prop="designMan" label="编制人" width="80" align="center" /> -->
        <!-- <el-table-column prop="checkTime" label="审批时间" width="140" align="center" /> -->
        <!-- <el-table-column prop="checkMan" label="审批人" width="140" align="center" /> -->
        <el-table-column prop="status" label="审批状态" width="80" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status==1">待审批</span>
            <span v-if="scope.row.status==2">已审批</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="130" fixed="right">
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
              @click="detailHandle(scope.$index, scope.row)"
            >查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      width="90%"
      class="dialog"
      title="详情"
      :close-on-click-modal="false"
      :visible.sync="detailShow"
      @close="closeDialog"
    >
      <div class="dialog-body">
        <div>
          <el-form :model="addForm" size="small" label-width="140px">
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
              <el-collapse-item title="工作任务信息" name="2">
                <el-table
                  v-loading="listLoading"
                  :data="addForm.tarskArr"
                  border
                  element-loading-text="给我一点时间"
                  fit
                  highlight-current-row
                  stripe
                  header-row-class-name="table-header"
                  size="small"
                  max-height="420"
                  style="width: 100%"
                  row-key="id"
                  :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
                  @selection-change="handleSelectionChange"
                  @row-click="handleClick"
                >
                  <el-table-column type="index" :index="typeIndex" label="序号" fixed="left" align="center" />
                  <el-table-column type="selection" width="55" />
                  <el-table-column prop="tarskNo" label="任务编号" width="140" align="left" />
                  <el-table-column prop="tarskName" label="任务名称" width="140" align="center" />
                  <el-table-column prop="startTime" label="任务开始时间" width="" align="center">
                    <template slot-scope="scope">
                      <el-date-picker v-model="scope.row.startTime" type="datetime" placeholder="选择开始日期时间" />
                    </template>
                  </el-table-column>
                  <el-table-column prop="endTime" label="任务结束时间" width="" align="center">
                    <template slot-scope="scope">
                      <el-date-picker v-model="scope.row.endTime" type="datetime" placeholder="选择结束日期时间" />
                    </template>
                  </el-table-column>
                  <el-table-column prop="resource" label="人员" width="" align="center">
                    <template>
                      <el-input placeholder="点击选择指定" :readonly="true" @focus="chooseClerk" />
                    </template>
                  </el-table-column>
                </el-table>
              </el-collapse-item>
              <el-collapse-item title="调研提纲填写" name="3">
                <el-collapse v-model="tabCards" accordion>
                  <el-collapse-item title="项目中长期规划" name="1">
                    <el-col :sm="24" :md="24">
                      <el-form-item label="">
                        <el-input type="textarea" :rows="8" maxlength="3000" show-word-limit placeholder="请输入调研提纲内容" />
                      </el-form-item>
                    </el-col>
                  </el-collapse-item>
                  <el-collapse-item title="项目立项背景、立项依据及程序" name="2">
                    <el-col :sm="24" :md="24">
                      <el-form-item label="">
                        <el-input type="textarea" :rows="8" maxlength="3000" show-word-limit placeholder="请输入调研提纲内容" />
                      </el-form-item>
                    </el-col>
                  </el-collapse-item>
                  <el-collapse-item title="项目相关政策" name="3">
                    <el-col :sm="24" :md="24">
                      <el-form-item label="">
                        <el-input type="textarea" :rows="8" maxlength="3000" show-word-limit placeholder="请输入调研提纲内容" />
                      </el-form-item>
                    </el-col>
                  </el-collapse-item>
                  <el-collapse-item title="项目绩效目标与工作要求" name="4">
                    <el-col :sm="24" :md="24">
                      <el-form-item label="">
                        <el-input type="textarea" :rows="8" maxlength="3000" show-word-limit placeholder="请输入调研提纲内容" />
                      </el-form-item>
                    </el-col>
                  </el-collapse-item>
                  <el-collapse-item title="从业务管理和资金管理角度，项目涉及的相关方有哪些，各相关方在项目流程中承担的职责是什么" name="5">
                    <el-col :sm="24" :md="24">
                      <el-form-item label="">
                        <el-input type="textarea" :rows="8" maxlength="3000" show-word-limit placeholder="请输入调研提纲内容" />
                      </el-form-item>
                    </el-col>
                  </el-collapse-item>
                  <el-collapse-item title="评价期间项目资金申报、批复、使用、调整及结余情况" name="6">
                    <el-col :sm="24" :md="24">
                      <el-form-item label="">
                        <el-input type="textarea" :rows="8" maxlength="3000" show-word-limit placeholder="请输入调研提纲内容" />
                      </el-form-item>
                    </el-col>
                  </el-collapse-item>
                  <el-collapse-item title="项目实施与效果情况" name="7">
                    <el-col :sm="24" :md="24">
                      <el-form-item label="">
                        <el-input type="textarea" :rows="8" maxlength="3000" show-word-limit placeholder="请输入调研提纲内容" />
                      </el-form-item>
                    </el-col>
                  </el-collapse-item>
                  <el-collapse-item title="项目中期监控和成果验收情况" name="8">
                    <el-col :sm="24" :md="24">
                      <el-form-item label="">
                        <el-input type="textarea" :rows="8" maxlength="3000" show-word-limit placeholder="请输入调研提纲内容" />
                      </el-form-item>
                    </el-col>
                  </el-collapse-item>
                  <el-collapse-item title="项目相关国际或国内实施情况与经验做法" name="9">
                    <el-col :sm="24" :md="24">
                      <el-form-item label="">
                        <el-input type="textarea" :rows="8" maxlength="3000" show-word-limit placeholder="请输入调研提纲内容" />
                      </el-form-item>
                    </el-col>
                  </el-collapse-item>
                  <el-collapse-item title="项目实施中的经验做法、存在问题与规划建议等" name="10">
                    <el-col :sm="24" :md="24">
                      <el-form-item label="">
                        <el-input type="textarea" :rows="8" maxlength="3000" show-word-limit placeholder="请输入调研提纲内容" />
                      </el-form-item>
                    </el-col>
                  </el-collapse-item>
                </el-collapse>
              </el-collapse-item>
              <el-collapse-item title="评价工作方案" name="4">
                <el-row>
                  <el-table
                    v-loading="listLoading"
                    :data="workScheme"
                    border
                    element-loading-text="给我一点时间"
                    fit
                    highlight-current-row
                    stripe
                    header-row-class-name="table-header"
                    size="small"
                    max-height="420"
                    style="width: 100%;margin-bottom:20px;"
                    @selection-change="handleSelectionChange"
                  >
                    <el-table-column type="index" :index="typeIndex" label="序号" fixed="left" align="center" />
                    <el-table-column prop="projectName" label="评价方案" width="" align="center" />
                    <el-table-column align="center" label="操作" width="" fixed="right">
                      <template>
                        <el-button
                          size="small"
                          plain
                          type="primary"
                        >预览</el-button>
                        <el-button
                          size="small"
                          plain
                          type="primary"
                        >下载</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <el-col :sm="24" :md="24">
                    <el-form-item label="专家意见" label-width="70">
                      <el-input type="textarea" disabled />
                    </el-form-item>
                  </el-col>
                  <el-col :sm="24" :md="24">
                    <el-form-item label="专家建议" label-width="70">
                      <el-input type="textarea" disabled />
                    </el-form-item>
                  </el-col>
                  <el-col :sm="24" :md="24">
                    <el-form-item label="专家签名" label-width="70">
                      <el-input type="textarea" disabled />
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-collapse-item>
              <el-collapse-item title="审批记录信息" name="5">
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
        <!-- <div style="flex:2;">
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
        </div> -->
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
    <!--审批-->
    <el-dialog
      width="90%"
      class="dialog"
      title="评价工作方案信息"
      :close-on-click-modal="false"
      :visible.sync="addChildShow"
      @close="closeDialog"
    >
      <div class="dialog-body" style="display:flex;">
        <div style="flex:4">
          <el-form :model="addForm" size="small" label-width="140px">
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
              <el-collapse-item title="工作任务信息" name="2">
                <el-table
                  v-loading="listLoading"
                  :data="addForm.tarskArr"
                  border
                  element-loading-text="给我一点时间"
                  fit
                  highlight-current-row
                  stripe
                  header-row-class-name="table-header"
                  size="small"
                  max-height="420"
                  style="width: 100%"
                  row-key="id"
                  :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
                  @selection-change="handleSelectionChange"
                  @row-click="handleClick"
                >
                  <el-table-column type="index" :index="typeIndex" label="序号" fixed="left" align="center" />
                  <el-table-column type="selection" width="55" />
                  <el-table-column prop="tarskNo" label="任务编号" width="140" align="left" />
                  <el-table-column prop="tarskName" label="任务名称" width="140" align="center" />
                  <el-table-column prop="startTime" label="任务开始时间" width="" align="center">
                    <template slot-scope="scope">
                      <el-date-picker v-model="scope.row.startTime" type="datetime" placeholder="选择开始日期时间" />
                    </template>
                  </el-table-column>
                  <el-table-column prop="endTime" label="任务结束时间" width="" align="center">
                    <template slot-scope="scope">
                      <el-date-picker v-model="scope.row.endTime" type="datetime" placeholder="选择结束日期时间" />
                    </template>
                  </el-table-column>
                  <el-table-column prop="resource" label="人员" width="" align="center">
                    <template>
                      <el-input placeholder="点击选择指定" :readonly="true" @focus="chooseClerk" />
                    </template>
                  </el-table-column>
                </el-table>
              </el-collapse-item>
              <el-collapse-item title="调研提纲填写" name="3">
                <el-collapse v-model="tabCards" accordion>
                  <el-collapse-item title="项目中长期规划" name="1">
                    <el-col :sm="24" :md="24">
                      <el-form-item label="">
                        <el-input type="textarea" :rows="8" maxlength="3000" show-word-limit placeholder="请输入调研提纲内容" />
                      </el-form-item>
                    </el-col>
                  </el-collapse-item>
                  <el-collapse-item title="项目立项背景、立项依据及程序" name="2">
                    <el-col :sm="24" :md="24">
                      <el-form-item label="">
                        <el-input type="textarea" :rows="8" maxlength="3000" show-word-limit placeholder="请输入调研提纲内容" />
                      </el-form-item>
                    </el-col>
                  </el-collapse-item>
                  <el-collapse-item title="项目相关政策" name="3">
                    <el-col :sm="24" :md="24">
                      <el-form-item label="">
                        <el-input type="textarea" :rows="8" maxlength="3000" show-word-limit placeholder="请输入调研提纲内容" />
                      </el-form-item>
                    </el-col>
                  </el-collapse-item>
                  <el-collapse-item title="项目绩效目标与工作要求" name="4">
                    <el-col :sm="24" :md="24">
                      <el-form-item label="">
                        <el-input type="textarea" :rows="8" maxlength="3000" show-word-limit placeholder="请输入调研提纲内容" />
                      </el-form-item>
                    </el-col>
                  </el-collapse-item>
                  <el-collapse-item title="从业务管理和资金管理角度，项目涉及的相关方有哪些，各相关方在项目流程中承担的职责是什么" name="5">
                    <el-col :sm="24" :md="24">
                      <el-form-item label="">
                        <el-input type="textarea" :rows="8" maxlength="3000" show-word-limit placeholder="请输入调研提纲内容" />
                      </el-form-item>
                    </el-col>
                  </el-collapse-item>
                  <el-collapse-item title="评价期间项目资金申报、批复、使用、调整及结余情况" name="6">
                    <el-col :sm="24" :md="24">
                      <el-form-item label="">
                        <el-input type="textarea" :rows="8" maxlength="3000" show-word-limit placeholder="请输入调研提纲内容" />
                      </el-form-item>
                    </el-col>
                  </el-collapse-item>
                  <el-collapse-item title="项目实施与效果情况" name="7">
                    <el-col :sm="24" :md="24">
                      <el-form-item label="">
                        <el-input type="textarea" :rows="8" maxlength="3000" show-word-limit placeholder="请输入调研提纲内容" />
                      </el-form-item>
                    </el-col>
                  </el-collapse-item>
                  <el-collapse-item title="项目中期监控和成果验收情况" name="8">
                    <el-col :sm="24" :md="24">
                      <el-form-item label="">
                        <el-input type="textarea" :rows="8" maxlength="3000" show-word-limit placeholder="请输入调研提纲内容" />
                      </el-form-item>
                    </el-col>
                  </el-collapse-item>
                  <el-collapse-item title="项目相关国际或国内实施情况与经验做法" name="9">
                    <el-col :sm="24" :md="24">
                      <el-form-item label="">
                        <el-input type="textarea" :rows="8" maxlength="3000" show-word-limit placeholder="请输入调研提纲内容" />
                      </el-form-item>
                    </el-col>
                  </el-collapse-item>
                  <el-collapse-item title="项目实施中的经验做法、存在问题与规划建议等" name="10">
                    <el-col :sm="24" :md="24">
                      <el-form-item label="">
                        <el-input type="textarea" :rows="8" maxlength="3000" show-word-limit placeholder="请输入调研提纲内容" />
                      </el-form-item>
                    </el-col>
                  </el-collapse-item>
                </el-collapse>
              </el-collapse-item>
              <el-collapse-item title="评价工作方案" name="4">
                <el-row>
                  <el-table
                    v-loading="listLoading"
                    :data="workScheme"
                    border
                    element-loading-text="给我一点时间"
                    fit
                    highlight-current-row
                    stripe
                    header-row-class-name="table-header"
                    size="small"
                    max-height="420"
                    style="width: 100%;margin-bottom:20px;"
                    @selection-change="handleSelectionChange"
                  >
                    <el-table-column type="index" :index="typeIndex" label="序号" fixed="left" align="center" />
                    <el-table-column prop="projectName" label="评价方案" width="" align="center" />
                    <el-table-column align="center" label="操作" width="" fixed="right">
                      <template>
                        <el-button
                          size="small"
                          plain
                          type="primary"
                        >预览</el-button>
                        <el-button
                          size="small"
                          plain
                          type="primary"
                        >下载</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <el-col :sm="24" :md="24">
                    <el-form-item label="专家意见" label-width="70">
                      <el-input type="textarea" />
                    </el-form-item>
                  </el-col>
                  <el-col :sm="24" :md="24">
                    <el-form-item label="专家建议" label-width="70">
                      <el-input type="textarea" />
                    </el-form-item>
                  </el-col>
                  <el-col :sm="24" :md="12">
                    <el-form-item label="附件" label-width="70">
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
                  <el-col :sm="24" :md="24">
                    <el-form-item label="专家签名" label-width="70">
                      <el-input type="textarea" />
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-collapse-item>
              <el-collapse-item title="审批记录信息" name="5">
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
              <el-step title="许丹一丰" description="2020-12-02 11:29:39" />
              <el-step title="张强" description="2020-12-03 15:49:25" />
              <el-step title="倪小平" description="" />
            </el-steps>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addChildShow = false">取 消</el-button>
        <el-button type="primary" @click="addChildShow = false">保 存</el-button>
        <!-- <el-button type="primary" @click="agreementSave(1)">通 过</el-button>
        <el-button type="danger" @click="agreementSave(0)">不通过</el-button> -->
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
            <!-- <el-col :sm="24" :md="12">
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
            </el-col> -->
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
  name: 'SchemeCompileCheck',
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
        approvalTime: '2020-10-09 10:20:10',
        designMan: '李宁',
        checkTime: '',
        checkMan: ''
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
        designMan: '李宛昱',
        checkTime: '2020-12-01 12:31:10',
        checkMan: '马辉'
      }],
      total: 1,
      addCheckShow: false,
      addChildShow: false,
      detailShow: false,
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
        projectType: 1,
        functionClassify: '一般公共服务支出-财政事务',
        ecoClassify: '公共管理、社会保障和社会组织-国家机构-国家行政机构-经济事务管理机构',
        riskLevel: 'C',
        tarskArr: [
          {
            id: 1,
            tarskNo: '1',
            tarskName: '组建工作组',
            startTime: '',
            endTime: '',
            resource: '',
            children: [
              {
                id: 11,
                tarskNo: '1.1',
                tarskName: '明确工作任务',
                startTime: '',
                endTime: '',
                resource: '',
                children: [
                  {
                    id: 111,
                    tarskNo: '1.1.1',
                    tarskName: '调研提纲拟定',
                    startTime: '',
                    endTime: '',
                    resource: '',
                  }, {
                    id: 112,
                    tarskNo: '1.1.2',
                    tarskName: '调研函拟定',
                    startTime: '',
                    endTime: '',
                    resource: '',
                  }, {
                    id: 113,
                    tarskNo: '1.1.3',
                    tarskName: '调研提纲填写',
                    startTime: '',
                    endTime: '',
                    resource: '',
                  }
                ]
              }, {
                id: 12,
                tarskNo: 1.2,
                tarskName: '组建专家组',
                startTime: '',
                endTime: '',
                resource: '',
              }
            ]
          },
          {
            id: 2,
            tarskNo: '2',
            tarskName: '资料收集',
            startTime: '',
            endTime: '',
            resource: '',
            children: [
              {
                id: 21,
                tarskNo: '2.1',
                tarskName: '资料清单拟定',
                startTime: '',
                endTime: '',
                resource: '',
                children: [
                  {
                    id: 211,
                    tarskNo: '2.1.1',
                    tarskName: '方案阶段资料清单',
                    startTime: '',
                    endTime: '',
                    resource: '',
                  }, {
                    id: 212,
                    tarskNo: '2.1.2',
                    tarskName: '预调研阶段资料清单',
                    startTime: '',
                    endTime: '',
                    resource: '',
                  }, {
                    id: 213,
                    tarskNo: '2.1.3',
                    tarskName: '调研阶段资料清单',
                    startTime: '',
                    endTime: '',
                    resource: '',
                  }
                ]
              }, {
                id: 22,
                tarskNo: '2.2',
                tarskName: '资料收集上传',
                startTime: '',
                endTime: '',
                resource: ''
              }
            ]
          }, {
            id: 3,
            tarskNo: '3',
            tarskName: '方案制定',
            startTime: '',
            endTime: '',
            resource: '',
            children: [
              {
                id: 31,
                tarskNo: '3.1',
                tarskName: '指标体系设计',
                startTime: '',
                endTime: '',
                resource: ''
              }, {
                id: 32,
                tarskNo: '3.2',
                tarskName: '指标体系审核',
                startTime: '',
                endTime: '',
                resource: ''
              }, {
                id: 33,
                tarskNo: '3.3',
                tarskName: '指标底稿设计',
                startTime: '',
                endTime: '',
                resource: ''
              }, {
                id: 34,
                tarskNo: '3.4',
                tarskName: '其他底稿设计',
                startTime: '',
                endTime: '',
                resource: ''
              }, {
                id: 35,
                tarskNo: '3.5',
                tarskName: '预调研',
                startTime: '',
                endTime: '',
                resource: '',
                children: [
                  {
                    id: 351,
                    tarskNo: '3.5.1',
                    tarskName: '拟定调研函',
                    startTime: '',
                    endTime: '',
                    resource: '',
                  }, {
                    id: 352,
                    tarskNo: '3.5.2',
                    tarskName: '拟定调研安排',
                    startTime: '',
                    endTime: '',
                    resource: '',
                  }, {
                    id: 353,
                    tarskNo: '3.5.3',
                    tarskName: '拟定调研提纲',
                    startTime: '',
                    endTime: '',
                    resource: '',
                  }, {
                    id: 354,
                    tarskNo: '3.5.4',
                    tarskName: '拟定调研函',
                    startTime: '',
                    endTime: '',
                    resource: '',
                  }, {
                    id: 355,
                    tarskNo: '3.5.5',
                    tarskName: '拟定调研问卷',
                    startTime: '',
                    endTime: '',
                    resource: '',
                  }, {
                    id: 356,
                    tarskNo: '3.5.6',
                    tarskName: '底稿填写',
                    startTime: '',
                    endTime: '',
                    resource: '',
                    children: [
                      {
                        id: 3561,
                        tarskNo: '3.5.6.1',
                        tarskName: '调研提纲填写',
                        startTime: '',
                        endTime: '',
                        resource: '',
                      }, {
                        id: 3562,
                        tarskNo: '3.5.6.2',
                        tarskName: '指标底稿填写',
                        startTime: '',
                        endTime: '',
                        resource: '',
                      }, {
                        id: 3563,
                        tarskNo: '3.5.6.3',
                        tarskName: '问卷填写',
                        startTime: '',
                        endTime: '',
                        resource: '',
                      }, {
                        id: 3564,
                        tarskNo: '3.5.6.4',
                        tarskName: '其他底稿',
                        startTime: '',
                        endTime: '',
                        resource: '',
                      }
                    ]
                  }
                ]
              }, {
                id: 36,
                tarskNo: '3.6',
                tarskName: '编制评价方案',
                startTime: '',
                endTime: '',
                resource: '',
                children: [
                  {
                    id: 361,
                    tarskNo: '3.6.1',
                    tarskName: '拟定调研安排',
                    startTime: '',
                    endTime: '',
                    resource: '',
                  }, {
                    id: 362,
                    tarskNo: '3.6.2',
                    tarskName: '拟定调研提纲',
                    startTime: '',
                    endTime: '',
                    resource: '',
                  }, {
                    id: 363,
                    tarskNo: '3.6.3',
                    tarskName: '拟定调研函',
                    startTime: '',
                    endTime: '',
                    resource: '',
                  }, {
                    id: 364,
                    tarskNo: '3.6.4',
                    tarskName: '拟定调查问卷',
                    startTime: '',
                    endTime: '',
                    resource: '',
                  }, {
                    id: 365,
                    tarskNo: '3.6.5',
                    tarskName: '编制评价工作方案',
                    startTime: '',
                    endTime: '',
                    resource: '',
                  }
                ]
              }, {
                id: 37,
                tarskNo: '3.7',
                tarskName: '审核评价方案',
                startTime: '',
                endTime: '',
                resource: '',
                children: [
                  {
                    id: 371,
                    tarskNo: '3.7.1',
                    tarskName: '专家评价会',
                    startTime: '',
                    endTime: '',
                    resource: ''
                  }
                ]
              }
            ]
          }, {
            id: 4,
            tarskNo: '4',
            tarskName: '评价实施',
            startTime: '',
            endTime: '',
            resource: '',
            children: [
              {
                id: 41,
                tarskNo: '4.1',
                tarskName: '现场调研',
                startTime: '',
                endTime: '',
                resource: '',
                children: [
                  {
                    id: 411,
                    tarskNo: '4.1.1',
                    tarskName: '底稿填写',
                    startTime: '',
                    endTime: '',
                    resource: '',
                    children: [
                      {
                        id: 4111,
                        tarskNo: '4.1.1.1',
                        tarskName: '调研提纲填写',
                        startTime: '',
                        endTime: '',
                        resource: '',
                      }, {
                        id: 4112,
                        tarskNo: '4.1.1.2',
                        tarskName: '指标底稿填写',
                        startTime: '',
                        endTime: '',
                        resource: '',
                      }, {
                        id: 4113,
                        tarskNo: '4.1.1.3',
                        tarskName: '问卷填写',
                        startTime: '',
                        endTime: '',
                        resource: '',
                      }, {
                        id: 4114,
                        tarskNo: '4.1.1.4',
                        tarskName: '其他底稿',
                        startTime: '',
                        endTime: '',
                        resource: '',
                      }
                    ]
                  }
                ]
              }, {
                id: 42,
                tarskNo: '4.2',
                tarskName: '初步问题汇总',
                startTime: '',
                endTime: '',
                resource: '',
              }, {
                id: 43,
                tarskNo: '4.3',
                tarskName: '初步评价结论编写',
                startTime: '',
                endTime: '',
                resource: '',
              }
            ]
          }, {
            id: 5,
            tarskNo: '5',
            tarskName: '报告编写',
            startTime: '',
            endTime: '',
            resource: '',
            children: [
              {
                id: 51,
                tarskNo: '5.1',
                tarskName: '编写评价报告',
                startTime: '',
                endTime: '',
                resource: '',
              }, {
                id: 52,
                tarskNo: '5.2',
                tarskName: '审核评价报告',
                startTime: '',
                endTime: '',
                resource: '',
                children: [
                  {
                    id: 521,
                    tarskNo: '5.2.1',
                    tarskName: '专家评价会',
                    startTime: '',
                    endTime: '',
                    resource: '',
                  }
                ]
              }
            ]
          }, {
            id: 6,
            tarskNo: '6',
            tarskName: '工作总结',
            startTime: '',
            endTime: '',
            resource: '',
            children: [
              {
                id: 61,
                tarskNo: '6.1',
                tarskName: '编写工作总结',
                startTime: '',
                endTime: '',
                resource: '',
              }
            ]
          }, {
            id: 7,
            tarskNo: '7',
            tarskName: '归档管理',
            startTime: '',
            endTime: '',
            resource: '',
            children: [
              {
                id: 71,
                tarskNo: '7.1',
                tarskName: '整理档案',
                startTime: '',
                endTime: '',
                resource: '',
              }
            ]
          }
          // {
          //   id: 8,
          //   tarskNo: '8',
          //   tarskName: '专家管理',
          //   startTime: '',
          //   endTime: '',
          //   resource: '',
          //   children: [
          //     {
          //       id: 81,
          //       tarskNo: '8.1',
          //       tarskName: '专家菜单一',
          //       startTime: '',
          //       endTime: '',
          //       resource: '',
          //     }, {
          //       id: 82,
          //       tarskNo: '8.2',
          //       tarskName: '专家菜单二',
          //       startTime: '',
          //       endTime: '',
          //       resource: '',
          //     }
          //   ]
          // }
        ],
      },
      title: '',
      checkForm: {
        riskLevel: null,
        checkResult: '',
        checkMan: '',
        checkTime: ''
      },
      checkCut: '4',
      workScheme: [
        {
          projectName: '绩效评价工作方案（以委托方名义出具）.doc',
        }, {
          projectName: '绩效评价工作方案（以我所名义出具）.doc',
        }
      ]
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
.detail-table tr:first-child{
  background-color: #F5FAFF;
}
</style>
