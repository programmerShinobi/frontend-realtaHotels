import LayoutAdmin from "@/components/Layout/admin";
import Head from "next/head";
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { PlusIcon } from '@heroicons/react/24/solid';
import { EyeTwoTone } from '@ant-design/icons'
import {
  doCagroRequest,
  doCagroCreate,
  doUpdateCagro,
  doDeleteCagro
} from 'redux/Actions/Masters/reduceActions';
import { Button, Divider, Form, Input, message, Modal, Popconfirm, Popover, Radio, Select, Table, theme ,Upload, UploadProps, UploadFile} from "antd";
// import { TypeOpen } from "antd/es/message/interface";
// import { RcFile, UploadChangeParam } from "antd/es/upload";
import { storage } from '../../lib/firebase';

export default function MasterCategoryGroup() {
  // untuk select type category AddDaata
  const handleChangeOption = (value: string) => {
    setAddData({
      ...addData,
      cagroType: value
    });
  };
  
  const handleChangeOptionEdit = (event: { target: { value: any; }; }) => {
  
    //   console.log(`selected ${value}`);
    //   const { value } = event.target;
    //   setEditData((prevData) => ({
    //     ...prevData,
    //      value,
    //   }));
  };
  
  // modal add data policy
  const [openAddModal, setOpenAddModal] = useState(false);
  const handleOpenAddModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);
  const [addForm] = Form.useForm();
  // state untuk menyimpan nilai input pada form tambah data policy
  const [addData, setAddData] = useState({
    cagroName: '',
    cagroDescription: '',
    pocaCagro: '',
    cagroType: '',
    cagroIcon: '',
    cagroIconUrl: ''
  });
  console.log("ValuesAddCagro:", addData)
  
  const TextArea = Input
  // mengubah nilai input pada form tambah data policy
  const [fileList, setFileList] = useState([]);

  const handleAddInputChange = (event :any) => {
    const { name, value } = event.target;
    setAddData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = ({ fileList }) => {
    setFileList(fileList);
  };
  
  // delete data Cagro
  const dispatchDelete = useDispatch();
  const handleDelete = async (cagroId: number) => {
    try {
      await dispatchDelete(doDeleteCagro(cagroId));
      message.success('Data berhasil dihapus');
    } catch (error) {
      message.error('Data gagal di hapus');
    }
  };
  
  const dispatchAddCagro = useDispatch()
  /* handle upload image */

  // let cagroIcon : any = [];
  // if (addData != null){
  //   cagroIcon = [{
  //     uid: '-1',
  //     name: 'avatar',
  //     status: 'done',
  //     url: addData.cagroIcon,
  //   },];
  // }
  // const [fileList, setFileList] = useState<UploadFile[]>(cagroIcon);
  // const [imageUrl, setImageUrl] = useState<string>(cagroIcon);

  // const beforeUpload = (file: RcFile) => {
  //   const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  //   if (!isJpgOrPng) {
  //     message.error('You can only upload JPG/PNG file!');
  //   }
  //   const isLt2M = file.size / 1024 / 1024 < 2;
  //   if (!isLt2M) {
  //     message.error('Image must smaller than 2MB!');
  //   }
  //   return isJpgOrPng && isLt2M;
  // };

  // const onChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
  //   setFileList(info.fileList);

  //   if (info.file.status === 'done') {
  //     const imageUrl = info.file.response.result;
  //     setImageUrl(imageUrl) 
  //     console.log('img',imageUrl)
  //   }
  // };

  // const onPreview = async (file: UploadFile) => {
  //   let src = file.url as string;
  //   if (!src) {
  //     src = await new Promise((resolve) => {
  //       const reader = new FileReader();
  //       reader.readAsDataURL(file.originFileObj as RcFile);
  //       reader.onload = () => resolve(reader.result as string);
  //     });
  //   }
  //   const image = new Image();
  //   image.src = src;
  //   const imgWindow = window.open(src);
  //   imgWindow?.document.write(image.outerHTML);
  // };
  /* endhandle upload image */
  // menambahkan data cagro
  const handleAdd = async () => {
    
    try {
      // validasi
      await addForm.validateFields();

      // upload
      const file = fileList[0];
      const storageRef = storage.ref(`category-icon/${file.name}`);
      const snapshot = await storageRef.put(file.originFileObj);
      const fileUrl = await snapshot.ref.getDownloadURL();

      // add eksekusi
      const newData = {
        cagroName: addData.cagroName,
        cagroDescription: addData.cagroDescription,
        pocaCagro: addData.pocaCagro,
        cagroType: addData.cagroType,
        cagroIconUrl: fileUrl,
      };
      await dispatchAddCagro(doCagroCreate(newData));
      await dispatch(doCagroCreate(newData));
      handleCloseAddModal();
      addForm.resetFields();
      
      message.success('Data berhasil ditambahkan');
    } catch (error) {
      if (error instanceof Error) {
        message.error('Data gagal ditambahkan ' + error.message);
      } else {
        setAddFormError(error);
      }
    }
  };
  const [editData, setEditData] = useState(
    {
      cagroName: '',
      cagroDescription: '',
      pocaCagro: '',
      cagroType: '',
      cagroIcon: '',
      cagroIconUrl: ''
    }
  );
  
  
  // modal edit data cagro
  const [openEditModal, setOpenEditModal] = useState(false);
  const handleOpenEditModal = (data: any) => {
    setEditData(data);
    setOpenEditModal(true);
  };
  const handleCloseEditModal = () => {
    setEditData({
      cagroName: '',
      cagroDescription: '',
      pocaCagro: '',
      cagroType: '',
      cagroIcon: '',
      cagroIconUrl: ''
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
  
  const handleEditData = (cagroId: any) => {
  
    const filterCagro = mCate?.find(
      (temp: any) => temp.cagroId === cagroId
    )
    handleOpenEditModal(filterCagro);
    setEditData(filterCagro)
  }
  
  // edit data cagro
  const [editForm] = Form.useForm();
  
  // dispatch ubah data cagro
  const dispatchUpdateCagro = useDispatch()
  
  // menyimpan perubahan data cagro
  const handleEdit = async (cagroId: any) => {
    try {
      await editForm.validateFields();
      await dispatchUpdateCagro(doUpdateCagro(editData));
      handleCloseEditModal();
      editForm.resetFields();
      setEditData({
        cagroName: '',
        cagroDescription: '',
        pocaCagro: '',
        cagroType: '',
        cagroIcon: '',
        cagroIconUrl: ''
      });
      // setIdPolicy(poliId);
  
      message.success('Data berhasil di edit');
    } catch (error) {
      if (error instanceof Error) {
        message.error('Gagal mengupdate data: ' + error.message);
      } else {
        setAddFormError(error);
      }
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
  
  };
  // Table antd columns cagro
  // const file = 'download.jpeg'; // Nama file gambar yang akan ditampilkan
  
  const columns = [
    {
      title: 'Icon',
      dataIndex: 'cagroIconUrl',
      key: 'cagroIconUrl',
      render: (_: any, record: string) => (
        <img
          src={record?.cagroIconUrl}
          alt={record?.cagroIconUrl}
          className="w-1/4"
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
          <Button type="button" onClick={() => handleEditData(record.cagroId)}>Edit</Button>
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

  // const handleChangeUpload = (info: { file: { status: string; response: { url: any; }; name: any; }; }) => {
  //   if (info.file && info.file.status === 'done') {
  //     const url = info.file.response.url; // assuming the server returns the uploaded image's URL
  //     setAddData((prevData: any) => ({ ...prevData, cagroIconUrl: url }));
  //     message.success(`${info.file.name} uploaded successfully`);
  //   } else if (info.file && info.file.status === 'error') {
  //     message.error(`${info.file.name} upload failed.`);
  //   }
  // };
  
  return (
    <>
      <Head>
        <title>Master/CategoryGroup</title>
      </Head>
      <LayoutAdmin>

        {"This is Master / CategoryGroup page"}
        <div>

          {/* add data Cagro on modal */}
          <div>
            <Modal
              title="Add Cagro"
              visible={openAddModal}
              onOk={handleAdd}
              onCancel={handleCloseAddModal}
            >
              <Form form={addForm} layout="vertical" onFinish={handleAdd}>
                {/* <Form.Item>
        <Input name="cagroId" value={addData.cagroId} onChange={handleAddInputChange} hidden/>
      </Form.Item> */}
                <Form.Item
                  label="Cagro name"
                  name="cagroName"
                  rules={[
                    {
                      required: true,
                      message: 'Please input Cagro Name',
                    },
                  ]}
                >
                  <Input name="cagroName" value={addData.cagroName} onChange={handleAddInputChange} />
                </Form.Item>
                <Form.Item
                  label="Type"
                  name="cagroType"
                  rules={[
                    {
                      required: true,
                      message: 'Please input Cagro Type',
                    },
                  ]}
                >
                  <Select
                    name="cagroType"
                    value={addData.cagroType}
                    onChange={handleChangeOption}
                    style={{ width: 221 }}

                  >
                    {/* <Select.Option defaultvalue="Select" >--- select Category Type ---</Select.Option> */}
                    <Select.Option value="fasility" >fasility</Select.Option>
                    <Select.Option value="Category" >Category</Select.Option>
                    <Select.Option value="Service" >Service</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Policy Rules"
                  name="pocaCagro"
                  rules={[
                    {
                      required: true,
                      message: 'Please input Policy Rules',
                    },
                  ]}
                >
                  <Input name="pocaCagro" value={addData.pocaCagro} onChange={handleAddInputChange} />

                </Form.Item>
                <Form.Item
                  label="Category Description"
                  name="cagroDescription"
                  rules={[
                    {
                      required: true,
                      message: 'Please input category description',
                    },
                  ]}
                >
                  <Input.TextArea name="cagroDescription" value={addData.cagroDescription} onChange={handleAddInputChange} />
                </Form.Item>
                <Form.Item
                  label="Category Icon"
                  name="cagroIcon"
                // rules={[
                //   {
                //     required: true,
                //     message: 'Please input category icon',
                //   },
                // ]}
                >
                 <Upload
                    action="http://localhost:3005/category-group/upload/firebase/"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={onPreview}
                    beforeUpload={beforeUpload}
                    onChange={handleFileChange}
                    method="post"
                  >
                    {fileList.length < 1 && '+ Upload'}
                  </Upload>
                </Form.Item>
              </Form>
            </Modal>
            <Modal
              title="Edit Cagro"
              visible={openEditModal}
              onOk={handleEdit}
              onCancel={handleCloseEditModal}
            >
              <Form form={editForm} layout="vertical" onFinish={handleEdit}>
                <Form.Item>
                  <Input value={editData.cagroId} onChange={handleEditInputChange} hidden />
                </Form.Item>
                <Form.Item
                  label="Cagro name"
                  rules={[
                    {
                      required: true,
                      message: 'Please input Cagro Name',
                    },
                  ]}
                >
                  <Input name={editData.cagroName} onChange={handleEditInputChange} />
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
                  <Select
                    // name="cagroType"
                    value={editData.cagroType}
                    onChange={handleChangeOption}
                    style={{ width: 120 }}

                  >
                    <Select.Option defaultvalue="Select" >--- select Category Type ---</Select.Option>
                    <Select.Option value="fasility" >fasility</Select.Option>
                    <Select.Option value="Category" >Category</Select.Option>
                    <Select.Option value="Service" >Service</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Policy Rules"
                  rules={[
                    {
                      required: true,
                      message: 'Please input Policy Rules',
                    },
                  ]}
                >
                  <Input name={editData.pocaCagro} onChange={handleEditInputChange} />
                </Form.Item>
                <Form.Item
                  label="Category Description"
                  rules={[
                    {
                      required: true,
                      message: 'Please input category description',
                    },
                  ]}
                >
                  <Input name={editData.cagroDescription} onChange={handleEditInputChange} />
                </Form.Item>
                <Form.Item
                  label="Category Icon"
                  rules={[
                    {
                      required: true,
                      message: 'Please input category icon',
                    },
                  ]}
                >
                  <Input name={editData.cagroIcon} onChange={handleEditInputChange} />
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
