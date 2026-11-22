// Paste the Google Apps Script web app URL here (ends in /exec). Until then, signups open a pre-written email to Maddie.
var SUBSCRIBE_URL = 'https://script.google.com/macros/s/AKfycbzypiKu4i9EZmUjIr6ENoaAPHTk4wkh9y68FUV-vfqkUEpcNsd50qCD49e8dI6he5wN_g/exec';
document.addEventListener('DOMContentLoaded', function () {
  var ua = navigator.userAgent, iOS = /iPhone|iPad|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1), android = /Android/.test(ua), mac = /Mac/.test(navigator.platform);
  var how = iOS ? 'On iPhone/iPad: tap the <b>Share</b> button (the square with the arrow) at the bottom of Safari, then tap <b>Add to Home Screen</b>. It will sit on your phone like an app.'
          : android ? 'On Android: tap the <b>⋮</b> menu in the top corner of Chrome, then tap <b>Add to Home screen</b>. It will sit on your phone like an app.'
          : 'On a computer: press <b>' + (mac ? '⌘ Cmd' : 'Ctrl') + ' + D</b> to bookmark this page. On your phone, open this page and use <b>Add to Home Screen</b>.';
  document.querySelectorAll('[data-save]').forEach(function (b) {
    b.addEventListener('click', function () {
      var box = document.getElementById(b.getAttribute('data-save'));
      if (box) { box.innerHTML = how; box.classList.add('show'); }
    });
  });
  document.querySelectorAll('.sub-form').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = f.querySelector('input[type=email]').value.trim(), done = f.parentNode.querySelector('.sub-done');
      var hp = f.querySelector('input[name=website]');
      if (!email) return;
      if (SUBSCRIBE_URL) {
        fetch(SUBSCRIBE_URL, { method: 'POST', mode: 'no-cors', body: new URLSearchParams({ email: email, page: document.title, interest: f.getAttribute('data-interest') || '', website: hp ? hp.value : '' }) })
          .finally(function () { f.style.display = 'none'; if (done) done.style.display = 'block'; });
      } else {
        location.href = 'mailto:maddie@elevatealign.com?subject=' + encodeURIComponent('Add me to Learn updates') + '&body=' + encodeURIComponent('Hi Maddie! Please add me to your Learn updates: ' + email);
        if (done) { done.textContent = 'Almost there: just hit send on the email that opened.'; done.style.display = 'block'; }
      }
    });
  });
});
