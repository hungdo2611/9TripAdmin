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

import { Table, Input, Space, notification } from 'antd';


// Data
import { getRecentBooking, adminFinishBookingAPI, adminCancelBookingAPI } from '../../api/CustomerAPI'
import { Modal, Button } from 'antd';

const { Search } = Input;


class recentBooking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lst_journey: [],
            total: 0,
            isloading: false,
            isModalVisible: false,
            data_driver: null
        }
        this.tempData = []
    }
    async componentDidMount() {
        const { location } = this.props
        const data = location.state.data;
        const id = data._id;
        if (id) {
            let req = await getRecentBooking(id);
            if (!req.err) {
                this.setState({ lst_journey: req.data, total: req.total })
            }
        }
    }

    renderSelf = () => {
        const { location } = this.props
        const data = location.state.data;
        return <div style={{ display: 'flex', flexDirection: 'column', flex: 1, marginBottom: 20 }}>
            <text>Tên hành khách: {data.name}</text>
            <text>SDT: {data.phone}</text>
        </div>
    }
    cancelBooking = async (dt) => {
        let req = await adminCancelBookingAPI({ id: dt._id });
        if (req && !req.err) {
            notification["success"]({
                message: 'Huỷ chuyến ok',
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
    endBooking = async (dt) => {
        let req = await adminFinishBookingAPI({ id: dt._id });
        if (req && !req.err) {
            notification["success"]({
                message: 'kết thúc chuyến ok',
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

        const { lst_journey, total, isModalVisible } = this.state
        const { data_driver } = this.state
        const columns = [
            {
                title: 'Thời gian',
                dataIndex: 'time_start',
                key: 'time_start',
                render: dt => <text>{moment(dt * 1000).format('HH:MM - DD/MM')}</text>,
            },
            {
                title: 'Từ',
                dataIndex: 'from',
                key: 'from',
                render: dt => <text>{dt.address}</text>,
            },
            {
                title: 'Đến',
                dataIndex: 'to',
                key: 'to',
                render: dt => <text>{dt.address}</text>,
            },
            {
                title: 'Trạng thái',
                key: 'status',
                dataIndex: 'status',
            },
            {
                title: 'Loại chuyến',
                key: 'booking_type',
                dataIndex: 'booking_type',
            },
            {
                title: 'Giá tiền',
                render: dt => <text>{dt.price ? dt.price : `${dt.range_price.max_price}đ - ${dt.range_price.min_price}đ`}</text>
            },
            {
                title: 'Hành động',
                render: (dt) => (
                    <Space size="middle">
                        <Button type="primary" onClick={() => this.setState({ isModalVisible: true, data_driver: dt.driver_id })}>Xem</Button>
                        {dt.status !== 'END' && dt.status !== 'USER_CANCEL' && <Button onClick={() => this.cancelBooking(dt)} danger type="primary" >CANCEL</Button>}
                        {dt.status !== 'END' && dt.status !== 'USER_CANCEL' && <Button onClick={() => this.endBooking(dt)} danger type="primary" >END</Button>}

                    </Space>
                ),
            },

        ];
        return (
            <DashboardLayout>
                <DashboardNavbar />
                <SuiBox py={3}>
                    <SuiBox mb={3}>
                        <Card>
                            <view style={{ display: 'flex', flexDirection: 'row', alignItems: "center", marginBottom: 20 }}>
                                <view style={{ flex: 1 }}>
                                    <SuiTypography variant="h6">Chuyến đi gần đây của HÀNH KHÁCH ({total})</SuiTypography>
                                </view>
                            </view>
                            {this.renderSelf()}
                            <Table

                                columns={columns}
                                dataSource={lst_journey} />
                        </Card>
                        <Modal
                            title="Tài xế thực hiện chuyến đi"
                            visible={isModalVisible}
                            onCancel={() => this.setState({ isModalVisible: false })}
                            footer={[
                                <Button key="back" onClick={() => this.setState({ isModalVisible: false })}>
                                    Return
                                </Button>
                            ]}>
                            {!data_driver && <text>Không có tài xế</text>}
                            {data_driver && <div style={{ flexDirection: 'column', display: "flex", marginBottom: 20 }} >
                                <text>Tên : {data_driver?.name}</text>
                                <text>SDT : {data_driver?.phone}</text>
                                <div style={{ width: '100%', height: 1, backgroundColor: 'gray', marginTop: 10 }} />
                            </div>}
                        </Modal>
                    </SuiBox>
                </SuiBox>
                <Footer />
            </DashboardLayout>
        );
    }
}

export default recentBooking;
