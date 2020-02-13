import { ChatTypes } from './types'
import { socket } from '../../services/socketio'

import {
    getUsers as getUsersAPI,
    getChat as getChatAPI,
    postMessage as postMessageAPI,
    markAsRead as markAsReadAPI
} from '../../services/api'

export const getUsersRequest = ()=>async dispatch=>{
    dispatch({type: ChatTypes.GET_USERS_REQUEST})
    try {
        //const response = await axios.get(`${BASE_URL}/relation`)
        const response = await getUsersAPI()
        //onsole.log(response)
        dispatch(getUsersSuccess(response.data.myRelations))
    }catch(err){
        console.log(err.response)
    }
}

export const getUsersSuccess = (users)=> async dispatch=>{
    dispatch({
        type: ChatTypes.GET_USERS_SUCCESS,
        payload: users
    })
}

export const setUserDestiny = (destiny)=>async dispatch=>{
    dispatch({
        type: ChatTypes.SET_USER_DESTINY,
        payload: destiny
    })
    dispatch(markAsReadRequest(destiny.id))
    dispatch(getUsersRequest())
    dispatch(getChatRequest(destiny.id))
}

export const getChatRequest =(id)=> async dispatch=>{
    dispatch({type: ChatTypes.GET_USERS_REQUEST})
    try{
        //const response = await axios.get(`${BASE_URL}/message/chat/${id}`)
        const response = await getChatAPI(id)
        dispatch(getChatSuccess(response.data.chat))
    }catch(err){
        console.log(err.response)
    }
}

export const getChatSuccess =(messages)=>async dispatch=>{
    dispatch({
        type: ChatTypes.GET_CHAT_SUCCESS,
        payload: messages
    })
}

export const postMessageRequest = (dataMessage, idOrigin)=>async dispatch=>{
    dispatch({type: ChatTypes.POST_MESSAGE_REQUEST})
    try{
        //await axios.post(`${BASE_URL}/message/`, dataMessage)
        await postMessageAPI(dataMessage)
        dispatch(postMessageSuccess(dataMessage.destiny, idOrigin))
    }catch(err){
        console.log(err.response)
    }
}

export const postMessageSuccess = (idDestiny, idOrigin)=>async dispatch=>{
    dispatch({type: ChatTypes.POST_MESSAGE_SUCCESS})
    dispatch(markAsReadRequest(idDestiny))
    dispatch(getUsersRequest())
    dispatch(getChatRequest(idDestiny))
    socket.emit('getUsers')
    socket.emit('getMessages', idOrigin)
}

export const markAsReadRequest = (idDestiny) =>async dispatch=>{
    dispatch({type: ChatTypes.MARK_AS_READ_REQUEST})
    try{
        //await axios.put(`${BASE_URL}/message/mark-as-read/${idDestiny}`)
        await markAsReadAPI(idDestiny)
        dispatch(markAsReadSuccess())
    }catch(err){
        console.log(err.response)
    }
}

export const markAsReadSuccess =()=> async dispatch=>{
    dispatch({type: ChatTypes.MARK_AS_READ_SUCCESS})
}