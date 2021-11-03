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
import { getListCustomer, getInfoCustomer } from '../../api/CustomerAPI'

const { Search } = Input;


class lstCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lst_customer: [],
            total: 0,
            isloading: false
        }
        this.tempData = []
    }
    async componentDidMount() {
        const reqCustomer = await getListCustomer(1, 10)
        console.log("reqCustomer", reqCustomer)
        this.setState({ lst_customer: reqCustomer.data, total: reqCustomer.total })
        this.tempData = reqCustomer.data;
    }
    onSearchDriver = async (txt) => {
        if (txt.trim()) {
            this.setState({ isloading: true })
            const reqCustomer = await getInfoCustomer(txt)
            this.setState({ isloading: false })

            if (reqCustomer && reqCustomer.data && !reqCustomer.err) {
                this.setState({ lst_customer: [reqCustomer.data] })
                notification["success"]({
                    message: 'Tìm thấy khách hàng',
                    description:
                        'OK',
                });
            } else {
                notification["error"]({
                    message: 'Không tìm thấy khách hàng',
                    description:
                        'Lỗi',
                });
            }
        } else {
            this.setState({ lst_customer: this.tempData })
        }

    }
    onClickItem = (data) => {
        const { history } = this.props;
        history.push({
            pathname: '/recentBooking',
            search: '',
            state: { data: data }
        })
    }
    render() {
        const columns = [
            {
                title: 'Trạng thái',
                dataIndex: 'is_active',
                key: 'is_active',
                render: dt => <text>{dt ? 'Đang hoạt động' : 'Không hoạt động'}</text>,
            },
            {
                title: 'Tên',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Ngày tham gia',
                dataIndex: 'join_date',
                key: 'join_date',
                render: dt => <text>{moment(dt).format('DD-MM-YYYY')}</text>,
            },
            {
                title: 'Số điện thoại',
                key: 'phone',
                dataIndex: 'phone',
            },
            {
                title: 'Số Point',
                key: 'point',
                dataIndex: 'point',
                render: dt => <text>{new Intl.NumberFormat().format(dt)} đ</text>,
            },
            {
                title: 'Danh sách chuyến',
                render: dt => <a onClick={() => this.onClickItem(dt)}> Xem</a>,
            },
        ];
        const { lst_customer, total, isloading } = this.state
        return (
            <DashboardLayout>
                <DashboardNavbar />
                <SuiBox py={3}>
                    <SuiBox mb={3}>
                        <Card>
                            <view style={{ display: 'flex', flexDirection: 'row', alignItems: "center", marginBottom: 20 }}>
                                <view style={{ flex: 1 }}>
                                    <SuiTypography variant="h6">Danh sách hành khách ({total})</SuiTypography>
                                </view>
                                <Search style={{ width: 200 }} onSearch={txt => this.onSearchDriver(txt)} placeholder="Nhập số điện thoại để tìm kiếm" loading={isloading} enterButton />
                            </view>
                            <Table

                                columns={columns}
                                dataSource={lst_customer} />
                        </Card>
                    </SuiBox>
                </SuiBox>
                <Footer />
            </DashboardLayout>
        );
    }
}





export default lstCustomer;