const Cart = require("./Cart");
const Category = require("./Category");
const Product = require("./Product");
const ProductImg = require("./ProductImg");
const Purchase = require("./Purchase");
const User = require("./User");


//products -> categoryId
Product.belongsTo(Category)
Category.hasMany(Product)

//Cart -> user
Cart.belongsTo(User)
User.hasMany(Cart)

//Product ->Cart
Cart.belongsTo(Product)
Product.hasMany(Cart)

//Purchase -> userId
Purchase.belongsTo(User)
User.hasMany(Purchase)

Purchase.belongsTo(Product)
Product.hasMany(Purchase)

//productImg -; productId
ProductImg.belongsTo(Product)
Product.hasMany(ProductImg)