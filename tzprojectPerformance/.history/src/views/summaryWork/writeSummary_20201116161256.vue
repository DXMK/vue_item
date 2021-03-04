<template>
  <div class="page-container">
    <div class="table-list-search">
      <el-form ref="listQuery" :model="listQuery" inline>
        <el-form-item label="项目名称" prop="companyName">
          <el-input v-model="listQuery.expertName" size="small" />
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" icon="el-icon-search">查询</el-button>
          <el-button size="small" @click="listQueryReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
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
        <el-table-column prop="projectNo" label="项目名称" align="center" />
        <el-table-column prop="clientName" label="项目组成员" align="center" />
        <el-table-column prop="expertName" label="项目实施过程中的经验做法" align="center" />
        <el-table-column prop="expertType" label="存在的不足" align="center" />
        <el-table-column prop="studyDirection" label="建议" align="center" />
        <el-table-column prop="phone" label="联系方式" align="center" />
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
        size: 10,
        expertName: ''
      },
      list: [
        {
          projectNo: 'P001',
          clientName: '宋江',
          expertName: '武大',
          expertType: '审计学博士',
          studyDirection: '审计规范',
          phone: '13768889990'
        },
        {
          projectNo: 'P002',
          clientName: '李逵',
          expertName: '武二',
          expertType: '财政硕士',
          studyDirection: '会计电算化',
          phone: '18900002362'
        }, {
          projectNo: 'P003',
          clientName: '卢俊义',
          expertName: '武三',
          expertType: '注册会计师',
          studyDirection: '会计规范',
          phone: '18866773344'
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
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>
