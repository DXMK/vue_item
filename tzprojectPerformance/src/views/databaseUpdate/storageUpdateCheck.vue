<template>
  <div class="page-container">
    <div class="table-list-search">
      <el-form ref="listQuery" :model="listQuery" inline size="small">
        <el-form-item label="入库数据库名称" prop="databaseName">
          <el-select v-model="listQuery.databaseName">
            <el-option label="政策法规库" value="1">政策法规库</el-option>
            <el-option label="绩效指标库" value="2">绩效指标库</el-option>
            <el-option label="项目人员库" value="3">项目人员库</el-option>
            <el-option label="项目专家库" value="4">项目专家库</el-option>
            <el-option label="项目业绩库" value="5">项目业绩库</el-option>
            <el-option label="项目案例库" value="6">项目案例库</el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" icon="el-icon-search">查 询</el-button>
          <el-button size="small" @click="listQueryReset">重 置</el-button>
        </el-form-item>
        <!-- <el-form-item class="table-search-button">
          <el-button type="primary" size="small" icon="el-icon-edit" @click="handelAdd">入库申请</el-button>
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
        <el-table-column type="index" :index="typeIndex" label="序号" fixed="left" align="center" />
        <el-table-column prop="databaseName" label="入库数据库名称" align="center" width="" />
        <el-table-column prop="databaseInMan" label="入库人" align="center" width="100" />
        <el-table-column prop="databaseInTime" label="入库时间" align="center" width="" />
        <el-table-column prop="databaseInResult" label="入库原因" align="center" width="" />
        <el-table-column prop="databaseInUpdateMan" label="修改人" align="center" width="" />
        <el-table-column prop="databaseInUpdateTime" label="修改时间" align="center" width="" />
        <el-table-column prop="status" label="状态" align="center" width="">
          <template slot-scope="scope">
            <span v-if="scope.row.status==1">暂存</span>
            <span v-if="scope.row.status==2">待审批</span>
            <span v-if="scope.row.status==3">已入库</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="160" fixed="right">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.status==2"
              size="small"
              plain
              type="primary"
              @click="handelAdd(scope.$index, scope.row)"
            >审批</el-button>
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
    <div class="pagination-container">
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
    </div>
    <el-dialog
      width="70%"
      class="dialog"
      title="审批数据库修改信息"
      :close-on-click-modal="false"
      :visible.sync="addChildShow"
      @close="closeDialog"
    >
      <div class="dialog-body">
        <el-form :model="checkForm" size="small" label-width="120px" label-position="center">
          <el-row>
            <el-col :sm="24" :md="12">
              <el-form-item label="入库数据库名称" prop="databaseName">
                <el-select v-model="checkForm.databaseName">
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
          <el-row v-if="checkForm.databaseName==1">
            <el-col :sm="24" :md="12">
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
                <!-- <el-button type="primary" icon="el-icon-edit" circle title="委派" /> -->
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
            </el-col>
          </el-row>
          <el-row v-if="checkForm.databaseName==2">
            <el-col :sm="24" :md="12">
              <el-form-item label="指标编码">
                <el-input value="gx110101" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="一级指标">
                <el-input value="产出指标" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="二级指标">
                <el-input value="数量指标" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="三级指标">
                <el-input value="检查频次" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="指标解释">
                <el-input value="反映监督检查的频次情况。" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="入库原因">
                <el-input size="small" value="数据初始化" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="其他来源">
                <el-button size="small" type="primary">点击查看</el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="checkForm.databaseName==3">
            <el-col :sm="24" :md="12">
              <el-form-item label="所在分所">
                <el-input />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="所在部门">
                <el-input />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="所内级别">
                <el-input />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="员工编号">
                <el-input size="small" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="姓名">
                <el-input size="small" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="毕业院校">
                <el-input size="small" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="学历">
                <el-input size="small" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="专业">
                <el-input size="small" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="是否为主评人">
                <el-input size="small" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="项目类型（业务类型）" label-width="180px">
                <el-input size="small" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="曾担任项目角色">
                <el-input size="small" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="年限+经验">
                <el-input size="small" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="备注">
                <el-input size="small" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="其他来源">
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
            </el-col>
          </el-row>
          <el-row v-if="checkForm.databaseName==4">
            <el-col :sm="24" :md="24">
              <el-form-item label="主要服务分所">
                <el-input />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="24">
              <el-form-item label="所在行业（政府预算支出功能分类）一级分类" label-width="300px">
                <el-input />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="24">
              <el-form-item label="所在行业（政府预算支出功能分类）二级分类" label-width="300px">
                <el-input />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="24">
              <el-form-item label="所在行业（国民经济行业分类）门类" label-width="300px">
                <el-input size="small" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="24">
              <el-form-item label="所在行业（国民经济行业分类）大类" label-width="300px">
                <el-input size="small" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="24">
              <el-form-item label="专家级别">
                <el-input size="small" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="24">
              <el-form-item label="服务等级评定">
                <el-input size="small" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="24">
              <el-form-item label="姓名">
                <el-input size="small" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="24">
              <el-form-item label="身份证号">
                <el-input size="small" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="24">
              <el-form-item label="职称">
                <el-input size="small" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="24">
              <el-form-item label="学历">
                <el-input size="small" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="24">
              <el-form-item label="院校">
                <el-input size="small" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="24">
              <el-form-item label="电话、邮箱">
                <el-input size="small" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="24">
              <el-form-item label="常住地（行政地区）省" label-width="160px">
                <el-input size="small" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="24">
              <el-form-item label="常住地（行政地区）市" label-width="160px">
                <el-input size="small" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="24">
              <el-form-item label="常住地（行政地区）区县" label-width="170px">
                <el-input size="small" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="24">
              <el-form-item label="主要研究方向">
                <el-input size="small" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="24">
              <el-form-item label="主要著作">
                <el-input size="small" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="24">
              <el-form-item label="课题成果">
                <el-input size="small" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="24">
              <el-form-item label="参与所内项目数">
                <el-input size="small" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="checkForm.databaseName==5">
            <el-col :sm="24" :md="24">
              <el-form-item label="按政府预算支出功能分类（一级分类）" label-width="300px">
                <el-input disabled placeholder="绩效评价平台导入" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="24">
              <el-form-item label="按政府预算支出功能分类（二级分类）" label-width="300px">
                <el-input disabled placeholder="绩效评价平台导入" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="24">
              <el-form-item label="按国民经济行业分类（门类）" label-width="300px">
                <el-input disabled placeholder="绩效评价平台导入" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="24">
              <el-form-item label="按国民经济行业分类（大类）" label-width="300px">
                <el-input size="small" disabled placeholder="绩效评价平台导入" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="24">
              <el-form-item label="合同编号">
                <el-input size="small" disabled placeholder="项目管理系统合同版块导入" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="签约年度">
                <el-input size="small" disabled placeholder="项目管理系统合同版块导入" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="合同签约日期">
                <el-input size="small" disabled placeholder="项目管理系统合同版块导入" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="分所">
                <el-input size="small" disabled placeholder="项目管理系统合同版块导入" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="所属部门">
                <el-input size="small" disabled placeholder="项目管理系统合同版块导入" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="项目负责合伙人">
                <el-input size="small" disabled placeholder="项目管理系统合同版块导入" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="项目经理">
                <el-input size="small" disabled placeholder="项目管理系统合同版块导入" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="项目成员">
                <el-input size="small" disabled placeholder="项目管理系统合同版块导入" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="项目专家">
                <el-input size="small" disabled placeholder="评价平台自动更新" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="项目名称">
                <el-input size="small" disabled placeholder="项目管理系统导入" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="业务类型">
                <el-input size="small" disabled placeholder="项目管理系统导入" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="客户所属地区">
                <el-input size="small" disabled placeholder="根据委托方地区自动生成" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="业务级别">
                <el-input size="small" disabled placeholder="项目管理系统导入" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="合同类别">
                <el-input size="small" disabled placeholder="项目管理系统合同版块导入" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="合同描述">
                <el-input size="small" disabled placeholder="项目管理系统合同版块导入" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="委托方（甲方）名称" label-width="180px">
                <el-input size="small" disabled placeholder="项目管理系统合同版块导入" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="联系人（委托方）" label-width="180px">
                <el-input size="small" disabled placeholder="项目管理系统合同版块导入" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="被评价对象">
                <el-input size="small" disabled placeholder="项目管理系统合同版块导入" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="委托方上一级客户名称" label-width="180px">
                <el-input size="small" disabled placeholder="项目管理系统合同版块导入" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="备注">
                <el-input size="small" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="checkForm.databaseName==6">
            <el-col :sm="24" :md="24">
              <el-form-item label="按政府预算支出功能分类（一级分类）" label-width="300px">
                <el-input disabled placeholder="从评价平台项目业绩库带出" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="24">
              <el-form-item label="按政府预算支出功能分类（二级分类）" label-width="300px">
                <el-input disabled placeholder="从评价平台项目业绩库带出" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="24">
              <el-form-item label="按国民经济行业分类（门类）" label-width="300px">
                <el-input disabled placeholder="从评价平台项目业绩库带出" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="24">
              <el-form-item label="按国民经济行业分类（大类）" label-width="300px">
                <el-input disabled placeholder="从评价平台项目业绩库带出" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="项目名称">
                <el-input disabled placeholder="从评价平台项目业绩库带出" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="业务类型">
                <el-input disabled placeholder="从评价平台项目业绩库带出" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="24">
              <el-form-item label="客户所属地区">
                <el-input disabled placeholder="从评价平台项目业绩库带出" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="工作方案">
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
            <el-col :sm="24" :md="12">
              <el-form-item label="工作底稿">
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
            <el-col :sm="24" :md="12">
              <el-form-item label="评价报告">
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
            <el-col :sm="24" :md="12">
              <el-form-item label="其他重要文件">
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
            <el-col :sm="24" :md="12">
              <el-form-item label="备注">
                <el-input size="small" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="24" :md="24">
              <el-form-item label="修改申请">
                <el-input size="small" placeholder="填写入库原因" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="24" :md="12">
              <el-form-item label="审批结果">
                <el-select v-model="checkForm.riskLevel" placeholder="请选择">
                  <el-option label="请选择" value />
                  <el-option label="通过" value="1" />
                  <el-option label="不通过" value="2" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="审批意见">
                <el-input v-model="checkForm.checkResult" />
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
        <el-button @click="addChildShow = false">取 消</el-button>
        <el-button type="primary" @click="submitSave">审 批</el-button>
      </span>
    </el-dialog>
    <el-dialog
      width="60%"
      class="dialog"
      title="入库数据库信息"
      :close-on-click-modal="false"
      :visible.sync="detailShow"
      @close="closeDialog"
    >
      <div class="dialog-body">
        <el-form size="small" inline>
          <el-row>
            <el-col :sm="24" :md="12">
              <el-form-item label="入库数据库名称">
                <el-input value="绩效指标库" disabled />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="指标编码">
                <el-input value="gx110101" disabled />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="一级指标">
                <el-input value="产出指标" disabled />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="二级指标">
                <el-input value="数量指标" disabled />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="三级指标">
                <el-input value="检查频次" disabled />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="指标解释">
                <el-input value="反映监督检查的频次情况。" disabled />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="入库原因">
                <el-input size="small" value="数据初始化" disabled />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="其他来源">
                <el-button size="small" type="primary">点击查看</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <!-- <div>详情信息待后续确认开发</div> -->
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
        size: 10,
        databaseName: null
      },
      list: [{
        databaseName: '绩效指标库',
        databaseInMan: '张涛',
        databaseInTime: '2020-10-09 10:20:10',
        databaseInResult: '数据初始化',
        databaseInUpdateMan: '许丹一峰',
        databaseInUpdateTime: '2020-11-24 14:42:30',
        status: 2
      }],
      total: 1,
      parentTotal: 1,
      addShow: false,
      addChildShow: false,
      title: '',
      checkForm: {
        databaseName: 2,
        riskLevel: null,
        checkResult: '',
        checkMan: '',
        checkTime: ''
      },
      detailShow: false
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
    closeDialog() {
      this.$refs['addForm'].resetFields()
    },
    holdSave() {
      this.addChildShow = false
      this.addShow = false
    },
    submitSave() {
      this.addChildShow = false
      this.addShow = false
    },
    detailHandle(index, row) {
      this.detailShow = true
    }
  }
}
</script>
<style rel="stylesheet/less" lang="less" scoped>
  strong{
    color: cadetblue;
    font-weight: bold;
}
</style>
