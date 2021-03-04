<template>
  <div :class="['zzy-provinces', inline]">
    <template v-for="(levelItem, index) in level">
      <el-select
        v-if="!needForm"
        :key="index"
        v-model="selectValue[index]"
        :filterable="filterable"
        :clearable="clearable"
        :size="size"
        :multiple="multipleLevel && multipleLevel + index >= 3"
        collapse-tags
        :style="{width: width + 'px', 'margin-right': levelItem < level ? gap + 'px' : 0}"
        :placeholder="`请选择${labelTitle[index]}`"
        @change="choseSelect($event, index)"
      >
        <el-option
          v-for="item in selectList[index]"
          :key="item.id"
          :disabled="item.disabled"
          :label="item.value"
          :value="item.id"
        />
      </el-select>

      <!-- 外部有form-item -->
      <el-form-item
        v-else
        :key="index"
        :label="labelTitle[index]"
        :prop="prop[index]"
        :rules="rules && rules[index] || []"
      >
        <el-select
          :key="index"
          v-model="selectValue[index]"
          :filterable="filterable"
          :clearable="clearable"
          :size="size"
          :multiple="multipleLevel && multipleLevel + index >= 3"
          collapse-tags
          :style="{width: width + 'px'}"
          :placeholder="`请选择${labelTitle[index]}`"
          @change="choseSelect($event, index)"
        >
          <el-option
            v-for="item in selectList[index]"
            :key="item.id"
            :disabled="item.disabled"
            :label="item.value"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
    </template>
  </div>
</template>

<script>
import { getProvinces } from '@/api/basic'
// 判断是否为数组
function isArray(obj) { return Object.prototype.toString.call(obj) === '[object Array]' }
// 总的三级联动json
let provinces = []
export default {
  name: 'ZzyProvinces',
  props: {
    // 输入框尺寸
    size: {
      type: String,
      default: 'small',
      validator(value) {
        return ['medium', 'small', 'mini'].includes(value)
      }
    },
    filterable: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    // 输入框宽度
    width: {
      type: Number,
      default: 120
    },
    // 三个项的空隙
    gap: {
      type: Number,
      default: 5
    },
    level: {
      type: Number,
      default: 3,
      validator(value) {
        return value === 1 || 2 || 3
      }
    },
    // 总的值，以数组的形式v-model
    value: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: ['', '', '']
    },
    // 单一的值（只作为接收，外部赋值无效）
    // eslint-disable-next-line vue/require-prop-types
    province: {},
    // 单一的值（只作为接收，外部赋值无效）
    city: {},
    // 单一的值（只作为接收，外部赋值无效）
    area: {},
    // 多选级数，1：多选区，2：多选市、区，3：多选省、市、区
    multipleLevel: {
      type: Number,
      validator(value) {
        return value === 1 || 2 || 3
      }
    },
    // 是否需要单独的label
    needForm: {
      type: Boolean,
      default: false
    },
    // label文字
    labelTitle: {
      type: Array,
      default: () => ['省', '市', '区']
    },
    // 表单prop
    prop: {
      type: Array,
      default: () => ['province', 'city', 'area']
    },
    // 是否需要转化为块级
    inline: {
      type: Boolean,
      default: true
    },
    // 表单验证（无默认，数组形式）
    // eslint-disable-next-line vue/require-default-prop
    rules: {
      type: Array
    },
    // 是否使用外部传入三级联动数据（传入该参数后将不再内部调用省市区接口）
    useOutData: {
      type: Boolean,
      default: false
    },
    // 外部省市区json数据
    outData: {
      type: Array
    }
  },
  data() {
    return {
      provinceList: [],
      cityList: [],
      areaList: [],
      selectValue: ['', '', ''] // id的整合
    }
  },
  computed: {
    selectList() {
      return [this.provinceList, this.cityList, this.areaList]
    }
  },
  watch: {
    outData(data) {
      provinces = data
      this.provinceList = data
    },
    value(value) {
      if (value.toString() !== this.selectValue.toString()) {
        this.setValue(value)
      }
    }
    /* province(val) {
      if (val != this.selectValue[0]) {
        this.selectValue[0] = val
        this.choseSelect(val, 0)
      }
    },
    city(val) {
      if (val != this.selectValue[1]) {
        this.selectValue[1] = val
        this.choseSelect(val, 1)
      }
    },
    area(val) {
      if (val != this.selectValue[2]) {
        this.selectValue[2] = val
        this.choseSelect(val, 2)
      }
    } */
  },
  mounted() {
    if (!this.useOutData) {
      this.getCityData()
    } else {
      provinces = this.outData
      this.provinceList = this.outData
    }
  },
  methods: {
    // 获取列表数据
    getCityData() {
      getProvinces().then((response) => {
        if (response.code === 200) {
          provinces = response.data
          this.provinceList = response.data
        }
      })
    },
    // 三级选择
    choseSelect(e, index) {
      if (index === 0) {
        this.selectValue[1] = ''
        this.selectValue[2] = ''
        this.cityList = []
        this.areaList = []
        if (e) {
          if (isArray(e)) {
            let cityList = []
            e.forEach(ele => {
              const province = provinces.find(item => item.id === ele)
              cityList = [...cityList, ...province.children]
            })
            this.cityList = cityList
          } else {
            const province = provinces.find(item => item.id === e)
            const cityList = province.children
            this.cityList = cityList
          }
        }
        this.$emit('update:province', this.selectValue[0])
        this.$emit('update:city', '')
        this.$emit('update:area', '')
      } else if (index === 1) {
        this.selectValue[2] = ''
        this.areaList = []
        if (e) {
          if (isArray(e)) {
            let areaList = []
            e.forEach(ele => {
              const city = this.cityList.find(item => item.id === ele)
              areaList = [...areaList, ...city.children]
            })
            this.areaList = areaList
          } else {
            const city = this.cityList.find(item => item.id === e)
            const areaList = city.children
            this.areaList = areaList
          }
        }
        this.$emit('update:city', this.selectValue[1])
        this.$emit('update:area', '')
      } else {
        this.$emit('update:area', this.selectValue[2])
      }
      this.$emit('input', this.selectValue)
      this.$emit('value-change', this.getValue())
    },
    // 设置值，数组形式
    setValue(value) {
      const multipleLevel = this.multipleLevel
      const length = value.length || 3
      for (let i = 0; i < length; i++) {
        const item = value[i]
        if (multipleLevel + i >= 3) {
          if (!isArray(item)) {
            console.error('省市区选择参数类型错误！')
          }
        } else {
          if (isArray(item)) {
            console.error('省市区选择参数类型错误！')
          }
        }
        this.selectValue = [...value]
        this.choseSelect(item, i)
      }
    },
    // 获取当前的值
    getValue() {
      const nameList = []
      for (let i = 0; i < this.selectValue.length; i++) {
        const element = this.selectValue[i]
        const list = this.selectList[i]
        if (element && element !== '') {
          if (isArray(element)) {
            const arr = []
            element.forEach(ele => {
              const target = list.find(item => item.id === ele)
              arr.push(target.value)
            })
            nameList.push(arr)
          } else {
            const target = list.find(item => item.id === element)
            nameList.push(target.value)
          }
        } else {
          nameList.push(element)
        }
      }
      return {
        value: this.selectValue,
        name: nameList
      }
    }
  }
}
</script>

<style lang="css" scoped>
.inline{
  display: inline-block;
}
</style>
