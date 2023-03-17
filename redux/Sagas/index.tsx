import { all, takeEvery } from "redux-saga/effects";
import ActionType from "../Constant/Users/ActionType";
import {
    handleAddBonusPoints,
    handleAddMembers,
    handleAddRoles,
    handleAddUsers,
    handleBonusPoint,
    handleBonusPoints,
    handleChangePassword,
    handleDelBonusPoints,
    handleDelMembers,
    handleDelRoles,
    handleDelUsers,
    handleForgotPassword,
    handleLoginUsers,
    handleMember,
    handleMembers,
    handleRegisterUsers,
    handleRegisterUsersGuest,
    handleRole,
    handleRoles,
    handleUpdateBonusPoints,
    handleUpdateMembers,
    handleUpdatePhotoUsers,
    handleUpdateRoles,
    handleUpdateUsers,
    handleUser,
    handleUsers
} from "./Users/usersSaga";

import ActionTypeHr from "../Constant/HumanResources/HrActionType";
import ActionTypesBO from "../Constant/Booking/actionType";
import { handleAddDepartment, handleDeleteDepartment, handleDepartment, handleDepartments, handleUpdateDepartment } from "./HumanResources/departmentSaga";
import { handleAddEmployee, handleDeleteEmployee, handleEmployee, handleEmployees, handleUpdateEmployee } from "./HumanResources/employeeSaga";
import { handleShifts } from "./HumanResources/shiftSaga";
import { handleJobroles } from "./HumanResources/jobroleSaga";
import { handleAddWorkorder, handleDeleteWorkorder, handleWorkorder, handleWorkorders, handleUpdateWorkorder } from "./HumanResources/workorderSaga";

