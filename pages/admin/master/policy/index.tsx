import LayoutAdmin from "@/components/Layout/admin";
import Head from "next/head";
import {
  doPolicyRequest,
  doPolicyCreate,
  doUpdatePolicy,
  doDeletePolicy
} from 'redux/Actions/Masters/reduceActions';
import React, { useState, useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {EyeTwoTone} from '@ant-design/icons';
import { PlusIcon } from "@heroicons/react/24/solid";
import { Layout, theme, Form, Input, message, Button, Popover, Popconfirm, Modal, Divider, Radio, Table } from "antd";
const { Header, Content, Footer, Sider } = Layout;
export default function MasterPolicy() {
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


  // Method dispacth for add,update,delete data policy
  const dispatchAddPolicy = useDispatch();
  const dispatchUpdatePolicy = useDispatch();
  const dispatchDeletePolicy = useDispatch();

  // modal add data policy
  const [openAddModal, setOpenAddModal] = useState(false);
  const handleOpenAddModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);
  const [addForm] = Form.useForm();
  const [addFormError, setAddFormError] = useState({});
  // state untuk menyimpan nilai input pada form tambah data policy
  const [addData, setAddData] = useState({
    poliId: '',
    poliName: '',
    poliDescription: '',
  });
console.log("ValuesAddPolicy:",addData)

  const TextArea = Input
  // mengubah nilai input pada form tambah data policy
  const handleAddInputChange = (event: { target: { name: any; value: any; }; }) => {
    const { name, value } = event.target;
    setAddData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // menambahkan data policy
  const handleAdd = async ():any => {
    try {
      await addForm.validateFields();
      await dispatchAddPolicy(doPolicyCreate(addData));
      await dispatch(doPolicyRequest(addData));
      handleCloseAddModal();
      addForm.resetFields();
      setAddData({
        poliId: '',
        poliName: '',
        poliDescription: '',
      });
      console.log('DataPolicy:',addData)
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
       { poliId: 0,
        poliName: '',
        poliDescription: 'string'}
      );
      console.log("dataValueEdit:",editData)

      // modal edit data policy
        const [openEditModal, setOpenEditModal] = useState(false);
        const handleOpenEditModal = (data: any) => {
          setEditData(data);
          setOpenEditModal(true);
        };
        const handleCloseEditModal = () => {
          setEditData({
            poliId: 0,
            poliName: '',
            poliDescription: ''
          });
          setOpenEditModal(false);
        }


  // mengubah nilai input pada form edit data policy
  const handleEditInputChange = (event: { target: { name: any; value: any; }; }) => {
    const { name, value } = event.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


    // mengambil data policy yang akan diedit dan mengisi nilai pada form edit data policy
    
    const handleEditData = (poliId: any) => {
      console.log(poliId)
      
      const filterPoli =  mPolice?.find(
        (temp: any) => temp.poliId === poliId
        )
        console.log('FindDataRegion:',filterPoli)
        handleOpenEditModal(filterPoli);
          setEditData(filterPoli)
        }
    
    console.log("editData:",editData)


   // usestate hook pop up untuk CagroDescription
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
  // datagrid Policy 
  const columns = [
    {
      title: 'Policy ID',
      dataIndex: 'poliId',
      key: 'poliId',
    },
    {
      dataIndex: 'poliName',
      title: 'Policy Name',
      key: 'poliName',
    },
    {
      // title: 'Popover Column',
      dataIndex: 'poliDescription',
      render: (_:any, record:{poliId:any}) => (
        <span>
          <Button type="primary"  onClick={() => handleClick(record.poliId)}>
          <Popover
            content={record.poliDescription}
            title="Poli Description"
            trigger="click"
          >
              <EyeTwoTone />
          </Popover>
          </Button>
          </span>
      ),
    },
    {
      render: (_:any, record:{poliId:any}) => (
        <span className="flex">
          <Button type="button" onClick={() => handleEditData(record.poliId)}>Edit</Button>
              <Popconfirm
              title="Are you sure to delete this policy?"
              onConfirm={() => handleDelete(record.poliId)}
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

  // GetdataPolicy Plus selector
  const mPolice = useSelector((state: any) => state.policyReducer.mPolicy);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(doPolicyRequest());
  }, []);


  // edit data policy
  const [editForm] = Form.useForm();
  // menyimpan perubahan data policy
  const handleEdit = async (poliId:any):any => {
    console.log(editData)
    try {
      await editForm.validateFields();
      await dispatchUpdatePolicy(doUpdatePolicy(editData));
      handleCloseEditModal();
      editForm.resetFields();
      setEditData({
        poliId: 0,
        poliName: '',
        poliDescription: '',
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

  // delete data policy
  const handleDelete = async (poliId: any):any => {
    try {
      await dispatchDeletePolicy(doDeletePolicy(poliId));
      await dispatch(doPolicyRequest(poliId));
      // window.location.reload();
      console.log('idDelete:', poliId);
      message.success('Data berhasil dihapus');
    } catch (error) {
      message.error('Data gagal di hapus');
      console.log("delete id : ", poliId);
    }
  };

  return (
    <>
      <Head>
        <title>Master/Policy</title>
      </Head>
      <LayoutAdmin>
         <div>
                  <Modal
                    title="Add Policy"
                    open={openAddModal}
                    onOk={handleAdd}
                    onCancel={handleCloseAddModal}
                  >
                    <Form form={addForm} layout="vertical" onFinish={handleAdd}>
                      <Form.Item
                        label="Policy Name"
                        name="poliName"
                        rules={[
                          {
                            required: true,
                            message: 'Please input Policy Name',
                          },
                        ]}
                      >
                        <Input name="poliName" value={addData.poliName} onChange={handleAddInputChange} />
                      </Form.Item>
                      <Form.Item
                        label="Policy Description"
                        name="poliDescription"
                        rules={[
                          {
                            required: true,
                            message: 'Please input Policy Description',
                          },
                        ]}
                      >
                        <Input.TextArea name="poliDescription" value={addData.poliDescription} onChange={handleAddInputChange} placeholder="isi deskripsi" />
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
                      <Form.Item
                       
                      >
                        <Input  value={editData?.poliId} onChange={handleEditInputChange} />
                      </Form.Item>
                      <Form.Item
                        label="Policy Name"
                        name="poliName"
                        rules={[
                          {
                            required: true,
                            message: 'Please input Policy Name',
                          },
                        ]}
                      >
                        <Input  name="poliName" value={editData?.poliName} onChange={handleEditInputChange} />
                      </Form.Item>
                      <Form.Item
                        label="Policy Description"
                        name="poliDescription"
                        rules={[
                          {
                            required: true,
                            message: 'Please input Policy Description',
                          },
                        ]}
                      >
                        <Input.TextArea name="poliDescription" value={editData?.poliDescription} onChange={handleEditInputChange} />
                      </Form.Item>
                    </Form>
                  </Modal>
                </div>

                <div>
                  <h2 className="bg-gray-300">
                    Policy
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
                    dataSource={mPolice}
                    style={{ margin: '0 auto', width: '90%' }}
                  />
                </Radio.Group>

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
