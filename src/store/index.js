import {createStore} from 'vuex'
import Mdouleuser from './user';

export default createStore({
    state:{
       
    },
    getters:{
        fullname(state){
            return state.user.firstname+state.user.lastname;
        }
    },
    mutations:{
    },
    actions:{
    },
    modules:{   
        user:Mdouleuser,
    }
});
  