import ActionTypes from "../Constant/Hotels/actionType";
import {
    handlerGetFaciAdmin,
    handlerGetMaxIdRoom,
    handlerInsertFaciAdmin,
    handlerDeleteFaci,
    handlerUpdateFaci,
} from "./Hotels/faciAdminSaga";
import { handlerFapho, handlerUploadFapho } from "./Hotels/faphoAdminSaga";
import { handlerFPH } from "./Hotels/fphSaga";
import { handlerDeleteHotel, handlerHotelAddr, handlerHotelAdmin, handlerInsertHotel, handlerUpdateHotel } from "./Hotels/hotelAdminSaga";
import { handelSpecialOffers } from "./Booking/specialOffersSaga";
import { handelPriceItems } from "./Booking/priceItemsSaga";
import { handelOrderDetails } from "./Booking/orderDetailsSaga";
import { handleAddBo } from "./Booking/bookingOrderSaga";
import { handleInvoice } from "./Booking/getInvoiceSaga";
import { handlerCardHotel } from "./Booking/hotelSaga";
import { handlerFaciAllHotel } from "./Booking/faciAllHotelSaga";
import { handlerHore } from "./Booking/horeSaga";
import { handleAddEmployeePayHistory, handleDeleteEmployeePayHistory, handleEmployeePayHistory, handleEmployeePayHistorys, handleUpdateEmployeePayHistory } from "./HumanResources/employeePayHistorySaga";
import { handleAddEmployeeDepartmentHistory, handleDeleteEmployeeDepartmentHistory, handleEmployeeDepartmentHistory, handleEmployeeDepartmentHistorys, handleUpdateEmployeeDepartmentHistory } from "./HumanResources/employeeDepartmentHistorySaga";
import { DELETE_BANK, FETCH_BANKS, INSERT_BANK, UPDATE_BANK } from "../Constant/payment/bank";
import { FETCH_TRANSACTIONS, CREATE_TRANSACTION } from "../Constant/payment/transaction";
import { FETCH_FINTECH, UPDATE_FINTECH, INSERT_FINTECH, DELETE_FINTECH } from "../Constant/payment/fintech";
import { FETCH_ACCOUNTS, FETCH_ACCOUNT, CREATE_ACCOUNT, DELETE_ACCOUNT, UPDATE_ACCOUNT, CHECK_SECURED_KEY } from "../Constant/payment/userAccount";
import { deleteBank, fetchBanks, insertBank, updateBank } from "./payment/bank";
import { fetchFintech, updateFintech, insertFintech, deleteFintech } from "./payment/fintech";
import { fetchTransactions, createTransaction } from "./payment/transaction";
import { fetchUserAccounts, fetchUserAccountBy, createUserAccount, deleteUserAccount, updateUserAccount, checkSecuredKey } from "./payment/userAccount";
import { handleAddBoex } from "./Booking/boexSaga";
import purchasingTypes from "../Constant/Purchasing/purchasingTypes";
import { handleGetPurchaseOrderDetail } from "./Purchasing/poDetailSaga";
import { handleInsertPurchaseOrder, handleGetPurchaseOrder, handleEditPurchaseOrder } from "./Purchasing/purchaseOrderSaga";
import { handleAddStockPhoto, handleGetStockPhoto, handleGetStockPhotoDashboard } from "./Purchasing/sphoSaga";
import { handleGetStocks, handleAddStocks, handleUpdateStocks } from "./Purchasing/stocksSaga";
import { handleGetStockDetail, handleGetFaciNameAndId, handleUpdateStockDetail } from "./Purchasing/stodSaga";
import { handleAddVendor, handleGetVendor, handleUpdateVendor, handleDeleteVendor } from "./Purchasing/vendorSaga";
import { handleVenproRequest, handleAddVendorProduct } from "./Purchasing/vendproSaga";
import { handleAddWorkorderdetail, handleDeleteWorkorderdetail, handleUpdateWorkorderdetail, handleWorkorderdetail, handleWorkorderdetails } from "./HumanResources/workorderdetailSaga";
import ActionMasterType from "../Constant/Masters/ActionType";
import { handleServiceTask } from "./Masters/regionsSaga";
import { handelHistory, handelupdateHistory } from "./Booking/bookingHistorySaga";
import ActionTypeResto from "../Constant/Resto/ActionType";
import { handeleOrderMenusOneAkhir, handleAddOrderDetail, handleAddOrderMenus, handleCreateRestoMenus, handleDeleteRestomenus, handleOrderMenus, handleOrderMenusIdAkhir, handleRestoMenu, handleRestoMenus, handleRestoMenusCard, handleRestoMenusPhotosUrl, handleUpdateRestoMenus } from "./Resto/restoMenusSaga";

