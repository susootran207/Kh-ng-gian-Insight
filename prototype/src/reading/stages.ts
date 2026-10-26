import type { SourceMetadata } from '../../editorial/source-contract'
export type StageKey = SourceMetadata['season']
// Existing Vietnamese values are the persisted query keys; topicIds are unrelated.
const homepageStages = [
  {title:'Đầu năm', subtitle:'Một khởi đầu mới', text:'Lớp mới, những gương mặt mới. Bạn có thể bắt đầu bằng một lời chào, một chỗ ngồi quen, một nhịp học vừa sức.', note:'Không cần tìm thấy chỗ của mình ngay ngày đầu tiên.'},
  {title:'Giữa học kỳ', subtitle:'Tìm lại nhịp của mình', text:'Khi bài vở và hoạt động cùng dồn đến, thử chọn điều cần làm trước và điều có thể nhờ người khác giúp.', note:'Một danh sách ngắn cũng có thể là điểm bắt đầu.'},
  {title:'Mùa thi', subtitle:'Chậm lại giữa những kỳ vọng', text:'Dành chỗ cho việc học, nhưng cũng dành chỗ cho bữa ăn, giấc nghỉ và một cuộc trò chuyện khi cần.', note:'Điểm số kể về một bài làm, không kể hết về bạn.'},
  {title:'Sau thi', subtitle:'Một khoảng trời để nghỉ', text:'Bạn có thể thấy nhẹ nhõm, tiếc nuối hoặc chưa biết làm gì tiếp theo. Không cần vội lấp đầy mọi khoảng trống.', note:'Cho mình thời gian trước khi bắt đầu một mùa mới.'},
] as const

const introductions = [
  'Một năm học có thể bắt đầu bằng việc làm quen với lịch học, không gian học tập và những người xung quanh. Bạn có thể chọn đọc về một điều cụ thể mình muốn tìm hiểu, không cần xác định ngay mọi kế hoạch.',
  'Giữa học kỳ là một mốc để nhìn lại cách sắp xếp việc học, sinh hoạt và các mối quan hệ. Các bài ở chặng này gợi thêm góc nhìn để bạn cân nhắc điều phù hợp với hoàn cảnh của mình.',
  'Trong thời gian chuẩn bị và tham gia các kỳ thi, bạn có thể tìm đọc về việc học, nghỉ ngơi và trao đổi với người khác. Mỗi người có điều kiện khác nhau; các bài không đặt ra một nhịp học bắt buộc.',
  'Sau một đợt thi, bạn có thể đọc để nhìn lại trải nghiệm, tìm hiểu điều mình quan tâm hoặc chuẩn bị cho lựa chọn tiếp theo. Không cần có cùng cảm xúc hay kế hoạch với các bạn khác.',
]
const anchors = ['dau-nam','giua-hoc-ky','mua-thi','sau-thi'] as const
export const stages = homepageStages.map((stage,index) => ({...stage,key:stage.title satisfies StageKey,anchor:anchors[index],introduction:introductions[index]}))
export function stageLibraryLink(key: StageKey) { return '/thu-vien?'+new URLSearchParams({'giai-doan':key}).toString() }
// Call only with the same preselected Library view. This is grouping, not authorization.
export function articlesForStage<T extends {season:string}>(entries:readonly T[],key:StageKey):T[] { return entries.filter(article=>article.season===key) }
