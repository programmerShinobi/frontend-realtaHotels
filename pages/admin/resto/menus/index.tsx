import LayoutAdmin from "@/components/Layout/admin";
import Head from "next/head";
import { doCreateRestoMenus, doDeleteRestoMenus, doRestoMenusRequest, doUpdateRestoMenus } from "@/redux/Actions/Resto/reduceActions";
import axios from "axios";
import { Field } from "formik";
import { Router, useRouter } from "next/router";
import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { array } from "yup/lib/locale";
import ReactPaginate from "react-paginate";
import { Button, Upload, Modal, Form, Select, message, UploadFile, UploadProps } from "antd";

import { UploadOutlined } from "@ant-design/icons";
import type { DragEndEvent } from "@dnd-kit/core";
import { DndContext, PointerSensor, useSensor } from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { css } from "@emotion/css";
import { RcFile } from "antd/es/upload";
import LayoutHome from "@/components/Layout";

interface FormData {
  userId: string;
  upload: string;
  files: RcFile[];
}

interface Props {
  visible: boolean;
  onCancel: () => void;
}

export default function RestoMenus() {
  const [form] = Form.useForm();
  const [isOn, setIsOn] = useState(false);
  const toggleSwitch = () => {
    setIsOn(!isOn);
  };
  const router = useRouter();

  const [Data, setData]: any = useState([]);

  const restoMenus = useSelector((state: any) => state.restoMenusReducers.restoMenus);
  const dispatch = useDispatch();
  // console.log(restoMenus);

  const [id, setId] = useState();
  const [openAdd, setAdd] = useState(false);

  //  dispatch API GET resto

  // setData API GET resto
  const dispatchDelete = useDispatch();

  useEffect(() => {
    if (restoMenus && restoMenus.results) {
      setData(restoMenus.results);
    }
  });

  // console.log(Data);

  const handleDelete = (id: number) => {
    // console.log(id);
    dispatchDelete(doDeleteRestoMenus(id));
    dispatch(doRestoMenusRequest());
  };

  const [open, setOpen] = useState(false);

  // const [open, setOpen] = useState(false);
  // const [popUpEdit, setPopUpEdit] = useState(false);

  //=================Upload Foto========================//

  const handleAddPhotos = () => {};

  //===================ADD DATA=====================//

  const [dataAdd, setDataAdd] = useState({
    remeName: "",
    remeDescription: "",
    remePrice: "",
    remeStatus: "",
  });

  const handleChange = (event: any) => {
    const remeStatus = event.target.checked ? "available" : "empty";
    setDataAdd({
      ...dataAdd,
      remeStatus: remeStatus,
    });
    toggleSwitch();
  };

  const handleTextAreaChange = (event: any) => {
    setDataAdd({
      ...dataAdd,
      remeDescription: event.target.value,
    });
  };

  const evenHandler = (field: any) => (event: any) => {
    setDataAdd({
      ...dataAdd,
      [field]: event.target.value,
    });
  };

  const addData = (event: any) => {
    setAdd(false);
    // console.log(dataAdd);
    event.preventDefault();
    // useEffect(() => {
    dispatch(doCreateRestoMenus({ ...dataAdd }));
    // }, []);
  };

  //=================EDIT DATA=====================//

  const [dataEdit, setDataEdit] = useState({
    remeId: 0,
    remeName: "",
    remeDescription: "",
    remePrice: "",
    remeStatus: "",
  });

  const handleEdit = (isi: any) => {
    console.log(isi);
    setOpen(true);
    setDataEdit({ ...isi });
  };

  // console.log(dataEdit);

  // console.log(dataEdit.remeName);

  const handleChangeSwitch = (event: any) => {
    const remeStatus = event.target.checked ? "available" : "empty";
    setDataEdit({
      ...dataEdit,
      remeStatus: remeStatus,
    });
    toggleSwitch();
  };

  const handleTextAreaChangeEdit = (event: any) => {
    setDataEdit({
      ...dataEdit,
      remeDescription: event.target.value,
    });
  };

  const evenHandlerEdit = (field: any) => (event: any) => {
    setDataEdit({
      ...dataEdit,
      [field]: event.target.value,
    });
  };

  const editData = (event: any) => {
    setOpen(false);
    event.preventDefault();
    dispatch(doUpdateRestoMenus({ ...dataEdit }));
  };

  useEffect(() => {
    dispatch(doRestoMenusRequest());
  }, [restoMenus]);

  // SEARCH BAR //

  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = Data.filter((Resto: any) => {
    return Resto.remeName && Resto.remeName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // console.log(Data.remeName);
  // console.log(Data);

  //Pagination table//

  const [currentPage, setCurrentPage] = useState(0);
  const [dataPerPage, setDataPerPage] = useState(7);

  const handlePageClick = (selectedPage: any) => {
    setCurrentPage(selectedPage.selected);
  };

  const pageCount = Math.ceil(Data.length / dataPerPage);
  const offset = currentPage * dataPerPage;

  //==================UPLOAD PHOTOS===============//

  // TRIGER OPEN ADD PHOTOS
  const [addPhotos, setOpenAddPhotos] = useState(false);

  const handleupload = (id: any) => {
    // console.log(id)
    setOpenAddPhotos(true);
  };
  // console.log(addPhotos);

  /* handle upload */
  interface DraggableUploadListItemProps {
    originNode: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
    file: UploadFile<any>;
  }

  const DraggableUploadListItem = ({ originNode, file }: DraggableUploadListItemProps) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
      id: file.uid,
    });

    const style: React.CSSProperties = {
      transform: CSS.Transform.toString(transform),
      transition,
      cursor: "move",
    };

    // prevent preview event when drag end
    const className = isDragging
      ? css`
          a {
            pointer-events: none;
          }
        `
      : "";

    return (
      <div ref={setNodeRef} style={style} className={className} {...attributes} {...listeners}>
        {/* hide error tooltip when dragging */}
        {file.status === "error" && isDragging ? originNode.props.children : originNode}
      </div>
    );
  };

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);

  const sensor = useSensor(PointerSensor, {
    activationConstraint: { distance: 10 },
  });

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setFileList((prev) => {
        const activeIndex = prev.findIndex((i) => i.uid === active.id);
        const overIndex = prev.findIndex((i) => i.uid === over?.id);
        return arrayMove(prev, activeIndex, overIndex);
      });
    }
  };

  const propsUpload: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },

    beforeUpload: (file, newFileList) => {
      setFileList(newFileList);
    },

    fileList,
    multiple: true,
    itemRender: (originNode, file) => <DraggableUploadListItem originNode={originNode} file={file} />,
    progress: {
      strokeColor: {
        "0%": "#108ee9",
        "100%": "#87d068",
      },
      strokeWidth: 3,
      format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
    },
  };
  /* end handle upload */

  /* handle form */
  const onFinish = (values: any) => {
    console.log(values);
    console.log(fileList);

    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("file[]", file as RcFile);
    });

    formData.append("userId", "10");
    formData.append("upload", "Multiple Upload ni Boss");

    setUploading(true);
    // You can use any AJAX library you like
    fetch("http://localhost:3005/resto-menus-photos/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => console.log(res))
      .then(() => {
        setFileList([]);
        message.success("upload successfully.");
        console.log("upload successfully");
      })
      .catch((e: any) => {
        message.error("upload failed.");
        console.log("upload failed");
      })
      .finally(() => {
        setUploading(false);
      });

    // handleClose(false);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  /* endhandle form */

  // useEffect(() => {
  //   photos
  // }, []);
  return (
    <div>
      <LayoutAdmin>
        <main className='h-screen'>
          <div className=' flex justify-end mb-2'>
            <div className='input-group relative mb-2 flex w-60 flex-wrap items-stretch'>
              <input
                type='search'
                className='form-control relative m-0 block w-full min-w-0 flex-auto  border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none'
                placeholder='Search Menus'
                aria-label='Search'
                aria-describedby='button-addon2'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className='flex flex-col'>
            <div className='overflow-x-auto sm:mx-0.5 lg:mx-0.5'>
              <div className='inline-block min-w-full'>
                <div className='overflow-hidden'>
                  <table className='min-w-full'>
                    <thead className='border-b bg-white'>
                      <tr>
                        <th scope='col' className='px-5 py-5 text-left text-sm font-medium text-gray-900'>
                          ID
                        </th>
                        <th scope='col' className='px-5 py-5 text-left text-sm font-medium text-gray-900'>
                          Menu&nbsp;Name
                        </th>
                        <th scope='col' className='px-5 py-5 text-left text-sm font-medium text-gray-900'>
                          Description
                        </th>
                        <th scope='col' className='px-5 py-5 text-left text-sm font-medium text-gray-900'>
                          Price
                        </th>
                        <th scope='col' className='px-5 py-5 text-left text-sm font-medium text-gray-900'>
                          Status
                        </th>
                        <th scope='col' className='px-5 py-5 text-left text-sm font-medium text-gray-900'>
                          <button onClick={() => setAdd(true)}>
                            <a className='text-green-500'>+ ADD</a>
                          </button>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData &&
                        filteredData.slice(offset, offset + dataPerPage).map((Resto: any) => {
                          return (
                            <tr key={Resto.remeId} className='border-b bg-white transition duration-300 ease-in-out hover:bg-gray-100'>
                              <td className='w-7 px-5 py-5 text-sm font-medium text-gray-900'>{Resto.remeId}</td>
                              <td className='w-40 px-5 py-5 text-sm font-light text-gray-900'>{Resto.remeName}</td>
                              <td className='w-96 px-5 py-5 text-justify text-sm font-light text-gray-900'>{Resto.remeDescription}</td>
                              <td className='whitespace-nowrap px-5 py-5 text-sm font-light text-gray-900'>{Resto.remePrice}</td>
                              <td className='whitespace-nowrap px-5 py-5 text-sm font-light text-gray-900'>{Resto.remeStatus}</td>
                              <td className='whitespace-nowrap text-sm font-light text-gray-900 px-5 py-5'>
                                <button className='' onClick={() => handleDelete(Resto.remeId)}>
                                  <svg className='w-4 hover:text-red-400' fill='none' stroke='currentColor' stroke-width='1.5' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' aria-hidden='true'>
                                    <path
                                      stroke-linecap='round'
                                      stroke-linejoin='round'
                                      d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                                    ></path>
                                  </svg>
                                </button>
                                <button className='ml-2 hover:text-green-400' onClick={() => handleEdit(Resto)}>
                                  <svg className='w-4' fill='none' stroke='currentColor' stroke-width='1.5' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' aria-hidden='true'>
                                    <path
                                      stroke-linecap='round'
                                      stroke-linejoin='round'
                                      d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
                                    ></path>
                                  </svg>
                                </button>
                                <button className='ml-2 hover:text-blue-400 ' onClick={() => handleupload(Resto.remeId)}>
                                  <svg className='w-4' fill='none' stroke='currentColor' stroke-width='1.5' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' aria-hidden='true'>
                                    <path
                                      stroke-linecap='round'
                                      stroke-linejoin='round'
                                      d='M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z'
                                    ></path>
                                  </svg>
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      <ul>
                        {/* {filteredData.map((item: any) => (
                          <li key={item.remeId}>{item.remeName}</li>
                        ))} */}
                      </ul>
                      {/* Edit Data */}
                      <Modal footer={null} title='Add / Edit Resto Menus' centered open={open} onCancel={() => setOpen(false)} width={700}>
                        <div className='flex gap-5'>
                          <div className='mt-3'>
                            <label htmlFor=''> Resto Menu</label> <br />
                            <input className='w-[300px] p-1 mt-1 border-gray-200 border-2 rounded text-gray-400' type='text' value={dataEdit.remeName} onChange={evenHandlerEdit("remeName")} />
                          </div>
                          <div className='mt-3'>
                            <label htmlFor=''> Price</label> <br />
                            <input className='w-[300px] p-1 mt-1 border-gray-200 border-2 rounded text-gray-400' type='text' placeholder='Menu resto price' value={dataEdit.remePrice} onChange={evenHandlerEdit("remePrice")} />
                          </div>
                        </div>
                        <div className='mt-4'>
                          <label htmlFor=''> Resto menu descriptions</label> <br />
                          <textarea className='border-gray-200 border-2 rounded w-full h-24 mt-2 p-1' placeholder='Enter your descriptions' value={dataEdit.remeDescription} onChange={handleTextAreaChangeEdit}></textarea>
                        </div>
                        <div className='flex mt-4 items-center'>
                          <h1>Available ?</h1>
                          <label htmlFor='toggle' className=' ml-3 flex items-center cursor-pointer'>
                            <div className='relative'>
                              <input id='toggle' type='checkbox' className='sr-only' checked={isOn} onChange={handleChangeSwitch} value={isOn ? "available" : "empty"} />
                              <div className='block bg-gray-200 w-10 h-6 rounded-full'></div>
                              <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${isOn ? "transform translate-x-full bg-green-500" : "bg-gray-300"}`}></div>
                            </div>
                            <div className='ml-3 text-gray-700 font-medium'>{isOn ? "available" : "empty"}</div>
                          </label>
                        </div>
                        <footer className='flex justify-end gap-3 pt-5'>
                          <button className='h-8 w-24 bg-red-600 rounded text-white ' onClick={() => setOpen(false)}>
                            Cancel
                          </button>
                          <button className='h-8 w-24 bg-blue-700 rounded text-white' onClick={editData}>
                            Save
                          </button>
                        </footer>
                      </Modal>
                      {/* setADD */}
                      <Modal footer={null} title='Add / Edit Resto Menus' centered open={openAdd} onOk={() => setAdd(false)} onCancel={() => setAdd(false)} width={700}>
                        <div className='flex gap-5'>
                          <div className='mt-3'>
                            <label htmlFor=''> Resto Menu</label> <br />
                            <input className='w-[300px] p-1 mt-1 border-gray-200 border-2 rounded text-gray-400' type='text' placeholder='Menu resto name' value={dataAdd.remeName} onChange={evenHandler("remeName")} />
                          </div>
                          <div className='mt-3'>
                            <label htmlFor=''> Price</label> <br />
                            <input className='w-[300px] p-1 mt-1 border-gray-200 border-2 rounded text-gray-400' type='number' placeholder='Menu resto price' value={dataAdd.remePrice} onChange={evenHandler("remePrice")} />
                          </div>
                        </div>
                        <div className='mt-4'>
                          <label htmlFor=''> Resto menu descriptions</label> <br />
                          <textarea className='border-gray-200 border-2 rounded w-full h-24 mt-2 p-1' name='' id='' placeholder='Enter your descriptions' value={dataAdd.remeDescription} onChange={handleTextAreaChange}></textarea>
                        </div>
                        <div className='flex mt-4 items-center'>
                          <h1>Available ?</h1>
                          <label htmlFor='toggle' className=' ml-3 flex items-center cursor-pointer'>
                            <div className='relative'>
                              <input id='toggle' type='checkbox' className='sr-only' checked={isOn} onChange={handleChange} value={isOn ? "available" : "empty"} />
                              <div className='block bg-gray-200 w-10 h-6 rounded-full'></div>
                              <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${isOn ? "transform translate-x-full bg-green-500" : "bg-gray-300"}`}></div>
                            </div>
                            <div className='ml-3 text-gray-700 font-medium'>{isOn ? "available" : "empty"}</div>
                          </label>
                        </div>
                        <footer className='flex justify-end gap-3 pt-5'>
                          <button className='h-8 w-24 bg-red-600 rounded text-white ' onClick={() => setAdd(false)}>
                            Cancel
                          </button>
                          <button className='h-8 w-24 bg-blue-700 rounded text-white' onClick={addData}>
                            Add Data
                          </button>
                        </footer>
                      </Modal>
                      {/* UPLOAD FOTO */}
                      <Modal centered open={addPhotos} onOk={form.submit} onCancel={() => setOpenAddPhotos(false)} width={700}>
                        <div className='flex flex-col items-center justify-center'>
                          <h1 className='text-2xl font-bold mb-4'>Upload Foto</h1>
                          <Form name='basic' labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete='off' form={form}>
                            <DndContext sensors={[sensor]} onDragEnd={onDragEnd}>
                              <SortableContext items={fileList.map((i) => i.uid)} strategy={verticalListSortingStrategy}>
                                <Upload multiple={true} itemRender={(originNode, file) => <DraggableUploadListItem originNode={originNode} file={file} />} {...propsUpload}>
                                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                                </Upload>
                              </SortableContext>
                            </DndContext>
                          </Form>
                        </div>
                      </Modal>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className='flex justify-end mr-4'>
            <ReactPaginate
              previousLabel={"<"}
              nextLabel={">"}
              breakLabel={"..."}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={"flex justify-center items-center mt-4"}
              activeClassName={"bg-[#F33C5D]  text-[#F33C5D] rounded px-2 py-1"}
              pageClassName={"mx-2"}
              pageLinkClassName={"text-[#F33C5D] rounded px-3 py-2"}
              breakClassName={"mx-2"}
              breakLinkClassName={"text-[#F33C5D] hover:text-[#F33C5D] rounded px-3 py-2"}
              previousClassName={"mx-2"}
              previousLinkClassName={"text-[#F33C5D] hover:text-[#F33C5D] rounded px-3 py-2"}
              nextClassName={"mx-2"}
              nextLinkClassName={"text-[#F33C5D] hover:text-[#F33C5D] rounded px-3 py-2"}
            />
          </div>
        </main>
      </LayoutAdmin>
    </div>
  );
}
