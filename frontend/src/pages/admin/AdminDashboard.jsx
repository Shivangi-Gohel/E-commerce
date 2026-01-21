import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import Order from "@/components/admin/Order";
import AdminCards from "@/components/admin/AdminCards";
import Product from "@/components/admin/Product";
import User from "@/components/admin/User";

const AdminDashboard = () => {
  return (
    <div className="bg-orange-900/15 pb-20">
      <AdminCards />
      <div className="flex w-full flex-col gap-6 px-6">
        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="orders" className="w-full">
              Orders
            </TabsTrigger>
            <TabsTrigger value="products" className="w-full">
              Products
            </TabsTrigger>
            <TabsTrigger value="users" className="w-full">
              Users
            </TabsTrigger>
          </TabsList>
          <Order />
          <Product />
          <User />
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
