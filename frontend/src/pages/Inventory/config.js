import dayjs from 'dayjs';

export const fields = {
  name: {
    type: 'string',
    label: 'Batch',
    required: true,
  },
  quantity: {
    type: 'number',
    label: 'Quantity',
    required: true,
  },
  item: {
    type: 'string',
    label: 'Item',
    required: true,
  },
  expired: {
    type: 'date',
    label: 'Expired Date',
    required: true,

    // ✅ Tambahan ini yang akan memperbaiki error 400
    getValue: (value) => dayjs(value).toDate(),
  },
};