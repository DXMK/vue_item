<script>
/*
 * @Author: Your name
 * @Date:   2020-12-01 09:29:47
 * @Last Modified by:   Your name
 * @Last Modified time: 2020-12-10 17:11:49
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
        <el-form-item label="A/B/C分类" prop="companyName">
          <el-select>
            <el-option value="1" label="A">A</el-option>
            <el-option value="2" label="B">B</el-option>
            <el-option value="3" label="C">C</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户名称" prop="companyName">
          <el-input v-model="listQuery.companyName" />
        </el-form-item>
        <el-form-item class="table-search-button">
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="handelAdd">立项申请</el-button>
        </el-form-item>
        <el-collapse-transition>
          <div v-show="bottomSearchBoxShow" style="display:inline-block;">
            <el-form-item label="子项目编号">
              <el-input v-model="listQuery.clientName" />
            </el-form-item>
            <el-form-item label="子项目名称">
              <el-input v-model="listQuery.clientCode" />
            </el-form-item>
            <el-form-item label="子项目类型" prop="companyName">
              <el-select>
                <el-option value="1" label="A">A</el-option>
                <el-option value="2" label="B">B</el-option>
                <el-option value="3" label="C">C</el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-collapse-transition>
        <!-- <el-form-item>
          <el-button class="moreSearch" type="text" @click="searchBoxShow" v-text="bottomSearchBoxShow?'收起':'更多筛选'" />
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
        <el-table-column prop="projectName" label="项目名称" width="140" align="center" />
        <el-table-column prop="projectNo" label="项目编号" width="100" align="center" />
        <el-table-column prop="projectType" label="A/B/C分类" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.projectType === 1">A</span>
            <span v-if="scope.row.projectType === 2">B</span>
            <span v-if="scope.row.projectType === 3">C</span>
          </template>
        </el-table-column>
        <el-table-column prop="clientName" label="客户名称" align="center" />
        <!-- <el-table-column prop="isSplit" label="是否拆分子项目" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.isSplit === 1">是</span>
            <span v-if="scope.row.isSplit === 2">否</span>
          </template>
        </el-table-column> -->
        <!-- <el-table-column prop="childProjectNo" label="子项目编号" align="center" width="120" />
        <el-table-column prop="childProjectName" label="子项目名称" align="center" width="280" />
        <el-table-column prop="childProjectLevel" label="子项目类型" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.childProjectLevel === 1">A</span>
            <span v-if="scope.row.childProjectLevel === 2">B</span>
            <span v-if="scope.row.childProjectLevel === 3">C</span>
          </template>
        </el-table-column> -->
        <el-table-column prop="functionClassify" label="支出功能分类" width="230" align="center" />
        <el-table-column prop="ecoClassify" label="国民经济分类" width="220" align="center" />
        <el-table-column prop="riskLevel" label="风险级别" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.riskLevel === 1">高</span>
            <span v-if="scope.row.riskLevel === 2">中</span>
            <span v-if="scope.row.riskLevel === 3">低</span>
          </template>
        </el-table-column>
        <el-table-column prop="approvalTime" label="申请时间" width="140" align="center" />
        <el-table-column prop="status" label="状态" width="80" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 1">暂存</span>
            <span v-if="scope.row.status === 2">审批中</span>
            <span v-if="scope.row.status === 3">已审批</span>
            <span v-if="scope.row.status === 4">已退回</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.status === 1 || scope.row.status === 4"
              size="small"
              plain
              type="primary"
              @click="handelAdd(scope.$index, scope.row)"
            >修改</el-button>
            <el-button
              v-if="scope.row.status === 3 || scope.row.status === 2"
              size="small"
              plain
              type="primary"
              @click="detailHandle(scope.$index, scope.row)"
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
    <!-- 新增子项目弹窗 -->
    <el-dialog width="90%" class="dialog" :title="title" :visible.sync="addShow" @close="closeDialog">
      <div class="dialog-body">
        <div>
          <el-form ref="listQuery" :model="listQuery" inline size="mini">
            <el-form-item label="立项年度">
              <el-date-picker v-model="value3" type="year" placeholder="选择年" />
            </el-form-item>
            <el-form-item label="项目名称" prop="companyName">
              <el-input v-model="listQuery.companyName" />
            </el-form-item>
            <el-form-item label="项目编号" prop="companyName">
              <el-input v-model="listQuery.companyName" />
            </el-form-item>
            <el-form-item label="A/B/C分类" prop="companyName">
              <el-select>
                <el-option label="A" :value="1" />
                <el-option label="B" :value="2" />
                <el-option label="C" :value="3" />
              </el-select>
            </el-form-item>
            <el-form-item label="客户名称" prop="companyName">
              <el-input v-model="listQuery.companyName" />
            </el-form-item>
            <el-form-item>
              <el-button size="mini" type="primary" icon="el-icon-search">查询</el-button>
              <el-button size="mini" @click="listQueryReset">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
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
            <el-table-column prop="projectName" label="项目名称" align="center" />
            <el-table-column prop="projectNo" label="项目编号" align="center" />
            <el-table-column prop="clientName" label="客户名称" align="center" />
            <el-table-column prop="projectType" label="A/B/C分类" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.projectType === 1">A</span>
                <span v-if="scope.row.projectType === 2">B</span>
                <span v-if="scope.row.projectType === 3">C</span>
              </template>
            </el-table-column>
            <el-table-column prop="projectManager" label="项目经理" align="center" />
            <el-table-column prop="approvalTime" label="立项时间" width="140" align="center" />
            <el-table-column align="center" label="操作" width="140" fixed="right">
              <template slot-scope="scope">
                <el-button size="small" plain type="primary" @click="creatChildProject(scope.$index, scope.row)">申请立项</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- <div class="pagination-container">
          <el-pagination
            background
            :current-page="parentListQuery.current"
            :page-sizes="[10,20,30, 50]"
            :page-size="parentListQuery.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="parentTotal"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div> -->
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addShow = false">关 闭</el-button>
      </span>
    </el-dialog>
    <el-dialog
      width="90%"
      class="dialog"
      title="立项信息"
      :close-on-click-modal="false"
      :visible.sync="addChildShow"
      @close="closeDialog"
    >
      <div class="dialog-body">
        <el-form :model="addForm" size="small" label-width="120px" label-position="center">
          <el-row>
            <strong>项目信息</strong>
          </el-row>
          <el-divider />
          <el-row>
            <el-col :sm="24" :md="12">
              <el-form-item label="项目名称">
                <el-input v-model="addForm.projectName" disabled placeholder="信息从管理平台带出" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="项目编号">
                <el-input v-model="addForm.projectNo" disabled placeholder="信息从管理平台带出" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="A/B/C分类">
                <el-input v-model="addForm.projectType" disabled placeholder="信息从管理平台带出" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="客户名称">
                <el-input v-model="addForm.clientName" disabled placeholder="信息从管理平台带出" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="24" :md="24">
              <el-form-item label="是否拆分子项目">
                <el-switch
                  v-model="addForm.isSplit"
                  active-text="是"
                  inactive-text="否"
                  active-value="1"
                  inactive-value="0"
                  @change="stitchChange"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="addForm.isSplit==0">
            <el-col :sm="24" :md="12">
              <el-form-item label="支出功能分类">
                <el-input readonly="true" placeholder="点击选择" @focus="chooseClassify" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="国民经济分类">
                <el-input readonly="true" placeholder="点击选择" @focus="chooseBusiness" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="风险级别">
                <el-select v-model="addForm.riskLevel" placeholder="请选择">
                  <el-option label="请选择" value />
                  <el-option label="高" value="1" />
                  <el-option label="中" value="2" />
                  <el-option label="低" value="3" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="A/B/C分类">
                <el-input placeholder="" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="addForm.isSplit==1">
            <el-row>
              <el-col>
                <strong>子项目信息</strong>
              </el-col>
            </el-row>
            <el-divider />
            <el-col :xs="24" class="btn" style="text-align:right; margin-bottom:10px;">
              <el-button type="primary" icon="el-icon-circle-plus-outline" @click="partAdd">添加</el-button>
              <!-- <el-button type="primary" icon="el-icon-circle-plus-outline" circle @click="partAdd" /> -->
            </el-col>
            <!-- <div v-for="(item, index) in addForm.childProjectArr" :key="item.childProjectNo">
              <el-col :sm="24" :md="24">
                <strong>子项目{{ index + 1 }}</strong>
              </el-col>
              <el-col :sm="24" :md="12">
                <el-form-item label="子项目名称">
                  <el-input />
                </el-form-item>
              </el-col>
              <el-col :sm="24" :md="12">
                <el-form-item label="子项目编号">
                  <el-input disabled placeholder="系统自动生成" />
                </el-form-item>
              </el-col>
              <el-col :sm="24" :md="12">
                <el-form-item label="支出功能分类">
                  <el-input readonly="true" placeholder="点击选择" @focus="chooseClassify" />
                </el-form-item>
              </el-col>
              <el-col :sm="24" :md="12">
                <el-form-item label="国民经济分类">
                  <el-input readonly="true" placeholder="点击选择" @focus="chooseBusiness" />
                </el-form-item>
              </el-col>
              <el-col :sm="24" :md="12">
                <el-form-item label="风险级别">
                  <el-select v-model="addForm.riskLevel" placeholder="请选择">
                    <el-option label="请选择" value />
                    <el-option label="高" value="1" />
                    <el-option label="中" value="2" />
                    <el-option label="低" value="3" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :sm="24" :md="12">
                <el-button type="danger" icon="el-icon-delete" circle @click="partReduce" />
              </el-col>
            </div> -->
            <table class="detail-table">
              <tr>
                <td>子项目名称</td>
                <td>子项目编号</td>
                <td>支出功能分类</td>
                <td>国民经济分类</td>
                <td>风险级别</td>
                <td>A/B/C分类</td>
                <td>操作</td>
              </tr>
              <tr v-for="(item) in addForm.childProjectArr" :key="item.childProjectNo">
                <td><el-input /></td>
                <td><el-input disabled placeholder="系统自动生成" /></td>
                <td><el-input readonly="true" placeholder="点击选择" @focus="chooseClassify" /></td>
                <td><el-input readonly="true" placeholder="点击选择" @focus="chooseBusiness" /></td>
                <td><el-input /></td>
                <td>
                  <el-select v-model="addForm.riskLevel" placeholder="请选择">
                    <el-option label="请选择" value />
                    <el-option label="高" value="1" />
                    <el-option label="中" value="2" />
                    <el-option label="低" value="3" />
                  </el-select></td>
                <td><el-button type="danger" icon="el-icon-delete" circle @click="partReduce" /></td>
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
      width="60%"
      class="dialog"
      title="预算支出功能分类"
      :close-on-click-modal="false"
      :visible.sync="addFunctionShow"
      @close="closeDialog"
    >
      <div class="dialog-body">
        <el-form size="small">
          <el-tree
            ref="tree"
            :data="data"
            show-checkbox
            default-expand-all
            node-key="id"
            highlight-current
            :props="defaultProps"
          />
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addFunctionShow = false">取 消</el-button>
        <el-button type="primary" @click="holdSave">保 存</el-button>
      </span>
    </el-dialog>
    <el-dialog
      width="60%"
      class="dialog"
      title="国民经济行业分类"
      :close-on-click-modal="false"
      :visible.sync="addBusinessShow"
      @close="closeDialog"
    >
      <div class="dialog-body">
        <el-form size="small">
          <el-tree
            ref="tree"
            :data="dataList"
            show-checkbox
            default-expand-all
            node-key="id"
            highlight-current
            :props="businessDefaultProps"
          />
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addBusinessShow = false">取 消</el-button>
        <el-button type="primary" @click="holdSave">保 存</el-button>
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
          <el-form :model="detailForm" size="small" inline label-width="140px" label-position="center">
            <el-row>
              <strong>项目信息</strong>
            </el-row>
            <el-divider />
            <el-row>
              <el-col :sm="24" :md="12">
                <el-form-item label="项目编号">
                  <el-input v-model="detailForm.projectNo" disabled />
                </el-form-item>
              </el-col>
              <el-col :sm="24" :md="12">
                <el-form-item label="项目名称">
                  <el-input v-model="detailForm.projectName" disabled />
                </el-form-item>
              </el-col>
              <el-col :sm="24" :md="12">
                <el-form-item label="客户名称">
                  <el-input v-model="detailForm.clientName" disabled />
                </el-form-item>
              </el-col>
              <el-col :sm="24" :md="12">
                <el-form-item label="A/B/C分类">
                  <el-select v-model="detailForm.projectType" disabled>
                    <el-option label="A" :value="1" />
                    <el-option label="B" :value="2" />
                    <el-option label="C" :value="3" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :sm="24" :md="12">
                <el-form-item label="是否拆分之项目">
                  <el-input v-model="detailForm.isSplit" disabled />
                </el-form-item>
              </el-col>
              <!-- <el-col :sm="24" :md="12">
                <el-form-item label="子项目编号">
                  <el-input v-model="detailForm.childProjectNo" disabled />
                </el-form-item>
              </el-col>
              <el-col :sm="24" :md="12">
                <el-form-item label="子项目名称">
                  <el-input v-model="detailForm.childProjectName" disabled />
                </el-form-item>
              </el-col>
              <el-col :sm="24" :md="12">
                <el-form-item label="子A/B/C分类">
                  <el-input v-model="detailForm.childProjectType" disabled />
                </el-form-item>
              </el-col> -->
              <el-col :sm="24" :md="12">
                <el-form-item label="风险级别">
                  <el-input v-model="detailForm.riskLevel" disabled />
                </el-form-item>
              </el-col>
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
              <el-step title="倪小平" />
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
      parentListQuery: {
        current: 1,
        size: 10
      },
      value3: '2020',
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
        approvalTime: '2020-10-09 10:20:10'
      }, {
        projectNo: '2020-05764',
        projectName: '2020-05764-01-浙江省科学技术厅',
        clientName: '浙江省科学技术厅',
        projectType: 2,
        isSplit: 2,
        childProjectName: '',
        childProjectNo: '',
        childProjectLevel: null,
        functionClassify: '一般公共服务支出-人大事务-机关服务',
        ecoClassify: '采矿业-黑色金属矿采选业-铁矿采选',
        riskLevel: 2,
        status: 2,
        approvalTime: '2020-10-09 10:20:10'
      }, {
        projectNo: '2020-05764',
        projectName: '2020-05764-01-浙江省科学技术厅',
        clientName: '浙江省科学技术厅',
        projectType: 3,
        isSplit: 1,
        childProjectName: '2020-05764-01-浙江省科学技术厅-软件定制开发',
        childProjectNo: '2020-05764-01',
        childProjectLevel: 3,
        functionClassify: '一般公共服务支出-人大事务-机关服务',
        ecoClassify: '采矿业-黑色金属矿采选业-铁矿采选',
        riskLevel: 2,
        status: 3,
        approvalTime: '2020-10-09 10:20:10'
      }, {
        projectNo: '2020-05764',
        projectName: '2020-05764-01-浙江省科学技术厅',
        clientName: '浙江省科学技术厅',
        projectType: 3,
        isSplit: 1,
        childProjectName: '2020-05764-01-浙江省科学技术厅-软件定制开发',
        childProjectNo: '2020-05764-01',
        childProjectLevel: 3,
        functionClassify: '一般公共服务支出-人大事务-机关服务',
        ecoClassify: '采矿业-黑色金属矿采选业-铁矿采选',
        riskLevel: 2,
        status: 4,
        approvalTime: '2020-10-09 10:20:10'
      }],
      total: 1,
      parentTotal: 1,
      addShow: false,
      addChildShow: false,
      addFunctionShow: false,
      title: '',
      addForm: {
        projectName: '2020-05764-浙江省科学技术厅',
        projectNo: '2020-05764',
        clientName: '浙江省科学技术厅',
        projectType: 'A',
        isSplit: '0',
        childProjectArr: [
          {
            childProjectName: '',
            childProjectNo: ''
          }
        ]
      },
      parentList: [
        {
          projectNo: '2020-05764',
          projectName: '2020-05764-浙江省科学技术厅',
          clientName: '浙江省科学技术厅',
          projectType: 1,
          projectManager: '张强',
          approvalTime: '2020-10-10 09:00:00'
        },
        {
          projectNo: '2020-05764',
          projectName: '2020-05764-浙江省科学技术厅',
          clientName: '浙江省科学技术厅',
          projectType: 1,
          projectManager: '张强',
          approvalTime: '2020-10-10 09:00:00'
        },
        {
          projectNo: '2020-05764',
          projectName: '2020-05764-浙江省科学技术厅',
          clientName: '浙江省科学技术厅',
          projectType: 1,
          projectManager: '张强',
          approvalTime: '2020-10-10 09:00:00'
        }
      ],
      detailForm: {
        projectNo: '2020-05764',
        projectName: '2020-05764-浙江省科学技术厅',
        clientName: '浙江省科学技术厅',
        projectType: 1,
        isSplit: '是',
        childProjectName: '2020-05764-01-浙江省科学技术厅-软件定制开发',
        childProjectNo: '2020-05764-01',
        childProjectType: 'B',
        riskLevel: '中'
      },
      data: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      addBusinessShow: false,
      dataList: [],
      businessDefaultProps: {
        children: 'children',
        label: 'label'
      },
      detailShow: false,
      bottomSearchBoxShow: false,
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
    handelAdd() {
      this.title = '立项申请'
      this.addShow = true
      this.addForm.companyType = '' // 经营体名称
    },
    closeDialog() {
      this.$refs['addForm'].resetFields()
    },
    // 添加
    partAdd() {
      console.log(this.addForm.childProjectArr)
      if (this.addForm.childProjectArr.length > 4) {
        this.$message({
          type: 'warning',
          message: '最多设置5个子项目!'
        })
        return false
      }
      const timepart = {
        childProjectName: '',
        childProjectNo: ''
      }
      this.addForm.childProjectArr.push(timepart)
    },
    // 删除
    partReduce(index) {
      this.addForm.childProjectArr.splice(index, 1)
    },
    creatChildProject(index, row) {
      this.addChildShow = true
    },
    holdSave() {
      this.addChildShow = false
      this.addShow = false
    },
    submitSave() {
      this.addChildShow = false
      this.addShow = false
    },
    // 是否拆分switch
    stitchChange(val) {
      console.log(val)
    },
    // 预算支出功能弹窗
    chooseClassify() {
      this.addFunctionShow = true
      this.getFunctionData()
    },
    getFunctionData() {
      axios.get('./static/json/expend.json').then((response) => {
        const data = response.data.data
        this.data = data
      })
    },
    // 国民经济行业分类功能弹窗
    chooseBusiness() {
      this.addBusinessShow = true
      this.getBusinessData()
    },
    getBusinessData() {
      axios.get('./static/json/business.json').then((response) => {
        const data = response.data.data
        this.dataList = data
      })
    },
    detailHandle(index, row) {
      this.detailShow = true
    }
  }
}
</script>
<style rel="stylesheet/less" lang="less" scoped>

</style>
