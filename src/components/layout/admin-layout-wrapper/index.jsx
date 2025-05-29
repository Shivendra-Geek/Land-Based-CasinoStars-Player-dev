import clsx from 'clsx';
import style from './admin-layout-wrapper.module.scss';

function AdminLayoutWrapper({ children }) {
    return <div className={clsx(style.layout_wp, 'casino_starts_layout')}>{children}</div>;
}

export default AdminLayoutWrapper;
