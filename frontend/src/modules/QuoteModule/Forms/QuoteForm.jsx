import { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import { Form, Input, InputNumber, Button, Select, Divider, Row, Col } from 'antd';

import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';

import { DatePicker } from 'antd';

import AutoCompleteAsync from '@/components/AutoCompleteAsync';

import ItemRow from '@/modules/ErpPanelModule/ItemRow';

import MoneyInputFormItem from '@/components/MoneyInputFormItem';
import { selectFinanceSettings } from '@/redux/settings/selectors';
import { useDate } from '@/settings';
import useLanguage from '@/locale/useLanguage';

import calculate from '@/utils/calculate';
import { useSelector } from 'react-redux';
import SelectAsync from '@/components/SelectAsync';

export default function QuoteForm({ subTotal = 0, current = null }) {
  const { last_quote_number } = useSelector(selectFinanceSettings);

  if (last_quote_number === undefined) {
    return <></>;
  }

  return <LoadQuoteForm subTotal={subTotal} current={current} />;
}

function LoadQuoteForm({ subTotal = 0, current = null }) {
  const translate = useLanguage();
  const { last_quote_number } = useSelector(selectFinanceSettings);
  const [lastNumber, setLastNumber] = useState(() => last_quote_number + 1);

  const [total, setTotal] = useState(0);
  const [taxRate, setTaxRate] = useState(0);
  const [taxTotal, setTaxTotal] = useState(0);
  const [currentYear, setCurrentYear] = useState(() => new Date().getFullYear());
  const handelTaxChange = (value) => {
    setTaxRate(value / 100);
  };

  useEffect(() => {
    if (current) {
      const { taxRate = 0, year, number } = current;
      setTaxRate(taxRate / 100);
      setCurrentYear(year);
      setLastNumber(number);
    }
  }, [current]);
  const addField = useRef(false);

  useEffect(() => {
    addField.current.click();
  }, []);

  return (
    <>
      <Row gutter={[12, 0]}>
        <Col className="gutter-row" span={8}>
          <Form.Item
            name="item"
            label={translate('Item')}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <AutoCompleteAsync
              entity={'item'}
              displayLabels={['name']}
              filter={{ type: 'finish good' }}
              searchFields={'name'}
              redirectLabel={'Add New Item'}
              withRedirect
              urlToRedirect={'/item'}
            />
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
