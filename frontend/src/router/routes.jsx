import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const Logout = lazy(() => import('@/pages/Logout.jsx'));
const NotFound = lazy(() => import('@/pages/NotFound.jsx'));

const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Customer = lazy(() => import('@/pages/Customer'));
const Forecast = lazy(() => import('@/pages/Forecast'));
const Invoice = lazy(() => import('@/pages/Invoice'));
const InvoiceCreate = lazy(() => import('@/pages/Invoice/InvoiceCreate'));
const InvoiceRead = lazy(() => import('@/pages/Invoice/InvoiceRead'));
const InvoiceUpdate = lazy(() => import('@/pages/Invoice/InvoiceUpdate'));
const InvoiceRecordPayment = lazy(() => import('@/pages/Invoice/InvoiceRecordPayment'));

const Quote = lazy(() => import('@/pages/Quote/index'));
const QuoteCreate = lazy(() => import('@/pages/Quote/QuoteCreate'));
const QuoteRead = lazy(() => import('@/pages/Quote/QuoteRead'));
const QuoteUpdate = lazy(() => import('@/pages/Quote/QuoteUpdate'));

const Payment = lazy(() => import('@/pages/Payment/index'));
const PaymentRead = lazy(() => import('@/pages/Payment/PaymentRead'));
const PaymentUpdate = lazy(() => import('@/pages/Payment/PaymentUpdate'));

const Settings = lazy(() => import('@/pages/Settings/Settings'));
const PaymentMode = lazy(() => import('@/pages/PaymentMode'));
const Taxes = lazy(() => import('@/pages/Taxes'));
const Profile = lazy(() => import('@/pages/Profile'));
const About = lazy(() => import('@/pages/About'));

// ✅ Tambahan: Inventory, BillOfMaterial, MPS
const Inventory = lazy(() => import('@/pages/Inventory'));
const BillOfMaterial = lazy(() => import('@/pages/BillOfMaterial'));
const BOMCreate = lazy(() => import('@/pages/BillOfMaterial/BOMCreate'));
const BOMRead = lazy(() => import('@/pages/BillOfMaterial/BOMRead'));
const BOMUpdate = lazy(() => import('@/pages/BillOfMaterial/BOMUpdate'));

const MPS = lazy(() => import('@/pages/MPS'));
const MPSCreate = lazy(() => import('@/pages/MPS/MPSCreate'));
const MPSRead = lazy(() => import('@/pages/MPS/MPSRead'));
const MPSUpdate = lazy(() => import('@/pages/MPS/MPSUpdate'));

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
      path: '/forecast',
      element: <Forecast />,
    },

    { path: '/invoice', element: <Invoice /> },
    { path: '/invoice/create', element: <InvoiceCreate /> },
    { path: '/invoice/read/:id', element: <InvoiceRead /> },
    { path: '/invoice/update/:id', element: <InvoiceUpdate /> },
    { path: '/invoice/pay/:id', element: <InvoiceRecordPayment /> },

    { path: '/quote', element: <Quote /> },
    { path: '/quote/create', element: <QuoteCreate /> },
    { path: '/quote/read/:id', element: <QuoteRead /> },
    { path: '/quote/update/:id', element: <QuoteUpdate /> },

    { path: '/payment', element: <Payment /> },
    { path: '/payment/read/:id', element: <PaymentRead /> },
    { path: '/payment/update/:id', element: <PaymentUpdate /> },

    { path: '/settings', element: <Settings /> },
    { path: '/settings/edit/:settingsKey', element: <Settings /> },
    { path: '/payment/mode', element: <PaymentMode /> },
    { path: '/taxes', element: <Taxes /> },

    { path: '/profile', element: <Profile /> },

    // ✅ Inventory
    { path: '/inventory', element: <Inventory /> },

    // ✅ BillOfMaterial
    { path: '/bom', element: <BillOfMaterial /> },
    { path: '/bom/create', element: <BOMCreate /> },
    { path: '/bom/read/:id', element: <BOMRead /> },
    { path: '/bom/update/:id', element: <BOMUpdate /> },

    // ✅ MPS
    { path: '/productionSchedule', element: <MPS /> },
    { path: '/productionSchedule/create', element: <MPSCreate /> },
    { path: '/productionSchedule/read/:id', element: <MPSRead /> },
    { path: '/productionSchedule/update/:id', element: <MPSUpdate /> },

    { path: '*', element: <NotFound /> },
  ],
};

export default routes;
