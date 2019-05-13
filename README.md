# crypto-cache

**You want that in :money_with_wings:cache?**

##  quick start
### setup
    HDR='Content-type: application/json'
    CFG='{"rpcPort": 20001, "rpcUser":"bitpaytest","rpcPass":"local321","currency": "BTC", "host":"localhost", "protocol":"http"}'
    MSG="{\"jsonrpc\": \"2.0\", \"method\": \"addNode\", \"id\": 1 , \"node\": "$CFG"}"
    curl -H "$HDR" -d "$MSG" http://localhost:5000/btc

### query

    MSG='{"jsonrpc": "2.0", "method": "getBalance", "id": 1, "currency": "BTC"}'
    curl -H "$HDR" -d "$MSG" http://localhost:5000/btc



