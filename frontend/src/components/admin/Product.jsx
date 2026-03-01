import React, { useEffect, useState } from "react";
import { TabsContent } from "../ui/tabs";
import { Card, CardContent } from "../ui/card";
import {
  useAddProduct,
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
import toast from "react-hot-toast";

const Product = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useGetProducts(page);
  const [openUpdateFor, setOpenUpdateFor] = useState(null);
  const [isAddMode, setIsAddMode] = useState(false);
  const [addData, setAddData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    images: [],
  });
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

  const { mutate: addProduct } = useAddProduct();

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

  const handleAddChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setAddData((prevData) => ({
        ...prevData,
        [name]: [...(prevData[name] || []), ...Array.from(files)],
      }));
    } else {
      setAddData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleUpdateProduct = (e) => {
    e.preventDefault();
    updateProduct(
      { productId: openUpdateFor, ...formData },
      {
        onSuccess: (data) => {
          setOpenUpdateFor(null);
          toast.success("Product updated successfully");
          queryClient.invalidateQueries(["products"]);
        },
      },
    );
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    addProduct(addData, {
      onSuccess: (data) => {
        toast.success("Product added successfully");
        setIsAddMode(false);
        setAddData({
          name: "",
          description: "",
          price: "",
          category: "",
          stock: "",
          images: [],
        });
        queryClient.invalidateQueries(["products"]);
      },
    });
  };

  return (
    <div>
      <TabsContent value="products">
        <Card>
          <CardContent className="grid gap-6">
            <div className="flex justify-end">
              <button
                onClick={() => setIsAddMode(true)}
                className="border-2 px-6 w-60 py-2 rounded-2xl font-bold"
              >
                Add product <span className="text-xl">+</span>
              </button>
            </div>
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
                    <TableCell className="text-sm">
                      #{product._id.slice(-6)}
                    </TableCell>
                    <TableCell className="text-sm">{product.name}</TableCell>
                    <TableCell className="text-sm">{product.price}</TableCell>
                    <TableCell className="text-sm">{product.stock}</TableCell>
                    <TableCell className="text-sm">
                      {product.isDeleted ? "Deleted" : "Active"}
                    </TableCell>
                    <TableCell className="text-sm">
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
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                          <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl p-6">
                            <div className="flex justify-between items-center mb-4">
                              <h2 className="text-lg sm:text-xl font-bold text-amber-900">
                                Update Product
                              </h2>
                              <X
                                onClick={() => setOpenUpdateFor(false)}
                                className="h-6 w-6 text-gray-600 cursor-pointer hover:text-gray-800"
                              />
                            </div>

                            <form className="grid gap-4">
                              <div>
                                <label className="block mb-1 font-medium text-gray-700">
                                  Name
                                </label>
                                <input
                                  type="text"
                                  className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-amber-900 outline-none"
                                  name="name"
                                  value={formData.name}
                                  onChange={handleChange}
                                />
                              </div>

                              <div>
                                <label className="block mb-1 font-medium text-gray-700">
                                  Price
                                </label>
                                <input
                                  type="number"
                                  className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-amber-900 outline-none"
                                  name="price"
                                  value={formData.price}
                                  onChange={handleChange}
                                />
                              </div>

                              <div>
                                <label className="block mb-1 font-medium text-gray-700">
                                  Stock
                                </label>
                                <input
                                  type="number"
                                  className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-amber-900 outline-none"
                                  name="stock"
                                  value={formData.stock}
                                  onChange={handleChange}
                                />
                              </div>

                              <div>
                                <label className="block mb-1 font-medium text-gray-700">
                                  Category
                                </label>
                                <input
                                  type="text"
                                  className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-amber-900 outline-none"
                                  name="category"
                                  value={formData.category}
                                  onChange={handleChange}
                                />
                              </div>

                              <div>
                                <label className="block mb-1 font-medium text-gray-700">
                                  Status
                                </label>
                                <select
                                  className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-amber-900 outline-none"
                                  name="isDeleted"
                                  onChange={handleChange}
                                  value={formData.isDeleted}
                                >
                                  <option value={false}>Active</option>
                                  <option value={true}>Deleted</option>
                                </select>
                              </div>

                              <Button
                                type="submit"
                                className="mt-4 w-full bg-amber-950 hover:bg-amber-800 rounded-lg"
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

            {isAddMode && (
              <div className="fixed inset-0 flex items-center justify-center z-50 overflow-y-auto p-4">
                <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-amber-900">
                      Add Product
                    </h2>
                    <X
                      onClick={() => setIsAddMode(false)}
                      className="h-6 w-6 text-gray-600 cursor-pointer hover:text-gray-800"
                    />
                  </div>

                  <form className="grid gap-4">
                    <div>
                      <label className="block mb-1 font-medium text-gray-700">
                        Name
                      </label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 p-2 rounded"
                        placeholder="Product Name"
                        name="name"
                        value={addData.name}
                        onChange={handleAddChange}
                      />
                    </div>
                    <div>
                      <label className="block mb-1 font-medium text-gray-700">
                        Description
                      </label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 p-2 rounded"
                        placeholder="Product Description"
                        name="description"
                        value={addData.description}
                        onChange={handleAddChange}
                      />
                    </div>
                    <div>
                      <label className="block mb-1 font-medium text-gray-700">
                        Price
                      </label>
                      <input
                        type="number"
                        className="w-full border border-gray-300 p-2 rounded"
                        placeholder="Product Price"
                        name="price"
                        value={addData.price}
                        onChange={handleAddChange}
                      />
                    </div>
                    <div>
                      <label className="block mb-1 font-medium text-gray-700">
                        Category
                      </label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 p-2 rounded"
                        placeholder="Product Category"
                        name="category"
                        value={addData.category}
                        onChange={handleAddChange}
                      />
                    </div>
                    <div>
                      <label className="block mb-1 font-medium text-gray-700">
                        Stock
                      </label>
                      <input
                        type="number"
                        className="w-full border border-gray-300 p-2 rounded"
                        placeholder="Product Stock"
                        name="stock"
                        value={addData.stock}
                        onChange={handleAddChange}
                      />
                    </div>
                    <div>
                      <label className="block mb-1 font-medium text-gray-700">
                        Images
                      </label>
                      <input
                        type="file"
                        className="w-full border border-gray-300 p-2 rounded"
                        name="images"
                        multiple
                        onChange={handleAddChange}
                      />
                      <div className="mt-2">
                        {addData.images.map((image, index) => (
                          <p key={index}>{image.name}</p>
                        ))}
                      </div>
                    </div>
                    <Button
                      type="submit"
                      className="mt-4 w-full bg-amber-950 hover:bg-amber-800"
                      onClick={handleAddProduct}
                    >
                      Add Product
                    </Button>
                  </form>
                </div>
              </div>
            )}
          </CardContent>
          <div className="flex gap-3 m-2 justify-end">
            <Button
              className="bg-amber-950 hover:bg-amber-800"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              prev
            </Button>
            <Button
              className="bg-amber-950 hover:bg-amber-800"
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
