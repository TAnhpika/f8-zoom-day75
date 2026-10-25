READ (Cache):

- List
- Detail

CREATE

UPDATE

DELETE

## Cache

fetch cache: lưu dữ liệu vào bộ nhớ đệm -> check & lấy trong bộ nhớ đệm trc (khi nào dữ liệu đó k còn / hết hạn mới gọi đến BE để trả về dữ liệu mới)

- bỏ disable cache ở dev network

2 cơ chế hay dùng vs cache:

- revalidate (set up 1 thời gian, hết tg thì tự làm mới dữ liệu - khi đó nếu có request thì gọi api BE)
- chủ động xóa - tg lưu trữ vĩnh viễn

### Xóa cache

- revalidatePath(duong-dan): xóa full cache trong duong-dan (nhược: nếu 10 fetch 1 path thì xóa cả 10 - phí --> dùng Tag - cấu hình cẩn thận, dễ loạn tag -> xóa nhầm --> thêm file important để định nghĩa cấu hình tập trung)
- revalidateTag(tag): xóa theo index đc gắn vào cache

--> Chỉ sử dụng ở trên server action, route handler
(trang admin dùng react, trang user dùng next có cache fetch. Khi trang react muốn cập nhập dữ liệu vào BE thì phải gọi đến API Next để xóa cache --> Next cần viết 1 route handler để trang react gọi sang khi muốn cập nhập)

#### Nhược điểm

- nếu tách route handler riêng chỉ phù hợp trong trường hợp tách dự án (tách dashboard quản lý riêng, end user riêng)
- nếu xử dụng nội bộ (api ở trên, bên dưới có thêm 1 form. nếu gọi 1 API nữa thì rắc rối) --> Sử dụng server action (nhược điểm của server action là k dùng ra bên ngoài đc, chỉ dùng nội bộ bên trong thoi) - nhanh hơn

## Revalidate bằng Server action

- dùng client component thì server action phải tách riêng
- Sau khi thêm vào db ok nhưng k hiện ở FE -> Phải revalidate cache sau khi thêm xong
- Bình thường: revalidate -> refresh nhưng server action tự động clear cache round -> hiện dữ liệu mới luôn - k cần refresh

### 2 trường hợp xử lý form

-   1. Nếu xử lý trong nội bộ thì dùng luôn Server Action cho nhanh - bản chất nó chỉ là 1 cái hàm thôi (Cách xử lý full ở Server Action)

-   2. Nếu muốn xử lý ở client r gọi API tới BE:
    - Server action chỉ cần gọi đúng 1 hàm revalidate để tiến hành clear cache
    - React hook form + Zod -> call API (Full ở Client)
    - !Nên dùng khi validate (vì validate ở Server Action là gọi lên Server của Next -> chậm)

## RevalidateTag

- Nếu làm việc với Tag thì gắn tag ở page dùng cache:
    - cache: "force-cache",
      next: {
      tags: ["posts:list"]
      }

    - revalidateTag("posts:list", "max"):
        - max: revalidate ở dưới nền - 1,2 request sau mới xử lý xong thì dữ liệu mới đc làm mới ~ queue -> giảm tải cho Next Server (Được Next khuyến cáo nên dùng).
        - { expire: 0 } // clear cache ngay lập tức
