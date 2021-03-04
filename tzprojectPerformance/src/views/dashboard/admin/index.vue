<script>
/*
 * @Author: 张涛
 * @Date:   2020-12-22 09:27:19
 * @Last Modified by:   Your name
 * @Last Modified time: 2021-02-22 10:16:48
 */
</script>
<template>
  <div class="dashboard-editor-container">
    <el-tabs v-model="activeName" type="border-card" style="max-height:530px;overflow:auto;">
      <el-tab-pane label="首页(普通)" name="first">
        <el-tabs v-model="themeType" type="card">
          <el-tab-pane label="业务待办" name="themeFirst">
            <div class="table-list-search">
              <el-form ref="listQuery" :model="listQuery" inline size="mini">
                <el-form-item label="项目名称">
                  <el-input v-model="listQuery.projectName" />
                </el-form-item>
                <el-form-item label="子项目名称">
                  <el-input v-model="listQuery.childrenProjectName" />
                </el-form-item>
                <el-form-item>
                  <el-button size="mini" type="primary" icon="el-icon-search">查 询</el-button>
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
              >
                <el-table-column type="index" :index="typeIndex" label="序号" fixed="left" align="center" />
                <el-table-column prop="projectNo" label="项目编号" width="100" align="center" />
                <el-table-column prop="projectName" label="项目名称" width="140" align="center" />
                <el-table-column prop="projectType" label="风险级别" align="center">
                  <template slot-scope="scope">
                    <span v-if="scope.row.projectType === 1">A</span>
                    <span v-if="scope.row.projectType === 2">B</span>
                    <span v-if="scope.row.projectType === 3">C</span>
                  </template>
                </el-table-column>
                <el-table-column prop="projectName" label="子项目名称" width="140" align="center" />
                <el-table-column prop="functionClassify" label="预算支出功能分类" width="230" align="center" />
                <el-table-column prop="ecoClassify" label="国民经济行业分类" width="220" align="center" />
                <el-table-column prop="approvalTime" label="申请时间" width="140" align="center" />
                <el-table-column prop="status" label="状态" width="80" align="center">
                  <template slot-scope="scope">
                    <span v-if="scope.row.status === 1">暂存</span>
                    <span v-if="scope.row.status === 2">审批中</span>
                    <span v-if="scope.row.status === 3">已审批</span>
                    <span v-if="scope.row.status === 4">已退回</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="操作" fixed="right">
                  <template slot-scope="scope">
                    <el-button
                      v-if="scope.row.status === 1 || scope.row.status === 4"
                      size="small"
                      plain
                      type="primary"
                      @click="handelUpdate(scope.$index, scope.row)"
                    >审批</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="项目进展" name="themeSecond">
            <el-tabs v-model="progressType">
              <el-tab-pane label="进行中" name="progressOne">
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
                  >
                    <el-table-column type="index" :index="typeIndex" label="序号" fixed="left" align="center" />
                    <el-table-column prop="projectNo" label="项目编号" width="100" align="center" />
                    <el-table-column prop="projectName" label="项目名称" width="140" align="center" />
                    <el-table-column prop="projectType" label="风险级别" align="center">
                      <template slot-scope="scope">
                        <span v-if="scope.row.projectType === 1">A</span>
                        <span v-if="scope.row.projectType === 2">B</span>
                        <span v-if="scope.row.projectType === 3">C</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="functionClassify" label="预算支出功能分类" width="230" align="center" />
                    <el-table-column prop="ecoClassify" label="国民经济行业分类" width="220" align="center" />
                    <el-table-column prop="status" label="目前进展" width="" align="center" />
                    <el-table-column prop="approvalTime" label="有效工时率" width="" align="center" />
                    <el-table-column align="center" label="操作" fixed="right">
                      <template slot-scope="scope">
                        <el-button
                          size="small"
                          plain
                          type="primary"
                          @click="handelUpdate(scope.$index, scope.row)"
                        >查看</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </div></el-tab-pane>
              <el-tab-pane label="已完结" name="progressTwo">
                <div class="table-list">
                  <el-table
                    v-loading="listLoading"
                    :data="completeList"
                    border
                    element-loading-text="给我一点时间"
                    fit
                    highlight-current-row
                    stripe
                    header-row-class-name="table-header"
                    size="small"
                    max-height="420"
                    style="width: 100%"
                  >
                    <el-table-column type="index" :index="typeIndex" label="序号" fixed="left" align="center" />
                    <el-table-column prop="projectNo" label="项目编号" width="100" align="center" />
                    <el-table-column prop="projectName" label="项目名称" width="140" align="center" />
                    <el-table-column prop="projectType" label="风险级别" align="center">
                      <template slot-scope="scope">
                        <span v-if="scope.row.projectType === 1">A</span>
                        <span v-if="scope.row.projectType === 2">B</span>
                        <span v-if="scope.row.projectType === 3">C</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="functionClassify" label="预算支出功能分类" width="230" align="center" />
                    <el-table-column prop="ecoClassify" label="国民经济行业分类" width="220" align="center" />
                    <el-table-column prop="status" label="目前进展" width="" align="center" />
                    <el-table-column prop="approvalTime" label="有效工时率" width="" align="center" />
                    <el-table-column align="center" label="操作" fixed="right">
                      <template slot-scope="scope">
                        <el-button
                          size="small"
                          plain
                          type="primary"
                          @click="handelUpdate(scope.$index, scope.row)"
                        >查看</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </div></el-tab-pane>
            </el-tabs>
          </el-tab-pane>
        </el-tabs>
        <div class="noticeContent">
          <div class="noticeText">
            <div class="noticeTittle">
              <span>通知公告</span>
            </div>
            <div class="textcontain">
              <div v-for="(item, index) in noticeArr" :key="index" class="textContent">
                <span style="cursor:pointer">{{ item.noticeName }}</span>
                <span class="timeText">{{ item.noticeTime }}</span>
              </div>
            </div>
          </div>
          <div class="messageText">
            <div class="noticeTittle">
              <span>绩效新闻</span>
            </div>
            <div class="textcontain">
              <div v-for="(item, index) in messageArr" :key="index" class="textContent">
                <span style="cursor:pointer">{{ item.messageName }}</span>
                <span class="timeText">{{ item.messageTime }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="compileRule">
          <div class="noticeTittle">
            <span>操作手册与业规</span>
          </div>
          <div class="textcontain">
            <div v-for="(item, index) in operationArr" :key="index" class="textContent">
              <span style="cursor:pointer">{{ item.operationName }}</span>
              <!-- <span class="timeText">{{ item.messageTime }}</span> -->
            </div>
          </div>
        </div>
        <div class="dateBaseShow">
          <div class="noticeTittle">
            <span>数据库</span>
          </div>
          <div>
            <el-row>
              <el-col :xs="24" :sm="12" :lg="8">
                <div class="chart-wrapper">
                  <div>政策法规库</div>
                  <base-chart />
                </div>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="8">
                <div class="chart-wrapper">
                  <div>绩效指标库</div>
                  <base-chart />
                </div>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="8">
                <div class="chart-wrapper">
                  <div>项目案例库</div>
                  <base-chart />
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="首页(合伙人、经理)" name="second">
        <el-row style="display:flex;">
          <div class="chart-top">
            <div>
              <span class="projectIng" @click="seeDetail">60</span>
              <span class="childProjectIng" @click="seeChildDetail">500</span>
            </div>
            <div class="projectTypeModel">
              <span>主项目</span>
              <span>子项目</span>
            </div>
            <div class="projectNums">
              正在进行项目数
              <!-- <el-popover
                placement="top"
                title="正在进行项目数分类图"
                width="1100"
                trigger="hover"
              >
                <div class="chart-wrapper">
                  <el-col :xs="24" :sm="12" :lg="6">
                    <div class="chart-wrapper">
                      <span>按风险级别</span>
                      <pie-chart />
                    </div>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6">
                    <div class="chart-wrapper">
                      <span>按省份</span>
                      <provance-chart />
                    </div>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="12">
                    <div class="chart-wrapper">
                      <span>按项目进度</span>
                      <progress-chart style="width:400px;" />
                    </div>
                  </el-col>
                </div>
                <span slot="reference">正在进行项目数</span>
              </el-popover> -->
            </div>
          </div>
          <div class="chart-top">
            <div class="second-num">
              <span class="projectIng">10</span>
              <span class="childProjectIng">50</span>
            </div>
            <div class="projectTypeModel">
              <span>主项目</span>
              <span>子项目</span>
            </div>
            <div class="projectNums">
              <el-popover
                placement="top"
                title="项目执行偏差情况表"
                width=""
                trigger="hover"
              >
                <table class="detail-table">
                  <tr style="background-color:#F5FAFF">
                    <td>序号</td>
                    <td>主项目名称</td>
                    <td>子项目名称</td>
                    <td>风险级别</td>
                    <td>项目负责合伙人</td>
                    <td>项目负责经理</td>
                    <td>项目外勤主管</td>
                    <td>计划执行进度</td>
                    <td>实际执行进度</td>
                    <td>实际进展</td>
                    <td>差异(工作日)</td>
                    <td>差异原因</td>
                  </tr>
                  <tr />
                  <tr />
                  <tr>
                    <td>1</td>
                    <td rowspan="3">主项目1</td>
                    <td>子项目1</td>
                    <td />
                    <td />
                    <td />
                    <td />
                    <td>2021.1.1-2021.3.1</td>
                    <td>2021.1.1-2021.4.1</td>
                    <td>报告编写</td>
                    <td>22</td>
                    <td style="color:red;">外勤主管填写，项目经理审核补充</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>子项目2</td>
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>...</td>
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                  </tr>
                  <tr />
                  <tr />
                  <tr>
                    <td>4</td>
                    <td rowspan="3">主项目2</td>
                    <td>子项目1</td>
                    <td />
                    <td />
                    <td />
                    <td />
                    <td>2021.1.1-2021.3.1</td>
                    <td>2021.1.1-2021.4.1</td>
                    <td>报告编写</td>
                    <td>22</td>
                    <td style="color:red;">外勤主管填写，项目经理审核补充</td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td>子项目2</td>
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                  </tr>
                  <tr>
                    <td>6</td>
                    <td>...</td>
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                  </tr>
                  <tr />
                  <tr />
                  <tr>
                    <td>7</td>
                    <td rowspan="3">主项目3</td>
                    <td>子项目1</td>
                    <td />
                    <td />
                    <td />
                    <td />
                    <td>2021.1.1-2021.3.1</td>
                    <td>2021.1.1-2021.4.1</td>
                    <td>报告编写</td>
                    <td>22</td>
                    <td style="color:red;">外勤主管填写，项目经理审核补充</td>
                  </tr>
                  <tr>
                    <td>8</td>
                    <td>子项目2</td>
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                  </tr>
                  <tr>
                    <td>9</td>
                    <td>...</td>
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                  </tr>
                </table>
                <span slot="reference">存在执行偏差项目数</span>
              </el-popover>
            </div>
          </div>
          <div class="chart-top">
            <div>
              <span class="projectIng">200</span>
              <span class="childProjectIng">1000</span>
            </div>
            <div class="projectTypeModel">
              <span>主项目</span>
              <span>子项目</span>
            </div>
            <div class="projectAll">
              <el-popover
                placement="top"
                title="项目总数分类图"
                width="1000"
                trigger="hover"
              >
                <div class="chart-wrapper">
                  <!-- <pie-chart />
                  <provance-chart /> -->
                  <el-col :xs="24" :sm="12" :lg="6">
                    <div>
                      <span>按风险级别</span>
                      <pie-chart />
                    </div>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="6">
                    <div>
                      <span>按省份</span>
                      <provance-chart />
                    </div>
                  </el-col>
                  <el-col :xs="24" :sm="12" :lg="12">
                    <div>
                      <span>按项目总数</span>
                      <projectAll-chart style="width:400px;" />
                    </div>
                  </el-col>
                </div>
                <span slot="reference">项目总数</span>
              </el-popover>
            </div>
          </div>
        </el-row>
        <el-row>
          <div class="chart-wrapper">
            <el-col :xs="24" :sm="12" :lg="6">
              <div class="chart-wrapper">
                <span>按风险级别</span>
                <pie-chart style="width:200px;" />
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="6">
              <div class="chart-wrapper">
                <span>按省份</span>
                <provance-chart style="width:200px;" />
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="12">
              <div class="chart-wrapper">
                <span>按项目进度</span>
                <progress-chart style="width:500px;" />
              </div>
            </el-col>
          </div>
        </el-row>
        <el-row style="margin-top:15px;">
          <div style="display:flex;align-items:center;">
            <div style="flex:1;text-align:center;">
              <div>
                <span style="font-size:30px;font-weight:700;margin-right:10px;">500</span>
                <span>万元</span>
              </div>
              <div style="font-size:20px;margin-top:30px;">当年合同金额</div>
            </div>
            <div style="flex:3">
              <div>
                <span>项目合同金额</span>
                <span style="float:right;">单位：万元</span>
              </div>
              <bar-chart style="width:900px;" />
            </div>
          </div>
        </el-row>
        <el-row style="margin-top:15px;">
          <el-col :xs="24" :sm="12" :lg="8">
            <div>
              <span>项目经理任务分布</span>
              <span style="float:right;">单位：个</span>
            </div>
            <people-chart style="width:330px;" />
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <div>
              <span>项目外勤主管任务分布</span>
              <span style="float:right;">单位：个</span>
            </div>
            <people-chart style="width:330px;" />
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <div>
              <span>项目组员任务分布</span>
              <span style="float:right;">单位：个</span>
            </div>
            <people-chart style="width:330px;" />
          </el-col>
        </el-row>
        <el-row style="margin-top:15px;">
          <div style="margin-bottom:10px">项目人员有效工时率</div>
          <div>
            <table class="detail-table">
              <tr style="background-color:#F5FAFF">
                <td>序号</td>
                <td>绩效评价项目</td>
                <td>项目人员</td>
                <td>有效工时率</td>
              </tr>
              <tr />
              <tr />
              <tr>
                <td rowspan="3">1</td>
                <td rowspan="3">项目1</td>
                <td>甲</td>
                <td>80%</td>
              </tr>
              <tr>
                <td>乙</td>
                <td>90%</td>
              </tr>
              <tr>
                <td>...</td>
                <td>70%</td>
              </tr>
              <tr>
                <td colspan="2">小计</td>
                <td />
                <td>85%</td>
              </tr>
              <tr />
              <tr />
              <tr>
                <td rowspan="3">2</td>
                <td rowspan="3">项目2</td>
                <td>甲</td>
                <td>80%</td>
              </tr>
              <tr>
                <td>乙</td>
                <td>90%</td>
              </tr>
              <tr>
                <td>...</td>
                <td>70%</td>
              </tr>
              <tr>
                <td colspan="2">小计</td>
                <td />
                <td>85%</td>
              </tr>
              <tr />
              <tr />
              <tr>
                <td rowspan="3">3</td>
                <td rowspan="3">项目3</td>
                <td>甲</td>
                <td>80%</td>
              </tr>
              <tr>
                <td>乙</td>
                <td>90%</td>
              </tr>
              <tr>
                <td>...</td>
                <td>70%</td>
              </tr>
              <tr>
                <td colspan="2">小计</td>
                <td />
                <td>85%</td>
              </tr>
              <tr>
                <td colspan="2">合计</td>
                <td />
                <td>90%</td>
              </tr>
            </table>
          </div>
        </el-row>
        <!-- <el-row>
          <el-col :xs="24" :sm="24" :lg="8">
            <div class="chart-wrapper">
              <div>项目总数分布图</div>
              <pie-chart />
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :lg="8">
            <div class="chart-wrapper">
              <div>项目进展分布图</div>
              <stage-chart />
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :lg="8">
            <div class="chart-wrapper">
              <div>与上年同期对比</div>
              <bar-chart />
            </div>
          </el-col>
        </el-row> -->
        <el-tabs v-model="themeType" type="card" style="margin-top:15px;">
          <el-tab-pane label="业务待办" name="themeFirst">
            <div class="table-list-search">
              <el-form ref="listQuery" :model="listQuery" inline size="mini">
                <el-form-item label="项目名称">
                  <el-input v-model="listQuery.projectName" />
                </el-form-item>
                <el-form-item label="子项目名称">
                  <el-input v-model="listQuery.childrenProjectName" />
                </el-form-item>
                <el-form-item>
                  <el-button size="mini" type="primary" icon="el-icon-search">查 询</el-button>
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
              >
                <el-table-column type="index" :index="typeIndex" label="序号" fixed="left" align="center" />
                <el-table-column prop="projectNo" label="项目编号" width="100" align="center" />
                <el-table-column prop="projectName" label="项目名称" width="140" align="center" />
                <el-table-column prop="projectType" label="风险级别" align="center">
                  <template slot-scope="scope">
                    <span v-if="scope.row.projectType === 1">A</span>
                    <span v-if="scope.row.projectType === 2">B</span>
                    <span v-if="scope.row.projectType === 3">C</span>
                  </template>
                </el-table-column>
                <el-table-column prop="projectName" label="子项目名称" width="140" align="center" />
                <el-table-column prop="functionClassify" label="预算支出功能分类" width="230" align="center" />
                <el-table-column prop="ecoClassify" label="国民经济行业分类" width="220" align="center" />
                <el-table-column prop="approvalTime" label="申请时间" width="140" align="center" />
                <el-table-column prop="status" label="状态" width="80" align="center">
                  <template slot-scope="scope">
                    <span v-if="scope.row.status === 1">暂存</span>
                    <span v-if="scope.row.status === 2">审批中</span>
                    <span v-if="scope.row.status === 3">已审批</span>
                    <span v-if="scope.row.status === 4">已退回</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="操作" fixed="right">
                  <template slot-scope="scope">
                    <el-button
                      v-if="scope.row.status === 1 || scope.row.status === 4"
                      size="small"
                      plain
                      type="primary"
                      @click="handelUpdate(scope.$index, scope.row)"
                    >审批</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="项目进展" name="themeSecond">
            <el-tabs v-model="progressType">
              <el-tab-pane label="进行中" name="progressOne">
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
                  >
                    <el-table-column type="index" :index="typeIndex" label="序号" fixed="left" align="center" />
                    <el-table-column prop="projectNo" label="项目编号" width="100" align="center" />
                    <el-table-column prop="projectName" label="项目名称" width="140" align="center" />
                    <el-table-column prop="projectType" label="风险级别" align="center">
                      <template slot-scope="scope">
                        <span v-if="scope.row.projectType === 1">A</span>
                        <span v-if="scope.row.projectType === 2">B</span>
                        <span v-if="scope.row.projectType === 3">C</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="functionClassify" label="预算支出功能分类" width="230" align="center" />
                    <el-table-column prop="ecoClassify" label="国民经济行业分类" width="220" align="center" />
                    <el-table-column prop="status" label="目前进展" width="" align="center" />
                    <el-table-column prop="approvalTime" label="有效工时率" width="" align="center" />
                    <el-table-column align="center" label="操作" fixed="right">
                      <template slot-scope="scope">
                        <el-button
                          size="small"
                          plain
                          type="primary"
                          @click="handelUpdate(scope.$index, scope.row)"
                        >查看</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </div></el-tab-pane>
              <el-tab-pane label="已完结" name="progressTwo">
                <div class="table-list">
                  <el-table
                    v-loading="listLoading"
                    :data="completeList"
                    border
                    element-loading-text="给我一点时间"
                    fit
                    highlight-current-row
                    stripe
                    header-row-class-name="table-header"
                    size="small"
                    max-height="420"
                    style="width: 100%"
                  >
                    <el-table-column type="index" :index="typeIndex" label="序号" fixed="left" align="center" />
                    <el-table-column prop="projectNo" label="项目编号" width="100" align="center" />
                    <el-table-column prop="projectName" label="项目名称" width="140" align="center" />
                    <el-table-column prop="projectType" label="风险级别" align="center">
                      <template slot-scope="scope">
                        <span v-if="scope.row.projectType === 1">A</span>
                        <span v-if="scope.row.projectType === 2">B</span>
                        <span v-if="scope.row.projectType === 3">C</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="functionClassify" label="预算支出功能分类" width="230" align="center" />
                    <el-table-column prop="ecoClassify" label="国民经济行业分类" width="220" align="center" />
                    <el-table-column prop="status" label="目前进展" width="" align="center" />
                    <el-table-column prop="approvalTime" label="有效工时率" width="" align="center" />
                    <el-table-column align="center" label="操作" fixed="right">
                      <template slot-scope="scope">
                        <el-button
                          size="small"
                          plain
                          type="primary"
                          @click="handelUpdate(scope.$index, scope.row)"
                        >查看</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </div></el-tab-pane>
            </el-tabs>
          </el-tab-pane>
        </el-tabs>
        <div class="noticeContent">
          <div class="noticeText">
            <div class="noticeTittle">
              <span>通知公告</span>
            </div>
            <div class="textcontain">
              <div v-for="(item, index) in noticeArr" :key="index" class="textContent">
                <span style="cursor:pointer">{{ item.noticeName }}</span>
                <span class="timeText">{{ item.noticeTime }}</span>
              </div>
            </div>
          </div>
          <div class="messageText">
            <div class="noticeTittle">
              <span>绩效新闻</span>
            </div>
            <div class="textcontain">
              <div v-for="(item, index) in messageArr" :key="index" class="textContent">
                <span style="cursor:pointer">{{ item.messageName }}</span>
                <span class="timeText">{{ item.messageTime }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="compileRule">
          <div class="noticeTittle">
            <span>操作手册与业规</span>
          </div>
          <div class="textcontain">
            <div v-for="(item, index) in operationArr" :key="index" class="textContent">
              <span style="cursor:pointer">{{ item.operationName }}</span>
              <!-- <span class="timeText">{{ item.messageTime }}</span> -->
            </div>
          </div>
        </div>
        <div class="dateBaseShow">
          <div class="noticeTittle">
            <span>数据库</span>
          </div>
          <div>
            <el-row>
              <el-col :xs="24" :sm="12" :lg="8">
                <div class="chart-wrapper">
                  <div>政策法规库</div>
                  <base-chart style="width:300px;" />
                </div>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="8">
                <div class="chart-wrapper">
                  <div>绩效指标库</div>
                  <base-chart style="width:300px;" />
                </div>
              </el-col>
              <el-col :xs="24" :sm="12" :lg="8">
                <div class="chart-wrapper">
                  <div>项目案例库</div>
                  <base-chart style="width:300px;" />
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-tab-pane>
      <!-- <el-tab-pane label="数据库" name="third">需求待确认</el-tab-pane> -->
    </el-tabs>
    <el-dialog
      width="90%"
      class="dialog"
      title="主项目信息"
      :close-on-click-modal="false"
      :visible.sync="addShow"
    >
      <div class="dialog-body">
        <el-form size="small" label-width="140px">
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
            <el-table-column type="selection" width="55" fixed="left" />
            <el-table-column type="index" :index="typeIndex" label="序号" fixed="left" align="center" />
            <el-table-column prop="projectNo" label="项目编号" width="110" align="center" />
            <el-table-column prop="projectName" label="项目名称" align="left" />
            <el-table-column prop="riskLevel" label="风险级别" width="70" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.riskLevel === 1">A</span>
                <span v-if="scope.row.riskLevel === 2">B</span>
                <span v-if="scope.row.riskLevel === 3">C</span>
              </template>
            </el-table-column>
            <el-table-column prop="functionClassify" label="预算支出功能分类" align="center" />
            <el-table-column prop="ecoClassify" label="国民经济行业分类" align="center" />
            <el-table-column prop="status" label="状态" width="60" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.status === 1">暂存</span>
                <span v-if="scope.row.status === 2">待审批</span>
                <span v-if="scope.row.status === 3">已审批</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作" width="100" fixed="right">
              <template slot-scope="scope">
                <el-button
                  size="small"
                  plain
                  type="primary"
                  @click="detailHandle(scope.$index, scope.row)"
                >详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addShow = false">关 闭</el-button>
      </span>
    </el-dialog>
    <el-dialog
      width="90%"
      class="dialog"
      title="子项目信息"
      :close-on-click-modal="false"
      :visible.sync="addChildShow"
    >
      <div class="dialog-body">
        <el-form size="small" label-width="140px">
          <el-table
            v-loading="listLoading"
            :data="childList"
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
            <el-table-column type="selection" width="55" fixed="left" />
            <el-table-column type="index" :index="typeIndex" label="序号" fixed="left" align="center" />
            <el-table-column prop="childProjectNo" label="子项目编号" align="center" />
            <el-table-column prop="childProjectName" label="子项目名称" align="center" />
            <el-table-column prop="riskLevel" label="风险级别" width="80" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.riskLevel === 1">A</span>
                <span v-if="scope.row.riskLevel === 2">B</span>
                <span v-if="scope.row.riskLevel === 3">C</span>
              </template>
            </el-table-column>
            <el-table-column prop="functionClassify" label="预算支出功能分类" align="center" />
            <el-table-column prop="ecoClassify" label="国民经济行业分类" align="center" />
            <el-table-column align="center" label="操作" width="100" fixed="right">
              <template slot-scope="scope">
                <el-button
                  size="small"
                  plain
                  type="primary"
                  @click="detailHandle(scope.$index, scope.row)"
                >详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addChildShow = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { tableListMixin, globalMixin } from '@/utils/mixin'
import PieChart from './components/PieChart'
import BaseChart from './components/BaseChart'
import StageChart from './components/StageChart'
import BarChart from './components/BarChart'
import PeopleChart from './components/PeopleChart'
import ProvanceChart from './components/ProvanceChart'
import ProgressChart from './components/ProgressChart'
import ProjectAllChart from './components/ProjectAllChart'
const animationDuration = 6000
export default {
  name: 'DashboardAdmin',
  mixins: [tableListMixin, globalMixin],
  components: {
    PieChart,
    BaseChart,
    StageChart,
    BarChart,
    PeopleChart,
    ProvanceChart,
    ProgressChart,
    ProjectAllChart
  },
  data() {
    return {
      listQuery: {
        projectName: "",
        childrenProjectName: ""
      },
      addChildShow: false,
      addShow: false,
      activeName: 'first',
      themeType: 'themeFirst',
      progressType: 'progressOne',
      list: [
        {
          projectNo: '2020-07714-01',
          projectName: '2020-07714-01天津市滨海新区财政局-一般公共预算项目绩效评价',
          clientName: '天津市滨海新区财政局',
          projectType: 1,
          functionClassify: '一般公共服务支出-财政事务',
          ecoClassify: '公共管理、社会保障和社会组织-国家机构-国家行政机构-经济事务管理机构',
          riskLevel: 3,
          status: 1,
          approvalTime: '2020-11-16 08:10:00'
        }, {
        projectNo: '2018-06470-01-Z02',
        projectName: '2018-06470-01-Z02-天津市铁路运输检察院-内部控制体系建设',
        clientName: '天津市铁路运输检察院',
        projectType: 2,
        functionClassify: '一般公共服务支出-财政事务',
        ecoClassify: '公共管理、社会保障和社会组织-国家机构-国家行政机构-行政监督检查机构',
        riskLevel: 3,
        status: 2,
        approvalTime: '2020-01-10 14:20:10'
      }, {
        projectNo: '2019-06197-01',
        projectName: '2019-06197-01-天津市静海区交通局-政务咨询',
        clientName: '天津市静海区交通局',
        projectType: 2,
        functionClassify: '一般公共服务支出-财政事务',
        ecoClassify: '公共管理、社会保障和社会组织-国家机构-国家行政机构-综合事务管理机构',
        riskLevel: 3,
        status: 2,
        approvalTime: '2020-11-04 17:20:10'
      }, {
        projectNo: '2019-08197-01',
        projectName: '2019-08197-01-张家口市林业和草原局相关业务支出项目绩效评价',
        clientName: '张家口市林业和草原局',
        projectType: 2,
        functionClassify: '一般公共服务支出-自然生态保护',
        ecoClassify: '公共管理、社会保障和社会组织-国家机构-国家行政机构-综合事务管理机构',
        riskLevel: 3,
        status: 2,
        approvalTime: '2020-10-15 10:12:10'
      }
      ],
      childList: [
        {
          id: 11,
          childProjectNo: '2018-06470-01-Z01',
          childProjectName: '2018-06470-01-Z01-天津市铁路运输检察院-内部控制体系建设',
          clientName: '天津市铁路运输检察院',
          projectType: 2,
          functionClassify: '一般公共服务支出-财政事务',
          ecoClassify: '公共管理、社会保障和社会组织-国家机构-国家行政机构-行政监督检查机构',
          riskLevel: 3,
          status: 2,
          approvalTime: '2020-01-10 14:20:10',
        }, {
          id: 12,
          childProjectNo: '2018-06470-01-Z02',
          childProjectName: '2018-06470-01-Z02-天津市铁路运输检察院-内部控制体系建设',
          clientName: '天津市铁路运输检察院',
          projectType: 2,
          functionClassify: '一般公共服务支出-财政事务',
          ecoClassify: '公共管理、社会保障和社会组织-国家机构-国家行政机构-行政监督检查机构',
          riskLevel: 3,
          status: 2,
          approvalTime: '2020-01-10 14:20:10',
        }, {
          id: 13,
          childProjectNo: '2018-06470-01-Z03',
          childProjectName: '2018-06470-01-Z03-天津市铁路运输检察院-内部控制体系建设',
          clientName: '天津市铁路运输检察院',
          projectType: 2,
          functionClassify: '一般公共服务支出-财政事务',
          ecoClassify: '公共管理、社会保障和社会组织-国家机构-国家行政机构-行政监督检查机构',
          riskLevel: 3,
          status: 2,
          approvalTime: '2020-01-10 14:20:10',
        }
      ],
      projectList: [
        {
          projectNo: '2020-07714-01-Z01',
          projectName: '2020-07714-01-Z01天津市滨海新区财政局-一般公共预算项目绩效评价(20%)',
          clientName: '天津市滨海新区财政局',
          projectType: 1,
          functionClassify: '一般公共服务支出-财政事务',
          ecoClassify: '公共管理、社会保障和社会组织-国家机构-国家行政机构-经济事务管理机构',
          riskLevel: 3,
          status: '组建工作组',
          approvalTime: '20%'
        }
      ],
      completeList: [
        {
          projectNo: '2020-07714-01-Z01',
          projectName: '2020-07714-01-Z01天津市滨海新区财政局-一般公共预算项目绩效评价(80%)',
          clientName: '天津市滨海新区财政局',
          projectType: 1,
          functionClassify: '一般公共服务支出-财政事务',
          ecoClassify: '公共管理、社会保障和社会组织-国家机构-国家行政机构-经济事务管理机构',
          riskLevel: 3,
          status: '已完结',
          approvalTime: '80%'
        }
      ],
      noticeArr: [
        {
          noticeName: '公告1',
          noticeTime: '2021-02-01 11:23:18'
        }, {
          noticeName: '公告2',
          noticeTime: '2021-02-01 11:23:18'
        }, {
          noticeName: '公告3',
          noticeTime: '2021-02-01 11:23:18'
        }, {
          noticeName: '公告4',
          noticeTime: '2021-02-01 11:23:18'
        }, {
          noticeName: '公告5',
          noticeTime: '2021-02-01 11:23:18'
        }
      ],
      messageArr: [
        {
          messageName: '新闻1',
          messageTime: '2021-02-01 11:23:18'
        }, {
          messageName: '新闻2',
          messageTime: '2021-02-01 11:23:18'
        }, {
          messageName: '新闻3',
          messageTime: '2021-02-01 11:23:18'
        }, {
          messageName: '新闻4',
          messageTime: '2021-02-01 11:23:18'
        }, {
          messageName: '新闻5',
          messageTime: '2021-02-01 11:23:18'
        }
      ],
      operationArr: [
        {
          operationName: '操作流程图',
          operationTime: '2021-02-01 11:23:18'
        }, {
          operationName: '平台操作手册',
          operationTime: '2021-02-01 11:23:18'
        }, {
          operationName: '天职绩效评价业规1',
          operationTime: '2021-02-01 11:23:18'
        }, {
          operationName: '天职绩效评价业规2',
          operationTime: '2021-02-01 11:23:18'
        }, {
          operationName: '天职绩效评价业规3',
          operationTime: '2021-02-01 11:23:18'
        }
      ]
    }
  },
  methods: {
    typeIndex(index) {
      return index + 1
    },
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    },
    seeDetail() {
      this.addShow = true
    },
    seeChildDetail() {
      this.addChildShow = true
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 20px;
  // background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
  .noticeContent{
    display: flex;
    margin-top: 10px;
    margin-left: 9px;
    margin-right: 9px;
    .noticeText{
      margin-right: 5px;
    }
    .messageText{
      margin-left: 5px;
    }
    .noticeText,.messageText{
      flex: 1;
      width: 45%;
      height: auto;
      border: 1px solid #e6ebf5;
    }
  }
  .dateBaseShow{
    width: 98.5%;
    height: auto;
    border: 1px solid #e6ebf5;
    margin-top: 10px;
    margin-left: 8px;
    margin-right: 10px;
  }
  .noticeTittle{
      height:40px;
      line-height:40px;
      border-bottom:1px solid #F4F4F4;
      padding:0 10px;
    }
  .textcontain{
    padding: 0px 20px;
    font-size: 14px;
    .timeText{
      float: right;
    }
  }
  .textContent{
    margin: 10px 0;
  }
  .compileRule{
    width: 49%;
    // height: 200px;
    border: 1px solid #e6ebf5;
    margin-top: 10px;
    margin-left: 8px;
  }
}
.chart-top{
  flex: 1;
  text-align: center;
  border: 1px solid #e6ebf5;
  padding: 5px 0;
  .projectIng{
    font-size: 34px;
    margin-top: 20px;
    margin-right: 40px;
    cursor: pointer;
  }
  .childProjectIng{
    cursor: pointer;
  }
  .projectAll{
    font-size: 26px;
    margin-top: 20px;
  }
  .projectNums{
    font-size: 20px;
    margin-top: 20px;
  }
  .second-num{
    color: #FF0000;
  }
  .projectTypeModel{
    margin-top: 8px;
  }
  .projectTypeModel span:first-child{
    margin-right: 20px;
  }
}
.chart-top:nth-child(2){
  margin: 0 10px;
}
@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
