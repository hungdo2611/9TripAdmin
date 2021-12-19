import React, { Component } from 'react';
import { Table, Input, Modal, Space, Button, Select, Form, Upload, DatePicker, InputNumber, notification } from 'antd';
import { getListCoupon, addNewCoupon, updateCoupon } from '../../api/CouponAPI'
import moment from 'moment'
const { Option } = Select;
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { UploadImageApi } from '../../api/ImageAPI'
import { createNewBanner, updateBanner } from '../../api/BannerAPI'
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}
export default class formModal extends Component {
    constructor(props) {
        super(props);
        this.formRef = React.createRef();
        this.state = {
            imageUrl: '',
            loading: false,

        }
    }
    componentDidMount() {

        const { data } = this.props;
        if (data) {
            console.log("data props", data)
            this.setState({ imageUrl: data.linkImage })
            this.formRef.current.setFieldsValue({
                type: data.type,
            });
        }

    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) {
            const { data } = this.props;
            if (data) {
                console.log("data props", data)
                this.setState({ imageUrl: data.linkImage })
                this.formRef.current.setFieldsValue({
                    type: data.type,
                });
            }
        }
    }

    onFinishForm = async (values) => {
        console.log("values", values)
        const { type } = values
        const formData = new FormData();
        formData.append('file', values.linkImage.file.originFileObj)
        const dataupload = await UploadImageApi(formData);
        const { data } = this.props;
        if (dataupload && dataupload?.data) {
            if (data) {
                let req = await updateBanner({ link_image: dataupload?.data, type: type, _id: data?._id })
                if (!req.err) {
                    notification["success"]({
                        message: 'update banner thành công',
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
                return
            }

            let req = await createNewBanner({ link_image: dataupload?.data, type: type })
            if (!req.err) {
                notification["success"]({
                    message: 'Thêm mới banner thành công',
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
        } else {
            notification["error"]({
                message: 'Đã có lỗi xảy ra',
                description:
                    'Lỗi',
            });
        }
        console.log('dataupload', dataupload)
    }
    handleChange = (info) => {
        console.log("info", info)
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,

                }),
            );
        }
    }
    dummyRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 0);
    };
    render() {
        const { imageUrl, loading } = this.state;
        const uploadButton = (
            <div>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        );
        return <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={values => this.onFinishForm(values)}
            onFinishFailed={failed => console.log("onFinishFailed", failed)}
            ref={this.formRef}
            autoComplete="off"
        >
            <Form.Item
                label="Loại Banner"
                name="type"
                rules={[{ required: true, message: 'Please input your type!' }]}
            >
                <Select placeholder="Loại banner" style={{}} >
                    <Option value="PROMOTION">PROMOTION Code</Option>
                    <Option value="COACH_CAR">COACH_CAR</Option>
                    <Option value="HYBIRD_CAR">HYBIRD_CAR</Option>
                    <Option value="SHIPPING">SHIPPING</Option>
                    <Option value="ALL">ALL</Option>

                </Select>
            </Form.Item>

            <Form.Item
                label="Image"
                name="linkImage"
                rules={[{ required: true, message: 'Please input your linkImage!' }]}
            >
                <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    customRequest={this.dummyRequest}
                    // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    onChange={this.handleChange}
                >
                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                </Upload>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    {!this.props.data ? 'Thêm mới' : 'Sửa'}
                </Button>
            </Form.Item>
        </Form>
    }
}