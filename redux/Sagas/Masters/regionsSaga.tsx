import { call, put } from "redux-saga/effects";
import ReduceService from "redux/Services/Masters/reduceService";
import {
    doAddRegionsFailed,
    doAddRegionsSucceed,
    doDeleteRegionsFailed,
    doDeleteRegionsSucceed,
    doUpdateRegionsFailed,
    doUpdateRegionsSucceed,
    doRegionsRequestFailed,
    doRegionsRequestSucceed,

    doCountryRequestSucceed,
    doAddCountryFailed,
    doAddCountrySucceed,
    doUpdateCountrySucceed,
    doUpdateCountryFailed,
    doDeleteCountryFailed,
    doDeleteCountrySucceed,
    doCountryRequestFailed,

    doProvRequestSucceed,
    doAddProvFailed,
    doAddProvSucceed,
    doUpdateProvSucceed,
    doUpdateProvFailed,
    doDeleteProvFailed,
    doDeleteProvSucceed,
    doProvRequestFailed,

    doAddrRequestSucceed,
    doAddAddrFailed,
    doAddAddrSucceed,
    doUpdateAddrSucceed,
    doUpdateAddrFailed,
    doDeleteAddrFailed,
    doDeleteAddrSucceed,
    doAddrRequestFailed,

    doPolicyRequestSucceed,
    doPolicyRequestFailed,
    doAddPolicySucceed,
    doAddPolicyFailed,
    doUpdatePolicySucceed,
    doUpdatePolicyFailed,
    doDeletePolicySucceed,
    doDeletePolicyFailed,
    
    doCagroRequestSucceed,
    doCagroRequestFailed,
    doAddCagroSucceed,
    doAddCagroFailed,
    doUpdateCagroSucceed,
    doUpdateCagroFailed,
    doDeleteCagroSucceed,
    doDeleteCagroFailed,
    
    doPritRequestSucceed,
    doPritRequestFailed,
    doAddPritSucceed,
    doAddPritFailed,
    doUpdatePritSucceed,
    doUpdatePritFailed,
    doDeletePritSucceed,
    doDeletePritFailed,
    
    doServiceTaskRequestSucceed,
    doServiceTaskRequestFailed,
    doAddServiceTaskSucceed,
    doAddServiceTaskFailed,
    doUpdateServiceTaskSucceed,
    doUpdateServiceTaskFailed,
    doDeleteServiceTaskSucceed,
    doDeleteServiceTaskFailed,





} from '../../Actions/Masters/reduceActions';


function* handleAddRegions(action: any): any {
    try {
        yield call(ReduceService.create, action.payload);
        yield put(doAddRegionsSucceed(action.payload));
    }
    catch (error: any) {
        yield put(doAddRegionsFailed(error));
    }
}

function* handleUpdateRegions(action: any){
    try {
        yield call(ReduceService.update, action.payload);
        yield put(doUpdateRegionsSucceed(action.payload));
    }
    catch (error: any) {
        yield put(doUpdateRegionsFailed(error));
    }
}


function* handleDelRegions(action: any) {
    try {
         yield call(ReduceService.remove, action.payload);
        yield put(doDeleteRegionsSucceed(action.payload));
    }
    catch (error: any) {
        yield put(doDeleteRegionsFailed(error));
    }
}
function* handleRegions(): any {
    try {
        const result: any = yield call(ReduceService.getAll);
        yield put(doRegionsRequestSucceed(result.data));
    }
    catch (error: any) {
        yield put(doRegionsRequestFailed(error));
    }
}


// ===== country ================================ //
function* handleCountry(): any {
    try {
        const result: any = yield call(ReduceService.getAll2);
        yield put(doCountryRequestSucceed(result.data));
    }
    catch (error: any) {
        yield put(doCountryRequestFailed(error));
    }
}
function* handleAddCountry(action: any) {
    try {

       yield call(ReduceService.create2, action.payload);
        yield put(doAddCountrySucceed(action.payload));
    }
    catch (error: any) {
        yield put(doAddCountryFailed(error));
    }
}

