(() => {
  'use strict';

  const select = (selector, scope = document) => scope.querySelector(selector);
  const all = (selector, scope = document) => [...scope.querySelectorAll(selector)];

  function setFallback(image) {
    const fallback = image.dataset.fallback;
    if (fallback && image.src !== fallback) image.src = fallback;
  }
  document.addEventListener('error', event => {
    if (event.target instanceof HTMLImageElement) setFallback(event.target);
  }, true);
  all('img[data-fallback]').filter(image => image.complete && !image.naturalWidth).forEach(setFallback);

  const menu = select('.menu-toggle');
  const nav = select('#nav');
  const setMenu = open => {
    menu.setAttribute('aria-expanded', String(open));
    menu.textContent = open ? 'Close' : 'Menu';
    nav.classList.toggle('open', open);
  };
  menu.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') === 'false'));
  nav.addEventListener('click', event => {
    if (event.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      menu.focus();
    }
  });

  const filterForm = select('[data-filters]');
  if (filterForm) {
    const cards = all('[data-puppy-grid] .puppy-card');
    const count = select('[data-count]');
    const emptyState = select('[data-empty]');
    const clear = select('[type="reset"]', filterForm);

    function readFilters() {
      const params = new URLSearchParams(location.search);
      const where = params.get('origin') || '';
      const supported = ['', 'local', 'imported', 'teacup'];
      filterForm.elements.origin.value = supported.includes(where) ? where : '';
      for (const input of all('input[type="checkbox"]', filterForm)) {
        input.checked = params.getAll(input.name).includes(input.value);
      }
      render(false);
    }

    function render(updateUrl = true) {
      const data = new FormData(filterForm);
      const where = data.get('origin');
      const breeds = data.getAll('breed');
      const genders = data.getAll('gender');
      let total = 0;
      for (const card of cards) {
        const {origin, breed, gender} = card.dataset;
        const originMatches = !where || where === origin || (where === 'teacup' && breed.startsWith('korean teacup'));
        const breedMatches = !breeds.length || breeds.some(value => breed.includes(value));
        const genderMatches = !genders.length || genders.some(value => gender.includes(value));
        card.hidden = !(originMatches && breedMatches && genderMatches);
        if (!card.hidden) total++;
      }
      count.textContent = total + (total === 1 ? ' puppy looking for a home' : ' puppies looking for a home');
      emptyState.hidden = total !== 0;
      clear.hidden = !(where || breeds.length || genders.length);
      if (updateUrl) {
        const url = new URL(location.href);
        for (const key of ['origin', 'breed', 'gender']) url.searchParams.delete(key);
        if (where) url.searchParams.set('origin', where);
        breeds.forEach(value => url.searchParams.append('breed', value));
        genders.forEach(value => url.searchParams.append('gender', value));
        history.replaceState(null, '', url);
      }
    }

    filterForm.addEventListener('change', () => render());
    filterForm.addEventListener('reset', () => queueMicrotask(() => render()));
    readFilters();
  }

  const faqSearch = select('#faq-search');
  if (faqSearch) {
    const questions = all('#faq-notes details');
    faqSearch.addEventListener('input', () => {
      const words = faqSearch.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
      let count = 0;
      for (const question of questions) {
        const content = question.textContent.toLowerCase();
        question.hidden = !words.every(word => content.includes(word));
        if (!question.hidden) count++;
      }
      select('#faq-count').textContent = count + (count === 1 ? ' note on the board' : ' notes on the board');
      select('[data-no-questions]').hidden = count > 0;
    });
  }

  for (const tablist of all('[role="tablist"]')) {
    const tabs = all('[role="tab"]', tablist);
    function activate(tab, focus) {
      for (const option of tabs) {
        const selected = tab === option;
        option.setAttribute('aria-selected', String(selected));
        option.tabIndex = selected ? 0 : -1;
        document.getElementById(option.getAttribute('aria-controls')).hidden = !selected;
      }
      if (focus) tab.focus();
    }
    tabs.forEach(tab => tab.addEventListener('click', () => activate(tab, false)));
    tablist.addEventListener('keydown', event => {
      const index = tabs.indexOf(event.target);
      if (index < 0) return;
      const destinations = {ArrowLeft: (index + tabs.length - 1) % tabs.length, ArrowRight: (index + 1) % tabs.length, Home: 0, End: tabs.length - 1};
      if (!(event.key in destinations)) return;
      event.preventDefault();
      activate(tabs[destinations[event.key]], true);
    });
  }

  function makeMedia(item) {
    if (item.video) {
      const video = document.createElement('video');
      video.src = item.video;
      video.poster = item.image;
      video.controls = true;
      video.playsInline = true;
      video.preload = 'metadata';
      return video;
    }
    const image = document.createElement('img');
    image.src = item.image;
    image.alt = item.caption;
    if (item.fallback) image.dataset.fallback = item.fallback;
    return image;
  }

  const modal = select('.lightbox');
  const stage = select('[data-light-media]', modal);
  const caption = select('[data-light-caption]', modal);
  const previous = select('[data-prev]', modal);
  const next = select('[data-next]', modal);
  let lightItems = [];
  let lightIndex = 0;
  let trigger = null;
  function lightRender() {
    const item = lightItems[lightIndex];
    stage.replaceChildren(makeMedia(item));
    caption.textContent = [item.caption, (lightIndex + 1) + ' / ' + lightItems.length].filter(Boolean).join(' · ');
    previous.hidden = next.hidden = lightItems.length < 2;
  }
  function showLightbox(items, index, control) {
    lightItems = items;
    lightIndex = index;
    trigger = control;
    lightRender();
    modal.showModal();
    select('[data-close]', modal).focus();
  }
  function moveLightbox(delta) {
    lightIndex = (lightIndex + delta + lightItems.length) % lightItems.length;
    lightRender();
  }
  select('[data-close]', modal).addEventListener('click', () => modal.close());
  previous.addEventListener('click', () => moveLightbox(-1));
  next.addEventListener('click', () => moveLightbox(1));
  modal.addEventListener('close', () => {
    stage.replaceChildren();
    trigger?.focus();
  });
  modal.addEventListener('click', event => {
    if (event.target === modal) modal.close();
  });
  modal.addEventListener('keydown', event => {
    if (event.target instanceof HTMLVideoElement) return;
    if (event.key === 'ArrowLeft') moveLightbox(-1);
    if (event.key === 'ArrowRight') moveLightbox(1);
  });

  for (const gallery of all('[data-family-gallery]')) {
    const buttons = all('[data-photo]', gallery);
    const items = buttons.map(button => ({
      image: button.dataset.photo,
      fallback: select('img', button).dataset.fallback,
      caption: button.dataset.caption || 'A happy TeddyPups family',
    }));
    buttons.forEach((button, index) => button.addEventListener('click', () => showLightbox(items, index, button)));
  }

  const puppyGallery = select('[data-puppy-gallery]');
  if (puppyGallery) {
    const items = JSON.parse(puppyGallery.dataset.items);
    const thumbnails = all('[data-gallery-index]', puppyGallery);
    const main = select('[data-main-media]', puppyGallery);
    const indexLabel = select('[data-gallery-count]', puppyGallery);
    let index = 0;
    function renderGallery() {
      const current = items[index];
      const media = makeMedia(current);
      if (current.video) {
        const full = document.createElement('button');
        full.type = 'button';
        full.className = 'text-btn';
        full.textContent = 'Open video full screen';
        full.dataset.open = '';
        main.replaceChildren(media, full);
      } else {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'media-button';
        button.dataset.open = '';
        button.setAttribute('aria-label', 'Open ' + current.caption + ' photo full screen');
        button.append(media);
        main.replaceChildren(button);
      }
      if (indexLabel) indexLabel.textContent = (index + 1) + ' / ' + items.length;
      thumbnails.forEach((button, i) => button.setAttribute('aria-pressed', String(i === index)));
    }

    puppyGallery.addEventListener('click', event => {
      const button = event.target.closest('button');
      if (!button) return;
      if ('open' in button.dataset) {
        showLightbox(items, index, button);
        return;
      }
      if ('galleryIndex' in button.dataset) index = Number(button.dataset.galleryIndex);
      if ('galleryPrev' in button.dataset) index = (index + items.length - 1) % items.length;
      if ('galleryNext' in button.dataset) index = (index + 1) % items.length;
      renderGallery();
    });
  }

  for (const form of all('[data-enquiry]')) {
    const phone = form.elements.phone;
    const result = select('[data-form-result]', form);
    const draft = select('[data-mail-draft]', form);
    const copyButton = select('[data-copy-draft]', form);
    const status = select('[data-copy-status]', form);
    const keys = {name: 'Name', phone: 'Phone / WhatsApp', email: 'Email', area: 'Area', puppy: 'Puppy', message: 'Message'};
    let body = '';

    form.addEventListener('input', () => {
      phone.setCustomValidity('');
      result.hidden = true;
      status.textContent = '';
    });
    form.addEventListener('submit', event => {
      event.preventDefault();
      const digits = phone.value.replace(/\D/g, '');
      phone.setCustomValidity(digits.length < 7 || digits.length > 15
        ? 'Enter a phone number with 7 to 15 digits, including your country code.'
        : '');
      if (!form.reportValidity()) return;
      body = [...new FormData(form)]
        .filter(([, value]) => value.trim())
        .map(([key, value]) => keys[key] + ': ' + value.trim())
        .join('\r\n');
      draft.href = 'mailto:info@instabizweb.com?subject=' + encodeURIComponent(form.dataset.subject) + '&body=' + encodeURIComponent(body);
      result.hidden = false;
      draft.focus();
    });
    copyButton.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(body);
        status.textContent = 'Enquiry copied.';
      } catch {
        status.textContent = 'Copying failed. Use the email draft link above.';
      }
    });
  }
})();
