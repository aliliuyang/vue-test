export default{
	add ({ commit },index) {
	    commit('ADD_NUM',index)
	},
	reduce ({ commit },index) {
	    commit('REDUCE',index)
	},
	remove ({ commit },index) {
	    commit('REMOVE',index)
	},
	clear ({ commit }) {
	    commit('CLEAR')
	}
}
