import { Request, Response } from "express";
import Product from "../models/Product";
import path from "path";
import fs from "fs-extra";

// create new product
export async function createProduct(
  req: Request,
  res: Response
): Promise<Response> {
  const { name, code, description } = req.body;
  console.log(req.file.path);

  const newProduct = {
    name: name,
    code: code,
    description: description,
    imagePath: req.file.path,
  };

  try {
    const product = new Product(newProduct);
    await product.save();

    return res.status(200).json({
      code: 200,
      message: "Product Saved Successfully",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: "Server Error",
      data: null,
    });
  }
}

// Get product list
export async function productList(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const product = await Product.find();
    return res.status(200).json({
      code: 200,
      message: "Success",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: "Server Error",
      data: null,
    });
  }
}

//Get product by ID
export async function getProductById(
  req: Request,
  res: Response
): Promise<Response> {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    return res.status(200).json({
      code: 200,
      message: "Success",
      data: product,
    });
  } catch (error) {
    return res.status(404).json({
      code: 404,
      message: "Product Not Found",
      data: null,
    });
  }
}

//   Delete product by Id
export async function deleteProduct(
  req: Request,
  res: Response
): Promise<Response> {
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndRemove(id);
    //   if(product){
    //       await fs.unlink(path.resolve(product.imagePath));
    //   }
    return res.status(200).json({
      code: 200,
      message: "Successfully Deleted",
    });
  } catch (error) {
    return res.status(404).json({
      code: 404,
      message: "Product Not Found",
      data: null,
    });
  }
}

// Update Product by Id
export async function updateProduct(
  req: Request,
  res: Response
): Promise<Response> {
  const { id } = req.params;
  const { name, code, description } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        code,
        description,
      },
      { new: true }
    );

    return res.status(200).json({
      code: 200,
      message: "Product Updated Successfully",
      data: updatedProduct,
    });
  } catch (error) {
    return res.status(404).json({
      code: 404,
      message: "Product Not Found",
      data: null,
    });
  }
}
