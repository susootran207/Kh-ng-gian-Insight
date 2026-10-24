import { useEffect, useRef, useState } from 'react'
import { Arrow, LeafMark, SmallFlower } from './components/Icons'
import { GardenAtmosphere } from './components/GardenAtmosphere'
import { CatGarden } from './components/CatGarden'
import { LanternGarden } from './components/LanternGarden'
import { quotes, samples, seasons } from './content'

const navigation=[['chuyen-de','Chuyên đề tuần'],['nen-tang','Về khu vườn'],['dong-chay','Dòng chảy'],['bai-viet','Góc đọc']] as const
function App(){
  const [menu,setMenu]=useState(false)
  const [motionOff,setMotionOff]=useState(false)
  const [quote,setQuote]=useState(()=>Math.floor(Math.random()*quotes.length))
  const [season,setSeason]=useState(0)
  const [sample,setSample]=useState<string|null>(null)
  const [weekly,setWeekly]=useState(false)
  const menuButton=useRef<HTMLButtonElement>(null)
  const preview=useRef<HTMLDivElement>(null)
  const sampleTrigger=useRef<HTMLButtonElement|null>(null)
  useEffect(()=>{document.documentElement.dataset.motion=motionOff?'off':'on';return()=>{delete document.documentElement.dataset.motion}},[motionOff])
  useEffect(()=>{
    const clear=()=>{if(window.innerWidth>=1100)setMenu(false)}
    window.addEventListener('resize',clear)
    return()=>window.removeEventListener('resize',clear)
  },[])
  useEffect(()=>{if(sample)preview.current?.focus({preventScroll:true})},[sample])
  const article=samples.find(item=>item.id===sample)
  const openSample=(id:string,button:HTMLButtonElement)=>{
    sampleTrigger.current=button
    setSample(id)
    requestAnimationFrame(()=>preview.current?.scrollIntoView({behavior:motionOff||matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'nearest'}))
  }
  return <>
    <GardenAtmosphere motionOff={motionOff}/>
    <a className="skip-link" href="#noi-dung">Đến nội dung chính</a>
    <header className="site-header" id="dau-trang" onKeyDown={e=>{if(e.key==='Escape' && menu){setMenu(false);menuButton.current?.focus()}}}>
      <div className="header-inner">
        <a className="brand" href="#dau-trang" aria-label="Không Gian Nội Tâm — về đầu trang"><LeafMark/><span>Không Gian<br/>Nội Tâm<span className="brand-period">.</span></span></a>
        <button ref={menuButton} className="menu-button" aria-expanded={menu} aria-controls="main-navigation" onClick={()=>setMenu(value=>!value)}>{menu?'Đóng':'Menu'}<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d={menu?'m6 6 12 12M6 18 18 6':'M4 8h16M4 16h16'}/></svg></button>
        <nav id="main-navigation" aria-label="Điều hướng chính" className={menu?'navigation open':'navigation'}>
          {navigation.map(([id,label])=><a key={id} href={`#${id}`} onClick={()=>setMenu(false)}>{label}</a>)}
          <a className="nav-reflection" href="#tam-tinh" onClick={()=>setMenu(false)}>Góc tâm tình <Arrow diagonal/></a>
        </nav>
      </div>
    </header>
    <main id="noi-dung">
      <section className="hero page-width" aria-labelledby="hero-title">
        <div className="hero-copy">
          <h1 id="hero-title">Một khoảng vườn<br/>cho riêng bạn.</h1>
          <p className="hero-description">Không gian tâm lý học đường để bạn dừng lại,<br className="desktop-break"/> hiểu mình hơn và lớn lên theo cách của mình.</p>
          <a className="button primary-button" href="#chuyen-de">Ghé vào khu vườn <Arrow/></a>
          <div className="hero-note"><SmallFlower/><p>Không cần phải ổn mọi lúc.<br/><span>Ở đây, cứ là bạn thôi.</span></p></div>
        </div>
        <CatGarden/>
      </section>
      <div className="garden-bottom page-width"><span>Một nơi để đọc, để thở, để là mình.</span><button className="motion-button" aria-pressed={motionOff} onClick={()=>setMotionOff(v=>!v)}><span className="motion-icon" aria-hidden="true"/>{motionOff?'Bật chuyển động':'Giảm chuyển động'}</button></div>
      <section className="quote-section page-width" aria-label="Một lời nhắn cho bạn">
        <span className="quote-mark" aria-hidden="true">“</span>
        <div className="quote-content"><blockquote aria-live="polite">{quotes[quote]}</blockquote><p>Lời nhắn từ Không Gian Nội Tâm</p></div>
        <button className="round-button" aria-label="Một lời nhắn khác" onClick={()=>setQuote(i=>(i+1+Math.floor(Math.random()*(quotes.length-1)))%quotes.length)}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d="M19 8a8 8 0 1 0 1 8M19 3v5h-5"/></svg></button>
      </section>
      <section id="chuyen-de" className="weekly section-anchor">
        <div className="page-width weekly-grid">
          <div className="weekly-art" aria-hidden="true"><div className="window-arch"><div className="window-moon"/><div className="window-hill"/><div className="window-hill second"/><div className="window-mullion"/></div><div className="book book-one"/><div className="book book-two"/><div className="teacup"><span/></div><div className="table-line"/></div>
          <div className="weekly-copy">
            <h2>Chuyên đề tuần này</h2>
            <h3>Đêm dài,<br/>mình chưa ngủ.</h3>
            <p>Khi người đã mệt mà tâm trí vẫn còn thức. Một lời mời tìm hiểu về những đêm trằn trọc giữa mùa bài vở.</p>
            <div className="weekly-meta"><span className="draft-label">Bản nháp minh họa</span><span>Giấc ngủ & nghỉ ngơi</span></div>
            <button className="text-link" aria-expanded={weekly} aria-controls="weekly-excerpt" onClick={()=>setWeekly(v=>!v)}>{weekly?'Khép lại chuyên đề':'Mở một trang đọc'}<Arrow/></button>
          </div>
          {weekly&&<div className="weekly-excerpt" id="weekly-excerpt"><h3>Một khoảng dừng trước giấc ngủ</h3><p>Đôi khi bạn đã nằm xuống nhưng vẫn nghĩ về bài kiểm tra, một cuộc nói chuyện hoặc việc chưa xong. Bạn có thể thử ghi điều đang bận lòng ra giấy, để dành một lúc khác nhìn lại.</p><p>Chọn một việc nhẹ nhàng trước khi ngủ và xem điều gì phù hợp với mình. Nếu khó ngủ thường xuyên hoặc ảnh hưởng đến sinh hoạt, hãy trao đổi với người lớn tin cậy hoặc người có chuyên môn.</p><p className="sample-notice">Đoạn mẫu để duyệt giao diện, chưa kiểm chứng nguồn hoặc được chuyên gia rà soát. Không dùng thay cho tư vấn cá nhân.</p></div>}
        </div>
      </section>
      <section id="nen-tang" className="about page-width section-anchor">
        <div className="about-heading"><LeafMark/><h2>Mỗi người<br/>một mùa nở hoa.</h2></div>
        <div className="about-copy"><p className="large-prose">Không Gian Nội Tâm bắt đầu từ một điều nhỏ: ai cũng cần một nơi để hiểu những gì đang diễn ra bên trong mình.</p><p>Ở đây, chuyện học hành, bạn bè, gia đình và những ngày khó gọi tên được kể bằng ngôn ngữ gần gũi. Không phán xét. Không bắt bạn phải “tích cực lên”.</p><p>Chúng mình hướng đến nội dung có nguồn, được rà soát cẩn thận và tôn trọng nhịp riêng của mỗi người. Những trang đọc hiện tại là bản nháp để xem trước, chưa được chuyên gia duyệt.</p><a className="text-link" href="#bai-viet">Tìm một trang dành cho bạn <Arrow/></a></div>
      </section>
      <section id="dong-chay" className="timeline-section section-anchor">
        <div className="page-width"><div className="section-intro"><h2>Một năm học,<br/>nhiều mùa tâm trạng.</h2><p>Có những điều đến theo mùa.<br/>Chọn một chặng để ngồi lại cùng mình.</p></div>
          <ol className="timeline">{seasons.map((item,i)=><li key={item.title}><button aria-expanded={season===i} aria-controls={`season-${i}`} className={season===i?'season-button selected':'season-button'} onClick={()=>setSeason(i)}><span className="timeline-node" aria-hidden="true"><SmallFlower/></span><span>{item.title}</span></button></li>)}</ol>
          <div className={`season-panel season-${season}`} id={`season-${season}`} role="region" aria-label={seasons[season].title}><div><span className="season-title">{seasons[season].title}</span><h3>{seasons[season].subtitle}</h3></div><div><p>{seasons[season].text}</p><p className="season-note">{seasons[season].note}</p></div></div>
        </div>
      </section>
      <section id="bai-viet" className="reading page-width section-anchor"><div className="section-intro"><h2>Những trang nhỏ,<br/>để hiểu mình hơn.</h2><p>Ba bản nháp minh họa.<br/>Bạn có thể mở và đọc thử ngay tại đây.</p></div>
        <div className="reading-layout">{samples.map((item,i)=><article key={item.id} className={`reading-item reading-${item.theme}`}><div className={`article-art art-${i}`} aria-hidden="true">{i===0?<><div className="art-sun"/><div className="art-notebook"><i/><i/><i/></div><div className="art-pencil"/></>:i===1?<><div className="art-hill"/><div className="art-flower"><SmallFlower/></div><div className="art-flower second"><SmallFlower/></div></>:<><div className="art-orbit"/><div className="art-stem"><LeafMark/></div><div className="art-sun"/></>}</div><div className="article-copy"><span className="draft-label">Bản nháp</span><h3>{item.title}</h3><p>{item.description}</p><div className="article-bottom"><span>{item.category}</span><button className="article-open" aria-label={`Đọc thử: ${item.title}`} aria-expanded={sample===item.id} aria-controls="sample-preview" onClick={e=>openSample(item.id,e.currentTarget)}><Arrow diagonal/></button></div></div></article>)}</div>
        {article&&<div id="sample-preview" ref={preview} className="sample-preview" tabIndex={-1}><div className="sample-toolbar"><span className="draft-label">Bản nháp minh họa · Chưa duyệt</span><button className="text-button" onClick={()=>{setSample(null);sampleTrigger.current?.focus({preventScroll:true})}}>Đóng bản đọc <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="m5 5 10 10M5 15 15 5"/></svg></button></div><h3>{article.title}</h3>{article.paragraphs.map(p=><p key={p}>{p}</p>)}<p className="sample-notice">Nội dung mẫu để duyệt giao diện. Chưa kiểm chứng nguồn, chưa được chuyên gia rà soát và chưa phải bài viết xuất bản.</p></div>}
      </section>
      <LanternGarden/>
    </main>
    <footer className="site-footer page-width"><div className="footer-top"><a className="brand" href="#dau-trang"><LeafMark/><span>Không Gian<br/>Nội Tâm.</span></a><p>Mong bạn tìm được một khoảng bình yên,<br/>và một chút hiểu mình, trước khi rời vườn.</p><a className="back-top text-link" href="#dau-trang">Về đầu trang <Arrow diagonal/></a></div><div className="footer-bottom"><p>Prototype trang chủ · Nội dung minh họa, chưa duyệt.</p><details className="privacy-details"><summary>Quyền riêng tư</summary><p>Không có tài khoản, quảng cáo hay công cụ theo dõi. Nội dung bạn viết chỉ có trong bộ nhớ của phiên, không được gửi đến máy chủ hoặc lưu vào bộ nhớ bền vững. Thả đèn hoặc rời trang sẽ xóa ô nhập. Việc này không bảo đảm xóa vật lý mọi bản sao trong bộ nhớ trình duyệt.</p></details></div><p className="support-note">Thông tin trên trang không thay thế chẩn đoán hoặc điều trị. Nếu bạn không an toàn, hãy tìm ngay một người lớn tin cậy ở gần hoặc dịch vụ cấp cứu tại nơi bạn sống.</p></footer>
  </>
}
export default App
