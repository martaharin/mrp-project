import { useState } from 'react';
import {
  Form,
  InputNumber,
  Button,
  Row,
  Col,
  Divider,
  DatePicker,
  Typography,
} from 'antd';
import dayjs from 'dayjs';
import SelectAsync from '@/components/SelectAsync';
import useLanguage from '@/locale/useLanguage';
import { WarningOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const MACHINE_CAPACITY_PER_DAY = 500;

export default function MPSForm({ current = null }) {
  const [materialList, setMaterialList] = useState([]);
  const [materialWarning, setMaterialWarning] = useState(false);
  const [qty, setQty] = useState(1);
  const [form] = Form.useForm();
  const translate = useLanguage();

  const onProductSelect = async (productId) => {
    const response = await fetch(`/api/bom/${productId}`);
    const bom = await response.json();

    const processedMaterials = bom.materials.map((m) => ({
      ...m,
      baseQty: m.requiredQty,
      requiredQty: m.requiredQty * qty,
      shortage: Math.max(m.requiredQty * qty - m.availableQty, 0),
    }));

    setMaterialList(processedMaterials);
    setMaterialWarning(processedMaterials.some((m) => m.shortage > 0));
  };

  const calculateStartDate = (newQty, newEndDate) => {
    if (!newQty || !newEndDate) return;

    const daysNeeded = Math.ceil(newQty / MACHINE_CAPACITY_PER_DAY);
    const newStart = dayjs(newEndDate).subtract(daysNeeded - 1, 'day');
    form.setFieldsValue({ startDate: newStart });
  };

  const handleQtyChange = (value) => {
    setQty(value);

    // update material list
    const updatedMaterials = materialList.map((m) => {
      const newRequired = m.baseQty * value;
      return {
        ...m,
        requiredQty: newRequired,
        shortage: Math.max(newRequired - m.availableQty, 0),
      };
    });

    setMaterialList(updatedMaterials);
    setMaterialWarning(updatedMaterials.some((m) => m.shortage > 0));

    const endDate = form.getFieldValue('endDate');
    calculateStartDate(value, endDate);
  };

  const handleEndDateChange = (date) => {
    const quantity = qty;
    calculateStartDate(quantity, date);
  };

  return (
    <Form form={form} layout="vertical">
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            name="product"
            label={translate('Product')}
            rules={[{ required: true }]}
          >
            <SelectAsync
              entity="product"
              displayLabels={['name']}
              searchFields="name"
              onChange={onProductSelect}
              placeholder="Select Product"
            />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item
            name="qty"
            label={translate('Quantity')}
            rules={[{ required: true }]}
            initialValue={qty}
          >
            <InputNumber
              min={1}
              style={{ width: '100%' }}
              onChange={handleQtyChange}
            />
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item
            name="startDate"
            label={translate('Start Date')}
            rules={[{ required: true, type: 'object' }]}
          >
            <DatePicker style={{ width: '100%' }} disabled />
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item
            name="endDate"
            label={translate('End Date')}
            rules={[{ required: true, type: 'object' }]}
            initialValue={dayjs().add(7, 'day')}
          >
            <DatePicker style={{ width: '100%' }} onChange={handleEndDateChange} />
          </Form.Item>
        </Col>
      </Row>

      {materialList.length > 0 && (
        <>
          <Divider dashed />
          <Title level={5}>Bill of Materials</Title>
          {materialList.map((item, index) => (
            <Row key={index} gutter={16}>
              <Col span={6}><Text strong>{item.name}</Text></Col>
              <Col span={6}><Text>Required: {item.requiredQty}</Text></Col>
              <Col span={6}><Text>Available: {item.availableQty}</Text></Col>
              <Col span={6}>
                {item.shortage > 0 ? (
                  <Text type="danger"><WarningOutlined /> Shortage: {item.shortage}</Text>
                ) : (
                  <Text type="success">Sufficient</Text>
                )}
              </Col>
            </Row>
          ))}
        </>
      )}

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
