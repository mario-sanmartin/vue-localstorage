import { createStore } from 'vuex'
import router from '../router';

export default createStore({
  state: {
    peliculas:[],
    pelicula: {
      id:'',
      nombre: '',
      categorias: [],
      estado: '',
      duracion: 0
    }
  },
  mutations: {
   
    
    set(state,payload){
      //el payload es nuestra tarea -Empujar una nueva tarea dentro de nuestro array
      //todo lo que sea distinto al id que recibimos
      state.peliculas.push(payload)
      console.log(state.peliculas)
      localStorage.setItem('peliculas',JSON.stringify(state.peliculas))
    },
    eliminar(state,payload){
      //por cada recorrido preguntamos si item.id es distitnto
      state.peliculas = state.peliculas.filter(item => item.id !== payload)
      console.log('peli deleteada');
      localStorage.setItem('peliculas',JSON.stringify(state.peliculas))

    },
    pelicula(state,payload){
      if(!state.peliculas.find(item => item.id === payload)){
        router.push('/')
        return
      }
      //Si esto es igual devolvera el objeto y lo guardara en pelicula
      state.pelicula = state.peliculas.find(item => item.id === payload)
    },
    update(state,payload){
      //crea un array nuevo dependiendo la condicon
      state.peliculas = state.peliculas.map(item => item.id === payload.id ? payload : item)
      router.push('/')
      localStorage.setItem('peliculas',JSON.stringify(state.peliculas))

    },
    cargar(state,payload){
      state.peliculas = payload
    }
  },
  actions: {
    cargarLocalStorage({commit}){
      //SI existe info en el localstorage carga las tareas
      if(localStorage.getItem('peliculas')){
        const peliculas = JSON.parse(localStorage.getItem('peliculas'))
        commit('cargar',peliculas)
        return
      }
      //si no existe,creamos un array vacio
      localStorage.setItem('pelicuas',JSON.stringify([]))


    },
    setPeliculas({commit},pelicula){
      commit('set',pelicula)
    },
    deletePelicula({commit},id){
      commit('eliminar',id)
    },
    setPelicula({commit},id){
      commit('pelicula',id)
    },
    updatePelicula({commit},pelicula){
      commit('update',pelicula)
    }
  },
  modules: {
  }
})
