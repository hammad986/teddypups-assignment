import {copyFile, mkdir, writeFile} from 'node:fs/promises';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {available, archive, logo, photo, media, showroom, whatsapp, questions, localSteps, importSteps} from './src/data.mjs';
import {families, featuredFamilies} from './src/families.mjs';

const root = dirname(fileURLToPath(import.meta.url));
const links = [['/', 'Home'], ['/puppies/', 'Puppies'], ['/happy-families/', 'Happy families'], ['/how-it-works/', 'How it works'], ['/faq/', 'FAQ'], ['/contact/', 'Visit & contact']];
const escaped = {'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'};
const html = value => String(value).replace(/[&<>"']/g, char => escaped[char]);
const btn = (url, label, kind = 'solid') => `<a class="button ${kind}" href="${html(url)}">${html(label)}</a>`;
const wa = (label = 'WhatsApp us') => btn(whatsapp, label, 'green');
const brand = `<a class="brand" href="/" aria-label="TeddyPups U.A.E. — home"><img src="${logo}" alt="" width="48" height="48"><span>TeddyPups</span></a>`;
const mascot = className => `<span aria-hidden="true" class="mascot ${className || ''}"><img src="/assets/teddy.svg" alt="" width="152" height="136"></span>`;
const photoTag = (path, alt='', size=640, eager=false) =>
  `<img src="${html(photo(path,size))}" data-fallback="${html(media(path))}" alt="${html(alt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
const comment = '© 2026 TeddyPups U.A.E. · Technical assignment demo';
const siteName = 'TeddyPups U.A.E.';
const responseHeaders = `/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()
`;
const developer = {
  name: 'Muhammed Hammad S',
  email: 'mdhammad2906@gmail.com',
  phone: '+916369740522',
  phoneLabel: '+91 63697 40522',
};
const mark = text => `<p class="hand">${html(text)}</p>`;

function layout(page, title, content, description = 'Explore TeddyPups U.A.E., premium miniature puppies in Dubai.') {
  const nav = links.map(([to,label]) => `<a href="${to}"${page===to ? ' aria-current="page"' : ''}>${label}</a>`).join('');
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex, nofollow"><meta name="description" content="${html(description)}"><meta name="theme-color" content="#fcf9ef"><title>${html(title)} | ${siteName}</title><link rel="icon" href="${logo}"><link rel="stylesheet" href="/assets/style.css"><script src="/assets/client.js" defer></script></head>
<body class="${page==='/'?'home':''}"><a class="skip" href="#main">Skip to content</a>
<header class="site-header"><div class="wrap header-row">${brand}<button class="menu-toggle" type="button" aria-expanded="false" aria-controls="nav">Menu</button><nav id="nav" aria-label="Main">${nav}</nav><div class="header-cta">${wa()}</div></div></header>
<main id="main">${content}</main>
<footer><div class="wrap footer-grid"><div>${brand}<h2>Home, at last.</h2><p>TeddyPups U.A.E. is a Dubai-based brand specializing in miniature puppies, offering premium services and worldwide shipping.</p></div><div><h2>Explore</h2><a href="/puppies/">Available puppies</a><a href="/gone-home/">Gone home</a>${nav.slice(nav.indexOf('<a href="/happy-families/"')).replace('aria-current="page"','')}<a href="/how-it-works/#delivery">Delivery & collection</a></div><div><h2>Say hello</h2><a href="${html(whatsapp)}">WhatsApp +971 50 000 0000</a><a href="mailto:info@instabizweb.com">info@instabizweb.com</a><p>Downtown Dubai, United Arab Emirates</p><div class="socials">${['Instagram','TikTok','Facebook'].map(s=>`<a href="https://instabizweb.com/">${s}</a>`).join('')}</div></div></div><div class="wrap footer-bottom">${comment} <a href="/contact/#developer-contact">Developer contact</a></div></footer>
<dialog class="lightbox" aria-label="Photo viewer"><div class="lightbox-inner"><button type="button" data-close aria-label="Close viewer">×</button><div data-light-media></div><div class="light-controls"><button type="button" data-prev aria-label="Previous photo">‹</button><span data-light-caption aria-live="polite"></span><button type="button" data-next aria-label="Next photo">›</button></div></div></dialog></body></html>`;
}
function card(pup, ticket=false) {
  const info = `${html(pup.gender.toLowerCase())}, ${html(pup.age)}`;
  const name = html(pup.name);
  const mediaTag = photoTag(pup.cover, pup.name + ' puppy');
  if (ticket) return `<article class="ticket"><a href="${pup.href}">${mediaTag}<div>${mark('one ticket home')}<h3>${name}</h3><p>${html(pup.breed)} · ${html(pup.gender.toLowerCase())}</p><strong>${pup.local ? 'DUBAI SHOWROOM' : 'TEDDYPUPS'} <span>·····</span> HOME ♥</strong></div><b>admit one</b></a></article>`;
  return `<article class="puppy-card" data-origin="${pup.local ? 'local' : 'imported'}" data-breed="${html(pup.breed.toLowerCase())}" data-gender="${html(pup.gender.toLowerCase())}"><a href="${pup.href}"><div class="portrait">${mediaTag}<span>${pup.archived ? 'Gone home' : 'Available'}</span></div><h3>${name}</h3><p>${pup.name!==pup.breed ? html(pup.breed) + ' · ' : ''}${info}${pup.gallery.some(item=>item.video) ? ' · with video' : ''}</p></a></article>`;
}
const cards = (pups, ticket=false) => pups.map(pup => card(pup,ticket)).join('');
function familyGrid(items) {
  return `<div class="family-grid" data-family-gallery>${items.map(({image, caption},i)=>`<button type="button" class="polaroid" data-photo="${html(photo(image,1080))}" data-caption="${html(caption)}" aria-label="Open photo ${i+1} of ${items.length}${caption ? ': '+html(caption):''}">${photoTag(image,'A happy TeddyPups family with their new puppy')}<span>${html(caption)}</span></button>`).join('')}</div>`;
}
const quote = `<blockquote class="paper-note"><p>“TeddyPups truly made our dream a reality. They supported us at every step of the import journey. Our Maltipoo arrived healthy, cheerful, and absolutely perfect. Having 24/7 support throughout the process gave us complete peace of mind.”</p><cite>Sarah M., Dubai, UAE</cite></blockquote>`;
const numbered = entries => `<ol class="steps">${entries.map(([title,text],i)=>`<li><span aria-hidden="true">${i+1}</span><h3>${html(title)}</h3><p>${html(text)}</p></li>`).join('')}</ol>`;
const tiles = entries => `<div class="tiles">${entries.map(([title,text])=>`<article><h3>${html(title)}</h3><p>${html(text)}</p></article>`).join('')}</div>`;
const sectionCTA = (title,text) => `<section class="cta wrap"><h2>${html(title)}</h2><p>${html(text)}</p><div class="actions">${wa('Enquire on WhatsApp')}${btn('/contact/','Visit & contact','outline')}</div></section>`;
const details = (entries,first=false) => entries.map(([q,a],i)=>`<details${first && i===0 ? ' open' : ''}><summary>${html(q)}</summary><p>${html(a)}</p></details>`).join('');
const health = ['Vaccinated','Dewormed','Verified health certificate from licensed vets','Thoroughly checked before joining your family'];

function home() {
  const featured = [0,1,2,3,11,13].map(index=>available[index]);
  const arches = featured.map(pup=>`<a href="${pup.href}" aria-label="Meet ${html(pup.name)}">${photoTag(pup.cover,pup.name,384,true)}</a>`);
  return layout('/', 'Premium teacup puppies in Dubai', `
<section class="hero"><div class="hero-copy">${mark('every puppy is family')}<h1>Premium teacup<br class="desktop"> puppies in Dubai</h1><p>Meet your new best friend in our Dubai showroom, or order a rare miniature breed from trusted breeders worldwide.</p><div class="actions">${btn('/puppies/','View available puppies')}${btn(whatsapp,'Enquire on WhatsApp','outline')}</div></div><div class="arches">${arches.slice(0,3).join('')}${mascot('hero-mascot')}${arches.slice(3).join('')}</div><div class="quilt" aria-hidden="true"></div></section>
<section class="wrap scene"><div class="heading-row"><div><h2>Meet the pups</h2><p>Real puppies, real photos, looking for their families right now.</p></div>${btn('/puppies/','See all available puppies','outline')}</div><div class="puppy-grid">${cards(available)}</div><div class="center">${btn('/puppies/','Meet them all')}</div></section>
<section class="path-section"><div class="wrap scene"><h2>Two ways to meet your puppy</h2><div class="two-columns path-cards"><article>${photoTag(showroom,'An apricot puppy in the TeddyPups showroom')}<div><h3>Puppies in Dubai</h3><p>See them, love them, take them home. Come meet our locally available puppies before you decide.</p>${btn('/puppies/?origin=local','Meet local puppies')}</div></article><article><div class="travel-art" aria-hidden="true">✈ <span>·······</span> 🐾</div><div><h3>Imported for you</h3><p>Exclusive Korean teacup puppies, delivered. We handle the details of bringing your puppy home.</p>${btn('/puppies/?origin=imported','See imported puppies')}</div></article></div></div></section>
<section class="wrap scene"><h2>Your puppy journey</h2><p>A step-by-step concierge experience from choosing a puppy to bringing them home.</p>${numbered([['Choose your breed','Tell us what you’re looking for and we’ll guide you based on availability and your lifestyle.'],['Get photos & details','Our team shares photos and health details on WhatsApp.'],['Secure & safe delivery','We handle the arrangements to get your puppy home safely.']])}${btn('/how-it-works/','How it works','outline')}</section>
<section class="trust"><div class="wrap scene"><h2>Why families trust TeddyPups</h2>${tiles([['Vet-checked & healthy','Vaccinated, dewormed and health-checked.'],['Korea to Dubai, safely','Trusted breeders and safe travel.'],['Support 24/7','Guidance before and after delivery.'],['Trusted by families worldwide','Puppies delivered to loving homes.']])}</div></section>
<section class="family-scene"><div class="wrap scene"><div class="heading-row"><div><h2>Happy families & puppies</h2><p>See the moments our clients shared after welcoming TeddyPups into their homes.</p></div>${quote}</div>${familyGrid(featuredFamilies)}<div class="center">${btn('/happy-families/','See every happy family','outline')}</div></div></section>
<section class="wrap scene"><div class="heading-row"><h2>Questions, answered</h2>${btn('/faq/','Read all questions','outline')}</div><div class="notes">${details(questions.slice(0,3),true)}</div></section>
${sectionCTA('Ready to meet your new best friend?','Bring home a healthy, happy teacup or designer puppy with guidance every step of the way.')}`);
}

function filters() {
  const groups = [
    ['origin','where',[['','Everywhere'],['imported','Imported'],['teacup','Korean Teacup'],['local','In Dubai']]],
    ['breed','breed',['Maltipoo','Pomeranian','Poodle','Cavapoo','Shih Tzu'].map(x=>[x.toLowerCase(),x])],
    ['gender','boy or girl',[['boy','Boys'],['girl','Girls']]],
  ];
  return `<form class="filters sketch" data-filters aria-label="Filter puppies">${groups.map(([name,heading,values])=>`<fieldset><legend>${heading}</legend><div>${values.map(([value,label])=>`<label><input type="${name==='origin' ? 'radio' : 'checkbox'}" name="${name}" value="${value}"${value===''?' checked':''}><span>${label}</span></label>`).join('')}</div></fieldset>`).join('')}<button type="reset" class="text-btn" hidden>Clear filters</button></form>`;
}
function catalog() {
  return layout('/puppies/','Available puppies',`<div class="catalog"><section class="wrap scene top"><div class="heading-row"><div>${mark("from Teddy's sketchbook")}<h1 class="underlined">Available puppies</h1><p class="intro">Every listing shows real photos of the actual puppy. Open a profile to see them all, then ask us about them on WhatsApp.</p></div>${mascot('catalog-mascot')}</div>${filters()}<p class="hand results" data-count aria-live="polite">15 puppies looking for a home</p><p data-empty hidden>No puppies match these filters. Try clearing a filter or ask us about an upcoming litter.</p><div class="puppy-grid" data-puppy-grid>${cards(available)}</div></section></div><section class="wrap scene"><div class="heading-row"><div><h2>Already gone home</h2><p>These puppies have found their families.</p></div>${btn('/gone-home/',"See the puppies who've gone home",'outline')}</div><div class="ticket-grid">${cards(archive.slice(0,5),true)}</div></section>`);
}
function archivePage() {
  return layout('/gone-home/','Gone home',`<section class="wrap scene top"><div class="heading-row"><div><h1>Gone home <span class="heart">♡</span></h1><p class="intro wide">Every puppy here has already joined a loving family. Looking for one just like them? Tell us and we'll help you find your match.</p>${btn('/puppies/','See available puppies')}</div><div class="booth">${mascot()}<strong>tickets home</strong></div></div><div class="ticket-grid">${cards(archive,true)}</div></section>`);
}
function familyPage() {
  return layout('/happy-families/','Happy families',`<div class="family-scene"><section class="wrap scene top"><div class="two-columns family-intro"><div>${mark('our wall of happy endings')}<h1>Happy<br>families <span class="heart">♡</span></h1><p class="intro wide">Nothing makes us happier than seeing our puppies in loving homes! Here are some beautiful moments shared by our amazing clients after welcoming their furry friends.</p>${mark(families.length+' moments and counting')}</div>${quote}</div>${familyGrid(families)}</section></div>`);
}
function form(pup) {
  const enquiryOptions = available.map(p=>`<option value="${html(p.name+' ('+p.gender.toLowerCase()+')')}">${html(p.name+(p.name===p.breed?'':' ('+p.breed+')')+' · '+p.gender.toLowerCase())}</option>`).join('');
  const requiredFields = `<label>Your name <span>(required)</span><input name="name" autocomplete="name" maxlength="100" required></label>
<label>Phone or WhatsApp <span>(required)</span><input type="tel" name="phone" autocomplete="tel" maxlength="32" pattern="[+0-9() .\\-]{7,32}" placeholder="+971 50 123 4567" required></label>`;
  const common = `<label>Email <span>(optional)</span><input type="email" name="email" autocomplete="email" maxlength="160"></label><label>Your area <span>(optional)</span><input name="area" autocomplete="address-level2" maxlength="120" placeholder="e.g. Dubai Marina"></label>`;
  return `<form class="enquiry sketch" data-enquiry data-subject="${html(pup ? 'Enquiry about '+pup.name : 'TeddyPups enquiry')}"><h2>${pup ? 'Ask about '+html(pup.name) : 'Dear TeddyPups,'}</h2><div class="form-grid">${requiredFields}${common}${pup ? '' : `<label class="full">Puppy you're interested in <span>(optional)</span><select name="puppy"><option value="">any puppy (not sure yet)</option>${enquiryOptions}</select></label>`}<label class="full">Your message <span>(optional)</span><textarea name="message" rows="4" maxlength="1200" placeholder="Anything else you’d like to tell us?">${pup ? html("Hi! I'd love to know more about "+pup.name+" ("+pup.breed+").") : ''}</textarea></label></div><p class="form-explainer">Submitting prepares a draft. You choose whether to send it.</p><button type="submit" class="button solid">${pup?'Prepare enquiry':'Post my letter'}</button><div class="form-result" data-form-result hidden aria-live="polite"><p>Your enquiry is ready. Open your email app to review and send it.</p><a class="button outline" data-mail-draft href="mailto:info@instabizweb.com">Open email draft</a><button type="button" class="text-btn" data-copy-draft>Copy enquiry</button><p data-copy-status role="status"></p></div></form>`;
}
function contact() {
  const maps = 'https://www.google.com/maps/search/?api=1&query=Downtown+Dubai';
  return layout('/contact/','Visit & contact',`<div class="contact-bg"><section class="wrap scene top"><div class="two-columns title-pair"><h1>Get in touch<br>with us</h1><p class="intro">Have questions about our puppies or adoption process? Fill out the form, and our team will get back to you promptly. Whether ready to adopt or just seeking info, we'd love to hear from you!</p></div><div class="contact-grid"><aside>${wa('WhatsApp +971 50 000 0000')}<dl><dt>call us</dt><dd><a href="tel:+971500000000">+971 50 000 0000</a></dd><dt>email</dt><dd><a href="mailto:info@instabizweb.com">info@instabizweb.com</a></dd></dl><article class="showroom sketch"><h2>Visit us in Downtown Dubai</h2><p>Step into our Downtown Dubai showroom and experience the joy of choosing your puppy face-to-face.</p>${photoTag(showroom,'An apricot puppy at the showroom')}${btn(maps,'Open in Google Maps','outline')}</article></aside>${form()}</div><section id="developer-contact" class="developer-contact sketch" aria-labelledby="developer-contact-title"><h2 id="developer-contact-title">Developer contact</h2><p>${html(developer.name)} · Technical assignment</p><address><a href="mailto:${html(developer.email)}">${html(developer.email)}</a><a href="tel:${html(developer.phone)}">${html(developer.phoneLabel)}</a></address></section></section></div>`);
}
function processPage() {
  return layout('/how-it-works/','How it works',`<div class="process-bg"><div class="wrap scene top"><div class="two-columns title-pair"><h1>How it works</h1><p class="intro">Whether you choose to visit us locally or order a premium breed from overseas, TeddyPups is here to make the experience unforgettable.</p></div><nav class="jump" aria-label="On this page">${[['two-ways','Two ways home'],['promise','Our premium puppy promise'],['delivery','Delivery & collection'],['why','Why choose us']].map(([id,label],i)=>btn('#'+id,(i+1)+' '+label,'outline')).join('')}</nav><section id="two-ways" class="scene"><div class="heading-row"><div>${mark('choose your way')}<h2>Two ways home</h2></div><div class="tab-switch sketch" role="tablist" aria-label="Ways to bring your puppy home"><button id="tab-local" type="button" role="tab" aria-selected="true" aria-controls="panel-local">In Dubai<small>meet in person</small></button><button id="tab-imported" type="button" role="tab" aria-selected="false" aria-controls="panel-imported" tabindex="-1">Imported<small>order upon request</small></button></div></div>
<div id="panel-local" role="tabpanel" tabindex="0" aria-labelledby="tab-local"><div class="two-columns process-feature"><div><h3>Meet your puppy in person</h3><p>Step into our Downtown Dubai showroom and experience the joy of choosing your puppy face-to-face. We source healthy, well-socialized puppies from trusted breeders.</p></div><div class="travel-art sketch" aria-hidden="true">☀<span>▁▃▆▂▇▅▁▃</span></div></div>${numbered(localSteps)}</div>
<div id="panel-imported" role="tabpanel" tabindex="0" aria-labelledby="tab-imported" hidden><div class="two-columns process-feature"><div><h3>Bring home a puppy from abroad</h3><p>Choose a miniature breed from our overseas breeders and get guidance on travel, health checks and paperwork.</p></div><div class="travel-art sketch" aria-hidden="true">✈ <span>·····</span> 🐾</div></div>${numbered(importSteps)}</div></section>
<section id="promise" class="scene"><h2>Our premium puppy promise</h2>${tiles([['Hand-selected breeders','We work with trusted breeders who prioritize health and welfare.'],['Full transparency','Photos, videos and health certificates are shared before travel.'],['Safe, stress-free delivery','We help manage the details throughout the process.']])}</section>
<section id="delivery" class="scene"><h2>Delivery & collection</h2><p>Choose a showroom collection or ask us about safe delivery options.</p>${tiles([['Take your puppy home the same day','Local puppies can go home after your visit.'],['Delivery within Dubai','We can arrange delivery to your door.'],['Safe international cargo','Our team helps coordinate documents and travel.'],['Worldwide delivery','Ask about the options available for your destination.']])}</section>
<section id="why" class="scene"><h2>Why choose us</h2>${tiles([['International cargo','We work with international travel partners.'],['Support 24/7','Ask us about care before and after your puppy arrives.'],['Health guarantee','Puppies come with a verified health certificate from licensed vets.']])}</section></div>${sectionCTA('Unique and high quality puppies','We provide guidance on training, nutrition and care to help your puppy settle in.')}`);
}
function faq() {
  return layout('/faq/','Questions & answers',`<div class="faq-bg"><section class="wrap scene top"><h1>Questions<br>&amp; answers</h1><p class="intro wide">Can't find what you're looking for? Message us on WhatsApp and our team can help.</p><div class="faq-grid"><aside><label class="hand" for="faq-search">sniff out a question</label><input type="search" id="faq-search" placeholder="delivery, Korea, vaccinated…"><p id="faq-count" aria-live="polite">9 notes on the board</p>${mascot()}${wa('Ask your own question')}</aside><div class="notes cork" id="faq-notes">${details(questions)}<p data-no-questions hidden>No matching questions. Try a different search.</p></div></div></section></div>`);
}
function profile(pup, group, index) {
  const mediaData = pup.gallery.map(({image,video})=>({image:photo(image,1080),fallback:media(image),video:video?media(video):null,caption:pup.name}));
  const browse = pup.archived ? '/gone-home/' : '/puppies/';
  const neighbours = [group[(index+group.length-1)%group.length],group[(index+1)%group.length]];
  return layout('/puppies/',pup.name+(pup.name===pup.breed?'':', '+pup.breed)+' puppy',`<div class="profile-bg"><section class="wrap scene top"><p class="breadcrumb"><a href="${browse}">${pup.archived?'Gone home':'Available puppies'}</a> / ${html(pup.name)}</p><div class="profile-grid"><div class="puppy-gallery" data-puppy-gallery data-items="${html(JSON.stringify(mediaData))}">${mark("hello, it's me")}<div class="gallery-frame sketch"><div data-main-media><button class="media-button" type="button" data-open aria-label="Open ${html(pup.name)} photo full screen">${photoTag(pup.cover,pup.name,1080,true)}</button></div>${mediaData.length>1?`<div class="gallery-controls"><button type="button" data-gallery-prev aria-label="Previous photo">‹</button><span data-gallery-count aria-live="polite">1 / ${mediaData.length}</span><button type="button" data-gallery-next aria-label="Next photo">›</button></div>`:''}</div>${mediaData.length>1?`<div class="thumbnails">${pup.gallery.map(({image,video},i)=>`<button type="button" data-gallery-index="${i}" aria-label="${video?'Video':'Photo'} ${i+1} of ${mediaData.length}" aria-pressed="${i===0}">${photoTag(image,'',128)}${video?'<span>▶</span>':''}</button>`).join('')}</div>`:''}</div>
<div><article class="profile-tag sketch">${mark(pup.archived?'Gone home':'Available')}<h1>${html(pup.name)}</h1><p>${html(pup.breed)}</p><dl>${[['Breed',pup.breed],['Boy or girl',pup.gender],['Age',pup.age],['Where',pup.local?'Dubai showroom':'Imported for you']].map(([key,val])=>`<div><dt>${key}</dt><dd>${html(val)}</dd></div>`).join('')}</dl>${pup.archived ? btn('/puppies/','See available puppies') : wa('Ask about '+pup.name+' on WhatsApp')+btn('#enquire-'+pup.slug,'Send an enquiry','outline')}</article><article class="health sketch">${mark('what comes with '+pup.name)}<h2>Every Teddy Pup comes</h2><ul>${health.map(x=>`<li>${x}</li>`).join('')}</ul></article></div></div>
${pup.archived?'':`<section class="scene"><h2>${pup.local?'Meet your puppy in Dubai':'Coming home from abroad'}</h2>${numbered(pup.local?localSteps:importSteps)}</section><section class="enquire-section" id="enquire-${pup.slug}">${form(pup)}</section>`}
<nav class="profile-links" aria-label="More puppies">${neighbours.map((p,i)=>`<a class="sketch" href="${p.href}">${photoTag(p.cover,p.name,128)}<span>${i===0?'Previous pup':'Next pup'}<strong>${html(p.name)}</strong></span></a>`).join('')}</nav></section></div>`);
}
const routes = new Map([
  ['/',home()],['/puppies/',catalog()],['/gone-home/',archivePage()],['/happy-families/',familyPage()],['/how-it-works/',processPage()],['/faq/',faq()],['/contact/',contact()],
]);
for(const group of [available,archive]) {
  group.forEach((pup,index)=>routes.set(pup.href,profile(pup,group,index)));
}
export {routes};
async function build() {
  const dist = join(root,'dist');
  await mkdir(join(dist,'assets'),{recursive:true});
  await Promise.all([...routes].map(async ([path, content])=>{
    const dir = join(dist,path);
    await mkdir(dir,{recursive:true});
    await writeFile(join(dir,'index.html'),content);
  }));
  await Promise.all([
    copyFile(join(root,'src','teddy.svg'),join(dist,'assets','teddy.svg')),
    copyFile(join(root,'src','style.css'),join(dist,'assets','style.css')),
    copyFile(join(root,'src','client.js'),join(dist,'assets','client.js')),
    writeFile(join(dist,'404.html'),layout(null,'Page not found',`<div class="wrap scene top"><h1>Page not found</h1><p>Let's get you back to the catalog.</p>${btn('/puppies/','Browse puppies')}</div>`)),
    writeFile(join(dist,'_headers'),responseHeaders),
    writeFile(join(dist,'robots.txt'),'User-agent: *\nDisallow: /\n'),
    writeFile(join(dist,'.nojekyll'),''),
  ]);
  console.log(`Built ${routes.size} pages plus the 404 page.`);
}
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) await build();
