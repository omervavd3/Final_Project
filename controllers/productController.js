const ProductModel = require("../models/productModel");

exports.addProduct = async(req,res) => {
    try {
        const { title,description,price,amount,img, category, sex, size } = req.body;
        const findProduct = await ProductModel.findOne({title:title});
        if(findProduct) {
          res.status(200).send({ isExits: true, isCreated: false });
        } else {
          if(img) {
            const productDB = await ProductModel.create({ title:title,description:description,price:price,amount:amount,img:img, category:category, sex:sex, size:size});
          } else {
            const productDB = await ProductModel.create({ title:title,description:description,price:price,amount:amount, category:category, sex:sex, size:size});
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
    const {title,description,price,amount,img,category,sex,size,_id} = req.body;
    await ProductModel.findOneAndUpdate({_id}, {title,description,price,amount,img,category,sex,size});
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

exports.getProductsByCategory = async(req,res) => {
  try {
    const {productsCategory,size,sex} = req.body;
    let filters = {};
    if (productsCategory && productsCategory !== 'all products') {
      filters.category = productsCategory;
    }
    if (size && size !== 'All Sizes') {
      filters.size = size;
    }
    if (sex && sex !== 'All Sex') {
      filters.sex = sex;
    }
    const products = await ProductModel.find(filters);
    res.status(200).send({isFound:true, products: products})
  } catch (error) {
      console.error(error);
      res.status(500).send({ error: error.messeage });
  }
}

exports.deleteByCategory = async(req,res) => {
  try {
    const {category} = req.body;
    await ProductModel.deleteMany({category:category});
    res.status(200).send({isDeleted:true})
  } catch (error) {
      console.error(error);
      res.status(500).send({ error: error.messeage });
  }
}

exports.getProductsIdByCategory = async(req,res) => {
  try {
    const {category} = req.body;
    const products = await ProductModel.find({category:category});
    const productsId = []
    products.forEach((product,index) => {
      productsId[index] = product._id
    })
    res.status(200).send({productsId:productsId})
  } catch (error) {
      console.error(error);
      res.status(500).send({ error: error.messeage });
  }
}

exports.viewProduct = async(req,res) => {
  try {
    const {productId} = req.params;
    const product = await ProductModel.findOne({_id:productId});
    res.status(200).send({product})
  } catch (error) {
      console.error(error);
      res.status(500).send({ error: error.messeage });
  }
}