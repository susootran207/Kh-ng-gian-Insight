import { Link } from 'react-router-dom'
import { Arrow } from '../components/Icons'
import { Breadcrumb } from './ReadingShell'
import '../styles/foundation.css'

export default function FoundationPage() {
  return <div className="foundation-page">
    <Breadcrumb title="Nền tảng" parent={null}/>
    <header className="article-title"><h1>Nền tảng của<br/>Không Gian Nội Tâm.</h1><p className="article-deck">Một nơi đọc về đời sống tâm lý học đường, để hiểu thêm về mình và biết lúc nào cần tìm người cùng hỗ trợ.</p></header>
    <div className="reader-layout">
      <nav className="table-of-contents" aria-label="Mục lục"><h2>Trong trang này</h2><ol>{sections.map(section => <li key={section.id}><Link to={{pathname:'/nen-tang',hash:'#'+section.id}}>{section.title}</Link></li>)}</ol></nav>
      <div className="article-prose">
        {sections.map(section => <section id={section.id} key={section.id}><h2>{section.title}</h2>{section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}{section.items && <ul>{section.items.map(item => <li key={item.title}><strong>{item.title}</strong> {item.text}</li>)}</ul>}</section>)}
        <nav className="foundation-next recovery-links" aria-label="Tiếp tục khám phá"><Link className="text-link" to="/thu-vien">Đến thư viện <Arrow/></Link><Link className="text-link" to="/chuyen-de">Ghé chuyên đề tuần <Arrow/></Link><Link className="text-link" to="/#tam-tinh">Ghé Góc tâm tình <Arrow/></Link></nav>
      </div>
    </div>
  </div>
}

