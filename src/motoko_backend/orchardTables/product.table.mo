import Float "mo:base/Float";
import Text "mo:base/Text";
module {
    public type Product = {
        productId : Text;
        cropId : Text;
        pName : Text;
        price : Text;
        quantity : Text;
        user_id : Text;
    };


  public type ProductPayload = {
        cropId : Text;
        pName : Text;
        price : Text;
        quantity : Text;
        user_id : Text;
    };
};


  



