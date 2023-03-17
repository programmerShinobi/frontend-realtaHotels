import { call, put } from "redux-saga/effects";
import ReduceService from "@/redux/Services/Users/reduceService";
import { doAddBonusPointsFailed, doAddBonusPointsSucceed, doAddMembersFailed, doAddMembersSucceed, doAddRolesFailed, doAddRolesSucceed, doAddUsersFailed, doAddUsersSucceed, doBonusPointRequestFailed, doBonusPointRequestSucceed, doBonusPointsRequestFailed, doBonusPointsRequestSucceed, doChangePasswordFailed, doChangePasswordSucceed, doDeleteBonusPointsFailed, doDeleteBonusPointsSucceed, doDeleteMembersFailed, doDeleteMembersSucceed, doDeleteRolesFailed, doDeleteRolesSucceed, doDeleteUsersFailed, doDeleteUsersSucceed, doForgotPasswordFailed, doForgotPasswordSucceed, doLoginFailed, doLoginSucceed, doMemberRequestFailed, doMemberRequestSucceed, doMembersRequestFailed, doMembersRequestSucceed, doRegisterFailed, doRegisterGuestFailed, doRegisterGuestSucceed, doRegisterSucceed, doRoleRequestFailed, doRoleRequestSucceed, doRolesRequestFailed, doRolesRequestSucceed, doUpdateBonusPointsFailed, doUpdateBonusPointsSucceed, doUpdateMembersFailed, doUpdateMembersSucceed, doUpdatePhotoUsersFailed, doUpdatePhotoUsersSucceed, doUpdateRolesFailed, doUpdateRolesSucceed, doUpdateUsersFailed, doUpdateUsersSucceed, doUserRequestFailed, doUserRequestSucceed, doUsersRequestFailed, doUsersRequestSucceed } from "@/redux/Actions/Users/reduceActions";

// USERS
function* handleUsers(): any {
    try {
        const result: any = yield call(ReduceService.getAll);
        yield put(doUsersRequestSucceed(result.data));
    }
    catch (error: any) {
        yield put(doUsersRequestFailed(error));
    }
}

function* handleUser(action: any): any {
    try {
        const result = yield call(ReduceService.getId, action.payload);
        yield put(doUserRequestSucceed(result.data));
    }
    catch (error: any) {
        yield put(doUserRequestFailed(error));
    }
}

function* handleAddUsers(action: any): any {
    try {
        const result = yield call(ReduceService.create, action.payload);
        yield put(doAddUsersSucceed(result.data));
    }
    catch (error: any) {
        yield put(doAddUsersFailed(error));
    }
}

function* handleUpdateUsers(action: any): any {
    try {
        const result = yield call(ReduceService.update, action.payload);
        yield put(doUpdateUsersSucceed(result));
    }
    catch (error: any) {
        yield put(doUpdateUsersFailed(error));
    }
}

function* handleUpdatePhotoUsers(action: any): any {
    try {
        const result = yield call(ReduceService.updatePhoto, action.payload);
        yield put(doUpdatePhotoUsersSucceed(result));
    }
    catch (error) {
        yield put(doUpdatePhotoUsersFailed(error));
    }
}

function* handleDelUsers(action: any): any {
    try {
        const result = yield call(ReduceService.remove, action.payload);
        yield put(doDeleteUsersSucceed(action.payload));
    }
    catch (error: any) {
        yield put(doDeleteUsersFailed(error));
    }
}

// AUTH
function* handleLoginUsers(action: any): any {
    try {
        const result = yield call(ReduceService.login, action.payload);
        yield put(doLoginSucceed(result.data));
    }
    catch (error) {
        yield put(doLoginFailed(error));
    }
}

function* handleRegisterUsers(action: any): any {
    try {
        const result = yield call(ReduceService.register, action.payload);
        yield put(doRegisterSucceed(result.data));
    }
    catch (error: any) {
        yield put(doRegisterFailed(error));
    }
}

function* handleRegisterUsersGuest(action: any): any {
    try {
        const result = yield call(ReduceService.registerGuest, action.payload);
        yield put(doRegisterGuestSucceed(result.data));
    }
    catch (error: any) {
        yield put(doRegisterGuestFailed(error));
    }
}

// ROLES
function* handleRoles(): any {
    try {
        const result: any = yield call(ReduceService.getAllRoles);
        yield put(doRolesRequestSucceed(result.data));
    }
    catch (error: any) {
        yield put(doRolesRequestFailed(error));
    }
}

function* handleRole(action: any): any {
    try {
        const result = yield call(ReduceService.getIdRole, action.payload);
        yield put(doRoleRequestSucceed(result.data));
    }
    catch (error: any) {
        yield put(doRoleRequestFailed(error));
    }
}

