import { Button, Form, Modal, Table, Image, Upload, message } from "antd";
import { ColumnType } from "antd/es/table";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillPicture } from "react-icons/ai";
import { ImUpload2 } from "react-icons/im";
import { UploadOutlined } from "@ant-design/icons";
import type { DragEndEvent } from "@dnd-kit/core";
import { DndContext, PointerSensor, useSensor } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { css } from "@emotion/css";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import { doFaciAdminReq } from "@/redux/Actions/Hotels/actionFaciAdmin";
import {
  doGetFapho,
  doUploadFapho,
} from "@/redux/Actions/Hotels/actionFaphoAdmin";
import LayoutAdmin from "@/components/Layout/admin";
import Head from "next/head";
interface DraggableUploadListItemProps {
  originNode: React.ReactElement<
    any,
    string | React.JSXElementConstructor<any>
  >;
  file: UploadFile<any>;
}

const DraggableUploadListItem = ({
  originNode,
  file,
}: DraggableUploadListItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
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
    <div
      ref={setNodeRef}
      style={style}
      className={className}
      {...attributes}
      {...listeners}
    >
      {/* hide error tooltip when dragging */}
      {file.status === "error" && isDragging
        ? originNode.props.children
        : originNode}
    </div>
  );
};
export default function Fapho() {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();

  const faphoHotel = useSelector((state: any) => state.FaphoReducer.fapho);
  const faphoOne = faphoHotel?.filter((item: any) => item?.fapho_faci_id == id);
  const faphoByOne = faphoHotel?.find((item: any) => item.fapho_faci_id == id);
  // reducer faci
  const faciHotel = useSelector(
    (state: any) => state.FaciAdminReducer.faciAdmin
  );

  const faciOne = faciHotel?.find((itemFaci: any) => itemFaci.faci_id == id);
  const [faciName, setFaciName] = useState("");
  const [faciDate, setFaciDate] = useState("");
  const [form] = Form.useForm();
  const columns: ColumnType<any>[] = [
    {
      title: "No.",
      dataIndex: "index",
      key: "index",
      render: (text: any, record: any, index: any) => index + 1,
      fixed: "left",
    },
    {
      title: "Image",
      key: "fapho_url",
      render: (text: any, record: any) => (
        <Image
          src={record?.fapho_url}
          alt={record?.fapho_url}
          style={{ width: "6rem" }}
        />
      ),
    },
    {
      title: "thumbnail",
      dataIndex: "fapho_thumbnail_filename",
      key: "fapho_thumbnail_filename",
    },
    {
      title: "primary",
      dataIndex: "fapho_primary",
      key: "fapho_primary",
    },
    {
      title: "filename",
      dataIndex: "fapho_photo_filename",
      key: "fapho_photo_filename",
    },
    {
      title: "modified date",
      key: "fapho_modifield_date",
      render: (text: any, record: any, index) => (
        <p className="w-32 text-xs">
          {dayjs(record.fapho_modifield_date).format("DD MMMM YYYY hh:mm:ss")}
        </p>
      ),
    },
  ];
  // modalinsert
  const [modal2Open, setModal2Open] = useState(false);

  interface DraggableUploadListItemProps {
    originNode: React.ReactElement<
      any,
      string | React.JSXElementConstructor<any>
    >;
    file: UploadFile<any>;
  }

  const DraggableUploadListItem = ({
    originNode,
    file,
  }: DraggableUploadListItemProps) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({
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
      <div
        ref={setNodeRef}
        style={style}
        className={className}
        {...attributes}
        {...listeners}
      >
        {/* hide error tooltip when dragging */}
        {file.status === "error" && isDragging
          ? originNode.props.children
          : originNode}
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
    itemRender: (originNode, file) => (
      <DraggableUploadListItem originNode={originNode} file={file} />
    ),
    progress: {
      strokeColor: {
        "0%": "#108ee9",
        "100%": "#87d068",
      },
      strokeWidth: 3,
      format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
    },
  };

  const onFinish = (values: any) => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("file[]", file as RcFile);
    });

    formData.append("faphoFaci", faciOne.faci_id);

    setUploading(true);
    // You can use any AJAX library you like
    fetch("http://localhost:3005/facility-photos/upload/firebase", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        setFileList([]);
        // window.location.reload();
        message.success("upload successfully.");
      })
      .catch((e: any) => {
        message.error("upload failed.");
      })
      .finally(() => {
        setUploading(false);
        setModal2Open(false);
      });
  };
  useEffect(() => {
    if (faciOne) {
      setFaciName(faciOne.faci_name);
      setFaciDate(faciOne.faci_modified_date);
    }
  }, [faciOne]);

  useEffect(() => {
    if (uploading == false) {
      dispatch(doGetFapho());
      dispatch(doFaciAdminReq());
    }
  }, [uploading]);
  return (
    <div>
      <Head>
        <title>Hotels/Hotel/Facility/Edit</title>
      </Head>
      <LayoutAdmin>
        <div className="flex justify-between py-3">
          <div className="flex justify-start space-x-3">
            <AiFillPicture className="text-2xl" />
            <span className="text-2xl font bold">{faciName}</span>
          </div>
          <span>{dayjs(faciDate).format("DD MMMM YYYY hh:mm:ss")}</span>
        </div>
        <hr className="text-gray-600 font-bold py-4" />
        <span className="text-base text-gray-300 flex justify-start">
          facility photo :
        </span>
        <div className="flex justify-end">
          {/* modal add data */}
          <>
            <Button
              className="bg-red-500 mb-5 flex justify-center px-3 py-2 items-center"
              type="primary"
              onClick={() => setModal2Open(true)}
            >
              <ImUpload2 />
              <p>upload</p>
            </Button>
            <Modal
              title="Upload Photo"
              centered
              open={modal2Open}
              onOk={form.submit}
              onCancel={() => setModal2Open(false)}
              okText="Upload"
              footer={[
                <Button key="2" onClick={() => setModal2Open(false)}>
                  Cancel
                </Button>,
                <Button
                  key="3"
                  loading={uploading}
                  disabled={fileList.length === 0}
                  onClick={form.submit}
                  type="primary"
                >
                  {uploading ? "Uploading" : "Start Upload"}
                </Button>,
              ]}
            >
              <Form
                name="basic"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 16 }}
                onFinish={onFinish}
                autoComplete="off"
                form={form}
              >
                <DndContext sensors={[sensor]} onDragEnd={onDragEnd}>
                  <SortableContext
                    items={fileList.map((i) => i.uid)}
                    strategy={verticalListSortingStrategy}
                  >
                    <Upload
                      multiple={true}
                      itemRender={(originNode, file) => (
                        <DraggableUploadListItem
                          originNode={originNode}
                          file={file}
                        />
                      )}
                      {...propsUpload}
                    >
                      <Button icon={<UploadOutlined />}>upload?</Button>
                    </Upload>
                  </SortableContext>
                </DndContext>
              </Form>
            </Modal>
          </>
          {/* end */}
        </div>
        <Table
          scroll={{ x: true }}
          size="small"
          dataSource={faphoOne}
          columns={columns}
        />
      </LayoutAdmin>
    </div>
  );
}
