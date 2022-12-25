## 📝 Table of Contents

- [About](#about)
- [API Endpoint](#endpoint)
- [Get started](#get-started)
  - [Installation](#Install)
  - [Running](#running)
- [Technology](#tech)
- [Contributors](#Contributors)
- [License](#license)

## 📙 About <a name = "about"></a>

- A Product warehouse api.

## 🔚 API Endpoints <a name = "endpoint"></a>

### Customers

- ```GET /customer/:customerId ```
- ```GET /customer ```
- ```POST /customer ```
- ```DELETE /customer/:customerId ```
- ```PUT /customer/:customerId ```
### Products

- ```GET /product/:productId ```
- ```GET /product ```
- ```POST /product ```
- ```DELETE /product/:productId ```
- ```PUT /product/:productId ```
### Products

- ```GET /warehouse/:warehouseId ```
- ```GET /warehouse ```
- ```POST /warehouse ```
- ```DELETE /warehouse/:warehouseId ```
- ```PUT /warehouse/:warehouseId ```

## 🏁 Getting Started <a name = "get-started"></a>

> This is an list of needed instructions to set up your project locally, to get a local copy up and running follow these
> instructuins.

### Installation <a name = "Install"></a>

1. **_Clone the repository_**

```sh
$ git clone https://github.com/ZeyadTarekk/Products-Warehouse.git
```

2. **_Navigate to repository directory_**

```sh
$ cd Products-Warehouse
```

3. **_Install dependencies_**

```sh
npm install
```

### Running <a name = "running"></a>

1. **_Running migrations up_**

```sh
npm run migrateup
```

2. **_Running on development mode_**

```sh
npm run dev
```
1. **_Running migrations down_**

```sh
npm run migratedown
```


## 💻 Built Using <a name = "tech"></a>

- **Node.js**
- **Express.js**
- **Multer**
- **db-migrate**


## Contributors <a name = "Contributors"></a>

<table>
  <tr>
    <td align="center">
    <a href="https://github.com/ZeyadTarekk" target="_black">
    <img src="https://avatars.githubusercontent.com/u/76125650?v=4" width="150px;" alt="Zeyad Tarek"/>
    <br />
    <sub><b>Zeyad Tarek</b></sub></a>

  </td>
  </tr>
 </table>

## License <a name = "license"></a>

> This software is licensed under MIT License, See [License](https://github.com/ZeyadTarekk/Products-Warehouse/blob/main/LICENSE) for more information ©ZeyadTarekk.