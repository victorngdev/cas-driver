const messages = {
    finish: {
        title: "Yêu cầu hoàn thành",
        message:
            "Cảm ơn bạn đã giúp đỡ bệnh nhân! Bạn có thể xem lại yêu cầu và phần đánh giá trong mục Lịch sử."
    },
    acceptedRequest: {
        title: "Yêu cầu hết hạn",
        message:
            "Yêu cầu đã được chấp nhận bởi người khác. Hãy giữ trạng thái sẵn sàng để nhận yêu cầu từ người khác!"
    },
    cancelled: {
        title: "Yêu cầu hết hạn",
        message:
            "Yêu cầu đã được gõ bởi người gửi yêu cầu. Hãy giữ trạng thái sẵn sàng để nhận yêu cầu từ người khác!"
    },
    ready: {
        title: "Sẵn sàng không thành công",
        message:
            "Bạn cần đăng ký xe trên hệ thống và được quản trị viên xét duyệt để có thể nhận yêu cầu từ người khác."
    },
    approved: {
        message:
            "Yêu cầu đăng ký xe của bạn đã được chấp nhận, hệ thống sẽ tiến hành đồng bộ dữ liệu sau khi bạn nhấn Xác nhận."
    },
    rejected: {
        message:
            "Yêu cầu đăng ký xe của bạn không hợp lệ. Bạn có thể xem lại các mục không hợp lệ trong phần đăng ký."
    },
    denied: {
        message:
            "Yêu cầu đăng ký xe của bạn không được duyệt, bạn có thể xem chi tiết trong phần đăng ký xe."
    },
    registered: {
        message:
            "Bạn cần đảm bảo tính chính xác của thông tin đăng ký và các hình ảnh đủ rõ để quản trị viên có thể duyệt nhanh hơn."
    },
    update: {
        message:
            "Sau khi cập nhật, bạn cần được quản trị viên phê duyệt để có thể nhận được yêu cầu mới. Hãy đảm bảo các thay đổi là cần thiết và chính xác!"
    },
    cancel: {
        message:
            "Các thông tin đã đăng ký sẽ không được truy cập lại sau bạn hủy đăng ký. Nếu các thông tin bạn đăng ký trước đó không còn giá trị hiệu lực, bạn có thể cập nhật và chờ xét duyệt từ quản trị viên."
    },
    phoneExisted: "* Số điện thoại đã được đăng ký",
    phoneUnexisted: "* Số điện thoại chưa được đăng ký",
    invalidPhone: "* Số điện thoại không hợp lệ",
    invalidPassword: "* Mật khẩu cần ít nhất 6 kí tự",
    invalidConfirmPassword: "* Xác nhận mật khẩu không khớp",
    invalidName: "* Tên không hợp lệ",
    401: "Tên tài khoản và mật khẩu bạn cung cấp không đúng, vui lòng kiểm tra lại!",
    402: "Đây có thể là lỗi kỹ thuật mà chúng tôi đang cố gắng khắc phục, hãy thực hiện lại yêu cầu một lần nữa!",
    700: "Phiên làm việc hết hạn, vui lòng đăng xuất để kiểm tra hoạt động!",
    201: "Đăng ký xe thành công! Vui lòng chờ xác nhận từ quản trị viên trước khi nhận được yêu cầu.",
    202: "Hủy đăng ký xe cứu thương thành công!",
    203: "Cập nhật thông tin xe cứu thương thành công!",
    204: "Cập nhật thông tin cá nhân thành công!",
    205: "Thiết lập nhận yêu cầu thành công!"
};

export default messages;
