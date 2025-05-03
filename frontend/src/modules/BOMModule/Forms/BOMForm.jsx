import { useState } from 'react';
import { Form, Button, InputNumber, Select, Row, Col, Divider } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import SelectAsync from '@/components/SelectAsync';
import useLanguage from '@/locale/useLanguage';

export default function BOMForm({ current = null }) {
  const [form] = Form.useForm();
  const translate = useLanguage();

  return (
    <Form form={form} layout="vertical">
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            name="productId"
            label={translate('Product')}
            rules={[{ required: true }]}
          >
            <SelectAsync
              entity="product"
              displayLabels={['name']}
              searchFields="name"
              placeholder="Select Product"
            />
          </Form.Item>
        </Col>
      </Row>

      <Divider dashed />
      <Row gutter={16}>
        <Col span={8}>
          <h4>{translate('Material List')}</h4>
        </Col>
      </Row>

      <Form.List name="materials">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Row key={key} gutter={16} align="middle">
                <Col span={10}>
                  <Form.Item
                    {...restField}
                    name={[name, 'materialId']}
                    rules={[{ required: true, message: 'Select material' }]}
                  >
                    <SelectAsync
                      entity="material"
                      displayLabels={['name']}
                      searchFields="name"
                      placeholder="Select Material"
                    />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    {...restField}
                    name={[name, 'quantity']}
                    rules={[{ required: true, message: 'Input quantity' }]}
                  >
                    <InputNumber placeholder="Qty per unit" style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col>
                  <Button danger onClick={() => remove(name)}>
                    Remove
                  </Button>
                </Col>
              </Row>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                {translate('Add Material')}
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      <Divider dashed />
      <Row justify="end">
        <Col span={5}>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {translate('Save')}
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
