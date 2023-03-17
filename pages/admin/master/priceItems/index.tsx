import LayoutAdmin from "@/components/Layout/admin";
import Head from "next/head";
import React, { useState, useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { PlusIcon } from '@heroicons/react/24/solid';
import {EyeTwoTone} from '@ant-design/icons';
import {
  doPritRequest,
  doPritCreate,
  doUpdatePrit,
  doDeletePrit
} from 'redux/Actions/Masters/reduceActions';
import { Button, Divider, Form, Input, Layout, message, Modal, Popconfirm, Popover, Radio, Select, Table, theme } from "antd";

export default function MasterPriceItems() {
  const { Header, Content, Footer, Sider } = Layout;
  const {
      token: { colorBgContainer },
    } = theme.useToken();

  //   define dispatch PriceItems
    const dispatchAddPrit = useDispatch();
    const dispatchUpdatePrit = useDispatch();
    const dispatchDeletePrit = useDispatch();

     // modal add data Prit
      const [openAddModal, setOpenAddModal] = useState(false);
      const handleOpenAddModal = () => setOpenAddModal(true);
      const handleCloseAddModal = () => setOpenAddModal(false);
      const [addForm] = Form.useForm();
      const [addFormError, setAddFormError] = useState({});

      // state untuk menyimpan nilai input pada form tambah data policy
      const [addData, setAddData] = useState({
          pritName: '',
          pritType: '',
          pritPrice: '',
          pritDescription: '',
      });

      console.log("ValuesAddPrit:",addData)


      const TextArea = Input
      const { option } = Select;
      // mengubah nilai input pada form tambah data policy
      const handleAddInputChange = (event: { target: { name: any; value: any; }; }) => {
          const { name, value } = event.target;
          setAddData((prevData) => ({
          ...prevData,
          [name]: value,
          }));
      };

      
      // menambahkan data policy
      const handleAdd = async () => {
          try {
          await addForm.validateFields();
          await dispatchAddPrit(doPritCreate(addData));
          handleCloseAddModal();
          addForm.resetFields();
          setAddData({
              pritName: '',
              pritType: '',
              pritPrice: '',
              pritDescription: '',
          });
          console.log('DataPrit:',addData)
          message.success('Data berhasil ditambahkan');
          } catch (error) {
          if (error instanceof Error) {
              message.error('Data gagal ditambahkan ' + error.message);
          } else {
              setAddFormError(message.error);
          }
          }
      };

      //state untuk menyimpan nilai input pada form edit data policy
    const [editData, setEditData] = useState(
      { 
          pritName: '',
          pritType: '',
          pritPrice: '',
          pritDescription: '',
      }
     );
     console.log("dataValueEdit:",editData)

       // modal edit data Prit
       const [openEditModal, setOpenEditModal] = useState(false);
       const handleOpenEditModal = (data: any) => {
         setEditData(data);
         setOpenEditModal(true);
       };
       const handleCloseEditModal = () => {
         setEditData({
              pritName: '',
              pritType: '',
              pritPrice: '',
              pritDescription: '',
         });
         setOpenEditModal(false);
       }

        // mengubah nilai input pada form edit data Prit
          const handleEditInputChange = (event: { target: { name: any; value: any; }; }) => {
              const { name, value } = event.target;
              setEditData((prevData) => ({
              ...prevData,
              [name]: value,
              }));
          };

            // mengambil data Prit yang akan diedit dan mengisi nilai pada form edit data Prit
  
              const handleEditData = (pritId: any) => {
                  console.log(pritId)
                  
                  const filterPrit =  mPrice?.find(
                  (temp: any) => temp.pritId === pritId
                  )
                  console.log('FindDataRegion:',filterPrit)
                  handleOpenEditModal(filterPrit);
                      setEditData(filterPrit)
                  }
              
              console.log("editData:",editData)
              // usestate hook pop up untuk PritDescription
                  const [open, setOpen] = useState(false);
                  // const [idPopUp,setIdPopUp] =useState(mCate);
                  
                  const hide = () => {
                      setOpen(false);
                  };
                  
                  const handleOpenChange = (newOpen: boolean) => {
                      setOpen(newOpen);
                  
                  };
                  
                  const handleClick = (poliId: any) => {
                      setOpen(true);
                      console.log("hadir",poliId)
                      
                  };

                  
                      // datagrid Prit 
                      const columns = [
                          {
                          title: 'Price ID',
                          dataIndex: 'pritId',
                          key: 'pritId',
                          },
                          {
                          dataIndex: 'pritName',
                          title: 'Price Name',
                          key: 'pritName',
                          },
                          {
                          dataIndex: 'pritPrice',
                          title: 'Price',
                          key: 'pritPrice',
                          },
                          // title: 'Popover Column',
                          {
                          dataIndex: 'pritDescription',
                          key: 'pritDescription',
                          render: (_:any, record:{pritId:any}) => (
                              <span>
                              <Button type="primary"  onClick={() => handleClick(record.pritId)}>
                              <Popover
                                  content={record.pritDescription}
                                  title="Price Description"
                                  trigger="click"
                              >
                                  <EyeTwoTone />
                              </Popover>
                              </Button>
                              </span>
                          ),
                          },
                              {
                              dataIndex: 'pritType',
                              title: 'Type',
                              key: 'pritType',
                              },
                          {
                          render: (_:any, record:{pritId:any}) => (
                              <span className="flex">
                              <Button type="button" onClick={() => handleEditData(record.pritId)}>Edit</Button>
                                  <Popconfirm
                                  title="Are you sure to delete this Price Items?"
                                  onConfirm={() => handleDelete(record.pritId)}
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
                                  <Button type="button" onClick={handleOpenAddModal}><PlusIcon width={10} />Add</Button>
                              </div>
                              </>
                          )
                          }
                      ];
                   
                      // edit data policy
const [editForm] = Form.useForm();
// menyimpan perubahan data policy
const handleEdit = async (pritId:any) => {
  console.log(editData)
  try {
    await editForm.validateFields();
    await dispatchUpdatePrit(doUpdatePrit(editData));
    await dispatch(doUpdatePrit(editData));
    handleCloseEditModal();
    editForm.resetFields();
    setEditData({
      pritName: '',
      pritType: '',
      pritPrice: '',
      pritDescription: '',
    });
    // setIdPolicy(poliId);

    message.success('Data berhasil di edit');
      window.location.reload()
  } catch (error) {
    if (error instanceof Error) {
      message.error('Gagal mengupdate data: ' + error.message);
    } else {
      setAddFormError(error);
    }
  }
};

  // delete data Prit
  const handleDelete = async (pritId: any) => {
      try {
      await dispatchDeletePrit(doDeletePrit(pritId));
      // await dispatch(doPritRequest(pritId));
      console.log('idDelete:', pritId);
      message.success('Data berhasil dihapus');
      } catch (error) {
      message.error('Data gagal di hapus');
      console.log("delete id : ", pritId);
      }
      // window.location.reload()
  };

   // untuk select type category AddDaata
      const handleChangeOption = (value : string) => {
          setAddData({
          ...addData,
          pritType: value
          });
      };
      const handleChangeOptionEdit = (value : string) => {
          setEditData({
          ...editData,
          pritType: value
          });
      };

       // GetdataPrit Plus selector
      const mPrice = useSelector((state: any) => state.PritReducer.mPrit);
      
      const dispatch = useDispatch();
      useEffect(() => {
          dispatch(doPritRequest());
      }, []);

      // seacrh price Types 
      const [searchValue, setSearchValue] = useState('');
      const [selectedCategory, setSelectedCategory] = useState('');
      const [searchResult, setSearchResult] = useState([]);
      
      const handleSearch = (e: any) => {
        const inputValue = e.target.value.toLowerCase();
        setSearchValue(inputValue);
        const filterItems = inputValue === '' ? mPrice : mPrice.filter((item: { pritType: string; pritName: string; }) => {
          const isMatched = item.pritType.toLowerCase().includes(inputValue);
          const isCategoryMatched = selectedCategory ? item.pritType.toLowerCase() === selectedCategory.toLowerCase() : true;
          let isSubCategoryMatched = true;
          if (selectedCategory === 'fasility') {
            isSubCategoryMatched = ['swim', 'karaoke', 'cafe'].includes(item.pritName.toLowerCase());
          }
          return isMatched && isCategoryMatched && isSubCategoryMatched;
        });
        setSearchResult(filterItems);
      };
      
      const handleCategoryChange = (value: any) => {
        const inputValue = value.toLowerCase();
        setSearchValue(inputValue);
        setSelectedCategory(inputValue);
        if (inputValue === '') {
          setSearchResult([]);
        } else {
          const filterItems = mPrice.filter((item: { pritType: string; pritName: string; }) => {
            const isMatched = item.pritType.toLowerCase().includes(searchValue);
            const isCategoryMatched = item.pritType.toLowerCase() === searchValue;
            let isSubCategoryMatched = true;
            if (inputValue === 'Foods') {
              isSubCategoryMatched = ['Kebab', 'Mie', 'Nasi Goreng'].includes(item.pritName.toLowerCase());
            }
            return isMatched && isCategoryMatched && isSubCategoryMatched;
          });
          setSearchResult(filterItems);
        }
      };
      
      // const handleCategoryChange = (value: string) => {
      //   const inputValue = value.toLowerCase();
      //   setSearchValue(inputValue);
      //   setSelectedCategory(inputValue);
      //   if (inputValue === '') {
      //     setSearchResult([]);
      //   }
      // }
      
  return (
    <>
      <Head>
        <title>Master/PriceItems</title>
      </Head>
      <LayoutAdmin>
        <div>
          <div>
                  <Modal
                    title="Add Price Items"
                    open={openAddModal}
                    onOk={handleAdd}
                    onCancel={handleCloseAddModal}
                  >
                    <Form form={addForm} layout="vertical" onFinish={handleAdd}>
                      <Form.Item>
                      {/* <Input name="pritId" value={addData.pritId} onChange={handleAddInputChange} hidden /> */}
                      </Form.Item>
                      <Form.Item 
                      label="Price Name"
                      name="pritName" 
                         rules={[
                            {
                              required: true,
                              message: 'Please input Price Name',
                            },
                          ]}
                      >
                      <Input name="pritName" value={addData.pritName} onChange={handleAddInputChange} />
                    </Form.Item>
                    <Form.Item
                          label="Type"
                          name="pritType"
                          rules={[
                            {
                              required: true,
                              message: 'Please input Type',
                            },
                          ]}
                        >
                          <Select
                            name="pritType"
                            value={addData.pritType}
                            onChange={handleChangeOption}
                            style={{ width: 221 }}
                            rules={[
                                {
                                  required: true,
                                  message: 'Please Select Type Price Category',
                                },
                              ]}
                          >
                          {/* <Select.Option defaultvalue="Select" >--- select Category Type ---</Select.Option> */}
                          <Select.Option  value="Fasility" >Fasility</Select.Option>
                          <Select.Option  value="Food" >Food</Select.Option>
                          <Select.Option  value="Service" >Service</Select.Option>
                          <Select.Option  value="Snack" >Snack</Select.Option>
                          <Select.Option  value="SoftDrink" >SoftDrink</Select.Option>
                          </Select>
                        </Form.Item>
                        <Form.Item  label="Items Price"  rules={[{ required: true }]}>
                            <Input name="pritPrice" value={addData.pritPrice} onChange={handleAddInputChange} />
                        </Form.Item>
                        <Form.Item
                                label="Description"
                                name="pritDescription"
                                rules={[
                                {
                                    required: true,
                                    message: 'Please input category description',
                                },
                                ]}
                            >
                            <Input.TextArea name="pritDescription" value={addData.pritDescription} onChange={handleAddInputChange} />
                      </Form.Item>
                    </Form>
                  </Modal>
                  <Modal
                    title="Edit Policy"
                    visible={openEditModal}
                    onOk={handleEdit}
                    onCancel={handleCloseEditModal}
                  >
                    <Form form={editForm} layout="vertical" onFinish={handleEdit}>
                      <Form.Item>
                        <Input  value={editData.pritId} name="pritId" onChange={handleEditInputChange} hidden />
                      </Form.Item>
                      <Form.Item
                        label="Price Name"
                        // name="pritName"
                        rules={[
                          {
                            required: true,
                            message: 'Please input PoPricelicy Name',
                          },
                        ]}
                      >
                        <Input  value={editData.pritName}  name="pritName" onChange={handleEditInputChange} />
                      </Form.Item>
                      <Form.Item
                          label="Type"
                          name="pritType"
                          rules={[
                            {
                              required: true,
                              message: 'Please input Type',
                            },
                          ]}
                        >
                          <Select
                            name="pritType"
                            value={editData.pritType}
                            onChange={handleChangeOptionEdit}
                            style={{ width: 221 }}
                            placeholder="select Type Price Items"
                          >
                          {/* <Select.Option defaultvalue="Select" >--- select Category Type ---</Select.Option> */}
                          <Select.Option  value="Fasility" >Fasility</Select.Option>
                          <Select.Option  value="Food" >Food</Select.Option>
                          <Select.Option  value="Service" >Service</Select.Option>
                          <Select.Option  value="Snack" >Snack</Select.Option>
                          <Select.Option  value="SoftDrink" >SoftDrink</Select.Option>
                          </Select>
                        </Form.Item>
                        <Form.Item  
                        label="Items Price" 
                         rules={[
                          { 
                            required: true 
                          }
                          ]}
                          >
                            <Input  value={editData.pritPrice}  name="pritPrice" onChange={handleEditInputChange} />
                        </Form.Item>
                      <Form.Item
                        label="Policy Description"
                          
                        rules={[
                          {
                            required: true,
                            message: 'Please input Policy Description',
                          },
                        ]}
                      >
                        <Input.TextArea  value={editData.pritDescription} name="pritDescription"  onChange={handleEditInputChange} />
                      </Form.Item>
                    </Form>
                  </Modal>
                </div>

                <div>
                </div>
                <div className="flex" style={{ display: 'flex', alignItems: 'center' }}>
                        <h2 style={{ marginLeft: '5%' }}>Search Items &nbsp;</h2>
                        <Input.Search
                            placeholder="Search Items"
                            value={searchValue}
                            onChange={handleSearch}
                            // onSearch={() => handleSearch()}
                            style={{ width: '50%' }}
                            />

                            &nbsp;&nbsp;
                            <Select value={selectedCategory} onChange={handleCategoryChange} style={{ width: '20%' }}>
                            <Select.Option value="">--- select Category Type ---</Select.Option>
                            <Select.Option value="SoftDrink">SoftDrink</Select.Option>
                            <Select.Option value="Food">Food</Select.Option>
                            <Select.Option value="Service">Service</Select.Option>
                            <Select.Option value="Snack">Snack</Select.Option>
                            {/* <Select.Option value="SoftDrink">SoftDrink</Select.Option> */}
                            <Select.Option value="fasility">fasility</Select.Option>
                          </Select>
                        </div>
                <Divider />
                <Radio.Group>

                  <Table
                     columns={columns}
                     dataSource={searchResult.length ? searchResult : mPrice}                     style={{ margin: '0 auto', width: '90%' }}
                  />
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
