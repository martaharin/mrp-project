// import ProtectedRoute from '@/components/ProtectedROute';
// import { lazy } from 'react';
// import { Navigate } from 'react-router-dom';

// const Logout = lazy(() => import('@/pages/Logout.jsx'));
// const NotFound = lazy(() => import('@/pages/NotFound.jsx'));

// const Dashboard = lazy(() => import('@/pages/Dashboard'));
// const Customer = lazy(() => import('@/pages/Customer'));
// const Forecast = lazy(() => import('@/pages/Forecast'));
// const Item = lazy(() => import('@/pages/Item'));
// const Machine = lazy(() => import('@/pages/Machine'));
// const Batch = lazy(() => import('@/pages/Batch'));
// const Invoice = lazy(() => import('@/pages/Invoice'));
// const InvoiceCreate = lazy(() => import('@/pages/Invoice/InvoiceCreate'));
// const InvoiceRead = lazy(() => import('@/pages/Invoice/InvoiceRead'));
// const InvoiceUpdate = lazy(() => import('@/pages/Invoice/InvoiceUpdate'));
// const InvoiceRecordPayment = lazy(() => import('@/pages/Invoice/InvoiceRecordPayment'));

// const Quote = lazy(() => import('@/pages/Quote/index'));
// const QuoteCreate = lazy(() => import('@/pages/Quote/QuoteCreate'));
// const QuoteRead = lazy(() => import('@/pages/Quote/QuoteRead'));
// const QuoteUpdate = lazy(() => import('@/pages/Quote/QuoteUpdate'));
// const Payment = lazy(() => import('@/pages/Payment/index'));
// const PaymentRead = lazy(() => import('@/pages/Payment/PaymentRead'));
// const PaymentUpdate = lazy(() => import('@/pages/Payment/PaymentUpdate'));

// const Settings = lazy(() => import('@/pages/Settings/Settings'));
// const PaymentMode = lazy(() => import('@/pages/PaymentMode'));
// const Taxes = lazy(() => import('@/pages/Taxes'));
// const Profile = lazy(() => import('@/pages/Profile'));
// const About = lazy(() => import('@/pages/About'));

// let routes = {
//   expense: [],
//   default: [
//     {
//       path: '/login',
//       element: <Navigate to="/" />,
//     },
//     {
//       path: '/logout',
//       element: <Logout />,
//     },
//     {
//       path: '/about',
//       element: <About />,
//     },
//     {
//       path: '/',
//       element: <Dashboard />,
//     },
//     {
//       path: '/item',
//       element: <Item />,
//     },
//     {
//       path: '/forecast',
//       element: <Forecast />,
//     },
//     {
//       path: '/invoice/create',
//       element: <InvoiceCreate />,
//     },
//     {
//       path: '/invoice/read/:id',
//       element: <InvoiceRead />,
//     },
//     {
//       path: '/invoice/update/:id',
//       element: <InvoiceUpdate />,
//     },
//     {
//       path: '/invoice/pay/:id',
//       element: <InvoiceRecordPayment />,
//     },
//     {
//       path: '/quote',
//       element: <Quote />,
//     },
//     {
//       path: '/quote/create',
//       element: <QuoteCreate />,
//     },
//     {
//       path: '/quote/read/:id',
//       element: <QuoteRead />,
//     },
//     {
//       path: '/quote/update/:id',
//       element: <QuoteUpdate />,
//     },
//     {
//       path: '/payment',
//       element: <Payment />,
//     },
//     {
//       path: '/payment/read/:id',
//       element: <PaymentRead />,
//     },
//     {
//       path: '/payment/update/:id',
//       element: <PaymentUpdate />,
//     },

//     {
//       path: '/settings',
//       element: <Settings />,
//     },
//     {
//       path: '/settings/edit/:settingsKey',
//       element: <Settings />,
//     },
//     {
//       path: '/payment/mode',
//       element: <PaymentMode />,
//     },
//     {
//       path: '/taxes',
//       element: <Taxes />,
//     },
//     {
//       path: '/profile',
//       element: <Profile />,
//     },

