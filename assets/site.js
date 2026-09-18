(function(){
  var $ = function(id){ return document.getElementById(id); };
  var root = document.body.getAttribute('data-root') || '';

  /* Header border on scroll */
  var header = document.querySelector('.site-header');
  if (header){
    var onScroll = function(){ header.classList.toggle('scrolled', window.scrollY > 8); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* Services dropdown */
  var trig = document.querySelector('.menu-trigger');
  if (trig){
    var panel = $(trig.getAttribute('aria-controls'));
    var wrap = trig.closest('.has-menu');
    var canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    var hoverTimer;
    var setDrop = function(open){
      trig.setAttribute('aria-expanded', String(open));
      panel.hidden = !open;
    };
    trig.addEventListener('click', function(e){
      var isOpen = trig.getAttribute('aria-expanded') === 'true';
      if (canHover && e.detail > 0) { setDrop(true); return; }
      setDrop(!isOpen);
    });
    document.addEventListener('click', function(e){ if (!e.target.closest('.has-menu')) setDrop(false); });
    document.addEventListener('keydown', function(e){
      if (e.key === 'Escape' && !panel.hidden){ setDrop(false); trig.focus(); }
    });
    wrap.addEventListener('focusout', function(e){ if (!wrap.contains(e.relatedTarget)) setDrop(false); });
    if (canHover){
      wrap.addEventListener('mouseenter', function(){ clearTimeout(hoverTimer); setDrop(true); });
      wrap.addEventListener('mouseleave', function(){ hoverTimer = setTimeout(function(){ setDrop(false); }, 180); });
    }
  }

  /* Mobile menu */
  var menuBtn = document.querySelector('.menu-btn');
  var menu = $('mobile-menu');
  if (menuBtn && menu){
    var setMenu = function(open){
      menuBtn.setAttribute('aria-expanded', String(open));
      menu.hidden = !open;
    };
    menuBtn.addEventListener('click', function(){ setMenu(menuBtn.getAttribute('aria-expanded') !== 'true'); });
    document.addEventListener('keydown', function(e){
      if (e.key === 'Escape' && !menu.hidden){ setMenu(false); menuBtn.focus(); }
    });
    var wide = window.matchMedia('(min-width: 901px)');
    var onWide = function(e){ if (e.matches) setMenu(false); };
    if (wide.addEventListener) wide.addEventListener('change', onWide); else if (wide.addListener) wide.addListener(onWide);
  }
  Array.prototype.forEach.call(document.querySelectorAll('.sub-toggle'), function(b){
    b.addEventListener('click', function(){
      var open = b.getAttribute('aria-expanded') !== 'true';
      b.setAttribute('aria-expanded', String(open));
      $(b.getAttribute('aria-controls')).hidden = !open;
    });
  });

  /* Engagement builder */
  if (document.querySelector('.builder')){
    var tiers = {
      1: { title: 'Product value maps',
           summary: 'I work with the people who built each product, plus product marketing, sales, and a handful of customers, to map what each product does for a buyer and which KPIs it moves.',
           fit: 'Companies that have never mapped what their products are worth to a buyer.',
           keep: 'A value map and value messaging for up to three products.',
           href: 'services/value-maps.html', link: 'See product value maps details' },
      2: { title: 'Value maps plus the toolkit',
           summary: "Adds the tools that put a buyer's own numbers into the story: calculators, business case decks, and questionnaires that capture their starting point.",
           fit: 'Teams whose buyers need a business case to get approval.',
           keep: 'Calculators, deck templates, one page summaries, and benchmark questionnaires.',
           href: 'services/engineering.html', link: 'See value engineering toolkit details' },
      3: { title: 'The full value system',
           summary: 'Adds business acumen training and AI value assistants, so your reps run value conversations three layers deep without waiting on an expert.',
           fit: 'Sales teams ready to sell on value without an expert on every call.',
           keep: 'Trained reps, AI value assistants, and a prompt library.',
           href: 'services/enablement.html', link: 'See enablement details' }
    };
    var addNames = { 2: 'Adds with the toolkit', 3: 'Adds with enablement' };
    var tierBtns = Array.prototype.slice.call(document.querySelectorAll('.tier'));
    var items = Array.prototype.slice.call(document.querySelectorAll('.deliverables li'));
    var meterBars = Array.prototype.slice.call(document.querySelectorAll('.tier-panel .meter-bars i'));
    var current = 1;
    var selectTier = function(n, focus){
      var prev = current;
      current = n;
      tierBtns.forEach(function(b){
        var t = +b.getAttribute('data-tier');
        b.setAttribute('aria-checked', String(t === n));
        b.tabIndex = t === n ? 0 : -1;
        b.classList.toggle('included', t < n);
        if (focus && t === n) b.focus();
      });
      items.forEach(function(li){
        var t = +li.getAttribute('data-tier');
        var on = t <= n;
        li.classList.toggle('on', on);
        li.querySelector('.tag').textContent = on ? '' : addNames[t];
        li.classList.remove('added');
        if (on && t > prev){ void li.offsetWidth; li.classList.add('added'); }
      });
      meterBars.forEach(function(bar, i){ bar.classList.toggle('on', i < n); });
      $('meter-label').textContent = 'Depth ' + n + ' of 3';
      $('tier-title').textContent = tiers[n].title;
      $('tier-summary').textContent = tiers[n].summary;
      $('tier-fit').textContent = tiers[n].fit;
      $('tier-keep').textContent = tiers[n].keep;
      var link = $('tier-link');
      if (link){ link.href = root + tiers[n].href; link.textContent = tiers[n].link; }
    };
    tierBtns.forEach(function(b){
      b.addEventListener('click', function(){ selectTier(+b.getAttribute('data-tier'), false); });
      b.addEventListener('keydown', function(e){
        var n = current;
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') n = current === 3 ? 1 : current + 1;
        else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') n = current === 1 ? 3 : current - 1;
        else if (e.key === 'Home') n = 1;
        else if (e.key === 'End') n = 3;
        else return;
        e.preventDefault();
        selectTier(n, true);
      });
    });
    selectTier(1, false);
  }

  /* Value calculator */
  if ($('in-pipeline')){
    var inp = { pipeline: $('in-pipeline'), win: $('in-win'), lift: $('in-lift'), disc: $('in-disc'), cut: $('in-cut') };
    var money = function(v){
      var a = Math.abs(v);
      if (a >= 1e6){
        var m = v / 1e6;
        return '$' + (m >= 100 ? m.toFixed(0) : m.toFixed(1)).replace(/\.0$/, '') + 'M';
      }
      if (a >= 1e3) return '$' + Math.round(v / 1e3) + 'K';
      return '$' + Math.round(v);
    };
    var pts = function(v){ v = +v; return (v % 1 === 0 ? v.toFixed(0) : v.toFixed(1)) + (v === 1 ? ' point' : ' points'); };
    var setFill = function(el){
      var min = +el.min, max = +el.max, val = +el.value;
      var pct = max > min ? ((val - min) / (max - min)) * 100 : 0;
      el.style.setProperty('--pct', pct + '%');
    };
    var setOut = function(id, input, text){ $(id).textContent = text; input.setAttribute('aria-valuetext', text); };
    var calc = function(){
      var disc = +inp.disc.value;
      var cutMax = Math.min(10, disc);
      inp.cut.max = String(cutMax);
      if (+inp.cut.value > cutMax) inp.cut.value = String(cutMax);
      var P = +inp.pipeline.value * 1e6, W = +inp.win.value / 100, L = +inp.lift.value / 100;
      var D = disc / 100, C = +inp.cut.value / 100;
      var today = P * W;
      var winGain = P * L;
      var listValue = (P * (W + L)) / (1 - D);
      var priceGain = listValue * C;
      var total = winGain + priceGain;
      var future = today + total;
      var todayPct = future > 0 ? (today / future) * 100 : 100;
      setOut('out-pipeline', inp.pipeline, money(P));
      setOut('out-win', inp.win, inp.win.value + '%');
      setOut('out-lift', inp.lift, pts(inp.lift.value));
      setOut('out-disc', inp.disc, inp.disc.value + '%');
      setOut('out-cut', inp.cut, pts(inp.cut.value));
      $('out-total').textContent = money(total);
      $('out-today').textContent = money(today);
      $('out-future').textContent = money(future);
      $('out-wingain').textContent = money(winGain);
      $('out-pricegain').textContent = money(priceGain);
      $('bar-today').style.width = todayPct + '%';
      $('bar-base').style.width = todayPct + '%';
      $('bar-gain').style.left = todayPct + '%';
      $('bar-gain').style.width = (100 - todayPct) + '%';
      $('bar-mark').style.left = todayPct + '%';
      Object.keys(inp).forEach(function(k){ setFill(inp[k]); });
    };
    Object.keys(inp).forEach(function(k){ inp[k].addEventListener('input', calc); });
    calc();
  }

  /* Copy email */
  var copyBtn = $('copy-email');
  if (copyBtn){
    var copyLabel = copyBtn.querySelector('span');
    var copyTimer;
    copyBtn.addEventListener('click', function(){
      var email = copyBtn.getAttribute('data-email');
      var done = function(ok){
        copyLabel.textContent = ok ? 'Email address copied' : 'Copy blocked. Select the address below.';
        clearTimeout(copyTimer);
        copyTimer = setTimeout(function(){ copyLabel.textContent = 'Copy email address'; }, 2600);
      };
      var fallback = function(){
        var ok = false;
        try {
          var t = document.createElement('textarea');
          t.value = email; t.setAttribute('readonly', '');
          t.style.position = 'absolute'; t.style.left = '-9999px';
          document.body.appendChild(t); t.select();
          ok = document.execCommand('copy');
          document.body.removeChild(t);
        } catch (err) { ok = false; }
        done(ok);
      };
      try {
        if (navigator.clipboard && navigator.clipboard.writeText){
          navigator.clipboard.writeText(email).then(function(){ done(true); }, fallback);
        } else { fallback(); }
      } catch (err) { fallback(); }
    });
  }
})();