function* handleUpdateCountry(action: any) {
    try {
       yield call(ReduceService.update2, action.payload);
        yield put(doUpdateCountrySucceed(action.payload));
    }
    catch (error: any) {
        yield put(doUpdateCountryFailed(error));
    }
}


function* handleDelCountry(action: any) {
    try {
        yield call(ReduceService.remove2, action.payload);
        yield put(doDeleteCountrySucceed(action.payload));
    }
    catch (error: any) {
        yield put(doDeleteCountryFailed(error));
    }
}

// ======== prov ====== //
function* handleProv(): any {
    try {
        const result: any = yield call(ReduceService.getAll3);
        yield put(doProvRequestSucceed(result.data));
    }
    catch (error: any) {
        yield put(doProvRequestFailed(error));
    }
}
function* handleAddProv(action: any): any {
    try {
        yield call(ReduceService.create3, action.payload);
        yield put(doAddProvSucceed(action.payload));
    }
    catch (error: any) {
        yield put(doAddProvFailed(error));
    }
}

function* handleUpdateProv(action: any) {
    try {
         yield call(ReduceService.update3, action);
         yield put(doUpdateProvSucceed(action));
    }
    catch (error: any) {
        yield put(doUpdateProvFailed(error));
    }
   
}


function* handleDelProv(action: any) {
    try {
       yield call(ReduceService.remove3, action.payload);
        yield put(doDeleteProvSucceed(action.payload));
    }
    catch (error: any) {
        yield put(doDeleteProvFailed(error));
    }
}

// ADDR
function* handleAddr(): any {
    try {
        const result: any = yield call(ReduceService.getAll4);
        yield put(doAddrRequestSucceed(result.data));
    }
    catch (error: any) {
        yield put(doAddrRequestFailed(error));
    }
}
function* handleAddAddr(action: any) {
    try {
        yield call(ReduceService.create4, action.payload);
        yield put(doAddAddrSucceed(action.payload));
    }
    catch (error: any) {
        yield put(doAddAddrFailed(error));
    }
}

function* handleUpdateAddr(action: any) {
    try {
       yield call(ReduceService.update4, action.payload);
        yield put(doUpdateAddrSucceed(action.payload));
    }
    catch (error: any) {
        yield put(doUpdateAddrFailed(error));
    }
}


function* handleDelAddr(action: any) {
    try {
        yield call(ReduceService.remove4, action.payload);
        yield put(doDeleteAddrSucceed(action.payload));
    }
    catch (error: any) {
        yield put(doDeleteAddrFailed(error));
    }
}

// Policy
function* handlePolicy(): any {
    try {
        const result: any = yield call(ReduceService.getAll5);
        yield put(doPolicyRequestSucceed(result.data));
    }
    catch (error: any) {
        yield put(doPolicyRequestFailed(error));
    }
}
function* handleAddPolicy(action: any): any {
    try {
        const result = yield call(ReduceService.create5, action.payload);
        yield put(doAddPolicySucceed(result.data));
    }
    catch (error: any) {
        yield put(doAddPolicyFailed(error));
    }
}

function* handleUpdatePolicy(action: any) {
    try {
         yield call(ReduceService.update5, action.payload);
        yield put(doUpdatePolicySucceed(action.payload));
    }
    catch (error: any) {
        yield put(doUpdatePolicyFailed(error));
    }
}


function* handleDelPolicy(action: any) {
    try {
    yield call(ReduceService.remove5, action.payload);
        yield put(doDeletePolicySucceed(action.payload));
    }
    catch (error: any) {
        yield put(doDeletePolicyFailed(error));
    }
}

