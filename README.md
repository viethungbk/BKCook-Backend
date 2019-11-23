# BKCook-Backend
Website học nấu ăn - Backend

# 1. Cách làm việc trên git

## 1.1. Cách làm việc với các nhánh

- Chỉ được làm việc trên nhánh của mình. Sau đó và merge vào nhánh develop. Nhánh của từng thành viên:
  - Nguyễn Việt Hùng: hung.nguyenviet
  - Ngô Việt Hưng: hung.ngoviet
  - Trần Thị Thu Hương: huong.tranthithu
- **Không được commit trực tiếp vào nhánh master**
- Nhóm trưởng sẽ merge từ nhánh develop vào nhánh master

## 1.2. Các viết commit messages

git commit -m "message"

Cấu trúc commit message:

```
<type>: <description>
```

Trong đó:

- **type** và **description** viết bằng **Tiếng Anh**, không viết hoa chữ cái đầu

- **type**: từ khóa để phân loại commit: "commit này làm gì ?". Một số type phổ biến:
  - **feat**: thêm một feature
  - **fix**: fix bug cho hệ thống
  - **refactor**: sửa code  nhưng không fix bug, không thêm feature. Nhưng đôi khi bug cũng được fix từ việc refactor
  - **chore**: một số thay đổi lặt vặt
  - **docs**: thêm/thay đổi doc
  - **style**: thay đổi mà không làm đổi ý nghĩa  code. Ví dụ: thay đổi css/UI
  - **perf**: cải tiến về hiệu năng
  - **vender**: cập nhật version cho các dependencies, packages
  - Ngoài ra ta có thể sử dụng type là các từ ta tự định nghĩa.
- **description**: mô tả ngắn gọn những gì thay đổi trong commit đó.

**Ví dụ:**

- feat: add API login
- fix: fix router
- feat: add home page