import React, { useState } from "react";
import { TabsContent } from "../ui/tabs";
import { Card, CardContent } from "../ui/card";
import { useGetProducts } from "@/api/productApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Pencil } from "lucide-react";

const Product = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useGetProducts(page);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error loading products.</div>;
  }

  return (
    <div>
      <TabsContent value="products">
        <Card>
          <CardContent className="grid gap-6">
            <Table>
              <TableHeader className="text-[16px]">
                <TableHead>Product ID</TableHead>
                <TableHead>Product name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>status</TableHead>
                <TableHead>category</TableHead>
                <TableHead>Action</TableHead>
              </TableHeader>
              <TableRow></TableRow>
              <TableBody>
                {data.data.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell className="text-sm font-semibold">
                      {product._id}
                    </TableCell>
                    <TableCell className="text-sm font-semibold">
                      {product.name}
                    </TableCell>
                    <TableCell className="text-sm font-semibold">
                      {product.price}
                    </TableCell>
                    <TableCell className="text-sm font-semibold">
                      {product.stock}
                    </TableCell>
                    <TableCell className="text-sm font-semibold">
                      {product.isDeleted ? "Deleted" : "Active"}
                    </TableCell>
                    <TableCell className="text-sm font-semibold">
                      {product.category}
                    </TableCell>
                    <TableCell>
                      <Pencil className="h-5 w-5 text-orange-600 cursor-pointer hover:text-orange-800" />
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
              disabled={data.data.length < 10}
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

export default Product;
