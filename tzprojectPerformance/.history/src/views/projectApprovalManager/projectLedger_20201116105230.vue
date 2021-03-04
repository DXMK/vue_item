<template>
    <div class="page-container">
    <div class="table-list-search">
      <el-form :model="listQuery" ref="listQuery" inline>
        <el-form-item label="项目编号" prop="companyName">
          <el-input size="small" v-model="listQuery.companyName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" icon="el-icon-search">查询</el-button>
          <el-button size="small" @click="listQueryReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="header-operation">
      <el-button
        type="primary"
        size="small"
      >导出</el-button>
    </div>
    <div class="table-list">
      <el-table
        :data="list"
        border
        element-loading-text="给我一点时间"
        fit
        highlight-current-row
        @selection-change="handleSelectionChange"
        stripe
        header-row-class-name="table-header"
        size="small"
        max-height="420"
        style="width: 100%"
        v-loading="listLoading">
        <!-- v-loading="listLoading" -->
        <el-table-column type="index" :index="typeIndex" label="序号" fixed="left" align="center"></el-table-column>
        <el-table-column prop="projectNo" label="项目编号" align="center"></el-table-column>
        <el-table-column prop="clientName" label="客户名称" align="center"></el-table-column>
        <el-table-column prop="projectType" label="项目类型" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.projectType === 1" style="color:#5CB89D">正常</span>
            <span v-if="scope.row.projectType === 2" style="color:red">停用</span>
          </template>
        </el-table-column>
        <el-table-column prop="isSplit" label="是否拆分子项目" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.isSplit === 1">是</span>
            <span v-if="scope.row.isSplit === 2">否</span>
          </template>
        </el-table-column>
        <el-table-column prop="childProjectName" label="子项目名称" align="center"></el-table-column>
        <el-table-column prop="childProjectNo" label="子项目编号" align="center"></el-table-column>
        <el-table-column prop="functionClassify" label="支出功能分类" align="center"></el-table-column>
        <el-table-column prop="ecoClassify" label="国民经济分类"  align="center"></el-table-column>
        <el-table-column prop="riskLevel" label="风险级别"  align="center">
            <template slot-scope="scope">
            <span v-if="scope.row.riskLevel === 1">高</span>
            <span v-if="scope.row.riskLevel === 2">中</span>
            <span v-if="scope.row.riskLevel === 3">低</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="200" fixed="right">
          <template>
            <!-- <el-button
              size="small"
              plain
              type="primary">修改</el-button> -->
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
        @size-change="handleSizeChange"
        background
        @current-change="handleCurrentChange"
        :current-page="listQuery.current"
        :page-sizes="[10,20,30, 50]"
        :page-size="listQuery.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import { tableListMixin, globalMixin } from '@/utils/mixin'
export default {
  name: 'projectLedger ',
  mixins: [tableListMixin, globalMixin],
  data() {
    return {
      listQuery: {
        current: 1,
        size: 10
      },
      list: [
        {
          projectNo: 'P001',
          clientName: '宋江',
          projectType: 1,
          isSplit: 1,
          childProjectName: '子项目A',
          childProjectNo: 'P001A001',
          functionClassify: '',
          ecoClassify: '',
          riskLevel: 2
        },
        {
          projectNo: 'P002',
          clientName: '李逵',
          projectType: 2,
          isSplit: 2,
          childProjectName: '',
          childProjectNo: '',
          functionClassify: '',
          ecoClassify: '',
          riskLevel: 1
        },{
          projectNo: 'P003',
          clientName: '卢俊义',
          projectType: 1,
          isSplit: 1,
          childProjectName: '子项目B',
          childProjectNo: 'P003B001',
          functionClassify: '',
          ecoClassify: '',
          riskLevel: 3
        }
      ],
      total: null,
      addShow: false,
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
    handelAdd() {
      this.title = '立项申请'
      this.addShow = true
      this.addForm.companyType = '' // 经营体名称
    },
    closeDialog() {
      this.$refs['addForm'].resetFields()
    },
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>
