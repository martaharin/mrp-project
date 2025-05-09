export const fields = {
    itemId: {
      type: 'select',
      label: 'Item',
      entity: 'item',
      displayLabels: ['name'],
      searchFields: 'name',
      required: true,
    },
    batchName: {
      type: 'string',
      label: 'Nama Batch',
      required: true,
    },
    qty: {
      type: 'number',
      label: 'Quantity',
      required: true,
      min: 0,
    },
    expDate: {
      type: 'date',
      label: 'Expired Date',
      required: true,
    },
  };  