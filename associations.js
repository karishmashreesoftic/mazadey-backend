const Member = require("./models/Member");
const Token = require("./models/Token");
const Qid = require("./models/Qid");
const Bid = require("./models/Bid");
const Product = require("./models/Product");
const Documents = require("./models/Documents");
const Photos = require("./models/Photos");
const Wishlist = require("./models/Wishlist");


Member.hasMany(Token, {as: "tokens"})
Token.belongsTo(Member, {foreignKey: "member"})

Member.hasMany(Product, {as: "creator"})
Product.belongsTo(Member, {foreignKey: "createdby"})

Qid.belongsTo(Member, {foreignKey: "member"})

Wishlist.belongsTo(Member, {foreignKey: 'MemberID'})
Wishlist.belongsTo(Product, {foreignKey: 'ProductId'})
Member.belongsToMany(Product, {through: Wishlist, foreignKey: 'MemberID', as: 'wishlist'})
Product.belongsToMany(Member, {through: Wishlist, foreignKey: 'ProductId', as: 'wishlistees'})

Member.hasMany(Bid, {as: "mybids"})
Bid.belongsTo(Member, {foreignKey: "placedby"})
Product.hasMany(Bid, {as: "bids"})
Bid.belongsTo(Product, {foreignKey: "auction"})

Product.hasMany(Photos, {as: "photos"})
Photos.belongsTo(Product, {foreignKey: "product"})
Product.hasMany(Documents, {as: "documents"})
Documents.belongsTo(Product, {foreignKey: "product"})

Product.belongsTo(Member, {foreignKey: "winner"})
Member.hasMany(Product, {as: "winners"})

