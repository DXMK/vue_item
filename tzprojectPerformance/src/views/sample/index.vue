<script>
/*
 * @Author: Your name
 * @Date:   2020-11-18 09:33:15
 * @Last Modified by:   Your name
 * @Last Modified time: 2020-11-18 09:33:17
 */
</script>

<template>
  <div class="page-container">
    <div class="table-list-search">
      <el-form ref="listQuery" :model="listQuery" inline>
        <el-form-item label="用户姓名" prop="userName">
          <el-input v-model="listQuery.userName" size="small" />
        </el-form-item>
        <el-form-item label="认证状态" prop="authentication">
          <el-select v-model="listQuery.authentication" size="small" placeholder="请选择">
            <el-option label="全部" value />
            <el-option
              v-for="(item,index) in authenticationList"
              :key="index"
              :label="item.name"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="注册时间" prop="registerTime">
          <el-date-picker
            v-model="listQuery.registerTime"
            size="small"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetimerange"
            range-separator="至"
            start-placeholder="注册开始日期"
            end-placeholder="注册结束日期"
            :default-time="['0:00:00', '23:59:59']"
          />
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="onSeaech">查询</el-button>
          <el-button size="small" @click="listQueryReset">重置</el-button>
          <el-button class="moreSearch" type="text" @click="searchBoxShow" v-text="bottomSearchBoxShow?'收起':'更多选项'" />
        </el-form-item>
        <el-collapse-transition>
          <div v-show="bottomSearchBoxShow">
            <el-form-item label="车牌号" prop="carNo">
              <el-input v-model="listQuery.carNo" size="small" />
            </el-form-item>
          </div>
        </el-collapse-transition>
      </el-form>
    </div>
    <div class="header-operation">
      <el-button type="primary" size="small" @click="handleExport">导出</el-button>
      <el-button type="primary" size="small" @click="handleAdd">新增</el-button>
      <el-button type="primary" size="small" @click="importShow=true">上传</el-button>
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
        max-height="535"
        size="small"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          fixed="left"
          align="center"
        />
        <el-table-column
          type="index"
          :index="typeIndex"
          label="序号"
          fixed="left"
          align="center"
        />
        <el-table-column
          prop="orderNo"
          label="订单编号"
          width="160"
          align="center"
        />
        <el-table-column
          prop="orderNo"
          label="订单编号"
          width="160"
          align="center"
        />
        <el-table-column
          prop="orderNo"
          label="订单编号"
          width="160"
          align="center"
        />
        <el-table-column
          prop="authentication"
          label="订单类型"
          width="150"
          align="center"
        >
          <template slot-scope="scope">
            {{ stateToText(scope.row.authentication, authenticationList) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="authentication"
          label="订单类型"
          width="150"
          align="center"
        >
          <template slot-scope="scope">
            {{ stateToText(scope.row.authentication, authenticationList) }}
          </template>
        </el-table-column>
        <el-table-column
          label="备注"
          prop="earnestRemark"
          align="center"
        >
          <template slot-scope="scope">
            <el-popover
              class="zzy-color-theme zzy-cup"
              placement="bottom"
              width="200"
              trigger="click"
              :content="scope.row.earnestRemark"
            >
              <span slot="reference">{{ shortName(scope.row.earnestRemark) }}</span>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="300" fixed="right">
          <template slot-scope="scope">
            <el-button
              size="small"
              plain
              type="primary"
              @click="handleEdit(scope.$index, scope.row)"
            >修改</el-button>
            <el-button
              size="small"
              plain
              type="primary"
              @click="handleDetail(scope.$index, scope.row)"
            >详情</el-button>
            <el-button
              size="small"
              plain
              type="primary"
              @click="handleDetele(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        :current-page="listQuery.current"
        :page-sizes="[10,20,30, 50]"
        :page-size="listQuery.size"
        :layout="paginationData"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <!-- 新增弹窗 -->
    <el-dialog
      width="50%"
      class="dialog"
      title="新增"
      :close-on-click-modal="false"
      :visible.sync="addShow"
      @close="closeDialog"
    >
      <el-scrollbar wrap-class="dialog-scroll">
        <el-form ref="addForm" class="addForm" size="small" :rules="addRule" :model="addForm" label-width="90px">
          <el-row>
            <el-col :sm="24" :md="12">
              <el-form-item label="用户编号" prop="userNumber">
                <el-input v-model="addForm.userNumber" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="用户编号" prop="userNumber">
                <el-input v-model="addForm.userNumber" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="注册日期" prop="regDate">
                <el-date-picker
                  v-model="addForm.regDate"
                  type="date"
                  format="yyyyMMdd"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="24">
              <el-form-item label="图片" prop="imgList">
                <zzy-upload
                  list-type="picture"
                  :file-list.sync="addForm.imgList"
                  :max-size="100"
                />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12">
              <el-form-item label="用户编号" prop="authentication">
                <el-select v-model="addForm.authentication" size="small">
                  <el-option
                    v-for="(item,index) in authenticationList"
                    :key="index"
                    :label="item.name"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="24">
              <el-form-item label="地址" prop="area">
                <el-cascader
                  v-model="addForm.area"
                  clearable
                  filterable
                  :props="{value: 'id',label: 'value'}"
                  :options="provinces"
                />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="24">
              <el-form-item label="地址2" prop="provincesValue">
                <zzy-provinces
                  ref="provinces"
                  v-model="addForm.provincesValue"
                  :level="3"
                  filterable
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-scrollbar>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addShow = false">取 消</el-button>
        <el-button type="primary" @click="addSubmit">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 详情弹窗 -->
    <el-dialog
      width="50%"
      class="dialog"
      title="详情"
      :visible.sync="detailShow"
    >
      <!-- <template slot="title">
        <span>详情</span>
        <el-button class="zzy-dialog-full-screen" type="text" icon="el-icon-full-screen" @click="detailFullscreen=!detailFullscreen"></el-button>
      </template> -->
      <el-scrollbar wrap-class="dialog-scroll">
        <table class="detail-table">
          <tr>
            <th colspan="4">基础信息</th>
          </tr>
          <tr>
            <td class="title">标题</td>
            <td>{{ detailData.title }}</td>
            <td class="title">标题</td>
            <td>{{ detailData.title }}</td>
          </tr>
          <tr>
            <td class="title">标题</td>
            <td>{{ detailData.title }}</td>
            <td class="title">标题</td>
            <td>{{ detailData.title }}</td>
          </tr>
          <!-- <tr>
            <td class="title">标题</td>
            <td colspan="3">
              <el-image
                class="detail-thumbnail"
                :src="detailData.url"
                :preview-src-list="detailData.srcList"
                fit="cover">
              </el-image>
            </td>
          </tr> -->
        </table>
      </el-scrollbar>
    </el-dialog>

    <!--导入-->
    <ImportFile :is-show.sync="importShow" :downloadurl="downloadurl" :up-load-url="upLoadUrl" :get-list-fun="getList" />

  </div>
</template>

<script>
import { getProvinces } from '@/api/basic'
import ZzyUpload from '@/components/ZzyUpload'
import ZzyProvinces from '@/components/ZzyProvinces'
import ImportFile from '@/components/ImportFile'
import { tableListMixin } from '@/utils/mixin'
import { stateToText, shortName } from '@/utils'
import { presetTime } from '@/utils'
export default {
  name: 'SampleIndex',
  components: {
    'zzy-upload': ZzyUpload,
    'zzy-provinces': ZzyProvinces,
    'ImportFile': ImportFile
  },
  mixins: [tableListMixin],
  data() {
    return {
      listQuery: {
        current: 1,
        size: 10,
        userName: '',
        authentication: '',
        registerTime: [],
        carNo: ''
      },
      authenticationList: [ // 认证状态
        { name: '未认证', value: 0 },
        { name: '未审核', value: 1 },
        { name: '已认证', value: 2 },
        { name: '审核失败', value: 3 }
      ],
      bottomSearchBoxShow: false,
      list: [{
        authentication: 2,
        earnestRemark: '计划都是'
      }, {
        authentication: 3,
        earnestRemark: '计划都是付给你度搜ID念佛时，灰色的回复is呆那边水电费'
      }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
      total: 0,
      addShow: false,
      addRule: {},
      addForm: {
        imgList: [],
        provincesValue: []
      },
      detailShow: false,
      detailData: {},
      provinces: [],
      provincesValue: ['', '', ''],
      detailFullscreen: false,
      uping: false,
      importShow: false,
      // 导入下载文件地址后缀
      downloadurl: '/basicSalesman/downloadUsers',
      // 导入上传接口的request
      upLoadUrl: null
    }
  },
  computed: {
    registerTimeStart() {
      return this.listQuery.registerTime ? this.listQuery.registerTime[0] : ''
    },
    registerTimeEnd() {
      return this.listQuery.registerTime ? this.listQuery.registerTime[1] : ''
    }
  },
  mounted() {
    this.getCityData()
    console.log(presetTime(new Date(), 30))
  },
  methods: {
    stateToText,
    shortName,
    // 获取列表
    getList() {
      this.listLoading = true
      // apiFun({...this.listQuery, registerTimeStart: this.registerTimeStart,registerTimeEnd: this.registerTimeEnd}).then(response => {
      //   this.listLoading = false
      // })
    },
    // 搜索
    onSeaech() {
      this.listQuery.current = 1
      this.getList()
    },
    // 重置
    listQueryReset() {
      this.$refs['listQuery'].resetFields()
    },
    // 展开查询更多
    searchBoxShow() {
      this.bottomSearchBoxShow = !this.bottomSearchBoxShow
    },
    handleEdit(index, row) {},
    handleDetail(index, row) {
      this.detailShow = true
    },
    handleDetele(index, row) {},
    handleExport() {},
    handleAdd() {
      this.addShow = true
    },
    closeDialog() {
      this.$refs['addForm'].resetFields()
      this.$refs['addForm'].clearValidate()
    },
    // 获取列表数据
    getCityData() {
      getProvinces().then((response) => {
        if (response.code === 200) {
          this.provinces = response.data
        }
      })
    },
    addSubmit() {
      const provinces = this.$refs['provinces'].getValue()
      console.log(provinces)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
