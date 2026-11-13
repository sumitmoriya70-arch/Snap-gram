import { useMemo, useState } from 'react'
import {
  House, Search, Compass, Clapperboard, Send, Heart, PlusSquare, Menu,
  MessageCircle, Bookmark, MoreHorizontal, X, ImagePlus, Smile, ArrowLeft,
  Grid3X3, BookmarkCheck, UserRound, Settings, LogOut, Bell, Check,
  ChevronRight, Sparkles, Camera, Hash, ArrowUpRight, CircleHelp,
} from 'lucide-react'

const me = { name: 'sumit.moriya', fullName: 'Sumit Moriya', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=faces' }
const initialStories = [
  { name: 'Your story', avatar: me.avatar, own: true },
  { name: 'jessica.lee', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=faces' },
  { name: 'marco.jpg', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&h=120&fit=crop&crop=faces' },
  { name: 'sophia.k', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=120&h=120&fit=crop&crop=faces' },
  { name: 'alex.rivera', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=faces' },
  { name: 'nina.jpeg', avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=120&h=120&fit=crop&crop=faces' },
  { name: 'kai.travels', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&h=120&fit=crop&crop=faces' },
]
const starterPosts = [
  { id: 1, user: 'jessica.lee', avatar: initialStories[1].avatar, location: 'Big Sur, California', image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1100&auto=format&fit=crop&q=85', caption: 'Somewhere between the mountains and the sea. I think I’ll stay a little longer. 🌿', likes: 2841, liked: false, saved: false, time: '2 hours ago', comments: [{ user: 'marco.jpg', text: 'This looks unreal ✨' }, { user: 'sophia.k', text: 'Need to go here!' }] },
  { id: 2, user: 'marco.jpg', avatar: initialStories[2].avatar, location: 'Kyoto, Japan', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1100&auto=format&fit=crop&q=85', caption: 'Getting lost in little streets is always the best part of the trip. ⛩️', likes: 1932, liked: false, saved: false, time: '5 hours ago', comments: [{ user: 'jessica.lee', text: 'Adding this to my list' }] },
  { id: 3, user: 'sophia.k', avatar: initialStories[3].avatar, location: 'Copenhagen, Denmark', image: 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?w=1100&auto=format&fit=crop&q=85', caption: 'Slow mornings, good coffee, and no plans. ☕', likes: 1207, liked: false, saved: false, time: '1 day ago', comments: [] },
]
const suggestions = [
  { name: 'alex.rivera', detail: 'Followed by jessica.lee', avatar: initialStories[4].avatar },
  { name: 'nina.jpeg', detail: 'New to Snapgram', avatar: initialStories[5].avatar },
  { name: 'kai.travels', detail: 'Followed by marco.jpg', avatar: initialStories[6].avatar },
]
const navItems = [
  { id: 'Home', icon: House }, { id: 'Search', icon: Search }, { id: 'Explore', icon: Compass },
  { id: 'Reels', icon: Clapperboard }, { id: 'Messages', icon: Send }, { id: 'Notifications', icon: Heart },
  { id: 'Create', icon: PlusSquare }, { id: 'Profile', icon: UserRound },
]
const exploreImages = [
  'photo-1518837695005-2083093ee35b', 'photo-1500530855697-b586d89ba3ee', 'photo-1470252649378-9c29740c9fa8',
  'photo-1519681393784-d120267933ba', 'photo-1470770841072-f978cf4d019e', 'photo-1493246507139-91e8fad9978e',
  'photo-1513622470522-26c3c8a854bc', 'photo-1493976040374-85c8e12f0c0e', 'photo-1500534623283-312aade485b7',
  'photo-1507525428034-b723cf961d3e', 'photo-1518837695005-2083093ee35b', 'photo-1441974231531-c6227db76b6e',
]
const imgUrl = (id, w = 700) => `https://images.unsplash.com/${id}?w=${w}&auto=format&fit=crop&q=80`

function Avatar({ src, size = 'h-10 w-10', ring = false, onClick }) {
  return <img onClick={onClick} className={`${size} rounded-full object-cover ${ring ? 'story-ring' : ''} ${onClick ? 'cursor-pointer' : ''}`} src={src} alt="User avatar" />
}

function Sidebar({ active, setActive, openCreate }) {
  return <aside className="fixed inset-y-0 left-0 z-30 hidden w-[244px] border-r border-line bg-ink px-5 py-8 lg:block xl:w-[260px]">
    <button onClick={() => setActive('Home')} className="mb-10 px-2 font-display text-[28px] font-bold tracking-tight">snap<span className="text-violet">gram</span><span className="ml-1 inline-block h-1.5 w-1.5 rounded-full bg-pink" /></button>
    <nav className="space-y-2">
      {navItems.map(({ id, icon: Icon }) => <button key={id} onClick={() => id === 'Create' ? openCreate() : setActive(id)} className={`group flex w-full items-center gap-4 rounded-xl px-3 py-3.5 text-left transition hover:bg-white/[0.06] ${active === id ? 'font-bold text-white' : 'text-white/75'}`}><Icon size={22} strokeWidth={active === id ? 2.4 : 1.8} className="transition group-hover:scale-105" /><span>{id}</span>{id === 'Messages' && <span className="ml-auto h-2 w-2 rounded-full bg-violet" />}</button>)}
      <button onClick={() => setActive('Profile')} className={`flex w-full items-center gap-4 rounded-xl px-3 py-3.5 text-left transition hover:bg-white/[0.06] ${active === 'Profile' ? 'font-bold' : 'text-white/75'}`}><Avatar src={me.avatar} size="h-[22px] w-[22px]" /><span>Profile</span></button>
    </nav>
    <button className="absolute bottom-8 left-5 flex items-center gap-4 rounded-xl px-3 py-3 text-white/75 transition hover:bg-white/[0.06]"><Menu size={22} /><span>More</span></button>
  </aside>
}

function MobileHeader({ openCreate, setActive }) {
  return <header className="sticky top-0 z-30 flex h-[60px] items-center justify-between border-b border-line bg-ink/90 px-4 backdrop-blur-xl lg:hidden"><button onClick={() => setActive('Home')} className="font-display text-[24px] font-bold tracking-tight">snap<span className="text-violet">gram</span><span className="text-pink">.</span></button><div className="flex items-center gap-5"><button aria-label="Notifications" onClick={() => setActive('Notifications')}><Heart size={23} /></button><button aria-label="Create post" onClick={openCreate}><PlusSquare size={23} /></button></div></header>
}

function BottomNav({ active, setActive, openCreate }) {
  const items = [{ id: 'Home', icon: House }, { id: 'Search', icon: Search }, { id: 'Create', icon: PlusSquare }, { id: 'Reels', icon: Clapperboard }, { id: 'Profile', icon: null }]
  return <nav className="fixed inset-x-0 bottom-0 z-30 flex h-[62px] items-center justify-around border-t border-line bg-ink/95 px-2 backdrop-blur-xl lg:hidden">{items.map(({ id, icon: Icon }) => <button key={id} aria-label={id} onClick={() => id === 'Create' ? openCreate() : setActive(id)} className={`grid h-11 w-12 place-items-center transition ${active === id ? 'text-white' : 'text-white/65'}`}>{Icon ? <Icon size={23} strokeWidth={active === id ? 2.5 : 1.8} /> : <Avatar src={me.avatar} size={`h-6 w-6 ${active === id ? 'ring-2 ring-white ring-offset-2 ring-offset-ink' : ''}`} />}</button>)}</nav>
}

function Stories({ onStory }) {
  const [seen, setSeen] = useState([])
  return <section className="mb-6 rounded-2xl border border-line bg-panel/70 px-4 py-4 sm:px-5"><div className="no-scrollbar flex gap-4 overflow-x-auto sm:gap-5">{initialStories.map((story, i) => <button key={story.name} onClick={() => { setSeen((s) => [...new Set([...s, story.name])]); onStory(story) }} className="flex w-[58px] shrink-0 flex-col items-center gap-2 sm:w-[64px]"><span className={`rounded-full ${story.own || seen.includes(story.name) ? 'bg-[#34343a] p-[2px]' : 'story-ring'}`}><Avatar src={story.avatar} size="h-[52px] w-[52px] border-2 border-panel" /></span><span className="w-full truncate text-center text-[11px] text-white/75">{story.own ? 'Your story' : story.name}</span></button>)}</div></section>
}

function PostCard({ post, onLike, onComment, onSave, onProfile }) {
  const [comment, setComment] = useState('')
  const [showAll, setShowAll] = useState(false)
  const [hearted, setHearted] = useState(false)
  const submit = (e) => { e.preventDefault(); const text = comment.trim(); if (!text) return; onComment(post.id, text); setComment('') }
  return <article className="mb-6 overflow-hidden rounded-2xl border border-line bg-panel/70">
    <div className="flex items-center gap-3 px-4 py-3.5"><Avatar src={post.avatar} size="h-10 w-10" onClick={() => onProfile(post.user)} /><div className="min-w-0 flex-1 text-left"><button onClick={() => onProfile(post.user)} className="block text-sm font-semibold hover:text-white/75">{post.user}</button><span className="text-xs text-white/50">{post.location}</span></div><button aria-label="Post options" className="text-white/70 hover:text-white"><MoreHorizontal size={22} /></button></div>
    <div className="relative bg-black"><img onDoubleClick={() => { if (!post.liked) onLike(post.id); setHearted(true); setTimeout(() => setHearted(false), 700) }} src={post.image} alt={`Photo posted by ${post.user}`} className="aspect-[4/4.15] max-h-[690px] w-full cursor-pointer object-cover" />{hearted && <Heart className="animate-pop absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 fill-white text-white drop-shadow-lg" size={86} />}</div>
    <div className="px-4 pb-4 pt-3.5"><div className="flex items-center gap-4"><button aria-label={post.liked ? 'Unlike post' : 'Like post'} onClick={() => onLike(post.id)} className={`transition hover:scale-110 ${post.liked ? 'text-pink' : 'text-white'}`}><Heart size={24} className={post.liked ? 'fill-pink' : ''} /></button><button aria-label="Comment" className="text-white transition hover:scale-110" onClick={() => document.getElementById(`comment-${post.id}`)?.focus()}><MessageCircle size={23} /></button><button aria-label="Share post" onClick={() => { navigator.clipboard?.writeText(window.location.href); alert('Link copied to clipboard!') }} className="text-white transition hover:scale-110"><Send size={22} /></button><button aria-label={post.saved ? 'Remove bookmark' : 'Save post'} onClick={() => onSave(post.id)} className={`ml-auto transition hover:scale-110 ${post.saved ? 'text-violet' : 'text-white'}`}><Bookmark size={23} className={post.saved ? 'fill-violet' : ''} /></button></div>
    <p className="mt-3 text-sm font-semibold">{post.likes.toLocaleString()} likes</p><p className="mt-2 text-sm leading-relaxed"><button onClick={() => onProfile(post.user)} className="mr-2 font-semibold">{post.user}</button><span className="text-white/85">{post.caption}</span></p>
    {post.comments.length > 0 && <div className="mt-2 space-y-1.5">{post.comments.length > 2 && !showAll && <button onClick={() => setShowAll(true)} className="text-sm text-muted">View all {post.comments.length} comments</button>}{(showAll ? post.comments : post.comments.slice(-2)).map((c, i) => <p key={`${c.user}-${i}`} className="text-sm"><span className="mr-2 font-semibold">{c.user}</span><span className="text-white/80">{c.text}</span></p>)}</div>}
    <p className="mt-2 text-[10px] uppercase tracking-wider text-muted">{post.time}</p><form onSubmit={submit} className="mt-3 flex items-center gap-3 border-t border-line pt-3"><Smile size={19} className="shrink-0 text-white/60" /><input id={`comment-${post.id}`} value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Add a comment..." className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted" /><button disabled={!comment.trim()} className="text-sm font-semibold text-violet transition hover:text-violet/80 disabled:opacity-40">Post</button></form></div>
  </article>
}

function Suggestions({ onProfile }) {
  const [following, setFollowing] = useState([])
  return <aside className="hidden w-[290px] shrink-0 pt-3 xl:block"><div className="flex items-center gap-3"><Avatar src={me.avatar} size="h-12 w-12" onClick={() => onProfile(me.name)} /><div className="min-w-0 flex-1"><p className="text-sm font-semibold">{me.name}</p><p className="text-sm text-muted">{me.fullName}</p></div><button onClick={() => onProfile(me.name)} className="text-xs font-semibold text-violet hover:text-violet/75">Switch</button></div><div className="mt-8 flex items-center justify-between"><span className="text-sm font-semibold text-muted">Suggestions for you</span><button className="text-xs font-semibold hover:text-muted">See All</button></div><div className="mt-4 space-y-4">{suggestions.map((s) => <div className="flex items-center gap-3" key={s.name}><Avatar src={s.avatar} size="h-9 w-9" onClick={() => onProfile(s.name)} /><div className="min-w-0 flex-1"><button onClick={() => onProfile(s.name)} className="block text-sm font-semibold">{s.name}</button><p className="truncate text-xs text-muted">{s.detail}</p></div><button onClick={() => setFollowing((f) => f.includes(s.name) ? f.filter((n) => n !== s.name) : [...f, s.name])} className="text-xs font-semibold text-violet hover:text-white">{following.includes(s.name) ? 'Following' : 'Follow'}</button></div>)}</div><p className="mt-9 text-[11px] leading-5 text-[#626269]">About · Help · Press · API · Jobs · Privacy · Terms · Locations<br />© 2025 SNAPGRAM FROM THE INTERNET</p></aside>
}

function HomePage({ posts, setPosts, onProfile, onStory }) {
  const like = (id) => setPosts((list) => list.map((p) => p.id === id ? { ...p, liked: !p.liked, likes: p.likes + (p.liked ? -1 : 1) } : p))
  const comment = (id, text) => setPosts((list) => list.map((p) => p.id === id ? { ...p, comments: [...p.comments, { user: me.name, text }] } : p))
  const save = (id) => setPosts((list) => list.map((p) => p.id === id ? { ...p, saved: !p.saved } : p))
  return <div className="mx-auto flex max-w-[1050px] gap-10 px-4 pb-24 pt-5 sm:px-6 lg:pb-10 lg:pt-8"><main className="mx-auto w-full max-w-[590px] lg:mx-0"><Stories onStory={onStory} />{posts.length ? posts.map((post) => <PostCard key={post.id} post={post} onLike={like} onComment={comment} onSave={save} onProfile={onProfile} />) : <div className="rounded-2xl border border-line p-10 text-center text-muted">No posts yet. Follow some creators or share your first moment!</div>}</main><Suggestions onProfile={onProfile} /></div>
}

function ProfilePage({ posts, onCreate, selectedProfile, setSelectedProfile }) {
  const own = !selectedProfile || selectedProfile === me.name
  const user = own ? me : { name: selectedProfile, fullName: selectedProfile.replace('.', ' ') }
  const [tab, setTab] = useState('Posts')
  const [following, setFollowing] = useState(false)
  const profilePosts = own ? posts.filter((p) => p.user === me.name) : posts.filter((p) => p.user === selectedProfile)
  const tiles = profilePosts.length ? profilePosts : exploreImages.slice(0, 6).map((id, i) => ({ id: `tile-${i}`, image: imgUrl(id), likes: 120 + i * 87, comments: [] }))
  return <section className="mx-auto max-w-[940px] px-5 pb-24 pt-8 sm:px-10 lg:pb-12"><div className="flex flex-col gap-7 border-b border-line pb-8 sm:flex-row sm:items-center sm:gap-12 sm:px-8 sm:pb-10"><Avatar src={own ? me.avatar : (initialStories.find((s) => s.name === user.name)?.avatar || me.avatar)} size="h-24 w-24 sm:h-36 sm:w-36" /><div className="flex-1"><div className="flex flex-wrap items-center gap-4"><h1 className="font-display text-2xl">{user.name}</h1>{own ? <button onClick={onCreate} className="rounded-lg bg-white/[0.09] px-4 py-2 text-sm font-semibold transition hover:bg-white/[0.15]">Edit profile</button> : <button onClick={() => setFollowing(!following)} className={`rounded-lg px-5 py-2 text-sm font-semibold ${following ? 'bg-white/10' : 'bg-violet'} transition hover:opacity-85`}>{following ? 'Following' : 'Follow'}</button>}<button aria-label="Profile options" className="text-white/80"><Settings size={20} /></button></div><div className="mt-6 hidden gap-10 text-sm sm:flex"><span><b>{own ? profilePosts.length : tiles.length}</b> posts</span><span><b>{own ? '1,284' : '8,421'}</b> followers</span><span><b>{own ? '892' : '614'}</b> following</span></div><div className="mt-5 text-sm"><p className="font-semibold">{user.fullName}</p><p className="mt-1 text-white/75">Collecting moments, not things ✨<br />🌍 Somewhere between here & there</p><p className="mt-1 font-semibold text-violet">snapgram.com/{user.name}</p></div></div><div className="flex justify-around border-y border-line py-3 text-xs sm:hidden"><span><b>{tiles.length}</b><br />posts</span><span><b>1,284</b><br />followers</span><span><b>892</b><br />following</span></div></div>
    <div className="flex justify-center gap-12 border-b border-line"><button onClick={() => setTab('Posts')} className={`flex items-center gap-2 border-t py-4 text-[11px] font-semibold uppercase tracking-[.18em] ${tab === 'Posts' ? 'border-white text-white' : 'border-transparent text-muted'}`}><Grid3X3 size={14} /> Posts</button><button onClick={() => setTab('Saved')} className={`flex items-center gap-2 border-t py-4 text-[11px] font-semibold uppercase tracking-[.18em] ${tab === 'Saved' ? 'border-white text-white' : 'border-transparent text-muted'}`}><BookmarkCheck size={14} /> Saved</button><button onClick={() => setTab('Tagged')} className={`flex items-center gap-2 border-t py-4 text-[11px] font-semibold uppercase tracking-[.18em] ${tab === 'Tagged' ? 'border-white text-white' : 'border-transparent text-muted'}`}><UserRound size={14} /> Tagged</button></div>
    <div className="grid grid-cols-3 gap-1.5 pt-4 sm:gap-4">{(tab === 'Saved' ? posts.filter((p) => p.saved) : tab === 'Tagged' ? [] : tiles).map((p) => <button onClick={() => setSelectedProfile(user.name)} key={p.id} className="group relative aspect-square overflow-hidden bg-panel"><img className="h-full w-full object-cover transition duration-500 group-hover:scale-105" src={p.image} alt="Profile post" /><span className="absolute inset-0 flex items-center justify-center gap-5 bg-black/0 text-white opacity-0 transition group-hover:bg-black/40 group-hover:opacity-100"><span className="flex items-center gap-1 text-sm font-semibold"><Heart size={18} fill="white" />{p.likes}</span><span className="flex items-center gap-1 text-sm font-semibold"><MessageCircle size={18} fill="white" />{p.comments?.length || 0}</span></span></button>)}</div>{(tab === 'Tagged' || (tab === 'Saved' && posts.every((p) => !p.saved))) && <div className="py-16 text-center text-sm text-muted">Nothing to see here yet.</div>}
  </section>
}

function ExplorePage({ posts, onProfile }) {
  const [query, setQuery] = useState('')
  const all = [...posts, ...exploreImages.map((id, i) => ({ id: `explore-${i}`, image: imgUrl(id), user: suggestions[i % suggestions.length].name, likes: 400 + i * 31, comments: [] }))]
  const filtered = all.filter((p) => !query || p.user.toLowerCase().includes(query.toLowerCase()) || p.caption?.toLowerCase().includes(query.toLowerCase()))
  return <section className="mx-auto max-w-[940px] px-4 pb-24 pt-6 sm:px-8"><div className="mx-auto mb-7 flex max-w-[480px] items-center gap-3 rounded-xl bg-[#1c1c20] px-4 py-3"><Search size={19} className="text-muted" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search people, places, or tags" className="w-full bg-transparent text-sm outline-none placeholder:text-muted" /><Hash size={17} className="text-muted" /></div>{filtered.length ? <div className="grid grid-cols-3 gap-1.5 sm:gap-4">{filtered.map((p) => <button onClick={() => onProfile(p.user)} key={p.id} className="group relative aspect-square overflow-hidden bg-panel"><img src={p.image} alt={`Photo by ${p.user}`} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /><div className="absolute inset-0 flex items-center justify-center gap-5 bg-black/0 opacity-0 transition group-hover:bg-black/40 group-hover:opacity-100"><span className="flex items-center gap-1 text-sm font-bold"><Heart size={18} fill="white" />{p.likes}</span><span className="flex items-center gap-1 text-sm font-bold"><MessageCircle size={18} fill="white" />{p.comments?.length || 0}</span></div></button>)}</div> : <p className="py-16 text-center text-muted">No results for “{query}”</p>}</section>
}

function NotificationsPage({ onProfile }) {
  const [items, setItems] = useState([
    { user: 'jessica.lee', action: 'liked your photo.', time: '12m', avatar: initialStories[1].avatar, follow: false },
    { user: 'marco.jpg', action: 'started following you.', time: '1h', avatar: initialStories[2].avatar, follow: true },
    { user: 'sophia.k', action: 'mentioned you in a comment: “we need to go!”', time: '3h', avatar: initialStories[3].avatar, follow: false },
    { user: 'alex.rivera', action: 'and 18 others liked your photo.', time: '1d', avatar: initialStories[4].avatar, follow: false },
  ])
  return <section className="mx-auto max-w-[650px] px-5 pb-24 pt-8"><h1 className="mb-7 font-display text-2xl font-semibold">Notifications</h1><h2 className="mb-4 text-sm font-semibold text-muted">Today</h2>{items.map((item, i) => <div key={i} className="flex items-center gap-3 border-b border-line py-4"><Avatar src={item.avatar} size="h-11 w-11" onClick={() => onProfile(item.user)} /><p className="flex-1 text-sm"><button onClick={() => onProfile(item.user)} className="font-semibold">{item.user}</button> {item.action} <span className="text-muted">{item.time}</span></p>{item.follow ? <button onClick={() => setItems((list) => list.map((x, n) => n === i ? { ...x, follow: false, action: 'is now following you.' } : x))} className={`rounded-lg px-4 py-2 text-xs font-semibold ${item.action.startsWith('is now') ? 'bg-white/10' : 'bg-violet'}`}>{item.action.startsWith('is now') ? 'Following' : 'Follow'}</button> : <img src={imgUrl('photo-1470770841072-f978cf4d019e', 100)} className="h-11 w-11 rounded-lg object-cover" alt="Liked post" />}</div>)}<p className="mt-8 text-center text-xs text-muted">You’re all caught up ✨</p></section>
}

function MessagesPage({ onProfile }) {
  const [selected, setSelected] = useState(suggestions[0].name)
  const [text, setText] = useState('')
  const [messages, setMessages] = useState([{ from: 'them', text: 'Hey! I loved your latest post 🌿' }, { from: 'me', text: 'Thank you! This place was magical.' }])
  const people = [suggestions[0], suggestions[1], suggestions[2]]
  return <section className="mx-auto flex h-[calc(100vh-130px)] max-w-[900px] overflow-hidden rounded-2xl border border-line lg:mt-8 lg:h-[calc(100vh-65px)]"><aside className="w-[280px] shrink-0 border-r border-line sm:w-[330px]"><div className="flex items-center justify-between border-b border-line p-5"><p className="font-semibold">{me.name}</p><button aria-label="New message"><PlusSquare size={20} /></button></div><div className="p-4"><p className="mb-4 text-sm font-semibold">Messages</p>{people.map((p) => <button key={p.name} onClick={() => setSelected(p.name)} className={`flex w-full items-center gap-3 rounded-xl p-3 text-left ${selected === p.name ? 'bg-white/[0.08]' : 'hover:bg-white/[0.04]'}`}><Avatar src={p.avatar} size="h-11 w-11" /><div className="min-w-0"><p className="text-sm font-semibold">{p.name}</p><p className="truncate text-xs text-muted">Tap to chat</p></div></button>)}</div></aside><div className="flex min-w-0 flex-1 flex-col"><button onClick={() => onProfile(selected)} className="flex items-center gap-3 border-b border-line p-4 text-left"><Avatar src={people.find((p) => p.name === selected)?.avatar || people[0].avatar} size="h-9 w-9" /><span className="text-sm font-semibold">{selected}</span></button><div className="flex flex-1 flex-col justify-end gap-3 overflow-y-auto p-4">{messages.map((m, i) => <p key={i} className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${m.from === 'me' ? 'ml-auto bg-violet' : 'bg-white/[0.09]'}`}>{m.text}</p>)}</div><form onSubmit={(e) => { e.preventDefault(); if (!text.trim()) return; setMessages([...messages, { from: 'me', text: text.trim() }]); setText('') }} className="m-4 flex gap-2 rounded-full border border-line px-4 py-2"><input value={text} onChange={(e) => setText(e.target.value)} placeholder="Message..." className="min-w-0 flex-1 bg-transparent text-sm outline-none" /><button disabled={!text.trim()} className="text-sm font-semibold text-violet disabled:opacity-40">Send</button></form></div></section>
}

function ReelPage({ posts }) {
  const reelPosts = posts.length ? posts : starterPosts
  const [current, setCurrent] = useState(0)
  const p = reelPosts[current % reelPosts.length]
  return <section className="mx-auto flex max-w-[760px] justify-center px-4 pb-24 pt-5"><div className="relative h-[min(76vh,760px)] w-full max-w-[430px] overflow-hidden rounded-2xl bg-panel"><img src={p.image} alt="Reel" className="h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20" /><button onClick={() => setCurrent((current + 1) % reelPosts.length)} className="absolute right-4 top-4 rounded-full bg-black/30 p-2"><ArrowUpRight size={20} /></button><div className="absolute bottom-5 left-5 right-5 text-sm"><div className="mb-3 flex items-center gap-2"><Avatar src={p.avatar || me.avatar} size="h-9 w-9" /><b>{p.user || me.name}</b><button className="rounded-md border border-white/60 px-2 py-1 text-xs">Follow</button></div><p>{p.caption || 'A little moment worth remembering ✨'}</p><button onClick={() => setCurrent((current + 1) % reelPosts.length)} className="mt-4 flex items-center gap-2 text-xs text-white/80"><Sparkles size={14} /> Next reel</button></div></div></section>
}

function CreateModal({ onClose, onPublish }) {
  const [caption, setCaption] = useState('')
  const [image, setImage] = useState('')
  const [preview, setPreview] = useState('')
  const fileChanged = (e) => { const file = e.target.files?.[0]; if (!file) return; setImage(file.name); setPreview(URL.createObjectURL(file)) }
  const publish = () => { if (!preview) return; onPublish({ image: preview, caption: caption.trim() || 'A little moment worth remembering ✨' }); onClose() }
  return <div onMouseDown={(e) => { if (e.target === e.currentTarget) onClose() }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"><section className="animate-rise w-full max-w-[520px] overflow-hidden rounded-2xl border border-line bg-[#17171b] shadow-2xl"><header className="flex items-center justify-between border-b border-line px-5 py-4"><button onClick={onClose} aria-label="Close"><X size={20} /></button><h2 className="font-semibold">Create new post</h2><button onClick={publish} disabled={!preview} className="text-sm font-semibold text-violet disabled:opacity-40">Share</button></header>{preview ? <div className="grid sm:grid-cols-2"><img src={preview} alt="Post preview" className="aspect-square w-full object-cover" /><div className="p-4"><div className="mb-5 flex items-center gap-3"><Avatar src={me.avatar} size="h-9 w-9" /><span className="text-sm font-semibold">{me.name}</span></div><textarea value={caption} onChange={(e) => setCaption(e.target.value)} maxLength={500} placeholder="Write a caption..." className="h-40 w-full resize-none bg-transparent text-sm outline-none placeholder:text-muted" /><div className="mt-3 flex items-center justify-between border-t border-line pt-3 text-muted"><Smile size={19} /><span className="text-xs">{caption.length}/500</span></div></div></div> : <label className="flex min-h-[330px] cursor-pointer flex-col items-center justify-center p-8 text-center transition hover:bg-white/[0.02]"><ImagePlus size={48} strokeWidth={1.2} className="mb-4 text-violet" /><p className="font-display text-xl font-medium">Share your moment</p><p className="mt-2 text-sm text-muted">Choose a photo from your device</p><span className="mt-5 rounded-lg bg-violet px-4 py-2 text-sm font-semibold">Select from computer</span><input type="file" accept="image/*" onChange={fileChanged} className="hidden" /><span className="mt-4 text-xs text-muted">{image}</span></label>}</section></div>
}

function StoryModal({ story, onClose }) {
  return <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"><div onClick={(e) => e.stopPropagation()} className="relative h-[min(82vh,760px)] w-full max-w-[420px] overflow-hidden rounded-2xl bg-panel"><img src={story.avatar} alt={story.name} className="h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" /><div className="absolute left-4 right-4 top-4 h-1 rounded-full bg-white/70" /><div className="absolute left-4 top-8 flex items-center gap-2"><Avatar src={story.avatar} size="h-9 w-9" /><span className="text-sm font-semibold">{story.name}</span><span className="text-xs text-white/70">2h</span></div><button onClick={onClose} className="absolute right-4 top-10"><X size={22} /></button><p className="absolute bottom-8 left-4 right-4 text-center text-lg font-medium">A little moment worth remembering ✨</p></div></div>
}

export default function App() {
  const [active, setActive] = useState('Home')
  const [posts, setPosts] = useState(starterPosts)
  const [createOpen, setCreateOpen] = useState(false)
  const [story, setStory] = useState(null)
  const [selectedProfile, setSelectedProfile] = useState('')
  const navigate = (page) => { setActive(page); if (page !== 'Profile') setSelectedProfile(''); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const showProfile = (name) => { setSelectedProfile(name); setActive('Profile'); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const publish = ({ image, caption }) => setPosts((list) => [{ id: Date.now(), user: me.name, avatar: me.avatar, location: 'Somewhere beautiful', image, caption, likes: 0, liked: false, saved: false, time: 'just now', comments: [] }, ...list])
  const page = useMemo(() => {
    if (active === 'Profile') return <ProfilePage posts={posts} onCreate={() => setCreateOpen(true)} selectedProfile={selectedProfile} setSelectedProfile={setSelectedProfile} />
    if (active === 'Explore' || active === 'Search') return <ExplorePage posts={posts} onProfile={showProfile} />
    if (active === 'Notifications') return <NotificationsPage onProfile={showProfile} />
    if (active === 'Messages') return <MessagesPage onProfile={showProfile} />
    if (active === 'Reels') return <ReelPage posts={posts} />
    return <HomePage posts={posts} setPosts={setPosts} onProfile={showProfile} onStory={setStory} />
  }, [active, posts, selectedProfile])
  return <div className="min-h-screen bg-ink text-white"><Sidebar active={active} setActive={navigate} openCreate={() => setCreateOpen(true)} /><MobileHeader openCreate={() => setCreateOpen(true)} setActive={navigate} /><main className="min-h-[calc(100vh-60px)] lg:ml-[244px] xl:ml-[260px]">{page}</main><BottomNav active={active} setActive={navigate} openCreate={() => setCreateOpen(true)} />{createOpen && <CreateModal onClose={() => setCreateOpen(false)} onPublish={publish} />}{story && <StoryModal story={story} onClose={() => setStory(null)} />}</div>
}
