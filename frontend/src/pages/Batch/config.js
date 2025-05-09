// export const fields = {
//   name: {
//     type: 'string',
//   },
//   capacity: {
//     type: 'number',
//     label: 'Kapasitas Maksimum',
//     required: true,
//   },
//   item: {
//     type: 'search',
//     entity: 'item',
//     displayLabels: ['name'],
//     searchFields: 'name',
//     withRedirect: true,
//     urlToRedirect: '/item',
//     redirectLabel: 'Add New Item',
//     filter: { type: 'finish good' },

//     // options: [
//     //   { label: 'Finish Goods', value: 'finish good' },
//     //   { label: 'Raw Material', value: 'raw material' },
//     // ],
//   },
// };

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
    type: 'search',
    entity: 'item',
    displayLabels: ['name'],
    searchFields: 'name',
    withRedirect: true,
    urlToRedirect: '/item',
    redirectLabel: 'Add New Item',
    // filter: { type: 'finish good' },

    // options: [
    //   { label: 'Finish Goods', value: 'finish good' },
    //   { label: 'Raw Material', value: 'raw material' },
    // ],
  },
  expired: {
    type: 'date',
    label: 'Expired Date',
    required: true,

    // ✅ Tambahan ini yang akan memperbaiki error 400
    getValue: (value) => dayjs(value).toDate(),
  },
};
