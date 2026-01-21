import React, { useEffect, useState } from "react";
import { TabsContent } from "../ui/tabs";
import { Card, CardContent } from "../ui/card";
import {
  useGetProductById,
  useGetProducts,
  useUpdateProduct,
} from "@/api/productApi";
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
import { X } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

const Product = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useGetProducts(page);
  const [openUpdateFor, setOpenUpdateFor] = useState(null);
  const queryClient = useQueryClient();
  const {
    data: productData,
    isLoading: productLoading,
    isError: productError,
  } = useGetProductById(openUpdateFor);
  const [formData, setFormData] = useState({
    name: productData?.product.name || "",
    price: productData?.product.price || "",
    stock: productData?.product.stock || "",
    category: productData?.product.category || "",
    isDeleted: productData?.product.isDeleted || false,
  });
  const { mutate: updateProduct } = useUpdateProduct();

  useEffect(() => {
    if (productData) {
      setFormData({
        name: productData.product.name || "",
        price: productData.product.price || "",
        stock: productData.product.stock || "",
        category: productData.product.category || "",
        isDeleted: productData.product.isDeleted || false,
      });
    }
  }, [productData]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error loading products.</div>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdateProduct = (e) => {
    e.preventDefault();
    updateProduct(
      { productId: openUpdateFor, ...formData },
      {
        onSuccess: (data) => {
          setOpenUpdateFor(null);
          queryClient.invalidateQueries(["products"]);
        },
      },
    );
  };

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
                      <Pencil
                        onClick={() =>
                          setOpenUpdateFor(
                            openUpdateFor === product._id ? null : product._id,
                          )
                        }
                        className="h-5 w-5 text-orange-600 cursor-pointer hover:text-orange-800"
                      />
                      {openUpdateFor === product._id && (
                        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-10">
                          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                            <div className="flex justify-between items-center mb-4">
                              <h2 className="text-xl font-bold mb-4">
                                Update Product
                              </h2>
                              <X
                                onClick={() => setOpenUpdateFor(false)}
                                className="h-6 w-6 text-gray-600 cursor-pointer hover:text-gray-800 mb-4"
                              />
                            </div>
                            <form className="grid gap-4">
                              <div>
                                <label className="block mb-1 font-medium">
                                  Name
                                </label>
                                <input
                                  type="text"
                                  className="w-full border border-gray-300 p-2 rounded"
                                  placeholder="Product Name"
                                  name="name"
                                  value={formData.name}
                                  onChange={handleChange}
                                />
                              </div>
                              <div>
                                <label className="block mb-1 font-medium">
                                  Price
                                </label>
                                <input
                                  type="number"
                                  className="w-full border border-gray-300 p-2 rounded"
                                  placeholder="Product Price"
                                  name="price"
                                  value={formData.price}
                                  onChange={handleChange}
                                />
                              </div>
                              <div>
                                <label className="block mb-1 font-medium">
                                  Stock
                                </label>
                                <input
                                  type="number"
                                  className="w-full border border-gray-300 p-2 rounded"
                                  placeholder="Product Stock"
                                  name="stock"
                                  value={formData.stock}
                                  onChange={handleChange}
                                />
                              </div>
                              <div>
                                <label className="block mb-1 font-medium">
                                  Category
                                </label>
                                <input
                                  type="text"
                                  className="w-full border border-gray-300 p-2 rounded"
                                  placeholder="Product Category"
                                  name="category"
                                  value={formData.category}
                                  onChange={handleChange}
                                />
                              </div>
                              <div>
                                <label className="block mb-1 font-medium">
                                  Status
                                </label>
                                <select
                                  className="w-full border border-gray-300 p-2 rounded"
                                  name="isDeleted"
                                  onChange={handleChange}
                                  value={formData.isDeleted}
                                >
                                  <option value={false}>Active</option>
                                  <option value={true}>Deleted</option>
                                </select>
                                {/* <select
                                  className="w-full border border-gray-300 p-2 rounded"
                                  name="isDeleted"
                                  value={formData.isDeleted}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      isDeleted: e.target.value === "true",
                                    })
                                  }
                                >
                                  <option value="false">Active</option>
                                  <option value="true">Deleted</option>
                                </select> */}
                              </div>
                              <Button
                                type="submit"
                                className="mt-4 w-full"
                                onClick={handleUpdateProduct}
                              >
                                Update Product
                              </Button>
                            </form>
                          </div>
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
