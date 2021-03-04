<script>
/*
 * @Author: zhangtao
 * @Date:   2020-12-01 17:04:33
 * @Last Modified by:   Your name
 * @Last Modified time: 2020-12-10 17:21:16
 */
</script>
<template>
  <div class="page-container">
    <div class="table-list-search">
      <el-form ref="listQuery" :model="listQuery" inline size="mini">
        <!-- <el-form-item label="项目编号" prop="companyName">
          <el-input v-model="listQuery.companyName" />
        </el-form-item> -->
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
        <el-form-item class="table-search-button">
          <el-button type="primary" size="mini" @click="handelAdd">组建工作组</el-button>
        </el-form-item>
        <el-collapse-transition>
          <div v-show="bottomSearchBoxShow" style="display:inline-block;">
            <el-form-item label="工作组编号">
              <el-input v-model="listQuery.clientName" />
            </el-form-item>
            <el-form-item label="工作组名称">
              <el-input v-model="listQuery.clientCode" />
            </el-form-item>
            <el-form-item label="组建人" prop="companyName">
              <el-input v-model="listQuery.clientCode" />
            </el-form-item>
          </div>
        </el-collapse-transition>
        <el-form-item>
          <el-button class="moreSearch" type="text" @click="searchBoxShow" v-text="bottomSearchBoxShow?'收起':'更多筛选'" />
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" icon="el-icon-search">查 询</el-button>
          <el-button size="mini" @click="listQueryReset">重 置</el-button>
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
        <el-table-column
          type="index"
          :index="typeIndex"
          label="序号"
          fixed="left"
          align="center"
        />
        <el-table-column prop="workGroupName" label="工作组名称" align="center" />
        <el-table-column prop="workGroupNo" label="工作组编号" align="center" />
        <el-table-column prop="projectPartnerName" label="项目负责合伙人" width="120" align="center" />
        <el-table-column prop="projectManager" label="项目经理" align="center" />
        <el-table-column prop="projectSecretary" label="项目秘书" align="center" />
        <!-- <el-table-column prop="projectNo" label="项目编号" align="center" /> -->
        <el-table-column prop="projectName" label="项目名称" align="center" />
        <el-table-column prop="clientName" label="客户名称" align="center" />
        <el-table-column prop="projectType" label="A/B/C分类" width="80" align="center">
          <template slot-scope="scope">
            <span
              v-if="scope.row.projectType === 1"
            >A</span>
            <span
              v-if="scope.row.projectType === 2"
            >B</span>
            <span
              v-if="scope.row.projectType === 3"
            >C</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="childProjectNo" label="子项目编号" align="center" />
        <el-table-column prop="childProjectName" label="子项目名称" align="center" />
        <el-table-column prop="functionClassify" label="支出功能分类" align="center" />
        <el-table-column prop="ecoClassify" label="国民经济分类" align="center" />
        <el-table-column prop="riskLevel" label="风险级别" width="80" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.riskLevel === 1">高</span>
            <span v-if="scope.row.riskLevel === 2">中</span>
            <span v-if="scope.row.riskLevel === 3">低</span>
          </template>
        </el-table-column> -->
        <el-table-column prop="buildMan" label="组建人" align="center" />
        <el-table-column prop="buildTime" label="组建时间" width="140" align="center" />
        <el-table-column align="center" label="操作" fixed="right" width="180">
          <template slot-scope="scope">
            <el-button
              size="small"
              plain
              type="primary"
              @click="creatProjectGroup(scope.$index, scope.row)"
            >修改</el-button>
            <el-button
              size="mini"
              plain
              type="primary"
              @click="handleDetail(scope.$index, scope.row)"
            >详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- <div class="pagination-container">
      <el-pagination
        background
        :current-page="listQuery.current"
        :page-sizes="[10, 20, 30, 50]"
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
      title="工作组组建信息"
      :close-on-click-modal="false"
      :visible.sync="buildShow"
      @close="closeDialog"
    >
      <div class="dialog-body">
        <el-tabs type="border-card">
          <el-tab-pane label="组建工作组">
            <div class="table-list">
              <el-table
                v-loading="listLoading"
                :data="projectList"
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
                <el-table-column
                  type="index"
                  :index="typeIndex"
                  label="序号"
                  fixed="left"
                  align="center"
                />
                <el-table-column prop="projectNo" label="项目编号" align="center" />
                <el-table-column prop="projectName" label="项目名称" align="center" />
                <el-table-column prop="clientName" label="客户名称" align="center" />
                <el-table-column prop="projectType" label="A/B/C分类" width="80" align="center">
                  <template slot-scope="scope">
                    <span
                      v-if="scope.row.projectType === 1"
                    >A</span>
                    <span
                      v-if="scope.row.projectType === 2"
                    >B</span>
                    <span
                      v-if="scope.row.projectType === 3"
                    >C</span>
                  </template>
                </el-table-column>
                <el-table-column prop="isBuild" label="是否已组建" width="120" align="center">
                  <template slot-scope="scope">
                    <span v-if="scope.row.isBuild === 1">已组建</span>
                    <span v-if="scope.row.isBuild === 2">未组建</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="操作" fixed="right" width="110">
                  <template slot-scope="scope">
                    <el-button
                      v-if="scope.row.isBuild === 2"
                      size="small"
                      plain
                      type="primary"
                      @click="creatProjectGroup(scope.$index, scope.row)"
                    >组 建</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="查看组建记录">
            <div class="table-list">
              <el-table
                v-loading="listLoading"
                :data="groupList"
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
                <el-table-column
                  type="index"
                  :index="typeIndex"
                  label="序号"
                  fixed="left"
                  align="center"
                />
                <el-table-column prop="workGroupName" label="工作组名称" align="center" />
                <el-table-column prop="workGroupNo" label="工作组编号" align="center" />
                <el-table-column prop="buildMan" label="组建人" width="" align="center" />
                <el-table-column prop="buildTime" label="组建时间" align="center" />
              </el-table>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="buildShow = false">关 闭</el-button>
      </span>
    </el-dialog>
    <el-dialog
      width="90%"
      class="dialog"
      title="工作组信息"
      :close-on-click-modal="false"
      :visible.sync="addShow"
      @close="closeDialog"
    >
      <div class="dialog-body">
        <el-form
          :model="addForm"
          size="small"
          label-width="120px"
          label-position="center"
        >
          <el-row>
            <el-col>
              <strong>基本项目信息</strong>
            </el-col>
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
              <el-form-item label="客户名称">
                <el-input v-model="addForm.clientName" disabled />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="A/B/C分类">
                <el-select v-model="addForm.projectType" disabled>
                  <el-option label="A" :value="1">A</el-option>
                  <el-option label="B" :value="2">B</el-option>
                  <el-option label="C" :value="3">C</el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="项目负责合伙人">
                <el-input v-model="addForm.projectPartnerName" disabled />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="项目经理">
                <el-input v-model="addForm.projectManager" disabled />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="项目秘书">
                <el-input placeholder="点击选择委派" readonly="true" @focus="chooseClerk" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <strong>子团队</strong>
            </el-col>
          </el-row>
          <el-divider />
          <el-row>
            <el-col :xs="24" class="btn" style="text-align:right; margin-bottom:10px;">
              <el-button type="primary" icon="el-icon-circle-plus-outline" @click="partAdd">添 加</el-button>
            </el-col>
            <table class="detail-table">
              <tr>
                <td>序号</td>
                <td>员工编号</td>
                <td>员工姓名</td>
                <td>指定为外勤主管</td>
                <td>操作</td>
              </tr>
              <tr v-for="(item, index) in addForm.professorArr" :key="item.professorName">
                <td>{{ index + 1 }}</td>
                <td><el-input /></td>
                <td><el-input
                  placeholder="点击选择委派"
                  readonly="true"
                  @focus="chooseGroupMember"
                /></td>
                <td>
                  <el-radio v-model="item.isPoint" label="1">是</el-radio>
                  <el-radio v-model="item.isPoint" label="2">否</el-radio>
                </td>
                <td><el-button type="danger" icon="el-icon-delete" circle @click="partReduce" /></td>
              </tr>
            </table>
          </el-row>
          <!-- <el-row>
            <el-col :sm="24" :md="12">
              <el-form-item label="项目外勤主管">
                <el-input />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="项目组员">
                <el-input
                  placeholder="点击选择委派"
                  readonly="true"
                  @focus="chooseGroupMember"
                />
              </el-form-item>
            </el-col>
          </el-row> -->
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addShow = false">取 消</el-button>
        <el-button type="primary" @click="submitSave">提 交</el-button>
      </span>
    </el-dialog>
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
              <!-- <el-table-column prop="workGroupName" label="工作组名称" align="center" />
              <el-table-column prop="workGroupNo" label="工作组编号" align="center" />
              <el-table-column prop="projectPartnerName" label="项目负责合伙人" width="120" align="center" />
              <el-table-column prop="projectManager" label="项目经理" align="center" />
              <el-table-column prop="projectSecretary" label="项目秘书" align="center" />
              <el-table-column prop="projectName" label="项目名称" align="center" />
              <el-table-column prop="clientName" label="客户名称" align="center" />
              <el-table-column prop="projectType" label="A/B/C分类" width="80" align="center"> -->
              <el-col :sm="24" :md="12">
                <el-form-item label="工作组名称">
                  <el-input v-model="detailForm.workGroupName" disabled />
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
                <el-form-item label="项目负责合伙人">
                  <el-input v-model="detailForm.projectPartnerName" disabled />
                </el-form-item>
              </el-col>
              <el-col :sm="24" :md="12">
                <el-form-item label="项目经理">
                  <el-input v-model="detailForm.projectManager" disabled />
                </el-form-item>
              </el-col>
              <el-col :sm="24" :md="12">
                <el-form-item label="项目秘书">
                  <el-input v-model="detailForm.projectSecretary" disabled />
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
    <el-dialog
      width="90%"
      class="dialog"
      title="人员信息"
      :close-on-click-modal="false"
      :visible.sync="peopleShow"
      @close="closeDialog"
    >
      <div class="dialog-body">
        <div class="table-list-search">
          <el-form ref="listQuery" :model="listQuery" inline size="mini">
            <el-form-item label="员工编号" prop="companyName">
              <el-input v-model="listQuery.companyName" />
            </el-form-item>
            <el-form-item label="员工姓名" prop="companyName">
              <el-input v-model="listQuery.companyName" />
            </el-form-item>
            <el-form-item label="所属分所" prop="companyName">
              <el-input v-model="listQuery.companyName" />
            </el-form-item>
            <el-form-item label="职级" prop="companyName">
              <el-input v-model="listQuery.companyName" />
            </el-form-item>
            <el-form-item>
              <el-button size="mini" type="primary" icon="el-icon-search">查 询</el-button>
              <el-button size="mini" @click="listQueryReset">重 置</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="table-list">
          <el-table
            :data="peopleList"
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
            <el-table-column type="selection" fixed="left" align="center" />
            <el-table-column type="index" :index="peopleIndex" label="序号" fixed="left" align="center" />
            <el-table-column prop="accountNo" label="员工编号" align="center" />
            <el-table-column prop="peopleName" label="员工姓名" align="center" />
            <el-table-column prop="departNames" label="所属分所" align="center" />
            <el-table-column prop="rolesName" label="职级" align="center" />
          </el-table>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="peopleShow = false">取 消</el-button>
        <el-button type="primary">保 存</el-button>
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
      peopleListQuery: {
        current: 1,
        size: 10
      },
      list: [
        {
          workGroupName: '浙江省科学技术厅-工作组',
          workGroupNo: 'G-2020-001',
          buildTime: '2020-12-01 11:28:12',
          buildMan: '张强',
          projectNo: '2020-05764',
          projectName: '2020-05764-01-浙江省科学技术厅',
          clientName: '浙江省科学技术厅',
          projectType: 1,
          childProjectName: '2020-05764-01-浙江省科学技术厅-软件定制开发',
          childProjectNo: '2020-05764-01',
          childProjectLevel: 1,
          functionClassify: '一般公共服务支出-人大事务-机关服务',
          ecoClassify: '采矿业-黑色金属矿采选业-铁矿采选',
          riskLevel: 2,
          status: 1,
          isBuild: 1,
          projectPartnerName: '倪小平',
          projectManager: '张强',
          projectSecretary: '贾秀林'
        },
        {
          workGroupName: '浙江省科学技术厅-工作组',
          workGroupNo: 'G-2020-002',
          buildTime: '2020-12-01 11:28:12',
          buildMan: '张强',
          projectNo: '2020-05764',
          projectName: '2020-05764-01-浙江省科学技术厅',
          clientName: '浙江省科学技术厅',
          projectType: 1,
          childProjectName: '2020-05764-01-浙江省科学技术厅-软件定制开发',
          childProjectNo: '2020-05764-01',
          childProjectLevel: 1,
          functionClassify: '一般公共服务支出-人大事务-机关服务',
          ecoClassify: '采矿业-黑色金属矿采选业-铁矿采选',
          riskLevel: 2,
          status: 1,
          isBuild: 1,
          projectPartnerName: '倪小平',
          projectManager: '张强',
          projectSecretary: '贾秀林'
        }
      ],
      total: 1,
      totalPeople: 11,
      addShow: false,
      buildShow: false,
      groupList: [
        {
          workGroupName: '浙江省科学技术厅-工作组',
          workGroupNo: 'G-2020-001',
          buildTime: '2020-12-01 11:28:12',
          buildMan: '张强'
        }, {
          workGroupName: '浙江省科学技术厅-工作组',
          workGroupNo: 'G-2020-002',
          buildTime: '2020-12-01 11:28:12',
          buildMan: '张强'
        }, {
          workGroupName: '浙江省科学技术厅-工作组',
          workGroupNo: 'G-2020-003',
          buildTime: '2020-12-01 11:28:12',
          buildMan: '张强'
        }
      ],
      projectList: [
         {
          projectNo: '2020-05764',
          projectName: '2020-05764-01-浙江省科学技术厅',
          clientName: '浙江省科学技术厅',
          projectType: 1,
          childProjectName: '2020-05764-01-浙江省科学技术厅-软件定制开发',
          childProjectNo: '2020-05764-01',
          childProjectLevel: 1,
          functionClassify: '一般公共服务支出-人大事务-机关服务',
          ecoClassify: '采矿业-黑色金属矿采选业-铁矿采选',
          riskLevel: 2,
          status: 1,
          isBuild: 2
        },
        {
          projectNo: '2020-05764',
          projectName: '2020-05764-01-浙江省科学技术厅',
          clientName: '浙江省科学技术厅',
          projectType: 1,
          childProjectName: '2020-05764-01-浙江省科学技术厅-软件定制开发',
          childProjectNo: '2020-05764-01',
          childProjectLevel: 1,
          functionClassify: '一般公共服务支出-人大事务-机关服务',
          ecoClassify: '采矿业-黑色金属矿采选业-铁矿采选',
          riskLevel: 2,
          status: 1,
          isBuild: 2
        },
        {
          projectNo: '2020-05764',
          projectName: '2020-05764-01-浙江省科学技术厅',
          clientName: '浙江省科学技术厅',
          projectType: 1,
          childProjectName: '2020-05764-01-浙江省科学技术厅-软件定制开发',
          childProjectNo: '2020-05764-01',
          childProjectLevel: 1,
          functionClassify: '一般公共服务支出-人大事务-机关服务',
          ecoClassify: '采矿业-黑色金属矿采选业-铁矿采选',
          riskLevel: 2,
          status: 1,
          isBuild: 2
        }
      ],
      bottomSearchBoxShow: false,
      title: '',
      addForm: {
        projectName: '2020-05764-01-浙江省科学技术厅',
        projectNo: '2020-05764',
        clientName: '浙江省科学技术厅',
        projectType: 2,
        projectPartnerName: '倪小平',
        projectManager: '张强',
        projectSecretary: '贾秀林',
        professorArr: [
        {
          'accountNo': '',
          'peopleName': '',
          'isPoint': null
        }
      ]
      },
      peopleShow: false,
      peopleList: [{
        'accountNo': 20200115,
        'peopleName': '孟辉',
        'departNames': '浙江分所',
        'rolesName': 'Senior Manager 3'
      }, {
        'accountNo': 20200174,
        'peopleName': '薄克琴',
        'departNames': '天津分所',
        'rolesName': 'Senior Manager 3'
      }, {
        'accountNo': 20200203,
        'peopleName': '窦武田',
        'departNames': '武汉分所',
        'rolesName': 'Manager 2'
      }, {
        'accountNo': 20200108,
        'peopleName': '方秀娥',
        'departNames': '浙江分所',
        'rolesName': 'Assistant Manager'
      }, {
        'accountNo': 20200130,
        'peopleName': '刘美霞',
        'departNames': '浙江分所',
        'rolesName': 'Senior Associate 2'
      }, {
        'accountNo': 20200183,
        'peopleName': '刘洋',
        'departNames': '天津分所',
        'rolesName': 'Senior Associate 1'
      }, {
        'accountNo': 20200172,
        'peopleName': '刘月新',
        'departNames': '天津分所',
        'rolesName': 'Associate 3'
      }, {
        'accountNo': 20200162,
        'peopleName': '苗德清',
        'departNames': '天津分所',
        'rolesName': 'Associate 2'
      }, {
        'accountNo': 20200113,
        'peopleName': '宋亚立',
        'departNames': '天津分所',
        'rolesName': 'Associate 1'
      }],
      detailShow: false,
      detailForm: {
        workGroupName: '浙江省科学技术厅-工作组',
        workGroupNo: 'G-2020-001',
        projectPartnerName: '倪小平',
        projectManager: '张强',
        projectSecretary: '贾秀林',
        projectName: '2020-05764-浙江省科学技术厅',
        clientName: '1',
        projectType:'浙江省科学技术厅'
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
    // 序号
    peopleIndex(index) {
      return index + (this.peopleListQuery.current - 1) * this.peopleListQuery.size + 1
    },
    // 修改每页size
    peopleSizeChange(val) {
      this.peopleListQuery.current = 1
      this.peopleListQuery.size = val
    },
    // 跳转页
    peopleCurrentChange(val) {
      this.peopleListQuery.current = val
    },
    // 展开查询更多
    searchBoxShow() {
      this.bottomSearchBoxShow = !this.bottomSearchBoxShow
    },
    creatProjectGroup(index, row) {
      this.addShow = true
    },
    holdSave() {
      this.addShow = false
    },
    submitSave() {
      this.addShow = false
    },
    closeDialog() {
      this.$refs['addForm'].resetFields()
    },
    handelAdd() {
      this.buildShow = true
    },
    chooseExpert() {
      this.peopleShow = true
    },
    chooseGroupMember() {
      this.peopleShow = true
    },
    chooseClerk() {
      this.peopleShow = true
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
      const timepart = {
          'accountNo': '',
          'peopleName': '',
          'isPoint': null
      }
      this.addForm.professorArr.push(timepart)
    },
    // 删除
    partReduce(index) {
      this.addForm.professorArr.splice(index, 1)
    },
    handleDetail(index, row) {
      this.detailShow = true
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>
