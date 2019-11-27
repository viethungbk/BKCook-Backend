# Đặc tả cơ sở dữ liệu

## 1. Recipe
Công thức món ăn

| Tên trường       | Kiểu dữ liệu  | Required | Mô tả                                                        |
| ---------------- | ------------- | -------- | ------------------------------------------------------------ |
| _id              | String        | Require  | Id công thức                                                 |
| title            | String        |          | Tên công thức                                                |
| shortDescription | String        |          | Mô tả ngắn gọn về công thức                                  |
| linkVideo        | String        |          | Link đến video về món ăn                                     |
| time             | Number        |          | Thời lượng làm món ăn                                        |
| image            | String        |          | Ảnh của món ăn                                               |
| otherMaterial    | String        |          | Các chú thích về nguyên liệu khác để làm món ăn              |
| tags             | Array[String] |          | Mảng các tags để tìm kiếm món ăn                             |
| typeRecipe       | Array[String] |          | Loại công thức: Món khai vị, Món chính, Thức uống, Món nhậu, Món tráng miệng, Món ăn sáng, Bánh - Bánh ngọt, Món chay, Nhanh và dễ, Món ăn cho trẻ |
| countryCuisine   | String        |          | Ẩm thực của đất nước: Việt Nam, Hàn Quốc, Trung Quốc, Pháp, Úc, Nga, Nam Phi, Thái Lan, Nhật, Ấn Độ, Brazil, Mexico, Malaysia, Ý, Âu, Singapore, Mỹ, Indonesia, Philipines |
| typeOfDish       | Array[String] |          | Loại món: Salad, Lẩu, Nem - Chả, Bánh mặn, Nước ép, Chè, Snacks,... |
| processingMethod | Array[String] |          | Phương pháp chế biến món ăn: Nướng, Luộc, Xay, Nấu, Quay, Vắt, Nước chấm, Ăn sống, Rang, Ép, Ủ,... |
| season           | String        |          | Món ăn này thường sử dụng vào mùa nào: Mùa xuân, Mùa hạ, Mùa thu, Mùa đông |
| purpose          | Array[String] |          | Mục đích của món ăn: Ăn sáng, Giảm cân, Tiệc, Ăn gia đình, Tốt cho trẻ em, Tăng cân, Ăn trưa, Cho phái mạnh,... |
| ratingStar       | Number        |          | Số sao rate cho công thức                                    |
| status           | Number        |          | Trạng thái của công thức<br />0: Chưa duyệt<br />1: Đã duyệt |
| dateCreated      | Date          |          | Ngày tạo công thức                                           |
| nutrition        | Array[String] |          | Chất dinh dưỡng có trong món ăn: Gluxit, Protein, Vitamin và khoáng chất, Lipit |
| calo             | Number        |          | Năng lượng mà món ăn cung cấp                                |
| level            | Number        |          | Độ khó khi thực hiện món ăn:<br />0: Rất dễ<br />1: Dễ<br />2: Trung bình<br />3: Khó |

## 2. Steps

Các bước thực hiện cho món ăn

| Tên trường | Kiểu dữ liệu  | Required | Mô tả                                        |
| ---------- | ------------- | -------- | -------------------------------------------- |
| _id        | String        | Require  | Id của Steps                                 |
| idRecipe   | String        | Require  | Id của công thức nấu ăn                      |
| steps      | Array[Object] | Require  | Mảng các Object là các bước thực hiện món ăn |

Trường steps là mảng các object có mô tả như sau:

| Tên trường  | Kiểu dữ liệu  | Required | Mô tả                             |
| ----------- | ------------- | -------- | --------------------------------- |
| _id         | String        | Require  | Id của step                       |
| stepNumber  | Number        |          | Số thứ tự bước làm                |
| description | String        |          | Mô tả cách làm trong bước này     |
| images      | Array[String] |          | Các ảnh mô tả cho bước này        |
| tricks      | String        |          | Các mẹo nhỏ để thực hiện bước này |
| time        | Number        |          | Thời gian thực hiện bước này      |

## 3. Comment

Bình luận

| Tên trường | Kiểu dữ liệu  | Required | Mô tả                         |
| ---------- | ------------- | -------- | ----------------------------- |
| _id        | String        | Require  | Id của comments               |
| idRecipe   | String        | Require  | Id của công thức              |
| comments   | Array[Object] |          | Mảng các Object chứa comments |

Trường comments là mảng các Object có mô tả như sau:

| Tên trưởng  | Kiểu dữ liệu | Required | Mô tả                |
| ----------- | ------------ | -------- | -------------------- |
| _id         | String       | Require  | Id của comment       |
| idUser      | String       | Require  | Id của người comment |
| content     | String       | Require  | Nội dung của comment |
| dateCreated | Date         |          | Ngày comment         |

## 4. Materials

Nguyên liệu cho công thức

| Tên trường | Kiểu dữ liệu  | Required | Mô tả                                          |
| ---------- | ------------- | -------- | ---------------------------------------------- |
| _id        | String        | Require  | Id của nguyên liệu                             |
| idRecipe   | String        | Require  | Id của công thức                               |
| materials  | Array[Object] | Require  | Mảng các Object chưa nguyên liệu cho công thức |

Trường materials là mảng các Object có mô tả như sau:

| Tên trường   | Kiểu dữ liệu | Required | Mô tả                  |
| ------------ | ------------ | -------- | ---------------------- |
| _id          | String       | Require  | Id của materials       |
| name         | String       |          | Tên nguyên liệu        |
| unit         | String       |          | Đơn vị tính: Kg, quả   |
| quantitative | Number       |          | Định lượng: 1, 2.3,... |

