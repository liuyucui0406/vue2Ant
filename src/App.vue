<template>
  <div id="app">
    <a-layout>
      <a-layout-header>Header</a-layout-header>
      <a-layout>
        <a-layout-sider>
          <side-bar></side-bar>
        </a-layout-sider>
        <a-layout-content>
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>

    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
    <!-- <AntTable />/ -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
// import AntTable from "./views/antTable.vue";
import SideBar from "./components/sideBar.vue";

export default {
  name: "App",
  components: {
    // HelloWorld,
    // AntTable,
    SideBar,
  },
};
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  .ant-layout-sider {
    background: #3ba0e9;
    color: #fff;
    height: calc(100vh - 60px);
  }
  .ant-layout-content {
    background: #fff;
    height: calc(100vh - 60px);
    overflow: hidden;
  }
  .ant-layout-header {
    background: #3ba0e9;
    color: #fff;
    height: 60px;
  }
}
</style>
