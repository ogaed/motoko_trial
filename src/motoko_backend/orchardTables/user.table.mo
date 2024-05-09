module {
    public type User = {
        userId : Principal;
        email : Text;
        first_name : Text;
        last_name : Text;
        role : Nat;
        location : Text;
        national_id : Text;
        phone_number : Text;
    };

    public type UserPayload = {
        email : Text;
        first_name : Text;
        last_name : Text;
        role : Nat;
        location : Text;
        national_id : Text;
        phone_number : Text;
    };
};