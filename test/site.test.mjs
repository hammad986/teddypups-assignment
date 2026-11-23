import assert from 'node:assert/strict';
import test from 'node:test';
import {routes} from '../build.mjs';
import {available, archive} from '../src/data.mjs';

test('publishes 7 site pages and 42 distinct puppy profiles', () => {
  assert.equal(available.length, 15);
  assert.equal(archive.length, 27);
  assert.equal(routes.size, 49);
  for (const puppy of [...available, ...archive]) {
    assert.match(routes.get(puppy.href), /data-puppy-gallery/);
  }
});

test('every local link and fragment resolves to a generated page or asset', () => {
  const assets = new Set(['/assets/client.js', '/assets/style.css', '/assets/teddy.svg']);
  for (const [route, document] of routes) {
    for (const [, href] of document.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
      if (!href.startsWith('/') && !href.startsWith('#')) continue;
      const url = new URL(href.replaceAll('&amp;', '&'), 'https://example.test' + route);
      const target = routes.get(url.pathname);
      assert.ok(target || assets.has(url.pathname), route + ' links to missing ' + href);
      if (url.hash) assert.ok(target.includes('id="' + url.hash.slice(1) + '"'), route + ' has broken fragment ' + href);
    }
  }
});

test('provides 64 family photos and the available puppy video interactions', () => {
  assert.equal((routes.get('/happy-families/').match(/class="polaroid"/g) || []).length, 64);
  assert.match(routes.get('/puppies/maltipoo-max-male/'), /\.mp4/);
  assert.match(routes.get('/contact/'), /data-enquiry/);
});

test('developer contact is reachable and links to phone and email', () => {
  const contact = routes.get('/contact/');
  assert.match(routes.get('/'), /href="\/contact\/#developer-contact"/);
  assert.match(contact, /id="developer-contact"/);
  assert.match(contact, /href="mailto:mdhammad2906@gmail\.com"/);
  assert.match(contact, /href="tel:\+916369740522"/);
});
