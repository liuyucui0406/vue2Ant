<template>
  <div>
    <a-menu mode="inline">
      <template v-for="option in routes.options.routes">
        <a-menu-item :key="option.name" v-if="!option.children">
          <router-link :to="option.path">{{ option.name }}</router-link>
        </a-menu-item>
        <a-sub-menu v-else :title="option.name" :key="option.name">
          <a-menu-item v-for="item in option.children" :key="item.path">
            <router-link :to="option.path + '/' + item.path">{{
              item.name
            }}</router-link>
          </a-menu-item>
        </a-sub-menu>
      </template>
    </a-menu>
  </div>
</template>
  <script>
import routes from "./../router/index";
export default {
  data() {
    return {
      rootSubmenuKeys: ["sub1", "sub2", "sub4"],
      openKeys: ["sub1"],
      routes,
    };
  },
  created() {
    console.log(routes.options.routes, 111);
  },
  methods: {
    onOpenChange(openKeys) {
      const latestOpenKey = openKeys.find(
        (key) => this.openKeys.indexOf(key) === -1
      );
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys;
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    },
  },
};
</script>