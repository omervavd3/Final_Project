const ProductModel = require("../models/productModel");

exports.addProduct = async(req,res) => {
    try {
        const { title,description,price,amount,img } = req.body;
        const findProduct = await ProductModel.findOne({title:title});
        if(findProduct) {
          res.status(200).send({ isExits: true, isCreated: false });
        } else {
          if(img) {
            const productDB = await ProductModel.create({ title:title,description:description,price:price,amount:amount,img:img});
          } else {
            const productDB = await ProductModel.create({ title:title,description:description,price:price,amount:amount});
          }          
          res.status(201).send({ isExits: false, isCreated: true });
        }
      } catch (error) {
          console.error(error);
          res.status(500).send({ error: error.messeage });
      }
}

exports.getProducts = async(req,res) => {
    try {
        const allProducts = await ProductModel.find({})
        res.status(200).send({allProducts})
      } catch (error) {
          console.error(error);
          res.status(500).send({ error: error.messeage });
      }
}

exports.deleteProduct = async(req,res) => {
    try {
        const { _id } = req.body;
        await ProductModel.deleteOne({_id})
        res.status(200).send({isDeleted:true})
      } catch (error) {
          console.error(error);
          res.status(500).send({ error: error.messeage });
      }
}

exports.updateProduct = async(req,res) => {
  try {
    const {title,description,price,amount,img,_id} = req.body;
    await ProductModel.findOneAndUpdate({_id}, {title,description,price,amount,img});
    res.status(200).send({isUptadet:true})
  } catch (error) {
      console.error(error);
      res.status(500).send({ error: error.messeage });
  }
}

exports.getProductById = async(req,res) => {
  try {
    const {productId} = req.body;
    const product = await ProductModel.findOne({_id:productId});
    res.status(200).send({isFound:true, product: product})
  } catch (error) {
      console.error(error);
      res.status(500).send({ error: error.messeage });
  }
}

exports.addProductToCart = async(req,res) => {
  try {
    const {productId} = req.body;
    const product = await ProductModel.findOne({_id:productId});
    const productDB = await ProductModel.findByIdAndUpdate({_id:productId}, {amount: product.amount-1});
    res.status(200).send({isFound:true, product: productDB})
  } catch (error) {
      console.error(error);
      res.status(500).send({ error: error.messeage });
  }
}

exports.removeProductFromCart = async(req,res) => {
  try {
    const {productId} = req.body;
    const product = await ProductModel.findOne({_id:productId});
    const productDB = await ProductModel.findByIdAndUpdate({_id:productId}, {amount: product.amount+1});
    res.status(200).send({isFound:true, product: productDB})
  } catch (error) {
      console.error(error);
      res.status(500).send({ error: error.messeage });
  }
}

exports.setProductCookie = async(req,res) => {
  try {
    const {productId} = req.body;
    const product = await ProductModel.findOne({_id:productId});
    if(product) {
      res.clearCookie('product');
      res.cookie('product', product, { maxAge: 900000, httpOnly: true });
      res.status(200).send({isFound:true, product: product})
    } else {
      res.status(200).send({isFound:false, product: undefined})
    }
  } catch (error) {
      console.error(error);
      res.status(500).send({ error: error.messeage });
  }
}

exports.getProductCookie = async(req,res) => {
  try {
    const product = req.cookies.product;
    if(product) {
      res.status(200).send({isFound:true, product: product})
    } else {
      res.status(200).send({isFound:false, product: undefined})
    }
  } catch (error) {
      console.error(error);
      res.status(500).send({ error: error.messeage });
  }
}
