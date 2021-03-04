<template>
  <div class="page-container">
    <div class="table-list-search">
      <el-form ref="listQuery" :model="listQuery" inline>
        <!-- <el-form-item label="项目编号" prop="companyName">
          <el-input v-model="listQuery.companyName" size="small" />
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" icon="el-icon-search">查询</el-button>
          <el-button size="small" @click="listQueryReset">重置</el-button>
        </el-form-item> -->
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
        <el-table-column type="index" :index="typeIndex" label="序号" fixed="left" align="center" />
        <el-table-column prop="pigeonhole" label="归档模板" align="center" />
        <el-table-column prop="UploadRecord" label="项目承接类" align="center" />
         <template>
          <el-button type="primary" size="small" @click="importShow=true">上传</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="UploadRecord" label="评价准备类" align="center" />
        <el-table-column prop="UploadRecord" label="评价过程类—指标体系初步设计资料" align="center" />
        <el-table-column prop="UploadRecord" label="评价过程类—预调研资料" align="center" />
        <el-table-column prop="UploadRecord" label="评价过程类—评价实施资料" align="center" />
        <el-table-column prop="UploadRecord" label="评价结果类" align="center" />
        <el-table-column prop="UploadRecord" label="其他类" align="center" />
        <!-- <el-table-column align="center" label="操作" width="200" fixed="right">
          <template>
            <el-button type="primary" size="small" @click="importShow=true">上传</el-button>
          </template>
        </el-table-column> -->
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
        size: 10
      },
      list: [
        {
          pigeonhole: '归档模板一',
          UploadRecord: ''
        },
        {
          pigeonhole: '归档模板二',
          UploadRecord: ''
        }, {
          pigeonhole: '归档模板三',
          UploadRecord: ''
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
    },
    handelAdd() {
    },
    closeDialog() {
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>