function* handleAddRoles(action: any): any {
    try {
        const result = yield call(ReduceService.createRole, action.payload);
        yield put(doAddRolesSucceed(result.data));
    }
    catch (error: any) {
        yield put(doAddRolesFailed(error));
    }
}

function* handleUpdateRoles(action: any): any {
    try {
        const result = yield call(ReduceService.updateRole, action.payload);
        yield put(doUpdateRolesSucceed(result));
    }
    catch (error: any) {
        yield put(doUpdateRolesFailed(error));
    }
}

function* handleDelRoles(action: any): any {
    try {
        const result = yield call(ReduceService.removeRole, action.payload);
        yield put(doDeleteRolesSucceed(action.payload));
    }
    catch (error: any) {
        yield put(doDeleteRolesFailed(error));
    }
}

function* handleChangePassword(action: any): any {
    try {
        const result = yield call(ReduceService.changePassword, action.payload);
        yield put(doChangePasswordSucceed(result));
    }
    catch (error: any) {
        yield put(doChangePasswordFailed(error));
    }
}

// MEMBERS
function* handleMembers(): any {
    try {
        const result: any = yield call(ReduceService.getAllMembers);
        yield put(doMembersRequestSucceed(result.data));
    }
    catch (error: any) {
        yield put(doMembersRequestFailed(error));
    }
}

function* handleMember(action: any): any {
    try {
        const result = yield call(ReduceService.getIdMember, action.payload);
        yield put(doMemberRequestSucceed(result.data));
    }
    catch (error: any) {
        yield put(doMemberRequestFailed(error));
    }
}

function* handleAddMembers(action: any): any {
    try {
        const result = yield call(ReduceService.createMember, action.payload);
        yield put(doAddMembersSucceed(result.data));
    }
    catch (error: any) {
        yield put(doAddMembersFailed(error));
    }
}

function* handleUpdateMembers(action: any): any {
    try {
        const result = yield call(ReduceService.updateMember, action.payload);
        yield put(doUpdateMembersSucceed(result));
    }
    catch (error: any) {
        yield put(doUpdateMembersFailed(error));
    }
}

function* handleDelMembers(action: any): any {
    try {
        const result = yield call(ReduceService.removeMember, action.payload);
        yield put(doDeleteMembersSucceed(action.payload));
    }
    catch (error: any) {
        yield put(doDeleteMembersFailed(error));
    }
}

// BONUSPOINTS
function* handleBonusPoints(): any {
    try {
        const result: any = yield call(ReduceService.getAllBonusPoints);
        yield put(doBonusPointsRequestSucceed(result.data));
    }
    catch (error: any) {
        yield put(doBonusPointsRequestFailed(error));
    }
}

function* handleBonusPoint(action: any): any {
    try {
        const result = yield call(ReduceService.getIdBonusPoint, action.payload);
        yield put(doBonusPointRequestSucceed(result.data));
    }
    catch (error: any) {
        yield put(doBonusPointRequestFailed(error));
    }
}

function* handleAddBonusPoints(action: any): any {
    try {
        const result = yield call(ReduceService.createBonusPoint, action.payload);
        yield put(doAddBonusPointsSucceed(result.data));
    }
    catch (error: any) {
        yield put(doAddBonusPointsFailed(error));
    }
}

function* handleUpdateBonusPoints(action: any): any {
    try {
        const result = yield call(ReduceService.updateBonusPoint, action.payload);
        yield put(doUpdateBonusPointsSucceed(result));
    }
    catch (error: any) {
        yield put(doUpdateBonusPointsFailed(error));
    }
}

function* handleDelBonusPoints(action: any): any {
    try {
        const result = yield call(ReduceService.removeBonusPoint, action.payload);
        yield put(doDeleteBonusPointsSucceed(action.payload));
    }
    catch (error: any) {
        yield put(doDeleteBonusPointsFailed(error));
    }
}

function* handleForgotPassword(action: any): any {
    try {
        const result = yield call(ReduceService.forgotPassword, action.payload);
        yield put(doForgotPasswordSucceed(result));
    }
    catch (error: any) {
        yield put(doForgotPasswordFailed(error));
    }
}

export {
    handleUsers,
    handleUser,
    handleAddUsers,
    handleDelUsers,
    handleUpdateUsers,
    handleUpdatePhotoUsers,
    handleLoginUsers,
    handleRegisterUsers,
    handleRegisterUsersGuest,
    handleRoles,
    handleRole,
    handleAddRoles,
    handleUpdateRoles,
    handleDelRoles,
    handleChangePassword,
    handleMembers,
    handleMember,
    handleAddMembers,
    handleUpdateMembers,
    handleDelMembers,
    handleBonusPoints,
    handleBonusPoint,
    handleAddBonusPoints,
    handleUpdateBonusPoints,
    handleDelBonusPoints,
    handleForgotPassword
}