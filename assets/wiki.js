/* AXZ AI Wiki — 검색·키보드·빵부스러기 (v0.3)
   인라인 주입되므로 IIFE로 전역 오염 방지 */
(function(){
  'use strict';

  // === 페이지 인덱스 (검색용) ===
  // 경로는 ROOT 기준. 각 페이지에 인라인될 때 ROOT는 자동으로 계산.
  var ROOT = (function(){
    // 현재 페이지에서 사이트 루트까지의 상대 경로 계산
    var path = location.pathname.replace(/[^/]+$/, '');
    if (path.indexOf('/level-') >= 0) return '../';
    return '';
  })();

  var INDEX = [
    {cat:'시작',  title:'홈 · 학습 경로',         sub:'레벨 진단·전체 챕터 그리드', url:'index.html', kw:'home main 메인 홈 학습 경로 진단'},
    {cat:'시작',  title:'L0 시작하기',            sub:'모델 라인업·보안 3초 룰',     url:'level-0/index.html', kw:'l0 level0 시작 모델 보안 진단'},
    {cat:'L1',    title:'1-1 Claude 첫 만남',      sub:'로그인·UI·Projects',         url:'level-1/01-first-meeting.html', kw:'l1 처음 첫 만남 로그인 sso projects ui'},
    {cat:'L1',    title:'1-2 프롬프트 5요소',       sub:'역할·맥락·지시·제약·형식',    url:'level-1/02-prompt-5elements.html', kw:'l1 프롬프트 5요소 역할 맥락 지시 제약 형식 role context prompt'},
    {cat:'L1',    title:'1-3 모델 선택 결정 트리',  sub:'Opus·Sonnet·Haiku·혼용',     url:'level-1/03-model-selection.html', kw:'l1 모델 선택 결정 트리 opus sonnet haiku 혼용'},
    {cat:'L1',    title:'1-4 오늘 업무에 적용',     sub:'이메일·회의록·교정·번역',    url:'level-1/04-daily-work.html', kw:'l1 이메일 회의록 교정 번역 데이터 90초'},
    {cat:'L1',    title:'1-5 직무별 프롬프트 팩',   sub:'PM·디자인·개발·마케팅·HR',   url:'level-1/05-role-packs.html', kw:'l1 직무 pm 디자이너 개발 마케팅 hr 프롬프트 팩'},
    {cat:'L1',    title:'1-6 Claude Design 첫 걸음',sub:'자연어 목업→Figma',          url:'level-1/06-claude-design.html', kw:'l1 claude design 디자인 와이어 figma 목업'},
    {cat:'L1',    title:'1-7 90초 워크플로우',      sub:'치트시트·자주 틀리는 10가지', url:'level-1/07-cheatsheet.html', kw:'l1 치트시트 90초 워크플로우 단축키'},
    {cat:'L1실습',title:'L1 실습 트랙',            sub:'와이어프레임 30분',           url:'level-1/practice.html', kw:'l1 실습 와이어프레임 30분 세미나'},
    {cat:'L2',    title:'2-1 Claude Code 입문',     sub:'CLI 설치·init·CLAUDE.md',    url:'level-2/01-claude-code-intro.html', kw:'l2 claude code cli init 설치 sso'},
    {cat:'L2',    title:'2-2 슬래시 커맨드',         sub:'review·security·사내 슬래시',url:'level-2/02-slash-commands.html', kw:'l2 슬래시 커맨드 review security 명령'},
    {cat:'L2',    title:'2-3 서브에이전트와 훅',     sub:'Plan·Explore·pre-commit',    url:'level-2/03-subagents-hooks.html', kw:'l2 서브에이전트 훅 plan explore hook pre-commit'},
    {cat:'L2',    title:'2-4 MCP 커넥터 7종',        sub:'Slack·Notion·Sheets·Figma',  url:'level-2/04-mcp-connectors.html', kw:'l2 mcp 커넥터 slack notion sheets figma github supabase vercel'},
    {cat:'L2',    title:'2-5 세션 관리 · CLAUDE.md', sub:'HANDOFF.md·메모리 3계층',    url:'level-2/05-session-claudemd.html', kw:'l2 세션 claude.md handoff 메모리 opus 4.7 라우팅'},
    {cat:'L2',    title:'2-6 보안 실수 5선',         sub:'.env·API 토큰·MCP 권한',     url:'level-2/06-security.html', kw:'l2 보안 env 토큰 mcp 권한 시크릿'},
    {cat:'L2실습',title:'L2 실습 트랙',             sub:'Cowork CMS 프로토타입 25분', url:'level-2/practice.html', kw:'l2 실습 cowork cms 프로토타입 sql skill'},
    {cat:'L3',    title:'3-1 Agentic UX 6대 패턴',   sub:'패턴 맵·12주 로드맵',         url:'level-3/01-agentic-ux.html', kw:'l3 agentic ux 패턴 6대 design loop'},
    {cat:'L3',    title:'3-2 점진적 자율성',          sub:'Lv.1/2/3·강등 규칙·A/B',     url:'level-3/02-progressive-autonomy.html', kw:'l3 자율성 progressive autonomy 강등 lv1 lv2 lv3'},
    {cat:'L3',    title:'3-3 컨텍스트 보존',          sub:'HANDOFF.md·메모리 3계층',    url:'level-3/03-context-preservation.html', kw:'l3 컨텍스트 보존 context preservation handoff 메모리'},
    {cat:'L3',    title:'3-4 적응형 인터페이스',       sub:'숙련도 추정·3단 밀도',        url:'level-3/04-adaptive-ui.html', kw:'l3 적응형 adaptive ui beginner intermediate expert'},
    {cat:'L3',    title:'3-5 사용자 피드백 4단계 루프',sub:'Golden Set·A/B 회귀',        url:'level-3/05-feedback-loop.html', kw:'l3 피드백 feedback loop golden set ab 회귀 nsat'},
    {cat:'L3',    title:'3-6 멀티 에이전트 오케스트레이션',sub:'Supervisor·Swarm·Pipeline',url:'level-3/06-multi-agent.html', kw:'l3 멀티 에이전트 multi agent supervisor swarm pipeline tier'},
    {cat:'L3',    title:'3-7 하네스 · 관측 · 복구',    sub:'3종 스택·8위젯·플레이북',     url:'level-3/07-harness.html', kw:'l3 하네스 관측 복구 trace metric log otel chaos'},
    {cat:'L3',    title:'3-8 비개발자의 Claude Code', sub:'5종 슬래시·4주 커리큘럼',     url:'level-3/08-non-dev-cc.html', kw:'l3 비개발자 pm 디자이너 claude code 슬래시 4주'},
    {cat:'L3',    title:'3-9 패턴 1·3·5 + Eval',     sub:'Intent·Observable·Graceful', url:'level-3/09-patterns-eval.html', kw:'l3 패턴 135 intent observable graceful eval 4계층'},
    {cat:'L3',    title:'3-10 릴리즈 체크리스트 30항', sub:'내용·코드·정책·관측',         url:'level-3/10-release-checklist.html', kw:'l3 릴리즈 체크리스트 30 release'},
    {cat:'L3실습',title:'L3 실습 트랙',              sub:'Ralph·하네스·사내 사례 3종',  url:'level-3/practice.html', kw:'l3 실습 ralph 하네스 사내 사례 페르소나 ut 차량 추천'},
    {cat:'부록',  title:'도구 카탈로그',              sub:'28+개 도구·6 딥다이브',       url:'tools.html', kw:'도구 카탈로그 tools skill superpowers task master spec kit context7 vanna langgraph'},
  ];

  // === 빵부스러기 자동 생성 ===
  function autoBreadcrumb() {
    var el = document.getElementById('wiki-breadcrumb');
    if (!el) return;
    var page = (location.pathname.split('/').pop() || 'index.html');
    var inLevel = location.pathname.match(/level-([0-3])/);
    var crumbs = [];
    crumbs.push('<a href="' + ROOT + 'index.html">홈</a>');
    if (inLevel) {
      var lvl = inLevel[1];
      crumbs.push('<a href="' + ROOT + 'level-' + lvl + '/index.html">L' + lvl + (lvl==='0'?' 시작하기':lvl==='1'?' 초급':lvl==='2'?' 중급':' 고급') + '</a>');
    }
    // 현재 페이지
    var meta = INDEX.find(function(it){ return it.url.endsWith(page) && location.pathname.indexOf(it.url) >= 0 || it.url === (inLevel ? 'level-'+inLevel[1]+'/'+page : page); });
    if (!meta) meta = INDEX.find(function(it){ return location.pathname.indexOf(it.url) >= 0; });
    if (meta && !(meta.url.endsWith('index.html') && inLevel)) {
      crumbs.push('<span class="current">' + meta.title + '</span>');
    }
    el.innerHTML = crumbs.join('<span class="sep">›</span>');
  }

  // === Cmd+K 검색 모달 ===
  function buildSearchModal() {
    if (document.getElementById('wiki-search-modal')) return;
    var modal = document.createElement('div');
    modal.id = 'wiki-search-modal';
    modal.className = 'search-modal';
    modal.innerHTML = ''
      + '<div class="search-modal-inner" role="dialog" aria-label="위키 검색">'
      + '  <input class="search-modal-input" type="search" placeholder="챕터·도구·키워드 검색 (예: 5요소, mcp, 자율성)" autocomplete="off">'
      + '  <div class="search-modal-results" id="wiki-search-results"></div>'
      + '  <div class="search-modal-footer">'
      + '    <span><span class="kbd">↑↓</span> 이동 · <span class="kbd">Enter</span> 열기 · <span class="kbd">Esc</span> 닫기</span>'
      + '    <span>' + INDEX.length + ' 페이지</span>'
      + '  </div>'
      + '</div>';
    document.body.appendChild(modal);

    var input = modal.querySelector('.search-modal-input');
    var results = modal.querySelector('.search-modal-results');
    var focused = 0;

    function render(q) {
      q = (q || '').trim().toLowerCase();
      var items = !q ? INDEX.slice(0, 12) : INDEX.filter(function(it){
        var hay = (it.title + ' ' + it.sub + ' ' + (it.kw||'') + ' ' + it.cat).toLowerCase();
        return q.split(/\s+/).every(function(part){ return hay.indexOf(part) >= 0; });
      });
      focused = 0;
      if (!items.length) {
        results.innerHTML = '<div class="empty">결과 없음. 다른 키워드로 시도해보세요.</div>';
        return;
      }
      results.innerHTML = items.map(function(it, i){
        return '<a href="' + ROOT + it.url + '" class="' + (i===0?'focused':'') + '">'
          + '<span><span class="res-cat">' + it.cat + '</span><span class="res-title">' + it.title + '</span></span>'
          + '<span class="res-sub">' + it.sub + '</span>'
          + '</a>';
      }).join('');
    }

    function moveFocus(d) {
      var list = results.querySelectorAll('a');
      if (!list.length) return;
      list[focused] && list[focused].classList.remove('focused');
      focused = (focused + d + list.length) % list.length;
      list[focused].classList.add('focused');
      list[focused].scrollIntoView({block:'nearest'});
    }

    input.addEventListener('input', function(){ render(input.value); });
    input.addEventListener('keydown', function(e){
      if (e.key === 'ArrowDown') { e.preventDefault(); moveFocus(1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); moveFocus(-1); }
      else if (e.key === 'Enter') {
        e.preventDefault();
        var a = results.querySelector('a.focused') || results.querySelector('a');
        if (a) location.href = a.getAttribute('href');
      } else if (e.key === 'Escape') {
        closeModal();
      }
    });
    modal.addEventListener('click', function(e){ if (e.target === modal) closeModal(); });

    function openModal() {
      modal.classList.add('open');
      input.value = '';
      render('');
      setTimeout(function(){ input.focus(); }, 10);
    }
    function closeModal() { modal.classList.remove('open'); }

    window.__wikiSearchOpen = openModal;
    window.__wikiSearchClose = closeModal;
  }

  // === 사이드바 검색 박스 인라인 필터 ===
  function bindSidebarSearch() {
    var box = document.getElementById('wiki-sidebar-search');
    if (!box) return;
    var inp = box.querySelector('input');
    inp.addEventListener('focus', function(){ window.__wikiSearchOpen && window.__wikiSearchOpen(); inp.blur(); });
    inp.addEventListener('input', function(){ window.__wikiSearchOpen && window.__wikiSearchOpen(); inp.blur(); });
  }

  // === 키보드 단축키 ===
  function bindKeyboard() {
    document.addEventListener('keydown', function(e){
      var inField = /input|textarea|select/i.test(e.target.tagName);
      if (inField && e.target.type !== 'search') return;
      // Cmd+K / Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        window.__wikiSearchOpen && window.__wikiSearchOpen();
        return;
      }
      // / 키로 검색 (필드 밖에서만)
      if (!inField && e.key === '/' && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        window.__wikiSearchOpen && window.__wikiSearchOpen();
        return;
      }
      // ← → 로 이전/다음 챕터
      if (!inField && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
        var navs = document.querySelectorAll('.footer-nav a');
        if (navs.length >= 2) {
          var target = e.key === 'ArrowLeft' ? navs[0] : navs[1];
          if (target && target.href) location.href = target.href;
        }
      }
    });
  }

  // === 사이드바 현재 위치 점 표시 ===
  function markCurrentSidebar() {
    var links = document.querySelectorAll('.sidebar nav a');
    var here = location.pathname.split('/').pop();
    links.forEach(function(a){
      var href = a.getAttribute('href') || '';
      if (href.endsWith(here) && a.classList.contains('active')) {
        // 이미 active 표시됨
      }
    });
  }

  // === 테마 토글 === (FOUC는 <head>의 inline script가 처리)
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') document.body.classList.add('dark-theme');
    else document.body.classList.remove('dark-theme');
    document.querySelectorAll('.theme-toggle .theme-icon').forEach(function(i){
      i.textContent = theme === 'dark' ? '☀' : '🌙';
    });
    document.querySelectorAll('.theme-toggle').forEach(function(btn){
      btn.setAttribute('aria-label', theme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환');
    });
  }
  function bindThemeToggle() {
    var current = localStorage.getItem('axz-theme') === 'dark' ? 'dark' : 'light';
    applyTheme(current);
    document.addEventListener('click', function(e){
      var btn = e.target.closest('.theme-toggle');
      if (!btn) return;
      e.preventDefault();
      var now = document.body.classList.contains('dark-theme') ? 'light' : 'dark';
      localStorage.setItem('axz-theme', now);
      applyTheme(now);
    });
  }

  function init() {
    buildSearchModal();
    autoBreadcrumb();
    bindSidebarSearch();
    bindKeyboard();
    markCurrentSidebar();
    bindThemeToggle();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