//     {
//       path: '/forecast',
//       element: (
//         // <ProtectedRoute entity="item" allowedRoles={['owner', 'production']}>
//         <Forecast />
//         // </ProtectedRoute>
//       ),
//     },
//     {
//       path: '/item',
//       element: (
//         // <ProtectedRoute entity="item" allowedRoles={['owner', 'production']}>
//         <Item />
//         // </ProtectedRoute>
//       ),
//     },
//     {
//       path: '/machine',
//       element: (
//         // <ProtectedRoute entity="machine" allowedRoles={['owner', 'production']}>
//         <Machine />
//         // </ProtectedRoute>
//       ),
//     },
//     {
//       path: '/batch',
//       element: (
//         // <ProtectedRoute entity="batch" allowedRoles={['owner', 'production']}>
//         <Batch />
//         // </ProtectedRoute>
//       ),
//     },
//     {
//       path: '/billofmaterial',
//       element: (
//         // <ProtectedRoute entity="billofmaterial" allowedRoles={['owner', 'production']}>
//         <BillOfMaterial />
//         // </ProtectedRoute>
//       ),
//     },
//     {
//       path: '/billofmaterial/create',
//       element: (
//         // <ProtectedRoute entity="billofmaterial" allowedRoles={['owner', 'production']}>
//         <BillOfMaterialCreate />
//         // </ProtectedRoute>
//       ),
//     },
//     {
//       path: '/billofmaterial/read/:id',
//       element: (
//         // <ProtectedRoute entity="billofmaterial" allowedRoles={['owner', 'production']}>
//         <BillOfMaterialRead />
//         // </ProtectedRoute>
//       ),
//     },
//     {
//       path: '/billofmaterial/update/:id',
//       element: (
//         // <ProtectedRoute entity="billofmaterial" allowedRoles={['owner', 'production']}>
//         <BillOfMaterialUpdate />
//         // </ProtectedRoute>
//       ),
//     },
//     {
//       path: '/materialrequirement',
//       element: (
//         // <ProtectedRoute entity="materialrequirement" allowedRoles={['owner', 'production']}>
//         <MaterialRequirement />
//         // </ProtectedRoute>
//       ),
//     },
//     {
//       path: '/materialrequirement/create',
//       element: (
//         // <ProtectedRoute entity="materialrequirement" allowedRoles={['owner', 'production']}>
//         <MaterialRequirementCreate />
//         // </ProtectedRoute>
//       ),
//     },
//     {
//       path: '/materialrequirement/read/:id',
//       element: (
//         // <ProtectedRoute entity="materialrequirement" allowedRoles={['owner', 'production']}>
//         <MaterialRequirementRead />
//         // </ProtectedRoute>
//       ),
//     },
//     {
//       path: '/materialrequirement/update/:id',
//       element: (
//         // <ProtectedRoute entity="materialrequirement" allowedRoles={['owner', 'production']}>
//         <MaterialRequirementUpdate />
//         // </ProtectedRoute>
//       ),
//     },

//     {
//       path: '/productionSchedule',
//       element: (
//         // <ProtectedRoute entity={'productionSchedule'} allowedRoles={['owner', 'production']}>
//         <ProductionSchedule />
//         // </ProtectedRoute>
//       ),
//     },
//     {
//       path: '/productionSchedule/create',
//       element: (
//         // <ProtectedRoute entity={'productionSchedule'} allowedRoles={['owner', 'production']}>
//         <ProductionScheduleCreate />
//         // </ProtectedRoute>
//       ),
//     },
//     {
//       path: '/productionSchedule/read/:id',
//       element: (
//         // <ProtectedRoute entity={'productionSchedule'} allowedRoles={['owner', 'production']}>
//         <ProductionScheduleRead />
//         // </ProtectedRoute>
//       ),
//     },

//     {
//       path: '/productionSchedule/update/:id',
//       element: (
//         // <ProtectedRoute entity={'productionSchedule'} allowedRoles={['owner', 'production']}>
//         <ProductionScheduleUpdate />
//         // </ProtectedRoute>
//       ),
//     },
//     {
//       path: '*',
//       element: <NotFound />,
//     },
//   ],
// };

// export default routes;

import ProtectedRoute from '@/components/ProtectedROute';
import { lazy } from 'react';

import { Navigate } from 'react-router-dom';

const Logout = lazy(() => import('@/pages/Logout.jsx'));
const NotFound = lazy(() => import('@/pages/NotFound.jsx'));

