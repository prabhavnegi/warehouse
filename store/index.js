import data from '../assets/warehouses.json'
import firebase from "firebase/app";
import "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyB3Nun7HqNH6IJDUUYn-7oXIQlLdBWGCyA",
    authDomain: "warehouse-4e8f8.firebaseapp.com",
    projectId: "warehouse-4e8f8",
    storageBucket: "warehouse-4e8f8.appspot.com",
    messagingSenderId: "146678206056",
    appId: "1:146678206056:web:760f6761dcedb4131ff5dd",
    measurementId: "G-23EV8FKDK3"
  };
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore()

export const state = () => ({
    data : []
  })

export const actions = {
    async setData({commit}) {
      console.log('action')
        var result = await db.collection('warehouses').doc('warehouses').get()
        commit('setWarehouseData',{data: result.data()})
    },
    async  getDataID({commit},param) {
      var result = await db.collection('warehouses').doc('warehouses').get()
      return result.data().data.find(warehouse => warehouse.id == parseInt(param.id))
    },
    async updateData({commit},param) {
      console.log(param)
      var result = await db.collection('warehouses').doc('warehouses').get()
      var arr = result.data().data.find(warehouse => warehouse.id == parseInt(param.id))
       console.log(arr)
      if(param.warehouseName != '')
        arr.name = param.warehouseName
      if(param.cluster != '')
        arr.cluster = param.cluster
      if(param.city != '')
        arr.city = param.city.charAt(0).toUpperCase() + param.city.slice(1)
      if(param.space != '')
        arr.space_available = param.space
      if(param.registered != '')
        arr.is_registered = param.registered
      if(param.status != '')
        arr.is_live = param.status
      if(param.type != '')
        arr.type = param.type
      var data = result.data().data
      data[param.id-1] = arr
      console.log(data)
      await  db.collection('warehouses').doc('warehouses').update({
        data
      })
    }
}

export const mutations = {
  setWarehouseData(state, payload) {
    state.data = payload.data
  }
}

export const getters = {
  getByName : (state) => (name) => {
    return state.data.data.find(warehouse => warehouse.name == name)
  },
  getFilterData : (state) => (city, cluster, space) => {
    console.log(city, cluster, space)
    var temp = []
      if(city != '') {
        temp = state.data.data.filter(warehouse => { return warehouse.city == city})
      }
      if(cluster != '') {
        if(temp.length == 0) {
          temp = state.data.data.filter(warehouse => { return warehouse.cluster == "cluster-"+cluster})
        }
        else {
          temp = temp.filter(warehouse => { return warehouse.cluster == "cluster-"+cluster })
          if(temp.length == 0)
            return temp
        }
      }
      if(space != '') {
        if(temp.length == 0) {
          if(space == '100')
            temp = state.data.data.filter(warehouse => { return parseInt(warehouse.space_available) <= 100})
          else if (space == '1000')
            temp = state.data.data.filter(warehouse => { return parseInt(warehouse.space_available) > 100 && parseInt(warehouse.space_available) <=1000})
          else
            temp = state.data.data.filter(warehouse => { return parseInt(warehouse.space_available) > 1000})
        } 
        else {
          if(space == '100')
            temp = temp.filter(warehouse => { return parseInt(warehouse.space_available) <= 100})
          else if (space == '1000')
            temp = temp.filter(warehouse => { return parseInt(warehouse.space_available) > 100 && parseInt(warehouse.space_available) <=1000})
          else
            temp = temp.filter(warehouse => { return parseInt(warehouse.space_available) > 1000})
        }
      }
    console.log(temp)
    return temp
  },
  getCityList : (state) => () => {
    return [...new Set(state.data.data.map(({ city }) => city))]
  }
}