<script>
/*
 * @Author: Your name
 * @Date:   2020-12-10 14:54:01
 * @Last Modified by:   Your name
 * @Last Modified time: 2020-12-15 18:40:36
 */
</script>
<template>
  <div class="page-container">
    <div class="table-list-search">
      <el-form ref="listQuery" :model="listQuery" inline size="mini">
        <el-form-item label="合同编号" prop="companyName">
          <el-input v-model="listQuery.companyName" />
        </el-form-item>
        <el-form-item label="分所" prop="companyName">
          <el-input v-model="listQuery.companyName" />
        </el-form-item>
        <el-form-item label="所属部门" prop="companyName">
          <el-input v-model="listQuery.companyName" />
        </el-form-item>
        <el-form-item label="项目经理" prop="companyName">
          <el-input v-model="listQuery.companyName" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search">查询</el-button>
          <el-button @click="listQueryReset">重置</el-button>
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
        <el-table-column type="index" :index="typeIndex" label="序号" align="center" fixed="left" />
        <el-table-column prop="oneLevel" label="按政府预算支出功能分类（一级分类）" align="center" />
        <el-table-column prop="twoLevel" label="按政府预算支出功能分类（二级分类）" align="center" />
        <el-table-column prop="kind" label="按国民经济行业分类（门类）" align="center" />
        <el-table-column prop="bigKind" label="按国民经济行业分类（大类）" align="center" />
        <el-table-column prop="contractNo" label="合同编号" align="center" />
        <el-table-column prop="contractYear" label="签约年度" align="center" />
        <el-table-column prop="contractDate" label="合同签约日期" align="center" />
        <el-table-column prop="branch" label="分所" align="center" />
        <el-table-column prop="department" label="所属部门" align="center" />
        <el-table-column prop="projectPartner" label="项目负责合伙人" align="center" />
        <el-table-column prop="projectManager" label="项目经理" align="center" />
        <el-table-column prop="projectMan" label="项目成员" align="center" />
        <el-table-column prop="projectProfessor" label="项目专家" align="center" />
        <el-table-column prop="projectName" label="项目名称" align="center" />
        <el-table-column prop="businessType" label="业务类型" align="center" />
        <el-table-column prop="clientArea" label="客户所属地区" align="center" />
        <el-table-column prop="businessLevel" label="业务级别" align="center" />
        <el-table-column prop="contractType" label="合同类别" align="center" />
        <el-table-column prop="contractDec" label="合同描述" align="center">
          <template slot-scope="scope">
            <el-popover
              placement="top"
              width="200"
              trigger="hover"
              :content="scope.row.contractDec"
            >
              <span slot="reference" style="color:blue;cursor:pointer;">{{ shortName(scope.row.contractDec) }}</span>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="firstParty" label="委托方（甲方）名称" align="center" />
        <el-table-column prop="firstPartyMan" label="联系人（委托方）" align="center" />
        <el-table-column prop="appraiseObj" label="被评价对象" align="center" />
        <el-table-column prop="superiorClientName" label="委托方上一级客户名称" align="center" />
        <el-table-column prop="remark" label="备注" align="center" />
      </el-table>
    </div>
    <el-dialog
      width="75%"
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
          label-width="300px"
          :label-position="center"
        >
          <el-row>
            <el-col :sm="24" :md="12">
              <el-form-item label="按政府预算支出功能分类（一级分类）">
                <el-input disabled placeholder="绩效评价平台导入" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="24">
              <el-form-item label="按政府预算支出功能分类（二级分类）">
                <el-input disabled placeholder="绩效评价平台导入" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="24">
              <el-form-item label="按国民经济行业分类（门类）">
                <el-input disabled placeholder="绩效评价平台导入" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="24">
              <el-form-item label="按国民经济行业分类（大类）">
                <el-input size="small" disabled placeholder="绩效评价平台导入" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="24">
              <el-form-item label="合同编号">
                <el-input size="small" disabled placeholder="项目管理系统合同版块导入" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="签约年度">
                <el-input size="small" disabled placeholder="项目管理系统合同版块导入" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="合同签约日期">
                <el-input size="small" disabled placeholder="项目管理系统合同版块导入" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="分所">
                <el-input size="small" disabled placeholder="项目管理系统合同版块导入" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="所属部门">
                <el-input size="small" disabled placeholder="项目管理系统合同版块导入" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="项目负责合伙人">
                <el-input size="small" disabled placeholder="项目管理系统合同版块导入" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="项目经理">
                <el-input size="small" disabled placeholder="项目管理系统合同版块导入" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="项目成员">
                <el-input size="small" disabled placeholder="项目管理系统合同版块导入" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="项目专家">
                <el-input size="small" disabled placeholder="评价平台自动更新" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="项目名称">
                <el-input size="small" disabled placeholder="项目管理系统导入" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="业务类型">
                <el-input size="small" disabled placeholder="项目管理系统导入" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="客户所属地区">
                <el-input size="small" disabled placeholder="根据委托方地区自动生成" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="业务级别">
                <el-input size="small" disabled placeholder="项目管理系统导入" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="合同类别">
                <el-input size="small" disabled placeholder="项目管理系统合同版块导入" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="合同描述">
                <el-input size="small" disabled placeholder="项目管理系统合同版块导入" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="委托方（甲方）名称">
                <el-input size="small" disabled placeholder="项目管理系统合同版块导入" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="联系人（委托方）">
                <el-input size="small" disabled placeholder="项目管理系统合同版块导入" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="被评价对象">
                <el-input size="small" disabled placeholder="项目管理系统合同版块导入" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="委托方上一级客户名称">
                <el-input size="small" disabled placeholder="项目管理系统合同版块导入" />
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
import { shortName } from '@/utils'
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
        oneLevel: '一般公共服务支出',
        twoLevel: '其他一般公共服务支出',
        kind: '公共管理、社会保障和社会组织',
        bigKind: '国家机构',
        contractNo: '天职约[2020]第15081号',
        contractYear: '2020',
        contractDate: '2020-12-10',
        branch: '浙江分所',
        department: '浙江政务咨询部',
        projectPartner: '倪小平',
        projectManager: '刘扬',
        projectMan: '李宛昱',
        projectProfessor: '程映雪',
        projectName: '2020-09754-浙江省科学技术厅-行政事业单位内控体系评价',
        businessType: '非鉴证业务-政务内部控制-行政事业单位内控体系评价',
        clientArea: '浙江',
        businessLevel: 'C',
        contractType: '非鉴证业务-政务内部控制-行政事业单位内控体系评价',
        contractDec: '乙方接受甲方委托，对厅机关本级2019年1月1日至12月31日内部控制-业务层面：预算管理、收支管理和采购管理内 部控制情况进行专项审计。',
        firstParty: '浙江省科学技术厅 ',
        firstPartyMan: '郭伟',
        appraiseObj: '浙江省科学技术厅 ',
        superiorClientName: '浙江省科学技术厅 ',
        remark: ''
      }, {
        oneLevel: '一般公共服务支出',
        twoLevel: '其他一般公共服务支出',
        kind: '公共管理、社会保障和社会组织',
        bigKind: '国家机构',
        contractNo: '天职约[2020]第08441号',
        contractYear: '2020',
        contractDate: '2020-06-26',
        branch: '总所',
        department: '总所管理咨询二部',
        projectPartner: '汤风琴',
        projectManager: '李晓娇',
        projectMan: '朱小程',
        projectProfessor: '蓝颖',
        projectName: '2020-04863-福建省卫生健康委员会-一般公共预算项目绩效评价',
        businessType: '非鉴证业务-政务预算绩效-一般公共预算项目绩效评价',
        clientArea: '福建',
        businessLevel: 'b',
        contractType: '36-绩效评价',
        contractDec: '2019年度福建省中医药绩效评价',
        firstParty: '福建省卫生健康委员会 ',
        firstPartyMan: '牛玲',
        appraiseObj: '福建省卫生健康委员会 ',
        superiorClientName: '福建省卫生健康委员会 ',
        remark: ''
      }, {
        oneLevel: '一般公共服务支出',
        twoLevel: '其他一般公共服务支出',
        kind: '公共管理、社会保障和社会组织',
        bigKind: '国家机构',
        contractNo: '天职约[2020]第13408号',
        contractYear: '2020',
        contractDate: '2020-11-10',
        branch: '深圳分所',
        department: '深圳管理咨询一部',
        projectPartner: '钟斌',
        projectManager: '易磊',
        projectMan: '李东程',
        projectProfessor: '韩同兵',
        projectName: '2020-09049-福田区莲花街道办事处-一般公共预算项目绩效评价',
        businessType: '非鉴证业务-政务预算绩效-一般公共预算项目绩效评价',
        clientArea: '深圳',
        businessLevel: 'C',
        contractType: '36-绩效评价',
        contractDec: '民生微实事绩效评价',
        firstParty: '深圳市福田区莲花街道办事处',
        firstPartyMan: '张芳芳',
        appraiseObj: '深圳市福田区莲花街道办事处 ',
        superiorClientName: '深圳市福田区莲花街道办事处 ',
        remark: ''
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
    shortName,
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