type Section = {id:string;title:string;paragraphs:string[];items?:{title:string;text:string}[]}
export const sections: Section[] = [
  {id:'ve-khong-gian-noi-tam',title:'Một nơi đọc dành cho tuổi đi học',paragraphs:[
    'Không Gian Nội Tâm là website giáo dục tâm lý học đường dành trước hết cho học sinh THCS và THPT. Những chuyện học tập, quan hệ với bạn bè, gia đình và cảm xúc hằng ngày là điểm khởi đầu để tìm hiểu đời sống bên trong mình.',
    'Mục đích của khu vườn là giúp bạn có thêm ngôn ngữ để diễn đạt trải nghiệm, hiểu một số khái niệm tâm lý và cân nhắc cách ứng xử phù hợp. Người lớn đồng hành cùng học sinh cũng có thể đọc để mở một cuộc trò chuyện. Website không đưa ra kết luận về tình trạng tâm lý của từng người.'
  ]},
  {id:'doc-theo-nhip-cua-ban',title:'Đọc theo nhịp của bạn',paragraphs:[
    'Bạn có thể tìm bài trong thư viện theo điều đang quan tâm, chủ đề hoặc giai đoạn năm học. Khi có chuyên đề được công bố, chuyên đề gợi ý một lối đọc qua các bài có liên quan; bạn vẫn có thể chọn bài và thứ tự phù hợp với mình.',
    'Không cần đọc hết trong một lần. Hãy dùng mục lục để đến phần cần tìm, xem nguồn tham khảo khi muốn hiểu thêm và dừng lại nếu nội dung khiến bạn thấy quá sức. Một tình huống trong bài không đủ để giải thích trọn vẹn trải nghiệm của bạn.',
    'Hoạt động và gợi ý phản hồi là lựa chọn để suy nghĩ thêm. Bạn có thể đọc gợi ý, dùng một tình huống giả định hoặc bỏ qua hoạt động; không cần kể chuyện riêng hay gửi câu trả lời cho website.'
  ]},
  {id:'nguon-va-doi-chieu',title:'Đọc cùng nguồn tham khảo',paragraphs:[
    'Nguyên tắc biên soạn là dựa trên tài liệu có thể truy tìm, phân biệt kiến thức được dẫn nguồn với ví dụ minh họa và tránh diễn đạt một kết quả nghiên cứu như kết luận đúng cho mọi người.',
    'Danh mục tham khảo giúp bạn tìm tác giả, năm, tên tài liệu và đường dẫn hoặc DOI khi có. Khi đối chiếu, hãy xem tài liệu nói về nhóm người nào, trong hoàn cảnh nào và có giới hạn gì. Có trích dẫn không có nghĩa là mọi cách diễn giải đều đã được kiểm chứng.',
    'Đây là nguyên tắc định hướng biên soạn và kiểm tra nội dung, không phải tuyên bố rằng toàn bộ bản nháp đã trải qua thẩm định chuyên môn độc lập. Trạng thái duyệt và quyền công bố cần được xác nhận riêng.'
  ]},
  {id:'ba-muc-bloom',title:'Ba cách học cùng một bài viết',paragraphs:[
    'Dự án sử dụng ba mức Ghi nhớ – Thấu hiểu – Vận dụng từ khung Bloom sửa đổi để định hướng hoạt động học. Đây là ba mức được lựa chọn cho trải nghiệm đọc, không phải toàn bộ hệ thống phân loại Bloom.'
  ],items:[
    {title:'Ghi nhớ.',text:'Nhận ra và nhắc lại một ý chính bằng lời của bạn, chẳng hạn gọi tên khái niệm vừa đọc.'},
    {title:'Thấu hiểu.',text:'Giải thích ý đó có nghĩa gì, phân biệt các tình huống hoặc kể một ví dụ giả định để làm rõ.'},
    {title:'Vận dụng.',text:'Thử dùng điều vừa hiểu để cân nhắc một hành động phù hợp trong tình huống học đường.'},
    {title:'Gợi ý phản hồi.',text:'Đưa thêm cách lý giải để bạn đối chiếu suy nghĩ, không chấm điểm hay xếp loại con người. Các hoạt động không phải trắc nghiệm, không đánh giá sức khỏe tâm lý và không chứng minh bạn đã đạt một kết quả học tập.'}
  ]},
  {id:'hinh-va-mo-ta',title:'Hình minh họa và phần mô tả',paragraphs:[
    'Hình minh họa giúp nhìn mối liên hệ giữa các ý. Chú thích nói hình đang thể hiện điều gì; văn bản thay thế và mô tả tương đương bằng chữ giúp tiếp cận thông tin khi không nhìn hoặc không tải được hình.',
    'Khi đọc bài có hình, hãy đọc cả chú thích và mô tả. Trình đọc có chức năng xem hình lớn và điều khiển bằng bàn phím. Một sơ đồ chỉ minh họa ý trong bài, không dùng để tự chẩn đoán hoặc so sánh mức độ “bình thường” của bản thân.'
  ]},
  {id:'trang-thai-va-quyen-cong-bo',title:'Bản nháp và quyền công bố',paragraphs:[
    'Nghiệm thu nội bộ bản nháp là việc chủ dự án chấp nhận bản biên tập để tiếp tục hoàn thiện website. Việc này khác với phê duyệt chuyên môn và khác với cấp quyền xuất bản.',
    'Phê duyệt chuyên môn cần bằng chứng rà soát phù hợp với đúng phiên bản nội dung. Quyền công bố là quyết định riêng; bài chỉ được đưa ra công khai khi đáp ứng đầy đủ điều kiện phê duyệt và quyền công bố của phiên bản đó. Việc có lịch chuyên đề hoặc kiểm thử kỹ thuật đạt không thay thế các điều kiện này.',
    'Thư viện công khai hiện chưa có bài được cấp quyền xuất bản. Các bài đã nghiệm thu nội bộ được xem trong môi trường xem trước cục bộ dành cho chủ dự án; xem trước không làm thay đổi trạng thái xuất bản. Website không dùng bài minh họa để lấp chỗ trống trong thư viện công khai.'
  ]},
  {id:'gioi-han-cua-website',title:'Giới hạn của thông tin giáo dục',paragraphs:[
    'Thông tin giáo dục tâm lý trên website không thay thế đánh giá, chẩn đoán hoặc tham vấn, trị liệu trực tiếp với người có chuyên môn. Không thể xác định một vấn đề tâm lý chỉ từ một câu chuyện, hoạt động hay hình minh họa trong bài.',
    'Website không cung cấp dịch vụ tham vấn trực tuyến, không có người tiếp nhận lời tâm tình để theo dõi hoặc phản hồi cá nhân. Nếu bạn cần hỗ trợ cho hoàn cảnh của mình, hãy tìm một người có thể trao đổi và cùng bạn cân nhắc bước tiếp theo.'
  ]},
  {id:'nguoi-co-the-dong-hanh',title:'Tìm người có thể đồng hành',paragraphs:[
    'Bạn có thể bắt đầu với người lớn mà mình tin tưởng: cha mẹ hoặc người chăm sóc, thầy cô, nhân viên hỗ trợ học đường nếu trường có, hoặc người có chuyên môn phù hợp. Có thể nói ngắn gọn điều đang làm bạn khó chịu và bạn mong được giúp điều gì; không cần chuẩn bị một lời giải thích hoàn hảo.',
    'Nếu người đầu tiên chưa hiểu hoặc không phải người bạn cảm thấy an toàn khi chia sẻ, bạn có thể tìm một người khác. Khi cảm thấy mình đang không an toàn, hãy tìm người lớn đáng tin cậy ở gần để được hỗ trợ trực tiếp, thay vì chờ phản hồi từ website.'
  ]},
  {id:'rieng-tu-trong-khu-vuon',title:'Riêng tư trong khu vườn',paragraphs:[
    'Website hiện không có tài khoản, hộp thư tư vấn hay chức năng lưu câu trả lời hoạt động. Bạn có thể đọc mà không viết điều gì về bản thân.',
    'Ở Góc tâm tình, lời đang gõ chỉ tồn tại tạm trong giao diện trình duyệt. Thao tác thả đèn không gửi lời viết đến máy chủ, không lưu thành hồ sơ và không có người nhận. Lời viết được xóa khỏi ô nhập và trạng thái giao diện khi thả đèn, khi rời trang chủ sang một trang khác; chuyển giữa các mục ngay trên trang chủ không đồng nghĩa với việc xóa.',
    'Đó là mô tả chức năng hiện hành, không phải cam kết bảo mật tuyệt đối cho thiết bị, tiện ích trình duyệt hay hạ tầng lưu trữ website. Website cũng không bảo đảm xóa vật lý dữ liệu khỏi bộ nhớ thiết bị. Bạn không cần nhập tên, thông tin liên hệ hoặc chi tiết riêng tư để sử dụng khu vườn.'
  ]}
]
