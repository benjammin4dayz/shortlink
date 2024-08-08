/* eslint n/no-unsupported-features/node-builtins: 0 */
const $ = s => {
  const el = document.querySelector(s);
  if (!el) throw new Error(`Missing element ${s}`);
  return el;
};

const form = $('#form');
const input = $('#url');
const output = $('#output');

let lastValue;

form.addEventListener('submit', event => {
  event.preventDefault();

  if (!input.value || input.value === lastValue) return;

  input.value = input.value.trimStart().trimEnd();
  try {
    if (!/^https?:\/\//i.test(input.value)) {
      input.value = 'https://' + input.value;
    }
    new URL(input.value);
  } catch {
    alert('Invalid URL!');
    return;
  }

  lastValue = input.value;

  const query = '?url=' + encodeURIComponent(input.value);
  fetch('/api/v1/shorten' + query, {
    method: 'GET',
    headers: {
      Accept: 'text/plain',
    },
  })
    .then(response => response.text())
    .then(url => {
      console.log(url);
      document.getElementById(
        'yourl'
      ).innerHTML = `<a href="${url}">${url}</a>`;
      output.classList.remove('--hidden');
    })
    .catch(error => {
      console.error(error);
      lastValue = null;
    });
});
