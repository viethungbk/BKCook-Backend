# Thiết kế API

## 1. Công thức

### 1.1. Tạo mới công thức

- **Request**:

  - Method: POST
  - Path: api/recipes
  - Params:

  | Field | Type | Require | Description |
  | ----- | ---- | ------- | ----------- |
  |       |      |         |             |

  - Headers:

  | Field | Type | Require | Desciption |
  | ----- | ---- | ------- | ---------- |
  |       |      |         |            |

  - Body: form-data

  | Field            | Type          | Require | Desciption                  |
  | ---------------- | ------------- | ------- | --------------------------- |
  | title            | String        | Require | Tên công thức               |
  | shortDescription | String        |         | Mô tả ngắn gọn về công thức |
  | linkVideo        | String        |         | Link đến video về món ăn    |
  | time             | Number        |         | Thời lượng làm món ăn       |
  | image            |               |         |                             |
  | otherMaterial    |               |         |                             |
  | tags             | Array[String] |         |                             |
  | typeRecipe       | Array[String] |         |                             |
  | countryCuisine   | String        |         |                             |
  | typeOfDish       | Array[String] |         |                             |
  | processingMethod | Array[String] |         |                             |
  | season           |               |         |                             |
  | purpose          | Array[String] |         |                             |
  | status           |               |         |                             |
  | nutrition        | Array[String] |         |                             |
  | calo             |               |         |                             |
  | level            | Number        |         |                             |
  | material         | Array[Object] |         |                             |
  | step             | Array[Object] |         |                             |
  
  Trường material là mảng các Object có mô tả như sau:
  
  | Type         | Field  | Require | Desciption             |
  | ------------ | ------ | ------- | ---------------------- |
  | name         | String |         | Tên nguyên liệu        |
  | unit         | String |         | Đơn vị tính: Kg, quả   |
  | quantitative | Number |         | Định lượng: 1, 2.3,... |
  
  Trường step là mảng các Object có mô tả như sau:
  
  | Type        | Field         | Require | Desciption                        |
  | ----------- | ------------- | ------- | --------------------------------- |
  | stepNumber  | Number        |         | Số thứ tự bước làm                |
  | description | String        |         | Mô tả cách làm trong bước này     |
  | images      | Array[String] |         | Các ảnh mô tả cho bước này        |
  | tricks      | String        |         | Các mẹo nhỏ để thực hiện bước này |
  | time        | Number        |         | Thời gian thực hiện bước này      |
  
  


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

