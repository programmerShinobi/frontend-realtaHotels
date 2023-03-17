import {call, put} from 'redux-saga/effects'
import { createVendorFailed, createVendorSucceed, deleteVendorFailed, deleteVendorSucceed, getVendorRequestFailed, getVendorRequestSucceed, updateVendorFailed, updateVendorSucceed } from '../../Actions/Purchasing/vendorActions'
import vendorServ from '@/redux/Services/Purchasing/vendorService'
import axios from 'axios'

function* handleGetVendor() :any{
    try{
        const res = yield call(vendorServ.findallVendor)
        // console.log(res)
        yield put(getVendorRequestSucceed(res.data))
    }catch(e:any){
        yield put(getVendorRequestFailed(e))
    }
}

function* handleAddVendor(actions:any):any{
    try{
        // console.log(actions.payload)
        const res = yield call(vendorServ.createVendor, actions.payload)
        // const res = yield axios.post('http://localhost:3010/vendor/', actions.payload)
        yield put(createVendorSucceed(res.data))
        return res.data.result
    }catch(e:any){
        yield put(createVendorFailed(e))
    }
}

function* handleUpdateVendor(action:any):any{
    try{
        const res = yield call(vendorServ.updateVendor, action.payload)
        yield put(updateVendorSucceed(res.data))
    }catch(e:any){
        yield put(updateVendorFailed(e))
    }
}

function* handleDeleteVendor(action:any):any{
    try{
        const res = yield call(vendorServ.deleteVendor, action.payload)
        yield put(deleteVendorSucceed(action.payload))
    }catch(e:any){
        yield put(deleteVendorFailed(e))
    }
}

export {
    handleGetVendor,
    handleAddVendor,
    handleUpdateVendor,
    handleDeleteVendor
}