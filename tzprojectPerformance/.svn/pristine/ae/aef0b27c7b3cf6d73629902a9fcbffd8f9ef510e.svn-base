<script>
/*
 * @Author: 张涛
 * @Date:   2020-12-10 15:07:31
 * @Last Modified by:   Your name
 * @Last Modified time: 2021-01-27 10:58:18
 */
</script>
<template>
  <div class="page-container">
    <div class="table-list-search">
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
        <el-table-column prop="oneLevel" label="按政府预算支出功能分类（一级分类）" align="center" />
        <el-table-column prop="twoLevel" label="按政府预算支出功能分类（二级分类）" align="center" />
        <el-table-column prop="kind" label="按国民经济行业分类（门类）" align="center" />
        <el-table-column prop="bigkind" label="按国民经济行业分类（大类）" align="center" />
        <el-table-column prop="projectName" label="项目名称" align="center" />
        <el-table-column prop="businessType" label="业务类型" align="center" />
        <el-table-column prop="clientArea" label="客户所属地区" align="center" />
        <el-table-column prop="" label="投标应答文件" align="center">
          <template>
            <el-button size="mini" type="primary" plain>点击预览</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" align="center" />
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
      width="75%"
      class="dialog"
      title="案例库信息"
      :close-on-click-modal="false"
      :visible.sync="addShow"
      @close="closeDialog"
    >
      <div class="dialog-body">
        <el-form
          :model="addForm"
          size="small"
          label-width="300px"
          :label-position="center"
        >
          <el-row>
            <el-col :sm="24" :md="12">
              <el-form-item label="按政府预算支出功能分类（一级分类）">
                <el-input disabled placeholder="从评价平台项目业绩库带出" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="按政府预算支出功能分类（二级分类）">
                <el-input disabled placeholder="从评价平台项目业绩库带出" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="按国民经济行业分类（门类）">
                <el-input disabled placeholder="从评价平台项目业绩库带出" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="按国民经济行业分类（大类）">
                <el-input disabled placeholder="从评价平台项目业绩库带出" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="项目名称">
                <el-input disabled placeholder="从评价平台项目业绩库带出" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="业务类型">
                <el-input disabled placeholder="从评价平台项目业绩库带出" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="24">
              <el-form-item label="客户所属地区">
                <el-input disabled placeholder="从评价平台项目业绩库带出" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="工作方案">
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
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="工作底稿">
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
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="评价报告">
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
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="其他重要文件">
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
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="备注">
                <el-input size="small" />
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
  name: 'projectCase',
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
        oneLevel: '一般公共服务支出',
        twoLevel: '其他一般公共服务支出',
        kind: '公共管理、社会保障和社会组织',
        bigkind: '国家机构',
        projectName: '2020-03847-中共深圳市福田区委组织部-政务咨询',
        businessType: '非鉴证业务-政务咨询-政务咨询',
        clientArea: '深圳'
      }, {
        oneLevel: '一般公共服务支出',
        twoLevel: '其他一般公共服务支出',
        kind: '公共管理、社会保障和社会组织',
        bigkind: '国家机构',
        projectName: '2020-02880-广州市黄埔区财政局-绩效评价',
        businessType: '非鉴证业务-政务咨询-政务咨询',
        clientArea: '广州'
      }, {
        oneLevel: '一般公共服务支出',
        twoLevel: '其他一般公共服务支出',
        kind: '公共管理、社会保障和社会组织',
        bigkind: '国家机构',
        projectName: '2018-06097-贵州省环境保护厅-绩效评价',
        businessType: '非鉴证业务-政务咨询-政务咨询',
        clientArea: '云南'
      }],
      total: 1,
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
