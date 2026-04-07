# Hướng dẫn Chuyên sâu: Vận hành Jira (Giai đoạn 2, 3, 4)

Chào bạn! Sau khi đã nhập dữ liệu thành công, đây là hướng dẫn chi tiết từng bước để bạn hoàn thành các yêu cầu nâng cao của bài tập trên loại Project **Team-managed** mà bạn đang dùng.

---

## 🟡 GIAI ĐOẠN 2: Cấu hình Workflow cho Quản lý Lỗi (Bug)
*Mục tiêu: Tạo thêm bước "Testing" và cho phép đẩy việc ngược lại "In Progress" nếu có lỗi.*

### Bước 1: Truy cập vào sơ đồ Workflow
1.  Tại màn hình Project (DACK), nhấn vào **Project settings** ở cột bên trái (dưới cùng).
2.  Chọn mục **Issue types**.
3.  Chọn loại công việc là **Story** (hoặc Task).
4.  Nhấn vào nút **Edit workflow** ở góc trên cùng bên phải.

### Bước 2: Thêm trạng thái và đường nối
1.  Nhấn nút **+ Status** -> Gõ tên: `Testing` -> Nhấn **Add**.
2.  Dùng chuột kéo thả để sắp xếp vị trí: `To Do` -> `In Progress` -> `Testing` -> `Done`.
3.  **Tạo đường nối ngược (Transition)**:
    - Di chuột vào khối `Testing`, bạn sẽ thấy các chấm tròn ở cạnh.
    - Kéo một mũi tên từ `Testing` ngược về `In Progress`. 
    - Đặt tên cho mũi tên này là: `Testing Failed / Re-open`.
4.  Nhấn **Update workflow** -> Chọn **Save and publish**.

---

## 🔵 GIAI ĐOẠN 3: Tích hợp Hệ thống (Kết nối GitHub)
*Mục tiêu: Để Jira tự động cập nhật khi bạn code trên GitHub.*

1.  **Cài đặt App**:
    - Nhìn lên menu ngang trên cùng của Jira, nhấn vào mục **Apps** -> Chọn **Explore apps**.
    - Tại ô tìm kiếm, gõ: `GitHub for Jira`.
    - Nhấn **Get app** -> **Get it now**.
2.  **Kết nối**:
    - Sau khi cài xong, nhấn **Configure**.
    - Nhấn **Connect GitHub organization** và chọn tài khoản GitHub của bạn.
    - Chọn repository tên là `DACK` (hoặc tên repo bạn đang code).
3.  **Cách dùng (Smart Commits)**:
    - Khi bạn Commit code trên máy tính, hãy viết mã số Task vào nội dung (ví dụ: `[DACK-12] Sửa lỗi giao diện`).
    - Ngay lập tức, trong thẻ việc DACK-12 trên Jira sẽ hiện link dẫn đến đoạn code đó.

---

## 🟠 GIAI ĐOẠN 4: Trích xuất Báo cáo (Chứng minh kết quả)
*Bạn cần chuẩn bị 4 bức ảnh sau để nộp bài:*

### 1. Ảnh Timeline (Biểu đồ Gantt)
- Nhấn vào tab **Timeline** ở cột bên trái.
- Tại đây bạn sẽ thấy các thanh màu tím (Epic) kéo dài theo thời gian. Đây là minh chứng cho việc lập kế hoạch dài hạn.

### 2. Ảnh Backlog (Danh sách ưu tiên)
- Nhấn vào tab **Backlog** ở bên trái.
- Chụp màn hình danh sách các Story nằm dưới các Epic. Điều này chứng minh bạn đã chia nhỏ công việc thành 20 Stories như yêu cầu.

### 3. Ảnh Reports (Biểu đồ tiến độ)
- Nhấn vào tab **Reports** ở bên trái.
- Chọn **Burnup chart**: Biểu đồ này cực kỳ quan trọng, nó cho thấy khối lượng công việc đang hoàn thành theo thời gian.

### 4. Ảnh Board (Bảng điều khiển)
- Nhấn vào tab **Board** ở bên trái.
- Lúc này bảng của bạn sẽ có 4 cột: `To Do` - `In Progress` - `Testing` - `Done`.
- Hãy kéo một vài thẻ việc sang các cột khác nhau để bức ảnh trông giống như dự án đang hoạt động thật sự.

---

### 💡 Gợi ý thực hành "Log Bug":
Để làm đúng yêu cầu: *Khi có lỗi, task sẽ bị đẩy ngược về trạng thái xử lý.*
1. Tạo một Issue mới loại là **Bug** (ví dụ: `Lỗi nút đăng nhập không bấm được`).
2. Vào thẻ việc (Task) liên quan đến Đăng nhập đang ở cột `Testing`.
3. Nhấp vào nó và chuyển trạng thái về `In Progress` (dùng đường nối ngược bạn đã tạo ở Giai đoạn 2).
4. **Chụp ảnh màn hình** lúc này để làm minh chứng cho việc quản lý lỗi.

Bạn hãy thử vào **Project Settings** để sửa **Workflow** trước nhé! Nếu không thấy nút Edit Workflow ở đâu, hãy chụp ảnh màn hình tôi sẽ chỉ cho.