const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Customer = lazy(() => import('@/pages/Customer'));
const Forecast = lazy(() => import('@/pages/Forecast'));
const Item = lazy(() => import('@/pages/Item'));
const Machine = lazy(() => import('@/pages/Machine'));
const Batch = lazy(() => import('@/pages/Batch'));
const Invoice = lazy(() => import('@/pages/Invoice'));
const InvoiceCreate = lazy(() => import('@/pages/Invoice/InvoiceCreate'));

const InvoiceRead = lazy(() => import('@/pages/Invoice/InvoiceRead'));
const InvoiceUpdate = lazy(() => import('@/pages/Invoice/InvoiceUpdate'));
const InvoiceRecordPayment = lazy(() => import('@/pages/Invoice/InvoiceRecordPayment'));
const Quote = lazy(() => import('@/pages/Quote/index'));
const QuoteCreate = lazy(() => import('@/pages/Quote/QuoteCreate'));
const QuoteRead = lazy(() => import('@/pages/Quote/QuoteRead'));
const QuoteUpdate = lazy(() => import('@/pages/Quote/QuoteUpdate'));
const BillOfMaterial = lazy(() => import('@/pages/BillOfMaterial/index'));
const BillOfMaterialCreate = lazy(() => import('@/pages/BillOfMaterial/BillOfMaterialCreate'));
const BillOfMaterialRead = lazy(() => import('@/pages/BillOfMaterial/BillOfMaterialRead'));
const BillOfMaterialUpdate = lazy(() => import('@/pages/BillOfMaterial/BillOfMaterialUpdate'));
const MaterialRequirement = lazy(() => import('@/pages/MaterialRequirement/index'));
const MaterialRequirementCreate = lazy(
  () => import('@/pages/MaterialRequirement/MaterialRequirementCreate')
);
const MaterialRequirementRead = lazy(
  () => import('@/pages/MaterialRequirement/MaterialRequirementRead')
);
const MaterialRequirementUpdate = lazy(
  () => import('@/pages/MaterialRequirement/MaterialRequirementUpdate')
);
const ProductionSchedule = lazy(() => import('@/pages/ProductionSchedule/index'));
const ProductionScheduleCreate = lazy(
  () => import('@/pages/ProductionSchedule/ProductionScheduleCreate')
);
const ProductionScheduleRead = lazy(
  () => import('@/pages/ProductionSchedule/ProductionScheduleRead')
);
const ProductionScheduleUpdate = lazy(
  () => import('@/pages/ProductionSchedule/ProductionScheduleUpdate')
);
const Payment = lazy(() => import('@/pages/Payment/index'));
const PaymentRead = lazy(() => import('@/pages/Payment/PaymentRead'));
const PaymentUpdate = lazy(() => import('@/pages/Payment/PaymentUpdate'));

const Settings = lazy(() => import('@/pages/Settings/Settings'));
const PaymentMode = lazy(() => import('@/pages/PaymentMode'));
const Taxes = lazy(() => import('@/pages/Taxes'));

const Profile = lazy(() => import('@/pages/Profile'));

const About = lazy(() => import('@/pages/About'));

