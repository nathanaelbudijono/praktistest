import AdminHeader from "@/components/modules/admin-header";
import Sidebar from "@/components/modules/sidebar";
import ManageItemsComponent from "@/components/pages/admin/dashboard/manage-items-component";
import AdminLayout from "@/components/ui/layout/admin-layout";
import Content from "@/components/ui/layout/content";
import ContentLayout from "@/components/ui/layout/content-layout";
import ContentTitle from "@/components/ui/layout/content-title";
import Seo from "@/components/ui/seo";

const ItemsPage = () => {
  return (
    <AdminLayout>
      <Seo templateTitle="Manage Items" />
      <Sidebar />
      <div className="flex flex-col">
        <AdminHeader title="Manage Items" />
        <ContentLayout>
          <ContentTitle />
          <Content>
            <ManageItemsComponent />
          </Content>
        </ContentLayout>
      </div>
    </AdminLayout>
  );
};

export default ItemsPage;
