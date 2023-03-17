import LayoutAdmin from "@/components/Layout/admin";
import Head from "next/head";
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
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

export default function RestoMenus() {
  return (
    <div>
      <Head>
        <title>Master/Category Group</title>
      </Head>
      <LayoutAdmin>

        {"This is Master/Category Group page"}

      </LayoutAdmin>
    </div>
  );
}