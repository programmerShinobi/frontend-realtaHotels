import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";
import rootSaga from "../Sagas";
import usersReducers from "../Reducers/Users/usersReducer";
import HotelAdminReducer from "../Reducers/Hotels/hotelAdminReducer";
import FaciAdminReducer from "../Reducers/Hotels/faciAdminReducer";
import RoomNumberReducer from "../Reducers/Hotels/maxRoomIdReducer";
import AddrHotelReducer from "../Reducers/Hotels/addrHotelReducer";
import FaphoReducer from "../Reducers/Hotels/faphoAdminReducer";
import FaciPriceHistoryReducer from "../Reducers/Hotels/fphReducer";
import departmentReducer from "../Reducers/HumanResources/departmentReducer";
import employeeReducer from "../Reducers/HumanResources/employeeReducer";
import shiftReducer from "../Reducers/HumanResources/shiftReducer";
import jobroleReducer from "../Reducers/HumanResources/jobroleReducer";
import workorderReducer from "../Reducers/HumanResources/workorderReducer";
import bankReducer from "../Reducers/payment/bank";
import fintechReducer from "../Reducers/payment/fintech";
import transactionReducer from "../Reducers/payment/transaction";
import userAccountReducer from "../Reducers/payment/userAccount";
import HotelReducer from "../Reducers/Booking/hotelReducer";
import FaciAllHotelReducer from "../Reducers/Booking/faciAllHotelReducer";
import SpecialoffersReducer from "../Reducers/Booking/specialOffersReducer";
import OrderDetailsReducer from "../Reducers/Booking/orderDetailsReducer";
import HoreReducer from "../Reducers/Booking/horeReducer";
import PriceItemsReducer from "../Reducers/Booking/priceItemsReducer";
import BookingOrderReducer from "../Reducers/Booking/bookingOrderReducer";
import GetInvoiceReducer from "../Reducers/Booking/getInvoiceReducer";
import employeePayHistoryReducer from "../Reducers/HumanResources/employeePayHistoryReducer";
import employeeDepartmentHistoryReducer from "../Reducers/HumanResources/employeeDepartmentHistoryReducer";
import boexReducer from "../Reducers/Booking/boexReducer";
import { purchaseOrderReducers } from "../Reducers/Purchasing/purchaseOrderReducers";
import sphoReducers from "../Reducers/Purchasing/sphoReducers";
import stocksReducers from "../Reducers/Purchasing/stocksReducers";
import stodReducers from "../Reducers/Purchasing/stodReducers";
import vendorReducers from "../Reducers/Purchasing/vendorReducer";
import vendproReducers from "../Reducers/Purchasing/vendproReducers";
import workorderdetailReducer from "../Reducers/HumanResources/workorderdetailReducer";
import masterReducers from "../Reducers/Masters/masterReducer";
import ContryReducer from "redux/Reducers/Masters/CountryReducer";
import ProvincesReducer from "redux/Reducers/Masters/ProvincesReducer";
import AddrReducer from "redux/Reducers/Masters/AddrReducer";
import policyReducer from "redux/Reducers/Masters/PolicyReducer";
import PritReducer from "redux/Reducers/Masters/PritReducer";
import cagroReducer from "redux/Reducers/Masters/CagroReducer";
import serviceTaskReducer from "redux/Reducers/Masters/serviceTaskReducer";
import bookingHistoryReducer from "../Reducers/Booking/bookingHistory";
import orderMenusIdAkhirReducers from "../Reducers/Resto/orderMenusIdAkhir";
import orderDetailReducers from "../Reducers/Resto/orderDetailReducers";
import orderMenusAkhirReducers from "../Reducers/Resto/orderMenusOne";
import orderMenusReducers from "../Reducers/Resto/orderMenusReducers";
import restoCardClientReducers from "../Reducers/Resto/restoCardClientReducer";
import restoMenusPhotosUrlReducers from "../Reducers/Resto/restoMenuPhotosUrlReducers";
import restoMenusReducers from "../Reducers/Resto/restoMenusReducer";
import restoPhotosReducers from "../Reducers/Resto/restoPhotos";

const saga = createSagaMiddleware();
const reducer = combineReducers({
  //Master Reducer nya dibawah Comman masing" module
  masterReducers: masterReducers,
  ContryReducer: ContryReducer,
  ProvincesReducer: ProvincesReducer,
  AddrReducer: AddrReducer,
  policyReducer: policyReducer,
  cagroReducer: cagroReducer,
  PritReducer: PritReducer,
  serviceTaskReducer: serviceTaskReducer,

  //Users
  usersReducers: usersReducers,

  //HR
  departmentReducer,
  employeeReducer,
  shiftReducer,
  jobroleReducer,
  workorderReducer,
  workorderdetailReducer,
  employeePayHistoryReducer,
  employeeDepartmentHistoryReducer,

  //Hotels
  HotelAdminReducer,
  FaciAdminReducer,
  RoomNumberReducer,
  AddrHotelReducer,
  FaphoReducer,
  FaciPriceHistoryReducer,

  //Booking
  HotelReducer,
  FaciAllHotelReducer,
  HoreReducer,
  SpecialoffersReducer,
  OrderDetailsReducer,
  PriceItemsReducer,
  BookingOrderReducer,
  GetInvoiceReducer,
  boexReducer,
  bookingHistoryReducer,

  //Resto
  orderDetailReducers,
  orderMenusIdAkhirReducers,
  orderMenusAkhirReducers,
  orderMenusReducers,
  restoCardClientReducers,
  restoMenusPhotosUrlReducers,
  restoMenusReducers,
  restoPhotosReducers,

  //Payment
  transactionReducer,
  bankReducer,
  userAccountReducer,
  fintechReducer,

  //Purchase
  vendorReducers: vendorReducers,
  purchaseOrderReducers: purchaseOrderReducers,
  vendproReducers: vendproReducers,
  stocksReducers: stocksReducers,
  sphoReducers: sphoReducers,
  stodReducers: stodReducers,
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(saga),
});
saga.run(rootSaga);

export default store;
