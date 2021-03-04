<script>
/*
 * @Author: Your name
 * @Date:   2020-12-03 10:34:06
 * @Last Modified by:   Your name
 * @Last Modified time: 2020-12-15 18:47:36
 */
</script>
<template>
  <div class="page-container">
    <div class="table-list-search">
      <el-form ref="listQuery" :model="listQuery" inline size="mini">
        <el-form-item label="库别" prop="companyName">
          <el-input v-model="listQuery.companyName" />
        </el-form-item>
        <el-form-item label="操作类型" prop="companyName">
          <el-input v-model="listQuery.companyName" />
        </el-form-item>
        <el-form-item label="审批状态" prop="companyName">
          <el-select>
            <el-option value="1" label="暂存">暂存</el-option>
            <el-option value="2" label="审核中">审核中</el-option>
            <el-option value="3" label="已审核">已审核</el-option>
          </el-select>
        </el-form-item>
        <!-- <el-collapse-transition>
          <div v-show="bottomSearchBoxShow" style="display:inline-block;">
            <el-form-item label="项目经理">
              <el-input v-model="listQuery.clientName" />
            </el-form-item>
            <el-form-item label="项目外勤主管">
              <el-input v-model="listQuery.clientCode" />
            </el-form-item>
            <el-form-item label="审批状态" prop="companyName">
              <el-select>
                <el-option value="1" label="待审批" />
                <el-option value="2" label="已审批" />
              </el-select>
            </el-form-item>
          </div>
        </el-collapse-transition> -->
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
        <el-table-column prop="datebaseType" label="库别" width="110" align="center" />
        <el-table-column prop="projectType" label="操作类型" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.projectType === 1">入库申请</span>
            <span v-if="scope.row.projectType === 2">出库申请</span>
            <span v-if="scope.row.projectType === 3">修改申请</span>
          </template>
        </el-table-column>
        <el-table-column prop="buildMan" label="申请人" width="" align="center" />
        <el-table-column prop="approvalTime" label="申请时间" width="" align="center" />
        <el-table-column prop="status" label="审核状态" width="80" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 1">未审核</span>
            <span v-if="scope.row.status === 2">审核中</span>
            <span v-if="scope.row.status === 3">已审核</span>
            <span v-if="scope.row.status === 4">已退回</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="160" fixed="right">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.status === 1"
              size="small"
              plain
              type="primary"
              @click="checkBtn(scope.$index, scope.row)"
            >审批</el-button>
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
      title="审批信息"
      :close-on-click-modal="false"
      :visible.sync="approveShow"
      @close="closeDialog"
    >
      <div class="dialog-body" style="display:flex;">
        <div style="flex:4">
          <el-form :model="addForm" size="small" inline label-width="140px" label-position="center">
            <el-row>
              <el-col :sm="24" :md="12">
                <el-form-item label="入库数据库名称" prop="databaseName">
                  <el-select v-model="addForm.databaseName">
                    <el-option label="政策法规库" :value="1">政策法规库</el-option>
                    <el-option label="绩效指标库" :value="2">绩效指标库</el-option>
                    <el-option label="项目人员库" :value="3">项目人员库</el-option>
                    <el-option label="项目专家库" :value="4">项目专家库</el-option>
                    <el-option label="项目业绩库" :value="5">项目业绩库</el-option>
                    <el-option label="项目案例库" :value="6">项目案例库</el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="addForm.databaseName==1">
              <el-table
                v-loading="listLoading"
                :data="lawList"
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
                <el-table-column type="selection" width="55" align="center" fixed="left" />
                <el-table-column type="index" :index="typeIndex" label="序号" fixed="left" align="center" />
                <el-table-column prop="projectNo" label="文号" align="center" width="" />
                <el-table-column prop="clientName" label="政策法规名称" align="center" width="" />
                <el-table-column prop="childProjectName" label="发文单位" align="center" width="" />
                <el-table-column prop="childProjectNo" label="关键词" align="center" width="" />
                <el-table-column prop="functionClassify" label="行政地区" align="center" width="" />
              </el-table>
            </el-row>
            <el-row v-if="addForm.databaseName==2">
              <el-table
                v-loading="listLoading"
                :data="performanceList"
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
                <el-table-column type="selection" width="55" align="center" fixed="left" />
                <el-table-column type="index" :index="typeIndex" label="序号" fixed="left" align="center" />
                <el-table-column prop="databaseName" label="出库数据库名称" align="center" width="" />
                <el-table-column prop="projectNo" label="指标编码" align="center" width="" />
                <el-table-column prop="clientName" label="一级指标" align="center" width="" />
                <el-table-column prop="childProjectName" label="二级指标" align="center" width="" />
                <el-table-column prop="childProjectNo" label="三级指标" align="center" width="" />
                <el-table-column prop="functionClassify" label="指标解释" align="center" width="" />
                <el-table-column prop="riskLevel" label="入库原因" align="center" width="" />
              </el-table>
            </el-row>
            <el-row v-if="addForm.databaseName==3">
              <el-table
                v-loading="listLoading"
                :data="datebaseOutList"
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
                <el-table-column type="selection" width="55" align="center" fixed="left" />
                <el-table-column type="index" :index="typeIndex" label="序号" fixed="left" align="center" />
                <el-table-column prop="databaseName" label="所在分所" align="center" width="" />
                <el-table-column prop="projectNo" label="所在部门" align="center" width="" />
                <el-table-column prop="clientName" label="所内级别" align="center" width="" />
                <el-table-column prop="childProjectName" label="员工编号" align="center" width="" />
                <el-table-column prop="childProjectNo" label="姓名" align="center" width="" />
                <el-table-column prop="functionClassify" label="毕业院校" align="center" width="" />
                <el-table-column prop="riskLevel" label="学历" align="center" width="" />
                <el-table-column prop="riskLevel" label="专业" align="center" width="" />
                <el-table-column prop="riskLevel" label="是否为主评人" align="center" width="" />
                <el-table-column prop="riskLevel" label="项目类型（业务类型）" align="center" width="" />
                <el-table-column prop="riskLevel" label="曾担任项目角色" align="center" width="" />
                <el-table-column prop="riskLevel" label="年限+经验" align="center" width="" />
                <el-table-column prop="riskLevel" label="备注" align="center" width="" />
                <el-table-column prop="riskLevel" label="其他来源" align="center" width="" />
              </el-table>
            </el-row>
            <el-row v-if="addForm.databaseName==4">
              <el-table
                v-loading="listLoading"
                :data="datebaseOutList"
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
                <el-table-column type="selection" width="55" align="center" fixed="left" />
                <el-table-column type="index" :index="typeIndex" label="序号" fixed="left" align="center" />
                <el-table-column prop="databaseName" label="主要服务分所" align="center" width="" />
                <el-table-column prop="projectNo" label="所在行业（政府预算支出功能分类）一级分类" align="center" width="" />
                <el-table-column prop="clientName" label="所在行业（政府预算支出功能分类）二级分类" align="center" width="" />
                <el-table-column prop="childProjectName" label="所在行业（国民经济行业分类）门类" align="center" width="" />
                <el-table-column prop="childProjectNo" label="所在行业（国民经济行业分类）大类" align="center" width="" />
                <el-table-column prop="functionClassify" label="专家级别" align="center" width="" />
                <el-table-column prop="riskLevel" label="服务等级评定" align="center" width="" />
                <el-table-column prop="riskLevel" label="姓名" align="center" width="" />
                <el-table-column prop="riskLevel" label="身份证号" align="center" width="" />
                <el-table-column prop="riskLevel" label="职称" align="center" width="" />
                <el-table-column prop="riskLevel" label="学历" align="center" width="" />
                <el-table-column prop="riskLevel" label="院校" align="center" width="" />
                <el-table-column prop="riskLevel" label="电话、邮箱" align="center" width="" />
                <el-table-column prop="riskLevel" label="常住地（行政地区）省" align="center" width="" />
                <el-table-column prop="riskLevel" label="常住地（行政地区）市" align="center" width="" />
                <el-table-column prop="riskLevel" label="常住地（行政地区）区县" align="center" width="" />
                <el-table-column prop="riskLevel" label="主要研究方向" align="center" width="" />
                <el-table-column prop="riskLevel" label="主要著作" align="center" width="" />
                <el-table-column prop="riskLevel" label="课题成果" align="center" width="" />
                <el-table-column prop="riskLevel" label="参与所内项目数" align="center" width="" />
                <el-table-column prop="riskLevel" label="常住地（行政地区）省" align="center" width="" />
                <el-table-column prop="riskLevel" label="常住地（行政地区）省" align="center" width="" />
              </el-table>
            </el-row>
            <el-row v-if="addForm.databaseName==5">
              <el-table
                v-loading="listLoading"
                :data="datebaseOutList"
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
                <el-table-column type="selection" width="55" align="center" fixed="left" />
                <el-table-column type="index" :index="typeIndex" label="序号" fixed="left" align="center" />
                <el-table-column prop="databaseName" label="按政府预算支出功能分类（一级分类）" align="center" width="" />
                <el-table-column prop="projectNo" label="按政府预算支出功能分类（二级分类）" align="center" width="" />
                <el-table-column prop="clientName" label="按国民经济行业分类（门类）" align="center" width="" />
                <el-table-column prop="childProjectName" label="按国民经济行业分类（大类）" align="center" width="" />
                <el-table-column prop="childProjectNo" label="合同编号" align="center" width="" />
                <el-table-column prop="functionClassify" label="签约年度" align="center" width="" />
                <el-table-column prop="riskLevel" label="合同签约日期" align="center" width="" />
                <el-table-column prop="riskLevel" label="分所" align="center" width="" />
                <el-table-column prop="riskLevel" label="所属部门" align="center" width="" />
                <el-table-column prop="riskLevel" label="项目负责合伙人" align="center" width="" />
                <el-table-column prop="riskLevel" label="项目经理" align="center" width="" />
                <el-table-column prop="riskLevel" label="项目成员" align="center" width="" />
                <el-table-column prop="riskLevel" label="项目专家" align="center" width="" />
                <el-table-column prop="riskLevel" label="项目名称" align="center" width="" />
                <el-table-column prop="riskLevel" label="业务类型" align="center" width="" />
                <el-table-column prop="riskLevel" label="客户所属地区" align="center" width="" />
                <el-table-column prop="riskLevel" label="业务级别" align="center" width="" />
                <el-table-column prop="riskLevel" label="合同类别" align="center" width="" />
                <el-table-column prop="riskLevel" label="合同描述" align="center" width="" />
                <el-table-column prop="riskLevel" label="委托方（甲方）名称" align="center" width="" />
                <el-table-column prop="riskLevel" label="联系人（委托方）" align="center" width="" />
                <el-table-column prop="riskLevel" label="被评价对象" align="center" width="" />
                <el-table-column prop="riskLevel" label="委托方上一级客户名称" align="center" width="" />
                <el-table-column prop="riskLevel" label="备注" align="center" width="" />
              </el-table>
            </el-row>
            <el-row v-if="addForm.databaseName==6">
              <el-table
                v-loading="listLoading"
                :data="datebaseOutList"
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
                <el-table-column type="selection" width="55" align="center" fixed="left" />
                <el-table-column type="index" :index="typeIndex" label="序号" fixed="left" align="center" />
                <el-table-column prop="databaseName" label="按政府预算支出功能分类（一级分类）" align="center" width="" />
                <el-table-column prop="projectNo" label="按政府预算支出功能分类（二级分类）" align="center" width="" />
                <el-table-column prop="clientName" label="按国民经济行业分类（门类）" align="center" width="" />
                <el-table-column prop="childProjectName" label="按国民经济行业分类（大类）" align="center" width="" />
                <el-table-column prop="riskLevel" label="项目名称" align="center" width="" />
                <el-table-column prop="riskLevel" label="业务类型" align="center" width="" />
                <el-table-column prop="riskLevel" label="客户所属地区" align="center" width="" />
                <el-table-column prop="riskLevel" label="业务级别" align="center" width="" />
                <el-table-column prop="riskLevel" label="工作方案" align="center" width="" />
                <el-table-column prop="riskLevel" label="工作底稿" align="center" width="" />
                <el-table-column prop="riskLevel" label="评价报告" align="center" width="" />
                <el-table-column prop="riskLevel" label="其他重要文件" align="center" width="" />
                <el-table-column prop="riskLevel" label="备注" align="center" width="" />
              </el-table>
            </el-row>
            <!-- <el-row>
              <el-col :sm="24" :md="24">
                <el-form-item label="入库申请">
                  <el-input size="small" placeholder="填写入库原因" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :sm="24" :md="24">
                <el-form-item label="数据来源">
                  <el-radio-group v-model="addForm.dataFrom">
                    <el-radio :label="1">项目</el-radio>
                    <el-radio :label="2">非项目</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row> -->
            <el-row v-if="addForm.dataFrom==1">
              <el-table
                v-loading="listLoading"
                :data="databaseList"
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
                <el-table-column type="index" :index="typeIndex" label="序号" fixed="left" align="center" />
                <el-table-column prop="projectNo" label="项目编号" width="" align="center" />
                <el-table-column prop="projectName" label="项目名称" width="" align="center" />
                <el-table-column prop="projectType" label="项目类型" align="center">
                  <template slot-scope="scope">
                    <span v-if="scope.row.projectType === 1">A</span>
                    <span v-if="scope.row.projectType === 2">B</span>
                    <span v-if="scope.row.projectType === 3">C</span>
                  </template>
                </el-table-column>
                <el-table-column prop="clientName" label="客户名称" align="center" />
                <el-table-column prop="projectPartnerName" label="项目负责合伙人" width="" align="center" />
                <el-table-column prop="projectManager" label="项目经理" width="" align="center" />
              <!-- <el-table-column align="center" label="操作" fixed="right" width="120">
                <template slot-scope="scope">
                  <el-button
                    v-if="scope.row.status === 1"
                    size="small"
                    plain
                    type="primary"
                    @click="handelAdd(scope.$index, scope.row)"
                  >入库申请</el-button>
                  <el-button
                    v-if="scope.row.status === 2"
                    size="small"
                    plain
                    type="primary"
                    @click="handelAdd(scope.$index, scope.row)"
                  >修改</el-button>
                  <el-button
                    v-if="scope.row.status === 3"
                    size="small"
                    plain
                    type="primary"
                    @click="detailHandle(scope.$index, scope.row)"
                  >详情</el-button>
                </template>
              </el-table-column> -->
              </el-table>
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
              <el-step title="贾立华" description="" />
            </el-steps>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="approveShow = false">取 消</el-button>
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
      width="60%"
      class="dialog"
      title="详情"
      :close-on-click-modal="false"
      :visible.sync="detailShow"
      @close="closeDialog"
    >
      <div class="dialog-body">
        <div>详情信息待后续确认开发</div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="detailShow = false">取 消</el-button>
        <el-button type="primary">保 存</el-button>
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
      parentListQuery: {
        current: 1,
        size: 10
      },
      lawList: [{
        projectNo: '中发〔2018〕34号',
        clientName: '《中共中央 国务院关于全面实施预算绩效管理的意见》',
        childProjectName: '国务院',
        childProjectNo: '预算、绩效',
        functionClassify: '全国'
      }],//政策法规库
      list: [{
        projectType: 1,
        status: 1,
        datebaseType: '绩效指标库',
        buildMan: '李宁',
        approvalTime: '2020-12-02 11:12:35',
      }, {
        projectType: 2,
        status: 1,
        datebaseType: '政策法规库',
        buildMan: '李宁',
        approvalTime: '2020-12-02 11:12:35',
      }, {
        projectType: 3,
        status: 1,
        datebaseType: '项目案例库',
        buildMan: '李宁',
        approvalTime: '2020-12-02 11:12:35',
      }],
      total: 1,
      addCheckShow: false,
      addChildShow: false,
      title: '',
      addForm: {
        databaseName: 1,
        projectNo: '2020-07714-01-Z01',
        projectName: '2020-07714-01-Z01天津市滨海新区财政局-一般公共预算项目绩效评价',
        clientName: '天津市滨海新区财政局',
        projectType: 'A',
        projectOutLeader: '李宁',
        partner: '贾立华',
        projectManager: '马辉',
        projectAid: '李宁'
      },
      checkForm: {
        riskLevel: null,
        checkResult: '',
        checkTime: ''
      },
      fileUploadList: [{
        fileName: '相关行业标准及专业技术规范.doc',
        fileSize: '12.2MB',
        uploadMan: '许丹一丰',
        uploadTime: '2020-12-08 19:12:22'
      }, {
        fileName: '相关行业标准及专业技术规范.doc',
        fileSize: '20.3MB',
        uploadMan: '许丹一丰',
        uploadTime: '2020-12-08 19:12:22'
      }, {
        fileName: '相关管理制度.pdf',
        fileSize: '2.8MB',
        uploadMan: '许丹一丰',
        uploadTime: '2020-12-08 19:12:22'
      }],
      detailShow: false,
      bottomSearchBoxShow: false,
      approveShow: false
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
      this.approveShow = true
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
