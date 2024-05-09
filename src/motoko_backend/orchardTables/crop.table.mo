module {
    public type Crop = {
        cropId : Text;
        crop_name : Text;
        crop_age : Nat;
        acreage : Nat;
        trees_0_to_3 : Nat;
        trees_4_to_7 : Nat;
        trees_7_plus : Nat;
        farm_plot_no : Nat;
        variety : Text;
        user_id : Text;
    };

    public type CropPayload = {
         crop_name : Text;
        crop_age : Nat;
        acreage : Nat;
        trees_0_to_3 : Nat;
        trees_4_to_7 : Nat;
        trees_7_plus : Nat;
        farm_plot_no : Nat;
        variety : Text;
        user_id : Text;
    };

};
