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

import { Table, Input, Image, Space, Modal, Button, notification } from 'antd';


// Data
import { getListLicenseAPI, acceptLicenseAPI, declineLicenseAPI } from '../../api/LicenseAPI'

const { Search } = Input;
const vehicleTypeData = {
    MOTO: 1,
    HATCH_BACK: 4,
    SEDAN: 5,
    '7_SEAT': 7,
    '9_SEAT': 9,
    '16_SEAT': 16,
    '29_45_SEAT': 60,
    PICK_UP_TRUCK: 70,
    TRUCK: 71,


}
const { TextArea } = Input;


class lstLicense extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lst_license: [],
            total: 0,
            isloading: false,
            isModalVisible: false,
            dataReject: null,
            reasonReject: ''
        }
    }
    async componentDidMount() {
        const reqLicense = await getListLicenseAPI(1, 10)
        console.log("reqLicense", reqLicense)
        this.setState({ lst_license: reqLicense.data, total: reqLicense.total })
    }


    getTypeCar = (type) => {
        const nameType = [
            { label: "Xe mô tô", value: 1 },
            { label: "4 chỗ nhỏ (hatchback)", value: 4 },
            { label: "4 chỗ cốp rộng (sedan)", value: 5 },
            { label: "7 chỗ phổ thông", value: 7 },
            { label: "9 chỗ Dcar", value: 9 },
            { label: "16 chỗ", value: 16 },
            { label: "29-45 chỗ", value: 60 },
            { label: "Xe bán tải", value: 70 },
            { label: "Xe tải", value: 71 }
        ];
        let crr = nameType.find(vl => {
            return vl.value === type
        })
        return crr.label
    }
    renderLstImage = (lstImage) => {
        return <div style={{ display: "flex", flexDirection: 'row', flexWrap: 'wrap' }}>
            {lstImage.map((vl, index) => {
                return <Image
                    key={index}
                    width={100}
                    height={100}
                    src={vl}
                />
            })}
        </div>
    }
    onAccept = async (dt) => {
        const { lst_license } = this.state;
        let reqAccept = await acceptLicenseAPI(dt._id)
        if (reqAccept && !reqAccept.err) {
            let newArr = lst_license.filter(vl => vl._id !== dt._id)
            this.setState({ lst_license: newArr });

            notification["success"]({
                message: 'Thành công',
                description:
                    'OK',
            });
        } else {
            notification["error"]({
                message: 'Thất bại',
                description:
                    'Đã có lỗi xảy ra',
            });
        }
    }
    onDecline = (dt) => {
        console.log('onDecline', dt)
        this.setState({ isModalVisible: true, dataReject: dt })

    }
    onComfirmReject = async () => {
        const { dataReject, reasonReject, lst_license } = this.state;
        let reqDecline = await declineLicenseAPI(dataReject._id, reasonReject)
        if (reqDecline && !reqDecline.err) {
            let newArr = lst_license.filter(vl => vl._id !== dataReject._id)

            this.setState({ isModalVisible: false, dataReject: null, lst_license: newArr });
            notification["success"]({
                message: 'Thành công',
                description:
                    'OK',
            });
        } else {
            notification["error"]({
                message: 'Thất bại',
                description:
                    'Đã có lỗi xảy ra',
            });
        }


    }
    render() {
        const columns = [
            {
                title: 'Họ tên',
                dataIndex: 'display_name',
                key: 'display_name',
            },
            {
                title: 'Biển số xe',
                dataIndex: 'license_plate',
                key: 'license_plate',
            },
            {
                title: 'Mô hình kinh doanh',
                dataIndex: 'business',
                key: 'business',
            },
            {
                title: 'Loại xe',
                key: 'vehicle_type',
                dataIndex: 'vehicle_type',
                render: dt => <text>{this.getTypeCar(dt)}</text>
            },
            {
                title: 'Ảnh giấy tờ bản thân',
                key: 'lst_image_passport',
                dataIndex: 'lst_image_passport',
                render: dt => this.renderLstImage(dt),
            },
            {
                title: 'Ảnh giấy xe',
                key: 'lst_image_license',
                dataIndex: 'lst_image_license',
                render: dt => this.renderLstImage(dt),
            },
            {
                title: 'Hành động',
                key: 'action',
                render: (text, record) => (
                    <Space size="middle">
                        <a onClick={() => this.onAccept(record)}>Phê duyệt</a>
                        <a onClick={() => this.onDecline(record)}>Từ chối</a>
                    </Space>
                ),
            },

        ];
        const { lst_license, total, isloading, isModalVisible, reasonReject } = this.state
        return (
            <DashboardLayout>
                <DashboardNavbar />
                <SuiBox py={3}>
                    <SuiBox mb={3}>
                        <Card>
                            <view style={{ display: 'flex', flexDirection: 'row', alignItems: "center", marginBottom: 20 }}>
                                <view style={{ flex: 1 }}>
                                    <SuiTypography variant="h6">Hồ sơ cần phê duyệt ({total})</SuiTypography>
                                </view>
                            </view>
                            <Table

                                columns={columns}
                                dataSource={lst_license} />
                        </Card>
                    </SuiBox>
                </SuiBox>
                <Modal
                    title="Lý do từ chối"
                    visible={isModalVisible}
                    onCancel={() => this.setState({ isModalVisible: false })}
                    footer={[
                        <Button key="back" onClick={() => this.setState({ isModalVisible: false })}>
                            Return
                        </Button>,
                        <Button onClick={this.onComfirmReject} type="primary" disabled={reasonReject.trim() == ''} key="ok">
                            Tiếp tục
                        </Button>
                    ]}>
                    <text style={{ marginBottom: 20 }}>Nhập lý do từ chối</text>
                    <TextArea onChange={({ target: { value } }) => { this.setState({ reasonReject: value }) }} rows={4} />
                </Modal>
                <Footer />
            </DashboardLayout>
        );
    }
}





export default lstLicense;
