<script>
/*
 * @Author:张涛
 * @Date:   2020-12-01 18:10:24
 * @Last Modified by:   Your name
 * @Last Modified time: 2021-02-02 11:46:45
 */
</script>
<template>
  <div class="page-container">
    <div class="table-list-search">
      <el-form ref="listQuery" :model="listQuery" inline size="mini">
        <!-- <el-form-item label="项目编号" prop="companyName">
          <el-input v-model="listQuery.companyName" />
        </el-form-item> -->
        <!-- <el-form-item label="工作组名称">
          <el-input v-model="listQuery.clientCode" />
        </el-form-item>
        <el-form-item label="工作组编号">
          <el-input v-model="listQuery.clientName" />
        </el-form-item> -->
        <el-form-item label="项目名称" prop="companyName">
          <el-input v-model="listQuery.companyName" />
        </el-form-item>
        <el-form-item label="是否已分配任务" prop="companyName">
          <el-select v-model="listQuery.companyName">
            <el-option value="1" label="已分配" />
            <el-option value="2" label="未分配" />
          </el-select>
        </el-form-item>
        <el-form-item label="风险级别" prop="companyName">
          <el-select v-model="listQuery.companyName">
            <el-option value="1" label="A">A</el-option>
            <el-option value="2" label="B">B</el-option>
            <el-option value="3" label="C">C</el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item>
          <el-button class="moreSearch" type="text" @click="searchBoxShow" v-text="bottomSearchBoxShow?'收起':'更多筛选'" />
        </el-form-item> -->
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
        <!-- <el-table-column prop="workGroupName" label="工作组名称" width="110" align="center" />
        <el-table-column prop="workGroupNo" label="工作组编号" width="100" align="center" /> -->
        <el-table-column prop="projectName" label="项目名称" align="left" />
        <el-table-column prop="partner" label="项目负责合伙人" width="110" align="center" />
        <el-table-column prop="projectManager" label="项目经理" width="100" align="center" />
        <!-- <el-table-column prop="projectAid" label="项目秘书" align="center" /> -->
        <el-table-column prop="projectOutLeader" label="项目外勤主管" width="100" align="center" />
        <!-- <el-table-column prop="projectOutCrew" label="项目组员" align="center" /> -->
        <!-- <el-table-column prop="projectNo" label="项目编号" width="100" align="center" /> -->
        <!-- <el-table-column prop="clientName" label="客户名称" align="center" /> -->
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
        <el-table-column prop="isSure" label="是否已分配任务" width="80" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.isSure === 1">未分配</span>
            <span v-if="scope.row.isSure === 2">分配中</span>
            <span v-if="scope.row.isSure === 3">已分配</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="basicCondition" label="项目基本情况"  align="center"></el-table-column>
        <el-table-column prop="evaluateTarget" label="绩效评价目标"  align="center"></el-table-column>
        <el-table-column prop="workAsk" label="工作要求"  align="center"></el-table-column>
        <el-table-column prop="linkman" label="工作联系人名称"  align="center"></el-table-column>
        <el-table-column prop="linkmanPhone" label="工作联系人联系方式"  align="center"></el-table-column> -->
        <el-table-column prop="buildTime" label="最后调整时间" width="140" align="center" />
        <el-table-column prop="buildMan" label="分配人" width="80" align="center" />
        <el-table-column align="center" label="操作" width="150" fixed="right">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.isSure==1"
              size="small"
              plain
              type="primary"
              @click="taskAdd(scope.$index, scope.row)"
            >分配工作任务</el-button>
            <el-button
              v-if="scope.row.isSure==3"
              size="small"
              plain
              type="primary"
              @click="taskAdd(scope.$index, scope.row)"
            >修改</el-button>
            <el-button
              v-if="scope.row.isSure==3"
              size="small"
              plain
              type="primary"
              @click="taskLook(scope.$index, scope.row)"
            >详情</el-button>
            <el-button
              v-if="scope.row.isSure==2"
              size="small"
              plain
              type="primary"
              @click="taskAdd(scope.$index, scope.row)"
            >继续分配任务</el-button>
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
      title="评价工作任务信息"
      :close-on-click-modal="false"
      :visible.sync="addShow"
      @close="closeDialog"
    >
      <div class="dialog-body">
        <el-form :model="addForm" size="small" label-width="140px">
          <el-collapse v-model="activeName" accordion>
            <el-collapse-item title="工作组信息" name="1">
              <el-col :sm="24" :md="12">
                <el-form-item label="项目名称">
                  <el-input
                    v-model="addForm.projectName"
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
              <!-- <el-col :sm="24" :md="12">
              <el-form-item label="客户名称">
                <el-input v-model="addForm.clientName" placeholder="请输入内容" disabled />
              </el-form-item>
            </el-col> -->
              <el-col :sm="24" :md="12">
                <el-form-item label="业务类型">
                  <el-input value="非鉴证业务-政务软件服务-软件定制开发" disabled />
                </el-form-item>
              </el-col>
              <el-col :sm="24" :md="12">
                <el-form-item label="风险级别">
                  <el-select v-model="addForm.riskLevel" disabled>
                    <el-option label="A" :value="1" />
                    <el-option label="B" :value="2" />
                    <el-option label="C" :value="3" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :sm="24" :md="12">
                <el-form-item label="项目四级分类">
                  <el-select v-model="addForm.projectType" disabled>
                    <el-option label="财政评价项目" :value="1" selected="selected">财政评价项目</el-option>
                    <el-option label="部门评价项目" :value="2">部门评价项目</el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :sm="24" :md="12">
                <el-form-item label="预算支出功能分类">
                  <el-input v-model="addForm.functionClassify" placeholder="请输入内容" disabled />
                </el-form-item>
              </el-col>
              <el-col :sm="24" :md="24">
                <el-form-item label="国民经济行业分类">
                  <el-input v-model="addForm.ecoClassify" placeholder="请输入内容" disabled />
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
              <el-col :sm="24" :md="12">
                <el-form-item label="项目外勤主管">
                  <el-input
                    v-model="addForm.projectAid"
                    placeholder="由子项目名称带出"
                    disabled="disabled"
                  />
                </el-form-item>
              </el-col>
              <el-row>
                <!-- <el-col :xs="24" class="btn" style="text-align:right; margin-bottom:10px;">
                  <el-button type="primary" size="small" icon="el-icon-circle-plus" @click="partAdd">添加一行</el-button>
                </el-col> -->
                <el-col>
                  <el-form-item label="被评价单位" />
                </el-col>
                <table class="detail-table">
                  <tr>
                    <td>序号</td>
                    <td>被评价单位名称</td>
                    <td>工作联系人</td>
                    <td>联系方式</td>
                    <!-- <td>操作</td> -->
                  </tr>
                  <tr v-for="(item, index) in addForm.linkmanArr" :key="item.linkmanId">
                    <td>{{ index + 1 }}</td>
                    <td><el-input v-model="item.companyName" readonly /></td>
                    <td><el-input v-model="item.linkmanName" readonly /></td>
                    <td><el-input v-model="item.linkmanPhone" readonly /></td>
                    <!-- <td><el-button type="danger" icon="el-icon-delete" circle @click="partReduce" /></td> -->
                  </tr>
                </table>
              </el-row>
              <el-row>
                <el-col>
                  <el-form-item label="项目组员" />
                </el-col>
                <table class="detail-table">
                  <tr>
                    <td>序号</td>
                    <td>员工编号</td>
                    <td>姓名</td>
                    <td>所内级别</td>
                    <!-- <td>操作</td> -->
                  </tr>
                  <tr v-for="(item, index) in addForm.staffArr" :key="item.linkmanId">
                    <td>{{ index + 1 }}</td>
                    <td><el-input v-model="item.staffNo" readonly /></td>
                    <td><el-input v-model="item.staffName" /></td>
                    <td><el-input v-model="item.staffLevel" /></td>
                    <!-- <td><el-button type="danger" icon="el-icon-delete" circle @click="partReduce" /></td> -->
                  </tr>
                </table>
                <!-- <el-col :sm="24" :md="12">
              <el-form-item label="组建人">
                <el-input
                  v-model="addForm.buildMan"
                  placeholder="由子项目名称带出"
                  disabled="disabled"
                />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="组建时间">
                <el-input
                  v-model="addForm.buildTime"
                  placeholder="由子项目名称带出"
                  disabled="disabled"
                />
              </el-form-item>
            </el-col> -->
              </el-row>
            </el-collapse-item>
            <el-collapse-item title="评价工作任务信息" name="2">
              <el-row>
                <el-col :sm="24" :md="24">
                  <el-form-item label="项目基本情况">
                    <el-input type="textarea" :rows="5" maxlength="2000" show-word-limit placeholder="请输入" />
                  </el-form-item>
                </el-col>
                <el-col :sm="24" :md="24">
                  <el-form-item label="绩效评价目标">
                    <el-input type="textarea" :rows="5" maxlength="2000" show-word-limit placeholder="请输入" />
                  </el-form-item>
                </el-col>
                <el-col :sm="24" :md="24">
                  <el-form-item label="工作要求">
                    <el-input type="textarea" :rows="5" maxlength="2000" show-word-limit placeholder="请输入" />
                  </el-form-item>
                </el-col>
                <el-col :sm="24" :md="24">
                  <el-form-item label="其他">
                    <el-input type="textarea" :rows="3" placeholder="请输入" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" class="btn" style="margin-bottom:10px;">
                  <span>工作任务安排</span>
                  <el-button style="float:right;" type="primary" size="small" icon="el-icon-circle-plus" @click="taskpartAdd">增加子任务</el-button>
                </el-col>
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
                      <el-input placeholder="点击选择指定" readonly="true" @focus="chooseClerk" />
                    </template>
                  </el-table-column>
                </el-table>
                <!-- <table class="detail-table">
                  <tr>
                    <td>序号</td>
                    <td>任务编号</td>
                    <td>任务名称</td>
                    <td>任务开始时间</td>
                    <td>任务结束时间</td>
                    <td>资源</td>
                  </tr>
                  <tr v-for="(item, index) in addForm.workTaskArr" :key="item.id">
                    <td>{{ index + 1 }}</td>
                    <td />
                    <td><el-input placeholder="后台配置带出" /></td>
                    <td><el-button type="danger" icon="el-icon-delete" circle @click="taskpartReduce" /></td>
                  </tr>
                </table> -->
              </el-row>
              <el-row>
                <el-col :xs="24" class="btn" style="margin:10px 0;">
                  <span>调研提纲拟定</span>
                  <el-button style="float:right;" type="primary" size="small" icon="el-icon-circle-plus" @click="outlinepartAdd">添加一行</el-button>
                  <el-button style="float:right; margin" type="primary" size="small" icon="el-icon-upload2">导出</el-button>
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
              <el-row>
                <!-- <el-col :xs="24" class="btn" style="text-align:right; margin-bottom:10px;">
                  <el-button type="primary" size="small" icon="el-icon-circle-plus" @click="letterpartAdd">添加一行</el-button>
                </el-col>
                <table class="detail-table">
                  <tr>
                    <td>序号</td>
                    <td>调研函名称</td>
                    <td>操作</td>
                  </tr>
                  <tr v-for="(item, index) in addForm.letterArr" :key="item.id">
                    <td>{{ index + 1 }}</td>
                    <td><el-input /></td>
                    <td><el-button type="danger" icon="el-icon-delete" circle @click="letterpartReduce" /></td>
                  </tr>
                </table> -->
                <div>
                  <div style="margin-bottom:20px;">调研函拟定
                    <el-button style="float:right;" type="primary" size="small" icon="el-icon-upload2">导出</el-button>
                  </div>
                  <tinymce v-model="addForm.content" :height="400" />
                </div>
              </el-row>
            </el-collapse-item>
            <el-collapse-item title="调研提纲填写" name="4">
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
          </el-collapse>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addShow = false">取 消</el-button>
        <el-button type="warning" @click="holdSave">暂 存</el-button>
        <el-button type="primary" @click="submitSave">提 交</el-button>
      </span>
    </el-dialog>
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
            <el-collapse v-model="checkCut" accordion>
              <el-collapse-item title="项目基本信息" name="1">
                <el-row>
                  <el-form-item label="项目名称">
                    <el-col :span="18">
                      <el-input v-model="detailForm.projectName" disabled />
                    </el-col>
                  </el-form-item>
                  <el-form-item label="项目编号">
                    <el-col :span="18">
                      <el-input v-model="detailForm.projectNo" disabled />
                    </el-col>
                  </el-form-item>
                  <el-form-item label="业务类型">
                    <el-col :span="18">
                      <el-input value="非鉴证业务-政务软件服务-软件定制开发" disabled />
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
                  <el-col :sm="24" :md="24">
                    <el-form-item label="项目四级分类">
                      <el-select v-model="detailForm.projectType" disabled>
                        <el-option label="财政评价项目" :value="1">财政评价项目</el-option>
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
                  <el-col>
                    <el-form-item label="被评价单位" />
                  </el-col>
                  <table class="detail-table">
                    <tr>
                      <td>序号</td>
                      <td>被评价单位名称</td>
                      <td>工作联系人</td>
                      <td>联系方式</td>
                      <!-- <td>操作</td> -->
                    </tr>
                    <tr v-for="(item, index) in detailForm.linkmanArr" :key="item.linkmanId">
                      <td>{{ index + 1 }}</td>
                      <td><el-input v-model="item.companyName" readonly /></td>
                      <td><el-input /></td>
                      <td><el-input /></td>
                      <!-- <td><el-button type="danger" icon="el-icon-delete" circle @click="partReduce" /></td> -->
                    </tr>
                  </table>
                </el-row>
              </el-collapse-item>
              <el-collapse-item title="审批记录信息" name="2">
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
    <el-dialog
      width="90%"
      class="dialog"
      title="人员信息"
      :close-on-click-modal="false"
      :visible.sync="peopleShow"
      @close="closeDialog"
    >
      <div class="dialog-body">
        <div class="table-list-search">
          <el-form ref="listQuery" :model="listQuery" inline size="mini">
            <el-form-item label="员工编号" prop="companyName">
              <el-input v-model="listQuery.companyName" />
            </el-form-item>
            <el-form-item label="员工姓名" prop="companyName">
              <el-input v-model="listQuery.companyName" />
            </el-form-item>
            <el-form-item label="所属分所" prop="companyName">
              <el-input v-model="listQuery.companyName" />
            </el-form-item>
            <!-- <el-form-item label="职级" prop="companyName">
              <el-input v-model="listQuery.companyName" />
            </el-form-item> -->
            <el-form-item>
              <el-button size="mini" type="primary" icon="el-icon-search">查 询</el-button>
              <el-button size="mini" @click="listQueryReset">重 置</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="table-list">
          <el-table
            :data="peopleList"
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
            <el-table-column type="selection" fixed="left" align="center" />
            <el-table-column type="index" :index="peopleIndex" label="序号" fixed="left" align="center" />
            <el-table-column prop="serverBranch" label="所在分所" align="center" />
            <el-table-column prop="department" label="所在部门" align="center" />
            <el-table-column prop="level" label="所内级别" align="center" />
            <el-table-column prop="peopleNo" label="员工编号" align="center" />
            <el-table-column prop="peopleName" label="姓名" align="center" />
            <el-table-column prop="academy" label="毕业院校" align="center" />
            <el-table-column prop="education" label="学历" align="center" />
            <el-table-column prop="major" label="专业" align="center" />
            <el-table-column prop="isMain" label="是否为主评人" align="center" />
            <el-table-column prop="projectType" label="项目类型（业务类型）" align="center" />
            <el-table-column prop="projectRole" label="曾担任项目角色" align="center" />
            <el-table-column prop="suffer" label="年限+经验" align="center" />
            <el-table-column prop="remark" label="备注" align="center" />
          </el-table>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="peopleShow = false">取 消</el-button>
        <el-button type="primary">保 存</el-button>
      </span>
    </el-dialog>
    <el-dialog
      width="90%"
      class="dialog"
      title="人员信息"
      :close-on-click-modal="false"
      :visible.sync="peopleShow"
      @close="closeDialog"
    >
      <div class="dialog-body">
        <div class="table-list-search">
          <el-form ref="listQuery" :model="listQuery" inline size="mini">
            <el-form-item label="员工编号" prop="companyName">
              <el-input v-model="listQuery.companyName" />
            </el-form-item>
            <el-form-item label="员工姓名" prop="companyName">
              <el-input v-model="listQuery.companyName" />
            </el-form-item>
            <el-form-item label="所属分所" prop="companyName">
              <el-input v-model="listQuery.companyName" />
            </el-form-item>
            <!-- <el-form-item label="职级" prop="companyName">
              <el-input v-model="listQuery.companyName" />
            </el-form-item> -->
            <el-form-item>
              <el-button size="mini" type="primary" icon="el-icon-search">查 询</el-button>
              <el-button size="mini" @click="listQueryReset">重 置</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="table-list">
          <el-table
            :data="peopleList"
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
            <el-table-column type="selection" fixed="left" align="center" />
            <el-table-column type="index" :index="peopleIndex" label="序号" fixed="left" align="center" />
            <el-table-column prop="serverBranch" label="所在分所" align="center" />
            <el-table-column prop="department" label="所在部门" align="center" />
            <el-table-column prop="level" label="所内级别" align="center" />
            <el-table-column prop="peopleNo" label="员工编号" align="center" />
            <el-table-column prop="peopleName" label="姓名" align="center" />
            <el-table-column prop="academy" label="毕业院校" align="center" />
            <el-table-column prop="education" label="学历" align="center" />
            <el-table-column prop="major" label="专业" align="center" />
            <el-table-column prop="isMain" label="是否有主评人资格" align="center" />
            <el-table-column prop="projectType" label="项目类型（业务类型）" align="center" />
            <el-table-column prop="projectRole" label="曾担任项目角色" align="center" />
            <el-table-column prop="suffer" label="年限+经验" align="center" />
            <el-table-column prop="remark" label="备注" align="center" />
          </el-table>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="peopleShow = false">取 消</el-button>
        <el-button type="primary">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Tinymce from '@/components/Tinymce'
