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

import { Table, Input, Modal, Space, Button, Pagination, Form, Checkbox, DatePicker, InputNumber, notification, Image } from 'antd';


// Data
import { getListChargeAPI, acceptChargeAPI, declineChargeAPI } from '../../api/ChargeAPI'
const { Search } = Input;

const page_size = 10;

class lstCharge extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lst_charge: [],
            total: 0,
            page: 1,
            dataEdit: null,
        }
    }
    async componentDidMount() {
        const reqCharge = await getListChargeAPI(1, page_size)
        console.log("reqCharge", reqCharge)
        this.setState({ lst_charge: reqCharge.data, total: reqCharge.total })
    }

    onChangePage = async (page, pageSize) => {
        const reqCharge = await getListChargeAPI(page, pageSize)
        this.setState({ page: page })
        this.setState({ lst_charge: reqCharge.data, total: reqCharge.total })
    }

    onAccept = async (dt) => {
        const { lst_charge } = this.state;
        let reqAccept = await acceptChargeAPI(dt._id);
        if (reqAccept && !reqAccept.err) {
            let newArr = lst_charge.filter(vl => vl._id !== dt._id)
            this.setState({ lst_charge: newArr });

            notification["success"]({
                message: 'Nạp tiền cho tài xế thành công',
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

    onDecline = async (dt) => {
        const { lst_charge } = this.state;

        let reqDecline = await declineChargeAPI(dt._id);
        if (reqDecline && !reqDecline.err) {
            let newArr = lst_charge.filter(vl => vl._id !== dt._id)
            this.setState({ lst_charge: newArr });
            notification["success"]({
                message: 'Từ chối nạp tiền cho tài xế',
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
        const columns = [
            {
                title: 'Số điện thoại',
                dataIndex: 'driver_id',
                key: 'driver_id',
                render: dt => <text>{dt.phone}</text>,

            },
            {
                title: 'Tên nhà xe',
                dataIndex: 'driver_id',
                key: 'driver_id',
                render: dt => <text>{dt.name}</text>,

            },
            {
                title: 'Trạng thái',
                dataIndex: 'status',
                key: 'status',
            },
            {
                title: 'Ngày yêu cầu',
                dataIndex: 'time',
                key: 'time',
                render: dt => <text>{moment(dt).format('HH:mm - DD/MM/YYYY')}</text>,
            },
            {
                title: 'Phương thức nạp',
                dataIndex: 'payment_method',
                key: 'payment_method',
            },
            {
                title: 'Nội dung ck',
                dataIndex: 'content',
                key: 'content',
            },
            {
                title: 'Số tiền nạp',
                key: 'amount',
                dataIndex: 'amount',
                render: dt => <text>{`${new Intl.NumberFormat().format(dt)} đ`}</text>,
            },
            {
                title: 'Ảnh giao dịch',
                key: 'image',
                dataIndex: 'image',
                render: dt => <Image
                    width={100}
                    height={100}
                    src={dt}
                />,
            },
            {
                title: 'Hành động',
                key: 'action',
                render: (text, record) => (
                    <Space size="middle">
                        <Button type="primary" onClick={() => this.onAccept(record)}>Đồng ý </Button>
                        <Button danger type="primary" onClick={() => this.onDecline(record)}>Từ chối</Button>
                    </Space>
                ),
            },
        ];
        const { lst_charge, total } = this.state
        const lst_data = [...lst_charge];
        return (
            <DashboardLayout>
                <DashboardNavbar />
                <SuiBox py={3}>
                    <SuiBox mb={3}>
                        <Card>
                            <view style={{ display: 'flex', flexDirection: 'row', alignItems: "center", marginBottom: 20 }}>
                                <view style={{ flex: 1 }}>
                                    <SuiTypography variant="h6">D/S yêu cầu nạp tiền ({total})</SuiTypography>
                                </view>
                            </view>
                            <Table
                                pagination={false}
                                columns={columns}
                                dataSource={lst_data} />
                            <Pagination onChange={this.onChangePage} pageSize={page_size} style={{ margin: 20 }} current={this.state.page} total={total} />
                        </Card>
                    </SuiBox>

                </SuiBox>
                <Footer />
            </DashboardLayout>
        );
    }
}





export default lstCharge;
