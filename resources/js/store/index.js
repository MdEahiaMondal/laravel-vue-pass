import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import * as auth from '../apis/auth'

export default new Vuex.Store({
    state: {
        apiUrl: 'http://localhost:8000/api',
        serverPath: 'http://localhost:8000',
        isLogedIn: false,
        profile: {}
    },
    getters: {

    },
    mutations: {
        setUserProfile(state, payload){
            state.isLogedIn = auth.isLogedIn()
            if (state.isLogedIn){
                state.profile = payload
            }
        }
    },
    actions: {
        getUserProfile(context, payload){
            context.commit('setUserProfile', payload)
        }
    }
});
