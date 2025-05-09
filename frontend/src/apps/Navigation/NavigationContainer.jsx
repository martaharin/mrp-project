// import { useState, useEffect } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { Button, Drawer, Layout, Menu } from 'antd';

// import { useAppContext } from '@/context/appContext';

// import useLanguage from '@/locale/useLanguage';
// import logoIcon from '@/style/images/logo-icon.svg';
// import logoText from '@/style/images/logo-text.svg';

// import useResponsive from '@/hooks/useResponsive';

// import {
//   SettingOutlined,
//   CustomerServiceOutlined,
//   ContainerOutlined,
//   FileSyncOutlined,
//   DashboardOutlined,
//   TagOutlined,
//   TagsOutlined,
//   UserOutlined,
//   CreditCardOutlined,
//   MenuOutlined,
//   FileOutlined,
//   ShopOutlined,
//   FilterOutlined,
//   WalletOutlined,
//   ReconciliationOutlined,
//   DeploymentUnitOutlined,
// } from '@ant-design/icons';

// const { Sider } = Layout;

// export default function Navigation() {
//   const { isMobile } = useResponsive();

//   return isMobile ? <MobileSidebar /> : <Sidebar collapsible={false} />;
// }

// function Sidebar({ collapsible, isMobile = false }) {
//   let location = useLocation();

//   const { state: stateApp, appContextAction } = useAppContext();
//   const { isNavMenuClose } = stateApp;
//   const { navMenu } = appContextAction;
//   const [showLogoApp, setLogoApp] = useState(isNavMenuClose);
//   const [currentPath, setCurrentPath] = useState(location.pathname.slice(1));

//   const translate = useLanguage();
//   const navigate = useNavigate();

//   const items = [
//     {
//       key: 'dashboard',
//       icon: <DashboardOutlined />,
//       label: <Link to={'/'}>{translate('dashboard')}</Link>,
//     },
//     {
//       key: 'customer',
//       icon: <CustomerServiceOutlined />,
//       label: <Link to={'/customer'}>{translate('customers')}</Link>,
//     },
//     {
//       key: 'billofmaterial',
//       icon: <DeploymentUnitOutlined />,
//       label: <Link to="/billofmaterial">Bill of Material</Link>,
//     },
//     {
//       key: 'invoice',
//       icon: <ContainerOutlined />,
//       label: <Link to={'/invoice'}>{translate('invoices')}</Link>,
//     },
//     {
//       key: 'quote',
//       icon: <FileSyncOutlined />,
//       label: <Link to={'/quote'}>{translate('quote')}</Link>,
//     },
//     {
//       key: 'payment',
//       icon: <CreditCardOutlined />,
//       label: <Link to={'/payment'}>{translate('payments')}</Link>,
//     },

//     {
//       key: 'paymentMode',
//       label: <Link to={'/payment/mode'}>{translate('payments_mode')}</Link>,
//       icon: <WalletOutlined />,
//     },
//     {
//       key: 'taxes',
//       label: <Link to={'/taxes'}>{translate('taxes')}</Link>,
//       icon: <ShopOutlined />,
//     },
//     {
//       key: 'generalSettings',
//       label: <Link to={'/settings'}>{translate('settings')}</Link>,
//       icon: <SettingOutlined />,
//     },
//     {
//       key: 'about',
//       label: <Link to={'/about'}>{translate('about')}</Link>,
//       icon: <ReconciliationOutlined />,
//     },
//   ];

//   useEffect(() => {
//     if (location)
//       if (currentPath !== location.pathname) {
//         if (location.pathname === '/') {
//           setCurrentPath('dashboard');
//         } else setCurrentPath(location.pathname.slice(1));
//       }
//   }, [location, currentPath]);

//   useEffect(() => {
//     if (isNavMenuClose) {
//       setLogoApp(isNavMenuClose);
//     }
//     const timer = setTimeout(() => {
//       if (!isNavMenuClose) {
//         setLogoApp(isNavMenuClose);
//       }
//     }, 200);
//     return () => clearTimeout(timer);
//   }, [isNavMenuClose]);
//   const onCollapse = () => {
//     navMenu.collapse();
//   };

//   return (
//     <Sider
//       collapsible={collapsible}
//       collapsed={collapsible ? isNavMenuClose : collapsible}
//       onCollapse={onCollapse}
//       className="navigation"
//       width={256}
//       style={{
//         overflow: 'auto',
//         height: '100vh',

//         position: isMobile ? 'absolute' : 'relative',
//         bottom: '20px',
//         ...(!isMobile && {
//           // border: 'none',
//           ['left']: '20px',
//           top: '20px',
//           // borderRadius: '8px',
//         }),
//       }}
//       theme={'light'}
//     >
//       <div
//         className="logo"
//         onClick={() => navigate('/')}
//         style={{
//           cursor: 'pointer',
//         }}
//       >
//         <img src={logoIcon} alt="Logo" style={{ marginLeft: '-5px', height: '40px' }} />

//         {!showLogoApp && (
//           <img
//             src={logoText}
//             alt="Logo"
//             style={{
//               marginTop: '3px',
//               marginLeft: '10px',
//               height: '38px',
//             }}
//           />
//         )}
//       </div>
//       <Menu
//         items={items}
//         mode="inline"
//         theme={'light'}
//         selectedKeys={[currentPath]}
//         style={{
//           width: 256,
//         }}
//       />
//     </Sider>
//   );
// }

