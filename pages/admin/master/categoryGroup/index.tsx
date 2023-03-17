import LayoutAdmin from "@/components/Layout/admin";
import Head from "next/head";
import React, { useState, useEffect, ReactNode } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { PlusIcon } from '@heroicons/react/24/solid';
import { EyeTwoTone, UploadOutlined } from '@ant-design/icons'
// import Form from 'react-bootstrap/Form';
import {
  doCagroRequest,
  doCagroCreate,
  doUpdateCagro,
  doDeleteCagro
} from 'redux/Actions/Masters/reduceActions';
import { Button, Divider, Input, Form, message, Modal, Popconfirm, Popover, Radio, Select, Table, theme, Upload, UploadProps, UploadFile, Image } from "antd";
import { RenderFunction } from "antd/es/tooltip";
// import { TypeOpen } from "antd/es/message/interface";
// import { RcFile, UploadChangeParam } from "antd/es/upload";
// import { storage } from '../../lib/firebase';

export default function MasterCategoryGroup() {

  // modal add data cate
  const [openAddModal, setOpenAddModal] = useState(false);
  const handleOpenAddModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);

  //modal edit cate
  const [editData, setEditData] = useState(
    {
      cagroId: 0,
      cagroName: '',
      cagroDescription: '',
      cagroType: ''
    }
  );
  console.log("dataValueEdit:", editData)

  // modal edit data policy
  const [openEditModal, setOpenEditModal] = useState(false);
  const handleOpenEditModal = (data: any) => {
    setEditData(data);
    setOpenEditModal(true);
  };
  const handleCloseEditModal = () => {
    setEditData({
      cagroId: 0,
      cagroName: '',
      cagroDescription: '',
      cagroType: ''
    });
    setOpenEditModal(false);
  }


  // state untuk menyimpan nilai input pada form tambah data cate

  const TextArea = Input

  // delete data Cagro
  const dispatchDelete = useDispatch();
  const handleDelete = async (cagroId: number) => {
    try {
      await dispatchDelete(doDeleteCagro(cagroId));
      console.log('idDelete:', cagroId);
      message.success('Data berhasil dihapus');
      window.location.reload()
    } catch (error) {
      message.error('Data gagal di hapus');
      console.log("delete id : ", cagroId);
    }
  };



  // get data cagro
  const mCate = useSelector((state: any) => state.cagroReducer.mCagro);


  // dispacth/define get data cagro
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(doCagroRequest());
  }, []);


  // usestate hook pop up untuk CagroDescription
  const [open, setOpen] = useState(false);
  // const [idPopUp,setIdPopUp] =useState(mCate);

  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);

  };

  const handleClick = (cagroId: any) => {
    setOpen(true);
    console.log("hadir", cagroId)

  };
  // Table antd columns cagro
  // const file = 'download.jpeg'; // Nama file gambar yang akan ditampilkan

  const columns = [
    {
      title: 'Icon',
      dataIndex: 'cagroIconUrl',
      key: 'cagroIconUrl',
      render: (_: any, record: string) => (
        <Image
          src={record?.cagroIconUrl}
          alt={record?.cagroIconUrl}
          style={{ width: "6rem" }}
        />
      ),
    },
    {
      title: 'Cagro ID',
      dataIndex: 'cagroId',
      key: 'cagroId',
    },
    {
      dataIndex: 'cagroName',
      title: 'Category Name',
      key: 'cagroName',
    },
    {
      dataIndex: 'cagroType',
      title: 'Type',
      key: 'cagroType',
    },
    {
      // title: 'Popover Column',
      dataIndex: 'cagroDescription',
      key: 'cagroDescription',
      render: (_: any, record: {
        cagroDescription: ReactNode | RenderFunction; cagroId: any
      }) => (
        <span>
          <Button type="primary" onClick={() => handleClick(record.cagroId)}>
            <Popover
              content={record.cagroDescription}
              title="Cagro Description"
              trigger="click"
            >
              <EyeTwoTone />
            </Popover>
          </Button>
        </span>
      ),
    },

    {
      render: (_: any, record: { cagroId: any }) => (
        <span className="flex">
          <Button type="link"
            onClick={() => handleEditData(record?.cagroId)}
          // onClick={()=>setOpenEditModal(record.cagroId)}
          >Edit</Button>
          <Popconfirm
            title="Are you sure to delete this Category Group?"
            onConfirm={() => handleDelete(record.cagroId)}
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

  // useState id edit data
  const handleEditData = (cagroId: any) => {
    console.log(cagroId)

    const filterCagro = mCate?.find(
      (temp: any) => temp.cagroId === cagroId
    )
    handleOpenEditModal(filterCagro);
    setEditData(filterCagro)
    console.log('FindDataCagro:', filterCagro)
  }

  // state add data
  const [dataUp, setDataUp] = useState(new FormData());
  const [selectedImage, setSelectedImage] = useState("");
  const [body, setBody] = useState({
    cagroName: '',
    cagroType: '',
    cagroDescription: '',
    cagroIcon: '',
  });


  // upload add data
  const onUploadLogo = (e: any) => {
    const img = e.target.files[0];
    const updatedBody = { ...body, file: img };
    setBody(updatedBody);
    console.log("img :", img);
    console.log("Bodys :", updatedBody);

    let formData = new FormData();
    formData.append("file", img);
    formData.append("cagroName", updatedBody.cagroName);
    formData.append("cagroType", updatedBody.cagroType);
    formData.append("cagroDescription", updatedBody.cagroDescription);
    console.log("formData:", Object.fromEntries(formData.entries()));
    setDataUp(formData);
    console.log("FormData:", formData)

    const imageUrl = URL.createObjectURL(e.target.files[0]);
    setSelectedImage(imageUrl);
  };


  // handleCange edit data
  const handleChangeEdit = (e: any) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });

  }

  // handleCange add data
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    const updatedBody = { ...body, [name]: value };
    setBody(updatedBody);
    console.log("input", updatedBody);

  }

  // handleChange edit data
  const handleChangeOptionEdit = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    const dataeditoption = ({
      ...editData,
      cagroType: value
    });
    setEditData(dataeditoption);
    console.log("cagrotypes:", dataeditoption);

  };
  // handleChange add data
  const handleChangeOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    const updatedBody = ({
      ...body,
      cagroType: value
    });
    setBody(updatedBody);
    console.log("cagrotypes:", updatedBody);

  };

  // handle add to database
  const handleSubmit = (e: any): any => {
    e.preventDefault();

    // You can use any AJAX library you like
    fetch("http://localhost:3005/category-group/upload/firebase", {
      method: "POST",
      body: dataUp,
    })
      .then((res) => {
        console.log(res);
        window.location.reload();
        message.success("upload successfully.");
      })
      .catch((e: any) => {
        message.error("upload failed.");
        console.log("upload failed");
      })
    console.log("View", Object.fromEntries(dataUp.entries()));
  }

  // handle edit to database
  const handleSubmitEdit = (e: any): any => {
    e.preventDefault();

    console.log(editData)
    try {

      dispatch(doUpdateCagro(editData));
      handleCloseEditModal();
      setEditData({
        cagroId: 0,
        cagroName: '',
        cagroType: '',
        cagroDescription: ''
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



  return (
    <>
      <Head>
        <title>Master/CategoryGroup</title>
      </Head>
      <LayoutAdmin>
        <div>

          {/* add data Cagro on modal */}

          <Modal
            title="Add Cagro"
            visible={openAddModal}
            onOk={handleSubmit}
            onCancel={handleCloseAddModal}
          >
            <Form
              layout="vertical"
              className="bg-white p-6 rounded-lg w-3/4 mx-auto"
            // form={addForm}
            >
              <Form.Item label="Cagro Name">
                <Input type="text" name="cagroName" value={body?.cagroName} onChange={handleChange} />
              </Form.Item>
              <Form.Item
                label="Type"
                rules={[
                  {
                    required: true,
                    message: 'Please input Cagro Type',
                  },
                ]}
              >
                <select name="cagroType" onChange={handleChangeOption} value={body?.cagroType} placeholder="select Type Category">
                  <option value="Default" >Select Your Type Category</option>
                  <option value="Fasility" >Fasility</option>
                  <option value="Category" >Category</option>
                  <option value="Service" >Service</option>
                </select>
              </Form.Item>
              <Form.Item label="Cagro Descrption">
                <Input.TextArea type="text" name="cagroDescription" value={body?.cagroDescription} onChange={handleChange} />
              </Form.Item>
              <Form.Item label="upload">
                <Input type="file" name="cagroIcon" value={body?.cagroIcon} onChange={onUploadLogo} accept="image/*" />
              </Form.Item>
              {selectedImage && (
                <Image src={selectedImage} alt="Selected Image" />
              )}
            </Form>
          </Modal>

          {/* modal edit data */}

          <Modal
            title="Edit Cagro"
            visible={openEditModal}
            onOk={handleSubmitEdit}
            onCancel={handleCloseEditModal}
          >
            <Form
              layout="vertical"
              className="bg-white p-6 rounded-lg w-3/4 mx-auto">
              <Form.Item label="Cagro Name" name="cagroName">
                <Input
                  type="text"
                  name="cagroName"
                  value={editData?.cagroName}
                  onChange={handleChangeEdit}
                />
              </Form.Item>

              <Form.Item label="Type" name="cagroType">
                <select
                  name="cagroType"
                  value={editData?.cagroType}
                  onChange={handleChangeOptionEdit}
                >
                  <option value="Default">Select Your Type Category</option>
                  <option value="Fasility">Fasility</option>
                  <option value="Category">Category</option>
                  <option value="Service">Service</option>
                </select>
              </Form.Item>

              <Form.Item label="Cagro Description" name="cagroDescription">
                <Input.TextArea
                  type="text"
                  name="cagroDescription"
                  value={editData?.cagroDescription}
                  onChange={handleChangeEdit}
                />
              </Form.Item>
            </Form>
          </Modal>


        </div>

        <div>
          <h2 className="bg-gray-300">
            Category Group
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
            dataSource={mCate}


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
