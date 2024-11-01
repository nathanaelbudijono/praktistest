import AdminHeader from "@/components/modules/admin-header";
import Sidebar from "@/components/modules/sidebar";
import DashboardComponent from "@/components/pages/admin/dashboard/dashboard-component";
import AdminLayout from "@/components/ui/layout/admin-layout";
import Content from "@/components/ui/layout/content";
import ContentLayout from "@/components/ui/layout/content-layout";
import ContentTitle from "@/components/ui/layout/content-title";

const DashboardPage = () => {
  return (
    <AdminLayout>
      <Sidebar />
      <div className="flex flex-col">
        <AdminHeader title="Dashboard" />
        <ContentLayout>
          <ContentTitle />
          <Content>
            <DashboardComponent />
          </Content>
        </ContentLayout>
      </div>
    </AdminLayout>
  );
};

export default DashboardPage;
