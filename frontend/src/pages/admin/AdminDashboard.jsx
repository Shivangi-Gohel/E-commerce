import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import Order from "@/components/admin/Order";
import AdminCards from "@/components/admin/AdminCards";
import Product from "@/components/admin/Product";

const AdminDashboard = () => {
  return (
    <div className="bg-orange-900/15 pb-20">
      <AdminCards />
      <div className="flex w-full flex-col gap-6 px-6">
        <Tabs defaultValue="orders">
          <TabsList>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
          </TabsList>
          <Order />
          <Product />
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
