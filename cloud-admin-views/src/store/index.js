import Vue from 'vue'
import Vuex from 'Vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        userinfo: {
            username: '',
            nickname: '',
            desc: '',
            avatar: '',
            email: ''
        },
        detailsItem: {
            username: '',
            nickname: '',
            desc: '',
            avatar: '',
            email: ''
        },
        bookItem: {
            
        }
    },
    mutations: {
        CHANGE_USERINFO (state, userinfo) {
            state.userinfo = userinfo
        },
        DETAIL_USERINFO (state, detailsItem) {
            state.detailsItem = detailsItem
        },
        BOOK_EDIT (state, bookItem) {
            state.bookItem = bookItem
        }
    },
    actions: {},
    plugins: [createPersistedState({
        storage: {
          getItem: key => sessionStorage.getItem(key),
          // Please see https://github.com/js-cookie/js-cookie#json, on how to handle JSON.
          setItem: (key, value) =>
          sessionStorage.setItem(key, value),
          removeItem: key => sessionStorage.removeItem(key),
        },
      })
    ]
})

export default store