<!--
 * @Author: zhangtao
 * @Date: 2020-11-17 11:10:33
 * @LastEditTime: 2020-11-17 11:15:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \newproject-develop1.0d:\tzprojectPerformance\src\views\schemeMake\beforehandResearch.vue
-->

<template>
  <section class="app-main">
    <transition name="fade" mode="out-in">
      <keep-alive :include="includePageNames">
        <router-view />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'MakeCompile',
  computed: {
    includePageNames() {
      const nameList = this.$store.state.tagsView.visitedViews
      const nameArr = []
      for (let i = 0; i < nameList.length; i++) {
        nameArr.push(nameList[i].name)
      }
      return nameArr.toString()
    },
    key() {
      return this.$route.fullPath
    }
  }
}
</script>

<style scoped>

</style>
