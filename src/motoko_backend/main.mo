import Float "mo:base/Float";
import Hash "mo:base/Hash";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Text "mo:base/Text";
import TrieMap "mo:base/TrieMap";
import CropTypes "orchardTables/crop.table";
import UserTypes "orchardTables/user.table";
import ProductTypes "orchardTables/product.table";
import CartTypes "orchardTables/cart.table";
import IssueTypes "orchardTables/issues.table";

actor Orchard {
  public type Product = ProductTypes.Product;
  public type ProductPayload = ProductTypes.ProductPayload;
  public type Crop = CropTypes.Crop;
  public type CropPayload = CropTypes.CropPayload;
  public type Cart = CartTypes.Cart;
  public type CartPayload = CartTypes.CartPayload;
  public type Issue = IssueTypes.Issue;
  public type IssuePayload = IssueTypes.IssuePayload;
  type User = UserTypes.User;
  type UserPayload = UserTypes.UserPayload;

  // DATA STRUCTURE
  stable var cropsEntries : [(Text, Crop)] = [];
  var crops : TrieMap.TrieMap<Text, Crop> = TrieMap.TrieMap<Text, Crop>(Text.equal, Text.hash);

   stable var productsEntries : [(Text, Product)] = [];
  var products : TrieMap.TrieMap<Text, Product> = TrieMap.TrieMap<Text, Product>(Text.equal, Text.hash);

 stable var cartsEntries : [(Text, Cart)] = [];
  var carts : TrieMap.TrieMap<Text, Cart> = TrieMap.TrieMap<Text, Cart>(Text.equal, Text.hash);

stable var issuesEntries : [(Text, Issue)] = [];
  var issues : TrieMap.TrieMap<Text, Issue> = TrieMap.TrieMap<Text, Issue>(Text.equal, Text.hash);

  stable var usersEntries : [(Principal, User)] = [];
  var users : TrieMap.TrieMap<Principal, User> = TrieMap.TrieMap<Principal, User>(Principal.equal, Principal.hash);

  stable var cropidCount : Nat = 0;
  cropidCount := 0; 

  stable var productidCount : Nat = 0;
  productidCount := 0; 

  stable var cartidCount : Nat = 0;
  cartidCount := 0; 

  stable var issueidCount : Nat = 0;
  issueidCount := 0; 


public shared ({ caller }) func addUser(userPayload : UserPayload) : async Result.Result<(), Text> {
    
    switch (users.get(caller)) {
      case (null) {
        let userId : Principal = caller;
        let user : User = {
          userId = userId;
          email = userPayload.email;
          first_name = userPayload.first_name;
          last_name = userPayload.last_name;
          role = userPayload.role;
          location = userPayload.location;
          phone_number = userPayload.phone_number; 
          national_id = userPayload.national_id;
        };
        users.put(userId, user);
        return #ok();
      };
      case (?user) {
        return #err("User exists"); 
             };
    };
};


  public query func getUser(p : Principal) : async ?User {
    return users.get(p);
  };

  public shared ({ caller }) func updateUser(userPayload : UserPayload) : async Result.Result<(), Text> {
    switch (users.get(caller)) {
      case (?Null) {
        let updatedUser : User = {
          userId = caller;
          email = userPayload.email;
          first_name = userPayload.first_name;
          last_name = userPayload.last_name;
          role = userPayload.role;
          location = userPayload.location;
          phone_number = userPayload.phone_number; 
          national_id = userPayload.national_id;
        };
        users.put(caller, updatedUser);
        return #ok();
      };
      case (null) {
        return #err("The user doesnt exist");
      };
    };
  };

  public shared ({ caller }) func deleteUser() : async () {
    users.delete(caller);
  };

   public func addCrop(cropPayload : CropPayload) : async Result.Result<(), Text> {
 
    let cropId : Text = Nat.toText(cropidCount); 
    cropidCount += 1;
    let crop : Crop = {
      cropId = cropId;
      crop_name = cropPayload.crop_name;
      crop_age = cropPayload.crop_age;
      acreage = cropPayload.acreage;
      trees_0_to_3 = cropPayload.trees_0_to_3;
      trees_4_to_7 = cropPayload.trees_4_to_7;
      trees_7_plus = cropPayload.trees_7_plus;
      farm_plot_no = cropPayload.farm_plot_no;
      variety = cropPayload.variety;
      user_id = cropPayload.user_id;
    };
    crops.put(cropId, crop);
    return #ok();
  };


  public query func getCrop(cropId : Text) : async ?Crop {
    let cropResult : ?Crop = crops.get(cropId);
    return cropResult;
  };

  public query func getCrops() : async [(Text, Crop)] {
    Iter.toArray(crops.entries());
  };

  public func updateCropPayload(cropId : Text, cropPayload : CropPayload) : async Result.Result<(), Text> {
  
    let cropResult: ?Crop = crops.get(cropId);
  switch (cropResult) {
     case (?Null) {
      let updatedCrop: Crop = {
         cropId = cropId;
      crop_name = cropPayload.crop_name;
      crop_age = cropPayload.crop_age;
      acreage = cropPayload.acreage;
      trees_0_to_3 = cropPayload.trees_0_to_3;
      trees_4_to_7 = cropPayload.trees_4_to_7;
      trees_7_plus = cropPayload.trees_7_plus;
      farm_plot_no = cropPayload.farm_plot_no;
      variety = cropPayload.variety;
      user_id = cropPayload.user_id;
      };
      crops.put(cropId, updatedCrop);
      return #ok();
       };
   case (null) {
        return #err("The crop doesnt exist");
      };
    };
  };


public func updateCrop(crop: Crop) : async Result.Result<(), Text> {
  let cropResult: ?Crop = crops.get(crop.cropId);
  switch (cropResult) {
    case (?Null) {
      let updatedCrop: Crop = {
         cropId = crop.cropId;
      crop_name = crop.crop_name;
      crop_age = crop.crop_age;
      acreage = crop.acreage;
      trees_0_to_3 = crop.trees_0_to_3;
      trees_4_to_7 = crop.trees_4_to_7;
      trees_7_plus = crop.trees_7_plus;
      farm_plot_no = crop.farm_plot_no;
      variety = crop.variety;
      user_id = crop.user_id;
      };
      crops.put(crop.cropId, updatedCrop);
      return #ok();
    };
    case (null) {
        return #err("This crop doesnt exist");
      };
    };
  };

  public shared ({ caller }) func deleteCrop(cropId : Text) : async Result.Result<(), Text> {
    let cropResult : ?Crop = crops.get(cropId);
    switch (cropResult) {
      case (?Null) {
        crops.delete(cropId);
      };
      case (null) {
        return #err("Crop Doesnt exist");
      };
    };
    return #ok();
  };


   public func addProduct(productPayload : ProductPayload) : async Result.Result<(), Text> {
 
    let productId : Text = Nat.toText(productidCount); 
    productidCount += 1;
    let product : Product = {
      productId = productId;
      cropId = productPayload.cropId;
      pName = productPayload.pName;
      price = productPayload.price;
      quantity = productPayload.quantity;
      user_id = productPayload.user_id;
    };
    products.put(productId, product);
    return #ok();
  };


  public query func getProduct(productId : Text) : async ?Product {
    let productResult : ?Product = products.get(productId);
    return productResult;
  };

  public query func getProducts() : async [(Text, Product)] {
    Iter.toArray(products.entries());
  };

  public func updateProductPayload(productId : Text, productPayload : ProductPayload) : async Result.Result<(), Text> {
  
    let productResult: ?Product = products.get(productId);
  switch (productResult) {
     case (?Null) {
      let updatedProduct: Product = {
        productId = productId;
        cropId = productPayload.cropId;
        pName = productPayload.pName;
        price = productPayload.price;
        quantity = productPayload.quantity;
        user_id = productPayload.user_id;
      };
      products.put(productId, updatedProduct);
      return #ok();
       };
   case (null) {
        return #err("the product doest exist");
      };
    };
  };


public func updateProduct(product: Product) : async Result.Result<(), Text> {
  let productResult: ?Product = products.get(product.productId);
  switch (productResult) {
    case (?Null) {
      let updatedProduct: Product = {
        productId = product.productId;
        cropId = product.cropId;
        pName = product.pName;
        price = product.price;
        quantity = product.quantity;
        user_id = product.user_id;
      };
      products.put(product.productId, updatedProduct);
      return #ok();
    };
    case (null) {
        return #err("the product doest exist");
      };
    };
  };

  public shared ({ caller }) func deleteProduct(productId : Text) : async Result.Result<(), Text> {
    let productResult : ?Product = products.get(productId);
    switch (productResult) {
      case (?Null) {
        products.delete(productId);
      };
      case (null) {
        return #err("The product doesnt exist");
      };
    };
    return #ok();
  };


public func addCart(cartPayload : CartPayload) : async Result.Result<(), Text> {
 
  let cartId : Text = Nat.toText(cartidCount); 
  cartidCount += 1;
  let cart : Cart = {
    cartId = cartId;
    quantity = cartPayload.quantity;
    unitprice = cartPayload.unitprice;
    total = cartPayload.total;
    status = cartPayload.status;
    user_id = cartPayload.user_id;
    product_id = cartPayload.product_id;
  };
  carts.put(cartId, cart);
  return #ok();
};


public query func getCart(cartId : Text) : async ?Cart {
  let cartResult : ?Cart = carts.get(cartId);
  return cartResult;
};

public query func getCarts() : async [(Text, Cart)] {
  Iter.toArray(carts.entries());
};

public func updateCartPayload(cartId : Text, cartPayload : CartPayload) : async Result.Result<(), Text> {

  let cartResult: ?Cart = carts.get(cartId);
switch (cartResult) {
   case (?Null) {
    let updatedCart: Cart = {
      cartId = cartId;
      quantity = cartPayload.quantity;
      unitprice = cartPayload.unitprice;
      total = cartPayload.total;
      status = cartPayload.status;
      user_id = cartPayload.user_id;
      product_id = cartPayload.product_id;
    };
    carts.put(cartId, updatedCart);
    return #ok();
     };
 case (null) {
      return #err("Cart item doesnt exist");
    };
  };
};


public func updateCart(cart: Cart) : async Result.Result<(), Text> {
let cartResult: ?Cart = carts.get(cart.cartId);
switch (cartResult) {
  case (?Null) {
    let updatedCart: Cart = {
      cartId = cart.cartId;
    quantity = cart.quantity;
    unitprice = cart.unitprice;
    total = cart.total;
    status = cart.status;
    user_id = cart.user_id;
    product_id = cart.product_id;
    };
    carts.put(cart.cartId, updatedCart);
    return #ok();
  };
  case (null) {
      return #err("The cart item doesnt exist");
    };
  };
};

public shared ({ caller }) func deleteCart(cartId : Text) : async Result.Result<(), Text> {
  let cartResult : ?Cart = carts.get(cartId);
  switch (cartResult) {
    case (?Null) {
      carts.delete(cartId);
    };
    case (null) {
      return #err("Cart item doesnt exist");
    };
  };
  return #ok();
};


public func addIssue(issuePayload : IssuePayload) : async Result.Result<(), Text> {
 
  let issueId : Text = Nat.toText(issueidCount); 
  issueidCount += 1;
  let issue : Issue = {
    issueId = issueId;
    issue_type = issuePayload.issue_type;
    description = issuePayload.description;
    crop_id = issuePayload.crop_id;
    status = issuePayload.status;
    user_id = issuePayload.user_id;
    farm_specialist_id = issuePayload.farm_specialist_id;
  };
  issues.put(issueId, issue);
  return #ok();
};


public query func getIssue(issueId : Text) : async ?Issue {
  let issueResult : ?Issue = issues.get(issueId);
  return issueResult;
};

public query func getIssues() : async [(Text, Issue)] {
  Iter.toArray(issues.entries());
};

public func updateIssuePayload(issueId : Text, issuePayload : IssuePayload) : async Result.Result<(), Text> {

  let issueResult: ?Issue = issues.get(issueId);
switch (issueResult) {
   case (?Null) {
    let updatedIssue: Issue = {
      issueId = issueId;
    issue_type = issuePayload.issue_type;
    description = issuePayload.description;
    crop_id = issuePayload.crop_id;
    status = issuePayload.status;
    user_id = issuePayload.user_id;
    farm_specialist_id = issuePayload.farm_specialist_id;
    };
    issues.put(issueId, updatedIssue);
    return #ok();
     };
 case (null) {
      return #err("The issues you are updating doesnt exist");
    };
  };
};


public func updateIssue(issue: Issue) : async Result.Result<(), Text> {
let issueResult: ?Issue = issues.get(issue.issueId);
switch (issueResult) {
  case (?Null) {
    let updatedIssue: Issue = {
      issueId = issue.issueId;
    issue_type = issue.issue_type;
    description = issue.description;
    crop_id = issue.crop_id;
    status = issue.status;
    user_id = issue.user_id;
    farm_specialist_id = issue.farm_specialist_id;
    };
    issues.put(issue.issueId, updatedIssue);
    return #ok();
  };
  case (null) {
      return #err("The issue doesnt exist");
    };
  };
};

public shared ({ caller }) func deleteIssue(issueId : Text) : async Result.Result<(), Text> {
  let issueResult : ?Issue = issues.get(issueId);
  switch (issueResult) {
    case (?Null) {
      issues.delete(issueId);
    };
    case (null) {
      return #err("The issue doesnt exist");
    };
  };
  return #ok();
};
}