import LayoutAdmin from '@/components/Layout/admin/'
import {
  doGetPhotoDashboard,
  doGetStockPhoto,
} from "@/redux/Actions/Purchasing/sphoActions";
import { Button, Card, Col, Divider, Input, Row, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { DeleteOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { doInsertOrderHeader } from "@/redux/Actions/Purchasing/purchaseOrderActions";
const { Search } = Input;
const { Meta } = Card;
const index = () => {
  const dispatch = useDispatch();
  //selector for getStockPhoto
  const { stockPhotos } = useSelector((state: any) => state.sphoReducers);

  //Use useEffect To Get data From backEnd
  useEffect(() => {
    dispatch(doGetPhotoDashboard());
  }, []);
  //Hook For Stock Ordered
  const [stockOrder1, setStockOrder1] = useState({
    vendors: [],
    subtotal: 0,
    tax: 0,
    total: 0,
  });
  const [stockOrder, setStockOrder] = useState([]);
  const [dataSearch, setDataSearch] = useState([]);
  const [disabledButton, setDisabledButton] = useState(true);
  const [cursorType, setCursorType] = useState("bg-gray-500 cursor-not-allowed hover:bg-gray-500");
  const [messageApi, contextHolder] = message.useMessage()

  useEffect(()=>{
    if(stockOrder1.vendors.length != 0){
      setDisabledButton(false)
      setCursorType('bg-[#3C6FF3] cursor-pointer')
    }else{
      setDisabledButton(false)
      setCursorType('bg-gray-500 cursor-not-allowed hover:bg-gray-500')
    }
  },[stockOrder1,disabledButton,cursorType])
  //Add To Cart
  const addToCart = (value: any) => {
    const quantities = 1;
    const money: string = value.stockprice?.split(",")[0];
    const toInteger = parseInt(money?.replace(/[^0-9]/g, ""));
    const newValues = {
      vendorId: value.vendorid,
      vendorName: value.vendorname,
      stocksId: value.stocksid,
      stockName: value.stockname,
      quantity: quantities,
      stockPrice: toInteger,
      stockLineTotal: quantities * toInteger,
    };

    const vendorExist = stockOrder1.vendors.findIndex(
      (item: any) => item.vendorid === newValues.vendorId
    );
    console.log(vendorExist);
    if (vendorExist !== -1) {
      const updatedVendor = stockOrder1.vendors[vendorExist];
      const existingStock = updatedVendor.orderbyvendor.findIndex(
        (item: any) => item.stocksId === newValues.stocksId
      );
      if (existingStock !== -1) {
        const updatedStocks = { ...updatedVendor };
        const subtotals = newValues.stockPrice * quantities;
        const taxes = subtotals * 0.1;
        updatedStocks.orderbyvendor[existingStock].stockQuantity += quantities;
        updatedStocks.orderbyvendor[existingStock].stockLinetotal +=
          newValues.stockLineTotal;
        newValues.stockPrice;
        updatedStocks.subTotalbyVendor += toInteger * quantities;
        updatedStocks.taxbyVendor += toInteger * quantities * 0.1;
        updatedStocks.totalbyvendor += toInteger * quantities * 1.1;

        const updatedVendors = [...stockOrder1.vendors];
        updatedVendors[vendorExist] = updatedStocks;
        setStockOrder1({
          vendors: updatedVendors,
          subtotal: stockOrder1.subtotal + subtotals,
          tax: stockOrder1.tax + taxes,
          total: stockOrder1.total + taxes + subtotals,
        });
        console.log(stockOrder1);
      } else {
        const updatedStocks = { ...updatedVendor };
        const subtotalbyvendor = newValues.stockPrice * newValues.quantity;
        const taxes = subtotalbyvendor * 0.1;
        updatedStocks.orderbyvendor.push({
          stocksId: newValues.stocksId,
          stockName: newValues.stockName,
          stockQuantity: newValues.quantity,
          stockPrice: newValues.stockPrice,
          stockLinetotal: newValues.stockLineTotal,
        });
        updatedStocks.subTotalbyVendor += subtotalbyvendor;
        updatedStocks.taxbyVendor += taxes;
        updatedStocks.totalbyvendor += subtotalbyvendor + taxes;

        const updatedVendors = [...stockOrder1.vendors];
        updatedVendors[vendorExist] = updatedStocks;

        setStockOrder1({
          vendors: updatedVendors,
          subtotal: stockOrder1.subtotal + newValues.stockPrice,
          tax: stockOrder1.tax + taxes,
          total: stockOrder1.total + taxes + subtotalbyvendor,
        });
      }
    } else {
      const subtotalbyvendor = newValues.stockPrice * quantities;
      const taxesByVendor = subtotalbyvendor * 0.1;
      const newVendor = {
        vendorid: newValues.vendorId,
        vendorname: newValues.vendorName,
        orderbyvendor: [
          {
            stocksId: newValues.stocksId,
            stockName: newValues.stockName,
            stockQuantity: newValues.quantity,
            stockPrice: newValues.stockPrice,
            stockLinetotal: newValues.stockLineTotal,
          },
        ],
        subTotalbyVendor: subtotalbyvendor,
        taxbyVendor: taxesByVendor,
        totalbyvendor: taxesByVendor + subtotalbyvendor,
      };
      setStockOrder1({
        vendors: [...stockOrder1.vendors, newVendor],
        subtotal: stockOrder1.subtotal + newValues.stockPrice,
        tax: stockOrder1.tax + taxesByVendor,
        total: stockOrder1.total + taxesByVendor + subtotalbyvendor,
      });
      console.log(stockOrder1);
    }
  };

  // to Make The Minimum Input is 1
  const inputParser = (value: any) => {
    if (value < 1) {
      return 1;
    } else {
      return value;
    }
  };

  //Event Handler For Increase Or Decrease Quantity
  const eventHandler = (vendorIndex: any, stockIndex: any, event: any) => {
    const newQuantity = parseInt(event.target.value);
    const vendor = stockOrder1.vendors[vendorIndex];
    const stocks = vendor.orderbyvendor[stockIndex];
    const prevQuantity = stocks.stockQuantity;
    const diff = newQuantity - prevQuantity;

    setStockOrder1((prevStockOrder: any) => {
      const updatedVendor = [...prevStockOrder.vendors];
      const updatedStocks = { ...vendor };
      const stockprice = stocks.stockPrice;
      const subtotal = diff * stockprice;
      const taxes = subtotal * 0.1;
      updatedStocks.orderbyvendor[stockIndex].stockQuantity = newQuantity;
      updatedStocks.orderbyvendor[stockIndex].stockLinetotal =
        newQuantity * stockprice;
      updatedStocks.subTotalbyVendor += subtotal;
      updatedStocks.taxbyVendor += taxes;
      updatedStocks.totalbyvendor += subtotal + taxes;
      updatedVendor[vendorIndex] = updatedStocks;
      return {
        ...prevStockOrder,
        vendors: updatedVendor,
        subtotal: prevStockOrder.subtotal + subtotal,
        tax: prevStockOrder.tax + taxes,
        total: prevStockOrder.total + taxes + subtotal,
      };
    });
  };

  //Delete Button For Stocks In Cart
  const deleteStocks = (vendorIndex: number, stockIndex: number) => {
    const vendor = stockOrder1.vendors[vendorIndex];
    const stocks = vendor.orderbyvendor[stockIndex];
    const price = stocks.stockPrice * stocks.stockQuantity;
    console.log(stocks.stockPrice, stocks.stockQuantity);
    const newSubtotal = stockOrder1.subtotal - price;
    const newTax = newSubtotal * 0.1;
    const newTotal = newSubtotal + newTax;

    const updatedVendor = { ...vendor };
    updatedVendor.orderbyvendor.splice(stockIndex, 1);
    updatedVendor.subTotalbyVendor -= price;
    updatedVendor.taxbyVendor = updatedVendor.subTotalbyVendor * 0.1;
    updatedVendor.totalbyvendor =
      updatedVendor.subTotalbyVendor + updatedVendor.taxbyVendor;

    const updatedVendors = [...stockOrder1.vendors];
    updatedVendors[vendorIndex] = updatedVendor;

    if (updatedVendors[vendorIndex].orderbyvendor.length === 0) {
      updatedVendors.splice(vendorIndex, 1);
    }

    setStockOrder1({
      vendors: updatedVendors,
      subtotal: newSubtotal,
      tax: newTax,
      total: newTotal,
    });
  };

  //OnSearch For Product
  const onSearch = (value: any) => {
    const filteredProduct = stockPhotos.filter((product: any) =>
      product.stockname.toLowerCase().includes(value.toLowerCase())
    );
    setDataSearch(filteredProduct);
  };

  const onSubmit = (value: any) => {
    console.log(value);
    const submitedValue = stockOrder;
    for (let i in value.vendors) {
      const quantity = value.vendors[i].orderbyvendor.map(
        (items: any, index: any) => {
          return items.stockQuantity;
        }
      );
      const price = value.vendors[i].orderbyvendor.map(
        (items: any, index: any) => {
          return items.stockPrice;
        }
      );
      const linetotal = value.vendors[i].orderbyvendor.map(
        (items: any, index: any) => {
          return items.stockLinetotal;
        }
      );
      const stockId = value.vendors[i].orderbyvendor.map(
        (items: any, index: any) => {
          return items.stocksId;
        }
      );
      submitedValue.push({
        vendorid: value.vendors[i].vendorid,
        subtotalbyvendor: value.vendors[i].subTotalbyVendor,
        taxbyvendor: value.vendors[i].taxbyVendor,
        totalbyvendor: value.vendors[i].totalbyvendor,
        stockQuantity: quantity,
        stockPrice: price,
        stockLineTotal: linetotal,
        stocksid: stockId,
      });
    }
    setStockOrder(submitedValue);

    for (let j in stockOrder) {
      const res = stockOrder[j];
      dispatch(doInsertOrderHeader(res));
    }
    messageApi.open({
      type:'loading',
      content:'Action in Progress...',
      duration: 2.5
    }).then(()=>message.success('Stock Ordered', 2))
    .then(()=>message.info('Call Manager to Check the Order',2.5))
    // console.log(stockOrder);
    setTimeout(() => { setStockOrder1({
      vendors: [],
    subtotal: 0,
    tax: 0,
    total: 0,
    }) }, 3000)
    
  };
  //Set What To Display when Searching Product
  const dataCard = dataSearch.length > 0 ? dataSearch : stockPhotos;
  return (
    <LayoutAdmin>
      {contextHolder}
      <Search
        placeholder="Search Product"
        className="flex w-96 justify-center m-8"
        onSearch={onSearch}
      />
      <Row gutter={8}>
        <Col span={16}>
          <Row gutter={[32, 32]}>
            {dataCard.map((item: any, i: any) => (
              <Col>
                <Card
                  key={i}
                  hoverable
                  style={{ width: 240 }}
                  cover={
                    <img
                      alt="example"
                      src={
                        "http://localhost:3005/stock-photo/" + item?.photourl
                      }
                    />
                  }
                >
                  <Meta title={item?.stockname} description={item?.stockdesc} />
                  <div className="mt-4">
                    <span>{item?.stockprice}</span>
                  </div>
                  <div className="flex justify-center">
                    <button
                      className="bg-[#3C6FF3] w-60 px-5 py-3 rounded text-white hover:bg-[#274799] mt-2"
                      onClick={() => addToCart(item)}
                    >
                      Add To Cart
                    </button>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>

        <Col span={8}>
          <div className="bg-white border-1 sticky top-4 m-3 rounded-md drop-shadow-xl">
            <h1 className="text-center font-bold m-3">
              {<ShoppingCartOutlined />} Your Cart
            </h1>
            <Divider />
            {stockOrder1.vendors.map((item: any, index: any) => (
              <div key={index} className="m-4">
                <h2 className="font-bold text justify-left">
                  {item.vendorname}
                </h2>
                {item.orderbyvendor.map((items: any, indexes: any) => (
                  <div key={indexes} className="flex justify-between m-2">
                    <div>
                      <h3 className="text-[#4C5563]">{items?.stockName}</h3>
                      <h4 className="text-[#4C5563]">
                        {items?.stockPrice.toLocaleString("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        })}{" "}
                        x{" "}
                        <Input
                          value={items?.stockQuantity}
                          onChange={(e) => eventHandler(index, indexes, e)}
                          className="w-16"
                          min={1}
                          parser={inputParser}
                          type="number"
                        />{" "}
                        ={" "}
                        {items?.stockLinetotal.toLocaleString("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        })}
                      </h4>
                    </div>
                    <div className="m-4">
                      <DeleteOutlined
                        onClick={() => deleteStocks(index, indexes)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ))}
            <Divider />
            <div>
              <h3 className="text-[#4C5563] m-4 font-bold">
                Subtotal :
                {stockOrder1.subtotal.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </h3>
              <h3 className="text-[#4C5563] m-4 font-bold">
                Tax 10% :
                {stockOrder1.tax.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </h3>
              <Divider />
              <div className="justify-between">
                <h3 className="text-[#4C5563] m-4 font-bold">Total</h3>
                <h3 className="text-[#4C5563] m-4 font-bold">
                  {stockOrder1.total.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}
                </h3>
              </div>
              <div className="flex justify-center">
              
                <button
                  className={`w-60 px-4 py-2.5 rounded text-white hover:bg-[#274799] m-4 text-center ${cursorType}`}
                  onClick={() => onSubmit(stockOrder1)}
                  disabled = {disabledButton}
                >
                  Request Order
                </button>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </LayoutAdmin>
  );
};

export default index;
