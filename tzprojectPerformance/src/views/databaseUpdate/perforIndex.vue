<script>
/*
 * @Author: Your name
 * @Date:   2020-12-09 21:37:34
 * @Last Modified by:   Your name
 * @Last Modified time: 2021-01-18 12:10:55
 */
</script>
<template>
  <div class="page-container">
    <div class="table-list-search">
      <el-form ref="listQuery" :model="listQuery" inline size="mini">
        <el-form-item label="指标编码" prop="companyName">
          <el-input v-model="listQuery.companyName" />
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" icon="el-icon-search">查询</el-button>
          <el-button size="mini" @click="listQueryReset">重置</el-button>
        </el-form-item>
        <!-- <el-form-item class="table-search-button">
          <el-button type="primary" size="small" icon="el-icon-edit" @click="handelAdd">新增</el-button>
        </el-form-item> -->
      </el-form>
    </div>
    <!--新增-->
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
        <el-table-column type="index" :index="typeIndex" label="序号" align="center" />
        <el-table-column prop="projectNo" label="指标编码" align="center" />
        <el-table-column prop="clientName" label="一级指标" align="center" />
        <el-table-column prop="childProjectName" label="二级指标" align="center" />
        <el-table-column prop="childProjectNo" label="三级指标" align="center" />
        <el-table-column prop="functionClassify" label="指标解释" align="center" />
        <el-table-column prop="" label="指标类别" align="center" />
        <el-table-column prop="functionClassify" label="预算支出功能分类" align="center" />
        <el-table-column prop="ecoClassify" label="国民经济行业分类" align="center" />
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
      width="60%"
      class="dialog"
      title="新增"
      :close-on-click-modal="false"
      :visible.sync="addShow"
      @close="closeDialog"
    >
      <div class="dialog-body">
        <el-form
          :model="addForm"
          size="small"
          label-width="120px"
          :label-position="center"
        >
          <el-row>
            <el-col :sm="24" :md="12">
              <el-form-item label="指标编码">
                <el-input />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="一级指标">
                <el-input />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="二级指标">
                <el-input />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="三级指标">
                <el-input size="small" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="指标解释">
                <el-input size="small" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="入库原因">
                <el-input size="small" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="其他来源">
                <!-- <el-button type="primary" icon="el-icon-edit" circle title="委派" /> -->
                <template>
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
                </template>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addShow = false">取 消</el-button>
        <el-button type="warning" @click="holdSave">暂 存</el-button>
        <el-button type="primary" @click="submitSave">提 交</el-button>
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
        projectNo: 'gx090101',
        clientName: '产出指标',
        childProjectName: '数量指标',
        childProjectNo: '硬件采购（维护）数量',
        functionClassify: '反映硬件采购（维护）数量。',
        riskLevel: 2,
        status: 1,
        functionClassify: '一般公共服务支出-财政事务',
        ecoClassify: '公共管理、社会保障和社会组织-国家机构-国家行政机构-经济事务管理机构',
      }, {
        projectNo: 'gx100602',
        clientName: '效益指标',
        childProjectName: '社会效益指标',
        childProjectNo: '实现关键核心技术突破数量',
        functionClassify: '反映项目攻克的前沿核心技术和关键共性技术、突破制约产业发展的核心关键技术瓶颈、掌握产业核心技术情况。',
        riskLevel: 1,
        status: 2,
        functionClassify: '一般公共服务支出-财政事务',
        ecoClassify: '公共管理、社会保障和社会组织-国家机构-国家行政机构-行政监督检查机构',
      }, {
        projectNo: 'gx110901',
        clientName: '满意度指标',
        childProjectName: '服务对象满意度指标',
        childProjectNo: '检查人员被投诉次数',
        functionClassify: '反映监督检查人员因监督检查行为不规范被投诉情况。',
        riskLevel: 3,
        status: 4,
        functionClassify: '一般公共服务支出-知识产权事务',
        ecoClassify: '文化、体育和娱乐业-文化艺术业-文艺创作与表演',
      }],
      total: 3,
      parentTotal: null,
      addShow: false,
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
    handelAdd() {
      this.title = '新增'
      this.addShow = true
      this.addForm.companyType = ''
    },
    closeDialog() {
      this.$refs['addForm'].resetFields()
    },
    timeAdd() {
      console.log(this.addForm.childProjectArr)
      if (this.addForm.childProjectArr.length > 4) {
        this.$message({
          type: 'warning',
          message: '最多设置5个子项目!'
        })
        return false
      }
      const timepart = {
        childProjectName: '',
        childProjectNo: ''
      }
      this.addForm.childProjectArr.push(timepart)
    },
    creatChildProject(index, row) {
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
