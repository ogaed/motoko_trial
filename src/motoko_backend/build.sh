CANISTER_ID=$(dfx canister id motoko_backend)

sed -i "s/CANISTER_ID_PLACEHOLDER/$CANISTER_ID/g" src/motoko_backend/main.mo

dfx deploy