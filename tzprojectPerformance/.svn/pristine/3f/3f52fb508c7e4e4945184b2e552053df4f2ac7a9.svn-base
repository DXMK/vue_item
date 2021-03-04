<script>
/*
 * @Author: Your name
 * @Date:   2020-12-03 11:58:21
 * @Last Modified by:   Your name
 * @Last Modified time: 2021-02-01 09:31:03
 */
</script>
<template>
  <div class="page-container">
    <div class="table-list-search">
      <el-form ref="listQuery" :model="listQuery" inline size="mini">
        <el-row>
          <el-form-item label="项目名称" prop="companyName">
            <el-input v-model="listQuery.companyName" />
          </el-form-item>
          <!-- <el-form-item label="项目编号" prop="companyName">
            <el-input v-model="listQuery.companyName" />
          </el-form-item> -->
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
          <el-form-item class="table-search-button">
            <el-button type="primary" size="mini" icon="el-icon-upload2">全部导出</el-button>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item>
            <el-button size="mini" type="primary" icon="el-icon-search">查 询</el-button>
            <el-button size="mini" @click="listQueryReset">重 置</el-button>
          </el-form-item>
          <el-form-item v-show="exportHide" class="table-search-button">
            <el-button type="primary" size="mini" icon="el-icon-upload2">按条件导出</el-button>
          </el-form-item>
          <el-form-item v-show="chooseExport" class="table-search-button">
            <el-button type="primary" size="mini" icon="el-icon-upload2" disabled>按条件导出</el-button>
          </el-form-item>
        </el-row>
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
        <el-table-column type="selection" width="55" fixed="left" />
        <el-table-column type="index" :index="typeIndex" label="序号" fixed="left" align="center" />
        <!-- <el-table-column prop="workGroupName" label="工作组名称" width="110" align="center" />
        <el-table-column prop="workGroupNo" label="工作组编号" align="center" /> -->
        <el-table-column prop="projectName" label="项目名称" width="210" align="center" />
        <!-- <el-table-column prop="projectNo" label="项目编号" align="center" /> -->
        <!-- <el-table-column prop="clientName" label="客户名称" align="center" /> -->
        <el-table-column prop="riskLevel" label="风险级别" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.riskLevel === 1">A</span>
            <span v-if="scope.row.riskLevel === 2">B</span>
            <span v-if="scope.row.riskLevel === 3">C</span>
          </template>
        </el-table-column>
        <el-table-column prop="dataDetailList" label="项目资料名称" width="" align="center" />
        <el-table-column prop="buildMan" label="上传人" width="" align="center" />
        <el-table-column prop="approvalTime" label="上传时间" width="140" align="center" />
        <el-table-column prop="status" label="审批状态" width="80" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 1">待审批</span>
            <span v-if="scope.row.status === 2">已审批</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="childProjectNo" label="子项目编号" align="center" />
        <el-table-column prop="childProjectName" label="子项目名称" width="110" align="center" /> -->
        <!-- <el-table-column prop="functionClassify" label="资料清单" align="center">
          <template slot-scope="scope">
            <span style="cursor: pointer;color:blue;">{{ scope.row.functionClassify }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="ecoClassify" label="项目资料名称" align="center" /> -->
        <el-table-column align="center" label="操作" fixed="right">
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
      :visible.sync="showStr"
      @close="closeDialog"
    >
      <div class="dialog-body">
        <div>
          <el-form :model="addForm" size="small" label-width="140px">
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
                  <el-col :sm="24" :md="12">
                    <el-form-item label="预算支出功能分类">
                      <el-input v-model="addForm.functionClassify" disabled />
                    </el-form-item>
                  </el-col>
                  <el-col :sm="24" :md="12">
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
                    <el-form-item label="项目秘书">
                      <el-input
                        v-model="addForm.projectAid"
                        placeholder="由子项目名称带出"
                        disabled="disabled"
                      />
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
                      <td><el-input /></td>
                      <td><el-input /></td>
                    </tr>
                  </table>
                </el-row>
              </el-collapse-item>
              <el-collapse-item title="资料清单信息" name="2">
                <el-row style="margin-bottom:20px;">
                  <table class="detail-table">
                    <tr>
                      <td>序号</td>
                      <td>资料一级分类</td>
                      <td>资料二级分类</td>
                      <td>资料名称</td>
                      <td>指定资料收集人</td>
                      <td>持续时间</td>
                      <td>任务工期</td>
                    </tr>
                    <tr v-for="(item, index) in addForm.linkArr" :key="item.listId">
                      <td>{{ index + 1 }}</td>
                      <td>{{ item.listType }}</td>
                      <td />
                      <td width="30%">{{ item.listName }}</td>
                      <td>{{ item.buildMan }}</td>
                      <td />
                      <td />
                    </tr>
                  </table>
                </el-row>
              </el-collapse-item>
              <el-collapse-item name="3" title="项目资料信息">
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
                    <el-table-column prop="projectName" label="项目资料名称" align="center" />
                    <el-table-column align="center" label="操作" width="" fixed="right">
                      <template>
                        <el-button size="small" plain type="primary">点击预览</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </el-collapse-item>
              <el-collapse-item name="4" title="审批记录信息">
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
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showStr = false">关 闭</el-button>
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
          projectNo: '2020-07714-01-Z01',
          projectName: '2020-07714-01-Z01天津市滨海新区财政局-一般公共预算项目绩效评价',
          clientName: '天津市滨海新区财政局',
          riskLevel: 3,
          partner: '贾立华',
          projectManager: '马辉',
          projectAid: '李宁',
          projectOutLeader: '李宁',
          approvalTime: '2020-12-02 11:12:35',
          buildMan: '李宁',
          dataDetailList: 'XX项目绩效评价需提供的资料清单',
          status: 1
        },
        {
          projectNo: '2018-06470-01',
          projectName: '2018-06470-01-天津市铁路运输检察院-内部控制体系建设',
          clientName: '天津市铁路运输检察院',
          riskLevel: 3,
          partner: '贾立华',
          projectManager: '马辉',
          projectAid: '李宛昱',
          projectOutLeader: '李宛昱',
          approvalTime: '2020-12-02 11:12:35',
          buildMan: '李宛昱',
          dataDetailList: 'XX项目绩效评价需提供的资料清单',
          status: 2
        }
      ],
      total: 1,
      addShow: false,
      activeName: '2',
      title: '',
      parentList: [{
        projectNo: '2020-05764',
        projectName: '财务管理制度.doc',
        clientName: '浙江省科学技术厅',
        projectManager: '张强',
        projectType: 1
      }, {
        projectNo: '2020-05764-01',
        projectName: '相关预算收入和支出财务明细账、凭证及资金执行情况统计表.doc',
        clientName: '浙江省科学技术厅',
        projectManager: '张强',
        projectType: 1
      }, {
        projectNo: '2020-05764',
        projectName: '项目支出财务明细账、凭证及资金执行情况统计表.doc',
        clientName: '浙江省科学技术厅',
        projectManager: '张强',
        projectType: 1
      }],
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
              linkmanId: '',
              linkmanName: '',
              linkmanPhone: ''
            }
          ],
          linkArr: [
          {
            listId: 1,
            listType: '政策制度性文件',
            listName: '国家相关法律、法规和规章制度',
            buildMan: '李宛昱',
            buildTime: ''
          }, {
            listId: 2,
            listType: '政策制度性文件',
            listName: '相关行业发展规划和方针政策',
            buildMan: '李宁',
            buildTime: ''
          }, {
            listId: 3,
            listType: '业务资料',
            listName: '项目申报书',
            buildMan: '李宁',
            buildTime: ''
          }, {
            listId: 4,
            listType: '财务资料',
            listName: '财务管理制度',
            buildMan: '李宁',
            buildTime: ''
          }
        ]
      },
      checkForm: {
        riskLevel: null,
        checkResult: '',
        checkTime: ''
      },
      fileUploadList: [{
        fileName: '相关行业标准及专业技术规范.doc',
        fileSize: '12.2MB',
        uploadMan: '周梦岩',
        uploadTime: '2020-12-08 19:12:22'
      }, {
        fileName: '相关行业标准及专业技术规范.doc',
        fileSize: '20.3MB',
        uploadMan: '朱晓琳',
        uploadTime: '2020-12-08 19:12:22'
      }, {
        fileName: '相关管理制度.pdf',
        fileSize: '2.8MB',
        uploadMan: '李宁',
        uploadTime: '2020-12-08 19:12:22'
      }],
      fileUploadArr: [
        {
          fileType: '财务资料',
          fileName: '财务管理制度',
          fileSize: '10.2MB',
          buildMan: '李宁',
          buildTime: '2020-12-15 19:12:22',
          uploadFileName: '中共中央 国务院关于全面实施预算绩效管理的意见.doc',
          uploadMan: '朱晓琳',
          uploadTime: '2020-12-23 9:32:22',
          status: '已上传',
          checkStatus: '已审批',
          checkMan: '马辉',
          checkTime: '2020-12-23 10:27:52',
          checkResult: '通过'
        }
      ],
      showStr: false,
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
    handelAdd() {
      this.title = '立项申请'
      this.addShow = true
      this.addForm.companyType = '' // 经营体名称
    },
    closeDialog() {
      this.$refs['addForm'].resetFields()
    },
    detailHandle(index, row) {
      this.showStr = true
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
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.detail-table tr:first-child{
  background-color: #F5FAFF;
}
</style>
