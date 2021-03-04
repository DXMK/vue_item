<script>
/*
 * @Author: Your name
 * @Date:   2020-12-01 15:47:52
 * @Last Modified by:   Your name
 * @Last Modified time: 2020-12-10 17:18:30
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
            <el-option :value="1" label="A" />
            <el-option :value="2" label="B" />
            <el-option :value="3" label="C" />
          </el-select>
        </el-form-item>
        <el-form-item label="客户名称" prop="companyName">
          <el-input v-model="listQuery.companyName" />
        </el-form-item>
        <el-form-item class="table-search-button">
          <el-button type="primary" size="mini" icon="el-icon-upload2">全部导出</el-button>
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
        <el-table-column type="selection" width="55" fixed="left" />
        <el-table-column type="index" :index="typeIndex" label="序号" fixed="left" align="center" />
        <el-table-column prop="projectName" label="项目名称" align="center" />
        <el-table-column prop="projectNo" label="项目编号" width="100" align="center" />
        <el-table-column prop="clientName" label="客户名称" align="center" />
        <el-table-column prop="projectType" label="A/B/C分类" width="80" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.projectType === 1">A</span>
            <span v-if="scope.row.projectType === 2">B</span>
            <span v-if="scope.row.projectType === 3">C</span>
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
        <el-table-column prop="functionClassify" label="支出功能分类" align="center" />
        <el-table-column prop="ecoClassify" label="国民经济分类" align="center" />
        <el-table-column prop="riskLevel" label="风险级别" width="80" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.riskLevel === 1">高</span>
            <span v-if="scope.row.riskLevel === 2">中</span>
            <span v-if="scope.row.riskLevel === 3">低</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="80" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 1">暂存</span>
            <span v-if="scope.row.status === 2">待审批</span>
            <span v-if="scope.row.status === 3">已审批</span>
          </template>
        </el-table-column>
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
                <el-form-item label="子项目类型">
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
          projectNo: '2020-05764',
          projectName: '2020-05764-01-浙江省科学技术厅',
          clientName: '浙江省科学技术厅',
          projectType: 1,
          riskLevel: 1,
          isSplit: 1,
          childProjectName: '2020-05764-01-浙江省科学技术厅-软件定制开发',
          childProjectNo: '2020-05764-01',
          childProjectLevel: 1,
          functionClassify: '一般公共服务支出-人大事务-机关服务',
          ecoClassify: '采矿业-黑色金属矿采选业-铁矿采选',
          status: 3
        }, {
          projectNo: '2020-05764',
          projectName: '2020-05764-01-浙江省科学技术厅',
          clientName: '浙江省科学技术厅',
          projectType: 1,
          riskLevel: 1,
          isSplit: 1,
          childProjectName: '2020-05764-01-浙江省科学技术厅-软件定制开发',
          childProjectNo: '2020-05764-01',
          childProjectLevel: 1,
          functionClassify: '一般公共服务支出-人大事务-机关服务',
          ecoClassify: '采矿业-黑色金属矿采选业-铁矿采选',
          status: 3
        }, {
          projectNo: '2020-05764',
          projectName: '2020-05764-01-浙江省科学技术厅',
          clientName: '浙江省科学技术厅',
          projectType: 1,
          riskLevel: 1,
          isSplit: 2,
          childProjectName: '',
          childProjectNo: '',
          childProjectLevel: null,
          functionClassify: '一般公共服务支出-人大事务-机关服务',
          ecoClassify: '采矿业-黑色金属矿采选业-铁矿采选',
          status: 3
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
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>
