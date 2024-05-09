import Text "mo:base/Text";
module {
    public type Cart = {
        cartId : Text;
        quantity : Text;
        unitprice : Text;
        total : Text;
        status : Text;
        product_id : Text;
        user_id : Text;
    };


  public type CartPayload = {
        quantity : Text;
        unitprice : Text;
        total : Text;
        status : Text;
        product_id : Text;
        user_id : Text;
    };
};


  



