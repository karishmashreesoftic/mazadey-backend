const Member = require("./models/Member");
const Token = require("./models/Token");
// const Qid = require("./models/Qid");
// const Bid = require("./models/Bid");
// const Product = require("./models/Product");
// const Documents = require("./models/Documents");
// const Photos = require("./models/Photos");
// const Wishlist = require("./models/Wishlist");
// const ContactUs = require("./models/ContactUs");


Member.hasMany(Token, {foreignKey: "member", as: "tokens"})
Token.belongsTo(Member)

// Member.hasMany(Product, {foreignKey: "createdby", as: "creator"})
// Product.belongsTo(Member)

// Member.hasMany(ContactUs, {foreignKey: "sendby", as: "sender"})
// ContactUs.belongsTo(Member)

// Member.hasOne(Qid, {foreignKey: "member"})
// Qid.belongsTo(Member)

// Wishlist.belongsTo(Member)
// Wishlist.belongsTo(Product)
// Member.belongsToMany(Product, {through: Wishlist, foreignKey: 'MemberID', as: 'wishlist'})
// Product.belongsToMany(Member, {through: Wishlist, foreignKey: 'ProductId', as: 'wishlistees'})

// Bid.belongsTo(Member, {foreignKey: 'placedby', as: 'bidplacedby'})
// Bid.belongsTo(Product, {foreignKey: 'auction', as: 'bids'})
// Member.belongsToMany(Product, {through: Bid, foreignKey: 'placedby', as: 'bidplacedby'})
// Product.belongsToMany(Member, {through: Bid, foreignKey: 'auction', as: 'bids'})

// Member.hasMany(Bid, {foreignKey: "placedby", as: "bidplacedby"})
// Bid.belongsTo(Member, {foreignKey: "placedby", as: "bidplacedby"})
// Product.hasMany(Bid, {foreignKey: "auction", as: "bids"})
// Bid.belongsTo(Product, {foreignKey: "auction", as: "bids"})

// Product.hasMany(Photos, {foreignKey: "product", as: "photos"})
// Photos.belongsTo(Product)
// Product.hasMany(Documents, {foreignKey: "product", as: "documents"})
// Documents.belongsTo(Product)

// Product.belongsTo(Member)
// Member.hasMany(Product, {foreignKey: "winner", as: "winners"})

