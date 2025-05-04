// config.js
export const fields = {
    name: {
      type: 'string',
      required: true,
      placeholder: 'Nama Produk Jadi',
    },
    items: {
      type: 'list',
      fields: {
        item: {
          type: 'async',
          entity: 'item',
          displayLabels: ['name'],
          outputValue: '_id',
          placeholder: 'Pilih Material',
          required: true,
        },
        quantity: {
          type: 'number',
          placeholder: 'Qty',
          required: true,
        },
      },
    },
  };
  