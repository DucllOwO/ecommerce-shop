# Trang web bán quần áo với hệ thống đề xuất dựa trên lịch sử mua hàng

![Logo trang web](path/to/logo.png)

## Giới thiệu

Đây là đồ án 1 trên GitHub của trang web bán quần áo, nơi triển khai một hệ thống đề xuất dựa trên lịch sử mua hàng của khách hàng. Thư viện Content Based Recommender được sử dụng để tạo ra các gợi ý sản phẩm phù hợp với sở thích và hành vi mua hàng của từng khách hàng.

Trang web bán quần áo cung cấp một giao diện dễ sử dụng cho khách hàng tìm kiếm và mua sắm các sản phẩm thời trang. Hệ thống đề xuất giúp cá nhân hóa trải nghiệm mua hàng, đồng thời cung cấp những gợi ý sản phẩm mới và tương tự dựa trên lịch sử mua hàng của khách hàng.

## Tính năng
#### Hệ thống gợi ý sản phẩm:  
- Hệ thống gợi ý những sản phẩm tương tự dựa trên những sản phẩm người dùng đã xem và đã mua.
- Hệ thống gợi ý sản phẩm theo từng cá nhân.
- Cung cấp thông tin cơ bản về sản phẩm
#### Xây dựng website: 
- Ứng dụng chạy trên nền tảng Web
- Giới thiệu về sản phẩm, cửa hàng, quy trình mua hàng, thông tin liên hệ một cách trực quan, đem đến cho người dùng những nội dung chi tiết nhất 
- Cung cấp giao diện quản lý tài khoản, đăng và chỉnh sửa tin tức, quản lý hỏi đáp.
- Cung cấp các thống kê, biểu đồ trực quan số liệu, hỗ trợ công tác quản trị doanh nghiệp

## Phạm vi
#### Phạm vi môi trường: Web
#### Phạm vi chức năng:  
Đối với hệ thống gợi ý sản phẩm:  
- Gợi ý những sản phẩm tương tự sản phẩm người dùng đã xem hoặc đã mua, tăng mức độ tiếp cận khách hàng của sản phẩm.
Đối với ứng dụng:  
- Hệ thống cung cấp giao diện mua dành cho khách hàng tiện lợi, dễ sử dụng.
- Tích hợp hệ thống gợi ý sản phẩm nhằm quảng bá sản phẩm đến người dùng, tăng doanh thu.
- Hệ thống cung cấp giao diện quản lý giúp chủ cửa hàng theo dõi doanh số, quản lý hàng tồn kho.
- Hệ thống cung cấp giao diện đăng ký, đăng nhập giúp xác thực người dùng.
- Hệ thống cung cấp tính năng giỏ hàng hỗ trợ người mua đơn giản hóa quá trình mua hàng.
#### Đối tượng sử dụng:  
- Khách hàng có nhu cầu mua sắm quần áo online, tìm kiếm những sản phẩm thời trang.
- Quản trị viên muốn thực hiện các công việc quản trị doanh nghiệp.

## Công nghệ sử dụng
- Ngôn ngữ: typescript
- Front-end: ReactJS
- Back-end: NodeJS, NestJS
- Database: PostgreSQL 
- Supabase

## Hệ thống gợi ý sản phẩm

Để đơn giản cho việc phát triển hệ thống, nhóm quyết định sử dụng thư viện [Content Based Recommender](https://github.com/stanleyfok/content-based-recommender) giúp hỗ trợ trong việc sử dụng triển khai hệ thống. Nhóm chỉ cần chuẩn bị dữ liệu để thư viện thực hiện việc train.

#### Lý do chọn thư viện

Nhóm quyết định chọn thư viện này vì đặc điểm trang web sẽ có lượng dữ liệu ít

#### Một số thông tin về thư viện
Đây là một content-based recommender đơn giản được viết bằng javascript để minh họa khái niệm đề xuất dựa trên nội dung, đặc biệt hữu ích cho các website về thương mại điện tử, tin tức,...

#### Việc training bao gồm 3 bước chính:

- 

## Cài đặt và sử dụng

Dự án đang trong quá trình phát triển.
