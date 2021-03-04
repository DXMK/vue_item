<script>
/*
 * @Author: zhangtao
 * @Date:   2020-11-18 09:42:15
 * @Last Modified by:   Your name
 * @Last Modified time: 2021-02-02 12:03:46
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
        <el-form-item>
          <el-button size="mini" type="primary" icon="el-icon-search">查 询</el-button>
          <el-button size="mini" @click="listQueryReset">重 置</el-button>
        </el-form-item>
        <!-- <el-form-item label="客户名称" prop="companyName">
          <el-input v-model="listQuery.companyName" />
        </el-form-item> -->
        <!-- <el-form-item class="table-search-button">
          <el-button size="mini" type="primary" class="el-icon-download" @click="chooseItem"> 模板下载</el-button>
        </el-form-item> -->
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
        <!-- <el-table-column type="selection" width="55" align="center" fixed="left" /> -->
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
        <el-table-column prop="projectName" label="项目名称" width="" align="left" />
        <el-table-column prop="riskLevel" label="风险级别" width="70" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.riskLevel === 1">A</span>
            <span v-if="scope.row.riskLevel === 2">B</span>
            <span v-if="scope.row.riskLevel === 3">C</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="clientName" label="客户名称" align="center" /> -->
        <el-table-column prop="projectPartnerName" label="项目负责合伙人" width="100" align="center" />
        <el-table-column prop="projectManager" label="项目经理" width="100" align="center" />
        <!-- <el-table-column prop="projectSecretary" label="项目秘书" align="center" /> -->
        <el-table-column prop="designMan" label="拟定人" width="60" align="center" />
        <el-table-column prop="approvalTime" label="拟定时间" width="140" align="center" />
        <el-table-column prop="status" label="拟定状态" width="70" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 1">未拟定</span>
            <span v-if="scope.row.status === 2">已拟定</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="140" fixed="right">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.status === 1"
              size="small"
              plain
              type="primary"
              @click="handelAdd(scope.$index, scope.row)"
            >拟定调研安排</el-button>
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
                <td class="partStyle">调研地安排表.doc</td>
                <td><el-button size="mini" plain type="primary">下载</el-button></td>
              </tr>
              <tr>
                <td>2</td>
                <td class="partStyle">调研行程安排表.pdf</td>
                <td><el-button size="mini" plain type="primary">下载</el-button></td>
              </tr>
              <tr>
                <td>3</td>
                <td class="partStyle">调研人员安排表.doc</td>
                <td><el-button size="mini" plain type="primary">下载</el-button></td>
              </tr>
              <tr>
                <td>4</td>
                <td class="partStyle">调研差费旅备用金申请表.doc</td>
                <td><el-button size="mini" plain type="primary">下载</el-button></td>
              </tr>
              <tr>
                <td>5</td>
                <td class="partStyle">出差调研注意事项.doc</td>
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
    <!---详情-->
    <el-dialog
      width="90%"
      class="dialog"
      title="详情信息"
      :close-on-click-modal="false"
      :visible.sync="detailShow"
      @close="closeDialog"
    >
      <div class="dialog-body">
        <div>
          <el-form :model="addForm" label-width="140px" size="small">
            <el-collapse v-model="detailCheck" accordion>
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
                    <el-form-item label="被评价单位名称">
                      <el-input disabled placeholder="信息从管理平台带出" />
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
                  <el-col :sm="24" :md="12">
                    <el-form-item label="预算支出功能分类">
                      <el-input v-model="addForm.functionClassify" disabled />
                    </el-form-item>
                  </el-col>
                  <el-col :sm="24" :md="24">
                    <el-form-item label="国民经济行业分类">
                      <el-input v-model="addForm.ecoClassify" disabled />
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
              </el-collapse-item>
              <el-collapse-item title="调研安排表" name="2">
                <el-row>
                  <table border="1" class="detail-table">
                    <tr class="rowStyle">
                      <td rowspan="2">序号</td>
                      <td colspan="4">调研地</td>
                      <td colspan="3">调研行程</td>
                      <td colspan="2">调研人员</td>
                      <td rowspan="2">选择依据</td>
                      <td rowspan="2">数据来源</td>
                    </tr>
                    <tr class="rowStyle">
                      <td>省</td>
                      <td>市</td>
                      <td>县</td>
                      <td>详细地址</td>
                      <td>调研日期</td>
                      <td>调研天数</td>
                      <td>具体行程</td>
                      <td>组长</td>
                      <td>组员</td>
                    </tr>
                    <tr v-for="(item, index) in addForm.researchPlaceArr" :key="item.id">
                      <td>{{ index + 1 }}</td>
                      <td>
                        <el-select v-model="item.pZcode" @change="choseProvince">
                          <el-option v-for="params in proArr" :key="params.id" :value="params.id" :label="params.value" />
                        </el-select>
                      </td>
                      <td>
                        <el-select v-model="item.cZcode" @change="choseCity">
                          <el-option v-for="params in shiArr" :key="params.id" :value="params.id" :label="params.value" />
                        </el-select>
                      </td>
                      <td>
                        <el-select v-model="item.aZcode" @change="choseBlock">
                          <el-option v-for="params in quArr" :key="params.id" :value="params.id" :label="params.value" />
                        </el-select>
                      </td>
                      <td><el-input type="text" disabled /></td>
                      <td><el-input type="text" disabled /></td>
                      <td><el-input type="text" disabled /></td>
                      <td><el-input type="text" disabled /></td>
                      <td><el-input type="text" disabled /></td>
                      <td><el-input type="text" disabled /></td>
                      <td><el-input type="text" disabled /></td>
                      <td><el-input type="text" disabled /></td>
                    </tr>
                  </table>
                </el-row>
              </el-collapse-item>
              <!-- <el-collapse-item title="审批记录信息" name="3">
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
              </el-collapse-item> -->
            </el-collapse>
          </el-form>
        </div>
        <!-- <div style="flex:2;">
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
    <el-dialog
      width="90%"
      class="dialog"
      title="调研安排信息"
      :close-on-click-modal="false"
      :visible.sync="addChildShow"
      @close="closeDialog"
    >
      <div class="dialog-body">
        <el-form :model="addForm" label-width="140px" size="small">
          <el-collapse v-model="activeName" accordion>
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
                  <el-form-item label="风险级别">
                    <el-input v-model="addForm.riskLevel" disabled />
                  </el-form-item>
                </el-col>
                <!-- <el-col :sm="24" :md="12">
              <el-form-item label="客户名称">
                <el-input v-model="addForm.clientName" disabled />
              </el-form-item>
            </el-col> -->
                <el-col :sm="24" :md="12">
                  <el-form-item label="业务类型">
                    <el-input value="非鉴证业务-政务软件服务-软件定制开发" disabled />
                  </el-form-item>
                </el-col>
                <el-col :sm="24" :md="12">
                  <el-form-item label="被评价单位名称">
                    <el-input disabled placeholder="信息从管理平台带出" />
                  </el-form-item>
                </el-col>
                <el-col :sm="24" :md="12">
                  <el-form-item label="项目四级分类">
                    <el-select>
                      <el-option label="财政评价项目" :value="1" selected="selected">财政评价项目</el-option>
                      <el-option label="部门评价项目" :value="2">部门评价项目</el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :sm="24" :md="12">
                  <el-form-item label="预算支出功能分类">
                    <el-input v-model="addForm.functionClassify" disabled />
                  </el-form-item>
                </el-col>
                <el-col :sm="24" :md="24">
                  <el-form-item label="国民经济行业分类">
                    <el-input v-model="addForm.ecoClassify" disabled />
                  </el-form-item>
                </el-col>
                <el-col :sm="24" :md="12">
                  <el-form-item label="项目负责合伙人">
                    <el-input
                      v-model="addForm.projectPartnerName"
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
                      placeholder="由子项目名称带出"
                      disabled="disabled"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-collapse-item>
            <el-collapse-item title="调研安排表" name="2">
              <el-row>
                <el-col :xs="24" class="btn" style="text-align:right; margin-bottom:10px;">
                  <el-button type="primary" size="small" icon="el-icon-circle-plus-outline" @click="partAdd">添加一行</el-button>
                  <!-- <el-button type="primary" size="small" icon="el-icon-download" @click="testclick">指标导入</el-button> -->
                </el-col>
              </el-row>
              <el-row>
                <table border="1" class="detail-table">
                  <tr class="rowStyle">
                    <td rowspan="2">序号</td>
                    <td colspan="4">调研地</td>
                    <td colspan="3">调研行程</td>
                    <td colspan="2">调研人员</td>
                    <td rowspan="2">选择依据</td>
                    <td rowspan="2">数据来源</td>
                    <td rowspan="2">操作</td>
                  </tr>
                  <tr class="rowStyle">
                    <td>省</td>
                    <td>市</td>
                    <td>县</td>
                    <td>详细地址</td>
                    <td>调研日期</td>
                    <td>调研天数</td>
                    <td>具体行程</td>
                    <td>组长</td>
                    <td>组员</td>
                  </tr>
                  <tr v-for="(item, index) in addForm.researchPlaceArr" :key="item.id">
                    <td>{{ index + 1 }}</td>
                    <td>
                      <el-select v-model="item.pZcode" @change="choseProvince">
                        <el-option v-for="params in proArr" :key="params.id" :value="params.id" :label="params.value" />
                      </el-select>
                    </td>
                    <td>
                      <el-select v-model="item.cZcode" @change="choseCity">
                        <el-option v-for="params in shiArr" :key="params.id" :value="params.id" :label="params.value" />
                      </el-select>
                    </td>
                    <td>
                      <el-select v-model="item.aZcode" @change="choseBlock">
                        <el-option v-for="params in quArr" :key="params.id" :value="params.id" :label="params.value" />
                      </el-select>
                    </td>
                    <td><el-input type="text" /></td>
                    <td>
                      <el-date-picker
                        v-model="value1"
                        type="date"
                        placeholder="选择日期"
                      />
                    </td>
                    <td><el-input type="text" disabled placeholder="自动生成" /></td>
                    <td><el-input type="text" /></td>
                    <td>
                      <el-autocomplete
                        v-model="state"
                        :fetch-suggestions="querySearchAsync"
                        placeholder="请输入内容"
                        @select="handleSelect"
                      />
                    </td>
                    <td><el-input type="text" /></td>
                    <td><el-input type="text" /></td>
                    <td><el-input type="text" /></td>
                    <td>
                      <el-button type="danger" icon="el-icon-delete" circle @click="partReduce" />
                    </td>
                  </tr>
                </table>
              </el-row>
            </el-collapse-item>
            <!-- <el-collapse-item title="调研行程安排表" name="3">
              <el-row>
                <el-col :xs="24" class="btn" style="text-align:right; margin-bottom:10px;">
                  <el-button type="primary" size="small" icon="el-icon-circle-plus-outline" @click="journeypartAdd">添加一行</el-button>
                </el-col>
              </el-row>
              <el-row>
                <table border="1" class="detail-table">
                  <tr class="rowStyle">
                    <td>序号</td>
                    <td>日期</td>
                    <td>时间</td>
                    <td>行程</td>
                    <td>备注</td>
                    <td>操作</td>
                  </tr>
                  <tr v-for="(item, index) in addForm.researchJourneyArr" :key="item.id">
                    <td>{{ index + 1 }}</td>
                    <td><el-input type="text" /></td>
                    <td><el-input type="text" /></td>
                    <td><el-input type="text" /></td>
                    <td><el-input type="text" /></td>
                    <td>
                      <el-button type="danger" icon="el-icon-delete" circle @click="journeypartReduce" />
                    </td>
                  </tr>
                </table>
              </el-row>
            </el-collapse-item>
            <el-collapse-item title="调研人员安排表" name="4">
              <el-row>
                <el-col :xs="24" class="btn" style="text-align:right; margin-bottom:10px;">
                  <el-button type="primary" size="small" icon="el-icon-circle-plus-outline" @click="peoplepartAdd">添加一行</el-button>
                </el-col>
              </el-row>
              <el-row>
                <table border="1" class="detail-table">
                  <tr class="rowStyle">
                    <td>序号</td>
                    <td>姓名</td>
                    <td>性别</td>
                    <td>单位</td>
                    <td>级别</td>
                    <td>联系方式</td>
                    <td>备注</td>
                    <td>操作</td>
                  </tr>
                  <tr v-for="(item, index) in addForm.researchPeopleArr" :key="item.id">
                    <td>{{ index + 1 }}</td>
                    <td><el-input type="text" /></td>
                    <td><el-input type="text" /></td>
                    <td><el-input type="text" /></td>
                    <td><el-input type="text" /></td>
                    <td><el-input type="text" /></td>
                    <td><el-input type="text" /></td>
                    <td>
                      <el-button type="danger" icon="el-icon-delete" circle @click="peoplepartReduce" />
                    </td>
                  </tr>
                </table>
              </el-row>
            </el-collapse-item>
            <el-collapse-item title="调研差费旅备用金申请表" name="5">
              <el-row>
                <el-col :xs="24" class="btn" style="text-align:right; margin-bottom:10px;">
                  <el-button type="primary" size="small" icon="el-icon-circle-plus-outline" @click="cashpartAdd">添加一行</el-button>
                </el-col>
              </el-row>
              <el-row>
                <table border="1" class="detail-table">
                  <tr class="rowStyle">
                    <td rowspan="2">序号</td>
                    <td rowspan="2">省份</td>
                    <td rowspan="2">时间</td>
                    <td rowspan="2">类别</td>
                    <td rowspan="2">地点</td>
                    <td rowspan="2">单价</td>
                    <td rowspan="2">人数</td>
                    <td rowspan="2">小计</td>
                    <td colspan="2">备注</td>
                    <td rowspan="2">操作</td>
                  </tr>
                  <tr>
                    <td>人员</td>
                    <td>其他</td>
                  </tr>
                  <tr v-for="(item, index) in addForm.researchCashArr" :key="item.id">
                    <td>{{ index + 1 }}</td>
                    <td><el-input type="text" /></td>
                    <td><el-input type="text" /></td>
                    <td><el-input type="text" /></td>
                    <td><el-input type="text" /></td>
                    <td><el-input type="text" /></td>
                    <td><el-input type="text" /></td>
                    <td><el-input type="text" /></td>
                    <td><el-input type="text" /></td>
                    <td><el-input type="text" /></td>
                    <td>
                      <el-button type="danger" icon="el-icon-delete" circle @click="cashpartReduce" />
                    </td>
                  </tr>
                  <tr>
                    <td colspan="7">小 计</td>
                    <td />
                    <td />
                    <td />
                    <td />
                  </tr>
                  <tr>
                    <td colspan="7">机动费</td>
                    <td />
                    <td />
                    <td />
                    <td />
                  </tr>
                  <tr>
                    <td colspan="7">合 计</td>
                    <td />
                    <td />
                    <td />
                    <td />
                  </tr>
                </table>
              </el-row>
            </el-collapse-item> -->
          <!-- <el-row>
            <strong>调研安排信息</strong>
          </el-row>
          <el-divider />
          <el-row>
            <table class="detail-table">
              <tr>
                <td>序号</td>
                <td>名称</td>
                <td>文件记录</td>
                <td>上传时间</td>
                <td>操作</td>
              </tr>
              <tr>
                <td>1</td>
                <td>调研地安排</td>
                <td class="partStyle">调研地安排表.doc</td>
                <td>2020-12-08 12:22:19</td>
                <td>
                  <el-button size="mini" plain type="primary">上传</el-button>
                  <el-button size="mini" plain type="danger">删除</el-button>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>调研行程安排</td>
                <td class="partStyle">调研行程安排表.pdf</td>
                <td>2020-12-08 12:22:19</td>
                <td>
                  <el-button size="mini" plain type="primary">上传</el-button>
                  <el-button size="mini" plain type="danger">删除</el-button>
                </td>
              </tr>
              <tr>
                <td>3</td>
                <td>调研人员安排</td>
                <td class="partStyle">调研人员安排表.doc</td>
                <td>2020-12-08 12:22:19</td>
                <td>
                  <el-button size="mini" plain type="primary">上传</el-button>
                  <el-button size="mini" plain type="danger">删除</el-button>
                </td>
              </tr>
              <tr>
                <td>4</td>
                <td>调研差费旅备用金申请表</td>
                <td class="partStyle">调研差费旅备用金申请表.doc</td>
                <td>2020-12-08 12:22:19</td>
                <td>
                  <el-button size="mini" plain type="primary">上传</el-button>
                  <el-button size="mini" plain type="danger">删除</el-button>
                </td>
              </tr>
              <tr>
                <td>5</td>
                <td>出差调研注意事项</td>
                <td class="partStyle">出差调研注意事项.doc</td>
                <td>2020-12-08 12:22:19</td>
                <td>
                  <el-button size="mini" plain type="primary">上传</el-button>
                  <el-button size="mini" plain type="danger">删除</el-button>
                </td>
              </tr>
            </table>
          </el-row> -->
          </el-collapse>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addChildShow = false">取 消</el-button>
        <el-button type="warning" @click="holdSave">暂 存</el-button>
        <el-button type="primary" @click="submitSave">提 交</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import axios from 'axios'
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
      activeName: '2',
      partShow: false,
      value1: '',
      restaurants: [],
      state: '',
      timeout:  null,
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
        designMan: '李宁'
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
      total: 2,
      detailCheck: '2',
      addChildShow: false,
      detailShow: false,
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
        researchPlaceArr: [
          {
            id: '',
            pro: '',
            city: '',
            area: '',
            chooseGist: '',
            dataFrom: '',
            pZcode: '', // 省编码
            cZcode: '', // 市编码
            aZcode: '', // 区编码
          }
        ],
        researchJourneyArr: [
          {
            id: '',
            date: '',
            time: '',
            journery: '',
            remark: ''
          }
        ],
        researchPeopleArr: [
          {
            id: '',
            name: '',
            sex: '',
            company: '',
            level: '',
            phone: '',
            remark: ''
          }
        ],
        researchCashArr: [
          {
            id: '',
            pro: '',
            time: '',
            category: '',
            place: '',
            unitPrice: '',
            peoples: '',
            total: '',
            man: '',
            other: ''
          }
        ]
      },
      multipleSelection: [],
      quArr: [],
      shiArr: [],
      quArr: [],
    }
  },
  methods: {
    querySearchAsync(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 3000 * Math.random());
    },
    handleSelect(item) {
        console.log(item);
    },
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
    handleSelectionChange(selection, row) {
      this.multipleSelection = selection
    },
    handelAdd() {
      // if (this.multipleSelection.length <= 0) {
      //   this.$alert('请勾选要操作的项目！', '温馨提示', {
      //     confirmButtonText: '确定',
      //     type: 'warning'
      //   })
      //   return
      // } else if (this.multipleSelection.length > 1) {
      //   this.$alert('您只能勾选一条订单操作！', '温馨提示', {
      //     confirmButtonText: '确定',
      //     type: 'warning'
      //   })
      //   return
      // } else {
        this.addChildShow = true
      // }
    },
    // 模板下载选择
    chooseItem() {
      this.partShow = true
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
    detailHandle(index, row) {
      this.detailShow = true
    },
    // 添加
    partAdd() {
      const timepart = {
            id: '',
            pro: '',
            city: '',
            area: '',
            chooseGist: '',
            dataFrom: '',
            pZcode: '', // 省编码
            cZcode: '', // 市编码
            aZcode: '', // 区编码
          }
      this.addForm.researchPlaceArr.push(timepart)
    },
    // 删除
    partReduce(index) {
      this.addForm.researchPlaceArr.splice(index, 1)
    },
    journeypartAdd() {
      const timepart = {
            id: '',
            date: '',
            time: '',
            journery: '',
            remark: ''
          }
      this.addForm.researchJourneyArr.push(timepart)
    },
    journeypartReduce() {
      this.addForm.researchJourneyArr.splice(index, 1)
    },
    peoplepartAdd() {
      const timepart = {
            id: '',
            name: '',
            sex: '',
            company: '',
            level: '',
            phone: '',
            remark: ''
          }
      this.addForm.researchPeopleArr.push(timepart)
    },
    peoplepartReduce() {
      this.addForm.researchPeopleArr.splice(index, 1)
    },
    cashpartAdd() {
      const timepart = {
            id: '',
            pro: '',
            time: '',
            category: '',
            place: '',
            unitPrice: '',
            peoples: '',
            total: '',
            man: '',
            other: ''
          }
      this.addForm.researchCashArr.push(timepart)
    },
    cashpartReduce() {
      this.addForm.researchCashArr.splice(index, 1)
    },
    getCityData() {
      // 加载地点三级数据
      axios.get('./static/json/map.json').then(response => {
        const data = response.data.data
        this.proArr = []
        this.shiArr = []
        this.quArr = []
        // 省市区数据分类
        for (var item in data) {
          if (item.match(/0000$/)) {
            // 省
            this.proArr.push({
              id: item,
              value: data[item],
              children: []
            })
          } else if (item.match(/00$/)) {
            // 市
            this.shiArr.push({
              id: item,
              value: data[item],
              children: []
            })
          } else {
            // 区
            this.quArr.push({ id: item, value: data[item] })
          }
        }
        // 分类市级
        for (var index in this.proArr) {
          for (var index1 in this.shiArr) {
            if (
              this.proArr[index].id.slice(0, 2) ===
              this.shiArr[index1].id.slice(0, 2)
            ) {
              this.proArr[index].children.push(
                this.shiArr[index1]
              )
            }
          }
        }
        // 分类区级
        for (var item1 in this.shiArr) {
          for (var item2 in this.quArr) {
            if (
              this.quArr[item2].id.slice(0, 4) ===
              this.shiArr[item1].id.slice(0, 4)
            ) {
              this.shiArr[item1].children.push(
                this.quArr[item2]
              )
            }
          }
        }
        this.edit_provinceList = this.proArr
      })
    },
    choseProvince(e) {
      // 选择省份
      this.proArr.forEach((obj, index) => {
        if (e === obj.id) {
          this.shiArr = this.proArr[index].children
          this.cZcode = this.proArr[index].children[0].id
          this.quArr = this.proArr[index].children[0].children
          this.aZcode = this.proArr[
            index
          ].children[0].children[0].id
          this.proName = this.proArr[index].value
          this.shiName = this.proArr[index].children[0].value
          this.quName = this.proArr[
            index
          ].children[0].children[0].value
        }
      })
    },
    choseCity(e) {
      // 选择城市
      this.quArr = []
      this.shiArr.forEach((obj, index) => {
        if (e === obj.id) {
          this.cZcode = e
          this.quArr = this.shiArr[index].children
          this.aZcode = this.shiArr[index].children[0].id
          this.shiName = this.shiArr[index].value
          this.quName = this.shiArr[index].children[0].value
        }
      })
    },
    choseBlock(e) {
      this.quArr.forEach((obj, index) => {
        if (e === obj.id) {
          this.aZcode = e
          this.quName = this.quArr[index].value
        }
      })
    },
  },
  created() {
    this.getCityData()
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
