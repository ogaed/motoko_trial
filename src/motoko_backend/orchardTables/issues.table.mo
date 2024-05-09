module {
    public type Issue = {
        issueId : Text;
        description : Text;
        issue_type : Text;
        status : Text;
        crop_id : Nat;
        user_id : Text;
        farm_specialist_id : Text;
    };


  public type IssuePayload = {
       description : Text;
        issue_type : Text;
        status : Text;
        crop_id : Nat;
        user_id : Text;
        farm_specialist_id : Text;
    };
};


  



