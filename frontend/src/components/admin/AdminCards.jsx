import React from "react";
import { useGetProducts } from "../../api/productApi.js";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card.jsx";
import Navbar from "../Navbar.jsx";
import { useGetOrders } from "@/api/orderApi.js";
import { useGetUsers } from "@/api/userApi.js";

const AdminCards = () => {
  const {
    data: productData,
    isLoading: productLoading,
    isError: productError,
  } = useGetProducts();
  const {
    data: ordersData,
    isLoading: ordersLoading,
    isError: ordersError,
  } = useGetOrders();
  const {
    data: usersData,
    isLoading: usersLoading,
    isError: usersError,
  } = useGetUsers();
  
  if (productLoading || ordersLoading || usersLoading) {
    return <div>Loading...</div>;
  }
  if (productError || ordersError || usersError) {
    return <div>Error loading products.</div>;
  }

  const pendingShipping = ordersData.orders.filter(
    (order) => order.status === "Pending" || order.status === "Processing"
  ).length;
  const totalRevenue = ordersData.orders
    .filter((order) => order.status === "Delivered")
    .reduce((sum, order) => sum + order.totalAmount, 0);
  const totalUsers = usersData.users.filter(
    (user) => user.isAdmin === false
  ).length;

  return (
    <>
      <Navbar />
      <div className="grid gap-6 gris-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 my-8 mx-6">
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Pending Shiping</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600">
              {pendingShipping}
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600">
              {productData.total}
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600">
              {ordersData.orders.length}
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Total revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600">{totalRevenue}</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Total users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600">{totalUsers}</p>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default AdminCards;
