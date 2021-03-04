<template>
  <div class="page-container">
    <div class="table-list-search">
      <el-form ref="listQuery" :model="listQuery" inline>
        <el-form-item label="项目名称" prop="companyName">
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
        <el-table-column prop="pigeonhole" label="归档模板" align="center" />
        <el-table-column prop=" projectUndertake" label="项目承接类" align="center">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.status === 1"
              size="small"
              type="primary"
              @click="importShow=true"
            >上传</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="evaluatePrepare" label="评价准备类" align="center">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.status === 1"
              size="small"
              type="primary"
              @click="importShow=true"
            >上传</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="evaluateIndex" label="评价过程类—指标体系初步设计资料" align="center">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.status === 1"
              size="small"
              type="primary"
              @click="importShow=true"
            >上传</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="evaluateInvestigate" label="评价过程类—预调研资料" align="center">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.status === 1"
              size="small"
              type="primary"
              @click="importShow=true"
            >上传</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="evaluatePut" label="评价过程类—评价实施资料" align="center">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.status === 1"
              size="small"
              type="primary"
              @click="importShow=true"
            >上传</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="evaluateResult" label="评价结果类" align="center">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.status === 1"
              size="small"
              type="primary"
              @click="importShow=true"
            >上传</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="evaluateRest" label="其他类" align="center">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.status === 1"
              size="small"
              type="primary"
              @click="importShow=true"
            >上传</el-button>
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
              <el-form-item label="项目名称">
                <el-input />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="项目组成员">
                <el-input size="small" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="24">
              <el-form-item label="项目实施过程中的经验做法">
                <el-input />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="24">
              <el-form-item label="存在的不足">
                <el-input />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="24">
              <el-form-item label="建议">
                <el-input />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="24">
              <el-form-item label="其他">
                <el-input />
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
      isActive: true,
      parentListQuery: {
        current: 1,
        size: 10
      },
      list: [{
        projectName: '2018公司成本规制考核后亏损补贴',
        projectMember: '张三',
        projectExperience: '科学设计',
        insufficient: '资料整理混乱',
        suggest: '',
        rest: '',
        riskLevel: 2,
        status: 1
      }, {
        projectName: '2019公司成本规制考核后亏损补贴',
        projectMember: '李四',
        projectExperience: '严格执行招投标制度 ',
        insufficient: '资料整理混乱',
        suggest: '',
        rest: '',
        riskLevel: 1,
        status: 2
      }, {
        projectName: '2020公司成本规制考核后亏损补贴',
        projectMember: '王二',
        projectExperience: '实行公示制度',
        insufficient: '资料整理混乱',
        suggest: '',
        rest: '',
        riskLevel: 3,
        status: 4
      }],
      total: null,
      parentTotal: null,
      addChildShow: false,
      title: '',
      addForm: {
        companyType: 1
      }
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
.active{
    line-height: 16px;
}
</style>
