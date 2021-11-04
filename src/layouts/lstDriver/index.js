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

import { Table, Input, notification, Space } from 'antd';


// Data
import { getListDriverAPI, getInfoDriver, adminLockedAccountAPI, adminUnLockedAccountAPI } from '../../api/DriverApi'

const { Search } = Input;


class lstDriver extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lst_driver: [],
            total: 0,
            isloading: false
        }
        this.tempData = []
    }
    async componentDidMount() {
        const reqDriver = await getListDriverAPI(1, 10)
        console.log("reqDriver", reqDriver)
        this.setState({ lst_driver: reqDriver.data, total: reqDriver.total })
        this.tempData = reqDriver.data;
    }
    onSearchDriver = async (txt) => {
        if (txt.trim()) {
            this.setState({ isloading: true })
            const reqDriver = await getInfoDriver(txt)
            this.setState({ isloading: false })

            if (reqDriver && reqDriver.data && !reqDriver.err) {
                this.setState({ lst_driver: [reqDriver.data] })
                notification["success"]({
                    message: 'Tìm thấy tài xế',
                    description:
                        'OK',
                });
            } else {
                notification["error"]({
                    message: 'Không tìm thấy tài xế',
                    description:
                        'Lỗi',
                });
            }
        } else {
            this.setState({ lst_driver: this.tempData })
        }

    }
    onClickItem = (data) => {
        const { history } = this.props;
        history.push({
            pathname: '/recentTrip',
            search: '',
            state: { data: data }
        })
    }
    onLockOrUnlock = async (data) => {
        const { lst_driver } = this.state;
        let indexUpdate = lst_driver.findIndex(vl => vl._id == data._id);
        console.log("indexUpdate", indexUpdate)
        if (data.is_active) {
            let req = await adminLockedAccountAPI(data._id)
            if (req && !req.err) {
                notification["success"]({
                    message: 'Khoá thành công',
                    description:
                        'OK',
                });
                let newArr = lst_driver;
                newArr[indexUpdate].is_active = false;
                console.log("newArr", newArr)
                this.setState({ lst_driver: newArr })

            } else {
                notification["error"]({
                    message: 'Đã có lỗi xảy ra',
                    description:
                        'Lỗi',
                });
            }
        } else {
            let req = await adminUnLockedAccountAPI(data._id)
            if (req && !req.err) {
                notification["success"]({
                    message: 'Mở khoá thành công',
                    description:
                        'OK',
                });
                let newArr = lst_driver;
                newArr[indexUpdate].is_active = true;
                console.log("newArr", newArr)
                this.setState({ lst_driver: newArr })
            } else {
                notification["error"]({
                    message: 'Đã có lỗi xảy ra',
                    description:
                        'Lỗi',
                });
            }
        }
        console.log("data123", data)
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
                title: 'Trạng thái xác thực',
                key: 'verified_status',
                dataIndex: 'verified_status',
                render: dt => {
                    console.log('dt', dt)
                    return <text>{dt?.status ? dt?.status : 'NONE'}</text>
                },
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
            {
                title: 'Hành động',
                key: 'action',
                render: (text, record) => (
                    <Space size="middle">
                        <a onClick={() => this.onLockOrUnlock(record)}>{record.is_active ? 'Khoá tài khoản' : 'Mở khoá tài khoản'}</a>
                    </Space>
                ),
            },
        ];
        const { lst_driver, total, isloading } = this.state
        return (
            <DashboardLayout>
                <DashboardNavbar />
                <SuiBox py={3}>
                    <SuiBox mb={3}>
                        <Card>
                            <view style={{ display: 'flex', flexDirection: 'row', alignItems: "center", marginBottom: 20 }}>
                                <view style={{ flex: 1 }}>
                                    <SuiTypography variant="h6">Danh sách tài xế ({total})</SuiTypography>
                                </view>
                                <Search style={{ width: 200 }} onSearch={txt => this.onSearchDriver(txt)} placeholder="Nhập số điện thoại để tìm kiếm" loading={isloading} enterButton />
                            </view>
                            <Table

                                columns={columns}
                                dataSource={lst_driver} />
                        </Card>
                    </SuiBox>
                </SuiBox>
                <Footer />
            </DashboardLayout>
        );
    }
}

export default lstDriver;
