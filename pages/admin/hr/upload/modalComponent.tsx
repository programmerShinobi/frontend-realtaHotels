import { useState } from "react";
import React from "react";
import { Button, Upload, Modal, Form, Select, message, UploadFile, UploadProps } from "antd";
import { useDispatch } from "react-redux";
import { UploadOutlined } from '@ant-design/icons';
import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext, PointerSensor, useSensor } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { css } from '@emotion/css';
import { RcFile } from "antd/es/upload";


export default function ModalComponent(props: any){
  const id = props.id;
  const data = props.data;
  const { handleClose } = props;
  const details = data.find((item: any) => item.deptId == id);
  const [formValues, setFormValues] = useState(details);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState();


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
      cursor: 'move',
    };

    // prevent preview event when drag end
    const className = isDragging
      ? css`
        a {
          pointer-events: none;
        }
      `
      : '';

    return (
      <div ref={setNodeRef} style={style} className={className} {...attributes} {...listeners}>
        {/* hide error tooltip when dragging */}
        {file.status === 'error' && isDragging ? originNode.props.children : originNode}
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
        '0%': '#108ee9',
        '100%': '#87d068',
      },
      strokeWidth: 3,
      format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
    },
  };
  /* end handle upload */


  /* handle form */
  const onFinish = (values: any) => {

    if (props.typeModal == "Add") {
      // console.log("Success Add:", values);

      // dispatch(doDepartmentCreate({ deptName: values.deptName }));

      const formData = new FormData();
      fileList.forEach((file) => {
        formData.append('files[]', file as RcFile);
      });

      formData.append('userId', "10");
      formData.append('upload', "Multiple Upload ni Boss");


      setUploading(true);
      // You can use any AJAX library you like
      fetch('http://localhost:3005/upload', {
        method: 'POST',
        body: formData,
      })
      .then((res) => res.json())
      .then(() => {
        setFileList([]);
        message.success('upload successfully.');
      })
      .catch((e: any) => {
        message.error('upload failed.');
        console.log('upload failed')
      })
      .finally(() => {
        setUploading(false);
      });

    } else if (props.typeModal == "Edit") {
      // console.log("Success Edit:", values, id);
      // dispatch(doUpdateDepartment({ deptName: values.deptName, deptId: id }));
    }

    // handleClose(false);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  /* endhandle form */

  return (
    <div>
      <Modal
        open={props.show}
        title={props.typeModal + " Upload"}
        okText="Submit"
        onCancel={props.handleCancel}
        onOk={form.submit}
        footer={[
          <Button key="2">Cancel</Button>,
          <Button key="3" onClick={form.submit} type="primary">Upload</Button>
        ]}
      >
        <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          initialValues={formValues}
          form={form}
        >

          <DndContext sensors={[sensor]} onDragEnd={onDragEnd}>
            <SortableContext items={fileList.map((i) => i.uid)} strategy={verticalListSortingStrategy}>
              <Upload
                multiple={true}
                itemRender={(originNode, file) => (
                  <DraggableUploadListItem originNode={originNode} file={file} />
                )}

                {...propsUpload}
              >
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </SortableContext>
          </DndContext>

        </Form>
      </Modal>
    </div>
  );
};
