<script>
/*
 * @Author: zhangtao
 * @Date:   2020-12-02 11:41:43
 * @Last Modified by:   Your name
 * @Last Modified time: 2021-01-28 11:58:42
 */
</script>
<template>
  <div class="page-container">
    <div class="table-list-search">
      <el-form ref="listQuery" :model="listQuery" inline size="mini">
        <el-form-item label="项目资料名称" prop="companyName">
          <el-input v-model="listQuery.companyName" />
        </el-form-item>
        <!-- <el-form-item label="上传人" prop="companyName">
          <el-input v-model="listQuery.companyName" />
        </el-form-item> -->
        <el-form-item label="审核状态" prop="companyName">
          <el-select>
            <el-option value="1" label="暂存">暂存</el-option>
            <el-option value="2" label="审核中">审核中</el-option>
            <el-option value="3" label="已审核">已审核</el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="客户名称" prop="companyName">
          <el-input v-model="listQuery.companyName" />
        </el-form-item> -->
        <!-- <el-form-item>
          <el-button type="primary" size="mini" icon="" @click="buildList">资料上传</el-button>
        </el-form-item> -->
        <!-- <el-form-item class="table-search-button">
          <el-button size="mini" class="el-icon-download" type="primary"> 模板下载</el-button>
        </el-form-item> -->
        <el-collapse-transition>
          <div v-show="bottomSearchBoxShow" style="display:inline-block;">
            <el-form-item label="项目名称">
              <el-input v-model="listQuery.clientName" />
            </el-form-item>
            <el-form-item label="项目编号">
              <el-input v-model="listQuery.clientCode" />
            </el-form-item>
            <!-- <el-form-item label="客户名称" prop="companyName">
              <el-input v-model="listQuery.clientCode" />
            </el-form-item> -->
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
    <div class="table-list">
      <div style="color:blue;">当前待上传资料 2 份</div>
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
        <!-- <el-table-column prop="projectName" label="项目名称" width="130" align="center" />
        <el-table-column prop="projectNo" label="项目编号" width="130" align="center" />
        <el-table-column prop="riskLevel" label="风险级别" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.riskLevel === 1">A</span>
            <span v-if="scope.row.riskLevel === 2">B</span>
            <span v-if="scope.row.riskLevel === 3">C</span>
          </template>
        </el-table-column>
        <el-table-column prop="clientName" label="客户名称" align="center" /> -->
        <el-table-column prop="fileType" label="资料分类" align="center" />
        <el-table-column prop="fileType" label="资料名称" align="center" />
        <el-table-column prop="fileType" label="待上传资料名称" align="center" />
        <el-table-column prop="projectName" label="归属项目名称" align="center" />
        <el-table-column prop="uploadFileName" label="已上传资料个数" width="" align="center" />
        <!-- <el-table-column prop="dataDetailList" label="项目资料名称" width="" align="center" /> -->
        <!-- <el-table-column prop="buildMan" label="上传人" width="" align="center" /> -->
        <!-- <el-table-column prop="percentage" label="上传进度" width="" align="center">
          <template slot-scope="scope">
            <el-progress :percentage="scope.row.percentage" :color="customColorMethod(scope.row.percentage)" />
          </template>
        </el-table-column> -->
        <!-- <el-table-column prop="" label="上传状态" width="100" align="center" /> -->
        <!-- <el-table-column prop="approvalTime" label="上传时间" width="140" align="center" /> -->
        <el-table-column prop="isTimeout" label="上传时间" width="150" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.approvalTime">{{ scope.row.approvalTime }}</span>
            <span v-else style="color:red;">{{ scope.row.isTimeout }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="文档状态" width="83" align="center" />
        <el-table-column align="center" label="操作" width="180" fixed="right">
          <template slot-scope="scope">
            <el-button
              size="small"
              plain
              type="primary"
              @click="detailHandle(scope.$index, scope.row)"
            >上传</el-button>
            <!-- <el-button
              v-if="scope.row.status === 0"
              size="small"
              plain
              type="primary"
              @click="uploadItem(scope.$index, scope.row)"
            >提交</el-button>
            <el-button
              v-if="scope.row.status !== 0"
              size="small"
              plain
              type="primary"
              @click="detailHandle(scope.$index, scope.row)"
            >查看</el-button>
            <el-button
              v-if="scope.row.status === 2"
              size="small"
              plain
              type="primary"
              @click="handelAdd(scope.$index, scope.row)"
            >修改</el-button> -->
            <!-- <el-button
              v-if="scope.row.status === 3||scope.row.status === 4"
              size="small"
              plain
              type="primary"
              @click="detailHandle(scope.$index, scope.row)"
            >详情</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog width="90%" class="dialog" title="项目资料信息" :visible.sync="addShow" @close="closeDialog">
      <div class="dialog-body">
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
            <!-- <el-table-column prop="projectNo" label="项目编号" align="center" /> -->
            <el-table-column prop="projectName" label="项目资料名称" align="center" />
            <!-- <el-table-column prop="clientName" label="客户名称" align="center" />
            <el-table-column prop="riskLevel" label="风险级别" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.riskLevel === 1">A</span>
                <span v-if="scope.row.riskLevel === 2">B</span>
                <span v-if="scope.row.riskLevel === 3">C</span>
              </template>
            </el-table-column>
            <el-table-column prop="projectManager" label="项目经理" align="center" />-->
            <el-table-column align="center" label="操作" width="" fixed="right">
              <template>
                <el-button size="mini" plain type="primary">预览</el-button>
                <el-button size="mini" plain type="primary">下载</el-button>
                <el-button size="mini" plain type="danger">删除</el-button>
                <el-button size="mini" plain type="primary">重新上传</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addShow = false">关 闭</el-button>
      </span>
    </el-dialog>
    <el-dialog
      width="90%"
      class="dialog"
      title="项目资料上传信息"
      :close-on-click-modal="false"
      :visible.sync="addChildShow"
      @close="closeDialog"
    >
      <div class="dialog-body">
        <el-form :model="addForm" size="small" label-width="140px">
          <el-collapse>
            <el-collapse-item title="项目基本信息" name="1">
              <el-row>
                <el-col :sm="24" :md="24">
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
                <el-col :sm="24" :md="12">
                  <el-form-item label="客户名称">
                    <el-input v-model="addForm.clientName" placeholder="请输入内容" disabled />
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
                  <el-form-item label="项目四级分类">
                    <el-select>
                      <el-option label="财政评价项目" :value="1" selected="selected">财政评价项目</el-option>
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
              </el-row>
            </el-collapse-item>
            <el-collapse-item title="项目资料上传信息" name="2">
              <el-row>
                <!-- <div style="margin-left:10px;margin-bottom:10px;">
              <div>资料清单附件 <span style="margin-left:30px;color:blue;cursor:pointer;">XX项目绩效评价需提供的资料清单.doc</span>
                <el-button size="mini" type="primary" style="margin-left:20px;">预览</el-button>
                <el-button size="mini" type="primary">下载</el-button>
              </div>
            </div>
            <div style="margin-left:10px;margin-bottom:10px;">已审批项目资料列表</div>
            <div class="table-list">
              <el-table
                v-loading="listLoading"
                :data="fileUploadList"
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
                <el-table-column prop="fileName" label="文件名称" align="center">
                  <template slot-scope="scope">
                    <span style="color:blue;cursor:pointer;">{{ scope.row.fileName }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="fileSize" label="文件大小" align="center" />
                <el-table-column prop="uploadMan" label="上传人" align="center" />
                <el-table-column prop="uploadTime" label="上传时间" width="140" align="center" />
                <el-table-column prop="status" label="审批状态" width="" align="center" />
                <el-table-column align="center" label="操作" width="" fixed="right">
                  <template slot-scope="scope">
                    <el-button size="small" plain type="primary" @click="handelAdd(scope.$index, scope.row)">下载</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div style="margin-left:10px;margin-bottom:10px; margin-top:20px;">审批中项目资料列表</div>
            <div class="table-list">
              <el-table
                v-loading="listLoading"
                :data="fileUploadingList"
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
                <el-table-column prop="fileName" label="文件名称" align="center">
                  <template slot-scope="scope">
                    <span style="color:blue;cursor:pointer;">{{ scope.row.fileName }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="fileSize" label="文件大小" align="center" />
                <el-table-column prop="uploadMan" label="上传人" align="center" />
                <el-table-column prop="uploadTime" label="上传时间" width="140" align="center" />
                <el-table-column prop="status" label="审批状态" width="" align="center" />
                <el-table-column align="center" label="操作" width="" fixed="right">
                  <template slot-scope="scope">
                    <el-button size="small" plain type="primary" @click="handelAdd(scope.$index, scope.row)">下载</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div> -->
                <div class="table-list">
                  <el-table
                    v-loading="listLoading"
                    :data="fileUploadArr"
                    row-key="id"
                    :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
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
                    <el-table-column prop="fileType" label="资料名称" align="center" />
                    <el-table-column prop="fileName" label="资料解释" align="center" />
                    <!-- <el-table-column prop="buildMan" label="拟定人" width="80" align="center" />
                    <el-table-column prop="buildTime" label="拟定时间" width="140" align="center" />
                    <el-table-column prop="status" label="上传状态" width="80" align="center" /> -->
                    <el-table-column prop="uploadFileName" label="上传项目资料名称" width="300" align="center">
                      <template slot-scope="scope">
                        <span style="color:blue;cursor:pointer;">{{ scope.row.uploadFileName }}</span>
                      </template>
                    </el-table-column>
                    <!-- <el-table-column prop="uploadMan" label="上传人" width="80" align="center" /> -->
                    <el-table-column prop="uploadTime" label="上传时间" width="140" align="center" />
                    <el-table-column prop="checkResult" label="审批结果" width="80" align="center" />
                    <el-table-column align="center" label="操作" width="160" fixed="right">
                      <template slot-scope="scope">
                        <el-button size="mini" plain type="primary">上传</el-button>
                        <el-button v-if="scope.row.status=='已上传'" size="mini" plain type="primary">下载</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </el-row>
            </el-collapse-item>
          <!-- <el-row style="margin-top:20px;">
            <el-col :sm="24" :md="12">
              <el-form-item label="资料上传" label-width="100px" label-position="left">
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
              <div>与您同组的马辉正在上传中...<span style="margin-left:20px;color:blue;cursor:pointer;">相关行业标准技术规范.doc</span></div>
            </el-col>
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
            <el-collapse v-model="activeName" accordion>
              <el-collapse-item name="1" title="项目基本信息">
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
                      <el-input v-model="addForm.projectOutLeader" disabled />
                    </el-form-item>
                  </el-col>
                  <el-col>
                    <el-form-item label="被评价单位" />
                  </el-col>
                  <table class="detail-table" style="margin-bottom:18px;">
                    <tr>
                      <td>序号</td>
                      <td>被评价单位名称</td>
                      <td>工作联系人</td>
                      <td>联系方式</td>
                    </tr>
                    <tr v-for="(item, index) in addForm.linkmanArr" :key="item.linkmanId">
                      <td>{{ index + 1 }}</td>
                      <td><el-input v-model="item.companyName" readonly /></td>
                      <td><el-input v-model="item.linkmanName" readonly /></td>
                      <td><el-input v-model="item.linkmanPhone" readonly /></td>
                    </tr>
                  </table>
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
                </el-row>
              </el-collapse-item>
              <el-collapse-item name="2" title="项目资料信息">
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
                    <el-table-column prop="projectName" label="待上传项目资料名称" align="center" />
                    <el-table-column prop="projectName" label="已上传项目资料名称" align="center" />
                    <el-table-column prop="uploadTime" label="上传时间" align="center" />
                    <el-table-column align="center" label="操作" width="" fixed="right">
                      <template>
                        <el-button size="small" plain type="primary">点击预览</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </el-collapse-item>
              <el-collapse-item name="3" title="审批记录信息">
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
  name: 'infoUpload',
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
      activeName: '2',
      list: [{
        projectNo: '2020-07714-01-Z01',
        projectName: '2020-07714-01-Z01天津市滨海新区财政局-一般公共预算项目绩效评价',
        clientName: '天津市滨海新区财政局',
        riskLevel: 3,
        partner: '贾立华',
        projectManager: '马辉',
        projectAid: '李宁',
        projectOutLeader: '李宁',
        status: '合伙人(1)项目经理(2)专家(2)组员(3)',
        dataDetailList: 'XX项目绩效评价需提供的资料清单',
        approvalTime: '',
        buildMan: '李宁',
        percentage: 60,
        fileType: '政策制度性文件',
        fileName: '相关行业发展规划和方针政策',
        uploadFileName: '0',
        approvalTime: '剩余1天5小时27分钟10秒'
      }, {
        projectNo: '2018-06470-01',
        projectName: '2018-06470-01-天津市铁路运输检察院-内部控制体系建设',
        clientName: '天津市铁路运输检察院',
        riskLevel: 3,
        partner: '贾立华',
        projectManager: '马辉',
        projectAid: '李宛昱',
        projectOutLeader: '李宛昱',
        dataDetailList: 'XX项目绩效评价需提供的资料清单',
        status: '合伙人(1)项目经理(2)专家(2)组员(3)',
        approvalTime: '2020-10-09 10:20:10',
        buildMan: '李宛昱',
        percentage: 100,
        fileType: '财务资料',
        fileName: '财务管理制度',
        uploadFileName: '3',
        isTimeout: ''
      },
      // {
      //   projectNo: '2019-01477',
      //   projectName: '2019-01477-天津交响乐团-内部控制评价',
      //   clientName: '天津交响乐团',
      //   riskLevel: 3,
      //   partner: '贾立华',
      //   projectManager: '马辉',
      //   projectAid: '李宛昱',
      //   projectOutLeader: '李宛昱',
      //   dataDetailList: 'XX项目绩效评价需提供的资料清单',
      //   status: 2,
      //   approvalTime: '2020-10-09 10:20:10',
      //   buildMan: '李宛昱',
      //   percentage: 100
      // }, {
      //   projectNo: '2020-00650',
      //   projectName: '2020-00650-天津市司法局-政务咨询',
      //   clientName: '天津市司法局',
      //   riskLevel: 3,
      //   partner: '贾立华',
      //   projectManager: '马辉',
      //   projectAid: '李宛昱',
      //   projectOutLeader: '李宛昱',
      //   dataDetailList: 'XX项目绩效评价需提供的资料清单',
      //   status: 2,
      //   approvalTime: '2020-10-09 10:20:10',
      //   buildMan: '李宛昱',
      //   percentage: 100
      // }
      ],
      total: 1,
      addChildShow: false,
      title: '',
      addForm: {
        projectNo: '2020-07714-01-Z01',
        projectName: '2020-07714-01-Z01天津市滨海新区财政局-一般公共预算项目绩效评价',
        clientName: '天津市滨海新区财政局',
        projectType: 1,
        partner: '贾立华',
        projectManager: '马辉',
        projectAid: '李宁',
        projectOutLeader: '李宁',
        functionClassify: '一般公共服务支出-财政事务',
        ecoClassify: '公共管理、社会保障和社会组织-国家机构-国家行政机构-经济事务管理机构',
        riskLevel: 'C',
        linkmanArr: [
          {
            linkmanId: 1,
            companyName: '浙江省科学技术厅',
            linkmanName: '许丹一丰',
            linkmanPhone: '15678992345'
          }, {
            linkmanId: 2,
            companyName: '天津市司法局',
            linkmanName: '张涛',
            linkmanPhone: '19925363738'
          }, {
            linkmanId: 3,
            companyName: '天津市滨海新区财政局',
            linkmanName: '贾秀林',
            linkmanPhone: '15825367897'
          }
        ],
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
      },
      detailShow: false,
      bottomSearchBoxShow: false,
      addShow: false,
      parentList: [{
        projectNo: '2020-05764',
        projectName: '财务管理制度.doc',
        clientName: '浙江省科学技术厅',
        projectManager: '张强',
        projectType: 1,
        uploadTime: '2021-01-18 08:33:28'
      }, {
        projectNo: '2020-05764-01',
        projectName: '相关预算收入和支出财务明细账、凭证及资金执行情况统计表.doc',
        clientName: '浙江省科学技术厅',
        projectManager: '张强',
        projectType: 1,
        uploadTime: '2021-01-17 08:33:28'
      }, {
        projectNo: '2020-05764',
        projectName: '项目支出财务明细账、凭证及资金执行情况统计表.doc',
        clientName: '浙江省科学技术厅',
        projectManager: '张强',
        projectType: 1,
        uploadTime: '2021-01-19 08:33:28'
      }],
      fileUploadList: [{
        fileName: '相关行业标准及专业技术规范.doc',
        fileSize: '12.2MB',
        uploadMan: '周梦岩',
        uploadTime: '2020-12-08 19:12:22',
        status: '已审批'
      }, {
        fileName: '相关行业标准及专业技术规范.doc',
        fileSize: '20.3MB',
        uploadMan: '朱晓琳',
        uploadTime: '2020-12-08 19:12:22',
        status: '已审批'
      }, {
        fileName: '相关管理制度.pdf',
        fileSize: '2.8MB',
        uploadMan: '李宁',
        uploadTime: '2020-12-08 19:12:22',
        status: '已审批'
      }],
      fileUploadingList: [
        {
        fileName: '相关行业标准及专业技术规范.doc',
        fileSize: '13.8MB',
        uploadMan: '周梦岩',
        uploadTime: '2020-12-14 19:12:22',
        status: '审批中'
      }, {
        fileName: '项目管理规范.doc',
        fileSize: '10.2MB',
        uploadMan: '朱晓琳',
        uploadTime: '2020-12-15 19:12:22',
        status: '审批中'
      }
      ],
      fileUploadArr: [
        // {
        //   fileType: '政策制度性文件',
        //   fileName: '国家相关法律、法规和规章制度',
        //   fileSize: '13.8MB',
        //   buildMan: '李宛昱',
        //   buildTime: '2020-12-14 19:12:22',
        //   uploadFileName: '',
        //   uploadMan: '',
        //   uploadTime: '',
        //   status: '待上传'
        // },
        {
          id: 1,
          fileType: '政策制度性文件',
          fileName: '相关行业发展规划和方针政策',
          fileSize: '10.2MB',
          buildMan: '李宁',
          buildTime: '2020-12-15 19:12:22',
          uploadFileName: '关于加强财政支出绩效评价结果应用的意见.doc',
          uploadMan: '朱晓琳',
          uploadTime: '2020-12-23 9:42:22',
          status: '已上传',
          checkResult: '通过',
          // children: [
          //   {
          //     id: 11,
          //     fileType: '政策制度性文件',
          //     fileName: '相关行业发展规划和方针政策',
          //     fileSize: '10.2MB',
          //     buildMan: '李宁',
          //     buildTime: '2020-12-15 19:12:22',
          //     uploadFileName: '行政事业单位内部控制规范（试行）.doc',
          //     uploadMan: '朱晓琳',
          //     uploadTime: '2020-12-23 9:42:22',
          //     status: '已上传',
          //     checkResult: '通过',
          //   }
          // ]
        }, {
          id: 2,
          fileType: '业务资料',
          fileName: '绩效评价项目申报书',
          fileSize: '10.2MB',
          buildMan: '李宁',
          buildTime: '2020-12-15 19:12:22',
          uploadFileName: '',
          uploadMan: '',
          uploadTime: '',
          status: '待上传'
        }, {
          id: 3,
          fileType: '财务资料',
          fileName: '财务管理制度',
          fileSize: '10.2MB',
          buildMan: '李宁',
          buildTime: '2020-12-15 19:12:22',
          uploadFileName: '中共中央 国务院关于全面实施预算绩效管理的意见.doc',
          uploadMan: '朱晓琳',
          uploadTime: '2020-12-23 9:32:22',
          status: '已上传',
          checkResult: '不通过'
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
    buildList() {
      this.addShow = true
    },
    detailHandle() {
      this.addShow = true
    },
    customColorMethod(percentage) {
      if (percentage < 30) {
          return '#909399';
        } else if (percentage < 70) {
          return '#e6a23c';
        } else {
          return '#67c23a';
        }
    },
    fileDetail(index, row) {
      this.addShow = true
    },
    uploadItem() {
      this.$confirm('您确认提交吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '操作成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
    }
  }
}
</script>
<style rel="stylesheet/less" lang="less" scoped>
.detail-table tr:first-child{
  background-color: #F5FAFF;
}
</style>
