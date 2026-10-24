const legacy = [
  { id:'thi-cu', title:'Khi mùa thi đến gần', category:'Áp lực học tập', description:'Một khoảng dừng giữa những trang vở và kỳ vọng.', theme:'sage', paragraphs:[
    'Lịch kiểm tra kín dần. Bạn mở sách nhưng lại nghĩ đến kết quả, đến lời hỏi han của gia đình, đến những điều mình chưa kịp học. Có thể bắt đầu bằng việc gọi tên điều đang làm bạn bận lòng, thay vì buộc mình giải quyết tất cả cùng lúc.',
    'Một việc nhỏ để thử: chọn một phần bài vừa sức, dành một khoảng thời gian ngắn cho phần đó, rồi nghỉ. Bạn có thể điều chỉnh nhịp học theo hoàn cảnh của mình và nhờ thầy cô giúp xác định phần cần ưu tiên.',
    'Nếu việc học đang khiến sinh hoạt của bạn bị ảnh hưởng hoặc bạn thấy khó tự xoay xở, hãy tìm một người lớn tin cậy để cùng bàn cách hỗ trợ.'
  ]},
  { id:'ban-be', title:'Ở giữa lớp, vẫn thấy một mình', category:'Bạn bè & kết nối', description:'Về những khoảng cách không thể đo bằng chỗ ngồi.', theme:'lilac', paragraphs:[
    'Một lớp học đông không có nghĩa ai cũng dễ tìm được người để trò chuyện. Bạn không cần làm quen với tất cả mọi người ngay. Một cuộc nói chuyện nhỏ, vào lúc bạn thấy phù hợp, cũng có thể là điểm bắt đầu.',
    'Bạn có thể thử hỏi một bạn về bài học, cùng tham gia một hoạt động mình thích, hoặc nói với người đáng tin rằng mình đang thấy khó hòa nhập. Không có một cách duy nhất đúng cho mọi người.',
    'Nếu có chuyện bị cô lập, trêu chọc hoặc đe dọa, bạn không phải tự xử lý một mình. Hãy tìm người lớn tin cậy trong gia đình hoặc nhà trường.'
  ]},
  { id:'ban-than', title:'Học cách đứng về phía mình', category:'Hiểu bản thân', description:'Thử nói với mình như với một người bạn thân.', theme:'gold', paragraphs:[
    'Sau một sai sót, lời nói trong đầu đôi khi rất khắt khe. Thử dừng lại và tự hỏi: nếu một người bạn đang ở tình huống này, mình sẽ nói điều gì với bạn ấy?',
    'Bạn có thể ghi lại việc đã xảy ra bằng lời cụ thể, tách nó khỏi những kết luận về con người mình. “Mình chưa làm tốt bài này” khác với việc coi đó là toàn bộ giá trị của bản thân.',
    'Những gợi ý ở đây chỉ là điểm bắt đầu cho một cuộc trò chuyện với chính mình. Nếu điều đang trải qua quá khó, tìm người hỗ trợ là một lựa chọn bạn có thể cân nhắc.'
  ]},
] as const

export const homepageSamples = import.meta.env.DEV ? legacy : []
