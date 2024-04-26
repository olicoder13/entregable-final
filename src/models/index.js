const Cart = require("./Cart");
const Category = require("./Category");
const Product = require("./Product");
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