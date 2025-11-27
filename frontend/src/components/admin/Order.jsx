import React, { useState } from "react";
import { TabsContent } from "../ui/tabs";
import { Card, CardContent } from "../ui/card";
import { useGetOrders, useUpdateOrderStatus } from "@/api/orderApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Pencil } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "../ui/button";

const Order = () => {
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();
  const [openStatusFor, setOpenStatusFor] = useState(null);
  const [loadingStatus, setLoadingStatus] = useState(null);
  const { data, isLoading, isError } = useGetOrders(page);
  const { mutate: updateOrderStatus } = useUpdateOrderStatus(); 

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error loading products.</div>;
  }

  const statusFlow = {
    Pending: ["Processing", "Cancelled"],
    Processing: ["Shipped", "Cancelled"],
    Shipped: ["Delivered"],
    Delivered: [],
    Cancelled: [],
  };
 

  const handleStatusUpdate = (order, newStatus) => {
    setLoadingStatus(order._id);
    updateOrderStatus(
      { orderId: order._id, status: newStatus },
      {
        onSuccess: (data) => {
          setLoadingStatus(null);
          setOpenStatusFor(null);
          queryClient.invalidateQueries(["orders"]);
        }
      }
    );
  };

  return (
    <div>
      <TabsContent value="orders">
        <Card>
          <CardContent className="grid gap-6">
            <Table>
              <TableHeader className="text-[16px]">
                <TableHead>Order ID</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total Amount</TableHead>
                <TableHead>Payment status</TableHead>
                <TableHead>created At</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>status</TableHead>
                <TableHead>Action</TableHead>
              </TableHeader>
              <TableRow></TableRow>
              <TableBody>
                {data.orders.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell className="text-sm font-semibold">
                      {order._id}
                    </TableCell>
                    <TableCell className="text-sm font-semibold">
                      {order.userId.email}
                    </TableCell>
                    <TableCell className="text-sm font-semibold">
                      {order.items.map((item) => (
                        <div key={item._id}>
                          {item.productId?.name} × {item.quantity} - ₹
                          {item.price}
                        </div>
                      ))}
                    </TableCell>
                    <TableCell className="text-sm font-semibold">
                      {order.totalAmount}
                    </TableCell>
                    <TableCell className="text-sm font-semibold">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold
                            ${
                              order.payment === "Success"
                                ? "bg-green-100 text-green-800"
                                : order.payment === "Pending"
                                ? "bg-red-100 text-red-800"
                                : "bg-gray-100 text-gray-700"
                            }
                          `}
                      >
                        {order.payment}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm font-semibold">
                      {order.createdAt.split("T")[0]}
                    </TableCell>
                    <TableCell className="text-sm font-semibold">
                      {order.address}
                    </TableCell>
                    <TableCell className="text-sm font-semibold">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold
                            ${
                              order.status === "Delivered"
                                ? "bg-green-100 text-green-800"
                                : order.status === "Cancelled"
                                ? "bg-red-100 text-red-800"
                                : order.status === "Pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : order.status === "Shipped"
                                ? "bg-purple-100 text-purple-800"
                                : "bg-gray-100 text-gray-700"
                            }
                          `}
                      >
                        {order.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm font-semibold">
                      <Pencil
                        className="h-5 w-5 text-orange-600 cursor-pointer hover:text-orange-800"
                        onClick={() =>
                          setOpenStatusFor(
                            openStatusFor === order._id ? null : order._id
                          )
                        }
                      />
                      {/* Dropdown */}
                      {openStatusFor === order._id && (
                        <div className="absolute top-8 right-0 bg-white shadow-lg border rounded-md w-36 z-50">
                          {statusFlow[order.status].length === 0 && (
                            <div className="px-3 py-2 text-sm text-gray-500">
                              No actions
                            </div>
                          )}

                          {statusFlow[order.status].map((st) => (
                            <div
                              key={st}
                              onClick={() => handleStatusUpdate(order, st)}
                              className={`px-3 py-2 cursor-pointer hover:bg-gray-100 text-sm ${
                                loadingStatus === order._id
                                  ? "opacity-50 cursor-wait"
                                  : ""
                              }`}
                            >
                              {st}
                            </div>
                          ))}
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <div className="flex gap-3 m-2 justify-end">
            <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
              prev
            </Button>
            <Button
              disabled={data.orders.length < 10}
              onClick={() => setPage(page + 1)}
            >
              Next
            </Button>
          </div>
        </Card>
      </TabsContent>
    </div>
  );
};

export default Order;
