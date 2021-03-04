<!--
 * @Author: zhangtao
 * @Date: 2020-11-17 11:25:51
 * @LastEditTime: 2020-11-17 11:25:52
 * @LastEditors: Please set LastEditors
 * @Description: 拟定调研问卷
 * @FilePath: \newproject-develop1.0d:\tzprojectPerformance\src\views\schemeMake\beforehandResearch\researchQuestion.vue
-->
<template>
  <div class="page-container">
    <div class="table-list-search">
      <el-form ref="listQuery" :model="listQuery" inline size="mini">
        <el-form-item label="项目编号" prop="companyName">
          <el-input v-model="listQuery.companyName" />
        </el-form-item>
        <el-form-item label="项目名称" prop="companyName">
          <el-input v-model="listQuery.companyName" />
        </el-form-item>
        <el-form-item label="A/B/C分类" prop="companyName">
          <el-select>
            <el-option value="1" label="A">A</el-option>
            <el-option value="2" label="B">B</el-option>
            <el-option value="3" label="C">C</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户名称" prop="companyName">
          <el-input v-model="listQuery.companyName" />
        </el-form-item>
        <el-row>
          <el-form-item>
            <el-button size="mini" type="primary" icon="el-icon-search">查 询</el-button>
            <el-button size="mini" @click="listQueryReset">重 置</el-button>
          </el-form-item>
        </el-row>
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
        <!-- <el-table-column prop="childProjectNo" label="子项目编号" align="center" width="120" />
        <el-table-column prop="childProjectName" label="子项目名称" align="center" width="280" />
        <el-table-column prop="childProjectLevel" label="所属级别" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.childProjectLevel === 1">A</span>
            <span v-if="scope.row.childProjectLevel === 2">B</span>
            <span v-if="scope.row.childProjectLevel === 3">C</span>
          </template>
        </el-table-column>
        <el-table-column prop="functionClassify" label="支出功能分类" width="230" align="center" />
        <el-table-column prop="ecoClassify" label="国民经济分类" width="220" align="center" />
        <el-table-column prop="riskLevel" label="风险级别" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.riskLevel === 1">高</span>
            <span v-if="scope.row.riskLevel === 2">中</span>
            <span v-if="scope.row.riskLevel === 3">低</span>
          </template>
        </el-table-column> -->
        <!-- <el-table-column prop="workGroupName" label="工作组名称" width="110" align="center" />
        <el-table-column prop="workGroupNo" label="工作组编号" align="center" /> -->
        <el-table-column prop="projectName" label="项目名称" width="140" align="center" />
        <el-table-column prop="projectNo" label="项目编号" width="100" align="center" />
        <el-table-column prop="projectType" label="A/B/C分类" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.projectType === 1">A</span>
            <span v-if="scope.row.projectType === 2">B</span>
            <span v-if="scope.row.projectType === 3">C</span>
          </template>
        </el-table-column>
        <el-table-column prop="clientName" label="客户名称" align="center" />
        <el-table-column prop="designMan" label="拟定人" width="" align="center" />
        <el-table-column prop="approvalTime" label="拟定时间" width="140" align="center" />
        <el-table-column prop="status" label="拟定状态" width="80" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 1">未拟定</span>
            <span v-if="scope.row.status === 2">已拟定</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="130" fixed="right">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.status === 1"
              size="small"
              plain
              type="primary"
              @click="handelAdd(scope.$index, scope.row)"
            >拟定问卷</el-button>
            <el-button
              v-if="scope.row.status === 2"
              size="small"
              plain
              type="primary"
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
      title="问卷调查信息"
      :close-on-click-modal="false"
      :visible.sync="addChildShow"
      @close="closeDialog"
    >
      <div class="dialog-body">
        <el-form :model="addForm" size="small" label-width="180px" label-position="center">
          <el-row>
            <strong>项目信息</strong>
          </el-row>
          <el-divider />
          <el-row>
            <el-col :sm="24" :md="12">
              <el-form-item label="项目编号">
                <el-input v-model="addForm.projectNo" disabled />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="项目名称">
                <el-input v-model="addForm.projectName" disabled />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="A/B/C分类">
                <el-input v-model="addForm.projectType" disabled />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="客户名称">
                <el-input v-model="addForm.clientName" disabled />
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
              <el-form-item label="项目外勤主管">
                <el-input
                  v-model="addForm.projectOutLeader"
                  placeholder="由子项目名称带出"
                  disabled="disabled"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <strong>问卷信息</strong>
          </el-row>
          <el-divider />
          <el-row>
            <el-col :xs="24" class="btn" style="text-align:left; margin-bottom:10px;">
              <el-button type="primary" icon="el-icon-circle-plus-outline" @click="partAdd">添加一行</el-button>
              <el-button type="primary" icon="el-icon-download">Excel导入</el-button>
            </el-col>
            <table class="detail-table">
              <tr>
                <td>序号</td>
                <td>排序</td>
                <td>问题</td>
                <td>答案选项</td>
                <td>操作</td>
              </tr>
              <tr v-for="(item, index) in addForm.requestionArr" :key="item.id">
                <td>{{ index + 1 }}</td>
                <td>
                  <div v-if="index!==0" class="topIcon" @click="basicSortUp(index, item)" />
                  <div v-if="index!==addForm.requestionArr.length-1" class="bottomIcon" @click="basicSortDown(index, item)" />
                </td>
                <td style="text-align:left;"><el-input v-model="item.question" type="textarea" /></td>
                <td style="text-align:left;" v-html="item.answer" />
                <td><el-button type="danger" icon="el-icon-delete" circle @click="partReduce" /></td>
              </tr>
            </table>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addChildShow = false">取 消</el-button>
        <!-- <el-button type="warning" @click="holdSave">暂 存</el-button> -->
        <el-button type="primary" @click="submitSave">提 交</el-button>
      </span>
    </el-dialog>
    <el-dialog
      width="80%"
      class="dialog"
      title="题型设置"
      :close-on-click-modal="false"
      :visible.sync="addCheckShow"
      @close="closeDialog"
    >
      <div class="dialog-body">
        <el-form :model="questionTypeForm" size="small" label-width="120px" label-position="center">
          <el-row>
            <el-col :sm="24" :md="12">
              <el-form-item label="题型">
                <el-select v-model="questionTypeForm.questionType" placeholder="请选择">
                  <el-option :value="1" label="单选题">单选题</el-option>
                  <el-option :value="2" label="多选题">多选题</el-option>
                  <el-option :value="3" label="填空题">填空题</el-option>
                  <el-option :value="4" label="判断题">判断题</el-option>
                  <el-option :value="5" label="简答题">简答题</el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col v-if="questionTypeForm.questionType==1" :sm="24" :md="24">
              <el-form-item label="答案个数">
                <el-radio-group v-model="questionTypeForm.anwers">
                  <!-- <el-radio :label="1">1</el-radio> -->
                  <el-radio :label="2">2</el-radio>
                  <el-radio :label="3">3</el-radio>
                  <el-radio :label="4">4</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col v-if="questionTypeForm.questionType==2" :sm="24" :md="24">
              <el-form-item label="答案个数">
                <el-radio-group v-model="questionTypeForm.anwers">
                  <!-- <el-radio :label="1">1</el-radio> -->
                  <el-radio :label="2">2</el-radio>
                  <el-radio :label="3">3</el-radio>
                  <el-radio :label="4">4</el-radio>
                  <el-radio :label="5">5</el-radio>
                  <el-radio :label="6">6</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col v-if="questionTypeForm.questionType==1" :sm="24" :md="24">
              <el-form-item label="选项类型">
                <el-radio-group v-model="questionTypeForm.chooseType">
                  <!-- <el-radio :label="1">1</el-radio> -->
                  <el-radio :label="1">大写字母</el-radio>
                  <el-radio :label="2">小写字母</el-radio>
                  <el-radio :label="3">数字</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCheckShow = false">取 消</el-button>
        <el-button type="primary" @click="typeUpload(questionTypeForm)">确 认</el-button>
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
      list: [{
        projectNo: '2020-05764',
        projectName: '2020-05764-01-浙江省科学技术厅',
        clientName: '浙江省科学技术厅',
        projectType: 1,
        isSplit: 1,
        childProjectName: '2020-05764-01-浙江省科学技术厅-软件定制开发',
        childProjectNo: '2020-05764-01',
        childProjectLevel: 1,
        functionClassify: '一般公共服务支出-人大事务-机关服务',
        ecoClassify: '采矿业-黑色金属矿采选业-铁矿采选',
        riskLevel: 2,
        status: 2,
        approvalTime: '2020-10-09 10:20:10',
        workGroupName: '2020-05764-01-浙江省科学技术厅工作组',
        workGroupNo: '',
        projectPartnerName: '倪小平',
        projectManager: '张强',
        designMan: '许丹一峰'
      }, {
        projectNo: '2020-05764',
        projectName: '2020-05764-01-浙江省科学技术厅',
        clientName: '浙江省科学技术厅',
        projectType: 1,
        isSplit: 1,
        childProjectName: '2020-05764-01-浙江省科学技术厅-软件定制开发',
        childProjectNo: '2020-05764-01',
        childProjectLevel: 1,
        functionClassify: '一般公共服务支出-人大事务-机关服务',
        ecoClassify: '采矿业-黑色金属矿采选业-铁矿采选',
        riskLevel: 2,
        status: 1,
        approvalTime: '',
        workGroupName: '2020-05764-01-浙江省科学技术厅工作组',
        workGroupNo: '',
        projectPartnerName: '倪小平',
        projectManager: '张强',
        designMan: ''
      }],
      total: 1,
      addChildShow: false,
      detailShow: false,
      title: '',
      addForm: {
        projectNo: '2020-05764',
        projectName: '2020-05764-01-浙江省科学技术厅',
        clientName: '浙江省科学技术厅',
        projectType: 'A',
        workGroupName: '2020-05764-01-浙江省科学技术厅工作组',
        workGroupNo: '',
        partner: '倪小平',
        projectManager: '张强',
        projectAid: '贾秀林',
        projectOutLeader: '许丹一丰',
        requestionArr: [{
          id: 1,
          question: '',
          answer: ''
        }]
      },
      addCheckShow: false,
      questionTypeForm: {
        questionType: 1,
        anwers: '',
        chooseType: null
      }
    }
  },
  methods: {
    currentTime() {
      const date = new Date()
      const year = date.getFullYear()
      const mon = date.getMonth() + 1
      const da = date.getDate()
      const h = date.getHours()
      const m = date.getMinutes()
      const s = date.getSeconds()
      const timeStr = year + '年' + mon + '月' + da + '日' + ' ' + h + ':' + m + ':' + s
      this.checkForm.checkTime = timeStr
      console.log(this.checkForm.checkTime)
    },
    // 获取列表
    getList() {},
    // 搜索
    onSeaech() {},
    // 重置
    listQueryReset() {
      this.$refs['listQuery'].resetFields()
    },
    handelAdd() {
      this.addChildShow = true
    },
    closeDialog() {
      this.$refs['addForm'].resetFields()
    },
    holdSave() {
      this.addChildShow = false
    },
    submitSave() {
      this.addChildShow = false
    },
    // 添加
    partAdd() {
      // if (this.addForm.professorArr.length > 4) {
      //   this.$message({
      //     type: 'warning',
      //     message: '最多设置5个子项目!'
      //   })
      //   return false
      // }
      this.addCheckShow = true
    },
    typeUpload(val) {
      console.log(val)
      if (val.questionType === 1) {
        if (val.anwers === 4) {
          if (val.chooseType === 1) {
            const timepart = {
              id: '',
              question: '',
              answer: `<div>A<input class="addDom" type="text"/></div>
          <div>B<input class="addDom" type="text"/></div>
          <div>C<input class="addDom" type="text"/></div>
          <div>D<input class="addDom" type="text"/></div>
          `
            }
            this.addForm.requestionArr.push(timepart)
          } else if (val.chooseType === 2) {
            const timepart = {
              id: '',
              question: '',
              answer: `<div>a<input class="addDom" type="text"/></div>
          <div>b<input class="addDom" type="text"/></div>
          <div>c<input class="addDom" type="text"/></div>
          <div>d<input class="addDom" type="text"/></div>
          `
            }
            this.addForm.requestionArr.push(timepart)
          } else if (val.chooseType === 3) {
            const timepart = {
              id: '',
              question: '',
              answer: `<div>1.<input class="addDom" type="text"/></div>
          <div>2.<input class="addDom" type="text"/></div>
          <div>3.<input class="addDom" type="text"/></div>
          <div>4.<input class="addDom" type="text"/></div>
          `
            }
            this.addForm.requestionArr.push(timepart)
          }
        } else if (val.anwers === 3) {
          const timepart = {
            id: '',
            question: '',
            answer: `<div>A<input class="addDom" type="text"/></div>
          <div>B<input class="addDom" type="text"/></div>
          <div>C<input class="addDom" type="text"/></div>
          `
          }
          this.addForm.requestionArr.push(timepart)
        } else if (val.anwers === 2) {
          const timepart = {
            id: '',
            question: '',
            answer: `<div>A<input class="addDom" type="text"/></div>
          <div>B<input class="addDom" type="text"/></div>
          `
          }
          this.addForm.requestionArr.push(timepart)
        }
        this.addCheckShow = false
      }
    },
    // 删除
    partReduce(index) {
      this.addForm.requestionArr.splice(index, 1)
    },
    basicSortUp(index, item) {
      if (index === 0) {
        this.$message({
          message: '已经是列表中第一行！',
          type: 'warning'
        })
      } else {
        const temp = this.addForm.requestionArr[index - 1]
        this.$set(this.addForm.requestionArr, index - 1, this.addForm.requestionArr[index])
        this.$set(this.addForm.requestionArr, index, temp)
      }
    },
    basicSortDown(index, item) {
      if (index === (this.addForm.requestionArr.length - 1)) {
        this.$message({
          message: '已经是列表中最后一行！',
          type: 'warning'
        })
      } else {
        const temp = this.addForm.requestionArr[index + 1]
        this.$set(this.addForm.requestionArr, index + 1, this.addForm.requestionArr[index])
        this.$set(this.addForm.requestionArr, index, temp)
      }
    }
  }
}
</script>
<style rel="stylesheet/less" lang="less" scoped>
.topIcon{
      display: inline-block;
      width: 20px;
      height: 20px;
      background-image: url('/static/img/up.png');
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
      cursor: pointer;
      color: white;
      margin: 5px;
    }
    .bottomIcon{
      display: inline-block;
      width: 20px;
      height: 20px;
      background-image: url('/static/img/down.png');
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
      cursor: pointer;
      color: white;
      margin: 5px;
    }
    /deep/ .addDom{
      width: 280px;
      height: 30px;
      margin-left: 10px;
      margin-bottom: 10px;
      border: 1px solid #DCDFE6;
      border-radius: 4px;
      outline-color:#DCDFE6;
    }
</style>
