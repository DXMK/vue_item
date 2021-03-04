<script>
/*
 * @Author: zhangtao
 * @Date:   2020-12-02 11:41:43
 * @Last Modified by:   Your name
 * @Last Modified time: 2021-02-02 11:54:26
 */
</script>
<template>
  <div class="page-container">
    <div class="table-list-search">
      <el-form ref="listQuery" :model="listQuery" inline size="mini">
        <el-form-item label="资料清单名称" prop="companyName">
          <el-input v-model="listQuery.companyName" />
        </el-form-item>
        <el-form-item label="拟定人" prop="companyName">
          <el-input v-model="listQuery.companyName" />
        </el-form-item>
        <el-form-item label="审批状态" prop="companyName">
          <el-select v-model="listQuery.companyName">
            <el-option value="1" label="待审批">待审批</el-option>
            <el-option value="2" label="暂存">暂存</el-option>
            <el-option value="3" label="审核中">审核中</el-option>
            <el-option value="4" label="已审核">已审核</el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="客户名称" prop="companyName">
          <el-input v-model="listQuery.companyName" />
        </el-form-item> -->
        <!-- <el-form-item class="table-search-button">
          <el-button type="primary" size="mini" icon="" @click="buildList">清单拟定</el-button>
        </el-form-item> -->
        <!-- <el-form-item class="table-search-button">
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
            <el-button size="mini" class="el-icon-download" type="primary"> 模板下载</el-button>
          </el-upload>
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
        <el-form-item>
          <el-button class="moreSearch" type="text" @click="searchBoxShow" v-text="bottomSearchBoxShow?'收起':'更多筛选'" />
        </el-form-item>
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
        <el-table-column prop="dataDetailList" label="资料清单名称" width="220" align="center" />
        <el-table-column prop="buildMan" label="拟定人" width="90" align="center" />
        <el-table-column prop="approvalTime" label="拟定时间" width="140" align="center" />
        <el-table-column prop="projectName" label="所属项目名称" width="" align="center" />
        <!-- <el-table-column prop="projectNo" label="项目编号" width="130" align="center" /> -->
        <el-table-column prop="riskLevel" label="风险级别" width="100" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.riskLevel === 1">A</span>
            <span v-if="scope.row.riskLevel === 2">B</span>
            <span v-if="scope.row.riskLevel === 3">C</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="clientName" label="客户名称" align="center" /> -->

        <el-table-column prop="status" label="审批状态" width="100" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 1">待审批</span>
            <span v-if="scope.row.status === 2">暂存</span>
            <span v-if="scope.row.status === 3">审批中</span>
            <span v-if="scope.row.status === 4">已审批</span>
          </template>
        </el-table-column>
        <el-table-column prop="stage" label="清单拟定阶段" width="100" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.stage === '1'">方案制定阶段资料清单</span>
            <span v-if="scope.row.stage === '2'">预调研阶段资料清单</span>
            <span v-if="scope.row.stage === '3'">调研阶段资料清单</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="160" fixed="right">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.status === 1"
              size="small"
              plain
              type="primary"
              @click="handelAdd(scope.$index, scope.row)"
            >资料清单拟定</el-button>
            <el-button
              v-if="scope.row.status === 2"
              size="small"
              plain
              type="primary"
              @click="handelAdd(scope.$index, scope.row)"
            >修改</el-button>
            <el-button
              v-if="scope.row.status === 3||scope.row.status === 4"
              size="small"
              plain
              type="primary"
              @click="detailHandle(scope.$index, scope.row)"
            >详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog width="90%" class="dialog" title="清单拟定信息" :visible.sync="addShow" @close="closeDialog">
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
            <el-table-column prop="projectNo" label="项目编号" align="center" />
            <el-table-column prop="projectName" label="项目名称" align="center" />
            <!-- <el-table-column prop="clientName" label="客户名称" align="center" /> -->
            <el-table-column prop="riskLevel" label="风险级别" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.riskLevel === 1">A</span>
                <span v-if="scope.row.riskLevel === 2">B</span>
                <span v-if="scope.row.riskLevel === 3">C</span>
              </template>
            </el-table-column>
            <el-table-column prop="projectManager" label="项目经理" align="center" />
            <!-- <el-table-column prop="approvalTime" label="立项时间" width="140" align="center" /> -->
            <el-table-column align="center" label="操作" width="" fixed="right">
              <template slot-scope="scope">
                <el-button size="small" plain type="primary" @click="handelAdd(scope.$index, scope.row)">拟定清单</el-button>
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
      title="资料清单信息"
      :close-on-click-modal="false"
      :visible.sync="addChildShow"
      @close="closeDialog"
    >
      <div class="dialog-body">
        <el-form :model="addForm" size="small" label-width="140px" label-position="center">
          <el-collapse v-model="activeName" accordion>
            <el-collapse-item title="项目基本信息" name="1">
              <el-row>
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
                    <el-input v-model="addForm.riskLevel" disabled />
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
                  <el-form-item label="预算支出功能分类">
                    <el-input v-model="addForm.functionClassify" disabled />
                  </el-form-item>
                </el-col>
                <el-col :sm="24" :md="24">
                  <el-form-item label="国民经济行业分类">
                    <el-input v-model="addForm.ecoClassify" disabled />
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
                    <!-- <td>操作</td> -->
                  </tr>
                  <tr v-for="(item, index) in addForm.linkArr" :key="item.linkmanId">
                    <td>{{ index + 1 }}</td>
                    <td><el-input v-model="item.companyName" readonly="true" /></td>
                    <td><el-input /></td>
                    <td><el-input /></td>
                    <!-- <td><el-button type="danger" icon="el-icon-delete" circle @click="partReduce" /></td> -->
                  </tr>
                </table>
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
                    <td><el-input v-model="item.staffNo" readonly="true" /></td>
                    <td><el-input v-model="item.staffName" /></td>
                    <td><el-input v-model="item.staffLevel" /></td>
                    <!-- <td><el-button type="danger" icon="el-icon-delete" circle @click="partReduce" /></td> -->
                  </tr>
                </table>
              </el-row>
            </el-collapse-item>
            <el-collapse-item title="清单拟定信息" name="2">
              <el-row>
                <el-row>
                  <el-col :xs="24" class="btn" style="margin-bottom:10px;">
                    <!-- <el-form-item label="拟定阶段">
                      <el-select v-model="addForm.stage">
                        <el-option label="方案制定阶段资料清单" value="1">方案制定阶段资料清单</el-option>
                        <el-option label="预调研阶段资料清单" value="2">预调研阶段资料清单</el-option>
                        <el-option label="调研阶段资料清单" value="3">调研阶段资料清单</el-option>
                      </el-select>
                    </el-form-item> -->
                    <div style="text-align:right;">
                      <el-button type="primary" size="small" icon="el-icon-download" @click="toLead">从项目案例库中导入</el-button>
                      <el-button type="primary" size="small" icon="el-icon-circle-plus" @click="linkmanAdd">添加一行</el-button>
                    </div>
                  </el-col>
                </el-row>
                <el-row style="overflow:auto;">
                  <table class="detail-table" border="1">
                    <tr class="rowStyle">
                      <td>序号</td>
                      <td>资料一级分类</td>
                      <td>资料二级分类</td>
                      <td>资料名称</td>
                      <td>指定资料收集人</td>
                      <td>持续时间</td>
                      <td>任务工期</td>
                      <td>操作</td>
                    </tr>
                    <tr v-for="(item, index) in addForm.linkmanArr" :key="item.listId" class="content_style">
                      <td>{{ index + 1 }}</td>
                      <td><el-input v-model="item.listType" /></td>
                      <td><el-input v-model="item.listName" /></td>
                      <td><el-input /></td>
                      <td><el-input placeholder="点击选择指定" readonly="true" @focus="chooseClerk" /></td>
                      <td><el-date-picker
                        v-model="item.buildTime"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                      /></td>
                      <td><el-input /></td>
                      <td><el-button type="danger" icon="el-icon-delete" circle @click="linkmanReduce" /></td>
                    </tr>
                  </table>
                </el-row>
              </el-row>
            </el-collapse-item>
          </el-collapse>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addChildShow = false">取 消</el-button>
        <el-button type="warning" @click="holdSave">暂 存</el-button>
        <el-button type="primary" @click="submitSave">提 交</el-button>
      </span>
    </el-dialog>
    <!--导入-->
    <el-dialog
      width="90%"
      class="dialog"
      title="项目案例库"
      :close-on-click-modal="false"
      :visible.sync="addFrameShow"
      @close="closeDialog"
    >
      <div class="dialog-body">
        <div>
          <el-form ref="listQuery" :model="listQuery" inline size="mini">
            <el-form-item label="项目名称" prop="companyName">
              <el-input v-model="listQuery.companyName" />
            </el-form-item>
            <el-form-item label="业务类型" prop="companyName">
              <el-input v-model="listQuery.companyName" />
            </el-form-item>
            <el-form-item label="客户所属地区" prop="companyName">
              <el-input v-model="listQuery.companyName" />
            </el-form-item>
            <el-form-item label="预算支出功能分类" prop="companyName">
              <el-input v-model="listQuery.companyName" />
            </el-form-item>
            <el-form-item label="国民经济行业分类" prop="companyName">
              <el-input v-model="listQuery.companyName" />
            </el-form-item>
            <el-form-item>
              <el-button size="mini" type="primary" icon="el-icon-search">查 询</el-button>
              <el-button size="mini" @click="listQueryReset">重 置</el-button>
            </el-form-item>
          </el-form>
        </div>
        <el-table
          v-loading="listLoading"
          :data="indexList"
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
          <el-table-column type="expand" :span-method="arraySpanMethod">
            <template slot-scope="">
              <div>
                <el-tree
                  :data="dataList"
                  show-checkbox
                  :props="defaultProps"
                />
              </div>
            </template>
          </el-table-column>
          <el-table-column type="selection" width="55" fixed="left" align="center" />
          <el-table-column type="index" :index="typeIndex" label="序号" fixed="left" align="center" />
          <el-table-column prop="projectName" label="项目名称" align="center" />
          <el-table-column prop="businessType" label="业务类型" align="center" />
          <el-table-column prop="clientArea" label="客户所属地区" align="center" />
          <el-table-column prop="listTimes" label="项目资料清单个数" align="center" width="">
            <template slot-scope="scope">
              <el-popover
                placement="top"
                width="210"
                trigger="hover"
                :content="scope.row.listname"
              >
                <span slot="reference" style="color:blue;cursor:pointer;">{{ shortName(scope.row.listTimes) }}</span>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="functionClassify" label="预算支出功能分类" align="center" />
          <el-table-column prop="ecoClassify" label="国民经济行业分类" align="center" />
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addFrameShow = false">取 消</el-button>
        <!-- <el-button type="warning" @click="holdSave">暂 存</el-button> -->
        <el-button type="primary" @click="submitSave">保 存</el-button>
      </span>
    </el-dialog>
    <!--选择追加还是替换-->
    <el-dialog
      width="60%"
      class="dialog"
      title="选择导入方式"
      :close-on-click-modal="false"
      :visible.sync="poolShow"
      @close="closeDialog"
    >
      <div class="dialog-body">
        <el-form size="small" :model="pointSet">
          <el-col>
            <el-form-item label="导入方式">
              <el-radio v-model="pointSet.solveStyle" label="1">追加</el-radio>
              <el-radio v-model="pointSet.solveStyle" label="2">替换</el-radio>
            </el-form-item>
          </el-col>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="poolShow = false">取 消</el-button>
        <el-button type="primary" @click="poolShow = false">确 认</el-button>
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
      title="详情信息"
      :close-on-click-modal="false"
      :visible.sync="detailShow"
      @close="closeDialog"
    >
      <div class="dialog-body">
        <div>
          <el-form :model="addForm" label-width="140px" size="small">
            <el-collapse v-model="activeDetail" accordion>
              <el-collapse-item name="1" title="基本项目信息">
                <el-row>
                  <el-form-item label="项目名称">
                    <el-col :span="24">
                      <el-input v-model="addForm.projectName" disabled />
                    </el-col>
                  </el-form-item>
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
                    <el-form-item label="风险级别">
                      <el-select v-model="addForm.riskLevel" disabled>
                        <el-option label="A" :value="1" />
                        <el-option label="B" :value="2" />
                        <el-option label="C" :value="3" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :sm="24" :md="12">
                    <el-form-item label="项目属性">
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
                    <el-form-item label="客户名称">
                      <el-input v-model="addForm.clientName" disabled />
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
                      <td><el-input v-model="item.companyName" readonly="true" /></td>
                      <td><el-input /></td>
                      <td><el-input /></td>
                    </tr>
                  </table>
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
                </el-row>
              </el-collapse-item>
              <el-collapse-item title="资料清单信息" name="2">
                <el-row style="margin-bottom:20px;">
                  <table class="detail-table">
                    <tr>
                      <td>序号</td>
                      <td>资料分类</td>
                      <td>二级分类</td>
                      <td>资料名称</td>
                      <td>指定资料收集人</td>
                      <td>持续时间</td>
                      <td>任务工期</td>
                    </tr>
                    <tr v-for="(item, index) in addForm.linkmanArr" :key="item.listId">
                      <td>{{ index + 1 }}</td>
                      <td>{{ item.listType }}</td>
                      <td width="30%">{{ item.listName }}</td>
                      <td />
                      <td>{{ item.buildMan }}</td>
                      <td />
                      <td />
                    </tr>
                  </table>
                  <!-- <div style="margin-left:10px;margin-bottom:10px; margin-top:20px;">已上传资料清单列表</div>
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
                  <el-table-column align="center" label="操作" width="" fixed="right">
                    <template slot-scope="scope">
                      <el-button size="small" plain type="primary" @click="handelAdd(scope.$index, scope.row)">下载</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div> -->
                </el-row>
              </el-collapse-item>
            </el-collapse>
          </el-form>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="detailShow = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { shortName } from '@/utils'
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
      poolShow: false,
      pointSet: {
        solveStyle: ''
      },
      activeName: '2',
      activeDetail: '2',
      list: [{
        projectNo: '2020-07714-01-Z01',
        projectName: '2020-07714-01-Z01天津市滨海新区财政局-一般公共预算项目绩效评价',
        clientName: '天津市滨海新区财政局',
        riskLevel: 3,
        partner: '贾立华',
        projectManager: '马辉',
        projectAid: '李宁',
        projectOutLeader: '李宁',
        status: 1,
        dataDetailList: 'XX项目绩效评价需提供的资料清单',
        approvalTime: '2020-10-09 10:20:10',
        buildMan: '李宁',
        stage: '1',
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
        status: 3,
        approvalTime: '2020-10-09 10:20:10',
        buildMan: '李宛昱',
        stage: '2',
      }, {
        projectNo: '2019-01477',
        projectName: '2019-01477-天津交响乐团-内部控制评价',
        clientName: '天津交响乐团',
        riskLevel: 3,
        partner: '贾立华',
        projectManager: '马辉',
        projectAid: '李宛昱',
        projectOutLeader: '李宛昱',
        dataDetailList: 'XX项目绩效评价需提供的资料清单',
        status: 2,
        approvalTime: '2020-10-09 10:20:10',
        buildMan: '李宛昱',
        stage: '3',
      }, {
        projectNo: '2020-00650',
        projectName: '2020-00650-天津市司法局-政务咨询',
        clientName: '天津市司法局',
        riskLevel: 3,
        partner: '贾立华',
        projectManager: '马辉',
        projectAid: '李宛昱',
        projectOutLeader: '李宛昱',
        dataDetailList: 'XX项目绩效评价需提供的资料清单',
        status: 4,
        approvalTime: '2020-10-09 10:20:10',
        buildMan: '李宛昱',
        stage: '2',
      }],
      total: 1,
      indexList: [{
        id: 1,
        oneLevel: '一般公共服务支出',
        twoLevel: '其他一般公共服务支出',
        kind: '公共管理、社会保障和社会组织',
        bigkind: '国家机构',
        projectName: '2020-03847-中共深圳市福田区委组织部-政务咨询',
        businessType: '非鉴证业务-政务咨询-政务咨询',
        functionClassify: '一般公共服务支出-财政事务',
        ecoClassify: '公共管理、社会保障和社会组织-国家机构-国家行政机构-经济事务管理机构',
        clientArea: '深圳',
        listTimes: 3,
        listname: '1.政策制度性文件:国家相关法律、法规和规章制度；2.业务资料:项目申报书；3.财务资料:财务管理制度',
        children: [{
          id: 11,
          oneLevel: '一般公共服务支出',
          twoLevel: '其他一般公共服务支出',
          kind: '公共管理、社会保障和社会组织',
          bigkind: '国家机构',
          projectName: '2020-03847-Z01-中共深圳市福田区委组织部-政务咨询',
          businessType: '非鉴证业务-政务咨询-政务咨询',
          clientArea: '深圳',
          listTimes: 1,
          listname: '国家相关法律、法规和规章制度',
          listType: '政策制度性文件'
        }, {
          id: 12,
          oneLevel: '一般公共服务支出',
          twoLevel: '其他一般公共服务支出',
          kind: '公共管理、社会保障和社会组织',
          bigkind: '国家机构',
          projectName: '2020-03847-Z02-中共深圳市福田区委组织部-政务咨询',
          businessType: '非鉴证业务-政务咨询-政务咨询',
          clientArea: '深圳',
          listTimes: 1,
          listname: '项目申报书',
          listType: '业务资料'
        }, {
          id: 13,
          oneLevel: '一般公共服务支出',
          twoLevel: '其他一般公共服务支出',
          kind: '公共管理、社会保障和社会组织',
          bigkind: '国家机构',
          projectName: '2020-03847-Z03-中共深圳市福田区委组织部-政务咨询',
          businessType: '非鉴证业务-政务咨询-政务咨询',
          clientArea: '深圳',
          listTimes: 1,
          listname: '财务管理制度',
          listType: '财务资料'
        }]
      }, {
        oneLevel: '一般公共服务支出',
        twoLevel: '其他一般公共服务支出',
        kind: '公共管理、社会保障和社会组织',
        bigkind: '国家机构',
        projectName: '2020-02880-广州市黄埔区财政局-绩效评价',
        businessType: '非鉴证业务-政务咨询-政务咨询',
        functionClassify: '一般公共服务支出-财政事务',
        ecoClassify: '公共管理、社会保障和社会组织-国家机构-国家行政机构-行政监督检查机构',
        clientArea: '广州',
        listTimes: 2,
        listname: '1.政策制度性文件:国家相关法律、法规和规章制度；2.业务资料:项目申报书；',
        children: [{
          id: 11,
          oneLevel: '一般公共服务支出',
          twoLevel: '其他一般公共服务支出',
          kind: '公共管理、社会保障和社会组织',
          bigkind: '国家机构',
          projectName: '2020-03847-Z01-中共深圳市福田区委组织部-政务咨询',
          businessType: '非鉴证业务-政务咨询-政务咨询',
          clientArea: '深圳',
          listTimes: 1,
          listname: '国家相关法律、法规和规章制度',
          listType: '政策制度性文件'
        }, {
          id: 12,
          oneLevel: '一般公共服务支出',
          twoLevel: '其他一般公共服务支出',
          kind: '公共管理、社会保障和社会组织',
          bigkind: '国家机构',
          projectName: '2020-03847-Z02-中共深圳市福田区委组织部-政务咨询',
          businessType: '非鉴证业务-政务咨询-政务咨询',
          clientArea: '深圳',
          listTimes: 1,
          listname: '项目申报书',
          listType: '业务资料'
        }]
      }, {
        oneLevel: '一般公共服务支出',
        twoLevel: '其他一般公共服务支出',
        kind: '公共管理、社会保障和社会组织',
        bigkind: '国家机构',
        projectName: '2018-06097-贵州省环境保护厅-绩效评价',
        businessType: '非鉴证业务-政务咨询-政务咨询',
        functionClassify: '一般公共服务支出-知识产权事务',
        ecoClassify: '文化、体育和娱乐业-文化艺术业-文艺创作与表演',
        clientArea: '云南',
        listTimes: 4,
        listname: '1.政策制度性文件:国家相关法律、法规和规章制度；2.业务资料:项目申报书；3.财务资料:财务管理制度；4.财务资料:近三年决算报告',
        children: [{
          id: 11,
          oneLevel: '一般公共服务支出',
          twoLevel: '其他一般公共服务支出',
          kind: '公共管理、社会保障和社会组织',
          bigkind: '国家机构',
          projectName: '2020-03847-Z01-中共深圳市福田区委组织部-政务咨询',
          businessType: '非鉴证业务-政务咨询-政务咨询',
          clientArea: '深圳',
          listTimes: 1,
          listname: '国家相关法律、法规和规章制度',
          listType: '政策制度性文件'
        }, {
          id: 12,
          oneLevel: '一般公共服务支出',
          twoLevel: '其他一般公共服务支出',
          kind: '公共管理、社会保障和社会组织',
          bigkind: '国家机构',
          projectName: '2020-03847-Z02-中共深圳市福田区委组织部-政务咨询',
          businessType: '非鉴证业务-政务咨询-政务咨询',
          clientArea: '深圳',
          listTimes: 1,
          listname: '项目申报书',
          listType: '业务资料'
        }, {
          id: 13,
          oneLevel: '一般公共服务支出',
          twoLevel: '其他一般公共服务支出',
          kind: '公共管理、社会保障和社会组织',
          bigkind: '国家机构',
          projectName: '2020-03847-Z03-中共深圳市福田区委组织部-政务咨询',
          businessType: '非鉴证业务-政务咨询-政务咨询',
          clientArea: '深圳',
          listTimes: 1,
          listname: '财务管理制度',
          listType: '财务资料'
        }, {
          id: 14,
          oneLevel: '一般公共服务支出',
          twoLevel: '其他一般公共服务支出',
          kind: '公共管理、社会保障和社会组织',
          bigkind: '国家机构',
          projectName: '2020-03847-Z03-中共深圳市福田区委组织部-政务咨询',
          businessType: '非鉴证业务-政务咨询-政务咨询',
          clientArea: '深圳',
          listTimes: 1,
          listname: '近三年决算报告',
          listType: '财务资料'
        }]
      }],
      addChildShow: false,
      peopleShow: false,
      addFrameShow: false,
      title: '',
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      dataList: [
        {
          id: 1,
          label: '政策制度性文件',
          children: [
            {
              id: 11,
              label: '国家相关法律、法规和规章制度',
              children: [
                {
                  id: 111,
                  label: '中华人民共和国审计法实施条例',
                }
              ]
            }
          ]
        }
      ],
      addForm: {
        projectNo: '2018-06470-01',
        projectName: '2018-06470-01-天津市铁路运输检察院-内部控制体系建设',
        clientName: '天津市铁路运输检察院',
        projectType: 2,
        functionClassify: '一般公共服务支出-财政事务',
        ecoClassify: '公共管理、社会保障和社会组织-国家机构-国家行政机构-行政监督检查机构',
        riskLevel: 'C',
        partner: '贾立华',
        projectManager: '马辉',
        projectAid: '李宛昱',
        projectOutLeader: '李宛昱',
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
        linkArr: [
            {
              linkmanId: '',
              linkmanName: '',
              linkmanPhone: ''
            }
          ],
        linkmanArr: [
          {
            listId: 1,
            listType: '政策制度性文件',
            listName: '国家相关法律、法规和规章制度',
            buildMan: '李宛昱',
            buildTime: ''
          }, {
            listId: 2,
            listType: '政策制度性文件',
            listName: '部门或单位工作职责（可为三定方案，一般可在单位官网上下载）、中长期发展规划及年度工作计划——重点关注项目立项、绩效目标和指标设计与其相匹配性',
            buildMan: '李宁',
            buildTime: ''
          }, {
            listId: 3,
            listType: '政策制度性文件',
            listName: '相关行业发展规划和方针政策',
            buildMan: '李宁',
            buildTime: ''
          }, {
            listId: 4,
            listType: '政策制度性文件',
            listName: '相关行业标准及专业技术规范',
            buildMan: '李宁',
            buildTime: ''
          }, {
            listId: 5,
            listType: '政策制度性文件',
            listName: '相关管理制度',
            buildMan: '李宁',
            buildTime: ''
          }, {
            listId: 6,
            listType: '业务资料',
            listName: '项目立项依据和背景资料（包括相关文件及中央领导批示等），部分重点项目立项依据和背景资料——此项资料主要考核项目立项依据充分性',
            buildMan: '李宁',
            buildTime: ''
          }, {
            listId: 7,
            listType: '业务资料',
            listName: '项目申报书（可为预算系统内的项目预算申报文本，包括绩效目标申报表）、可行性报告及专家论证意见（首次立项项目需提供，非首次立项项目无需提供）——此项资料主要考核项目立项规范性、绩效目标和指标设计合理性',
            buildMan: '李宁',
            buildTime: ''
          }, {
            listId: 8,
            listType: '业务资料',
            listName: '项目总体实施方案及年度工作计划，部分重点工作任务实施方案和工作计划——此项资料主要考核项目绩效目标、指标设置合理性，是否与方案相匹配',
            buildMan: '李宁',
            buildTime: ''
          }, {
            listId: 9,
            listType: '业务资料',
            listName: '项目调整情况及其报告和批准文件——重点关注项目调整依据、测算过程及审批程序规范性',
            buildMan: '李宁',
            buildTime: ''
          }, {
            listId: 10,
            listType: '业务资料',
            listName: '有关业务工作管理办法和文件（具体业务上的管理制度）——重点关注项目业务管理制度健全性、执行有效性',
            buildMan: '李宁',
            buildTime: ''
          }, {
            listId: 11,
            listType: '业务资料',
            listName: '项目验收（或中期检查、评估）报告————此项资料主要考核项目制度执行有效性，或项目产出质量',
            buildMan: '李宁',
            buildTime: ''
          }, {
            listId: 12,
            listType: '业务资料',
            listName: '年度工作总结（重点关注涉及评价项目的实施情况和效果）、绩效自评报告及相关绩效报告',
            buildMan: '李宁',
            buildTime: ''
          }, {
            listId: 13,
            listType: '业务资料',
            listName: '绩效情况说明或其他反映项目实施成效的资料，包括：工作进展情况汇报、对经济社会影响报告、满意度调查资料等',
            buildMan: '李宁',
            buildTime: ''
          }, {
            listId: 14,
            listType: '业务资料',
            listName: '项目实施过程中的经验做法',
            buildMan: '李宁',
            buildTime: ''
          }, {
            listId: 15,
            listType: '业务资料',
            listName: '项目实施过程中存在的问题及建议',
            buildMan: '李宁',
            buildTime: ''
          }, {
            listId: 16,
            listType: '财务资料',
            listName: '近三年预算安排情况（如为延续性项目或政策，应提供自立项以来年度预算情况），包括：预算批复文件、资金下达文件、资金到位凭证、预算调整文件——重点关注预算批复数、下达数、下达时间、资金到位时间以及预算调整情况，考核资金到位、下达等及时性、到位率等',
            buildMan: '李宁',
            buildTime: ''
          }, {
            listId: 17,
            listType: '财务资料',
            listName: '财务管理制度（包括预算、收支、专项资金、采购、资产、工程和合同管理等制度）',
            buildMan: '李宁',
            buildTime: ''
          }, {
            listId: 18,
            listType: '财务资料',
            listName: '相关预算收入和支出财务明细账、凭证及资金执行情况统计表',
            buildMan: '李宁',
            buildTime: ''
          }, {
            listId: 19,
            listType: '财务资料',
            listName: '相关资产管理明细账、凭证及统计表（若有）',
            buildMan: '李宁',
            buildTime: ''
          }, {
            listId: 20,
            listType: '财务资料',
            listName: '项目支出财务明细账、凭证及资金执行情况统计表',
            buildMan: '李宁',
            buildTime: ''
          }, {
            listId: 21,
            listType: '财务资料',
            listName: '项目相关协议合同及台账，包括涉及的招标采购工作资料及采购协议',
            buildMan: '李宁',
            buildTime: ''
          }, {
            listId: 22,
            listType: '财务资料',
            listName: '近三年决算报告（若为新增项目，仅要求提供评价年度决算即可，且一般提供的资料为决算报表）及年度审计报告——决算报表重点关注“财决06-1表”中的项目年初结转、本年执行及结转下年数，以考核预算执行率',
            buildMan: '李宁',
            buildTime: ''
          }, {
            listId: 23,
            listType: '财务资料',
            listName: '人大审查结果报告（视具体项目情况确定）（若有）',
            buildMan: '李宁',
            buildTime: ''
          }, {
            listId: 24,
            listType: '财务资料',
            listName: '财政监督检查报告（视具体项目情况确定）（若有）',
            buildMan: '李宁',
            buildTime: ''
          }
        ]
      },
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
      detailShow: false,
      bottomSearchBoxShow: false,
      addShow: false,
      parentList: [{
        projectNo: '2020-05764-01',
        projectName: '2020-05764-01-浙江省科学技术厅',
        clientName: '浙江省科学技术厅',
        projectManager: '张强',
        projectType: 1
      }, {
        projectNo: '2020-05764',
        projectName: '2020-05764-浙江省科学技术厅',
        clientName: '浙江省科学技术厅',
        projectManager: '张强',
        projectType: 1
      }, {
        projectNo: '2020-05764',
        projectName: '2020-05764-浙江省科学技术厅',
        clientName: '浙江省科学技术厅',
        projectManager: '张强',
        projectType: 1
      }],
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
      }]
    }
  },
  methods: {
    shortName,
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
    peopleIndex(index) {
      return index
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
      this.poolShow = true
    },
    buildList() {
      this.addShow = true
    },
    detailHandle(index, row) {
      this.detailShow = true
    },
    linkmanAdd() {
      const timepart = {
        listId: '',
        listType: '',
        listName: ''
      }
      this.addForm.linkmanArr.push(timepart)
    },
    // 删除
    linkmanReduce(index) {
      this.addForm.linkmanArr.splice(index, 1)
    },
    toLead() {
      this.addFrameShow = true
    },
    chooseClerk() {
      this.peopleShow = true
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
        if (rowIndex % 2 === 0) {
          if (columnIndex === 0) {
            return [1, 2];
          } else if (columnIndex === 1) {
            return [0, 0];
          }
        }
      },
  }
}
</script>
<style rel="stylesheet/less" lang="less" scoped>
.detail-table tr:first-child{
  background-color: #F5FAFF;
}
.rowStyle{
    white-space:nowrap;
  }
  .content_style td{
    white-space:nowrap;
  }
</style>
