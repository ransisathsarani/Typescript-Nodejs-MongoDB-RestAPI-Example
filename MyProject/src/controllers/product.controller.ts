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

  const product = new Product(newProduct);
  await product.save();

  return res.json({
    code: 200,
    message: "Product Saved Successfully",
    data: product
  });
}


// Get product list
export async function productList(
  req: Request,
  res: Response
): Promise<Response> {
  const product = await Product.find();
  return res.json({
    code: 200,
    message: "Success",
    data: product
  });
}


//Get product by ID
export async function getProductById(
  req: Request,
  res: Response
): Promise<Response> {
  const { id } = req.params;
  const product = await Product.findById(id);
  return res.json({
    code: 200,
    message: "Success",
    data: product
  });
}


//   Delete product by Id
export async function deleteProduct(
  req: Request,
  res: Response
): Promise<Response> {
  const { id } = req.params;
  const product = await Product.findByIdAndRemove(id);
//   if(product){
//       await fs.unlink(path.resolve(product.imagePath));
//   }
  return res.json({
    code: 200,
    message: "Successfully Deleted"
  });
}


// Update Product by Id
export async function updateProduct(
    req: Request,
    res: Response
  ): Promise<Response> {
    const { id } = req.params;
    const { name, code, description } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(id, {
        name,
        code,
        description
    }, {new: true});
   
    return res.json({
      code: 200,
      message: "Product Updated Successfully",
      data: updatedProduct
    });
  }
