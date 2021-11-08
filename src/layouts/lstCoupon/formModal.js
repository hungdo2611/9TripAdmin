import React, { Component } from 'react';
import { Table, Input, Modal, Space, Button, Pagination, Form, Checkbox, DatePicker, InputNumber, notification } from 'antd';
import { getListCoupon, addNewCoupon, updateCoupon } from '../../api/CouponAPI'
import moment from 'moment'

export default class formModal extends Component {
    constructor(props) {
        super(props);
        this.formRef = React.createRef();
    }
    componentDidMount() {

        const { data } = this.props;
        if (data) {
            console.log("data props", data)
            this.formRef.current.setFieldsValue({
                expired_time: moment(data.expired_time * 1000),
                code: data.code,
                content: data.content,
                amount: data.amount,
                max_apply: data.max_apply,
                condition: data.condition.min_Price
            });
        }

    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) {
            const { data } = this.props;
            if (data) {
                console.log("data props", data)
                this.formRef.current.setFieldsValue({
                    expired_time: moment(data.expired_time * 1000),
                    code: data.code,
                    content: data.content,
                    amount: data.amount,
                    max_apply: data.max_apply,
                    condition: data.condition.min_Price
                });
            }
        }
    }

    onFinishForm = async (values) => {
        console.log("values", values)
        const { expired_time, code, content, amount, max_apply, condition } = values
        const bodyReq = { expired_time: expired_time.unix(), code, content, amount, max_apply, condition: { min_Price: condition } }
        if (!this.props.data) {
            let reqCreate = await addNewCoupon(bodyReq)
            if (reqCreate && !reqCreate.err) {
                notification["success"]({
                    message: 'Thêm mã giảm giá thành công',
                    description:
                        'OK',
                });
                this.props.callBackForm(reqCreate.data);

            } else {
                notification["error"]({
                    message: reqCreate && reqCreate.data ? reqCreate.data : 'Đã có lỗi xảy ra',
                    description:
                        'Lỗi',
                });
            }
        } else {
            let reqUpdate = await updateCoupon(bodyReq)
            if (reqUpdate && !reqUpdate.err) {
                notification["success"]({
                    message: 'Thêm mã giảm giá thành công',
                    description:
                        'OK',
                });
                this.props.callBackForm(reqUpdate.data);

            } else {
                notification["error"]({
                    message: reqUpdate && reqUpdate.data ? reqUpdate.data : 'Đã có lỗi xảy ra',
                    description:
                        'Lỗi',
                });
            }
        }

    }
    render() {
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
                label="Ngày hết hạn"
                name="expired_time"
                rules={[{ required: true, message: 'Please input your expired_time!' }]}
            >
                <DatePicker
                    format="DD-MM-YYYY" />
            </Form.Item>

            <Form.Item
                label="Mã CODE"
                name="code"
                rules={[{ required: true, message: 'Please input your CODE!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Nội dung"
                name="content"
                rules={[{ required: true, message: 'Please input your content!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Số lượng giảm giá"
                name="amount"
                rules={[{ required: true, message: 'Code is number & not be blank' }]}
            >
                <InputNumber
                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                />
            </Form.Item>
            <Form.Item
                label="Giảm giá tối đa"
                name="max_apply"
                rules={[{ required: true, message: 'max_apply is number & not be blank' }]}
            >
                <InputNumber
                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                />
            </Form.Item>
            <Form.Item
                label="Giá nhỏ nhất để sử dụng"
                name="condition"
                rules={[{ required: true, message: 'condition is number & not be blank' }]}
            >
                <InputNumber
                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    }
}