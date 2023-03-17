import {
  doAddrSearchReq,
  doHotelAdminReq,
  doUpdateHotel,
} from "@/redux/Actions/Hotels/actionHotelAdmin";
import { Button, Form, Input, Radio, Select, message } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LayoutAdmin from "@/components/Layout/admin";
import Head from "next/head";
type LayoutType = Parameters<typeof Form>[0]["layout"];
export default function udatehotel() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const { TextArea } = Input;

  const now = new Date();
  let dataHotel = useSelector(
    (state: any) => state.HotelAdminReducer.hotelAdmin
  );
  let dataAddr = useSelector((state: any) => state.AddrHotelReducer.HotelAddr);
  let addrPlaceholder = dataAddr?.find((item: any) => item.hotel_addr_id == id);
  const [dataUpdate, setDataUpdate] = useState({
    hotelId: "",
    hotelName: "",
    hotelDescription: "",
    hotelRatingStar: 0,
    hotelPhonenumber: "",
    hotelModifiedDate: now.toISOString().substr(0, 10),
    hotelAddr: 0,
  });

  const [oneHotel, setOneHotel] = useState();
  useEffect(() => {
    dispatch(doAddrSearchReq());
  }, []);
  useEffect(() => {
    dispatch(doHotelAdminReq());
    let hotel = dataHotel.find((item: any) => item.hotelId == id);
    setOneHotel(hotel);
  }, [id]);

  useEffect(() => {
    if (oneHotel) {
      setDataUpdate(oneHotel);
    }
  }, [oneHotel, id]);

  const eventHandler =
    (item: any): ((event: any) => void) =>
    (event) => {
      setDataUpdate({ ...dataUpdate, [item]: event.target.value });
    };
  // button edit data
  const updateData = (e: any) => {
    e.preventDefault();
    dispatch(doUpdateHotel(dataUpdate));
    if (!dispatch) {
      message.error("failed edit data");
    } else {
      message.success("edit data success");
    }
    router.push("/admin/hotels/hotel");
  };
  // end
  const back = () => {
    router.push("/admin/hotels/hotel");
  };
  // form inputan
  const [formLayout, setFormLayout] = useState<LayoutType>("horizontal");

  const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
    setFormLayout(layout);
  };

  // end
  // search addrs
  const handleSelect = (value: any) => {
    setDataUpdate({ ...dataUpdate, hotelAddr: parseInt(value) });
  };
  const options = dataAddr?.map((item: any) => ({
    value: item.hotel_addr_id,
    label: item.place,
  }));
  return (
    <div>
      <Head>
        <title>Hotels/Hotel</title>
      </Head>
      <LayoutAdmin>
        <div className="text-2xl flex justify-start mt-5 mb-5">
          <span>Edit data Hotel</span>
        </div>
        <div className="flex justify-center">
          {/* form */}
          <Form
            // {...formItemLayout}
            layout="vertical"
            // form={form}
            initialValues={{ layout: formLayout }}
            onValuesChange={onFormLayoutChange}
            // style={{ maxWidth: 600 }}
            className="bg-white px-5 py-5 w-3/4"
          >
            <Form.Item label="hotel Name">
              <Input
                placeholder=""
                value={dataUpdate.hotelName}
                onChange={eventHandler("hotelName")}
              />
            </Form.Item>
            <Form.Item label="Description">
              <TextArea
                placeholder=""
                value={dataUpdate.hotelDescription}
                onChange={eventHandler("hotelDescription")}
              />
            </Form.Item>
            <Form.Item label="Address" name="Address">
              <Select
                placeholder={addrPlaceholder?.place}
                showSearch
                style={{ width: 200 }}
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={options}
                value={dataUpdate.hotelAddr}
                onChange={handleSelect}
              />
            </Form.Item>
            <Form.Item label="hotel Rating Star">
              <Input
                placeholder=""
                type="number"
                min={0}
                value={dataUpdate.hotelRatingStar}
                onChange={eventHandler("hotelRatingStar")}
              />
            </Form.Item>
            <Form.Item label="hotel Phonenumber">
              <Input
                placeholder=""
                type="text"
                value={dataUpdate.hotelPhonenumber}
                onChange={eventHandler("hotelPhonenumber")}
              />
            </Form.Item>
            <Form.Item>
              <Input
                placeholder="input placeholder"
                type="date"
                hidden
                value={dataUpdate.hotelModifiedDate}
                onChange={eventHandler("hotelModifiedDate")}
              />
            </Form.Item>
            <div className="flex justify-between">
              <Form.Item>
                <Button
                  onClick={updateData}
                  type="primary"
                  className="bg-red-500"
                >
                  Submit
                </Button>
              </Form.Item>
              <Form.Item className="items-center">
                <Button type="default" onClick={back}>
                  Cancel
                </Button>
              </Form.Item>
            </div>
          </Form>
          {/* end */}
        </div>
      </LayoutAdmin>
    </div>
  );
}
