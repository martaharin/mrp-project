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
      key: 'billofmaterial',
      icon: <DeploymentUnitOutlined />,
      label: <Link to="/billofmaterial">Bill of Material</Link>,
    },
    {
      key: 'mps',
      icon: <ScheduleOutlined />,
      label: <Link to="/mps">Production Schedulle</Link>,
    },
    {
      key: 'inventory',
      icon: <DatabaseOutlined />,
      label: <Link to="/inventory">Inventory</Link>,
    },
    {
      key: 'machine',
      icon: <ToolOutlined />,
      label: <Link to="/machine">Machine</Link>,
    },
    {
      key: 'item',
      icon: <AppstoreOutlined />,
      label: <Link to="/item">Item</Link>,
    },
    {
      key: 'materialrequirement',
      icon: <BarsOutlined />,
      label: <Link to="/materialrequirement">Material Requirement</Link>,
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
        ...( !isMobile && {
          left: '20px',
          top: '20px',
        }),
      }}
      theme="light"
    >
      <div
        className="logo"
        onClick={() => navigate('/')}
        style={{ cursor: 'pointer' }}
      >
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
      <Drawer
        width={250}
        placement="left"
        closable={false}
        onClose={onClose}
        open={visible}
      >
        <Sidebar collapsible={false} isMobile={true} />
      </Drawer>
    </>
  );
}