function* watchAll(): any {
    yield all([
        //Master Reducer nya dibawah Comman masing" module
        takeEvery(ActionMasterType.GET_SERVICETASK, handleServiceTask),
          
        //USERS
        /* USERS */
        takeEvery(ActionType.GET_USERS, handleUsers),
        takeEvery(ActionType.GET_USER, handleUser),
        takeEvery(ActionType.ADD_USERS, handleAddUsers),
        takeEvery(ActionType.UPDATE_USERS, handleUpdateUsers),
        takeEvery(ActionType.UPDATE_PHOTO_USERS, handleUpdatePhotoUsers),
        takeEvery(ActionType.DEL_USERS, handleDelUsers),
        takeEvery(ActionType.CHANGE_PASSWORD, handleChangePassword),
        /* AUTH */
        takeEvery(ActionType.LOGIN, handleLoginUsers),
        takeEvery(ActionType.REGISTER, handleRegisterUsers),
        takeEvery(ActionType.REGISTER_GUEST, handleRegisterUsersGuest),
        takeEvery(ActionType.FORGOT_PASSWORD, handleForgotPassword),
        /* ROLES */
        takeEvery(ActionType.GET_ROLES, handleRoles),
        takeEvery(ActionType.GET_ROLE, handleRole),
        takeEvery(ActionType.ADD_ROLES, handleAddRoles),
        takeEvery(ActionType.UPDATE_ROLES, handleUpdateRoles),
        takeEvery(ActionType.DEL_ROLES, handleDelRoles),
        
        /* MEMBERS */
        takeEvery(ActionType.GET_MEMBERS, handleMembers),
        takeEvery(ActionType.GET_MEMBER, handleMember),
        takeEvery(ActionType.ADD_MEMBERS, handleAddMembers),
        takeEvery(ActionType.UPDATE_MEMBERS, handleUpdateMembers),
        takeEvery(ActionType.DEL_MEMBERS, handleDelMembers),
        /* BONUSPOINTS */
        takeEvery(ActionType.GET_BONUSPOINTS, handleBonusPoints),
        takeEvery(ActionType.GET_BONUSPOINT, handleBonusPoint),
        takeEvery(ActionType.ADD_BONUSPOINTS, handleAddBonusPoints),
        takeEvery(ActionType.UPDATE_BONUSPOINTS, handleUpdateBonusPoints),
        takeEvery(ActionType.DEL_BONUSPOINTS, handleDelBonusPoints),

        //HR
        /* Department */
        takeEvery(ActionTypeHr.GET_DEPARTMENTS, handleDepartments),
        takeEvery(ActionTypeHr.GET_DEPARTMENT, handleDepartment),
        takeEvery(ActionTypeHr.ADD_DEPARTMENT, handleAddDepartment),
        takeEvery(ActionTypeHr.UPDATE_DEPARTMENT, handleUpdateDepartment),
        takeEvery(ActionTypeHr.DELETE_DEPARTMENT, handleDeleteDepartment),

        /* Employee */
        takeEvery(ActionTypeHr.GET_EMPLOYEES, handleEmployees),
        takeEvery(ActionTypeHr.GET_EMPLOYEE, handleEmployee),
        takeEvery(ActionTypeHr.ADD_EMPLOYEE, handleAddEmployee),
        takeEvery(ActionTypeHr.UPDATE_EMPLOYEE, handleUpdateEmployee),
        takeEvery(ActionTypeHr.DELETE_EMPLOYEE, handleDeleteEmployee),

        /* EmployeePayHistory */
        takeEvery(ActionTypeHr.GET_EMPLOYEEPAYHISTORYS, handleEmployeePayHistorys),
        takeEvery(ActionTypeHr.GET_EMPLOYEEPAYHISTORY, handleEmployeePayHistory),
        takeEvery(ActionTypeHr.ADD_EMPLOYEEPAYHISTORY, handleAddEmployeePayHistory),
        takeEvery(ActionTypeHr.UPDATE_EMPLOYEEPAYHISTORY, handleUpdateEmployeePayHistory),
        takeEvery(ActionTypeHr.DELETE_EMPLOYEEPAYHISTORY, handleDeleteEmployeePayHistory),

        /* EmployeeDepartmentHistory */
        takeEvery(ActionTypeHr.GET_EMPLOYEEDEPARTMENTHISTORYS, handleEmployeeDepartmentHistorys),
        takeEvery(ActionTypeHr.GET_EMPLOYEEDEPARTMENTHISTORY, handleEmployeeDepartmentHistory),
        takeEvery(ActionTypeHr.ADD_EMPLOYEEDEPARTMENTHISTORY, handleAddEmployeeDepartmentHistory),
        takeEvery(ActionTypeHr.UPDATE_EMPLOYEEDEPARTMENTHISTORY, handleUpdateEmployeeDepartmentHistory),
        takeEvery(ActionTypeHr.DELETE_EMPLOYEEDEPARTMENTHISTORY, handleDeleteEmployeeDepartmentHistory),

        /* Shift */
        takeEvery(ActionTypeHr.GET_SHIFTS, handleShifts),

        /* Jobrole */
        takeEvery(ActionTypeHr.GET_JOBROLES, handleJobroles),

        /* Workorder */
        takeEvery(ActionTypeHr.GET_WORKORDERS, handleWorkorders),
        takeEvery(ActionTypeHr.GET_WORKORDER, handleWorkorder),
        takeEvery(ActionTypeHr.ADD_WORKORDER, handleAddWorkorder),
        takeEvery(ActionTypeHr.UPDATE_WORKORDER, handleUpdateWorkorder),
        takeEvery(ActionTypeHr.DELETE_WORKORDER, handleDeleteWorkorder),

        /* Workorderdetail */
        takeEvery(ActionTypeHr.GET_WORKORDERDETAILS, handleWorkorderdetails),
        takeEvery(ActionTypeHr.GET_WORKORDERDETAIL, handleWorkorderdetail),
        takeEvery(ActionTypeHr.ADD_WORKORDERDETAIL, handleAddWorkorderdetail),
        takeEvery(ActionTypeHr.UPDATE_WORKORDERDETAIL, handleUpdateWorkorderdetail),
        takeEvery(ActionTypeHr.DELETE_WORKORDERDETAIL, handleDeleteWorkorderdetail),

        //Hotels
        takeEvery(ActionTypes.GET_HOTELADMIN, handlerHotelAdmin),
        takeEvery(ActionTypes.ADD_HOTELADMIN, handlerInsertHotel),
        takeEvery(ActionTypes.DEL_HOTELADMIN, handlerDeleteHotel),
        takeEvery(ActionTypes.UPDATE_HOTELADMIN, handlerUpdateHotel),
        takeEvery(ActionTypes.GET_FACIADMIN, handlerGetFaciAdmin),
        takeEvery(ActionTypes.GET_MAXIDROOM, handlerGetMaxIdRoom),
        takeEvery(ActionTypes.ADD_FACIADMIN, handlerInsertFaciAdmin),
        takeEvery(ActionTypes.GET_ADDRSEARCH, handlerHotelAddr),
        takeEvery(ActionTypes.DEL_FACI, handlerDeleteFaci),
        takeEvery(ActionTypes.GET_FAPHO, handlerFapho),
        takeEvery(ActionTypes.GET_FACIPRICEHISTORY, handlerFPH),
        takeEvery(ActionTypes.UPDATE_FACI, handlerUpdateFaci),
        takeEvery(ActionTypes.UPLOAD_FAPHO, handlerUploadFapho),

        //Booking
        takeEvery(ActionTypesBO.GET_CARDHOTEL, handlerCardHotel),
        takeEvery(ActionTypesBO.GET_FACIALLHOTEL, handlerFaciAllHotel),
        takeEvery(ActionTypesBO.GET_HORE, handlerHore),
        takeEvery(ActionTypesBO.GET_SPECIAL_OFFERS,handelSpecialOffers),
        takeEvery(ActionTypesBO.GET_PRICE_ITEMS,handelPriceItems),
        takeEvery(ActionTypesBO.GET_ORDER_DETAILS,handelOrderDetails),
        takeEvery(ActionTypesBO.ADD_BOOKING_ORDER,handleAddBo),
        takeEvery(ActionTypesBO.GET_INVOICE,handleInvoice),
        takeEvery(ActionTypesBO.ADD_BOEX,handleAddBoex),
        takeEvery(ActionTypesBO.GET_HISTORY_BOOKING,handelHistory),
        takeEvery(ActionTypesBO.UPDATE_STATUS_BOOKING,handelupdateHistory),
        //Resto
        takeEvery(ActionTypeResto.GET_AKHIR_ORDER_MENUS, handeleOrderMenusOneAkhir),
        takeEvery(ActionTypeResto.GET_CARDRESTOMENUS, handleRestoMenusCard),
        takeEvery(ActionTypeResto.GET_ORDER_MENUS, handleOrderMenus),
        takeEvery(ActionTypeResto.GET_RESTOMENUS, handleRestoMenus),

        takeEvery(ActionTypeResto.GET_URL_PHOTOS, handleRestoMenusPhotosUrl),
        takeEvery(ActionTypeResto.GET_RESTOMENU, handleRestoMenu),
        takeEvery(ActionTypeResto.UPDATE_RESTOMENUS, handleUpdateRestoMenus),
        takeEvery(ActionTypeResto.DEL_RESTOMENUS, handleDeleteRestomenus),

        takeEvery(ActionTypeResto.ADD_ORDER_DETAIL, handleAddOrderDetail),
        takeEvery(ActionTypeResto.ADD_RESTOMENUS, handleCreateRestoMenus),
        takeEvery(ActionTypeResto.ADD_ORDER_MENUS, handleAddOrderMenus),
        // takeEvery(ActionTypeResto.ADD_FOTO_RESTO_MENUS, handlePhotoMenus),

        takeEvery(ActionTypeResto.GET_ID_AKHIR_ORDER_MENUS, handleOrderMenusIdAkhir),

        //Payment
        takeEvery(FETCH_BANKS, fetchBanks),
        takeEvery(UPDATE_BANK, updateBank),
        takeEvery(INSERT_BANK, insertBank),
        takeEvery(DELETE_BANK, deleteBank),
        takeEvery(FETCH_FINTECH, fetchFintech),
        takeEvery(UPDATE_FINTECH, updateFintech),
        takeEvery(INSERT_FINTECH, insertFintech),
        takeEvery(DELETE_FINTECH, deleteFintech),
        takeEvery(FETCH_TRANSACTIONS, fetchTransactions),
        takeEvery(CREATE_TRANSACTION, createTransaction),
        takeEvery(FETCH_ACCOUNTS, fetchUserAccounts),
        takeEvery(FETCH_ACCOUNT, fetchUserAccountBy),
        takeEvery(CREATE_ACCOUNT, createUserAccount),
        takeEvery(DELETE_ACCOUNT, deleteUserAccount),
        takeEvery(UPDATE_ACCOUNT, updateUserAccount),
        takeEvery(CHECK_SECURED_KEY, checkSecuredKey),

        //Purchase
        takeEvery(purchasingTypes.ADD_VENDOR, handleAddVendor),
        takeEvery(purchasingTypes.GET_VENDORS, handleGetVendor),
        takeEvery(purchasingTypes.UPDATE_VENDOR, handleUpdateVendor),
        takeEvery(purchasingTypes.GET_VENDPRO, handleVenproRequest),
        takeEvery(purchasingTypes.ADD_VENDPRO, handleAddVendorProduct),
        takeEvery(purchasingTypes.DELETE_VENDOR, handleDeleteVendor),
        takeEvery(purchasingTypes.GET_STOCK, handleGetStocks),
        takeEvery(purchasingTypes.ADD_STOCK, handleAddStocks),
        takeEvery(purchasingTypes.UPDATE_STOCK, handleUpdateStocks),
        takeEvery(purchasingTypes.GET_STOCK_PHOTO, handleGetStockPhoto),
        takeEvery(purchasingTypes.GET_STOCK_PHOTO_DASHBOARD, handleGetStockPhotoDashboard),
        takeEvery(purchasingTypes.ADD_STOCK_PHOTO, handleAddStockPhoto),
        takeEvery(purchasingTypes.GET_STOCK_DETAIL, handleGetStockDetail),
        takeEvery(purchasingTypes.GET_FACI_NAME_AND_ID, handleGetFaciNameAndId),
        takeEvery(purchasingTypes.EDIT_STOCK_DETAIL, handleUpdateStockDetail),
        takeEvery(purchasingTypes.ADD_PURCHASE_ORDER, handleInsertPurchaseOrder),
        takeEvery(purchasingTypes.GET_PURCHASE_ORDER, handleGetPurchaseOrder),
        takeEvery(purchasingTypes.EDIT_PURCHASE_ORDER, handleEditPurchaseOrder),
        takeEvery(purchasingTypes.GET_PURCHASE_ORDER_DETAIL, handleGetPurchaseOrderDetail)
    ])
}

export default watchAll