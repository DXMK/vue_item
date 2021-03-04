import store from '@/store'

// 判断访问终端
const browser = {
  versions: (function() {
    var u = navigator.userAgent
    return {
      mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, // android终端
      iPhone: u.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器
      iPad: u.indexOf('iPad') > -1 // 是否iPad
    }
  })(),
  language: (navigator.browserLanguage || navigator.language).toLowerCase()
}
export const globalMixin = {
  data() {
    return {
      imgUrl: process.env.VUE_APP_IMG_URL
    }
  },
  methods: {
    // 权限方法
    seachId(str) {
      const lauter = store.getters.permissionCodes.includes(str)
      return lauter
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 !== 0) {
        return 'warning-row'
      }
      return ''
    }
  }
}

// 列表部分通用mixin
export const tableListMixin = {
  data() {
    return {
      paginationData: 'total, sizes, prev, pager, next, jumper',
      listLoading: false, // 列表loading
      list: [], // 列表
      total: 0, // 列表总数
      multipleSelection: [] // 多选数组
    }
  },
  computed: {
    isMobile() {
      return browser.versions.mobile || browser.versions.android || browser.versions.ios
    }
  },
  methods: {
    // 单选或多选
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 字符串返回单选或多选选中的值
    returnIds(name) {
      if (!this.multipleSelection || this.multipleSelection.length < 1) {
        return ''
      }
      const arr = []
      this.multipleSelection.forEach(item => {
        arr.push(item[name])
      })
      return arr.join(',')
    },
    // 序号
    typeIndex(index) {
      return index + (this.listQuery.current - 1) * this.listQuery.size + 1
    },
    // 修改每页size
    handleSizeChange(val) {
      this.listQuery.current = 1
      this.listQuery.size = val
      this.getList()
    },
    // 跳转页
    handleCurrentChange(val) {
      this.listQuery.current = val
      this.getList()
    },
    changePagination(isMobile) {
      if (isMobile) {
        this.paginationData = 'prev, pager, next'
      }
    }
  },
  activated() {
    this.changePagination(this.isMobile)
  },
  watch: {
    isMobile(newVal) {
      this.changePagination(newVal)
    }
  }
}
