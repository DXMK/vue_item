<script>
/*
 * @Author: Your name
 * @Date:   2020-12-03 10:34:06
 * @Last Modified by:   Your name
 * @Last Modified time: 2021-01-27 10:49:07
 */
</script>
<template>
  <div class="page-container">
    <div class="table-list-search">
      <el-form ref="listQuery" :model="listQuery" inline size="mini">
        <el-row>
          <el-form-item label="库别" prop="companyName">
            <el-input v-model="listQuery.companyName" />
          </el-form-item>
          <el-form-item label="操作类型" prop="companyName">
            <el-input v-model="listQuery.companyName" />
          </el-form-item>
          <el-form-item label="审批状态" prop="companyName">
            <el-select>
              <el-option value="1" label="未审核">未审核</el-option>
              <el-option value="2" label="审核中">审核中</el-option>
              <el-option value="3" label="已审核">已审核</el-option>
              <el-option value="4" label="已退回">已退回</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="申请人" prop="companyName">
            <el-input v-model="listQuery.companyName" />
          </el-form-item>
          <el-form-item>
            <el-button size="mini" type="primary" icon="el-icon-search">查 询</el-button>
            <el-button size="mini" @click="listQueryReset">重 置</el-button>
          </el-form-item>
        </el-row>
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
          <el-button size="mini" type="primary" @click="handelAdd()">入库申请</el-button>
          <el-button size="mini" type="primary" @click="databaseOut()">出库申请</el-button>
          <el-button size="mini" type="primary" @click="updateBase()">修改申请</el-button>
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
              size="small"
              plain
              type="primary"
              @click="detailHandle(scope.$index, scope.row)"
            >详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--入库-->
    <el-dialog
      width="90%"
      class="dialog"
      title="入库申请单"
      :close-on-click-modal="false"
      :visible.sync="addChildShow"
      @close="closeDialog"
    >
      <div class="dialog-body">
        <el-form :model="addForm" size="small" label-width="120px" label-position="center">
          <!-- <el-row>
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
                  disabled="disabled"
                />
              </el-form-item>
            </el-col>
          </el-row> -->
          <!-- <el-row>
            <strong>入库信息</strong>
          </el-row>
          <el-divider /> -->
          <el-row>
            <el-col :sm="24" :md="12">
              <el-form-item label="入库数据库名称" prop="databaseName">
                <el-select v-model="addForm.databaseName">
                  <el-option label="政策法规库" :value="1">政策法规库</el-option>
                  <el-option label="绩效指标库" :value="2">绩效指标库</el-option>
                  <!-- <el-option label="项目人员库" :value="3">项目人员库</el-option> -->
                  <el-option label="项目专家库" :value="4">项目专家库</el-option>
                  <el-option label="项目业绩库" :value="5">项目业绩库</el-option>
                  <el-option label="项目案例库" :value="6">项目案例库</el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col v-if="addForm.databaseName==6" :sm="24" :md="24">
              <el-form-item label="案例库类型">
                <el-radio-group v-model="addForm.dataFrom" @change="chooseProject">
                  <el-radio :label="1">完整案例</el-radio>
                  <el-radio :label="2">独立案例-调查问卷</el-radio>
                  <el-radio :label="3">独立案例-评价扣分表</el-radio>
                  <el-radio :label="4">问题与建议库</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <!-- <el-col :sm="24" :md="24">
              <el-form-item label="数据来源">
                <el-radio-group v-model="addForm.dataFrom" @change="chooseProject">
                  <el-radio :label="1">项目</el-radio>
                  <el-radio :label="2">非项目</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col> -->
            <el-col :sm="24" :md="12">
              <el-form-item label="申请人">
                <el-input v-model="addForm.applyMan" disabled placeholder="" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="申请时间">
                <el-input v-model="addForm.applyTime" disabled placeholder="" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="24">
              <el-form-item label="入库申请">
                <el-input size="small" placeholder="填写入库原因" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="addForm.databaseName==1">
            <el-col :xs="24" class="btn" style="text-align:left; margin-bottom:10px;">
              <el-button type="primary" icon="el-icon-circle-plus-outline" @click="partAdd">添加一行</el-button>
              <!-- <el-button type="primary" icon="el-icon-download" @click="testclick">专家导入</el-button> -->
            </el-col>
            <table class="detail-table">
              <tr>
                <td>文号</td>
                <td>政策法规名称</td>
                <td>发文单位</td>
                <td>关键词</td>
                <td>行政地区</td>
                <td>正文</td>
                <td>操作</td>
              </tr>
              <tr v-for="(item) in addForm.professorArr" :key="item.professorName">
                <td><el-input /></td>
                <td><el-input placeholder="" /></td>
                <td><el-input placeholder="" /></td>
                <td><el-input placeholder="" /></td>
                <td><el-input placeholder="" /></td>
                <td><el-input placeholder="" /></td>
                <td><el-button type="danger" icon="el-icon-delete" circle @click="partReduce" /></td>
              </tr>
            </table>
            <!-- <el-col :sm="24" :md="12">
              <el-form-item label="文号">
                <el-input />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="政策法规名称">
                <el-input />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="发文单位">
                <el-input />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="关键词">
                <el-input size="small" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="行政地区">
                <el-input size="small" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="正文">
                <template>
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
                </template>
              </el-form-item>
            </el-col> -->
          </el-row>
          <el-row v-if="addForm.databaseName==2">
            <el-col :xs="24" class="btn" style="text-align:left; margin-bottom:10px;">
              <el-button type="primary" icon="el-icon-circle-plus-outline" @click="partAdd">添加一行</el-button>
              <!-- <el-button type="primary" icon="el-icon-download" @click="testclick">专家导入</el-button> -->
            </el-col>
            <table class="detail-table">
              <tr>
                <td>指标编码</td>
                <td>一级指标</td>
                <td>二级指标</td>
                <td>三级指标</td>
                <td>指标解释</td>
                <td>入库原因</td>
                <td>其他来源</td>
                <td>操作</td>
              </tr>
              <tr v-for="(item) in addForm.professorArr" :key="item.professorName">
                <td><el-input /></td>
                <td><el-input placeholder="" /></td>
                <td><el-input placeholder="" /></td>
                <td><el-input placeholder="" /></td>
                <td><el-input placeholder="" /></td>
                <td><el-input placeholder="" /></td>
                <td><el-input placeholder="" /></td>
                <td><el-button type="danger" icon="el-icon-delete" circle @click="partReduce" /></td>
              </tr>
            </table>
          </el-row>
          <el-row v-if="addForm.databaseName==3">
            <el-col :xs="24" class="btn" style="text-align:left; margin-bottom:10px;">
              <el-button type="primary" icon="el-icon-circle-plus-outline" @click="partAdd">添加一行</el-button>
              <!-- <el-button type="primary" icon="el-icon-download" @click="testclick">专家导入</el-button> -->
            </el-col>
            <table class="detail-table">
              <tr>
                <td>所在分所</td>
                <td>所在部门</td>
                <td>所内级别</td>
                <td>员工编号</td>
                <td>姓名</td>
                <td>毕业院校</td>
                <td>学历</td>
                <td>专业</td>
                <td>是否为主评人</td>
                <td>项目类型（业务类型）</td>
                <td>曾担任项目角色</td>
                <td>年限+经验</td>
                <td>备注</td>
                <td>其他来源</td>
                <td>操作</td>
              </tr>
              <tr v-for="(item) in addForm.professorArr" :key="item.professorName">
                <td><el-input /></td>
                <td><el-input placeholder="" /></td>
                <td><el-input placeholder="" /></td>
                <td><el-input placeholder="" /></td>
                <td><el-input placeholder="" /></td>
                <td><el-input placeholder="" /></td>
                <td><el-input placeholder="" /></td>
                <td><el-input placeholder="" /></td>
                <td><el-input placeholder="" /></td>
                <td><el-input placeholder="" /></td>
                <td><el-input placeholder="" /></td>
                <td><el-input placeholder="" /></td>
                <td><el-input placeholder="" /></td>
                <td><el-input placeholder="" /></td>
                <td><el-button type="danger" icon="el-icon-delete" circle @click="partReduce" /></td>
              </tr>
            </table>
          </el-row>
          <el-row v-if="addForm.databaseName==4">
            <el-col :xs="24" class="btn" style="text-align:left; margin-bottom:10px;">
              <el-button type="primary" icon="el-icon-circle-plus-outline" @click="partAdd">添加一行</el-button>
              <!-- <el-button type="primary" icon="el-icon-download" @click="testclick">专家导入</el-button> -->
            </el-col>
            <table class="detail-table">
              <tr>
                <td>主要服务分所</td>
                <td>所在行业（政府预算支出功能分类）一级分类</td>
                <td>所在行业（政府预算支出功能分类）二级分类</td>
                <td>所在行业（国民经济行业分类）门类</td>
                <td>所在行业（国民经济行业分类）大类</td>
                <td>专家级别</td>
                <td>服务等级评定</td>
                <td>姓名</td>
                <td>身份证号</td>
                <td>职称</td>
                <td>学历</td>
                <td>院校</td>
                <td>电话、邮箱</td>
                <td>常住地（行政地区）省</td>
                <td>常住地（行政地区）市</td>
                <td>常住地（行政地区）区县</td>
                <td>主要研究方向</td>
                <td>主要著作</td>
                <td>课题成果</td>
                <td>参与所内项目数</td>
                <td>操作</td>
              </tr>
              <tr v-for="(item) in addForm.professorArr" :key="item.professorName">
                <td><el-input /></td>
                <td><el-input placeholder="" /></td>
                <td><el-input placeholder="" /></td>
                <td><el-input placeholder="" /></td>
                <td><el-input placeholder="" /></td>
                <td><el-input placeholder="" /></td>
                <td><el-input placeholder="" /></td>
                <td><el-input placeholder="" /></td>
                <td><el-input placeholder="" /></td>
                <td><el-input placeholder="" /></td>
                <td><el-input placeholder="" /></td>
                <td><el-input placeholder="" /></td>
                <td><el-input placeholder="" /></td>
                <td><el-input placeholder="" /></td>
                <td><el-input placeholder="" /></td>
                <td><el-input placeholder="" /></td>
                <td><el-input placeholder="" /></td>
                <td><el-input placeholder="" /></td>
                <td><el-input placeholder="" /></td>
                <td><el-input placeholder="" /></td>
                <td><el-button type="danger" icon="el-icon-delete" circle @click="partReduce" /></td>
              </tr>
            </table>
          </el-row>
          <el-row v-if="addForm.databaseName==5">
            <el-col :xs="24" class="btn" style="text-align:left; margin-bottom:10px;">
              <el-button type="primary" icon="el-icon-circle-plus-outline" @click="partAdd">添加一行</el-button>
              <!-- <el-button type="primary" icon="el-icon-download" @click="testclick">专家导入</el-button> -->
            </el-col>
            <table class="detail-table">
              <tr>
                <td>按政府预算支出功能分类（一级分类）</td>
                <td>按政府预算支出功能分类（二级分类）</td>
                <td>按国民经济行业分类（门类）</td>
                <td>按国民经济行业分类（大类）</td>
                <td>合同编号</td>
                <td>签约年度</td>
                <td>合同签约日期</td>
                <td>分所</td>
                <td>所属部门</td>
                <td>项目负责合伙人</td>
                <td>项目经理</td>
                <td>项目成员</td>
                <td>项目名称</td>
                <td>业务类型</td>
                <td>客户所属地区</td>
                <td>业务级别</td>
                <td>合同类别</td>
                <td>合同描述</td>
                <td>委托方（甲方）名称</td>
                <td>联系人（委托方）</td>
                <td>委托方上一级客户名称</td>
                <td>备注</td>
                <td>操作</td>
              </tr>
              <tr v-for="(item) in addForm.professorArr" :key="item.professorName">
                <td><el-input /></td>
                <td><el-input placeholder="" /></td>
                <td><el-input placeholder="" /></td>
                <td><el-input placeholder="" /></td>
                <td><el-input placeholder="" /></td>
                <td><el-input placeholder="" /></td>
                <td><el-input placeholder="" /></td>
                <td><el-input placeholder="" /></td>
                <td><el-input placeholder="" /></td>
                <td><el-input placeholder="" /></td>
                <td><el-input placeholder="" /></td>
                <td><el-input placeholder="" /></td>
                <td><el-input placeholder="" /></td>
                <td><el-input placeholder="" /></td>
                <td><el-input placeholder="" /></td>
                <td><el-input placeholder="" /></td>
                <td><el-input placeholder="" /></td>
                <td><el-input placeholder="" /></td>
                <td><el-input placeholder="" /></td>
                <td><el-input placeholder="" /></td>
                <td><el-input placeholder="" /></td>
                <td><el-input placeholder="" /></td>
                <td><el-button type="danger" icon="el-icon-delete" circle @click="partReduce" /></td>
              </tr>
            </table>
          </el-row>
          <el-row v-if="addForm.databaseName==6">
            <el-col :xs="24" class="btn" style="text-align:left; margin-bottom:10px;">
              <el-button type="primary" icon="el-icon-circle-plus-outline" @click="partAdd">添加一行</el-button>
              <!-- <el-button type="primary" icon="el-icon-download" @click="testclick">专家导入</el-button> -->
            </el-col>
            <table class="detail-table">
              <tr>
                <td>按政府预算支出功能分类（一级分类）</td>
                <td>按政府预算支出功能分类（二级分类）</td>
                <td>按国民经济行业分类（门类）</td>
                <td>按国民经济行业分类（大类）</td>
                <td>项目名称</td>
                <td>业务类型</td>
                <td>客户所属地区</td>
                <td>工作方案</td>
                <td>工作底稿</td>
                <td>评价报告</td>
                <td>其他重要文件</td>
                <td>备注</td>
                <td>操作</td>
              </tr>
              <tr v-for="(item) in addForm.professorArr" :key="item.professorName">
                <td><el-input /></td>
                <td><el-input placeholder="" /></td>
                <td><el-input placeholder="" /></td>
                <td><el-input placeholder="" /></td>
                <td><el-input placeholder="" /></td>
                <td><el-input placeholder="" /></td>
                <td><el-input placeholder="" /></td>
                <td><el-input placeholder="" /></td>
                <td><el-input placeholder="" /></td>
                <td><el-input placeholder="" /></td>
                <td><el-input placeholder="" /></td>
                <td><el-input placeholder="" /></td>
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
      width="80%"
      class="dialog"
      title="项目信息列表"
      :visible.sync="projectListShow"
    >
      <div class="dialog-body">
        <el-form size="small" :model="detailForm" label-width="140px" :label-position="center">
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
          </el-table>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="projectListShow = false">关 闭</el-button>
        <el-button type="primary" size="small">确 认</el-button>
      </span>
    </el-dialog>
    <el-dialog
      width="90%"
      class="dialog"
      :title="baseName"
      :visible.sync="baseAllShow"
    >
      <div class="dialog-body">
        <el-row v-if="baseName=='政策法规库'">
          <el-form size="small" :model="detailForm" label-width="140px" :label-position="center">
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
              <el-table-column type="selection" fixed="left" align="center" />
              <el-table-column type="index" :index="typeIndex" label="序号" fixed="left" align="center" />
              <el-table-column prop="projectNo" label="文号" align="center" />
              <el-table-column prop="clientName" label="政策法规名称" align="center" />
              <el-table-column prop="childProjectName" label="发文单位" align="center" />
              <el-table-column prop="childProjectNo" label="关键词" align="center" />
              <el-table-column prop="functionClassify" label="行政地区" align="center" />
              <!-- <el-table-column prop="" label="入库原因" align="center" />
              <el-table-column prop="ecoClassify" label="正文" align="center" /> -->
            </el-table>
          </el-form>
        </el-row>
        <el-row v-if="baseName=='绩效指标库'">
          <el-form size="small" :model="detailForm" label-width="140px" :label-position="center">
            <el-table
              v-loading="listLoading"
              :data="databasePointList"
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
              <el-table-column prop="projectNo" label="指标编码" align="center" />
              <el-table-column prop="clientName" label="一级指标" align="center" />
              <el-table-column prop="childProjectName" label="二级指标" align="center" />
              <el-table-column prop="childProjectNo" label="三级指标" align="center" />
              <el-table-column prop="functionClassify" label="指标解释" align="center" />
              <el-table-column prop="" label="入库原因" align="center" />
              <el-table-column prop="ecoClassify" label="其他来源" align="center" />
            </el-table>
          </el-form>
        </el-row>
        <el-row v-if="baseName=='项目人员库'">
          <el-form size="small" :model="detailForm" label-width="140px" :label-position="center">
            <el-table
              v-loading="listLoading"
              :data="databasePeopleList"
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
          </el-form>
        </el-row>
        <el-row v-if="baseName=='项目专家库'">
          <el-form size="small" :model="detailForm" label-width="140px" :label-position="center">
            <el-table
              v-loading="listLoading"
              :data="databaseProfessorList"
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
              <el-table-column prop="serverBranch" label="主要服务分所" align="center" />
              <el-table-column prop="oneType" label="所在行业（政府预算支出功能分类）一级分类" align="center" />
              <el-table-column prop="twoType" label="所在行业（政府预算支出功能分类）二级分类" align="center" />
              <el-table-column prop="kind" label="所在行业（国民经济行业分类）门类" align="center" />
              <el-table-column prop="broadClass" label="所在行业（国民经济行业分类）大类" align="center" />
              <el-table-column prop="professorLevel" label="专家级别" align="center" />
              <el-table-column prop="serverLevel" label="服务等级评定" align="center" />
              <el-table-column prop="professorName" label="姓名" align="center" />
              <el-table-column prop="cardId" label="身份证号" align="center" />
              <el-table-column prop="professorTitle" label="职称" align="center" />
              <el-table-column prop="education" label="学历" align="center" />
              <el-table-column prop="academy" label="院校" align="center" />
              <el-table-column prop="phone" label="电话、邮箱" align="center" />
              <el-table-column prop="pro" label="常住地（行政地区）省" align="center" />
              <el-table-column prop="city" label="常住地（行政地区）市" align="center" />
              <el-table-column prop="area" label="常住地（行政地区）区县" align="center" />
              <el-table-column prop="direction" label="主要研究方向" align="center" />
              <el-table-column prop="production" label="主要著作" align="center" />
              <el-table-column prop="result" label="课题成果" align="center" />
              <el-table-column prop="projectAccount" label="参与所内项目数" align="center" />
            </el-table>
          </el-form>
        </el-row>
        <el-row v-if="baseName=='项目业绩库'">
          <el-form size="small" :model="detailForm" label-width="140px" :label-position="center">
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
              <el-table-column prop="test1" label="按政府预算支出功能分类（一级分类）" align="center" />
              <el-table-column prop="test2" label="按政府预算支出功能分类（二级分类）" align="center" />
              <el-table-column prop="test3" label="按国民经济行业分类（门类）" align="center" />
              <el-table-column prop="test4" label="按国民经济行业分类（大类）" align="center" />
              <el-table-column prop="test5" label="合同编号" align="center" />
              <el-table-column prop="test6" label="签约年度" align="center" />
              <el-table-column prop="test7" label="合同签约日期" align="center" />
              <el-table-column prop="test8" label="分所" align="center" />
              <el-table-column prop="test9" label="所属部门" align="center" />
              <el-table-column prop="test10" label="项目负责合伙人" align="center" />
              <el-table-column prop="test11" label="项目经理" align="center" />
              <el-table-column prop="test12" label="项目成员" align="center" />
              <el-table-column prop="test13" label="项目专家" align="center" />
              <el-table-column prop="test12" label="项目名称" align="center" />
              <el-table-column prop="test12" label="业务类型" align="center" />
              <el-table-column prop="test12" label="客户所属地区" align="center" />
              <el-table-column prop="test12" label="业务级别" align="center" />
              <el-table-column prop="test12" label="合同类别" align="center" />
              <el-table-column prop="test12" label="合同描述" align="center" />
              <el-table-column prop="test12" label="委托方（甲方）名称" align="center" />
              <el-table-column prop="test12" label="联系人（委托方）" align="center" />
              <el-table-column prop="test12" label="被评价对象" align="center" />
              <el-table-column prop="test12" label="委托方上一级客户名称" align="center" />
              <el-table-column prop="test12" label="备注" align="center" />
            </el-table>
          </el-form>
        </el-row>
        <el-row v-if="baseName=='项目案例库'">
          <el-form size="small" :model="detailForm" label-width="140px" :label-position="center">
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
              <el-table-column prop="test1" label="按政府预算支出功能分类（一级分类）" align="center" />
              <el-table-column prop="test2" label="按政府预算支出功能分类（二级分类）" align="center" />
              <el-table-column prop="test3" label="按国民经济行业分类（门类）" align="center" />
              <el-table-column prop="test4" label="按国民经济行业分类（大类）" align="center" />
              <el-table-column prop="test5" label="项目名称" align="center" />
              <el-table-column prop="test6" label="业务类型" align="center" />
              <el-table-column prop="test7" label="客户所属地区" align="center" />
              <el-table-column prop="test12" label="备注" align="center" />
            </el-table>
          </el-form>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="baseAllShow = false">关 闭</el-button>
        <el-button type="primary" size="small">确 认</el-button>
      </span>
    </el-dialog>
    <!--出库申请-->
    <el-dialog
      width="90%"
      class="dialog"
      title="出库申请单"
      :close-on-click-modal="false"
      :visible.sync="outStorageShow"
      @close="closeDialog"
    >
      <div class="dialog-body">
        <el-form :model="outApplyForm" size="small" label-width="120px" label-position="center">
          <el-row>
            <el-col :sm="24" :md="12">
              <el-form-item label="出库数据库名称" prop="databaseName">
                <el-select v-model="outApplyForm.databaseName" @change="chooseOutBase">
                  <el-option label="政策法规库" :value="1">政策法规库</el-option>
                  <el-option label="绩效指标库" :value="2">绩效指标库</el-option>
                  <el-option label="项目人员库" :value="3">项目人员库</el-option>
                  <el-option label="项目专家库" :value="4">项目专家库</el-option>
                  <el-option label="项目业绩库" :value="5">项目业绩库</el-option>
                  <el-option label="项目案例库" :value="6">项目案例库</el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="24">
              <el-form-item label="数据来源">
                <el-radio-group v-model="addForm.dataFrom">
                  <el-radio :label="1">项目</el-radio>
                  <el-radio :label="2">非项目</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="申请人">
                <el-input v-model="addForm.applyMan" disabled />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="申请时间">
                <el-input v-model="addForm.applyTime" disabled />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="24">
              <el-form-item label="出库申请">
                <el-input size="small" placeholder="填写出库原因" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="outApplyForm.databaseName==1">
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
              <!-- <el-table-column prop="" label="正文" align="center" width="" /> -->
              <!-- <el-table-column prop="riskLevel" label="入库原因" align="center" width="" /> -->
            </el-table>
          </el-row>
          <el-row v-if="outApplyForm.databaseName==2">
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
              <!-- <el-table-column prop="riskLevel" label="入库原因" align="center" width="" /> -->
            </el-table>
          </el-row>
          <el-row v-if="outApplyForm.databaseName==3">
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
          <el-row v-if="outApplyForm.databaseName==4">
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
          <el-row v-if="outApplyForm.databaseName==5">
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
          <el-row v-if="outApplyForm.databaseName==6">
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
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="outStorageShow = false">关 闭</el-button>
        <el-button type="warning" @click="holdSave">暂 存</el-button>
        <el-button type="primary" @click="submitSave">提 交</el-button>
      </span>
    </el-dialog>
    <!--修改申请-->
    <el-dialog
      width="90%"
      class="dialog"
      title="修改申请单"
      :close-on-click-modal="false"
      :visible.sync="updateShow"
      @close="closeDialog"
    >
      <div class="dialog-body">
        <el-form :model="addForm" size="small" label-width="120px" label-position="center">
          <el-row>
            <el-col :sm="24" :md="12">
              <el-form-item label="数据库名称" prop="databaseName">
                <el-select v-model="addForm.databaseName" @change="chooseOutBase">
                  <el-option label="政策法规库" :value="1">政策法规库</el-option>
                  <el-option label="绩效指标库" :value="2">绩效指标库</el-option>
                  <el-option label="项目人员库" :value="3">项目人员库</el-option>
                  <el-option label="项目专家库" :value="4">项目专家库</el-option>
                  <el-option label="项目业绩库" :value="5">项目业绩库</el-option>
                  <el-option label="项目案例库" :value="6">项目案例库</el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="24">
              <el-form-item label="数据来源">
                <el-radio-group v-model="addForm.dataFrom">
                  <el-radio :label="1">项目</el-radio>
                  <el-radio :label="2">非项目</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="申请人">
                <el-input v-model="addForm.applyMan" disabled />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="申请时间">
                <el-input v-model="addForm.applyTime" disabled />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="24">
              <el-form-item label="修改原因">
                <el-input size="small" placeholder="" />
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
              <el-table-column prop="projectNo" label="文号" align="center" width="">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.projectNo" />
                </template>
              </el-table-column>
              <el-table-column prop="clientName" label="政策法规名称" align="center" width="" />
              <el-table-column prop="childProjectName" label="发文单位" align="center" width="" />
              <el-table-column prop="childProjectNo" label="关键词" align="center" width="" />
              <el-table-column prop="functionClassify" label="行政地区" align="center" width="" />
              <!-- <el-table-column prop="" label="正文" align="center" width="" /> -->
              <!-- <el-table-column prop="riskLevel" label="入库原因" align="center" width="" /> -->
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
              <!-- <el-table-column prop="riskLevel" label="入库原因" align="center" width="" /> -->
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
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateShow = false">取 消</el-button>
        <el-button type="warning" @click="holdSave">暂 存</el-button>
        <el-button type="primary" @click="submitSave">提 交</el-button>
      </span>
    </el-dialog>
    <el-dialog
      width="90%"
      class="dialog"
      :title="detailname"
      :close-on-click-modal="false"
      :visible.sync="detailShow"
      @close="closeDialog"
    >
      <div class="dialog-body" style="display:flex;">
        <div style="flex:4">
          <el-form :model="detailForm" size="small" label-width="120px" label-position="center">
            <el-row>
              <el-col :sm="24" :md="12">
                <el-form-item label="数据库名称" prop="databaseName">
                  <el-select v-model="detailForm.databaseName">
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
            <el-row v-if="detailForm.databaseName==1">
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
                <!-- <el-table-column prop="" label="正文" align="center" width="" />
                <el-table-column prop="riskLevel" label="入库原因" align="center" width="" /> -->
              </el-table>
            </el-row>
            <el-row v-if="detailForm.databaseName==2">
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
            <el-row v-if="detailForm.databaseName==3">
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
            <el-row v-if="detailForm.databaseName==4">
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
            <el-row v-if="detailForm.databaseName==5">
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
            <el-row v-if="detailForm.databaseName==6">
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
            <el-row style="margin-top:20px;">
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
        <el-button @click="detailShow = false">关 闭</el-button>
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
      projectListShow: false,
      baseAllShow: false,
      parentListQuery: {
        current: 1,
        size: 10
      },
      list: [{
        projectType: 1,
        status: 1,
        datebaseType: '绩效指标库',
        buildMan: '李宁',
        approvalTime: '2020-12-02 11:12:35',
      }, {
        projectType: 2,
        status: 2,
        datebaseType: '政策法规库',
        buildMan: '李宁',
        approvalTime: '2020-12-02 11:12:35',
      }, {
        projectType: 3,
        status: 3,
        datebaseType: '项目案例库',
        buildMan: '李宁',
        approvalTime: '2020-12-02 11:12:35',
      }],
      total: 1,
      addCheckShow: false,
      addChildShow: false,
      outStorageShow: false,
      updateShow: false,
      detailname: '',
      title: '',
      databaseList: [
        {
          projectNo: '2020-07714-01-Z01',
          projectName: '2020-07714-01-Z01天津市滨海新区财政局-一般公共预算项目绩效评价',
          clientName: '天津市滨海新区财政局',
          projectType: 1,
          projectOutLeader: '李宁',
          projectPartnerName: '贾立华',
          projectManager: '马辉',
        }
      ],
      // 入库
      addForm: {
        databaseName:1,
        dataFrom: null,
        projectNo: '2020-07714-01-Z01',
        projectName: '2020-07714-01-Z01天津市滨海新区财政局-一般公共预算项目绩效评价',
        clientName: '天津市滨海新区财政局',
        projectType: 1,
        projectOutLeader: '李宁',
        projectPartnerName: '贾立华',
        projectManager: '马辉',
        applyTime: '',
        applyMan: '',
        professorArr: [
        {
          professorName: '',
          professorLevel: '',
          professorTitle: '',
          professorEducation: '',
          professorSeverBranch: '',
          professorPhone: ''
        }
      ]
      },
      // 出库
      outApplyForm: {
        databaseName:null,
      },
      // 修改
      updateBase() {
        this.updateShow = true
      },
      // 详情
      detailForm: {
        databaseName:1,
      },
      lawList: [{
        projectNo: '中发〔2018〕34号',
        clientName: '《中共中央 国务院关于全面实施预算绩效管理的意见》',
        childProjectName: '国务院',
        childProjectNo: '预算、绩效',
        functionClassify: '全国'
      }],//政策法规库
      performanceList: [],//绩效法规库
      databaseProfessorList: [
        {
        serverBranch: '天津分所',
        oneType: '一般公共服务',
        twoType: '政协事务',
        kind: '公共管理、社会保障和社会组织',
        broadClass: '人民政协、民主党派',
        professorLevel: '教授',
        serverLevel: 'A',
        professorName: '胡长飞',
        cardId: '110101196503076336',
        professorTitle: '正高',
        education: '博士',
        academy: '复旦大学',
        phone: '13587234544',
        pro: '北京市',
        city: '朝阳区',
        area: '朝外街道',
        direction: '政协事务',
        production: '',
        result: '',
        projectAccount: '15'
      }, {
        serverBranch: '浙江分所',
        oneType: '交通运输',
        twoType: '民用航空运输',
        kind: '交通运输、仓储和邮政业',
        broadClass: '航空运输业',
        professorLevel: '教授级高级工程师',
        serverLevel: 'A',
        professorName: '程映雪',
        cardId: '140105198403076873',
        professorTitle: '正高',
        education: '博士',
        academy: '南京大学',
        phone: '13687263095',
        pro: '浙江省',
        city: '杭州市',
        area: '西湖区',
        direction: '民用航空运输',
        production: '',
        result: '',
        projectAccount: '2'
      }, {
        serverBranch: '天津分所',
        oneType: '农林水事务',
        twoType: '林业',
        kind: '农、林、牧、渔业',
        broadClass: '农业',
        professorLevel: '研究员',
        serverLevel: 'A',
        professorName: '邹刚',
        cardId: '41010219710307574X',
        professorTitle: '正高',
        education: '博士',
        academy: '厦门大学',
        phone: '13587263096',
        pro: '北京市',
        city: '东城区',
        area: '东华门街道',
        direction: '林业',
        production: '',
        result: '',
        projectAccount: '22'
      }, {
        serverBranch: '北京分所',
        oneType: '科学技术',
        twoType: '技术研究与开发',
        kind: '科学研究和技术服务业',
        broadClass: '研究和试验发展',
        professorLevel: '研究员',
        serverLevel: 'A',
        professorName: '罗琴',
        cardId: '11010119650307105X',
        professorTitle: '正高',
        education: '博士',
        academy: '复旦大学',
        phone: '13387298023',
        pro: '天津市',
        city: '和平区',
        area: '小白楼街道',
        direction: '技术研究与开发',
        production: '',
        result: '',
        projectAccount: '12'
      }, {
        serverBranch: '北京分所',
        oneType: '工业商业金融等事务',
        twoType: '制造业',
        kind: '制造业',
        broadClass: '农副食品加工业',
        professorLevel: '高级工程师',
        serverLevel: 'A',
        professorName: '吴伯宁',
        cardId: '620102196203071134',
        professorTitle: '副高',
        education: '研究生',
        academy: '中国科学技术大学',
        phone: '13587263098',
        pro: '湖北省',
        city: '武汉市',
        area: '武昌区',
        direction: '制造业',
        production: '',
        result: '',
        projectAccount: '1'
      }, {
        serverBranch: '浙江分所',
        oneType: '交通运输',
        twoType: '民用航空运输',
        kind: '交通运输、仓储和邮政业',
        broadClass: '航空运输业',
        professorLevel: '教授级高级工程师',
        serverLevel: 'A',
        professorName: '韩同兵',
        cardId: '440103197003078195',
        professorTitle: '正高',
        education: '博士',
        academy: '浙江大学',
        phone: '13587263099',
        pro: '安徽省',
        city: '合肥市',
        area: '蜀山区',
        direction: '民用航空运输',
        production: '',
        result: '',
        projectAccount: '3'
      }
      ], // 专家库
      databasePeopleList: [
        {
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
      }
      ], // 项目人员库
      databasePointList: [
        {
        projectNo: 'gx090101',
        clientName: '产出指标',
        childProjectName: '数量指标',
        childProjectNo: '硬件采购（维护）数量',
        functionClassify: '反映硬件采购（维护）数量。',
        riskLevel: 2,
        status: 1
      }, {
        projectNo: 'gx100602',
        clientName: '效益指标',
        childProjectName: '社会效益指标',
        childProjectNo: '实现关键核心技术突破数量',
        functionClassify: '反映项目攻克的前沿核心技术和关键共性技术、突破制约产业发展的核心关键技术瓶颈、掌握产业核心技术情况。',
        riskLevel: 1,
        status: 2
      }, {
        projectNo: 'gx110901',
        clientName: '满意度指标',
        childProjectName: '服务对象满意度指标',
        childProjectNo: '检查人员被投诉次数',
        functionClassify: '反映监督检查人员因监督检查行为不规范被投诉情况。',
        riskLevel: 3,
        status: 4
      }
      ], // 绩效指标库
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
      approveShow: false,
      baseName: ''
    }
  },
  created() {
    this.currentTime()
    this.addForm.applyMan = this.$store.state.user.name
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
      this.addForm.applyTime = timeStr
    },
    // 获取列表
    getList() {},
    // 搜索
    onSeaech() {},
    // 重置
    listQueryReset() {
      this.$refs['listQuery'].resetFields()
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
          professorName: '',
          professorLevel: '',
          professorTitle: '',
          professorEducation: '',
          professorSeverBranch: '',
          professorPhone: ''
      }
      this.addForm.professorArr.push(timepart)
    },
    // 删除
    partReduce(index) {
      this.addForm.professorArr.splice(index, 1)
    },
    chooseProject(val) {
      console.log(val)
      if (val ===1) {
        this.projectListShow = true
      }
    },
    chooseOutBase(val) {
      if (val ===1) {
        this.baseName = '政策法规库'
      } else if (val ===2) {
        this.baseName = '绩效指标库'
      } else if (val ===3) {
        this.baseName = '项目人员库'
      } else if (val ===4) {
        this.baseName = '项目专家库'
      } else if (val ===5) {
        this.baseName = '项目业绩库'
      } else if (val ===6) {
        this.baseName = '项目案例库'
      }
      this.baseAllShow = true
    },
    // 展开查询更多
    searchBoxShow() {
      this.bottomSearchBoxShow = !this.bottomSearchBoxShow
    },
    handelAdd() {
      this.addChildShow = true
    },
    databaseOut() {
      this.outStorageShow = true
    },
    // handleSelectionChange(selection, row) {
    //   this.multipleSelection = selection
    //   this.$prompt('请输入入库原因', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消'
    //   }).then(({ value }) => {
    //     this.$message({
    //       type: 'success',
    //       message: '提交成功'
    //     })
    //   }).catch(() => {
    //     this.$message({
    //       type: 'info',
    //       message: '取消输入'
    //     })
    //   })
    // },
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
      if (row.projectType === 1) {
        this.detailname = '入库申请详情'
      } else if (row.projectType === 2) {
        this.detailname = '出库申请详情'
      } else if (row.projectType === 3) {
        this.detailname = '修改申请详情'
      }
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
