module {
    public type Cart = {
        cartId : Text;
        quantity : Nat;
        unitprice : Float;
        total : Float;
        status : Text;
        product_id : Text;
        user_id : Text;
    };


  public type CartPayload = {
        quantity : Nat;
        unitprice : Float;
        total : Float;
        status : Text;
        product_id : Text;
        user_id : Text;
    };
};


  



