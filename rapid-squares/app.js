// Rapid Squares mockups — small bits of interactivity for each screen.
// Nothing is saved or sent anywhere; uploads only preview in the browser.
(function () {
  var page = document.body.getAttribute('data-page');

  function previewUrl(file) { return URL.createObjectURL(file); }

  // ---------- Reports: status filter tabs + search ----------
  if (page === 'reports') {
    var rows = Array.prototype.slice.call(document.querySelectorAll('#report-rows tr'));
    var tabs = Array.prototype.slice.call(document.querySelectorAll('.tab'));
    var search = document.getElementById('q');
    var showing = document.getElementById('showing');
    var empty = document.getElementById('no-results');
    var filter = 'all';

    tabs.forEach(function (t) {
      var key = t.getAttribute('data-filter');
      var n = key === 'all' ? rows.length : rows.filter(function (r) { return r.getAttribute('data-status') === key; }).length;
      t.querySelector('.count').textContent = n;
      t.addEventListener('click', function () {
        filter = key;
        tabs.forEach(function (x) { x.setAttribute('aria-selected', x === t ? 'true' : 'false'); });
        apply();
      });
    });
    search.addEventListener('input', apply);

    function apply() {
      var q = search.value.trim().toLowerCase();
      var shown = 0;
      rows.forEach(function (r) {
        var ok = (filter === 'all' || r.getAttribute('data-status') === filter) &&
                 (!q || r.textContent.toLowerCase().indexOf(q) !== -1);
        r.classList.toggle('hidden', !ok);
        if (ok) shown++;
      });
      empty.classList.toggle('hidden', shown !== 0);
      showing.textContent = 'Showing ' + shown + ' of ' + rows.length + ' reports';
    }
    apply();
  }

  // ---------- Report settings: live preview, logo + photo uploads ----------
  if (page === 'report-settings') {
    document.querySelectorAll('[data-field]').forEach(function (input) {
      var key = input.getAttribute('data-field');
      input.addEventListener('input', function () {
        document.querySelectorAll('[data-out="' + key + '"]').forEach(function (out) {
          out.textContent = input.value.trim() || out.getAttribute('data-default');
        });
      });
    });

    document.getElementById('logo-input').addEventListener('change', function (e) {
      var f = e.target.files && e.target.files[0];
      if (!f) return;
      var url = previewUrl(f);
      document.querySelectorAll('.logo-img').forEach(function (img) { img.src = url; img.classList.remove('hidden'); });
      document.querySelectorAll('.logo-empty').forEach(function (el) { el.classList.add('hidden'); });
    });

    var photos = [];
    var slotLabels = ['Aerial overview', 'Front slope', 'Rear slope', 'Damage close-up'];
    var grid = document.getElementById('photo-grid');
    var mini = document.getElementById('preview-photos');
    var count = document.getElementById('photo-count');

    function renderPhotos() {
      grid.innerHTML = '';
      mini.innerHTML = '';
      photos.forEach(function (p) {
        var fig = document.createElement('figure');
        var img = document.createElement('img');
        img.src = p.url; img.alt = p.name;
        var cap = document.createElement('figcaption');
        cap.textContent = p.name;
        fig.appendChild(img); fig.appendChild(cap);
        grid.appendChild(fig);
      });
      var emptySlots = Math.max(0, 4 - photos.length);
      slotLabels.slice(4 - emptySlots).forEach(function (label) {
        var d = document.createElement('div');
        d.className = 'thumb-empty';
        d.textContent = label;
        grid.appendChild(d);
      });
      for (var i = 0; i < 4; i++) {
        var cell;
        if (photos[i]) {
          cell = document.createElement('img');
          cell.src = photos[i].url; cell.alt = '';
          cell.style.cssText = 'width:100%;aspect-ratio:1;object-fit:cover;border-radius:3px;';
        } else {
          cell = document.createElement('div');
          cell.style.cssText = 'aspect-ratio:1;border-radius:3px;background:#EDEAE3;';
        }
        mini.appendChild(cell);
      }
      count.textContent = photos.length === 1 ? '1 photo' : photos.length + ' photos';
    }

    document.getElementById('photo-input').addEventListener('change', function (e) {
      Array.prototype.forEach.call(e.target.files || [], function (f) {
        photos.push({ url: previewUrl(f), name: f.name });
      });
      e.target.value = '';
      renderPhotos();
    });
    renderPhotos();
  }

  // ---------- Account: profile photo ----------
  if (page === 'account') {
    document.getElementById('avatar-input').addEventListener('change', function (e) {
      var f = e.target.files && e.target.files[0];
      if (!f) return;
      var img = document.getElementById('avatar-img');
      img.src = previewUrl(f);
      img.classList.remove('hidden');
      document.getElementById('avatar-empty').classList.add('hidden');
    });

    var links = Array.prototype.slice.call(document.querySelectorAll('.sidenav a'));
    links.forEach(function (a) {
      a.addEventListener('click', function () {
        links.forEach(function (x) { x.classList.toggle('current', x === a); });
      });
    });
  }

  // ---------- Team: role presets drive permission checkboxes ----------
  if (page === 'team') {
    var presets = {
      admin: ['order', 'viewAll', 'download', 'branding', 'billing', 'team'],
      manager: ['order', 'viewAll', 'download', 'branding'],
      estimator: ['order', 'download'],
      viewer: ['download']
    };
    var roleBtns = Array.prototype.slice.call(document.querySelectorAll('.role'));
    var boxes = Array.prototype.slice.call(document.querySelectorAll('[data-perm]'));
    var note = document.getElementById('role-note');

    function setRole(role) {
      roleBtns.forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-role') === role ? 'true' : 'false'); });
      if (presets[role]) {
        boxes.forEach(function (box) { box.checked = presets[role].indexOf(box.getAttribute('data-perm')) !== -1; });
        note.textContent = 'Pick a role to fill in permissions, then adjust any box below.';
      } else {
        note.textContent = 'Custom permissions — you changed the role defaults.';
      }
    }

    roleBtns.forEach(function (b) {
      b.addEventListener('click', function () { setRole(b.getAttribute('data-role')); });
    });
    boxes.forEach(function (box) {
      box.addEventListener('change', function () { setRole('custom'); });
    });
    setRole('estimator');
  }
})();
