import LayoutAdmin from "@/components/Layout/admin";
import Link from 'next/link';
import { Dialog, Transition, Listbox } from '@headlessui/react'
import { PlusIcon } from '@heroicons/react/24/solid';
import React, { useState, useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {
  doRegionsRequest,
  doRegionsCreate,
  doDeleteRegions,
  doUpdateRegions,
  doDeleteRegionsFailed,

  doCountryRequest,
  doCountryCreate,
  doDeleteCountry,
  doUpdateCountry,

  doProvRequest,
  doProvCreate,
  doDeleteProv,
  doUpdateProv,


  doAddrRequest,
  doAddrCreate,
  doDeleteAddr,
  doUpdateAddr,


} from 'redux/Actions/Masters/reduceActions';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import TextField from '@mui/material/TextField';

// import { Formik, Form } from 'formik';
import { DataGrid, GridColDef, GridValueGetterParams, GridToolbar } from '@mui/x-data-grid';
import { title } from 'process';
import Head from 'next/head';
import { MenuProps, message, Modal } from 'antd';
import { Breadcrumb, Layout, Menu, theme, Divider, Radio, Input, Table, Form, Alert, Select, Popconfirm } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { values } from 'lodash';



const { Header, Content, Footer, Sider } = Layout;

const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

export default function MasterLocations() {
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  // Get data and filter data using radio 
  const mBenua = useSelector((state: any) => state.masterReducers.mRegion);
  console.log("DataBenua", mBenua)

  const mNegara = useSelector((state: any) => state.ContryReducer.mCountry);
  console.log("datanegara",mNegara)

  const countryR = mNegara

  const mProv = useSelector((state: any) => state.ProvincesReducer.mProvinces);

  const mAddres = useSelector((state: any) => state.AddrReducer.mAddr);

  // define data filter

  const [dataCountry, setDataCountry] = useState(mNegara)
  const [dataCountries, setDataCountries] = useState(mNegara)
  const [dataProvCity, setDataProvCity] = useState(mProv)
  const [dataRegion, setDataRegion] = useState(mBenua)

  // tampung data region untuk value country region berdasarkan regionName
  const [selectedRegion, setSelectedRegion] = useState<any>(''); // State untuk menyimpan data dari filterRegion
  const [selectedCountry, setSelectedCountry] = useState<any>(''); // State untuk menyimpan data dari filterCountry
  const [selectedProvCity, setSelectedProvCity] = useState<any>(''); // State untuk menyimpan data dari filterProv

  const handleFilterCountry = (regionCode: any) => {
    console.log("ShowOnly:", regionCode);

    const filterCountry = mNegara?.filter(
      (temp: any) => temp.country_region_id === regionCode
    );
    console.log('FindDataCountry:', filterCountry);


    if (filterCountry && filterCountry.length > 0) {
      setDataCountry(filterCountry);
    } else {
      setDataCountry([]);
    }

    const filterRegion = mBenua?.find(
      (temp: any) => temp.regionCode === regionCode
    );

    console.log('findDataRegion:', filterRegion);

    if (filterRegion) {
      setDataRegion(filterRegion);
      setSelectedRegion(filterRegion)
    } else {
      setDataRegion(mBenua.regionName)
      setSelectedRegion('')
    }
    console.log('ShowRegion:', filterRegion?.regionName)
  };

  const [dataProv, setDataProv] = useState(mProv)

  const handleFilterProv = (country_id: any) => {
    console.log(country_id)

    const filterProv = mProv?.filter(
      (temp: any) => temp.prov_country_id === country_id
    );

    if (filterProv && filterProv.length > 0) {
      setDataProv(filterProv)
    } else {
      setDataProv([]);
    }
    console.log('FindDataProv', filterProv)

    const countryFind = mNegara?.find(
      (temp: any) => temp.country_id === country_id
    );

    console.log('findDataCountry:', countryFind);


    if (countryFind) {
      setDataCountries(countryFind);
      setSelectedCountry(countryFind)
    } else {
      setDataCountries(mNegara)
      setSelectedCountry('')
    }
    console.log('ShowCountry:', countryFind?.country_name)
  }

  const [dataCity, setDataCity] = useState(mAddres)

  const handleFilterCity = (prov_id: any) => {
    console.log(prov_id)

    const filterCity = mAddres?.filter(
      (temp: any) => temp.addr_prov_id === prov_id
    );
    console.log('FindDataCity', filterCity)
    setDataCity(filterCity)

    const ProvCityFind = mProv?.find(
      (temp: any) => temp.prov_id === prov_id
    );

    console.log('findDataProv:', ProvCityFind);


    if (ProvCityFind) {
      setDataProvCity(ProvCityFind);
      setSelectedProvCity(ProvCityFind)
    } else {
      setDataCountries(mProv)
      setSelectedProvCity('')
    }
    console.log('ShowProv:', ProvCityFind?.prov_name)
  }

  // const dispatch = useDispatch();
  useEffect(() => {
    dispatch(doRegionsRequest());
    dispatch(doCountryRequest());
    dispatch(doProvRequest());
    dispatch(doAddrRequest());

  }, []);


  // Method dispacth for add,update,delete data 
  const dispatch = useDispatch();
  const dispatchAdd = useDispatch();
  const dispatchUpdate = useDispatch();
  const dispatchDelete = useDispatch();

  // modal add data 
  //   region
  const [openAddModalRegion, setOpenAddModalRegion] = useState(false);
  const handleOpenAddModalRegion = () => setOpenAddModalRegion(true);
  const handleCloseAddModalRegion = () => setOpenAddModalRegion(false);
  const [addFormRegion] = Form.useForm();
  const [addFormErrorRegion, setAddFormErrorRegion] = useState({});
  // country
  const [openAddModalCountry, setOpenAddModalCountry] = useState(false);
  const handleOpenAddModalCountry = () => setOpenAddModalCountry(true);
  const handleCloseAddModalCountry = () => setOpenAddModalCountry(false);
  const [addFormCountry] = Form.useForm();
  const [addFormErrorCountry, setAddFormErrorCountry] = useState({});
  // provinces
  const [openAddModalProvinces, setOpenAddModalProvinces] = useState(false);
  const handleOpenAddModalProvinces = () => setOpenAddModalProvinces(true);
  const handleCloseAddModalProvinces = () => setOpenAddModalProvinces(false);
  const [addFormProvinces] = Form.useForm();
  const [addFormErrorProvinces, setAddFormErrorProvinces] = useState({});
  //   City
  const [openAddModalCity, setOpenAddModalCity] = useState(false);
  const handleOpenAddModalCity = () => setOpenAddModalCity(true);
  const handleCloseAddModalCity = () => setOpenAddModalCity(false);
  const [addFormCity] = Form.useForm();
  const [addFormErrorCity, setAddFormErrorCity] = useState({});


  // modal edit data
  // region
  const [openEditModalRegion, setOpenEditModalRegion] = useState(false);
  const handleOpenEditModalRegion = () => setOpenEditModalRegion(true);
  const handleCloseEditModalRegion = () => setOpenEditModalRegion(false);
  const [editFormRegion] = Form.useForm();
  // country
//   const [idCountry, setIdCountry] = useState(0)
//   const details= countryR.find((item:any)=>item.country_id==idCountry );
// console.log('countryR :',countryR);

//   console.log('detailsCon',details);
//   console.log('idCountry',idCountry);
  

  // const [prevData, setPrevData]= useState(details);

  // console.log("prevdatanegara",prevData)
  const [openEditModalCountry, setOpenEditModalCountry] = useState(false);
  const handleOpenEditModalCountry = () => setOpenEditModalCountry(true);
  const handleCloseEditModalCountry = () => setOpenEditModalCountry(false);
  const [editFormCountry] = Form.useForm();
  // prov
  const [openEditModalProvinces, setOpenEditModalProvinces] = useState(false);
  const handleOpenEditModalProvinces = () => setOpenEditModalProvinces(true);
  const handleCloseEditModalProvinces = () => setOpenEditModalProvinces(false);
  const [editFormProvinces] = Form.useForm();
  // city
  const [openEditModalCity, setOpenEditModalCity] = useState(false);
  const handleOpenEditModalCity = () => setOpenEditModalCity(true);
  const handleCloseEditModalCity = () => setOpenEditModalCity(false);
  const [editFormCity] = Form.useForm();
  
  //state untuk menyimpan nilai input pada form edit data policy
  const [editDataRegion, setEditDataRegion] = useState({
    regionCode: '',
    regionName: ''
  });
  console.log("dataValueEditRegion:", editDataRegion)
  const [editDataCountries, setEditDataCountries] = useState({
    country_region_id: '',
    country_name: '',
    country_id: ''
  });
  console.log("dataValueEditCountry:", editDataCountries)

  const [editDataProv, setEditDataProv] = useState({
    provCountry: 0,
    provName: '',
    provId: 0
  });
  console.log("dataValueEditProvy:", editDataProv)

  const [editDataCity, setEditDataCity] = useState({
    addr_prov_id: '',
    addr_line2: '',
    addr_id: ''
  });
  console.log("dataValueEditCity:", editDataCity)

  // mengubah nilai input pada form edit data policy
  const handleEditInputChangeRegion = (event: { target: { name: any; value: any; }; }) => {
    const { name, value } = event.target;
    setEditDataRegion((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleEditInputChangeCountries  = (event: { target: { name: any; value: any; }; }) => {
    const { name, value } = event.target;
    setEditDataCountries((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleEditInputChangeProv  = (event: { target: { name: any; value: any; }; }) => {
    const { name, value } = event.target;
    setEditDataProv((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleEditInputChangeCity = (event: { target: { name: any; value: any; }; }) => {
    const { name, value } = event.target;
    setEditDataCity((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  // mengambil data Region yang akan diedit dan mengisi nilai pada form edit data Region

  const handleEditDataRegion = (regionCode: any) => {
    console.log(regionCode)

    const FindRegion = mBenua?.find(
      (temp: any) => temp.regionCode === regionCode
    )
    console.log('FindDataRegion:', FindRegion)
    setEditDataRegion(FindRegion)
    handleOpenEditModalRegion(FindRegion);
    console.log("editDataRegion:", editDataRegion)
  };

  const handleEditDataCountries = (country_id: any) => {
    console.log(country_id)
    setIdCountry(country_id)

    const FindNegara = mNegara?.find(
      (temp: any) => temp.country_id === country_id
    )
    console.log('FindDatacountry:', FindNegara)
    setEditDataCountries(FindNegara)
    handleOpenEditModalCountry(FindNegara);
    console.log("editDataCountry:", editDataCountries)
  };
 
  const handleEditDataProv = (prov_id: any) => {
    console.log(prov_id)

    const FindProv = mProv?.find(
      (temp: any) => temp.prov_id === prov_id
    )
    console.log('FindDatacountry:', FindProv)
    setEditDataProv(FindProv)
    handleOpenEditModalProvinces(FindProv);
    console.log("editDataProv:", editDataProv)
  };
 
  const handleEditDataCity = (addr_id: any) => {
    console.log(addr_id)

    const FindCity = mAddres?.find(
      (temp: any) => temp.addr_id === addr_id
    )
    console.log('FindDatacountry:', FindCity)
    setEditDataProv(FindCity)
    handleOpenEditModalCity(FindCity);
    console.log("editDataCity:", editDataCity)
  };

  // menyimpan perubahan data Region

  // const handleEditRegion = () => {
  //   console.log('Success:', editDataRegion);
  //   dispatch(doUpdateRegions(editDataRegion));
  //   handleCloseEditModalRegion();
  //   window.location.reload();
  // };
  const handleEditRegion = async ():any => {
    console.log(editDataRegion)
    try {
      await editFormRegion.validateFields();
      await dispatch(doUpdateRegions(editDataRegion));
      await dispatch(doRegionsRequest(editDataRegion));
      handleCloseEditModalRegion();
      // editFormRegion.resetFieldispatchds();
      //  window.location.reload();


      message.success('Data berhasil di edit');
    } catch (error) {
      if (error instanceof Error) {
        message.error('Gagal mengupdate data: ' + error.message);
      } else {
        // setAddFormError(error);
      }
    }
  };
  const handleEditCountries =  () => {
    console.log(editDataCountries)
    try {
      dispatch(doUpdateCountry(editDataCountries));
      handleCloseEditModalCountry();
      // editFormCountry.resetFields();
      setTimeout(() => {
        window.location.reload();
      }, 150);
      message.success('Data berhasil di edit');
    } catch (error) {
      if (error instanceof Error) {
        message.error('Gagal mengupdate data: ' + error.message);
      } else {
        // setAddFormError(error);
      }
    }
  };
  const handleEditProv =  () => {
    console.log("judulan",editDataProv)
    try {
       editFormProvinces.validateFields();
      dispatchUpdate(doUpdateProv(editDataProv));
      handleCloseEditModalProvinces();
      // editFormCountry.resetFields();

      message.success('Data berhasil di edit');
    } catch (error) {
      if (error instanceof Error) {
        message.error('Gagal mengupdate data: ' + error.message);
      } else {
        // setAddFormError(error);
      }
    }
  };
  const handleEditCity =  () => {
    console.log(editDataCity)
    try {
       editFormCity.validateFields();
       dispatch(doUpdateProv(editDataCity));
      handleCloseEditModalCity();
      // editFormCountry.resetFields();

      message.success('Data berhasil di edit');
    } catch (error) {
      if (error instanceof Error) {
        message.error('Gagal mengupdate data: ' + error.message);
      } else {
        // setAddFormError(error);
      }
    }
  };

  // delete data 
  //   region
  const handleDeleteRegion = async (regionCode: any) => {
    try {
      dispatch(doDeleteRegions(regionCode));
      await dispatch(doRegionsRequest(regionCode));
      console.log('idDeleteRegion:', regionCode);
      // window.location
      message.success('Data berhasil dihapus');
    } catch (error) {
      message.error('Data gagal di hapus');
      console.log("delete id Region : ", regionCode);
    }
    // window.location.reload(); // Menambahkan perintah untuk melakukan reload pada halaman setelah penghapusan data berhasil
  };
  //Country
  const handleDeleteCountry = async (country_id: any) => {
    try {
       dispatchDelete(doDeleteCountry(country_id));
      console.log('idDelete:', country_id);
      message.success('Data berhasil dihapus');
    } catch (error) {
      message.error('Data gagal di hapus');
      console.log("delete id : ", country_id);
    }
  };
  //prov
  const handleDeleteProv = async (prov_id: any) => {
    try {
      await dispatch(doDeleteProv(prov_id));
      console.log('idDelete:', prov_id);
      message.success('Data berhasil dihapus');
    } catch (error) {
      message.error('Data gagal di hapus');
      console.log("delete id : ", prov_id);
    }
    // window.location.reload(); // Menambahkan perintah untuk melakukan reload pada halaman setelah penghapusan data berhasil
  };
  //City
  const handleDeleteCity = async (addr_id: any) => {
    try {
      await dispatch(doDeleteAddr(addr_id));
      console.log('idDelete:', addr_id);
      message.success('Data berhasil dihapus');
      window.location.reload()
    } catch (error) {
      message.error('Data gagal di hapus');
      console.log("delete id : ", addr_id);
    }
    // window.location.reload(); // Menambahkan perintah untuk melakukan reload pada halaman setelah penghapusan data berhasil
  };














  // state untuk menyimpan nilai input pada form tambah data 
  //  region
  const [addDataRegion, setAddData] = useState({
    regionCode: '',
    regionName: '',
  });
  console.log('AddDataRegion:', addDataRegion)
  //   country
  const [addDataCountry, setAddDataCountry] = useState({
    // countryId: 0,
    country_name: '',
    country_region_id: '',
  });
  console.log('AddDataCountry:', addDataCountry)
  //   Provinces
  const [addDataProvinces, setAddDataProvinces] = useState({
    // provId: '',
    provName: '',
    provCountry: '',
  });
  console.log('AddDatProv:', addDataProvinces)
  //   city
  const [addDataCity, setAddDataCity] = useState({
    // addrId: '',
    addrLine2: '',
    addrProv: '',
  });
  console.log("addDataCity:", addDataCity)

  const TextArea = Input
  // mengubah nilai input pada form tambah data 
  const handleAddInputChange = (event: { target: { name: any; value: any; }; }) => {
    const { name, value } = event.target;
    setAddData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleAddInputChangeCountry = (event: { target: { name: any; value: any; }; }) => {
    const { name, value } = event.target;
    setAddDataCountry((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleAddInputChangeProv = (event: { target: { name: any; value: any; }; }) => {
    const { name, value } = event.target;
    setAddDataProvinces((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleAddInputChangeCity = (event: { target: { name: any; value: any; }; }) => {
    const { name, value } = event.target;
    setAddDataCity((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // menambahkan data region
  const handleAddRegion = async ():any => {
    try {
      await addFormRegion.validateFields();
      await dispatch(doRegionsCreate(addDataRegion));
      await dispatch(doRegionsRequest(addDataRegion));
      handleCloseAddModalRegion();
      addFormRegion.resetFields();
      setAddData({
        regionCode: 0,
        regionName: ''
      });
      // loadData()
      message.success('Data berhasil ditambahkan');
    } catch (error) {
      if (error instanceof Error) {
        message.error('Data gagal ditambahkan ' + error.message);
      } else {
        setAddFormErrorRegion(message.error);
      }
    }
  };
  //   country add data
  const handleAddCountry = async ():any => {
    try {
      await addFormCountry.validateFields();
      await dispatch(doCountryCreate(addDataCountry));
      await dispatch(doCountryRequest(addDataCountry));
      handleCloseAddModalCountry();
      addFormCountry.resetFields();
      setAddDataCountry({
        // countryId: 0,
        country_name: '',
        country_region_id:'',
      });
      //   loadData()
      console.log('dataCOuntryAdd:', addDataCountry)
      message.success('Data berhasil ditambahkan');
    } catch (error) {
      if (error instanceof Error) {
        message.error('Data gagal ditambahkan ' + error.message);
      } else {
        setAddFormErrorCountry(message.error);
      }
    }
  };

  //   provinces add data
  const handleAddProvinces = async (): any => {
    try {
      await addFormProvinces.validateFields();
      await dispatch(doProvCreate(addDataProvinces));
      await dispatch(doProvRequest());
      handleCloseAddModalProvinces();
      addFormProvinces.resetFields();
      setAddDataProvinces({
        // provId: '',
        provName: '',
        provCountry: '',
      });
      message.success('Data berhasil ditambahkan');
    } catch (error) {
      if (error instanceof Error) {
        message.error('Data gagal ditambahkan ' + error.message);
      } else {
        setAddFormErrorProvinces(message.error);
      }
    }
  };
  //   City add data
  const handleAddCity = async ():any => {
    try {
      await addFormCity.validateFields();
      await dispatch(doAddrCreate(addDataCity));
      await dispatch(doAddrRequest());
      handleCloseAddModalCity();
      addFormCity.resetFields();
      setAddDataCity({
        // addrd: '',
        addrLine2: '',
        addrProv: '',
      });
      message.success('Data berhasil ditambahkan');
    } catch (error) {
      if (error instanceof Error) {
        message.error('Data gagal ditambahkan ' + error.message);
      } else {
        setAddFormErrorCity(message.error);
      }
    }
  };



  interface DataType {
    key: React.Key;
    regionCode: any;
    regionName: string;
  }

  const columns = [

    {
      key: 'regionCode',
      dataIndex: 'regionCode',
      render: (regionCode: string) => (
        <Radio
          onClick={() => handleFilterCountry(regionCode)}
          value={regionCode}
        />

      ),
    },
    {
      title: 'ID',
      dataIndex: 'regionCode',
      key: 'regionCode',
    },
    {
      dataIndex: 'regionName',
      title: 'region',
      key: 'regionName',
    },


    {
      // title: 'Actions',
      key: 'actions',
      render: (_: any, record: { regionCode: any }) => (
        <span className="flex">
          <Button type="button" onClick={() => handleEditDataRegion(record.regionCode)}>Edit</Button>
          <Popconfirm
            title="Are you sure to delete this Region?"
            onConfirm={() => handleDeleteRegion(record.regionCode)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="submit" danger>Delete</Button>
          </Popconfirm>
        </span>
      )
    },
    {
      title: (
        <div style={{ display: "inline-block", verticalAlign: "middle" }}>
          <Button type="button" onClick={handleOpenAddModalRegion}><PlusIcon width={10} />Add</Button>
        </div>

      )
    },

  ];

  // columnsCountry
  interface DataType {
    key: React.Key;
    countryId: any;
    countryName: string;
  }
  const columnsCountry = [

    {
      key: 'country_id',
      dataIndex: 'country_id',
      render: (country_id: string) => (
        <Radio
          onClick={() => handleFilterProv(country_id)}
          value={country_id}
        />
      ),
    },
    {
      dataIndex: 'country_id',
      title: 'ID',
      key: 'country_id'
    },
    {
      dataIndex: 'country_name',
      title: 'Country',
      key: 'country_name',
    },
    {
      key: 'actions',
      render: (_: any, record: { country_id: any }) => (
        <span className="flex">
          <Button type="button" onClick={() => handleEditDataCountries(record.country_id)}>Edit</Button>
          <Popconfirm
            title="Are you sure to delete this Country?"
            onConfirm={() => handleDeleteCountry(record.country_id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>Delete</Button>
          </Popconfirm>
        </span>
      )
    },
    {
      title: (
        <>
          <div style={{ display: "inline-block", verticalAlign: "middle" }}>
            <Button type="text" onClick={handleOpenAddModalCountry}><PlusIcon width={10} />Add</Button>
          </div>
        </>

      )
    },


  ];


  // ==== Prov ===== //
  interface DataType {
    key: React.Key;
    provId: any;
    provName: string;
  }

  const columnsProv = [
    {
      key: 'prov_id',
      dataIndex: 'prov_id',
      render: (prov_id: string) => (
        <Radio
          onClick={() => handleFilterCity(prov_id)}
          value={prov_id}
        />
      ),
    },

    {
      dataIndex: 'prov_id',
      title: 'ID',
      key: 'prov_id'
    },
    {
      dataIndex: 'prov_name',
      title: 'Provinces',
      key: 'prov_name',
    },
    {
      key: 'actions',
      render: (_: any, record: { prov_id: any }) => (
        <span className="flex">
          <Button type="button" onClick={() => handleEditDataProv(record.prov_id)}>Edit</Button>
          <Popconfirm
            title="Are you sure to delete this Prov?"
            onConfirm={() => handleDeleteProv(record.prov_id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>Delete</Button>
          </Popconfirm>
        </span>
      )
    },
    {
      title: (
        <>
          <div style={{ display: "inline-block", verticalAlign: "middle" }}>
            <Button type="text" onClick={handleOpenAddModalProvinces}><PlusIcon width={10} />Add</Button>
          </div>
        </>

      )
    },


  ];


  // ==== City ===== //
  interface DataType {
    key: React.Key;
    addrId: any;
    addrLine2: string;
  }
  const columnsAddr = [
    {
      dataIndex: 'addr_id',
      title: 'ID',
      key: 'addr_id'
    },
    {
      dataIndex: 'addr_line2',
      title: 'City',
      key: 'addr_line2',
    },
    {
      key: 'actions',
      render: (_: any, record: { addr_id: any }) => (
        <span className="flex">
          <Button type="button" onClick={() => 
            handleEditDataCity(record.addr_id)}
            >Edit</Button>
          <Popconfirm
            title="Are you sure to delete this City?"
            onConfirm={() => handleDeleteCity(record.addr_id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>Delete</Button>
          </Popconfirm>
        </span>
      )
    },
    {
      title: (
        <>
          <div style={{ display: "inline-block", verticalAlign: "middle" }}>
            <Button type="text" onClick={handleOpenAddModalCity}><PlusIcon width={10} />Add</Button>
          </div>
        </>

      )
    },


  ];


  const [selectionType, setSelectionType] = useState<'radio'>('radio');

  return (
    <>
      <Head>
        <title>Master/Locations</title>
      </Head>
      <LayoutAdmin>
        <div>
          <Modal
            title="Add Region"
            open={openAddModalRegion}
            onOk={handleAddRegion}
            onCancel={handleCloseAddModalRegion}
          >
            <Form form={addFormRegion} layout="vertical" onFinish={handleAddRegion}>
              <Form.Item>
                <Input name="regionCode" value={addDataRegion.regionCode} onChange={handleAddInputChange} hidden />
              </Form.Item>
              <Form.Item
                label="Region Name"
                // name="regionName"
                rules={[
                  {
                    required: true,
                    message: 'Please input region Name',
                  },
                ]}
              >
                <Input name="regionName" value={addDataRegion.regionName} onChange={handleAddInputChange} />
              </Form.Item>
            </Form>
          </Modal>

          <Modal
            title="Edit Region"
            open={openEditModalRegion}
            onOk={handleEditRegion}
            onCancel={handleCloseEditModalRegion}
          >
            <Form form={editFormRegion} layout="vertical" onFinish={handleEditRegion}>
              <Form.Item
                label="Region Code"
              >
                <Input value={editDataRegion.regionCode} onChange={handleEditInputChangeRegion} />
              </Form.Item>
              <Form.Item
                label="Region Name"

                rules={[
                  {
                    required: true,
                    message: 'Please input Region Name',
                  },
                ]}
              >
                <Input name='regionName' value={editDataRegion.regionName} onChange={handleEditInputChangeRegion} />
              </Form.Item>
            </Form>
          </Modal>
        </div>
        <div>
          <div>
            <h2 className="bg-gray-300">
              Region
            </h2>
          </div>
          <Divider />
          <Radio.Group>

            <Table
              // rowSelection={{
              //     type: selectionType,
              //     ...rowSelection,
              // }}
              columns={columns}
              dataSource={mBenua}
              style={{ margin: '0 auto', width: '90%' }} />
          </Radio.Group>
        </div>

        {/* country */}
        <div>
          <Modal
            title="Add Country"
            open={openAddModalCountry}
            onOk={handleAddCountry}
            onCancel={handleCloseAddModalCountry}
          >
            <Form form={addFormCountry} layout="vertical" onFinish={handleAddCountry}>
              <Form.Item
                label={`RegionName:    ${dataRegion?.regionName}`}
                // name="countryRegion"
                style={{ textAlign: 'center' }}
              >
                <Input
                value={addDataCountry.country_region_id} 
                name="country_region_id" 
                onChange={handleAddInputChangeCountry} 
                />
              </Form.Item>
              <Form.Item
                label="Country Name"
                name="country_name"
                rules={[
                  {
                    required: true,
                    message: 'Please input country Name',
                  },
                ]}
              >
                <Input name="countryName" value={addDataCountry.country_name} onChange={handleAddInputChangeCountry} />
              </Form.Item>
            </Form>
          </Modal>
          <Modal
            title="Edit Country"
            open={openEditModalCountry}
            onOk={handleEditCountries}
            onCancel={handleCloseEditModalCountry}
          >
            <Form form={editFormCountry} layout="vertical" onFinish={handleEditCountries}>
              <Form.Item
                label={`RegionName:    ${dataRegion?.regionName}`}
                // name="countryRegion"
                style={{ textAlign: 'center' }}
              >
                <Input name='country_region_id' value={editDataCountries?.country_region_id} onChange={handleEditInputChangeCountries}/>
              </Form.Item>
              <Form.Item
                label="Country Name"
                name='country_name'
                rules={[
                  {
                    required: true,
                    message: 'Please input Country Name',
                  },
                ]}
              >
                <Input 
                placeholder="input country"
                onChange={handleEditInputChangeCountries}
                // value={prevData?.country_name}
                // name="country_name"
                />
              </Form.Item>
            </Form>
          </Modal>
        </div>
        <div>
          <div>
            <h2 className="bg-gray-300">
              Country
            </h2>
          </div>
          <Divider />
          <Radio.Group>

            <Table
              // rowSelection={{
              //     type: selectionType,
              //     ...rowSelection,
              // }}
              columns={columnsCountry}
              dataSource={countryR} />
          </Radio.Group>
        </div>
        <div>
          <Modal
            title="Add Province"
            open={openAddModalProvinces}
            onOk={handleAddProvinces}
            onCancel={handleCloseAddModalProvinces}
          >
            <Form form={addFormProvinces} layout="vertical" onFinish={handleAddProvinces}>
              <Form.Item
                label={`Country Name: ${dataCountries?.country_name}`}
                name="provCountry"
              >
                {/* <Input name="countryId" value={addDataCountry.countryId} onChange={handleAddInputChangeCountry} hidden/> */}
                <Input name="provCountry" value={addDataProvinces.provCountry} onChange={handleAddInputChangeProv} />
              </Form.Item>
              <Form.Item
                label="Provinsi Name"
                // name="provName"
                rules={[
                  {
                    required: true,
                    message: 'Please input provinces Name',
                  },
                ]}
              >
                <Input name="provName" value={addDataProvinces.provName} onChange={handleAddInputChangeProv} />
              </Form.Item>
            </Form>
          </Modal>
          <Modal
            title="Edit Province"
            open={openEditModalProvinces}
            onOk={handleEditProv}
            onCancel={handleCloseEditModalProvinces}
          >
            <Form form={editFormCountry} layout="vertical" onFinish={handleEditProv}>
             
              <Form.Item
                label={`Country Name:    ${dataCountries?.country_name}`}
                // name="countryRegion"
                style={{ textAlign: 'center' }}
              >
                <Input name='provCountry' value={editDataProv.provCountry} onChange={handleEditInputChangeProv}/>
              </Form.Item>
              <Form.Item
                label="Provinces Name"

                rules={[
                  {
                    required: true,
                    message: 'Please input Prov Name',
                  },
                ]}
              >
                <Input name='provName' value={editDataProv.provName} onChange={handleEditInputChangeProv}/>
              </Form.Item>
            </Form>
          </Modal>
          <div>
            <h2 className="bg-gray-300">
              Provinces
            </h2>
          </div>
          <Divider />
          <Radio.Group>

            <Table
              // rowSelection={{
              //     type: selectionType,
              //     ...rowSelection,
              // }}
              columns={columnsProv}
              dataSource={dataProv}
              style={{ margin: '0 auto', width: '90%' }} />
          </Radio.Group>
        </div>
        <div>
          <Modal
            title="Add Province"
            open={openAddModalCity}
            onOk={handleAddCity}
            onCancel={handleCloseAddModalCity}
          >
            <Form form={addFormCity} layout="vertical" onFinish={handleAddCity}>
              <Form.Item
                label={`City Provinces : ${dataProvCity?.prov_name}`}
                name="addrProv"
              >
                {/* <Input name="countryId" value={addDataCountry.countryId} onChange={handleAddInputChangeCountry} hidden/> */}
                <Input name="addrProv" value={addDataCity.addrProv} onChange={handleAddInputChangeCity} />
              </Form.Item>
              <Form.Item
                label="City"
                name="addrLine2"
                rules={[
                  {
                    required: true,
                    message: 'Please input City',
                  },
                ]}
              >
                <Input name="addrLine2" value={addDataCity.addrLine2} onChange={handleAddInputChangeCity} />
              </Form.Item>
            </Form>
          </Modal>
          <div>
            <h2 className="bg-gray-300">
              City
            </h2>
          </div>
          <Radio.Group
            onChange={({ target: { value } }) => {
              setSelectionType(value);
            }}
            value={selectionType}
          >
          </Radio.Group>
          <Divider />
          <Radio.Group>

            <Table
              // rowSelection={{
              //     type: selectionType,
              //     ...rowSelection,
              // }}
              columns={columnsAddr}
              dataSource={dataCity} />
          </Radio.Group>
        </div>

      </LayoutAdmin>
    </>
  );
}
type TypeOpen = boolean;

function setAddFormError(error: TypeOpen) {
  if (error) {
    console.log("There was an error.");
  } else {
    console.log("No errors.");
  }
}