## 5. Rate

Đánh giá công thức

| Tên trường   | Kiểu dữ liệu  | Required | Mô tả              |
| ------------ | ------------- | -------- | ------------------ |
| _id          | String        | Require  | Id của rate        |
| idRecipe     | String        | Require  | Id của công thức   |
| ratingNumber | Number        |          | Số sao đánh giá    |
| rates        | Array[Object] |          | Mảng các đối tượng |

Trường rates là mảng các Object có mô tả như sau:

| Tên trường | Kiểu dữ liệu | Required | Mô tả                 |
| ---------- | ------------ | -------- | --------------------- |
| _id        | String       | Require  | Id                    |
| idUser     | String       | Require  | Id của người đánh giá |
| rating     | Number       | Require  | Số sao đánh giá       |

## 6. Post

Bài viết chia sẻ về món ăn đã thực hiện của người dùng

| Tên trường | Kiểu dữ liệu  | Required | Mô tả                                                        |
| ---------- | ------------- | -------- | ------------------------------------------------------------ |
| _id        | String        | Require  | Id của blog                                                  |
| content    | String        |          | Nội dung blog                                                |
| status     | Number        |          | Trạng thái của bài đăng:<br />0: Chưa duyệt<br />1: Đã duyệt |
| image      | String        |          | Link ảnh                                                     |
| likes      | Array[String] |          | Mảng Id các user thích bài post                              |
| idUser     | String        |          | Id của người đăng bài viết                                   |

## 7. Blog

Bài viết chia sẻ về kiến thức, kinh nghiệm

| Tên trường | Kiểu dữ liệu | Required | Mô tả             |
| ---------- | ------------ | -------- | ----------------- |
| _id        | String       | Require  | Id cùa bài viết   |
| title      | String       | Require  | Tiêu đề bài viết  |
| content    | String       |          | Nội dung bài viết |
| image      | String       |          | Ảnh               |
| video      | String       |          | Link video        |

## 8. User

Người dùng: Admin, User, Kiểm duyệt

| Tên trường  | Kiểu dữ liệu | Required | Mô tả                                                        |
| ----------- | ------------ | -------- | ------------------------------------------------------------ |
| _id         | String       | Require  | Id của người dùng                                            |
| role        | Number       | Require  | Loại người dùng<br />0: Admin<br />1: Kiểm duyệt<br />2: Người dùng |
| userName    | String       |          | Tên tài khoản                                                |
| password    | String       |          | Mật khẩu                                                     |
| gender      | String       |          | Giới tính                                                    |
| avatar      | String       |          | Link ảnh đại diện                                            |
| email       | String       |          | Email                                                        |
| weight      | Number       |          | Cân nặng                                                     |
| height      | Number       | `        | Chiều cao                                                    |
| dateCreated | Date         |          | Ngày tạo tài khoản                                           |

## 9. Restaurant

Nhà hàng

| Tên trường | Kiểu dữ liệu | Required | Mô tả                  |
| ---------- | ------------ | -------- | ---------------------- |
| _id        | String       | Require  | Id nhà hàng            |
| name       | String       |          | Tên nhà hàng           |
| address    | String       |          | Địa chỉ nhà hàng       |
| phone      | String       |          | Số điện thoại nhà hàng |
| avatar     | String       |          | Link ảnh đại diện      |

## 10. RestaurantMenu

Thực đơn của nhà hàng

| Tên trường  | Kiểu dữ liệu  | Required | Mô tả                 |
| ----------- | ------------- | -------- | --------------------- |
| _id         | String        | Require  | Id của menu           |
| title       | String        |          | Tên Menu              |
| description | String        |          | Mô tả của nhóm món ăn |
| recipes     | Array[Object] |          | Mảng các món ăn       |

Trường recipes là mảng các Object có các trường như sau:

| Tên trường  | Kiểu dữ liệu | Required | Mô tả               |
| ----------- | ------------ | -------- | ------------------- |
| _id         | String       |          | Id của món ăn       |
| name        | String       |          | Tên món ăn          |
| description | String       |          | Mô tả cho món ăn    |
| price       | Number       |          | Giá tiền món ăn     |
| image       | String       |          | Hình ảnh cho món ăn |

## 11. CookingClass

Lớp học nấu ăn

| Tên trường       | Kiểu dữ liệu | Required | Mô tả                       |
| ---------------- | ------------ | -------- | --------------------------- |
| _id              | String       | Require  | Id của lớp học              |
| className        | String       |          | Tên lớp học                 |
| address          | String       |          | Địa chỉ lớp học             |
| startDate        | Date         |          | Ngày bắt đầu mở lớp         |
| shortDescription | String       |          | Mô tả ngắn gọn về lớp học   |
| startTime        | String       |          | Giờ bắt đầu học             |
| endTime          | String       |          | Giờ kết thúc buổi học       |
| classDecription  | String       |          | Mô tả chi tiết lớp học      |
| tutorDescription | String       |          | Mô tả về giảng viên dạy học |

## 12. SavedRecipe

Các công thức đã lưu 

| Tên trường  | Kiểu dữ liệu  | Required | Mô tả                            |
| ----------- | ------------- | -------- | -------------------------------- |
| _id         | String        | Require  | Id                               |
| idUser      | String        |          | Id của người dùng                |
| savedRecipe | Array[String] |          | Mảng các Id của công thức đã lưu |

## 13. BlogCategory

| Tên trường | Kiểu dữ liệu | Requỉed | Mô tả            |
| ---------- | ------------ | ------- | ---------------- |
| _id        | String       |         | Id của category  |
| name       | String       |         | Tên của category |
| image      | String       |         | Ảnh của category |

