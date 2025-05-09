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

export default function ProductionScheduleForm({ subTotal = 0, current = null }) {
  const { last_quote_number } = useSelector(selectFinanceSettings);

  if (last_quote_number === undefined) {
    return <></>;
  }

  return <LoadProductionScheduleForm subTotal={subTotal} current={current} />;
}

function LoadProductionScheduleForm({ subTotal = 0, current = null }) {
  const translate = useLanguage();
  const { last_quote_number } = useSelector(selectFinanceSettings);
  const [bomItemId, setBomItemId] = useState(null);

  const handleBomChange = async (value) => {
    // Clear dependent fields

    if (value) {
      try {
        const currentBOM = await request.read({ entity: 'billofmaterial', id: value });
        console.log(currentBOM.result.item._id);

        if (currentBOM) {
          setBomItemId(currentBOM.result.item._id);
        } else {
          setBomItemId(null);
        }
      } catch (err) {
        console.error('Failed to load BOM:', err);
        setBomItemId(null);
      }
    } else {
      setBomItemId(null);
    }
  };
  return (
    <>
      <Row gutter={16}>
        <Col span={7}>
          <Form.Item
            name="bom"
            label={'Bill Of Material'}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <AutoCompleteAsync
              entity={'billofmaterial'}
              displayLabels={['name']}
              searchFields={'name'}
              redirectLabel={'Add Bill Of Material'}
              withRedirect
              urlToRedirect={'/billofmaterial'}
              onChange={handleBomChange}
            />
          </Form.Item>
        </Col>
      </Row>
      {bomItemId && (
        <Row gutter={16}>
          <Col span={7}>
            <Form.Item name="machine" label={translate('Machine')} rules={[{ required: true }]}>
              <AutoCompleteAsync
                entity="machine"
                displayLabels={['name']}
                searchFields="name"
                redirectLabel="Add Machine"
                filter={{ item: bomItemId }}
                withRedirect
                urlToRedirect="/machine"
              />
            </Form.Item>
          </Col>

          <Col span={5}>
            <Form.Item name="qty" label={translate('Quantity')} rules={[{ required: true }]}>
              <Input placeholder="Quantity" />
            </Form.Item>
          </Col>

          <Col span={5}>
            <Form.Item
              name="endDate"
              label={translate('End Date')}
              rules={[{ required: true, type: 'object' }]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>
      )}
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