import { tableListMixin, globalMixin } from '@/utils/mixin'
import { isEmptyObject } from '@/utils/index'
export default {
  name: 'buildWorkTask',
  components: {
    Tinymce
  },
  mixins: [tableListMixin, globalMixin],
  data() {
    return {
      listQuery: {
        current: 1,
        size: 10
      },
      value1: '',
      peopleShow: false,
      chooseData: {},
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
          isSplit: 1
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
          isSplit: 1
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
          isSplit: 1
        }
      ],
      total: 1,
      addShow: false,
      detailShow: false,
      activeName: '2',
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
        linkmanArr: [
          {
            linkmanId: 1,
            companyName: '浙江省科学技术厅',
            linkmanName: '',
            linkmanPhone: ''
          }, {
            linkmanId: 2,
            companyName: '天津市司法局',
            linkmanName: '',
            linkmanPhone: ''
          }, {
            linkmanId: 3,
            companyName: '天津市滨海新区财政局',
            linkmanName: '',
            linkmanPhone: ''
          }
        ],
      },
      bottomSearchBoxShow: false,
      peopleShow: false,
      checkCut: '2',
      tabCards: 'first',
      title: '',
      peopleList: [{
        serverBranch: '天津分所',
        department: '管理咨询部',
        level: '合伙人',
        peopleNo: '201406741',
        peopleName: '王楠',
        academy: '南开大学',
        education: '本科',
        major: '金融学',
        isMain: '是',
        projectType: '咨询',
        projectRole: '项目合伙人',
        suffer: '10',
        remark: ''
      }, {
        serverBranch: '天津分所',
        department: '管理咨询部',
        level: '审计员B',
        peopleNo: '201766742',
        peopleName: '李东程',
        academy: '天津大学',
        education: '本科',
        major: '法学',
        isMain: '否',
        projectType: '审计',
        projectRole: '组员',
        suffer: '2',
        remark: ''
      }, {
        serverBranch: '天津分所',
        department: '管理咨询部',
        level: '三级项目经理A',
        peopleNo: '201606563',
        peopleName: '刘培培',
        academy: '河北工业大学',
        education: '本科',
        major: '资产评估',
        isMain: '否',
        projectType: '咨询',
        projectRole: '项目经理',
        suffer: '6',
        remark: ''
      }, {
        serverBranch: '天津分所',
        department: '管理咨询部',
        level: '高级审计员B',
        peopleNo: '201906123',
        peopleName: '朱小程',
        academy: '天津市职业大学',
        education: '本科',
        major: '工商管理',
        isMain: '否',
        projectType: '审计',
        projectRole: '项目外勤主管',
        suffer: '4',
        remark: ''
      }, {
        serverBranch: '浙江分所',
        department: '政务咨询部',
        level: '审计员A',
        peopleNo: '201517741',
        peopleName: '刘美美',
        academy: '浙江工业大学',
        education: '本科',
        major: '审计学',
        isMain: '否',
        projectType: '咨询',
        projectRole: '项目外勤主管',
        suffer: '7',
        remark: ''
      }, {
        serverBranch: '浙江分所',
        department: '政务咨询部',
        level: '审计员B',
        peopleNo: '201917642',
        peopleName: '陈泽涛',
        academy: '浙江财经大学',
        education: '本科',
        major: '审计学',
        isMain: '否',
        projectType: '咨询',
        projectRole: '组员',
        suffer: '3',
        remark: ''
      }],
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
        content: '<div style="text-align:center">关于开展XX项目绩效评价的函</div><br>XXXX:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;经XX单位领导批示同意，按照XX单位安排，现由我XX单位对你部门XX项目开展绩效评价工作。为保证评价工作的顺利进行，请你单位XX部门对绩效评价工作组予以支持，并通知有关业务部门（有关单位）积极配合，及时提供评价所需资料。<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;感谢大力支持！<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;XX单位联系人：<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;联系电话：<br><div style="text-align:right">XX单位</div><div style="text-align:right">20XX年X月X日</div>',
        staffArr: [
          {
            staffId: 1,
            staffNo: '201766742',
            staffName: '李东程',
            staffLevel: '审计员B'
          }, {
            staffId: 2,
            staffNo: '201917642',
            staffName: '陈泽涛',
            staffLevel: '审计员B'
          }
        ],
        linkmanArr: [
          {
            linkmanId: 1,
            companyName: '浙江省科学技术厅',
            linkmanName: '许丹一丰',
            linkmanPhone: '15678926722'
          }, {
            linkmanId: 2,
            companyName: '天津市司法局',
            linkmanName: '张涛',
            linkmanPhone: '17326792637'
          }, {
            linkmanId: 3,
            companyName: '天津市滨海新区财政局',
            linkmanName: '贾秀林',
            linkmanPhone: '18928282991'
          }
        ],
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
        workTaskArr: [
          {
            id: '',
            tarskNo: '',
            tarskName: '',
            startTime: '',
            endTime: '',
            resource: ''
          }
        ],
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
        letterArr: [
          {
            id: 1,
            letterName: ''
          }, {
            id: 2,
            letterName: ''
          }, {
            id: 3,
            letterName: ''
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
      ]
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
    // 展开查询更多
    searchBoxShow() {
      this.bottomSearchBoxShow = !this.bottomSearchBoxShow
    },
    peopleIndex (index) {
      return index
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
    closeDialog() {
      this.$refs['addForm'].resetFields()
    },
    chooseClerk() {
      this.peopleShow = true
    },
    handleClick(row, column, event) {
      this.chooseData = row
      console.log(row)
      console.log(column)
      console.log(event)
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
    outlinepartReduce() {
      this.addForm.outlineArr.splice(index, 1)
    },
    letterpartReduce() {
      this.addForm.letterArr.splice(index, 1)
    },
    taskpartAdd() {
      if (isEmptyObject(this.chooseData)) {
        this.$message('请先点击选择行！')
        return
      } else {
        const nodeId = this.chooseData.id
        console.log(this.addForm.tarskArr)
        this.addForm.tarskArr.forEach(item => {
          console.log(item.id,nodeId)
          if (item.id === nodeId) {
            const timepart = {
              id: '',
              tarskNo: '',
              tarskName: '',
              startTime: '',
              endTime: '',
              resource: ''
            }
            item.after(timepart)
          }
        })
      }
    },
    taskpartReduce() {
      this.addForm.workTaskArr.splice(index, 1)
    },
    chooseClerk() {
      this.peopleShow = true
    }
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
