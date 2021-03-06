define({ "api": [
  {
    "type": "get",
    "url": "/api/users",
    "title": "Get all users",
    "name": "GetUsers",
    "group": "user",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object[]",
            "optional": false,
            "field": "users",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/users/users.controller.ts",
    "groupTitle": "user"
  },
  {
    "type": "get",
    "url": "/api/users/:id",
    "title": "Get user",
    "name": "GetUsers",
    "group": "user",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object[]",
            "optional": false,
            "field": "users",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/users/users.controller.ts",
    "groupTitle": "user"
  },
  {
    "type": "post",
    "url": "/api/users",
    "title": "create user",
    "name": "createUser",
    "group": "user",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "object",
            "optional": false,
            "field": "-",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "-.name",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "-",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "-.id",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/users/users.controller.ts",
    "groupTitle": "user"
  },
  {
    "type": "delete",
    "url": "/api/users/:id",
    "title": "remove user",
    "name": "removeUser",
    "group": "user",
    "parameter": {
      "fields": {
        "query string": [
          {
            "group": "query string",
            "type": "number",
            "optional": false,
            "field": "id",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/users/users.controller.ts",
    "groupTitle": "user"
  },
  {
    "type": "get",
    "url": "/api/wallets",
    "title": "Get all wallets",
    "name": "GetWallets",
    "group": "wallets",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object[]",
            "optional": false,
            "field": "wallet",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/wallet/wallet.controller.ts",
    "groupTitle": "wallets"
  },
  {
    "type": "get",
    "url": "/api/wallets/:id",
    "title": "Get wallets of user",
    "name": "GetWallets",
    "group": "wallets",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object[]",
            "optional": false,
            "field": "wallet",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/wallet/wallet.controller.ts",
    "groupTitle": "wallets"
  },
  {
    "type": "post",
    "url": "/api/wallets/currencyes",
    "title": "create currency",
    "name": "createCurrency",
    "group": "wallets",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "object",
            "optional": false,
            "field": "-",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "-.name",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "-",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "-.id",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/wallet/wallet.controller.ts",
    "groupTitle": "wallets"
  },
  {
    "type": "post",
    "url": "/api/wallets",
    "title": "create wallet",
    "name": "createWallet",
    "group": "wallets",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "object",
            "optional": false,
            "field": "-",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "-.currencyId",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "-.userId",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "-",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "-.id",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/wallet/wallet.controller.ts",
    "groupTitle": "wallets"
  },
  {
    "type": "get",
    "url": "/api/wallets/currencyes",
    "title": "get all currencyes",
    "name": "getCurrency",
    "group": "wallets",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object[]",
            "optional": false,
            "field": "currency",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/wallet/wallet.controller.ts",
    "groupTitle": "wallets"
  },
  {
    "type": "post",
    "url": "/api/wallets/transfer",
    "title": "transfer",
    "name": "transferWallet",
    "group": "wallets",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "object",
            "optional": false,
            "field": "-",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "-.sum",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "-.walletToId",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "-.walletFromId",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "logWallet",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/wallet/wallet.controller.ts",
    "groupTitle": "wallets"
  }
] });