let routes = {
  expense: [],
  default: [
    {
      path: '/login',
      element: <Navigate to="/" />,
    },
    {
      path: '/logout',
      element: <Logout />,
    },
    {
      path: '/about',
      element: <About />,
    },
    {
      path: '/',
      element: <Dashboard />,
    },
    {
      path: '/customer',
      element: <Customer />,
    },

    {
      path: '/invoice',
      element: <Invoice />,
    },
    {
      path: '/invoice/create',
      element: <InvoiceCreate />,
    },
    {
      path: '/invoice/read/:id',
      element: <InvoiceRead />,
    },
    {
      path: '/invoice/update/:id',
      element: <InvoiceUpdate />,
    },
    {
      path: '/invoice/pay/:id',
      element: <InvoiceRecordPayment />,
    },
    {
      path: '/quote',
      element: <Quote />,
    },
    {
      path: '/quote/create',
      element: <QuoteCreate />,
    },
    {
      path: '/quote/read/:id',
      element: <QuoteRead />,
    },
    {
      path: '/quote/update/:id',
      element: <QuoteUpdate />,
    },
    {
      path: '/payment',
      element: <Payment />,
    },
    {
      path: '/payment/read/:id',
      element: <PaymentRead />,
    },
    {
      path: '/payment/update/:id',
      element: <PaymentUpdate />,
    },

    {
      path: '/settings',
      element: <Settings />,
    },
    {
      path: '/settings/edit/:settingsKey',
      element: <Settings />,
    },
    {
      path: '/payment/mode',
      element: <PaymentMode />,
    },
    {
      path: '/taxes',
      element: <Taxes />,
    },
    {
      path: '/profile',
      element: <Profile />,
    },

    {
      path: '/forecast',
      element: (
        // <ProtectedRoute entity="item" allowedRoles={['owner', 'production']}>
        <Forecast />
        // </ProtectedRoute>
      ),
    },
    {
      path: '/item',
      element: (
        // <ProtectedRoute entity="item" allowedRoles={['owner', 'production']}>
        <Item />
        // </ProtectedRoute>
      ),
    },
    {
      path: '/machine',
      element: (
        // <ProtectedRoute entity="machine" allowedRoles={['owner', 'production']}>
        <Machine />
        // </ProtectedRoute>
      ),
    },
    {
      path: '/batch',
      element: (
        // <ProtectedRoute entity="batch" allowedRoles={['owner', 'production']}>
        <Batch />
        // </ProtectedRoute>
      ),
    },
    {
      path: '/billofmaterial',
      element: (
        // <ProtectedRoute entity="billofmaterial" allowedRoles={['owner', 'production']}>
        <BillOfMaterial />
        // </ProtectedRoute>
      ),
    },
    {
      path: '/billofmaterial/create',
      element: (
        // <ProtectedRoute entity="billofmaterial" allowedRoles={['owner', 'production']}>
        <BillOfMaterialCreate />
        // </ProtectedRoute>
      ),
    },
    {
      path: '/billofmaterial/read/:id',
      element: (
        // <ProtectedRoute entity="billofmaterial" allowedRoles={['owner', 'production']}>
        <BillOfMaterialRead />
        // </ProtectedRoute>
      ),
    },
    {
      path: '/billofmaterial/update/:id',
      element: (
        // <ProtectedRoute entity="billofmaterial" allowedRoles={['owner', 'production']}>
        <BillOfMaterialUpdate />
        // </ProtectedRoute>
      ),
    },
    {
      path: '/materialrequirement',
      element: (
        // <ProtectedRoute entity="materialrequirement" allowedRoles={['owner', 'production']}>
        <MaterialRequirement />
        // </ProtectedRoute>
      ),
    },
    {
      path: '/materialrequirement/create',
      element: (
        // <ProtectedRoute entity="materialrequirement" allowedRoles={['owner', 'production']}>
        <MaterialRequirementCreate />
        // </ProtectedRoute>
      ),
    },
    {
      path: '/materialrequirement/read/:id',
      element: (
        // <ProtectedRoute entity="materialrequirement" allowedRoles={['owner', 'production']}>
        <MaterialRequirementRead />
        // </ProtectedRoute>
      ),
    },
    {
      path: '/materialrequirement/update/:id',
      element: (
        // <ProtectedRoute entity="materialrequirement" allowedRoles={['owner', 'production']}>
        <MaterialRequirementUpdate />
        // </ProtectedRoute>
      ),
    },

    {
      path: '/productionSchedule',
      element: (
        // <ProtectedRoute entity={'productionSchedule'} allowedRoles={['owner', 'production']}>
        <ProductionSchedule />
        // </ProtectedRoute>
      ),
    },
    {
      path: '/productionSchedule/create',
      element: (
        // <ProtectedRoute entity={'productionSchedule'} allowedRoles={['owner', 'production']}>
        <ProductionScheduleCreate />
        // </ProtectedRoute>
      ),
    },
    {
      path: '/productionSchedule/read/:id',
      element: (
        // <ProtectedRoute entity={'productionSchedule'} allowedRoles={['owner', 'production']}>
        <ProductionScheduleRead />
        // </ProtectedRoute>
      ),
    },

    {
      path: '/productionSchedule/update/:id',
      element: (
        // <ProtectedRoute entity={'productionSchedule'} allowedRoles={['owner', 'production']}>
        <ProductionScheduleUpdate />
        // </ProtectedRoute>
      ),
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ],
};

export default routes;
