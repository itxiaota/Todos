<template>
  <div id="app">
    <div class="ipt_search">
      <a-input placeholder="请输入任务" class="my_ipt" @keyup="inpValChange" :value="inputVal" />
      <a-button type="primary" @click="addItem">添加事项</a-button>
    </div>

    <a-list bordered :dataSource="toggleDoneStatus" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox :checked="item.done" @change="(e) => { stateChange(e, item.id) }">{{ item.info }}</a-checkbox>
        <!-- 删除链接 -->
        <a slot="actions" @click="delItem(item.id)">删除</a>
      </a-list-item>

      <!-- footer区域 -->
      <div class="footer" slot="footer">
        <span>{{ undoneLen }}条剩余</span>
        <a-button-group>
          <a-button :type="viewKey === 'all' ? 'primary' : ''" @click="toggleStatus('all')">全部</a-button>
          <a-button :type="viewKey === 'undone' ? 'primary' : ''" @click="toggleStatus('undone')">未完成</a-button>
          <a-button :type="viewKey === 'done' ? 'primary' : ''" @click="toggleStatus('done')">已完成</a-button>
        </a-button-group>
        <a @click="clearDone">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>


<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'app',
  data() {
    return {}
  },
  components: {},
  created() {
    this.$store.dispatch('getList')
  },
  computed: {
    ...mapState(['list', 'inputVal', 'viewKey']),
    ...mapGetters(['undoneLen', 'toggleDoneStatus']),
  },
  methods: {
    // 获取事项输入框的值
    inpValChange(e) {
      this.$store.commit('setInputVal', e.target.value)
    },
    // 添加事项，就是往 list 中添加一行数据
    addItem() {
      if (this.inputVal.trim().length <= 0) {
        return this.$message.warning('文本框内容不能为空！')
      }
      this.$store.commit('addListItems')
    },
    // 删除 事项
    delItem(id) {
      this.$store.commit('delListItems', id)
    },
    // 更改 事项 完成状态
    stateChange(e, id) {
      const params = {
        id: id,
        done: e.target.checked
      }
      this.$store.commit('setStatus', params)
    },
    // 清除已完成
    clearDone() {
      this.$store.commit('clearDoneItems')
    },
    // 切换 视图
    toggleStatus(view) {
      this.$store.commit('toggleItems', view)
    }
  }
}
</script>
<style scoped>
#app {
  padding: 10px;
  width: 600px;
  margin: 0 auto;
}

.ipt_search {
  width: 500px;
  margin: 0 auto;
}

.my_ipt {
  width: 400px;
  margin: 0 auto;
}

.dt_list {
  width: 600px;
  margin: 20px auto;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>

