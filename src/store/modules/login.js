export default {
  state: {
    isLogin: false,
  },
  mutations: {
    setIsLogin(state, obj) {
      state.isLogin = obj;
    },
  },
};
