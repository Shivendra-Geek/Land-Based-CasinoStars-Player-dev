import AdminLayoutWrapper from '@/components/layout/admin-layout-wrapper';

export const AdminLayout = ({ children }) => {
    return (
        <>
            <AdminLayoutWrapper>{children}</AdminLayoutWrapper>
        </>
    );
};

export default AdminLayout;