// Cagro
function* handleCagro(): any {
    try {
        const result: any = yield call(ReduceService.getAll6);
        yield put(doCagroRequestSucceed(result.data));
    }
    catch (error: any) {
        yield put(doCagroRequestFailed(error));
    }
}
function* handleAddCagro(action: any): any {
    try {
        yield call(ReduceService.create6, action.payload);
        yield put(doAddCagroSucceed(action.payload));
    }
    catch (error: any) {
        yield put(doAddCagroFailed(error));
    }
}

function* handleUpdateCagro(action: any): any {
    try {
        yield call(ReduceService.update6, action.payload);
        yield put(doUpdateCagroSucceed(action.payload));
    }
    catch (error: any) {
        yield put(doUpdateCagroFailed(error));
    }
}


function* handleDelCagro(action: any): any {
    try {
        const result = yield call(ReduceService.remove6, action.payload);
        yield put(doDeleteCagroSucceed(action.payload));
    }
    catch (error: any) {
        yield put(doDeleteCagroFailed(error));
    }
}


// prit
function* handlePrit(): any {
    try {
        const result: any = yield call(ReduceService.getAll7);
        yield put(doPritRequestSucceed(result.data));
    }
    catch (error: any) {
        yield put(doPritRequestFailed(error));
    }
}
function* handleAddPrit(action: any):any {
    try {
        yield call(ReduceService.create7, action.payload);
        yield put(doAddPritSucceed( action.payload));
    }
    catch (error: any) {
        yield put(doAddPritFailed(error));
    }
}

function* handleUpdatePrit(action: any):any {
    try {
        yield call(ReduceService.update7, action.payload);
        yield put(doUpdatePritSucceed( action.payload));
    }
    catch (error: any) {
        yield put(doUpdatePritFailed(error));
    }
}


function* handleDelPrit(action: any)  {
    try {
       yield call(ReduceService.remove7, action.payload);
        yield put(doDeletePritSucceed(action.payload));
    }
    catch (error: any) {
        yield put(doDeletePritFailed(error));
    }
}

// SerTask
function* handleServiceTask(): any {
    try {
        const result: any = yield call(ReduceService.getAll8);
        yield put(doServiceTaskRequestSucceed(result.data));
    }
    catch (error: any) {
        yield put(doServiceTaskRequestFailed(error));
    }
}

function* handleAddServiceTask(action: any): any {
    try {
        yield call(ReduceService.create8, action.payload);
        yield put(doAddServiceTaskSucceed(action.payload));
    }
    catch (error: any) {
        yield put(doAddServiceTaskFailed(error));
    }
}

function* handleUpdateServiceTask(action: any){
    try {
       yield call(ReduceService.update8, action.payload);
        yield put(doUpdateServiceTaskSucceed( action.payload));
    }
    catch (error: any) {
        yield put(doUpdateServiceTaskFailed(error));
    }
}


function* handleDelServiceTask(action: any) {
    try {
        yield call(ReduceService.remove8, action.payload);
        yield put(doDeleteServiceTaskSucceed(action.payload));
    }
    catch (error: any) {
        yield put(doDeleteServiceTaskFailed(error));
    }
}


export {
    handleRegions,
    handleAddRegions,
    handleDelRegions,
    handleUpdateRegions,

    handleCountry,
    handleAddCountry,
    handleDelCountry,
    handleUpdateCountry,

    handleProv,
    handleAddProv,
    handleDelProv,
    handleUpdateProv,

    handleAddr,
    handleAddAddr,
    handleDelAddr,
    handleUpdateAddr,

    handlePolicy,
    handleAddPolicy,
    handleUpdatePolicy,
    handleDelPolicy,
    
    handleCagro,
    handleAddCagro,
    handleUpdateCagro,
    handleDelCagro,
    
    handlePrit,
    handleAddPrit,
    handleUpdatePrit,
    handleDelPrit,
    
    handleServiceTask,
    handleAddServiceTask,
    handleUpdateServiceTask,
    handleDelServiceTask,
}