// function MobileSidebar() {
//   const [visible, setVisible] = useState(false);
//   const showDrawer = () => {
//     setVisible(true);
//   };
//   const onClose = () => {
//     setVisible(false);
//   };

//   return (
//     <>
//       <Button
//         type="text"
//         size="large"
//         onClick={showDrawer}
//         className="mobile-sidebar-btn"
//         style={{ ['marginLeft']: 25 }}
//       >
//         <MenuOutlined style={{ fontSize: 18 }} />
//       </Button>
//       <Drawer
//         width={250}
//         // style={{ backgroundColor: 'rgba(255, 255, 255, 1)' }}
//         placement={'left'}
//         closable={false}
//         onClose={onClose}
//         open={visible}
//       >
//         <Sidebar collapsible={false} isMobile={true} />
//       </Drawer>
//     </>
//   );
// }

import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Drawer, Layout, Menu } from 'antd';

import { useAppContext } from '@/context/appContext';

import useLanguage from '@/locale/useLanguage';
import logoIcon from '@/style/images/logo-production.png';
import logoText from '@/style/images/icon.text.png';

import useResponsive from '@/hooks/useResponsive';

import {
  DashboardOutlined,
  CustomerServiceOutlined,
  DeploymentUnitOutlined,
  ScheduleOutlined,
  DatabaseOutlined,
  ToolOutlined,
  AppstoreOutlined,
  BarsOutlined,
  MenuOutlined,
  ControlOutlined,
  ProfileOutlined,
  InboxOutlined,
  ProjectOutlined,
  CalculatorOutlined,
  LineChartOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

export default function Navigation() {
  const { isMobile } = useResponsive();
  return isMobile ? <MobileSidebar /> : <Sidebar collapsible={false} />;
}

function Sidebar({ collapsible, isMobile = false }) {
  let location = useLocation();

  const { state: stateApp, appContextAction } = useAppContext();
  const { isNavMenuClose } = stateApp;
  const { navMenu } = appContextAction;
  const [showLogoApp, setLogoApp] = useState(isNavMenuClose);
  const [currentPath, setCurrentPath] = useState(location.pathname.slice(1));

  const translate = useLanguage();
  const navigate = useNavigate();

  const items = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: <Link to="/">{translate('dashboard')}</Link>,
    },
    {
      key: 'item',
      icon: <AppstoreOutlined />,
      label: <Link to={'/item'}>{translate('items')}</Link>,
    },

    {
      key: 'machine',
      icon: <ToolOutlined />,
      label: <Link to={'/machine'}>{translate('machines')}</Link>,
    },
    {
      key: 'billofmaterial',
      icon: <ProfileOutlined />,
      label: <Link to={'/billofmaterial'}>Bill of Material</Link>,
    },
    {
      key: 'batch',
      icon: <DatabaseOutlined />,
      label: <Link to={'/batch'}>Batch</Link>,
    },
    {
      key: 'productionschedule',
      icon: <ProjectOutlined />,
      label: <Link to={'/productionschedule'}>Production Schedule</Link>,
    },
    {
      key: 'materialrequirement',
      icon: <BarsOutlined />,
      label: <Link to="/materialrequirement">Material Requirement</Link>,
    },
    {
      key: 'forecast',
      icon: <LineChartOutlined />,
      label: <Link to="/forecast">Forecast</Link>,
    },
  ];

  useEffect(() => {
    if (location)
      if (currentPath !== location.pathname) {
        if (location.pathname === '/') {
          setCurrentPath('dashboard');
        } else setCurrentPath(location.pathname.slice(1));
      }
  }, [location, currentPath]);

  useEffect(() => {
    if (isNavMenuClose) {
      setLogoApp(isNavMenuClose);
    }
    const timer = setTimeout(() => {
      if (!isNavMenuClose) {
        setLogoApp(isNavMenuClose);
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [isNavMenuClose]);

  const onCollapse = () => {
    navMenu.collapse();
  };

  return (
    <Sider
      collapsible={collapsible}
      collapsed={collapsible ? isNavMenuClose : collapsible}
      onCollapse={onCollapse}
      className="navigation"
      width={256}
      style={{
        overflow: 'auto',
        height: '100vh',
        position: isMobile ? 'absolute' : 'relative',
        bottom: '20px',
        ...(!isMobile && {
          left: '20px',
          top: '20px',
        }),
      }}
      theme="light"
    >
      <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
        <img src={logoIcon} alt="Logo" style={{ marginLeft: '-5px', height: '40px' }} />
        {!showLogoApp && (
          <img
            src={logoText}
            alt="Logo Text"
            style={{
              marginTop: '3px',
              marginLeft: '10px',
              height: '38px',
            }}
          />
        )}
      </div>
      <Menu
        items={items}
        mode="inline"
        theme="light"
        selectedKeys={[currentPath]}
        style={{ width: 256 }}
      />
    </Sider>
  );
}

function MobileSidebar() {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => setVisible(true);
  const onClose = () => setVisible(false);

  return (
    <>
      <Button
        type="text"
        size="large"
        onClick={showDrawer}
        className="mobile-sidebar-btn"
        style={{ marginLeft: 25 }}
      >
        <MenuOutlined style={{ fontSize: 18 }} />
      </Button>
      <Drawer width={250} placement="left" closable={false} onClose={onClose} open={visible}>
        <Sidebar collapsible={false} isMobile={true} />
      </Drawer>
    </>
  );
}
