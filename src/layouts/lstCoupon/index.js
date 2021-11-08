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

import { Table, Input, Modal, Space, Button, Pagination, Form, Checkbox, DatePicker, InputNumber, notification } from 'antd';


// Data
import { getListCoupon, addNewCoupon } from '../../api/CouponAPI'
import FormModal from './formModal'
const { Search } = Input;

const page_size = 10;

class lstCoupon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lst_coupon: [],
            total: 0,
            isloading: false,
            page: 1,
            dataEdit: null,
            isModalVisible: false
        }
        this.tempData = []
    }
    async componentDidMount() {
        const reqCoupon = await getListCoupon(1, page_size)
        this.setState({ lst_coupon: reqCoupon.data, total: reqCoupon.total })
        this.tempData = reqCoupon.data;
    }

    onClickItem = (data) => {
        const { history } = this.props;
        history.push({
            pathname: '/recentBooking',
            search: '',
            state: { data: data }
        })
    }
    onChangePage = async (page, pageSize) => {
        const reqCoupon = await getListCoupon(page, pageSize)
        this.setState({ page: page })
        this.setState({ lst_coupon: reqCoupon.data, total: reqCoupon.total })
        this.tempData = reqCoupon.data;
    }
    onEditCoupon = (data) => {
        this.setState({ isModalVisible: true, dataEdit: data })
    }
    onCallBackForm = (data) => {
        if (this.state.dataEdit) {
            let newListupdate = this.state.lst_coupon;
            let index = newListupdate.findIndex(vl => vl.code == data.code)

            newListupdate[index] = data;
            this.setState({ lst_coupon: newListupdate, isModalVisible: false, dataEdit: null })
            this.forceUpdate();

        } else {
            const newlstCoupon = [data, ...this.state.lst_coupon];
            this.setState({ lst_coupon: newlstCoupon, isModalVisible: false })
        }

    }
    render() {
        const columns = [
            {
                title: 'Trạng thái',
                dataIndex: 'expired_time',
                key: 'expired_time',
                render: dt => <text>{dt * 1000 > Date.now() ? 'Đang hoạt động' : 'Đã hết hạn'}</text>,
            },
            {
                title: 'Ngày hết hạn',
                dataIndex: 'expired_time',
                key: 'expired_time',
                render: dt => <text>{moment(dt * 1000).format('DD-MM-YYYY')}</text>,
            },
            {
                title: 'Mã code',
                dataIndex: 'code',
                key: 'code',
            },
            {
                title: 'Nội dung',
                dataIndex: 'content',
                key: 'content',
            },
            {
                title: 'Giá trị giảm',
                key: 'amount',
                dataIndex: 'amount',
                render: dt => <text>{dt > 100 ? `${new Intl.NumberFormat().format(dt)} đ` : `${dt} %`}</text>,
            },
            {
                title: 'Điều kiện giảm',
                key: 'condition',
                dataIndex: 'condition',
                render: dt => <text>{new Intl.NumberFormat().format(dt.min_Price)} đ</text>,
            },
            {
                title: 'Giảm tối đa',
                key: 'max_apply',
                dataIndex: 'max_apply',
                render: dt => <text>{new Intl.NumberFormat().format(dt)} đ</text>,
            },
            {
                title: 'Hành động',
                key: 'action',
                render: (text, record) => (
                    <Space size="middle">
                        <a onClick={() => this.onEditCoupon(record)}>Sửa</a>
                    </Space>
                ),
            },
        ];
        const { lst_coupon, total, isloading, dataEdit, isModalVisible } = this.state
        const lst_data = [...lst_coupon];
        return (
            <DashboardLayout>
                <DashboardNavbar />
                <SuiBox py={3}>
                    <SuiBox mb={3}>
                        <Card>
                            <view style={{ display: 'flex', flexDirection: 'row', alignItems: "center", marginBottom: 20 }}>
                                <view style={{ flex: 1 }}>
                                    <SuiTypography variant="h6">D/S Mã giảm giá ({total})</SuiTypography>
                                </view>
                                <Button onClick={() => this.setState({ isModalVisible: true })} type="primary">Thêm mã</Button>
                            </view>
                            <Table
                                pagination={false}
                                columns={columns}
                                dataSource={lst_data} />
                            <Pagination onChange={this.onChangePage} pageSize={page_size} style={{ margin: 20 }} current={this.state.page} total={total} />
                        </Card>
                    </SuiBox>
                    <Modal
                        title={dataEdit ? 'Sửa thông tin mã giảm giá' : 'Thêm mới mã giảm giá'}
                        visible={isModalVisible}
                        onCancel={() => this.setState({ isModalVisible: false })}
                        footer={[
                            <Button key="back" onClick={() => this.setState({ isModalVisible: false })}>
                                Return
                            </Button>
                        ]}>
                        <FormModal callBackForm={newData => this.onCallBackForm(newData)} data={this.state.dataEdit} />
                    </Modal>
                </SuiBox>
                <Footer />
            </DashboardLayout>
        );
    }
}





export default lstCoupon;
