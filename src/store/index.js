import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 任务列表
    list: [],
    // 事项，输入框的值，添加事项时需要乃至
    inputVal: '',
    // 事项 模拟自增 id 值
    nextId: 6,
    // 状态选项卡 当前值 ，默认显示全部状态
    viewKey: 'all'
  },
  // 不改变原数据的展示或操作，可以放在 getters 中
  getters: {
    // 统计 剩余多少未完成 事项
    undoneLen(state) {
      return state.list.filter(x => x.done === false).length
    },
    // 切换 状态选项 ，根据选项显示 不同状态事项，并未修改原数据，应当使用 getters
    toggleDoneStatus(state) {
      const view = state.viewKey
      if (view === 'all') return state.list
      if (view === 'undone') {
        return state.list.filter(x => x.done === false)
      }
      if (view === 'done') {
        return state.list.filter(x => x.done === true)
      }
    },
  },
  mutations: {
    // 事项列表赋值
    initList(state, list) {
      state.list = list
    },
    // 事项输入框赋值
    setInputVal(state, val) {
      state.inputVal = val
    },
    // 添加事项
    addListItems(state) {
      const obj = {
        "id": state.nextId,
        "info": state.inputVal,
        "done": false
      }
      state.list.push(obj)
      state.nextId++
      state.inputVal = ''
      console.log(state.list);

    },
    // 删除事项
    delListItems(state, id) {
      const index = state.list.findIndex(x => x.id === id)
      state.list.splice(index, 1)
    },
    // 更改 事项 完成状态
    setStatus(state, pramas) {
      const index = state.list.findIndex(x => x.id === pramas.id)
      state.list[index].done = pramas.done
    },
    // 清除已完成
    clearDoneItems(state) {
      state.list = state.list.filter(x => x.done === false)
    },
    // 切换事项选项卡
    toggleItems(state, view) {
      state.viewKey = view
    }
  },
  // 异步任务放在 actions 中
  actions: {
    // 获取 事项列表数据 
    getList(context) {
      axios.get('/list.json').then(({ data }) => {
        context.commit('initList', data)
      })
    }
  },
  modules: {
  }
})
