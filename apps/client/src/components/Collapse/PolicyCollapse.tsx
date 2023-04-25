import React from 'react';
import { Collapse } from 'antd';

const { Panel } = Collapse;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const PolicyCollapse: React.FC = () => {
  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  return (
    <Collapse defaultActiveKey={['1']} onChange={onChange}>
      <Panel header="Phạm vi áp dụng" key="1">
        <p>(i) Mua sản phẩm trên YODY;
          <br />
          (ii) Có nhu cầu được giao Sản Phẩm đến các địa điểm phù hợp với Chính sách vận chuyển đăng tải trên YODY
          <br />
          1.2. Khách hàng tại Điều Khoản Và Điều Kiện này (sau đây gọi là "Khách Hàng") bao gồm:
          <br />
          (i) Mọi cá nhân có đầy đủ năng lực hành vi dân sự từ đủ 15 tuổi trở lên và có tài sản để thực hiện giao dịch mua Sản Phẩm trên YODY , trừ giao dịch mua các Sản Phẩm phải đăng ký hoặc sản phẩm khác theo quy định của pháp luật phải được người đại diện theo pháp luật đồng ý; và
          <br />
          (ii) Mọi tổ chức được thành lập và hoạt động hợp pháp theo quy định của pháp luật Việt Nam.</p>
      </Panel>
      <Panel header="Cách hình thành hợp đồng" key="2">
        <p>2.1. Mọi thông tin về Sản Phẩm đưa ra trên YODY trong bất kỳ trường hợp nào không được hiểu là đề nghị giao kết hợp đồng của YODY tới Khách hàng.
          <br />

          Các bước hình thành Hợp đồng như sau:
          <br />

          Bước 1: Khách Hàng đăt hàng trên YODY ("Đơn Đặt Hàng")
          <br />

          Bước 2: YODY gửi xác nhận Đơn Đặt Hàng (danh sách Sản Phẩm, thời hạn giao hàng, điện thoại liên hệ) vào địa chỉ email của Khách Hàng hoặc gửi tin nhắn vào số điện thoại đặt hàng của Khách Hàng hoặc cập nhật vào tình trạng đơn hàng trong hệ thống quản lý tài khoản của Khách Hàng.
          <br />

          Lưu ý: Quan hệ hợp đồng với Khách Hàng chỉ hình thành và có hiệu lực kể từ thời điểm YODY  gửi xác nhận như nêu tại Bước 2.</p>
        <p>
          2.2. Việc Khách Hàng hủy Đơn Đặt Hàng (nếu có) phải được thực hiện phù hợp với quy định tại Quy định đổi hàng đăng tải trên YODY.
          YODY có quyền hủy Đơn Đặt Hàng trong trường hợp:
          <br />
          (i) Liên hệ với Khách hàng quá 3 lần ( gọi điện thoại, gửi email) mà không nhận được phản hồi. Cụ thể được tính sau 3 lần gọi điện thoại và sau 24 tiếng khi gửi email xác nhận lần cuối cùng.
          <br />
          (ii) Đơn vị vận chuyển không thể liên lạc được với Khách hàng 3 lần thì sản phẩm sẽ được tự động trả về cho YODY và YODY sẽ hủy đơn hàng. Trong trường hợp Khách hàng đã thanh toán trả trước cho sản phẩm, YODY sẽ tìm cách liên hệ lại để giao hàng lại cho Khách hàng hoặc hoàn trả lại tiền cho Khách hàng bằng đúng số tiền mà Khách hàng đã thanh toán trước đó.
        </p>
      </Panel>
      <Panel header="Giá cả và thanh toán" key="3">
        <p>3.1. Giá của Sản Phẩm đã bao gồm 10% thuế VAT.
          <br />

          Trong mọi trường hợp, giá của Sản Phẩm không bao gồm phí vận chuyển. Chi phí vận chuyển được quy định cụ thể tại Chính sách vận chuyển đăng tải trên YODY.
          <br />

          3.2. Khách Hàng thanh toán giá trị của Đơn Đặt Hàng tại trang thanh toán của YODY. Khi Khách Hàng nhấn (click) vào ô “ĐẶT HÀNG NGAY” để tiến hành thanh toán Đơn Đặt Hàng có nghĩa là (i) Khách Hàng xác nhận đã rà soát thông tin Đơn Đặt Hàng; và (ii) Khách Hàng đồng ý là Điều Khoản Và Điều Kiện sẽ được áp dụng cho giao dịch mua Sản Phẩm trong Đơn Đặt Hàng đó.
          <br />

          3.3 YODY có quyền từ chối chấp nhận cho Khách Hàng thanh toán bằng thẻ tín dụng trong một số trường hợp theo quyết định của YODY
          <br />

          3.4. Để đảm bảo an toàn thanh toán, Khách Hàng lưu ý:
          <br />

          (i) Chỉ thực hiện thanh toán trực tuyến tại cửa sổ liên kết từ YODY chuyển đến;
          <br />

          (ii) Sử dụng và bảo quản thẻ (thẻ tín dụng, thẻ ATM, thẻ mua hàng…) và thông tin tài khoản/thông tin thẻ cẩn thận;
          <br />

          (iii) Không cho người khác mượn hoặc sử dụng thẻ để mua hàng tạiYODY. Ngay khi phát hiện giao dịch phát sinh bất thường nào tại YODy, Khách Hàng cần liên hệ ngay với bộ phận chăm sóc Khách Hàng của YODY để được xử lý kịp thời;
          <br />

          (iv) Trong mọi trường hợp, với thẻ tín dụng/ghi nợ quốc tế, Khách Hàng vui lòng không để lộ số CVV/CVC/CSC (là mã số bảo mật, bộ ba kí tự số được in ở mặt sau của thẻ) để bảo mật thông tin thẻ;</p>
      </Panel>
    </Collapse>
  );
};

export default PolicyCollapse;