<script>
/*
 * @Author: Your name
 * @Date:   2020-12-01 15:47:52
 * @Last Modified by:   Your name
 * @Last Modified time: 2021-01-28 09:55:33
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
            <el-option :value="1" label="A" />
            <el-option :value="2" label="B" />
            <el-option :value="3" label="C" />
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="客户名称" prop="companyName">
          <el-input v-model="listQuery.companyName" />
        </el-form-item> -->
        <el-collapse-transition>
          <div v-show="bottomSearchBoxShow" style="display:inline-block;">
            <el-form-item label="子项目编号">
              <el-input v-model="listQuery.clientName" />
            </el-form-item>
            <el-form-item label="子项目名称">
              <el-input v-model="listQuery.clientCode" />
            </el-form-item>
            <el-form-item label="子项目类型" prop="companyName">
              <el-select v-model="listQuery.clientCode">
                <el-option :value="1" label="A" />
                <el-option :value="2" label="B" />
                <el-option :value="3" label="C" />
              </el-select>
            </el-form-item>
          </div>
        </el-collapse-transition>
        <el-form-item>
          <!-- <el-button class="moreSearch" type="text" @click="searchBoxShow" v-text="bottomSearchBoxShow?'收起':'更多筛选'" /> -->
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" icon="el-icon-search">查 询</el-button>
          <el-button size="mini" @click="listQueryReset">重 置</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" icon="el-icon-upload2">全部导出</el-button>
        </el-form-item>
        <el-form-item v-show="exportHide" class="table-search-button">
          <el-button type="primary" size="mini" icon="el-icon-upload2">按条件导出</el-button>
        </el-form-item>
        <el-form-item v-show="chooseExport" class="table-search-button">
          <el-button type="primary" size="mini" icon="el-icon-upload2" disabled>按条件导出</el-button>
        </el-form-item>
      </el-form>
    </div>
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
        <!-- v-loading="listLoading" -->
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-table
              :data="scope.row.children"
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
              <el-table-column type="selection" width="55" fixed="left" />
              <el-table-column type="index" :index="typeIndex" label="序号" fixed="left" align="center" />
              <el-table-column prop="childProjectNo" label="子项目编号" align="center" />
              <el-table-column prop="childProjectName" label="子项目名称" align="center" />
              <el-table-column prop="riskLevel" label="风险级别" width="80" align="center">
                <template>
                  <span v-if="scope.row.riskLevel === 1">A</span>
                  <span v-if="scope.row.riskLevel === 2">B</span>
                  <span v-if="scope.row.riskLevel === 3">C</span>
                </template>
              </el-table-column>
              <el-table-column prop="functionClassify" label="预算支出功能分类" align="center" />
              <el-table-column prop="ecoClassify" label="国民经济行业分类" align="center" />
              <el-table-column align="center" label="操作" width="100" fixed="right">
                <template>
                  <el-button
                    size="small"
                    plain
                    type="primary"
                    @click="detailHandle(scope.$index, scope.row)"
                  >详情</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column type="selection" width="55" fixed="left" />
        <el-table-column type="index" :index="typeIndex" label="序号" fixed="left" align="center" />
        <el-table-column prop="projectNo" label="项目编号" width="110" align="center" />
        <el-table-column prop="projectName" label="项目名称" align="left" />
        <el-table-column prop="riskLevel" label="风险级别" width="70" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.riskLevel === 1">A</span>
            <span v-if="scope.row.riskLevel === 2">B</span>
            <span v-if="scope.row.riskLevel === 3">C</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="isSplit" label="是否拆分子项目" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.isSplit === 1">是</span>
            <span v-if="scope.row.isSplit === 2">否</span>
          </template>
        </el-table-column>
        <el-table-column prop="childProjectNo" label="子项目编号" align="center" />
        <el-table-column prop="childProjectName" label="子项目名称" align="center" /> -->
        <el-table-column prop="functionClassify" label="预算支出功能分类" align="center" />
        <el-table-column prop="ecoClassify" label="国民经济行业分类" align="center" />
        <!-- <el-table-column prop="riskLevel" label="风险级别" width="80" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.riskLevel === 1">高</span>
            <span v-if="scope.row.riskLevel === 2">中</span>
            <span v-if="scope.row.riskLevel === 3">低</span>
          </template>
        </el-table-column> -->
        <el-table-column prop="status" label="状态" width="60" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 1">暂存</span>
            <span v-if="scope.row.status === 2">待审批</span>
            <span v-if="scope.row.status === 3">已审批</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="100" fixed="right">
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
      title="详情"
      :close-on-click-modal="false"
      :visible.sync="detailShow"
      @close="closeDialog"
    >
      <div class="dialog-body" style="display:flex;">
        <div style="flex:4">
          <el-form :model="detailForm" label-width="80" size="small">
            <el-row>
              <strong>项目信息</strong>
            </el-row>
            <el-divider />
            <el-row>
              <el-form-item label="项目编号">
                <el-col :span="18">
                  <el-input v-model="detailForm.projectNo" disabled />
                </el-col>
              </el-form-item>
              <el-form-item label="项目名称">
                <el-col :span="18">
                  <el-input v-model="detailForm.projectName" disabled />
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
                  <el-input placeholder="信息从管理平台带出" disabled />
                </el-col>
              </el-form-item>
              <el-form-item label="项目负责经理">
                <el-col :span="18">
                  <el-input placeholder="信息从管理平台带出" disabled />
                </el-col>
              </el-form-item>
              <!-- <el-form-item label="风险级别">
                <el-col :span="18">
                  <el-input v-model="detailForm.riskLevel" disabled />
                </el-col>
              </el-form-item> -->
              <!-- <el-form-item label="项目负责合伙人">
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
              </el-form-item> -->
              <!-- <el-col :sm="24" :md="12">
                <el-form-item label="是否拆分之项目">
                  <el-input v-model="detailForm.isSplit" disabled />
                </el-form-item>
              </el-col> -->
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
                <el-form-item label="子项目类型">
                  <el-input v-model="detailForm.childProjectType" disabled />
                </el-form-item>
              </el-col> -->
              <!-- <el-col :sm="24" :md="12">
                <el-form-item label="风险级别">
                  <el-input v-model="detailForm.riskLevel" disabled />
                </el-form-item>
              </el-col> -->
            </el-row>
            <el-row>
              <el-col>
                <el-form-item label="被评价单位名称" style="margin-bottom:0;" />
              </el-col>
              <div>
                <table class="detail-table professorTable">
                  <tr>
                    <td>序号</td>
                    <td>被评价单位名称</td>
                    <td>工作联系人</td>
                    <td>联系方式</td>
                    <!-- <td>操作</td> -->
                  </tr>
                  <tr v-for="(item, index) in detailForm.companyArr" :key="item.id">
                    <td>{{ index + 1 }}</td>
                    <td><el-input placeholder="" /></td>
                    <td><el-input placeholder="" /></td>
                    <td><el-input placeholder="" /></td>
                    <!-- <td><el-button type="danger" icon="el-icon-delete" circle @click="companypartReduce" /></td> -->
                  </tr>
                </table>
              </div>
            </el-row>
            <el-row style="margin-top:10px;">
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
                    <td>王存向</td>
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
              <el-step title="王存向" description="2020-12-02 11:29:39" />
              <el-step title="马辉" description="2020-12-03 15:49:25" />
              <el-step title="贾立华" />
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
  name: 'ProjectLedger',
  mixins: [tableListMixin, globalMixin],
  data() {
    return {
      listQuery: {
        current: 1,
        size: 10
      },
      list: [
        {
        id: 1,
        projectNo: '2018-06470-01',
        projectName: '2018-06470-01-天津市铁路运输检察院-内部控制体系建设',
        clientName: '天津市铁路运输检察院',
        projectType: 2,
        functionClassify: '一般公共服务支出-财政事务',
        ecoClassify: '公共管理、社会保障和社会组织-国家机构-国家行政机构-行政监督检查机构',
        riskLevel: 3,
        status: 2,
        approvalTime: '2020-01-10 14:20:10',
        children: [{
          id: 11,
          childProjectNo: '2018-06470-01-Z01',
          childProjectName: '2018-06470-01-Z01-天津市铁路运输检察院-内部控制体系建设',
          clientName: '天津市铁路运输检察院',
          projectType: 2,
          functionClassify: '一般公共服务支出-财政事务',
          ecoClassify: '公共管理、社会保障和社会组织-国家机构-国家行政机构-行政监督检查机构',
          riskLevel: 3,
          status: 2,
          approvalTime: '2020-01-10 14:20:10',
        }, {
          id: 12,
          childProjectNo: '2018-06470-01-Z02',
          childProjectName: '2018-06470-01-Z02-天津市铁路运输检察院-内部控制体系建设',
          clientName: '天津市铁路运输检察院',
          projectType: 2,
          functionClassify: '一般公共服务支出-财政事务',
          ecoClassify: '公共管理、社会保障和社会组织-国家机构-国家行政机构-行政监督检查机构',
          riskLevel: 3,
          status: 2,
          approvalTime: '2020-01-10 14:20:10',
        }, {
          id: 13,
          childProjectNo: '2018-06470-01-Z03',
          childProjectName: '2018-06470-01-Z03-天津市铁路运输检察院-内部控制体系建设',
          clientName: '天津市铁路运输检察院',
          projectType: 2,
          functionClassify: '一般公共服务支出-财政事务',
          ecoClassify: '公共管理、社会保障和社会组织-国家机构-国家行政机构-行政监督检查机构',
          riskLevel: 3,
          status: 2,
          approvalTime: '2020-01-10 14:20:10',
        }]
      }, {
        projectNo: '2018-06470-01-Z02',
        projectName: '2018-06470-01-Z02-天津市铁路运输检察院-内部控制体系建设',
        clientName: '天津市铁路运输检察院',
        projectType: 2,
        functionClassify: '一般公共服务支出-财政事务',
        ecoClassify: '公共管理、社会保障和社会组织-国家机构-国家行政机构-行政监督检查机构',
        riskLevel: 3,
        status: 2,
        approvalTime: '2020-01-10 14:20:10'
      }, {
        projectNo: '2019-06197-01',
        projectName: '2019-06197-01-天津市静海区交通局-政务咨询',
        clientName: '天津市静海区交通局',
        projectType: 2,
        functionClassify: '一般公共服务支出-财政事务',
        ecoClassify: '公共管理、社会保障和社会组织-国家机构-国家行政机构-综合事务管理机构',
        riskLevel: 3,
        status: 2,
        approvalTime: '2020-11-04 17:20:10'
      }, {
        projectNo: '2019-08197-01',
        projectName: '2019-08197-01-张家口市林业和草原局相关业务支出项目绩效评价',
        clientName: '张家口市林业和草原局',
        projectType: 2,
        functionClassify: '一般公共服务支出-自然生态保护',
        ecoClassify: '公共管理、社会保障和社会组织-国家机构-国家行政机构-综合事务管理机构',
        riskLevel: 3,
        status: 2,
        approvalTime: '2020-10-15 10:12:10'
      }
      ],
      total: 1,
      addShow: false,
      title: '',
      addForm: {
        companyType: 1
      },
      detailShow: false,
      detailForm: {
        projectNo: '2018-06470-01-Z01',
        projectName: '2018-06470-01-Z01-天津市铁路运输检察院-内部控制体系建设',
        clientName: '天津市铁路运输检察院',
        projectType: 2,
        functionClassify: '一般公共服务支出-财政事务',
        ecoClassify: '公共管理、社会保障和社会组织-国家机构-国家行政机构-行政监督检查机构',
        riskLevel: 3,
        partner: '贾立华',
        projectManager: '马辉',
        projectAid: '王存向',
        projectOutLeader: '王存向',
        projectOutCrew: '李欣谣,后同群',
        companyArr: [
            {
            id: '',
            companyName: '',
            linkman: '',
            linkphone: ''
          }
        ]
      },
      bottomSearchBoxShow: false,
      chooseExport: true,
      exportHide: false
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
    detailHandle(index, row) {
      this.detailShow = true
    },
    handleSelectionChange(selection) {
      console.log(selection)
      if (selection.length > 0){
        this.chooseExport = false
        this.exportHide = true
      } else {
        this.chooseExport = true
        this.exportHide = false
      }
    },
    testclick() {
      const timepart = {
        id: '',
        companyName: '',
        linkman: '',
        linkphone: ''
      }
      this.addForm.companyArr.push(timepart)
    },
    companypartReduce() {
      this.addForm.companyArr.splice(index, 1)
    },
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.detail-table tr:first-child{
    background-color: #F5FAFF;
  }
</style>
