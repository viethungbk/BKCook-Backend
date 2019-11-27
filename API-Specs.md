# Thiết kế API

## 1. Recipe

**Path**: api/recipes

### 1.1. Add recipe basic infomation

- **Request**:

  - Method: POST
  - Path: /basic-info
  - Headers:

  | Field         | Type   | Require | Desciption                |
  | ------------- | ------ | ------- | ------------------------- |
  | Authorization | String | Require | Token xác thực người dùng |

  - Body: form-data

  | Field            | Type   | Require | Desciption                  |
  | ---------------- | ------ | ------- | --------------------------- |
  | title            | String | Require | Tên công thức               |
  | shortDescription | String | Require | Mô tả ngắn gọn về công thức |
  | linkVideo        | String |         | Link đến video về món ăn    |
  | time             | Number | Require | Thời lượng làm món ăn       |
  | image            | File   | Require | Ảnh của công thức           |
  | level            | Number | Require | Độ khó của công thức        |
  


- **Response**:

  | Field   | Type   | Require | Desciption                        |
  | ------- | ------ | ------- | --------------------------------- |
  | success | Boolen | Require | Request thành công hay thất bại   |
  | data    | Object |         | Đối tượng recipe vừa được tạo mới |
  
### 1.2. Add recipe's material

- **Request**:

  - Method: 
  - Path: 
  - Headers:

  | Field         | Type   | Require | Desciption                |
  | ------------- | ------ | ------- | ------------------------- |
  | Authorization | String | Require | Token xác thực người dùng |

  - Body:

  | Field     | Type          | Require | Desciption                     |
  | --------- | ------------- | ------- | ------------------------------ |
  | materials | Array[Object] | Require | Mảng các đối tượng nguyên liệu |

  Mảng các đối tượng nguyên liệu có các trường như sau:

  | Field        | Type   | Require | Desciption        |
  | ------------ | ------ | ------- | ----------------- |
  | name         | String |         | Tên nguyên liệu   |
  | unit         | String |         | Đơn vị đo         |
  | quantitative | Number |         | Lượng nguyên liệu |

  

- **Response**:

  | Field | Type | Require | Desciption |
  | ----- | ---- | ------- | ---------- |
  |       |      |         |            |



## 2. User

### 2.1. Sign up

- **Request**:

  - Method: 
  - Path: 
  - Params:

  | Field | Type | Require | Description |
  | ----- | ---- | ------- | ----------- |
  |       |      |         |             |

  - Headers:

  | Field | Type | Require | Desciption |
  | ----- | ---- | ------- | ---------- |
  |       |      |         |            |

  - Body:

  | Field | Type | Require | Desciption |
  | ----- | ---- | ------- | ---------- |
  |       |      |         |            |

- **Response**:

  | Field | Type | Require | Desciption |
  | ----- | ---- | ------- | ---------- |
  |       |      |         |            |
  
  
  




- **Request**:

  - Method: 
  - Path: 
  - Params:

  | Field | Type | Require | Description |
  | ----- | ---- | ------- | ----------- |
  |       |      |         |             |

  - Headers:

  | Field | Type | Require | Desciption |
  | ----- | ---- | ------- | ---------- |
  |       |      |         |            |

  - Body:

  | Field | Type | Require | Desciption |
  | ----- | ---- | ------- | ---------- |
  |       |      |         |            |

- **Response**:

  | Field | Type | Require | Desciption |
  | ----- | ---- | ------- | ---------- |
  |       |      |         |            |

