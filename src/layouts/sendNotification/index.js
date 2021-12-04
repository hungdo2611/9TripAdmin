/**
=========================================================
* 9Trip Admin React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-material-ui
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Card from "@mui/material/Card";
import React, { Component } from 'react';

// 9Trip Admin React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

// 9Trip Admin React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import moment from 'moment'
import { sendNotificationAPI } from '../../api/NotificationAPI'
import { notification, Form, Button, Input, Select } from 'antd';

const { Option } = Select;

// Data



class SendNotification extends Component {
    constructor(props) {
        super(props);

    }
    async componentDidMount() {

    }
    onFinishForm = async (values) => {
        console.log('values', values)
        const body = {
            app_name: values.app_name,
            title: values.title,
            body: values.body,
            data: {
                type: values.type_noti
            }
        }
        let reqSend = await sendNotificationAPI(body);
        if (reqSend && !reqSend.err) {
            notification["success"]({
                message: 'Gửi thông báo thành công',
                description:
                    'OK',
            });
        } else {
            notification["error"]({
                message: 'Đã có lỗi xảy ra',
                description:
                    'Lỗi',
            });
        }
    }

    render() {

        return (
            <DashboardLayout>
                <DashboardNavbar />
                <SuiBox py={3}>
                    <SuiBox mb={3}>
                        <Card>
                            <view style={{ display: 'flex', flexDirection: 'row', alignItems: "center", marginBottom: 20 }}>
                                <view style={{ flex: 1 }}>
                                    <SuiTypography variant="h6">Gửi thông báo</SuiTypography>
                                </view>
                            </view>
                            <Form
                                name="basic"
                                labelCol={{ span: 4 }}
                                wrapperCol={{ span: 16 }}
                                initialValues={{ remember: true }}
                                onFinish={values => this.onFinishForm(values)}
                                onFinishFailed={failed => console.log("onFinishFailed", failed)}
                                ref={this.formRef}
                                autoComplete="off"
                            >
                                <Form.Item
                                    label="Tên App"
                                    name="app_name"
                                    rules={[{ required: true, message: 'Please input your app_name!' }]}
                                >
                                    <Select placeholder="Tên app gửi thông báo" style={{ width: 120 }} >
                                        <Option value="Driver">Driver</Option>
                                        <Option value="Customer">Customer</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label="Tiêu đề"
                                    name="title"
                                    rules={[{ required: true, message: 'Please input your title!' }]}
                                >
                                    <Input placeholder="Nhập tiêu đề" />
                                </Form.Item>
                                <Form.Item
                                    label="Nội dung"
                                    name="body"
                                    rules={[{ required: true, message: 'Please input your body!' }]}
                                >
                                    <Input placeholder="Nội dùng thông báo" />
                                </Form.Item>
                                <Form.Item
                                    label="Loại thông báo"
                                    name="type_noti"
                                    rules={[{ required: true, message: 'Please input your body!' }]}
                                >
                                    <Select placeholder="Loại thông báo" >
                                        <Option value="PROMOTION_NOTIFICATION">Khuyến mại</Option>
                                        <Option value="ALERT_NOTIFICATION">Thông báo thường</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                    <Button type="primary" htmlType="submit">
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Card>
                    </SuiBox>
                </SuiBox>
                <Footer />
            </DashboardLayout>
        );
    }
}





export default SendNotification;
