<template>
  <div class="page-container">
    <div class="table-list-search">
      <el-form ref="listQuery" :model="listQuery" inline>
        <el-form-item label="项目编号" prop="companyName">
          <el-input v-model="listQuery.companyName" size="small" />
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" icon="el-icon-search">查询</el-button>
          <el-button size="small" @click="listQueryReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--子项目列表-->
    <div class="table-list">
      <el-table
        :data="list"
        border
        element-loading-text="给我一点时间"
        fit
        highlight-current-row
        stripe
        v-loading="listLoading"
        header-row-class-name="table-header"
        size="small"
        max-height="420"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <!-- v-loading="listLoading" -->
        <el-table-column type="index" :index="typeIndex" label="序号" fixed="left" align="center" />
        <el-table-column prop="projectNo" label="项目编号" align="center" />
        <el-table-column prop="clientName" label="客户名称" align="center" />
        <el-table-column prop="projectType" label="项目类型" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.projectType === 1" style="color:#5CB89D">类型A</span>
            <span v-if="scope.row.projectType === 2" style="color:red">类型B</span>
          </template>
        </el-table-column>
        <el-table-column prop="isSplit" label="是否拆分子项目" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.isSplit === 1">是</span>
            <span v-if="scope.row.isSplit === 2">否</span>
          </template>
        </el-table-column>
        <el-table-column prop="childProjectName" label="子项目名称" align="center" />
        <el-table-column prop="childProjectNo" label="子项目编号" align="center" />
        <el-table-column prop="functionClassify" label="支出功能分类" align="center" />
        <el-table-column prop="ecoClassify" label="国民经济分类" align="center" />
        <el-table-column prop="riskLevel" label="风险级别" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.riskLevel === 1">高</span>
            <span v-if="scope.row.riskLevel === 2">中</span>
            <span v-if="scope.row.riskLevel === 3">低</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 1" style="color:blue">暂存</span>
            <span v-if="scope.row.status === 2">已送审</span>
            <span v-if="scope.row.status === 3">待审批</span>
            <span v-if="scope.row.status === 4" style="color:green">已审批</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="200" fixed="right">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.status === 1"
              size="small"
              plain
              type="primary"
              @click="approve(scope.$index, scope.row)"
            >审批</el-button>
            <el-button
              size="small"
              plain
              type="primary"
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
    <!--审批-->
    <el-dialog
      width="50%"
      class="dialog"
      title="审批"
      :close-on-click-modal="false"
      :visible.sync="addChildShow"
      @close="closeDialog"
    >
      <div class="dialog-body">
        <el-form :model="addForm" size="small" label-width="120px" :label-position="center">
          <el-row>
            <el-col :sm="24" :md="12">
              <el-form-item label="项目编号">
                <el-input />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="客户名称">
                <el-input size="small" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="项目类型">
                <el-input size="small" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="是否拆分子项目">
                <el-select v-model="addForm.companyType" placeholder="请选择">
                  <el-option label="是" value="1" />
                  <el-option label="否" value="2" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-row v-if="addForm.companyType==1">
              <div v-for="item in addForm.childProjectArr" :key="item.childProjectNo">
                <el-col :sm="24" :md="12">
                  <el-form-item label="子项目名称">
                    <el-input />
                  </el-form-item>
                </el-col>
                <el-col :sm="24" :md="12">
                  <el-form-item label="子项目编号">
                    <el-input />
                  </el-form-item>
                </el-col>
              </div>
            </el-row>
            <el-col :sm="24" :md="12">
              <el-form-item label="支出功能分类">
                <el-input />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="国民经济分类">
                <el-input />
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
              <el-form-item label="审批结果">
                <el-select v-model="addForm.riskLevel" placeholder="请选择">
                  <el-option label="请选择" value />
                  <el-option label="通过" value="1" />
                  <el-option label="不通过" value="2" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="审批意见">
                <el-input />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="审批人">
                <el-input />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="审批时间">
                <el-input />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addChildShow = false">取 消</el-button>
        <el-button type="warning" @click="holdSave">暂 存</el-button>
        <el-button type="primary" @click="submitSave">审 批</el-button>
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
      list: [{
        projectNo: 'P001',
        clientName: '宋江',
        projectType: 1,
        isSplit: 1,
        childProjectName: '子项目A',
        childProjectNo: 'P001A001',
        functionClassify: '',
        ecoClassify: '',
        riskLevel: 2,
        status: 1
      }, {
        projectNo: 'P002',
        clientName: '李逵',
        projectType: 2,
        isSplit: 2,
        childProjectName: '',
        childProjectNo: '',
        functionClassify: '',
        ecoClassify: '',
        riskLevel: 1,
        status: 2
      }, {
        projectNo: 'P003',
        clientName: '卢俊义',
        projectType: 1,
        isSplit: 1,
        childProjectName: '子项目B',
        childProjectNo: 'P003B001',
        functionClassify: '',
        ecoClassify: '',
        riskLevel: 3,
        status: 4
      }],
      total: null,
      parentTotal: null,
      addChildShow: false,
      title: '',
      addForm: {
        companyType: 1,
        childProjectArr: [
          {
            childProjectName: '',
            childProjectNo: ''
          }
        ]
      },
      parentList: [
        {
          projectNo: 'P001',
          clientName: '宋江',
          projectType: 1,
          isSplit: 1
        },
        {
          projectNo: 'P002',
          clientName: '李逵',
          projectType: 2,
          isSplit: 2
        },
        {
          projectNo: 'P003',
          clientName: '卢俊义',
          projectType: 1,
          isSplit: 1
        }
      ]
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
    closeDialog() {
      this.$refs['addForm'].resetFields()
    },
    approve(index, row) {
      this.addChildShow = true
    },
    holdSave() {
      this.addChildShow = false
      this.addShow = false
    },
    submitSave() {
      this.addChildShow = false
      this.addShow = false
    }
  }
}
</script>
<style rel="stylesheet/less" lang="less" scoped>

</style>
