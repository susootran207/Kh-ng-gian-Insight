export const isAcademicShowcase = import.meta.env.KGNT_ACADEMIC_SHOWCASE === true
export const academicNotice = 'Không Gian Nội Tâm là sản phẩm học tập cá nhân môn Tham vấn học đường, được xây dựng nhằm minh họa mô hình truyền thông phòng ngừa tâm lý học đường. Nội dung có tính chất giáo dục và tham khảo, không thay thế tham vấn tâm lý, đánh giá lâm sàng hay trị liệu chuyên nghiệp.'
export function AcademicNotice(){return isAcademicShowcase?<aside className="academic-notice"><p>{academicNotice}</p></aside>:null}
