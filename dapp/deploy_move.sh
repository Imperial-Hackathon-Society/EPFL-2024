sui client new-env --alias testnet --rpc https://fullnode.testnet.sui.io:443
sui client switch --env testnet
sui client switch --address 0xc9bc79efda34627d2f0f0062463bdc3660ec732b09d621ec0c6ddc9e010df30d
curl --location --request POST 'https://faucet.testnet.sui.io/gas' \
--header 'Content-Type: application/json' \
--data-raw '{
    "FixedAmountRequest": {
        "recipient": "0xc9bc79efda34627d2f0f0062463bdc3660ec732b09d621ec0c6ddc9e010df30d"
    }
}'
cd move
sui client publish --gas-budget 100000000 healthdata
