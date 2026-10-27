const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const context = { window: {} };
vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(root, 'level3-data.js'), 'utf8'), context);
vm.runInContext(fs.readFileSync(path.join(root, 'practice-core.js'), 'utf8'), context);
const ids = new Set();
let book = 0;
for (const category of context.window.LEVEL3.categories) {
  assert(category.items.length > 0);
  for (const item of category.items) {
    assert(!ids.has(item.id), `Duplicate ID: ${item.id}`);
    ids.add(item.id);
    assert(['book', 'original'].includes(item.source));
    book += item.source === 'book';
    if (item.choices) {
      assert.equal(new Set(item.choices).size, item.choices.length, item.id);
      assert(item.choices.includes(item.answer), item.id);
    }
    if (item.tiles) assert.equal(item.tiles.join(' '), item.answer, item.id);
    if (category.id === 'error') {
      assert.equal(item.sentence.split(' ').filter(w => w.replace(/[.,?!]$/, '') === item.wrong).length, 1, item.id);
    }
  }
}
assert(book > 0 && book < ids.size / 2);
vm.runInContext(`
  const state = { rounds: 0, reviews: {} };
  recordFibonacciReviewAnswer(state, 'test', false, { resetOnIncorrect: true });
  if (state.reviews.test.due !== 2) throw Error('First review interval');
  recordFibonacciReviewAnswer(state, 'test', true);
  if (state.reviews.test.stage !== 1) throw Error('Review advancement');
  recordFibonacciReviewAnswer(state, 'test', true);
  if (state.reviews.test) throw Error('Two correct reviews should clear an item');
`, context);
console.log(`${ids.size} items validated: ${book} book-based, ${ids.size - book} original. Review scheduling passed.`);
