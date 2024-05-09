module {
    public type Crop = {
        cropId : Text;
        crop_name : Text;
        crop_age : Text;
        acreage : Text;
        trees_0_to_3 : Text;
        trees_4_to_7 : Text;
        trees_7_plus : Text;
        farm_plot_no : Text;
        variety : Text;
        user_id : Text;
    };

    public type CropPayload = {
         crop_name : Text;
        crop_age : Text;
        acreage : Text;
        trees_0_to_3 : Text;
        trees_4_to_7 : Text;
        trees_7_plus : Text;
        farm_plot_no : Text;
        variety : Text;
        user_id : Text;
    };

};
