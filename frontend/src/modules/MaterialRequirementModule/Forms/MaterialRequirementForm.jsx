import { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import { Form, Input, InputNumber, Button, Select, Divider, Row, Col } from 'antd';
import { DatePicker } from 'antd';
import AutoCompleteAsync from '@/components/AutoCompleteAsync';
import { selectFinanceSettings } from '@/redux/settings/selectors';
import useLanguage from '@/locale/useLanguage';
import calculate from '@/utils/calculate';
import { useSelector } from 'react-redux';
import SelectAsync from '@/components/SelectAsync';
import { request } from '@/request';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';

export default function MaterialRequirementForm({ subTotal = 0, current = null }) {
  const { last_quote_number } = useSelector(selectFinanceSettings);

  if (last_quote_number === undefined) {
    return <></>;
  }

  return <LoadMaterialRequirementForm subTotal={subTotal} current={current} />;
}

function LoadMaterialRequirementForm({ subTotal = 0, current = null }) {
  const translate = useLanguage();
  const { last_quote_number } = useSelector(selectFinanceSettings);

  useEffect(() => {
    if (current) {
    }
  }, [current]);
  const addField = useRef(false);

  useEffect(() => {
    addField.current.click();
  }, []);

  return (
    <>
      <Row gutter={[12, 0]}>
        <Col span={5}>
          <Form.Item
            name="requestedDate"
            label={translate('Request Date')}
            rules={[{ required: true, type: 'object' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>
      <Divider dashed />
      <Row gutter={[12, 12]} style={{ position: 'relative' }}>
        <Col className="gutter-row" span={12}>
          <p>{translate('Item')}</p>
        </Col>
        <Col className="gutter-row" span={3}>
          <p>{translate('Quantity')}</p>{' '}
        </Col>
      </Row>
      <Form.List name="items">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field) => (
              // <ItemRow key={field.key} remove={remove} field={field} current={current}></ItemRow>
              <Row gutter={[12, 12]} style={{ position: 'relative' }}>
                <Col className="gutter-row" span={12}>
                  <Form.Item name={[field.name, 'item']}>
                    <AutoCompleteAsync
                      entity={'item'}
                      displayLabels={['name']}
                      filter={{ type: 'raw material' }}
                      searchFields={'name'}
                      redirectLabel={'Add New Raw Material'}
                      withRedirect
                      urlToRedirect={'/item'}
                    />
                  </Form.Item>
                </Col>
                <Col className="gutter-row" span={7}>
                  <Form.Item name={[field.name, 'quantity']}>
                    <Input placeholder="Quantity" />
                  </Form.Item>
                </Col>
                <div style={{ position: 'absolute', right: '120px', top: ' 5px' }}>
                  <DeleteOutlined onClick={() => remove(field.name)} />
                </div>
              </Row>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
                ref={addField}
              >
                {translate('Add field')}
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Divider dashed />
      <div style={{ position: 'relative', width: ' 100%', float: 'right' }}></div>
    </>
  );
}

{
  /* <Row gutter={[12, 12]} style={{ position: 'relative' }}>
  <Col className="gutter-row" span={12}>
    <p>{translate('Item')}</p>
  </Col>
  <Col className="gutter-row" span={3}>
    <p>{translate('Quantity')}</p>{' '}
  </Col>
</Row>
<Form.List name="items">
  {(fields, { add, remove }) => (
    <>
      {fields.map((field) => (
        // <ItemRow key={field.key} remove={remove} field={field} current={current}></ItemRow>
        <Row gutter={[12, 12]} style={{ position: 'relative' }}>
          <Col className="gutter-row" span={12}>
            <Form.Item name={[field.name, 'item']}>
              <AutoCompleteAsync
                entity={'item'}
                displayLabels={['name']}
                filter={{ type: 'raw material' }}
                searchFields={'name'}
                redirectLabel={'Add New Raw Material'}
                withRedirect
                urlToRedirect={'/item'}
              />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={7}>
            <Form.Item name={[field.name, 'quantity']}>
              <Input placeholder="Quantity" />
            </Form.Item>
          </Col>
          <div style={{ position: 'absolute', right: '120px', top: ' 5px' }}>
            <DeleteOutlined onClick={() => remove(field.name)} />
          </div>
        </Row>
      ))}
      <Form.Item>
        <Button
          type="dashed"
          onClick={() => add()}
          block
          icon={<PlusOutlined />}
          ref={addField}
        >
          {translate('Add field')}
        </Button>
      </Form.Item>
    </>
  )}
</Form.List> */
}
{
  /* <Divider dashed /> */
}
