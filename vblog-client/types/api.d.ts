export interface ApiResponse<T> {
  success: boolean; // true: thành công, false: thất bại
  statusCode: number; // mã trạng thái HTTP từ backend
  message: string; // thông báo từ server
  data: T | null; // dữ liệu trả về (null nếu lỗi)
}
