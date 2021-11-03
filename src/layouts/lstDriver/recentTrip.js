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

import { Table, Input, notification } from 'antd';


// Data
import { getRecentJourneyAPI } from '../../api/DriverApi'

import { Modal, Button } from 'antd';

const { Search } = Input;


class recentTrip extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lst_booking: [],
            total: 0,
            isloading: false,
            isModalVisible: false,
            data_customer: []
        }
        this.tempData = []
    }
    async componentDidMount() {
        const { location } = this.props
        const data = location.state.data;
        const id = data._id;
        if (id) {
            let req = await getRecentJourneyAPI(id);
            if (!req.err) {
                this.setState({ lst_booking: req.data, total: req.total })
            }
            console.log('req dt', req)
        }
    }
    renderCustomer = (lst) => {
        return <div style={{ display: 'flex', flex: 1, overflowY: 'scroll', flexDirection: 'column', }}>
            {lst.map((vl, index) => {
                return <div style={{ flexDirection: 'column', display: "flex", marginBottom: 20 }} key={index}>
                    <text>Tên : {vl.info.name}</text>
                    <text>SDT : {vl.info.phone}</text>
                    <text>Tổng tiền : {vl.info.price}</text>
                    <text>Đi từ : {vl.info.from.address}</text>
                    <text>{vl.orderInfo.phone_take_order ? 'Gửi hàng' : 'Đi xe'}</text>
                    <div style={{ width: '100%', height: 1, backgroundColor: 'gray', marginTop: 10 }} />
                </div>
            })}
        </div>
    }
    renderDriver = () => {
        const { location } = this.props
        const data = location.state.data;
        console.log('data', data)
        return <div style={{ display: 'flex', flexDirection: 'column', flex: 1, marginBottom: 20 }}>
            <text>Tên tài xế: {data.name}</text>
            <text>SDT: {data.phone}</text>
            <text>Point: {new Intl.NumberFormat().format(data.point)} đ</text>
        </div>
    }

    render() {

        const { lst_booking, total, isModalVisible } = this.state
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
                key: 'journey_type',
                dataIndex: 'journey_type',
            },
            {
                title: 'Danh sách hành khách',
                render: dt => <a onClick={() => this.setState({ isModalVisible: true, data_customer: dt.lst_pickup_point })}> Xem</a>,
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
                                    <SuiTypography variant="h6">Chuyến đi gần đây của TÀI XẾ ({total})</SuiTypography>
                                </view>
                            </view>
                            {this.renderDriver()}
                            <Table

                                columns={columns}
                                dataSource={lst_booking} />
                        </Card>
                        <Modal
                            title="Danh sách hành khách"
                            visible={isModalVisible}
                            onCancel={() => this.setState({ isModalVisible: false })}
                            footer={[
                                <Button key="back" onClick={() => this.setState({ isModalVisible: false })}>
                                    Return
                                </Button>
                            ]}>
                            {this.state.data_customer.length == 0 && <text>Không có hành khách trong chuyến đi</text>}
                            {this.state.data_customer.length > 0 && this.renderCustomer(this.state.data_customer)}
                        </Modal>
                    </SuiBox>
                </SuiBox>
                <Footer />
            </DashboardLayout>
        );
    }
}

export default recentTrip;
