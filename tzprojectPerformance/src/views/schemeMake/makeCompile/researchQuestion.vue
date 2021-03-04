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
        <el-form-item label="项目名称" prop="companyName">
          <el-input v-model="listQuery.companyName" />
        </el-form-item>
        <el-form-item label="项目编号" prop="companyName">
          <el-input v-model="listQuery.companyName" />
        </el-form-item>
        <el-form-item label="风险级别" prop="companyName">
          <el-select v-model="listQuery.companyName">
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
        <el-table-column prop="projectName" label="项目名称" width="" align="center" />
        <el-table-column prop="projectNo" label="项目编号" width="" align="center" />
        <el-table-column prop="riskLevel" label="风险级别" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.riskLevel === 1">A</span>
            <span v-if="scope.row.riskLevel === 2">B</span>
            <span v-if="scope.row.riskLevel === 3">C</span>
          </template>
        </el-table-column>
        <el-table-column prop="clientName" label="客户名称" align="center" />
        <el-table-column prop="designMan" label="拟定人" width="80" align="center" />
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
              @click="detailHandle(scope.$index, scope.row)"
            >详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--详情-->
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
          <el-form :model="addForm" label-width="140px" size="small">
            <el-row>
              <strong>项目信息</strong>
            </el-row>
            <el-divider />
            <el-row>
              <el-col :sm="24" :md="24">
                <el-form-item label="项目名称">
                  <el-input v-model="addForm.projectName" disabled />
                </el-form-item>
              </el-col>
              <el-col :sm="24" :md="12">
                <el-form-item label="项目编号">
                  <el-input v-model="addForm.projectNo" disabled />
                </el-form-item>
              </el-col>
              <el-col :sm="24" :md="12">
                <el-form-item label="客户名称">
                  <el-input v-model="addForm.clientName" disabled />
                </el-form-item>
              </el-col>
              <el-col :sm="24" :md="12">
                <el-form-item label="业务类型">
                  <el-input value="非鉴证业务-政务软件服务-软件定制开发" disabled />
                </el-form-item>
              </el-col>
              <el-col :sm="24" :md="12">
                <el-form-item label="项目属性">
                  <el-input disabled placeholder="信息从管理平台带出" />
                </el-form-item>
              </el-col>
              <el-col :sm="24" :md="12">
                <el-form-item label="财政合并项目">
                  <el-select v-model="listQuery.companyName">
                    <el-option label="财政评价项目" :value="1" selected="selected">财政评价项目</el-option>
                    <el-option label="部门评价项目" :value="2">部门评价项目</el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :sm="24" :md="12">
                <el-form-item label="风险级别">
                  <el-input v-model="addForm.riskLevel" disabled />
                </el-form-item>
              </el-col>
              <el-form-item label="预算支出功能分类">
                <el-col :span="24">
                  <el-input v-model="addForm.functionClassify" disabled />
                </el-col>
              </el-form-item>
              <el-form-item label="国民经济行业分类">
                <el-col :span="24">
                  <el-input v-model="addForm.ecoClassify" disabled />
                </el-col>
              </el-form-item>
              <el-col :sm="24" :md="12">
                <el-form-item label="项目负责合伙人">
                  <el-input
                    v-model="addForm.projectPartnerName"
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
                <el-form-item label="项目秘书">
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
              <!-- <el-col :xs="24" class="btn" style="text-align:left; margin-bottom:10px;">
              <el-button type="primary" icon="el-icon-circle-plus-outline" @click="partAdd">添加一行</el-button>
              <el-button type="primary" icon="el-icon-download">Excel导入</el-button>
            </el-col> -->
              <table class="detail-table">
                <tr>
                  <td>序号</td>
                  <td>排序</td>
                  <td>问题</td>
                  <td>答案选项</td>
                  <!-- <td>操作</td> -->
                </tr>
                <tr v-for="(item, index) in addForm.requestionArr" :key="item.id">
                  <td>{{ index + 1 }}</td>
                  <td>
                    <div v-if="index!==0" class="topIcon" @click="basicSortUp(index, item)" />
                    <div v-if="index!==addForm.requestionArr.length-1" class="bottomIcon" @click="basicSortDown(index, item)" />
                  </td>
                  <td><el-input v-model="item.question" type="textarea" /></td>
                  <td style="text-align:left;" v-html="item.answer" />
                <!-- <td><el-button type="danger" icon="el-icon-delete" circle @click="partReduce" /></td> -->
                </tr>
              </table>
            </el-row>
            <el-row style="margin-top:20px;">
              <strong>审批记录信息</strong>
            </el-row>
            <el-divider />
            <el-row>
              <el-col :sm="24" :md="24">
                <table class="detail-table">
                  <tr>
                    <td>序号</td>
                    <td>审批结果</td>
                    <td>审批意见</td>
                    <td>审批人</td>
                    <td>审批时间</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>通过</td>
                    <td>同意</td>
                    <td>李宁</td>
                    <td>2020-12-02 11:29:39</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>通过</td>
                    <td>同意</td>
                    <td>马辉</td>
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
              <el-step title="李宁" description="2020-12-02 11:29:39" />
              <el-step title="马辉" description="2020-12-03 15:49:25" />
              <el-step title="贾立华" description="" />
            </el-steps>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="detailShow = false">关 闭</el-button>
      </span>
    </el-dialog>
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
        <el-form :model="addForm" label-width="140px" size="small">
          <el-row>
            <strong>项目信息</strong>
          </el-row>
          <el-divider />
          <el-row>
            <el-col :sm="24" :md="24">
              <el-form-item label="项目名称">
                <el-input v-model="addForm.projectName" disabled />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="项目编号">
                <el-input v-model="addForm.projectNo" disabled />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="客户名称">
                <el-input v-model="addForm.clientName" disabled />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="业务类型">
                <el-input value="非鉴证业务-政务软件服务-软件定制开发" disabled />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="项目属性">
                <el-input disabled placeholder="信息从管理平台带出" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="财政合并项目">
                <el-select v-model="listQuery.companyName">
                  <el-option label="财政评价项目" :value="1" selected="selected">财政评价项目</el-option>
                  <el-option label="部门评价项目" :value="2">部门评价项目</el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="风险级别">
                <el-input v-model="addForm.riskLevel" disabled />
              </el-form-item>
            </el-col>
            <el-form-item label="预算支出功能分类">
              <el-col :span="24">
                <el-input v-model="addForm.functionClassify" disabled />
              </el-col>
            </el-form-item>
            <el-form-item label="国民经济行业分类">
              <el-col :span="24">
                <el-input v-model="addForm.ecoClassify" disabled />
              </el-col>
            </el-form-item>
            <el-col :sm="24" :md="12">
              <el-form-item label="项目负责合伙人">
                <el-input
                  v-model="addForm.projectPartnerName"
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
              <el-form-item label="项目秘书">
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
            <!-- <el-col>
              <el-form-item label="问卷概要信息">
                <div>
                  <tinymce v-model="content" :height="300" />
                </div>
              </el-form-item>
            </el-col> -->
            <!-- <el-col>
              <div class=" all_660">
                <div class="but" style="padding-top: 20px;">
                  <el-radio-group id="addquerstions" v-model="addForm.questionType" size="medium" @change="selectChange">
                    <el-radio-button label="0">单选</el-radio-button>
                    <el-radio-button label="1">多选</el-radio-button>
                    <el-radio-button label="2">填空</el-radio-button>
                    <el-radio-button label="3">矩阵</el-radio-button>
                  </el-radio-group>
                  <div>
                    <div style="text-align:center;">
                      <span style="font-size:16px;font-weight:block;">
                        <el-input type="text" style="width:300px" placeholder="问卷调查标题" />
                      </span>
                    </div>
                    <div class="yd_box" />
                  </div>
                  <div style="text-align:center;margin-top:30px;">
                    <el-button type="primary">提交问题</el-button>
                  </div>
                </div>
                <!--选项卡区域  模板区域---------------------------------------------------------------------------------------------------------------------------------------->
            <!-- <template>
                  <div class="xxk_box">
                    <div class="xxk_conn hide"> -->
            <!--单选----------------------------------------------------------------------------------------------------------------------------------------->
            <!-- <div class="xxk_xzqh_box dxuan ">
                        <textarea name="" cols="" rows="" class="input_wenbk btwen_text btwen_text_dx" placeholder="单选题目" />
                        <div class="title_itram">
                          <div class="kzjxx_iteam">
                            <input name="" type="radio" value="" class="dxk">
                            <input name="" type="text" class="input_wenbk" value="" placeholder="选项">
                            <label>
                              <input name="" type="checkbox" value="" class="fxk"> <span>可填空</span>
                            </label> <a href="javascript:void(0);" class="del_xm">删除</a>
                          </div>
                        </div>
                        <a href="javascript:void(0)" class="zjxx">增加选项</a> -->
            <!--完成编辑-->
            <!-- <div class="bjqxwc_box">
                          <a href="javascript:void(0);" class="qxbj_but">取消编辑</a>
                          <a href="javascript:void(0);" class="swcbj_but"> 完成编辑</a>
                        </div>
                      </div> -->
            <!--多选----------------------------------------------------------------------------------------------------------------------------------------->
            <!-- <div class="xxk_xzqh_box duoxuan hide">
                        <textarea name="" cols="" rows="" class="input_wenbk btwen_text btwen_text_duox" placeholder="多选题目" />
                        <div class="title_itram">
                          <div class="kzjxx_iteam">
                            <input name="" type="checkbox" value="" class="dxk">
                            <input name="" type="text" class="input_wenbk" value="选项" placeholder="选项">
                            <label>
                              <input name="" type="checkbox" value="" class="fxk"> <span>可填空</span></label>
                            <a href="javascript:void(0);" class="del_xm">删除</a>
                          </div>
                        </div>
                        <a href="javascript:void(0)" class="zjxx">增加选项</a> -->
            <!--完成编辑-->
            <!-- <div class="bjqxwc_box">
                          <a href="javascript:void(0);" class="qxbj_but">取消编辑</a>
                          <a href="javascript:void(0);" class="swcbj_but"> 完成编辑</a>
                        </div>
                      </div> -->
            <!-- 填空----------------------------------------------------------------------------------------------------------------------------------------->
            <!-- <div class="xxk_xzqh_box tktm hide">
                        <textarea name="" cols="" rows="" class="input_wenbk btwen_text btwen_text_tk" placeholder="答题区" /> -->
            <!--完成编辑-->
            <!-- <div class="bjqxwc_box">
                          <a href="javascript:void(0);" class="qxbj_but">取消编辑</a>
                          <a href="javascript:void(0);" class="swcbj_but"> 完成编辑</a>
                        </div>
                      </div> -->
            <!-- 矩阵----------------------------------------------------------------------------------------------------------------------------------------->
            <!-- <div class="xxk_xzqh_box  hide">
                        <div class="line_dl" />
                        <div class="jztm">
                          <textarea name="" cols="" rows="" class="input_wenbk btwen_text" placeholder="题目" />
                          <table width="100%" border="0" cellspacing="0" cellpadding="0">
                            <tbody>
                              <tr valign="top">
                                <td width="135">
                                  <h4 class="ritwenz_xx">左标题</h4>
                                  <textarea name="" cols="" rows="" class="leftbtwen_text" placeholder="例子：CCTV1，CCTV2，CCTV3" />
                                </td>
                                <td>
                                  <h4 class="ritwenz_xx  ">
                                    右侧选项文字 <input
                                      type="radio"
                                      name="xz"
                                      value="0"
                                      checked="checked"
                                      class="xzqk"
                                    >单选<input
                                      type="radio"
                                      value="1"
                                      name="xz"
                                      class="xzqk"
                                    >多选
                                  </h4>
                                  <div class="title_itram">
                                    <div class="kzjxx_iteam">
                                      <input name="" type="text" class="input_wenbk jzwent_input" value="选项" onblur="if(!this.value)this.value='选项'" onclick="if(this.value&amp;&amp;this.value=='选项' )  this.value=''">
                                      <label>
                                        <input name="" type="checkbox" value="" class="fxk">
                                        <span>可填空</span>
                                      </label>
                                      <a href="javascript:void(0);" class="del_xm">删除</a>
                                    </div>
                                    <div class="kzjxx_iteam">
                                      <input name="" type="text" class="input_wenbk jzwent_input" value="选项" onblur="if(!this.value)this.value='选项'" onclick="if(this.value&amp;&amp;this.value=='选项' )  this.value=''">
                                      <label>
                                        <input name="" type="checkbox" value="" class="fxk">
                                        <span>可填空</span>
                                      </label>
                                      <a href="javascript:void(0);" class="del_xm">删除</a>
                                    </div>
                                    <div class="kzjxx_iteam">
                                      <input name="" type="text" class="input_wenbk jzwent_input" value="选项" onblur="if(!this.value)this.value='选项'" onclick="if(this.value&amp;&amp;this.value=='选项' )  this.value=''">
                                      <label>
                                        <input name="" type="checkbox" value="" class="fxk">
                                        <span>可填空</span>
                                      </label>
                                      <a href="javascript:void(0);" class="del_xm">删除</a>
                                    </div>
                                  </div>
                                  <a href="javascript:void(0)" class="zjxx" style="margin-left: 0;">增加选项</a>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <div class="bjqxwc_box">
                            <a href="javascript:void(0);" class="qxbj_but">取消编辑</a>
                            <a href="javascript:void(0);" class="swcbj_but"> 完成编辑</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </el-col> -->
          </el-row>
          <el-row>
            <el-col :xs="24" class="btn" style="text-align:left; margin-bottom:10px;">
              <el-button type="primary" size="small" icon="el-icon-circle-plus-outline" @click="partAdd">添加一行</el-button>
              <el-button type="primary" size="small" icon="el-icon-download">Excel导入</el-button>
              <el-button type="primary" size="small" icon="el-icon-upload2">导出</el-button>
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
                <td width="5%">{{ index + 1 }}</td>
                <td width="10%">
                  <div v-if="index!==0" class="topIcon" @click="basicSortUp(index, item)" />
                  <div v-if="index!==addForm.requestionArr.length-1" class="bottomIcon" @click="basicSortDown(index, item)" />
                </td>
                <td style="text-align:left;" />
                <td style="text-align:left;" v-html="item.answer" />
                <td width="10%">
                  <el-button type="primary" icon="el-icon-edit" title="编辑" circle @click="partAdd" />
                  <el-button type="danger" icon="el-icon-delete" title="删除" circle @click="partReduce" />
                </td>
              </tr>
            </table>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addChildShow = false">取 消</el-button>
        <el-button type="success" @click="holdSave">预 览</el-button>
        <el-button type="primary" @click="submitSave">提 交</el-button>
      </span>
    </el-dialog>
    <el-dialog
      width="90%"
      class="dialog"
      title="问卷编辑"
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
            <el-col :sm="24" :md="24">
              <el-form-item label="问题">
                <el-input type="textarea" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="24">
              <el-form-item label="答案选项">
                <el-input type="textarea" :rows="4" />
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
import Tinymce from '@/components/Tinymce'
import { tableListMixin, globalMixin } from '@/utils/mixin'
export default {
  name: 'TinymceDemo',
  components: {
    Tinymce
  },
  mixins: [tableListMixin, globalMixin],
  data() {
    return {
      content: '',
      listQuery: {
        current: 1,
        size: 10
      },
      list: [{
        projectNo: '2020-07714-01-Z01',
        projectName: '2020-07714-01-Z01天津市滨海新区财政局-一般公共预算项目绩效评价',
        clientName: '天津市滨海新区财政局',
        projectType: 1,
        projectOutLeader: '李宁',
        projectPartnerName: '贾立华',
        projectManager: '马辉',
        riskLevel: 3,
        status: 2,
        approvalTime: '2020-10-09 10:20:10',
        designMan: '李宁'
      }, {
        projectNo: '2018-06470-01',
        projectName: '2018-06470-01-天津市铁路运输检察院-内部控制体系建设',
        clientName: '天津市铁路运输检察院',
        projectType: 2,
        riskLevel: 3,
        projectOutLeader: '李宛昱',
        projectPartnerName: '贾立华',
        projectManager: '马辉',
        status: 1,
        approvalTime: '',
        designMan: ''
      }],
      total: 1,
      addChildShow: false,
      detailShow: false,
      title: '',
      addForm: {
        projectNo: '2020-07714-01-Z01',
        projectName: '2020-07714-01-Z01天津市滨海新区财政局-一般公共预算项目绩效评价',
        clientName: '天津市滨海新区财政局',
        projectType: 'A',
        projectOutLeader: '李宁',
        projectPartnerName: '贾立华',
        projectManager: '马辉',
        functionClassify: '一般公共服务支出-财政事务',
        ecoClassify: '公共管理、社会保障和社会组织-国家机构-国家行政机构-经济事务管理机构',
        riskLevel: 'C',
        questionType: '1',
        requestionArr: [{
          id: 1,
          question: '',
          answer: ''
        }]
      },
      addCheckShow: false,
      html_cz: '',
      questionTypeForm: {
        questionType: 1,
        anwers: '',
        chooseType: null
      }
    }
  },
  created() {},
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
    detailHandle(index, row) {
      this.detailShow = true
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
.detail-table tr:first-child{
  background-color: #F5FAFF;
}
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
