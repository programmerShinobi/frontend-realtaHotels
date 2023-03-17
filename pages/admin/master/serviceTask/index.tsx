import LayoutAdmin from "@/components/Layout/admin";
import Head from "next/head";
import React, { useState, useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { PlusIcon } from '@heroicons/react/24/solid';
import {
  doServiceTaskRequest,
  doServiceTaskCreate,
  doUpdateServiceTask,
  doDeleteServiceTask
} from 'redux/Actions/Masters/reduceActions';
import { Button, Divider, Form, Input, Layout, message, Modal, Popconfirm, Radio, Table } from "antd";
const { Header, Content, Footer, Sider } = Layout;

export default function MasterServiceTask() {
  // Method dispacth for add,update,delete data policy
  const dispatchAddServiceTask = useDispatch();
  const dispatchUpdateServiceTask = useDispatch();
  const dispatchDeleteServiceTask = useDispatch();

  // modal add data policy
  const [openAddModal, setOpenAddModal] = useState(false);
  const handleOpenAddModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);
  const [addForm] = Form.useForm();
  const [addFormError, setAddFormError] = useState({});
  // state untuk menyimpan nilai input pada form tambah data policy
  const [addData, setAddData] = useState({
    // setaId: '',
    setaName: '',
    setaSeq: '',
  });
  console.log("ValuesAddSeta:", addData)

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
  const handleAdd = async () => {
    try {
      await addForm.validateFields();
      await dispatchAddServiceTask(doServiceTaskCreate(addData));
      await dispatch(doServiceTaskRequest(addData));
      handleCloseAddModal();
      addForm.resetFields();
      setAddData({
        //  setaId: '',
        setaName: '',
        setaSeq: '',
      });
      console.log('DataSeta:', addData)
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
      setaId: 0,
      setaName: '',
      setaSeq: '',
    }
  );
  console.log("dataValueEdit:", editData)

  // modal delete data policy 
  const [deleteData, setDeleteData] = useState(null)

  // modal edit data policy
  const [openEditModal, setOpenEditModal] = useState(false);
  const handleOpenEditModal = (data: any) => {
    setEditData(data);
    setOpenEditModal(true);
  };
  const handleCloseEditModal = () => {
    setEditData({
      setaId: 0,
      setaName: '',
      setaSeq: '',
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

  const handleEditData = (setaId: any) => {
    console.log(setaId)

    const filterSeta = mSeta?.find(
      (temp: any) => temp.setaId === setaId
    )
    console.log('FindDataSeta:', filterSeta)
    handleOpenEditModal(filterSeta);
    setEditData(filterSeta)
  }

  console.log("editData:", editData)


  // usestate hook pop up untuk CagroDescription
  const [open, setOpen] = useState(false);
  // const [idPopUp,setIdPopUp] =useState(mCate);

  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);

  };

  const handleClick = (setaId: any) => {
    setOpen(true);
    console.log("hadir", setaId)

  };
  // datagrid Policy 
  const columns = [
    {
      title: 'ServiceTask ID',
      dataIndex: 'setaId',
      key: 'setaId',
    },
    {
      dataIndex: 'setaName',
      title: 'ServiceTask Name',
      key: 'setaName',
    },
    {
      dataIndex: 'setaSeq',
      title: 'Squence Order',
      key: 'setaSeq',
    },

    {
      render: (_: any, record: { setaId: any }) => (
        <span className="flex">
          <Button type="button" onClick={() => handleEditData(record.setaId)}>Edit</Button>
          <Popconfirm
            title="Are you sure to delete this service task?"
            onConfirm={() => handleDelete(record.setaId)}
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
  const mSeta = useSelector((state: any) => state.serviceTaskReducer.mSerTask);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(doServiceTaskRequest());
  }, []);


  // edit data policy
  const [editForm] = Form.useForm();
  // menyimpan perubahan data policy
  const handleEdit = async (setaId: any) => {
    console.log(editData)
    try {
      await editForm.validateFields();
      await dispatchUpdateServiceTask(doUpdateServiceTask(editData));
      await dispatch(doServiceTaskRequest(editData));
      handleCloseEditModal();
      editForm.resetFields();
      setEditData({
        setaId: "",
        setaName: "",
        setaSeq: "",
      });
      // setIdPolicy(poliId);
            window.location.reload();
      message.success('Data berhasil di edit');
    } catch (error) {
      if (error instanceof Error) {
        message.error('Gagal mengupdate data: ' + error.message);
      } else {
        setAddFormError(error);
      }
    }
  };

  // delete data Service Task
  const handleDelete = async (setaId: any) => {
    try {
      await dispatchDeleteServiceTask(doDeleteServiceTask(setaId));
      await dispatch(doServiceTaskRequest(setaId));
      // window.location.reload();
      console.log('idDelete:', setaId);
      message.success('Data berhasil dihapus');
    } catch (error) {
      message.error('Data gagal di hapus');
      console.log("delete id : ", setaId);
    }
  };



  return (
    <>
      <Head>
        <title>Master/ServiceTask</title>
      </Head>
      <LayoutAdmin>
        <div>

          {/* add data policy on modal */}
          <div>
            <Modal
              title="Add Service Task"
              open={openAddModal}
              onOk={handleAdd}
              onCancel={handleCloseAddModal}
            >
              <Form form={addForm} layout="vertical" onFinish={handleAdd}>
                <Form.Item
                  label="Task Name"
                  name="setaName"
                  rules={[
                    {
                      required: true,
                      message: 'Please input Task Name',
                    },
                  ]}
                >
                  <Input name="setaName" value={addData.setaName} onChange={handleAddInputChange} placeholder="Isi Task Name" />
                </Form.Item>
                <Form.Item
                  label="Squence Order"
                  name="setaSeq"
                  rules={[
                    {
                      required: true,
                      message: 'Please input Squence Order',
                    },
                  ]}
                >
                  <Input name="setaSeq" value={addData.setaSeq} onChange={handleAddInputChange} placeholder="isi Squence" />
                </Form.Item>
              </Form>
            </Modal>
            <Modal
              title="Edit Service Task"
              visible={openEditModal}
              onOk={handleEdit}
              onCancel={handleCloseEditModal}
            >
              <Form form={editForm} layout="vertical" onFinish={handleEdit}>
                <Form.Item

                >
                  <Input name="setaId" value={editData.setaId} onChange={handleEditInputChange} />
                </Form.Item>
                <Form.Item
                  label="Task Name"
                  //  name="setaName"
                  rules={[
                    {
                      required: true,
                      message: 'Please input Task Name',
                    },
                  ]}
                >
                  <Input name="setaName" value={editData.setaName} onChange={handleEditInputChange} />
                </Form.Item>
                <Form.Item
                  label="Squence Order"
                  // name="setaSeq"
                  rules={[
                    {
                      required: true,
                      message: 'Please input Squence Order',
                    },
                  ]}
                >
                  <Input name="setaSeq" value={editData.setaSeq} onChange={handleEditInputChange} />
                </Form.Item>
              </Form>
            </Modal>
          </div>

          <div>
            <h2 className="bg-gray-300">
              ServiceTask
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
              dataSource={mSeta}
              style={{ margin: '0 auto', width: '90%' }}
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
