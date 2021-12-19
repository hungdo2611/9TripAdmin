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
import FormModal from './formModal'

// Data
import { getListChargeAPI, acceptChargeAPI, declineChargeAPI } from '../../api/ChargeAPI'
import { getListBanner, deleteBanner } from "../../api/BannerAPI";
const { Search } = Input;

const page_size = 10;

class lstBanner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lst_Banner: [],
            isModalVisible: false,
            dataEdit: null

        }
    }
    async componentDidMount() {
        const dataBanner = await getListBanner();
        if (dataBanner && !dataBanner.err) {
            this.setState({ lst_Banner: dataBanner.data })
        }
        console.log("data banner", dataBanner)
    }



    onEdit = (dt) => {
        this.setState({ dataEdit: dt, isModalVisible: true })
    }
    onDelete = async (dt) => {
        const reqDelete = await deleteBanner({ _id: dt._id })
        if (!reqDelete.err) {
            notification["success"]({
                message: 'Xoá banner thành công',
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
                title: 'Ảnh',
                dataIndex: 'linkImage',
                key: 'linkImage',
                render: dt => <Image
                    width={200}
                    src={dt}
                />,

            },
            {
                title: 'Type',
                dataIndex: 'type',
                key: 'type',

            },
            {
                title: 'Thời gian',
                dataIndex: 'time',
                key: 'time',
                render: dt => <div>{moment(dt).format("DD/MM/YYYY")}</div>,
            },
            {
                title: 'Hành động',
                key: 'action',
                render: (text, record) => (
                    <Space size="middle">
                        <Button type="primary" onClick={() => this.onEdit(record)}>Sửa</Button>
                        <Button danger type="primary" onClick={() => this.onDelete(record)}>Xoá</Button>
                    </Space>
                ),
            },

        ];
        const { isModalVisible } = this.state;
        return (
            <DashboardLayout>
                <DashboardNavbar />
                <SuiBox py={3}>
                    <SuiBox mb={3}>
                        <Card>
                            <view style={{ display: 'flex', flexDirection: 'row', alignItems: "center", marginBottom: 20 }}>
                                <view style={{ flex: 1 }}>
                                    <SuiTypography variant="h6">D/S banner</SuiTypography>
                                </view>
                                <Button onClick={() => this.setState({ isModalVisible: true })} type="primary" style={{ marginRight: (10) }}>
                                    Thêm Banner
                                </Button>
                            </view>
                            <Table
                                pagination={false}
                                columns={columns}
                                dataSource={this.state.lst_Banner} />
                        </Card>
                    </SuiBox>
                    <Modal
                        title="Thêm Banner mới"
                        visible={isModalVisible}
                        onCancel={() => this.setState({ isModalVisible: false })}
                        footer={[
                            <Button key="back" onClick={() => this.setState({ isModalVisible: false })}>
                                Return
                            </Button>
                        ]}>
                        <FormModal data={this.state.dataEdit} />

                    </Modal>
                </SuiBox>
                <Footer />
            </DashboardLayout>
        );
    }
}





export default lstBanner;
