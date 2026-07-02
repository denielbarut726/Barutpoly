window.addEventListener("DOMContentLoaded", () => {
  const $ = (id) => document.getElementById(id);

  const screens = {
    intro: $("intro"),
    menu: $("menu"),
    setup: $("setup"),
    game: $("game")
  };

  const boardSpaces = [
    {n:"BAŞLANGIÇ",t:"corner",icon:"🏁"},
    {n:"Nişantaşı",t:"property",c:"#22c55e",price:320},
    {n:"Etiler",t:"property",c:"#22c55e",price:330},
    {n:"Park",t:"empty",icon:"🌳"},
    {n:"Levent",t:"property",c:"#22c55e",price:340},
    {n:"Metro",t:"transport",icon:"🚇",price:25,rent:10},
    {n:"ŞANS",t:"chance",icon:"❓"},
    {n:"Bebek",t:"property",c:"#2563eb",price:350},
    {n:"Lüks Vergi",t:"tax",icon:"💎",fee:150},
    {n:"Göktürk",t:"property",c:"#2563eb",price:400},
    {n:"KODESE GİR",t:"corner",icon:"⛓️"},
    {n:"Kasımpaşa",t:"property",c:"#7c2d12",price:80},
    {n:"Meydan",t:"empty",icon:"🏛️"},
    {n:"Gülbağ",t:"property",c:"#7c2d12",price:60},
    {n:"Elektrik Faturası",t:"tax",icon:"⚡",fee:50},
    {n:"Tramvay",t:"transport",icon:"🚋",price:25,rent:10},
    {n:"Kağıthane",t:"property",c:"#3b82f6",price:100},
    {n:"ŞANS",t:"chance",icon:"❓"},
    {n:"Sirkeci",t:"property",c:"#3b82f6",price:120},
    {n:"Eminönü",t:"property",c:"#3b82f6",price:140},
    {n:"HAPİS ZİYARETİ",t:"corner",icon:"👮"},
    {n:"Göztepe",t:"property",c:"#ec4899",price:160},
    {n:"Genel Vergi",t:"tax",icon:"🏛️",fee:200},
    {n:"Söğütlüçeşme",t:"property",c:"#ec4899",price:180},
    {n:"Karaköy",t:"property",c:"#ec4899",price:200},
    {n:"Otobüs",t:"transport",icon:"🚌",price:25,rent:10},
    {n:"Şişli",t:"property",c:"#f97316",price:220},
    {n:"Kafe",t:"empty",icon:"☕"},
    {n:"Harbiye",t:"property",c:"#f97316",price:240},
    {n:"Beyoğlu",t:"property",c:"#f97316",price:250},
    {n:"ÜCRETSİZ OTOPARK",t:"corner",icon:"🅿️"},
    {n:"Beşiktaş",t:"property",c:"#ef4444",price:260},
    {n:"ŞANS",t:"chance",icon:"❓"},
    {n:"Taksim",t:"property",c:"#ef4444",price:270},
    {n:"Mecidiyeköy",t:"property",c:"#ef4444",price:280},
    {n:"Vapur",t:"transport",icon:"⛴️",price:25,rent:10},
    {n:"Yeniköy",t:"property",c:"#eab308",price:290},
    {n:"Tarabya",t:"property",c:"#eab308",price:300},
    {n:"Su Faturası",t:"tax",icon:"💧",fee:75},
    {n:"Caddebostan",t:"property",c:"#eab308",price:310}
  ];

  const propertyStats = {
    "Gülbağ": [60,6,30,90,210,330,450,50],
    "Kasımpaşa": [80,8,40,120,280,440,600,50],
    "Kağıthane": [100,10,50,150,350,550,750,50],
    "Sirkeci": [120,12,60,180,420,660,900,50],
    "Eminönü": [140,14,70,210,490,770,1050,50],
    "Göztepe": [160,16,80,240,560,880,1200,100],
    "Söğütlüçeşme": [180,18,90,270,630,990,1350,100],
    "Karaköy": [200,20,100,300,700,1100,1500,100],
    "Şişli": [220,22,110,330,770,1210,1650,100],
    "Harbiye": [240,24,120,360,840,1320,1800,100],
    "Beyoğlu": [250,25,125,375,875,1375,1875,100],
    "Beşiktaş": [260,26,130,390,910,1430,1950,150],
    "Taksim": [270,27,135,405,945,1485,2025,150],
    "Mecidiyeköy": [280,28,140,420,980,1540,2100,150],
    "Yeniköy": [290,29,145,435,1015,1595,2175,150],
    "Tarabya": [300,30,150,450,1050,1650,2250,150],
    "Caddebostan": [310,31,155,465,1085,1705,2325,150],
    "Nişantaşı": [320,32,160,480,1120,1760,2400,200],
    "Etiler": [330,33,165,495,1155,1815,2475,200],
    "Levent": [340,34,170,510,1190,1870,2550,200],
    "Bebek": [350,35,175,525,1225,1925,2625,200],
    "Göktürk": [400,40,200,600,1400,2200,3000,200]
  };

    const playlist = [
    { title:"Neredesin", artist:"Ezhel", file:"assets/sounds/music1.mp3", cover:"assets/covers/music1.jpg" },
    { title:"Влюбился в неё", artist:"Onlife & The Smi", file:"assets/sounds/music3.mp3", cover:"assets/covers/music3.jpg" },
    { title:"Billionaire", artist:"Otilia", file:"assets/sounds/music4.mp3", cover:"assets/covers/music4.jpg" },
    { title:"Gül ki Sevgilim", artist:"Oğuzhan Koç", file:"assets/sounds/music2.mp3", cover:"assets/covers/music2.jpg" }
  ];

  let selectedPlayerCount = 2;
  let players = [];
  let activePlayerIndex = 0;
  let currentTrack = 0;
  let isPlaying = false;
  let gameStartedAt = null;
  let gameTimer = null;
  let currentOpenSpaceIndex = null;
  let currentBuyerIndex = null;
  let pendingRent = null;
  let pendingChancePlayerIndex = null;
  let chanceCardActive = false;
  let buildMode = null;
  let hasRolledThisTurn = false;
  let canEndTurn = false;
  let auctionState = null;
  let activityLog = [];
  let suppressFailUntil = 0;

  const sfx = {
    buy: new Audio("assets/sounds/buy.mp3"),
    click: new Audio("assets/sounds/click.mp3"),
    card: new Audio("assets/sounds/card.mp3"),
    dice: new Audio("assets/sounds/dice.mp3"),
    jail: new Audio("assets/sounds/jail.mp3"),
    fail: new Audio("assets/sounds/fail.mp3"),
    step: new Audio("assets/sounds/step.mp3"),
    win: new Audio("assets/sounds/win.mp3"),
    money: new Audio("assets/sounds/money.mp3"),
    lose: new Audio("assets/sounds/lose.mp3"),
    auction: new Audio("assets/sounds/auction.mp3")
  };

  const loopSounds = new Set(["dice", "step"]);

  Object.entries(sfx).forEach(([name, audio]) => {
    audio.volume = name === "step" ? 0.28 : 0.45;
    audio.preload = "auto";
    audio.loop = loopSounds.has(name);
  });

  function playSound(name){
    if(name === "fail" && Date.now() < suppressFailUntil) return;
    if(!settings.effects) return;
    const audio = sfx[name];
    if(!audio) return;
    audio.pause();
    audio.currentTime = 0;
    audio.loop = false;
    audio.play().catch(() => {});
  }

  function startLoopSound(name){
    if(!settings.effects) return;
    const audio = sfx[name];
    if(!audio) return;
    audio.pause();
    audio.currentTime = 0;
    audio.loop = true;
    audio.play().catch(() => {});
  }

  function stopSound(name){
    const audio = sfx[name];
    if(!audio) return;
    audio.pause();
    audio.currentTime = 0;
  }

  function stopAllLoopSounds(){
    ["dice","step"].forEach(stopSound);
  }

  const settings = {
    effects: true,
    music: true,
    volume: 75
  };

  function loadSettings(){
    try{
      const saved = JSON.parse(localStorage.getItem("barutpolySettings"));
      if(saved){
        settings.effects = saved.effects ?? true;
        settings.music = saved.music ?? true;
        settings.volume = saved.volume ?? 75;
      }
    }catch(e){}

    applySettings();
    refreshSettingsUI();
  }

  function saveSettings(){
    localStorage.setItem("barutpolySettings", JSON.stringify(settings));
  }

  function applySettings(){
    const master = Math.max(0, Math.min(100, settings.volume)) / 100;

    Object.entries(sfx).forEach(([name, audio]) => {
      audio.volume = name === "step" ? master * 0.45 : master * 0.75;
    });

    const musicAudio = $("musicAudio");
    if(musicAudio) musicAudio.volume = settings.music ? master * 0.45 : 0;

    const volumeBar = $("volumeBar");
    if(volumeBar) volumeBar.value = settings.music ? String(master * 0.45) : "0";
  }

  function refreshSettingsUI(){
    const effectsToggle = $("effectsToggle");
    const musicToggleSetting = $("musicToggleSetting");
    const slider = $("masterVolumeSlider");
    const volumeValue = $("volumeValue");

    if(effectsToggle){
      effectsToggle.textContent = settings.effects ? "AÇIK" : "KAPALI";
      effectsToggle.classList.toggle("off", !settings.effects);
    }

    if(musicToggleSetting){
      musicToggleSetting.textContent = settings.music ? "AÇIK" : "KAPALI";
      musicToggleSetting.classList.toggle("off", !settings.music);
    }

    if(slider) slider.value = settings.volume;
    if(volumeValue) volumeValue.textContent = `${settings.volume}%`;
  }

  function openSettings(){
    const overlay = $("settingsOverlay");
    if(!overlay) return;
    overlay.classList.remove("hidden");
    showSettingsPage("settingsHome");
    requestAnimationFrame(() => overlay.classList.add("show"));
  }

  function closeSettings(){
    const overlay = $("settingsOverlay");
    if(!overlay) return;
    overlay.classList.remove("show");
    setTimeout(() => overlay.classList.add("hidden"), 280);
  }

  function showSettingsPage(pageId){
    ["settingsHome","soundSettingsPage","screenSettingsPage"].forEach(id => {
      $(id)?.classList.toggle("active", id === pageId);
    });
  }

  function toggleFullscreen(){
    if(!document.fullscreenElement){
      document.documentElement.requestFullscreen?.();
    }else{
      document.exitFullscreen?.();
    }
  }




  function showScreen(name){
    Object.values(screens).forEach(s => { s?.classList.add("hidden"); s?.classList.remove("visible"); s?.classList.remove("gameVisible"); });
    const screen = screens[name];
    screen?.classList.remove("hidden");
    if(name === "game"){
      requestAnimationFrame(() => screen?.classList.add("gameVisible"));
    }else{
      requestAnimationFrame(() => screen?.classList.add("visible"));
    }
  }

  function setupLogo(){
    const logo = $("boardLogo");
    const fallback = $("boardFallbackLogo");
    if(!logo || !fallback) return;

    const paths = [
      "assets/images/barutpoly.png",
      "./assets/images/barutpoly.png",
      "assets/İmages/barutpoly.png",
      "./assets/İmages/barutpoly.png",
      "assets/images/barutpoly-logo.png",
      "./assets/images/barutpoly-logo.png"
    ];

    let i = 0;
    logo.addEventListener("load", () => {
      logo.style.display = "block";
      fallback.style.display = "none";
    });
    logo.addEventListener("error", () => {
      i++;
      if(i < paths.length) logo.src = paths[i];
      else {
        logo.style.display = "none";
        fallback.style.display = "block";
      }
    });
    logo.src = paths[0];
  }

  function renderNameInputs(){
    const holder = $("nameInputs");
    if(!holder) return;
    holder.innerHTML = "";

    for(let i=1;i<=selectedPlayerCount;i++){
      const wrap = document.createElement("div");
      wrap.className = "player-setup-card";

      wrap.innerHTML = `
        <div class="player-setup-head">
          <span class="player-setup-dot p${i}"></span>
          <b>OYUNCU ${i}</b>
        </div>

        <input class="player-name" type="text" value="Oyuncu ${i}">

        <div class="player-type-switch">
          <button type="button" class="type-choice active" data-type="human">İnsan</button>
          <button type="button" class="type-choice" data-type="bot">Bot 🤖</button>
          <input class="player-type" type="hidden" value="human">
        </div>
      `;

      const choices = wrap.querySelectorAll(".type-choice");
      const hidden = wrap.querySelector(".player-type");

      choices.forEach(btn => {
        btn.addEventListener("click", () => {
          choices.forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
          hidden.value = btn.dataset.type;
          playSound("click");
        });
      });

      holder.appendChild(wrap);
    }
  }

  function createPlayers(){
    const inputs = [...document.querySelectorAll(".player-name")];
    const types = [...document.querySelectorAll(".player-type")];

    players = inputs.map((input,index) => ({
      name: input.value.trim() || `Oyuncu ${index + 1}`,
      money: 1500,
      position: 0,
      owned: [],
      housesAvailable: 12,
      hotelsAvailable: 4,
      jailTurns: 0,
      isBot: types[index]?.value === "bot",
      className: `p${index + 1}`
    }));

    activePlayerIndex = 0;
    hasRolledThisTurn = false;
    canEndTurn = false;
  }

  function tileHTML(space){
    if(space.t === "property"){
      return `<div class="bar" style="background:${space.c}"></div><div class="tile-name">${space.n}</div><div class="tile-price">${space.price} TL</div>`;
    }
    if(space.t === "transport"){
      return `<div class="tile-icon">${space.icon}</div><div class="tile-name">${space.n}</div><div class="tile-price">${space.price} TL</div>`;
    }
    if(space.t === "tax"){
      return `<div class="tile-icon">${space.icon}</div><div class="tile-name">${space.n}</div><div class="tile-price">${space.fee} TL</div>`;
    }
    return `<div class="tile-icon">${space.icon || ""}</div><div class="tile-name">${space.n}</div>`;
  }

  function isLongName(name){
    return name.length > 15 || name.includes("Faturası") || name.includes("Metrosu") || name.includes("Tramvayı") || name.includes("Vapuru") || name.includes("Havalimanı");
  }

  function getTileRect(index){
    const corner = 11.4;
    const small = (100 - corner * 2) / 9;
    let x=0,y=0,w=small,h=small;

    if(index === 0){ x=100-corner; y=100-corner; w=corner; h=corner; }
    else if(index < 10){ x=100-corner-index*small; y=100-corner; w=small; h=corner; }
    else if(index === 10){ x=0; y=100-corner; w=corner; h=corner; }
    else if(index < 20){ x=0; y=100-corner-(index-10)*small; w=corner; h=small; }
    else if(index === 20){ x=0; y=0; w=corner; h=corner; }
    else if(index < 30){ x=corner+(index-21)*small; y=0; w=small; h=corner; }
    else if(index === 30){ x=100-corner; y=0; w=corner; h=corner; }
    else { x=100-corner; y=corner+(index-31)*small; w=corner; h=small; }

    return {x,y,w,h};
  }

  function createBoard(){
    const board = $("board");
    if(!board) return;

    board.querySelectorAll(".tile").forEach(t => t.remove());

    boardSpaces.forEach((space,index) => {
      const rect = getTileRect(index);
      const tile = document.createElement("div");
      tile.className = `tile ${space.t}`;
      if(isLongName(space.n)) tile.classList.add("small-text");
      tile.style.left = `${rect.x}%`;
      tile.style.top = `${rect.y}%`;
      tile.style.width = `${rect.w}%`;
      tile.style.height = `${rect.h}%`;
      tile.innerHTML = tileHTML(space);
      tile.addEventListener("click", () => openCard(space, index));
      board.appendChild(tile);
    });
  }

  function createTokens(){
    const layer = $("tokenLayer");
    if(!layer) return;
    layer.innerHTML = "";
    players.forEach((p,index) => {
      const token = document.createElement("div");
      token.id = `playerToken${index}`;
      token.className = `player-token ${p.className}`;
      layer.appendChild(token);
    });
    updateTokens();
  }

  function getTokenPoint(position,index){
    const r = getTileRect(position);
    const offsets = [[-2.2,-2.2],[2.2,-2.2],[-2.2,2.2],[2.2,2.2],[0,-2.6],[0,2.6]];
    const o = offsets[index % offsets.length];
    return {left:r.x + r.w/2 + o[0], top:r.y + r.h/2 + o[1]};
  }

  function updateTokens(){
    players.forEach((p,index) => {
      const token = $(`playerToken${index}`);
      if(!token) return;
      const point = getTokenPoint(p.position,index);
      token.style.left = `${point.left}%`;
      token.style.top = `${point.top}%`;
    });
  }


  function setActiveToken(){
    players.forEach((p,index) => {
      const token = $(`playerToken${index}`);
      if(!token) return;
      token.classList.toggle("active-token", index === activePlayerIndex);
    });
  }

  function moveTokenVisual(playerIndex){
    const token = $(`playerToken${playerIndex}`);
    if(!token) return;
    const point = getTokenPoint(players[playerIndex].position, playerIndex);
    token.classList.remove("moving");
    token.style.left = `${point.left}%`;
    token.style.top = `${point.top}%`;
    void token.offsetWidth;
    token.classList.add("moving");
    setTimeout(() => token.classList.remove("moving"), 240);
  }

  async function movePlayerStepByStep(playerIndex, steps){
    const player = players[playerIndex];

    startLoopSound("step");

    for(let i = 0; i < steps; i++){
      player.position = (player.position + 1) % boardSpaces.length;
      moveTokenVisual(playerIndex);
      await wait(330);
    }

    stopSound("step");
    playSound("click");
  }

  function wait(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
  }


  function getPlayerColor(index){
    const colors = ["#2563eb","#ef4444","#22c55e","#facc15","#ec4899","#06b6d4"];
    return colors[index % colors.length];
  }

  function getOwnerIndex(spaceIndex){
    return players.findIndex(p => p.owned.includes(spaceIndex));
  }

  function getSpacePurchasePrice(space){
    if(space.t === "property") return space.price || 0;
    if(space.t === "transport") return space.price || 25;
    return 0;
  }

  function getSpaceRent(space){
    if(space.t === "property"){
      const stats = propertyStats[space.n];
      return stats ? stats[1] : Math.max(5, Math.round((space.price || 100) * 0.1));
    }
    if(space.t === "transport") return space.rent || 10;
    return 0;
  }

  function refreshTileOwnership(){
    document.querySelectorAll(".tile").forEach((tile, index) => {
      tile.classList.remove("owned");
      tile.style.removeProperty("--owner-color");
      tile.querySelector(".owner-badge")?.remove();

      const ownerIndex = getOwnerIndex(index);
      if(ownerIndex >= 0){
        const color = getPlayerColor(ownerIndex);
        tile.classList.add("owned");
        tile.style.setProperty("--owner-color", color);
        const badge = document.createElement("div");
        badge.className = "owner-badge";
        badge.style.setProperty("--owner-color", color);
        tile.appendChild(badge);
      }
    });
  }


  function playPaymentSound(){
    playSound("fail");
  }

  function showPaymentPopup(playerIndex, amount){
    showMoneyPopup(playerIndex, -Math.abs(amount));
  }


  function isBuyAllowedForCurrentCard(index){
    if(index === null) return false;
    if(currentBuyerIndex === null) return false;
    if(currentBuyerIndex !== activePlayerIndex) return false;
    if(!hasRolledThisTurn) return false;
    const player = players[currentBuyerIndex];
    return player && player.position === index;
  }

  function canBuySpace(space){
    return space && (space.t === "property" || space.t === "transport");
  }

  function renderPlayers(){
    const list = $("playersList");
    if(!list) return;
    const colors = ["blue","red","green","yellow","pink","cyan"];
    list.innerHTML = "";
    players.forEach((p,index) => {
      const row = document.createElement("div");
      row.className = `player-row ${colors[index] || "blue"} ${index === activePlayerIndex ? "active" : ""}`;
      const jailTag = p.jailTurns > 0 ? `<em class="jail-tag">⛓️ ${p.jailTurns}</em>` : "";
      const botTag = p.isBot ? `<em class="bot-tag">🤖 BOT</em>` : "";
      row.innerHTML = `<span></span><b>${p.name}${botTag}${jailTag}</b><strong>${p.money} TL</strong>`;
      list.appendChild(row);
    });
  }


  function updateTurnButtons(){
    const rollBtn = $("rollDiceBtn");
    const endBtn = $("endTurnBtn");

    if(rollBtn) rollBtn.disabled = hasRolledThisTurn || (players[activePlayerIndex]?.jailTurns > 0);
    if(endBtn) endBtn.disabled = !canEndTurn;
  }

  function finishTurn(){
    if(pendingRent && !pendingRent.paid){
      showRentWarning();
      return;
    }

    if(!canEndTurn) return;

    closeCard();

    activePlayerIndex = (activePlayerIndex + 1) % players.length;
    hasRolledThisTurn = false;
    canEndTurn = false;
    currentOpenSpaceIndex = null;
    currentBuyerIndex = null;

    const nextPlayer = players[activePlayerIndex];
    if(nextPlayer && nextPlayer.jailTurns > 0){
      nextPlayer.jailTurns -= 1;
      hasRolledThisTurn = true;
      canEndTurn = true;
      $("diceTotal").textContent = `${nextPlayer.name} hapiste. Kalan tur: ${nextPlayer.jailTurns}`;
      addActivity(`⛓️ ${nextPlayer.name} hapiste bekledi. Kalan tur: ${nextPlayer.jailTurns}`);
      playSound("jail");
    }else{
      $("diceTotal").textContent = "Sıra yeni oyuncuda.";
      addActivity(`➡️ Sıra ${nextPlayer.name} oyuncusunda.`);
      playSound("click");
    }
    updatePanel();
    updateTurnButtons();
    renderLeftPlayerPanel();
  }


  function renderLeftPlayerPanel(){
    if(!players.length) return;
    const p = players[activePlayerIndex];
    const panel = $("leftPlayerPanel");
    const colorNames = ["active-blue","active-red","active-green","active-yellow","active-pink","active-cyan"];

    if(panel){
      colorNames.forEach(c => panel.classList.remove(c));
      panel.classList.add(colorNames[activePlayerIndex] || "active-blue");
    }

    if($("leftPanelTitle")) $("leftPanelTitle").textContent = `${p.name} ALANI`;
    if($("readyHouseCount")) $("readyHouseCount").textContent = p.housesAvailable ?? 12;
    if($("readyHotelCount")) $("readyHotelCount").textContent = p.hotelsAvailable ?? 4;
    if($("ownedCardCount")) $("ownedCardCount").textContent = p.owned.length;

    const holder = $("miniOwnedCards");
    if(!holder) return;
    holder.innerHTML = "";

    p.owned.slice(0,8).forEach((index, deckIndex) => {
      const space = boardSpaces[index];
      const card = document.createElement("div");
      card.className = "mini-owned-card";
      card.title = space.n;
      card.style.setProperty("--card-color", space.c || "#6d28d9");
      card.style.setProperty("--deck-x", `${(deckIndex - Math.min(p.owned.length,8) / 2) * 10}px`);
      card.style.setProperty("--deck-rot", `${(deckIndex - 3) * 4}deg`);
      holder.appendChild(card);
    });
  }

  function openSideInfo(type){
    const overlay = $("sideInfoOverlay");
    const title = $("sideInfoTitle");
    const body = $("sideInfoBody");
    if(!overlay || !title || !body) return;

    const p = players[activePlayerIndex];

    if(type === "properties"){
      title.textContent = "⌂ Mülklerim";
      if(!p || p.owned.length === 0){
        body.innerHTML = `<div class="empty-info">Henüz mülkün yok.</div>`;
      }else{
        body.innerHTML = `<div class="owned-list">${
          p.owned.map(index => {
            const s = boardSpaces[index];
            return `<div class="owned-list-card" style="--card-color:${s.c || '#6d28d9'}">
              <b>${s.n}</b>
              <small>${s.t === 'transport' ? 'Ulaşım' : 'Semt'}</small><br>
              <small>Değer: ${getSpacePurchasePrice(s)} TL</small><br>
              <small>Kira: ${getSpaceRent(s)} TL</small>
            </div>`;
          }).join("")
        }</div>`;
      }
    }else{
      title.textContent = "▣ Kartlar";
      body.innerHTML = `
        <div class="empty-info">
          Şans kartları ve özel kart destesi sonraki sürümde burada açılacak.
        </div>
      `;
    }

    overlay.classList.remove("hidden");
    requestAnimationFrame(() => overlay.classList.add("show"));
  }

  function closeSideInfo(){
    const overlay = $("sideInfoOverlay");
    if(!overlay) return;
    overlay.classList.remove("show");
    setTimeout(() => overlay.classList.add("hidden"), 250);
  }


  function addActivity(text){
    activityLog.unshift(text);
    activityLog = activityLog.slice(0, 12);

    const feed = $("activityFeed");
    if(!feed) return;

    feed.innerHTML = "";
    activityLog.forEach(item => {
      const div = document.createElement("div");
      div.className = "activity-item";
      div.textContent = item;
      feed.appendChild(div);
    });
  }



  function countPlayerBuildings(playerIndex){
    const p = players[playerIndex];
    let houses = 0;
    let hotels = 0;

    if(p?.buildings){
      Object.values(p.buildings).forEach(b => {
        if(b.hotel) hotels += 1;
        else houses += b.houses || 0;
      });
    }

    return {houses, hotels};
  }

  function getGameTimeText(){
    return $("gameClock")?.textContent || "00:00:00";
  }

  function spawnWinnerConfetti(){
    const colors = ["#f6c453","#a855f7","#22c55e","#ef4444","#38bdf8","#ffffff"];
    for(let i=0;i<90;i++){
      const c = document.createElement("div");
      c.className = "confetti-piece";
      c.style.left = `${Math.random()*100}vw`;
      c.style.background = colors[Math.floor(Math.random()*colors.length)];
      c.style.animationDelay = `${Math.random()*0.75}s`;
      c.style.transform = `rotate(${Math.random()*180}deg)`;
      document.body.appendChild(c);
      setTimeout(() => c.remove(), 3600);
    }
  }

  function showWinnerScreen(playerIndex){
    const overlay = $("winnerOverlay");
    const player = players[playerIndex];
    if(!overlay || !player || overlay.classList.contains("show")) return;

    const b = countPlayerBuildings(playerIndex);

    $("winnerName").textContent = `${player.name} KAZANDI!`;
    $("winnerMoney").textContent = `${player.money} TL`;
    $("winnerOwned").textContent = player.owned.length;
    $("winnerHouses").textContent = b.houses;
    $("winnerHotels").textContent = b.hotels;
    $("winnerTime").textContent = getGameTimeText();

    overlay.classList.remove("hidden");
    requestAnimationFrame(() => overlay.classList.add("show"));

    playSound("win");
    spawnWinnerConfetti();

    if(typeof addActivity === "function"){
      addActivity(`🏆 ${player.name} oyunu kazandı!`);
    }
  }

  function checkWinnerScreen(){
    if(players.length <= 1) return;
    const alive = players
      .map((p, i) => ({p, i}))
      .filter(x => x.p.money > 0);

    if(alive.length === 1){
      showWinnerScreen(alive[0].i);
    }
  }


  function updatePanel(){
    if(!players.length) return;
    const p = players[activePlayerIndex];
    const location = boardSpaces[p.position]?.n || "-";
    $("turnPill").textContent = `Sıra: ${p.name}`;
    $("activeMoney").textContent = `${p.money} TL`;
    $("activeLocation").textContent = location;
    $("ownedCount").textContent = p.owned.length;
    renderPlayers();
    setActiveToken();
    refreshTileOwnership();
    updateTurnButtons();
    checkWinnerScreen();
  }

  function startGame(){
    createPlayers();
    createBoard();
    createTokens();
    refreshTileOwnership();
    renderDice(1,1);
    updatePanel();
    showScreen("game");
    $("setup").classList.add("hidden");
    pauseMusic();
    startClock();
  }

  function renderOneDie(el, value){
    if(!el) return;

    const spots = {
      1:["mc"],
      2:["tl","br"],
      3:["tl","mc","br"],
      4:["tl","tr","bl","br"],
      5:["tl","tr","mc","bl","br"],
      6:["tl","tr","ml","mr","bl","br"]
    };

    el.innerHTML = "";
    (spots[value] || []).forEach(pos => {
      const pip = document.createElement("span");
      pip.className = `pip ${pos}`;
      el.appendChild(pip);
    });
  }

  function renderDice(d1,d2){
    renderOneDie($("diceOne"), d1);
    renderOneDie($("diceTwo"), d2);
  }

  function showMoneyPopup(playerIndex, amount){
    const rows = document.querySelectorAll(".player-row");
    const row = rows[playerIndex];

    const popup = document.createElement("div");
    popup.className = amount >= 0 ? "screen-money-popup plus" : "screen-money-popup minus";
    popup.textContent = amount >= 0 ? `+${amount} TL` : `${amount} TL`;

    if(row){
      const rect = row.getBoundingClientRect();
      popup.style.left = `${rect.right - 88}px`;
      popup.style.top = `${rect.top + rect.height / 2}px`;
    }else{
      popup.style.right = "390px";
      popup.style.top = "220px";
    }

    document.body.appendChild(popup);

    if(amount > 0) playSound("money");

    setTimeout(() => popup.remove(), 1400);
  }

  async function rollDice(){
    if(!players.length) return;
    if(hasRolledThisTurn) return;

    if(players[activePlayerIndex]?.jailTurns > 0){
      $("diceTotal").textContent = `${players[activePlayerIndex].name} hapiste. Turunu bitir.`;
      canEndTurn = true;
      updateTurnButtons();
      updatePanel();
      return;
    }

    hasRolledThisTurn = true;
    canEndTurn = false;
    updateTurnButtons();

    const btn = $("rollDiceBtn");
    const diceBox = document.querySelector(".dice-box");
    btn.disabled = true;
    btn.classList.add("rolling-btn");
    diceBox?.classList.add("rolling-glow");

    $("diceTotal").textContent = "Zar atılıyor...";
    $("diceTotal").classList.add("rolling-text");
    $("diceOne").classList.add("rolling");
    $("diceTwo").classList.add("rolling");
    startLoopSound("dice");

    const rollDuration = 900;
    const startedAt = Date.now();

    while(Date.now() - startedAt < rollDuration){
      renderDice(rand(1,6), rand(1,6));
      await wait(75);
    }

    const d1 = rand(1,6);
    const d2 = rand(1,6);
    const total = d1 + d2;

    renderDice(d1,d2);
    $("diceOne").classList.remove("rolling");
    $("diceTwo").classList.remove("rolling");
    $("diceTotal").classList.remove("rolling-text");
    stopSound("dice");

    const playerIndex = activePlayerIndex;
    const player = players[playerIndex];
    const oldPos = player.position;
    const rawNewPos = oldPos + total;
    const passedStart = rawNewPos >= boardSpaces.length;

    $("diceTotal").textContent = `Toplam: ${total}`;
    addActivity(`🎲 ${player.name} ${total} attı.`);
    await movePlayerStepByStep(playerIndex, total);

    const landedIndex = player.position;

    if(passedStart){
      player.money += 200;
      $("diceTotal").textContent = `Toplam: ${total} | +200 TL`;
      showMoneyPopup(playerIndex, 200);
      addActivity(`💰 ${player.name} başlangıçtan geçti, 200 TL aldı.`);
    }

    afterPlayerLands(playerIndex, landedIndex);

    await wait(500);

    canEndTurn = true;
    updatePanel();

    diceBox?.classList.remove("rolling-glow");
    btn.classList.remove("rolling-btn");
    updateTurnButtons();
  }

  function rand(min,max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function addCardRow(label,value){
    const row = document.createElement("div");
    row.className = "card-row";
    row.innerHTML = `<span>${label}</span><strong>${value}</strong>`;
    $("cardRows").appendChild(row);
  }

  function openCard(space, index = null){
    currentOpenSpaceIndex = index;
    currentBuyerIndex = activePlayerIndex;
    playSound("card");
    const overlay = $("propertyOverlay");
    overlay.classList.remove("hidden","closing");
    requestAnimationFrame(() => overlay.classList.add("show"));

    $("cardTitle").textContent = space.n;
    $("cardColorBar").style.background = space.c || "#f6c453";
    $("cardIcon").textContent = space.icon || "🏠";
    $("cardRows").innerHTML = "";
    document.querySelectorAll(".card-owner-line, .card-warning-line, .rent-info-line, .rent-warning-line").forEach(el => el.remove());
    $("buyBtn").disabled = false;
    $("buyBtn").classList.remove("rent-pay-mode");

    if(space.t === "property"){
      $("cardType").textContent = "MÜLK KARTI";
      const s = propertyStats[space.n];
      [["Satın Alma",s[0]],["Boş Kira",s[1]],["1 Ev",s[2]],["2 Ev",s[3]],["3 Ev",s[4]],["4 Ev",s[5]],["Otel",s[6]],["Ev Maliyeti",s[7]]]
        .forEach(([a,b]) => addCardRow(a,`${b} TL`));
      const ownerIndex = index !== null ? getOwnerIndex(index) : -1;
      const ownerLine = document.createElement("div");
      ownerLine.className = "card-owner-line";

      if(ownerIndex >= 0){
        ownerLine.innerHTML = `Sahibi: <strong>${players[ownerIndex].name}</strong>`;
        $("cardRows").before(ownerLine);

        if(ownerIndex !== activePlayerIndex && pendingRent && pendingRent.spaceIndex === index && !pendingRent.paid){
          const rentLine = document.createElement("div");
          rentLine.className = "rent-info-line";
          rentLine.innerHTML = `<strong>${pendingRent.rent} TL</strong> kira öde`;
          $("cardRows").before(rentLine);

          $("buyBtn").style.display = "block";
          $("buyBtn").disabled = false;
          $("buyBtn").classList.add("rent-pay-mode");
          $("buyBtn").textContent = `${pendingRent.rent} TL KİRA ÖDE`;
        }else{
          $("buyBtn").style.display = "block";
          $("buyBtn").disabled = true;
          $("buyBtn").classList.remove("rent-pay-mode");
          $("buyBtn").textContent = ownerIndex === activePlayerIndex ? "BU MÜLK SENİN" : "SATIN ALINMIŞ";
        }
      }else{
        ownerLine.innerHTML = `Sahibi: <strong>Yok</strong>`;
        $("cardRows").before(ownerLine);

        if(isBuyAllowedForCurrentCard(index)){
          $("buyBtn").style.display = "block";
          $("buyBtn").disabled = false;
          $("buyBtn").textContent = "SATIN AL";
        }else{
          const warn = document.createElement("div");
          warn.className = "card-warning-line";
          warn.textContent = "Satın almak için bu kareye zarla gelmelisin.";
          $("cardRows").before(warn);

          $("buyBtn").style.display = "block";
          $("buyBtn").disabled = true;
          $("buyBtn").textContent = "BURADAN SATIN ALAMAZSIN";
        }
      }
    }else if(space.t === "transport"){
      $("cardType").textContent = "ULAŞIM KARTI";
      addCardRow("Satın Alma","25 TL");
      addCardRow("Kira","10 TL");
      const ownerIndex = index !== null ? getOwnerIndex(index) : -1;
      const ownerLine = document.createElement("div");
      ownerLine.className = "card-owner-line";

      if(ownerIndex >= 0){
        ownerLine.innerHTML = `Sahibi: <strong>${players[ownerIndex].name}</strong>`;
        $("cardRows").before(ownerLine);

        if(ownerIndex !== activePlayerIndex && pendingRent && pendingRent.spaceIndex === index && !pendingRent.paid){
          const rentLine = document.createElement("div");
          rentLine.className = "rent-info-line";
          rentLine.innerHTML = `<strong>${pendingRent.rent} TL</strong> kira öde`;
          $("cardRows").before(rentLine);

          $("buyBtn").style.display = "block";
          $("buyBtn").disabled = false;
          $("buyBtn").classList.add("rent-pay-mode");
          $("buyBtn").textContent = `${pendingRent.rent} TL KİRA ÖDE`;
        }else{
          $("buyBtn").style.display = "block";
          $("buyBtn").disabled = true;
          $("buyBtn").classList.remove("rent-pay-mode");
          $("buyBtn").textContent = ownerIndex === activePlayerIndex ? "BU ULAŞIM SENİN" : "SATIN ALINMIŞ";
        }
      }else{
        ownerLine.innerHTML = `Sahibi: <strong>Yok</strong>`;
        $("cardRows").before(ownerLine);

        if(isBuyAllowedForCurrentCard(index)){
          $("buyBtn").style.display = "block";
          $("buyBtn").disabled = false;
          $("buyBtn").textContent = "ULAŞIMI SATIN AL";
        }else{
          const warn = document.createElement("div");
          warn.className = "card-warning-line";
          warn.textContent = "Satın almak için bu kareye zarla gelmelisin.";
          $("cardRows").before(warn);

          $("buyBtn").style.display = "block";
          $("buyBtn").disabled = true;
          $("buyBtn").textContent = "BURADAN SATIN ALAMAZSIN";
        }
      }
    }else if(space.t === "tax"){
      $("cardType").textContent = "VERGİ / FATURA";
      addCardRow("Ödenecek Tutar",`${space.fee} TL`);
      $("buyBtn").style.display = "none";
    }else if(space.t === "chance"){
      $("cardType").textContent = "ŞANS KARESİ";
      addCardRow("Aksiyon","Şans kartı çekilir");
      $("buyBtn").style.display = "none";
    }else{
      $("cardType").textContent = "ÖZEL KARE";
      if(space.n === "KODESE GİR"){
        addCardRow("Aksiyon","Kodese gönderilir");
      }else if(space.n === "HAPİS ZİYARETİ"){
        addCardRow("Aksiyon","Sadece ziyaret");
      }else{
        addCardRow("Aksiyon","Bu karede beklenir");
      }
      $("buyBtn").style.display = "none";
    }
  }


  /* ===== V34 AUCTION SYSTEM ===== */

  function hidePropertyCardInstant(){
    const overlay = $("propertyOverlay");
    if(!overlay) return;
    overlay.classList.remove("show","closing");
    overlay.classList.add("hidden");
  }

  function shouldStartAuctionOnClose(){
    if(currentOpenSpaceIndex === null) return false;
    if(!hasRolledThisTurn) return false;
    if(currentBuyerIndex !== activePlayerIndex) return false;

    const space = boardSpaces[currentOpenSpaceIndex];
    if(!canBuySpace(space)) return false;
    if(getOwnerIndex(currentOpenSpaceIndex) >= 0) return false;
    if(players[activePlayerIndex]?.position !== currentOpenSpaceIndex) return false;

    return true;
  }

  function startAuction(spaceIndex){
    const space = boardSpaces[spaceIndex];
    if(!space) return;

    hidePropertyCardInstant();

    auctionState = {
      spaceIndex,
      space,
      currentPointer: 0,
      highestBid: 0,
      highestBidder: null,
      passed: new Set(),
      eligible: players.map((p, i) => i).filter(i => players[i].money > 0)
    };

    if(auctionState.eligible.length <= 1){
      closeAuction(true);
      return;
    }

    const overlay = $("auctionOverlay");
    $("auctionPropertyName").textContent = `${space.n} müzayedeye çıktı!`;
    overlay.classList.remove("hidden");
    requestAnimationFrame(() => overlay.classList.add("show"));

    playSound("auction");
    if(typeof addActivity === "function"){
      addActivity(`💰 ${space.n} müzayedeye çıktı.`);
    }

    renderAuction();
  }

  function getAuctionCurrentPlayerIndex(){
    if(!auctionState) return null;
    const available = auctionState.eligible.filter(i => !auctionState.passed.has(i));
    if(!available.length) return null;

    let guard = 0;
    while(guard < auctionState.eligible.length){
      const candidate = auctionState.eligible[auctionState.currentPointer % auctionState.eligible.length];
      if(!auctionState.passed.has(candidate)) return candidate;
      auctionState.currentPointer++;
      guard++;
    }

    return available[0];
  }

  function renderAuction(){
    if(!auctionState) return;

    const current = getAuctionCurrentPlayerIndex();
    const highestName = auctionState.highestBidder === null ? "Henüz teklif yok" : players[auctionState.highestBidder].name;

    $("auctionHighestBid").textContent = `${auctionState.highestBid} TL`;
    $("auctionHighestBidder").textContent = highestName;
    $("auctionCurrentPlayer").textContent = current === null ? "-" : players[current].name;

    const holder = $("auctionPlayers");
    holder.innerHTML = "";

    auctionState.eligible.forEach(i => {
      const div = document.createElement("div");
      div.className = `auction-player ${i === current ? "active" : ""} ${auctionState.passed.has(i) ? "passed" : ""}`;
      div.innerHTML = `<b>${players[i].name}</b><span>${players[i].money} TL</span>`;
      holder.appendChild(div);
    });

    const minNext10 = auctionState.highestBid + 10;
    const minNext50 = auctionState.highestBid + 50;

    $("bid10Btn").disabled = current === null || players[current].money < minNext10;
    $("bid50Btn").disabled = current === null || players[current].money < minNext50;
    $("passAuctionBtn").disabled = current === null;
  }

  function advanceAuctionTurn(){
    if(!auctionState) return;
    auctionState.currentPointer++;

    const active = auctionState.eligible.filter(i => !auctionState.passed.has(i));

    if(active.length === 0){
      finishAuction();
      return;
    }

    if(active.length === 1 && auctionState.highestBidder !== null){
      finishAuction();
      return;
    }

    renderAuction();
  }

  function placeAuctionBid(amount){
    if(!auctionState) return;

    const bidderIndex = getAuctionCurrentPlayerIndex();
    if(bidderIndex === null) return;

    const newBid = auctionState.highestBid + amount;
    if(players[bidderIndex].money < newBid){
      playSound("fail");
      return;
    }

    auctionState.highestBid = newBid;
    auctionState.highestBidder = bidderIndex;

    if(typeof addActivity === "function"){
      addActivity(`💰 ${players[bidderIndex].name}, ${auctionState.space.n} için ${newBid} TL teklif verdi.`);
    }

    playSound("click");
    advanceAuctionTurn();
  }

  function passAuction(){
    if(!auctionState) return;

    const playerIndex = getAuctionCurrentPlayerIndex();
    if(playerIndex === null) return;

    auctionState.passed.add(playerIndex);

    if(typeof addActivity === "function"){
      addActivity(`✋ ${players[playerIndex].name} müzayedede pas geçti.`);
    }

    playSound("click");
    advanceAuctionTurn();
  }

  function finishAuction(){
    if(!auctionState) return;

    const {spaceIndex, space, highestBid, highestBidder} = auctionState;

    if(highestBidder !== null && highestBid > 0){
      const winner = players[highestBidder];
      winner.money -= highestBid;
      winner.owned.push(spaceIndex);

      showPaymentPopup(highestBidder, highestBid);
      playSound("buy");

      if(typeof addActivity === "function"){
        addActivity(`🏆 ${winner.name}, ${space.n} mülkünü müzayededen ${highestBid} TL'ye aldı.`);
      }

      refreshTileOwnership();
      updatePanel();
    }else{
      if(typeof addActivity === "function"){
        addActivity(`🏦 ${space.n} satılmadı, bankada kaldı.`);
      }
    }

    closeAuction(true);
  }

  function closeAuction(force=false){
    const overlay = $("auctionOverlay");
    if(!force && auctionState){
      finishAuction();
      return;
    }

    overlay?.classList.remove("show");
    setTimeout(() => overlay?.classList.add("hidden"), 260);
    auctionState = null;
  }


  function closeCard(){
    if(pendingRent && !pendingRent.paid){
      showRentWarning();
      return;
    }

    if(shouldStartAuctionOnClose()){
      startAuction(currentOpenSpaceIndex);
      return;
    }

    const overlay = $("propertyOverlay");
    overlay.classList.add("closing");
    overlay.classList.remove("show");
    setTimeout(() => {
      overlay.classList.add("hidden");
      overlay.classList.remove("closing");
    },260);
  }

  function startClock(){
    gameStartedAt = Date.now();
    clearInterval(gameTimer);
    gameTimer = setInterval(() => {
      const diff = Math.floor((Date.now() - gameStartedAt)/1000);
      const h = String(Math.floor(diff/3600)).padStart(2,"0");
      const m = String(Math.floor((diff%3600)/60)).padStart(2,"0");
      const s = String(diff%60).padStart(2,"0");
      $("gameClock").textContent = `${h}:${m}:${s}`;
    },1000);
  }

  function loadTrack(index){
    const t = playlist[index];
    $("musicAudio").src = t.file;
    $("coverImage").src = t.cover;
    $("trackTitle").textContent = t.title;
    $("trackArtist").textContent = t.artist;
    $("miniTrack").textContent = t.title;
    $("miniArtist").textContent = t.artist;
    $("progressBar").value = 0;
    $("currentTime").textContent = "0:00";
    $("duration").textContent = "0:00";
  }

  function playMusic(){
    if(!settings.music) return;
    const audio = $("musicAudio");
    audio.volume = settings.music ? (settings.volume / 100) * 0.45 : 0;
    audio.play().then(() => {
      isPlaying = true;
      $("playBtn").textContent = "⏸";
    }).catch(() => {});
  }

  function pauseMusic(){
    const audio = $("musicAudio");
    audio.pause();
    isPlaying = false;
    $("playBtn").textContent = "▶";
  }

  function nextTrack(){
    currentTrack = (currentTrack + 1) % playlist.length;
    loadTrack(currentTrack);
    playMusic();
  }

  function prevTrack(){
    currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
    loadTrack(currentTrack);
    playMusic();
  }

  function formatTime(seconds){
    if(!seconds || isNaN(seconds)) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = String(Math.floor(seconds % 60)).padStart(2,"0");
    return `${m}:${s}`;
  }


  function openHowTo(){
    const overlay = $("howToOverlay");
    if(!overlay) return;
    overlay.classList.remove("hidden");
    requestAnimationFrame(() => overlay.classList.add("show"));
  }

  function closeHowTo(){
    const overlay = $("howToOverlay");
    if(!overlay) return;
    overlay.classList.remove("show");
    setTimeout(() => overlay.classList.add("hidden"), 320);
  }



  function openLandedCard(playerIndex, spaceIndex){
    currentBuyerIndex = playerIndex;
    openCard(boardSpaces[spaceIndex], spaceIndex);
  }


  function createPendingRent(playerIndex, ownerIndex, spaceIndex, rent){
    pendingRent = {
      payerIndex: playerIndex,
      ownerIndex,
      spaceIndex,
      rent,
      paid: false
    };
  }

  function clearPendingRent(){
    pendingRent = null;
  }

  function payPendingRent(){
    if(!pendingRent || pendingRent.paid) return;

    const payer = players[pendingRent.payerIndex];
    const owner = players[pendingRent.ownerIndex];
    const rent = pendingRent.rent;

    if(!payer || !owner) return;

    payer.money = Math.max(0, payer.money - rent);
    owner.money += rent;
    pendingRent.paid = true;

    $("diceTotal").textContent = `${owner.name} kira aldı: ${rent} TL`;
    addActivity(`💸 ${payer.name}, ${owner.name} oyuncusuna ${rent} TL kira ödedi.`);
    showPaymentPopup(pendingRent.payerIndex, rent);
    setTimeout(() => showMoneyPopup(pendingRent.ownerIndex, rent), 260);
    playPaymentSound();
    setTimeout(() => playSound("money"), 300);

    updatePanel();

    const index = pendingRent.spaceIndex;
    clearPendingRent();
    openCard(boardSpaces[index], index);
  }

  function showRentWarning(){
    const old = document.querySelector(".rent-warning-line");
    if(old) old.remove();

    const warn = document.createElement("div");
    warn.className = "rent-warning-line";
    warn.textContent = "Önce kiranızı ödemeniz gerekmektedir.";
    $("cardRows")?.before(warn);
    playSound("fail");
  }


  function buyCurrentSpace(){
    if(pendingRent && !pendingRent.paid){
      payPendingRent();
      return;
    }

    if(currentOpenSpaceIndex === null) return;

    const space = boardSpaces[currentOpenSpaceIndex];
    if(!canBuySpace(space)) return;

    const ownerIndex = getOwnerIndex(currentOpenSpaceIndex);
    if(ownerIndex >= 0) return;

    if(!isBuyAllowedForCurrentCard(currentOpenSpaceIndex)){
      $("diceTotal").textContent = "Bu mülkü sadece üstüne gelince satın alabilirsin.";
      playSound("fail");
      return;
    }

    const buyerIndex = currentBuyerIndex ?? activePlayerIndex;
    const player = players[buyerIndex];
    const price = getSpacePurchasePrice(space);

    if(!player) return;

    if(player.money < price){
      $("diceTotal").textContent = "Yetersiz bakiye!";
      playSound("fail");
      return;
    }

    player.money -= price;
    player.owned.push(currentOpenSpaceIndex);

    playSound("buy");
    showPaymentPopup(buyerIndex, price);
    addActivity(`🏠 ${player.name}, ${space.n} mülkünü ${price} TL'ye satın aldı.`);

    refreshTileOwnership();
    updatePanel();

    const tile = document.querySelectorAll(".tile")[currentOpenSpaceIndex];
    tile?.classList.add("tile-flash");
    setTimeout(() => tile?.classList.remove("tile-flash"), 900);

    openLandedCard(buyerIndex, currentOpenSpaceIndex);
  }


  function openJailChoice(playerIndex){
    currentBuyerIndex = playerIndex;
    const overlay = $("jailChoiceOverlay");
    const payBtn = $("payBailBtn");
    const player = players[playerIndex];
    if(!overlay || !player) return;

    if(payBtn){
      const small = payBtn.querySelector("small");
      if(player.money < 50){
        payBtn.disabled = true;
        if(small) small.textContent = "Yetersiz bakiye";
      }else{
        payBtn.disabled = false;
        if(small) small.textContent = "Hapisten hemen çık ve oyununa devam et.";
      }
    }

    overlay.classList.remove("hidden");
    requestAnimationFrame(() => overlay.classList.add("show"));
  }

  function closeJailChoice(){
    const overlay = $("jailChoiceOverlay");
    if(!overlay) return;
    overlay.classList.remove("show");
    setTimeout(() => overlay.classList.add("hidden"), 280);
  }

  function chooseStayInJail(){
    const playerIndex = currentBuyerIndex ?? activePlayerIndex;
    const player = players[playerIndex];
    if(!player) return;

    player.jailTurns = 3;
    $("diceTotal").textContent = `${player.name} 3 tur hapiste kalacak.`;
    playSound("jail");
    closeJailChoice();
    updatePanel();
  }

  function choosePayBail(){
    const playerIndex = currentBuyerIndex ?? activePlayerIndex;
    const player = players[playerIndex];
    if(!player || player.money < 50) return;

    player.money -= 50;
    player.jailTurns = 0;
    $("diceTotal").textContent = `${player.name} 50 TL kefalet ödedi.`;
    showPaymentPopup(playerIndex, 50);
    playPaymentSound();
    closeJailChoice();
    updatePanel();
  }

  function handleLandingSpace(playerIndex, spaceIndex){
    const space = boardSpaces[spaceIndex];
    if(!space) return "none";

    const name = String(space.n || "").toUpperCase();

    if(space.t === "chance" || name.includes("ŞANS")){
      $("diceTotal").textContent = "Şans karesine geldin.";
      setTimeout(() => openChanceDraw(playerIndex), 450);
      updatePanel();
      return "chance";
    }

    if(name.includes("KODESE")){
      const jailIndex = boardSpaces.findIndex(s => String(s.n || "").toUpperCase().includes("HAPİS"));
      if(jailIndex >= 0){
        players[playerIndex].position = jailIndex;
        moveTokenVisual(playerIndex);
      }

      $("diceTotal").textContent = "Kodese girdin!";
      playSound("jail");
      setTimeout(() => openJailChoice(playerIndex), 450);
      updatePanel();
      return "jail";
    }

    if(space.t === "tax"){
      const player = players[playerIndex];
      const fee = space.fee || 0;
      player.money = Math.max(0, player.money - fee);
      $("diceTotal").textContent = `${space.n}: -${fee} TL`;
      showPaymentPopup(playerIndex, fee);
      playPaymentSound();

      const tile = document.querySelectorAll(".tile")[spaceIndex];
      tile?.classList.add("tax-hit-flash");
      setTimeout(() => tile?.classList.remove("tax-hit-flash"), 800);

      updatePanel();
      return "tax";
    }

    if(canBuySpace(space)){
      const ownerIndex = getOwnerIndex(spaceIndex);

      if(ownerIndex >= 0 && ownerIndex !== playerIndex){
        const rent = getSpaceRent(space);
        createPendingRent(playerIndex, ownerIndex, spaceIndex, rent);
        $("diceTotal").textContent = `${players[ownerIndex].name} mülküne geldin. Kira: ${rent} TL`;

        setTimeout(() => {
          currentBuyerIndex = playerIndex;
          openCard(space, spaceIndex);
        }, 450);

        updatePanel();
        return "rent";
      }

      return "buyable";
    }

    return "normal";
  }

  function afterPlayerLands(playerIndex, landedIndex){
    const landed = boardSpaces[landedIndex];
    if(!landed) return;

    const name = String(landed.n || "").toUpperCase();

    if(name.includes("KODESE")){
      handleLandingSpace(playerIndex, landedIndex);
      return;
    }

    const result = handleLandingSpace(playerIndex, landedIndex);

    if(result === "normal" && canBuySpace(landed)){
      setTimeout(() => {
        currentBuyerIndex = playerIndex;
        openCard(landed, landedIndex);
      }, 450);
    }
  }




  const chanceCards = [
    { text:"Başlangıca git.", type:"goToStart" },
    { text:"Bankadan 100 TL al.", type:"money", amount:100 },
    { text:"Bankaya 50 TL öde.", type:"pay", amount:50 },
    { text:"En yakın ulaşıma git.", type:"nearestTransport" },
    { text:"İleri 3 kare git.", type:"move", steps:3 },
    { text:"Geri 3 kare git.", type:"move", steps:-3 },
    { text:"Kodese gir.", type:"jail" },
    { text:"Hapisten dilediğin zaman çık.", type:"jailFree" },
    { text:"Doğum günü! Her oyuncu sana 20 TL versin.", type:"birthday", amount:20 },
    { text:"Arabam bozuldu, 75 TL öde.", type:"pay", amount:75 },
    { text:"Piyangodan 100 TL kazandın.", type:"money", amount:100 },
    { text:"Ev tamiri yap. Her ev için 25 TL öde.", type:"repair", houseFee:25 },
    { text:"Belediye ödülü, 50 TL al.", type:"money", amount:50 },
    { text:"Zarını tekrar at.", type:"rollAgain" }
  ];

  function openChanceDraw(playerIndex){
    pendingChancePlayerIndex = playerIndex;
    chanceCardActive = false;

    const overlay = $("chanceOverlay");
    if(!overlay) return;

    $("chanceTitle").textContent = "ŞANS KARTI";
    $("chanceText").textContent = "Şans kartı çek.";
    $("drawChanceBtn").textContent = "ŞANS KARTI ÇEK";
    $("drawChanceBtn").disabled = false;
    $("closeChanceBtn").style.display = "block";

    overlay.classList.remove("hidden");
    requestAnimationFrame(() => overlay.classList.add("show"));
    playSound("card");
  }

  function closeChance(){
    if(chanceCardActive) return;
    const overlay = $("chanceOverlay");
    if(!overlay) return;
    overlay.classList.remove("show");
    setTimeout(() => overlay.classList.add("hidden"), 260);
  }

  function drawChanceCard(){
    if(pendingChancePlayerIndex === null) return;

    const card = chanceCards[Math.floor(Math.random() * chanceCards.length)];
    chanceCardActive = true;

    $("chanceTitle").textContent = "ŞANS KARTI";
    $("chanceText").textContent = card.text;
    $("drawChanceBtn").disabled = true;
    $("drawChanceBtn").textContent = "UYGULANIYOR...";
    $("closeChanceBtn").style.display = "none";
    addActivity(`🃏 ${players[pendingChancePlayerIndex].name}: ${card.text}`);

    playSound("card");

    setTimeout(async () => {
      await applyChanceCard(pendingChancePlayerIndex, card);
      chanceCardActive = false;
      const overlay = $("chanceOverlay");
      overlay?.classList.remove("show");
      setTimeout(() => overlay?.classList.add("hidden"), 260);
      pendingChancePlayerIndex = null;
    }, 1800);
  }

  async function applyChanceCard(playerIndex, card){
    const player = players[playerIndex];
    if(!player) return;

    if(card.type === "money"){
      player.money += card.amount;
      $("diceTotal").textContent = `Şans: +${card.amount} TL`;
      showMoneyPopup(playerIndex, card.amount);
      updatePanel();
      return;
    }

    if(card.type === "pay"){
      player.money = Math.max(0, player.money - card.amount);
      $("diceTotal").textContent = `Şans: -${card.amount} TL`;
      showPaymentPopup(playerIndex, card.amount);
      playPaymentSound();
      updatePanel();
      return;
    }

    if(card.type === "birthday"){
      players.forEach((p, i) => {
        if(i !== playerIndex && p.money > 0){
          p.money = Math.max(0, p.money - card.amount);
          player.money += card.amount;
          showPaymentPopup(i, card.amount);
        }
      });
      setTimeout(() => showMoneyPopup(playerIndex, card.amount * Math.max(0, players.length - 1)), 250);
      $("diceTotal").textContent = `Doğum günü! Her oyuncu ${card.amount} TL verdi.`;
      playSound("money");
      updatePanel();
      return;
    }

    if(card.type === "repair"){
      const ownedCount = player.owned.length;
      const total = ownedCount * card.houseFee;
      player.money = Math.max(0, player.money - total);
      $("diceTotal").textContent = `Ev tamiri: -${total} TL`;
      if(total > 0){
        showPaymentPopup(playerIndex, total);
        playPaymentSound();
      }
      updatePanel();
      return;
    }

    if(card.type === "goToStart"){
      player.position = 0;
      moveTokenVisual(playerIndex);
      player.money += 200;
      $("diceTotal").textContent = "Başlangıca gittin. +200 TL";
      showMoneyPopup(playerIndex, 200);
      updatePanel();
      return;
    }

    if(card.type === "nearestTransport"){
      const transports = boardSpaces
        .map((s, i) => ({s, i}))
        .filter(x => x.s.t === "transport");

      let target = transports[0].i;
      for(const t of transports){
        if(t.i > player.position){
          target = t.i;
          break;
        }
      }

      const steps = (target - player.position + boardSpaces.length) % boardSpaces.length;
      await movePlayerStepByStep(playerIndex, steps);
      $("diceTotal").textContent = "En yakın ulaşıma gidildi.";
      afterPlayerLands(playerIndex, player.position);
      updatePanel();
      return;
    }

    if(card.type === "move"){
      const steps = card.steps;
      if(steps > 0){
        await movePlayerStepByStep(playerIndex, steps);
      }else{
        for(let i=0;i<Math.abs(steps);i++){
          player.position = (player.position - 1 + boardSpaces.length) % boardSpaces.length;
          moveTokenVisual(playerIndex);
          await wait(330);
        }
      }
      $("diceTotal").textContent = steps > 0 ? `${steps} kare ileri gidildi.` : `${Math.abs(steps)} kare geri gidildi.`;
      afterPlayerLands(playerIndex, player.position);
      updatePanel();
      return;
    }

    if(card.type === "jail"){
      const jailGoIndex = boardSpaces.findIndex(s => String(s.n || "").toUpperCase().includes("KODESE"));
      if(jailGoIndex >= 0){
        player.position = jailGoIndex;
        moveTokenVisual(playerIndex);
        await wait(400);
        afterPlayerLands(playerIndex, jailGoIndex);
      }
      return;
    }

    if(card.type === "jailFree"){
      player.jailFree = (player.jailFree || 0) + 1;
      $("diceTotal").textContent = "Hapisten çık kartı aldın.";
      playSound("card");
      updatePanel();
      return;
    }

    if(card.type === "rollAgain"){
      hasRolledThisTurn = false;
      canEndTurn = false;
      $("diceTotal").textContent = "Zarını tekrar atabilirsin.";
      updatePanel();
      updateTurnButtons();
      return;
    }
  }

  /* ===== V28 FINAL OVERRIDES ===== */

  function renderLeftPlayerPanel(){
    if(!players.length) return;
    const p = players[activePlayerIndex];
    const panel = $("leftPlayerPanel");
    const colorNames = ["active-blue","active-red","active-green","active-yellow","active-pink","active-cyan"];

    if(panel){
      colorNames.forEach(c => panel.classList.remove(c));
      panel.classList.add(colorNames[activePlayerIndex] || "active-blue");
    }

    if($("leftPanelTitle")) $("leftPanelTitle").textContent = `${p.name} ALANI`;
    if($("readyHouseCount")) $("readyHouseCount").textContent = p.housesAvailable ?? 12;
    if($("readyHotelCount")) $("readyHotelCount").textContent = p.hotelsAvailable ?? 4;
    if($("ownedCardCount")) $("ownedCardCount").textContent = p.owned.length;

    const holder = $("miniOwnedCards");
    if(!holder) return;
    holder.innerHTML = "";

    const count = Math.min(p.owned.length, 7);
    p.owned.slice(0,7).forEach((spaceIndex, deckIndex) => {
      const space = boardSpaces[spaceIndex];
      const card = document.createElement("div");
      card.className = "mini-owned-card";
      card.title = space.n;
      card.style.setProperty("--card-color", space.c || "#6d28d9");
      card.style.setProperty("--deck-x", `${(deckIndex - (count - 1) / 2) * 13}px`);
      card.style.setProperty("--deck-rot", `${(deckIndex - (count - 1) / 2) * 5}deg`);
      card.innerHTML = `<span class="mini-owned-card-name">${space.n}</span>`;
      holder.appendChild(card);
    });
  }

  function openJailChoice(playerIndex){
    currentBuyerIndex = playerIndex;
    const overlay = $("jailChoiceOverlay");
    const payBtn = $("payBailBtn");
    const player = players[playerIndex];
    if(!overlay || !player) return;

    if(payBtn){
      const small = payBtn.querySelector("small");
      if(player.money < 50){
        payBtn.disabled = true;
        if(small) small.textContent = "Yetersiz bakiye";
      }else{
        payBtn.disabled = false;
        if(small) small.textContent = "Hapisten hemen çık ve oyununa devam et.";
      }
    }

    overlay.classList.remove("hidden");
    requestAnimationFrame(() => overlay.classList.add("show"));
  }

  function closeJailChoice(){
    const overlay = $("jailChoiceOverlay");
    if(!overlay) return;
    overlay.classList.remove("show");
    setTimeout(() => overlay.classList.add("hidden"), 260);
  }

  function chooseStayInJail(){
    const playerIndex = currentBuyerIndex ?? activePlayerIndex;
    const player = players[playerIndex];
    if(!player) return;

    player.jailTurns = 3;
    $("diceTotal").textContent = `${player.name} 3 tur hapiste kalacak.`;
    playSound("jail");
    closeJailChoice();
    canEndTurn = true;
    updatePanel();
  }

  function choosePayBail(){
    const playerIndex = currentBuyerIndex ?? activePlayerIndex;
    const player = players[playerIndex];
    if(!player || player.money < 50) return;

    player.money -= 50;
    player.jailTurns = 0;
    $("diceTotal").textContent = `${player.name} 50 TL kefalet ödedi.`;
    showPaymentPopup(playerIndex, 50);
    playPaymentSound();
    closeJailChoice();
    canEndTurn = true;
    updatePanel();
  }

  function handleLandingSpace(playerIndex, spaceIndex){
    const space = boardSpaces[spaceIndex];
    if(!space) return "none";

    const name = String(space.n || "").toUpperCase();

    if(name.includes("KODESE")){
      const jailIndex = boardSpaces.findIndex(s => String(s.n || "").toUpperCase().includes("HAPİS"));
      if(jailIndex >= 0){
        players[playerIndex].position = jailIndex;
        moveTokenVisual(playerIndex);
      }

      $("diceTotal").textContent = "Kodese girdin!";
      playSound("jail");
      setTimeout(() => openJailChoice(playerIndex), 450);
      updatePanel();
      return "jail";
    }

    if(space.t === "tax"){
      const player = players[playerIndex];
      const fee = space.fee || 0;
      player.money = Math.max(0, player.money - fee);
      $("diceTotal").textContent = `${space.n}: -${fee} TL`;
      showPaymentPopup(playerIndex, fee);
      playPaymentSound();

      const tile = document.querySelectorAll(".tile")[spaceIndex];
      tile?.classList.add("tax-hit-flash");
      setTimeout(() => tile?.classList.remove("tax-hit-flash"), 800);

      updatePanel();
      return "tax";
    }

    if(canBuySpace(space)){
      const ownerIndex = getOwnerIndex(spaceIndex);

      if(ownerIndex >= 0 && ownerIndex !== playerIndex){
        const rent = getSpaceRent(space);
        createPendingRent(playerIndex, ownerIndex, spaceIndex, rent);
        $("diceTotal").textContent = `${players[ownerIndex].name} mülküne geldin. Kira: ${rent} TL`;

        setTimeout(() => {
          currentBuyerIndex = playerIndex;
          openCard(space, spaceIndex);
        }, 450);

        updatePanel();
        return "rent";
      }

      return "buyable";
    }

    return "normal";
  }

  function afterPlayerLands(playerIndex, landedIndex){
    const landed = boardSpaces[landedIndex];
    if(!landed) return;

    const result = handleLandingSpace(playerIndex, landedIndex);

    if(result === "buyable"){
      setTimeout(() => {
        currentBuyerIndex = playerIndex;
        openCard(landed, landedIndex);
      }, 450);
    }
  }



  /* ===== V30 FINAL SYSTEM OVERRIDES ===== */

  function playPaymentSound(){
    playSound("lose");
  }

  function ensureBuildData(){
    players.forEach(p => {
      if(!p.buildings) p.buildings = {};
      if(p.housesAvailable === undefined) p.housesAvailable = 12;
      if(p.hotelsAvailable === undefined) p.hotelsAvailable = 4;
    });
  }

  function getBuilding(playerIndex, spaceIndex){
    ensureBuildData();
    const p = players[playerIndex];
    if(!p.buildings[spaceIndex]){
      p.buildings[spaceIndex] = { houses:0, hotel:false };
    }
    return p.buildings[spaceIndex];
  }

  function getBuildingRaw(playerIndex, spaceIndex){
    const p = players[playerIndex];
    return p?.buildings?.[spaceIndex] || { houses:0, hotel:false };
  }

  function getColorGroupIndices(color){
    return boardSpaces
      .map((s,i) => ({s,i}))
      .filter(x => x.s.t === "property" && x.s.c === color)
      .map(x => x.i);
  }

  function ownsFullColorGroup(playerIndex, spaceIndex){
    const space = boardSpaces[spaceIndex];
    if(!space || space.t !== "property") return false;
    const group = getColorGroupIndices(space.c);
    return group.length > 0 && group.every(i => players[playerIndex].owned.includes(i));
  }

  function getBuildCost(space){
    const s = propertyStats[space.n];
    return s ? s[7] : 50;
  }

  function getRentForSpace(space, spaceIndex){
    if(!space) return 0;

    if(space.t === "transport"){
      return space.rent || 10;
    }

    if(space.t !== "property") return 0;

    const stats = propertyStats[space.n];
    if(!stats) return Math.max(5, Math.round((space.price || 100) * 0.1));

    const ownerIndex = getOwnerIndex(spaceIndex);
    if(ownerIndex < 0) return stats[1];

    const b = getBuildingRaw(ownerIndex, spaceIndex);
    if(b.hotel) return stats[6];
    if(b.houses > 0) return stats[1 + b.houses];
    return stats[1];
  }

  function getSpaceRent(space, spaceIndex = null){
    if(spaceIndex !== null) return getRentForSpace(space, spaceIndex);

    if(space.t === "property"){
      const stats = propertyStats[space.n];
      return stats ? stats[1] : Math.max(5, Math.round((space.price || 100) * 0.1));
    }

    if(space.t === "transport") return space.rent || 10;
    return 0;
  }

  function canBuildHouse(playerIndex, spaceIndex){
    ensureBuildData();
    const p = players[playerIndex];
    const space = boardSpaces[spaceIndex];
    if(!p || !space || space.t !== "property") return {ok:false,msg:"Sadece semtlere ev koyabilirsin."};
    if(!p.owned.includes(spaceIndex)) return {ok:false,msg:"Bu mülk senin değil."};
    if(!ownsFullColorGroup(playerIndex, spaceIndex)) return {ok:false,msg:"Bu renk grubunun tamamına sahip olmalısın."};

    const b = getBuilding(playerIndex, spaceIndex);
    if(b.hotel) return {ok:false,msg:"Otel olan yere ev konmaz."};
    if(b.houses >= 4) return {ok:false,msg:"4 evden sonra otel kurmalısın."};
    if(p.housesAvailable <= 0) return {ok:false,msg:"Koyabileceğin ev kalmadı."};

    const group = getColorGroupIndices(space.c);
    const houseCounts = group.map(i => getBuilding(playerIndex, i).houses);
    const minHouses = Math.min(...houseCounts);
    if(b.houses > minHouses) return {ok:false,msg:"Evleri aynı renk grubuna dengeli koymalısın."};

    const cost = getBuildCost(space);
    if(p.money < cost) return {ok:false,msg:`Yetersiz bakiye. Gerekli: ${cost} TL`};

    return {ok:true,cost};
  }

  function canBuildHotel(playerIndex, spaceIndex){
    ensureBuildData();
    const p = players[playerIndex];
    const space = boardSpaces[spaceIndex];
    if(!p || !space || space.t !== "property") return {ok:false,msg:"Sadece semtlere otel koyabilirsin."};
    if(!p.owned.includes(spaceIndex)) return {ok:false,msg:"Bu mülk senin değil."};
    if(!ownsFullColorGroup(playerIndex, spaceIndex)) return {ok:false,msg:"Bu renk grubunun tamamına sahip olmalısın."};

    const b = getBuilding(playerIndex, spaceIndex);
    if(b.hotel) return {ok:false,msg:"Bu mülkte zaten otel var."};
    if(b.houses < 4) return {ok:false,msg:"Otel için önce bu mülkte 4 ev olmalı."};
    if(p.hotelsAvailable <= 0) return {ok:false,msg:"Koyabileceğin otel kalmadı."};

    const group = getColorGroupIndices(space.c);
    const allFour = group.every(i => getBuilding(playerIndex, i).houses === 4 && !getBuilding(playerIndex, i).hotel);
    if(!allFour) return {ok:false,msg:"Otel için aynı renk grubundaki tüm semtlerde 4 ev olmalı."};

    const cost = getBuildCost(space);
    if(p.money < cost) return {ok:false,msg:`Yetersiz bakiye. Gerekli: ${cost} TL`};

    return {ok:true,cost};
  }

  function setBuildMode(mode){
    buildMode = mode;
    updateBuildUI();
    playSound("click");
  }

  function cancelBuildMode(){
    buildMode = null;
    updateBuildUI();
    playSound("click");
  }

  function updateBuildUI(){
    const houseBtn = $("buildHouseBtn");
    const hotelBtn = $("buildHotelBtn");
    const text = $("buildModeText");
    const p = players[activePlayerIndex];

    if(houseBtn) houseBtn.classList.toggle("active-build", buildMode === "house");
    if(hotelBtn) hotelBtn.classList.toggle("active-build", buildMode === "hotel");

    if(text){
      if(!buildMode) text.textContent = "Ev/otel seç, sonra kendi mülk kartına veya kareye tıkla.";
      if(buildMode === "house") text.textContent = `Ev koyma modu aktif. Kalan ev: ${p?.housesAvailable ?? 12}`;
      if(buildMode === "hotel") text.textContent = `Otel koyma modu aktif. Kalan otel: ${p?.hotelsAvailable ?? 4}`;
    }
  }

  function showBuildMessage(msg){
    $("diceTotal").textContent = msg;
    playSound("fail");
  }

  function buildOnProperty(spaceIndex){
    ensureBuildData();
    const p = players[activePlayerIndex];
    const space = boardSpaces[spaceIndex];
    if(!buildMode){
      openCard(space, spaceIndex);
      return;
    }

    const check = buildMode === "house"
      ? canBuildHouse(activePlayerIndex, spaceIndex)
      : canBuildHotel(activePlayerIndex, spaceIndex);

    if(!check.ok){
      showBuildMessage(check.msg);
      openCard(space, spaceIndex);
      return;
    }

    const b = getBuilding(activePlayerIndex, spaceIndex);

    if(buildMode === "house"){
      b.houses += 1;
      p.housesAvailable -= 1;
      p.money -= check.cost;
      $("diceTotal").textContent = `${space.n}: 1 ev koyuldu. -${check.cost} TL`;
    }else{
      b.hotel = true;
      b.houses = 0;
      p.hotelsAvailable -= 1;
      p.housesAvailable += 4;
      p.money -= check.cost;
      $("diceTotal").textContent = `${space.n}: otel kuruldu. -${check.cost} TL`;
    }

    playSound("buy");
    showPaymentPopup(activePlayerIndex, check.cost);
    buildMode = null;
    refreshTileOwnership();
    updatePanel();
    openCard(space, spaceIndex);
  }

  function createBoard(){
    const board = $("board");
    if(!board) return;

    board.querySelectorAll(".tile").forEach(t => t.remove());

    boardSpaces.forEach((space,index) => {
      const rect = getTileRect(index);
      const tile = document.createElement("div");
      tile.className = `tile ${space.t}`;
      if(isLongName(space.n)) tile.classList.add("small-text");
      tile.style.left = `${rect.x}%`;
      tile.style.top = `${rect.y}%`;
      tile.style.width = `${rect.w}%`;
      tile.style.height = `${rect.h}%`;
      tile.innerHTML = tileHTML(space);
      tile.addEventListener("click", () => {
        if(buildMode && space.t === "property") buildOnProperty(index);
        else openCard(space, index);
      });
      board.appendChild(tile);
    });
  }

  function refreshTileOwnership(){
    document.querySelectorAll(".tile").forEach((tile, index) => {
      tile.classList.remove("owned");
      tile.style.removeProperty("--owner-color");
      tile.querySelector(".owner-badge")?.remove();
      tile.querySelector(".build-marker")?.remove();

      const ownerIndex = getOwnerIndex(index);
      if(ownerIndex >= 0){
        const color = getPlayerColor(ownerIndex);
        tile.classList.add("owned");
        tile.style.setProperty("--owner-color", color);

        const badge = document.createElement("div");
        badge.className = "owner-badge";
        badge.style.setProperty("--owner-color", color);
        tile.appendChild(badge);

        const space = boardSpaces[index];
        if(space.t === "property"){
          const b = getBuildingRaw(ownerIndex, index);
          if(b.hotel || b.houses > 0){
            const marker = document.createElement("div");
            marker.className = `build-marker ${b.hotel ? "hotel" : ""}`;
            const count = b.hotel ? 1 : b.houses;
            for(let i=0;i<count;i++){
              const dot = document.createElement("i");
              marker.appendChild(dot);
            }
            tile.appendChild(marker);
          }
        }
      }
    });
  }

  function renderLeftPlayerPanel(){
    if(!players.length) return;
    ensureBuildData();

    const p = players[activePlayerIndex];
    const panel = $("leftPlayerPanel");
    const colorNames = ["active-blue","active-red","active-green","active-yellow","active-pink","active-cyan"];

    if(panel){
      colorNames.forEach(c => panel.classList.remove(c));
      panel.classList.add(colorNames[activePlayerIndex] || "active-blue");
    }

    if($("leftPanelTitle")) $("leftPanelTitle").textContent = `${p.name} ALANI`;
    if($("readyHouseCount")) $("readyHouseCount").textContent = p.housesAvailable ?? 12;
    if($("readyHotelCount")) $("readyHotelCount").textContent = p.hotelsAvailable ?? 4;
    if($("ownedCardCount")) $("ownedCardCount").textContent = p.owned.length;

    updateBuildUI();

    const holder = $("miniOwnedCards");
    if(!holder) return;
    holder.innerHTML = "";

    const visible = p.owned.slice(0,8);
    const count = Math.min(visible.length, 8);

    visible.forEach((spaceIndex, deckIndex) => {
      const space = boardSpaces[spaceIndex];
      const card = document.createElement("div");
      card.className = "mini-owned-card";
      card.title = space.n;
      card.style.setProperty("--card-color", space.c || "#6d28d9");
      card.style.setProperty("--deck-x", `${(deckIndex - (count - 1) / 2) * 12}px`);
      card.style.setProperty("--deck-rot", `${(deckIndex - (count - 1) / 2) * 4}deg`);
      card.innerHTML = `<span class="mini-owned-card-name">${space.n}</span>`;
      card.addEventListener("click", () => {
        suppressFailUntil = Date.now() + 600;
        if(space.t === "property" && buildMode) buildOnProperty(spaceIndex);
        else openCard(space, spaceIndex);
      });
      holder.appendChild(card);
    });
  }

  function openCard(space, index = null){
    currentOpenSpaceIndex = index;
    currentBuyerIndex = activePlayerIndex;
    playSound("card");

    const overlay = $("propertyOverlay");
    overlay.classList.remove("hidden","closing");
    requestAnimationFrame(() => overlay.classList.add("show"));

    $("cardTitle").textContent = space.n;
    $("cardColorBar").style.background = space.c || "#f6c453";
    $("cardIcon").textContent = space.icon || "🏠";
    $("cardRows").innerHTML = "";
    document.querySelectorAll(".card-owner-line, .card-warning-line, .rent-info-line, .rent-warning-line, .card-building-line, .card-build-warning").forEach(el => el.remove());
    $("buyBtn").disabled = false;
    $("buyBtn").classList.remove("rent-pay-mode");

    if(space.t === "property"){
      $("cardType").textContent = "MÜLK KARTI";
      const s = propertyStats[space.n];
      const ownerIndex = index !== null ? getOwnerIndex(index) : -1;
      const b = ownerIndex >= 0 ? getBuildingRaw(ownerIndex, index) : {houses:0, hotel:false};

      [["Satın Alma",s[0]],["Boş Kira",s[1]],["1 Ev",s[2]],["2 Ev",s[3]],["3 Ev",s[4]],["4 Ev",s[5]],["Otel",s[6]],["Ev/Otel Maliyeti",s[7]]]
        .forEach(([a,b]) => addCardRow(a,`${b} TL`));

      if(ownerIndex >= 0){
        addCardRow("Güncel Kira", `${getRentForSpace(space, index)} TL`);
        addCardRow("Ev Sayısı", b.hotel ? "Otel var" : String(b.houses));
      }

      const ownerLine = document.createElement("div");
      ownerLine.className = "card-owner-line";

      if(ownerIndex >= 0){
        ownerLine.innerHTML = `Sahibi: <strong>${players[ownerIndex].name}</strong>`;
        $("cardRows").before(ownerLine);

        if(ownerIndex === activePlayerIndex){
          const buildLine = document.createElement("div");
          buildLine.className = "card-building-line";
          buildLine.innerHTML = b.hotel ? "Bu mülkte <strong>otel</strong> var." : `Bu mülkte <strong>${b.houses}</strong> ev var.`;
          $("cardRows").before(buildLine);

          $("buyBtn").style.display = "block";
          $("buyBtn").disabled = true;
          $("buyBtn").textContent = "YAPI KURMAK İÇİN SOL PANELİ KULLAN";
        }else if(pendingRent && pendingRent.spaceIndex === index && !pendingRent.paid){
          const rentLine = document.createElement("div");
          rentLine.className = "rent-info-line";
          rentLine.innerHTML = `<strong>${pendingRent.rent} TL</strong> kira öde`;
          $("cardRows").before(rentLine);

          $("buyBtn").style.display = "block";
          $("buyBtn").disabled = false;
          $("buyBtn").classList.add("rent-pay-mode");
          $("buyBtn").textContent = `${pendingRent.rent} TL KİRA ÖDE`;
        }else{
          $("buyBtn").style.display = "block";
          $("buyBtn").disabled = true;
          $("buyBtn").textContent = "SATIN ALINMIŞ";
        }
      }else{
        ownerLine.innerHTML = `Sahibi: <strong>Yok</strong>`;
        $("cardRows").before(ownerLine);

        if(isBuyAllowedForCurrentCard(index)){
          $("buyBtn").style.display = "block";
          $("buyBtn").disabled = false;
          $("buyBtn").textContent = "SATIN AL";
        }else{
          const warn = document.createElement("div");
          warn.className = "card-warning-line";
          warn.textContent = "Satın almak için bu kareye zarla gelmelisin.";
          $("cardRows").before(warn);

          $("buyBtn").style.display = "block";
          $("buyBtn").disabled = true;
          $("buyBtn").textContent = "BURADAN SATIN ALAMAZSIN";
        }
      }

    }else if(space.t === "transport"){
      $("cardType").textContent = "ULAŞIM KARTI";
      addCardRow("Satın Alma","25 TL");
      addCardRow("Kira",`${getRentForSpace(space, index)} TL`);

      const ownerIndex = index !== null ? getOwnerIndex(index) : -1;
      const ownerLine = document.createElement("div");
      ownerLine.className = "card-owner-line";

      if(ownerIndex >= 0){
        ownerLine.innerHTML = `Sahibi: <strong>${players[ownerIndex].name}</strong>`;
        $("cardRows").before(ownerLine);

        if(ownerIndex !== activePlayerIndex && pendingRent && pendingRent.spaceIndex === index && !pendingRent.paid){
          const rentLine = document.createElement("div");
          rentLine.className = "rent-info-line";
          rentLine.innerHTML = `<strong>${pendingRent.rent} TL</strong> kira öde`;
          $("cardRows").before(rentLine);

          $("buyBtn").style.display = "block";
          $("buyBtn").disabled = false;
          $("buyBtn").classList.add("rent-pay-mode");
          $("buyBtn").textContent = `${pendingRent.rent} TL KİRA ÖDE`;
        }else{
          $("buyBtn").style.display = "block";
          $("buyBtn").disabled = true;
          $("buyBtn").textContent = ownerIndex === activePlayerIndex ? "BU ULAŞIM SENİN" : "SATIN ALINMIŞ";
        }
      }else{
        ownerLine.innerHTML = `Sahibi: <strong>Yok</strong>`;
        $("cardRows").before(ownerLine);

        if(isBuyAllowedForCurrentCard(index)){
          $("buyBtn").style.display = "block";
          $("buyBtn").disabled = false;
          $("buyBtn").textContent = "ULAŞIMI SATIN AL";
        }else{
          const warn = document.createElement("div");
          warn.className = "card-warning-line";
          warn.textContent = "Satın almak için bu kareye zarla gelmelisin.";
          $("cardRows").before(warn);

          $("buyBtn").style.display = "block";
          $("buyBtn").disabled = true;
          $("buyBtn").textContent = "BURADAN SATIN ALAMAZSIN";
        }
      }

    }else if(space.t === "tax"){
      $("cardType").textContent = "VERGİ / FATURA";
      addCardRow("Ödenecek Tutar",`${space.fee} TL`);
      $("buyBtn").style.display = "none";
    }else if(space.t === "chance"){
      $("cardType").textContent = "ŞANS KARESİ";
      addCardRow("Aksiyon","Şans kartı çekilir");
      $("buyBtn").style.display = "none";
    }else{
      $("cardType").textContent = "ÖZEL KARE";
      if(space.n === "KODESE GİR") addCardRow("Aksiyon","Kodese gönderilir");
      else if(space.n === "HAPİS ZİYARETİ") addCardRow("Aksiyon","Sadece ziyaret");
      else addCardRow("Aksiyon","Bu karede beklenir");
      $("buyBtn").style.display = "none";
    }
  }

  const chanceCardsV30 = [
    { text:"Başlangıca git.", type:"goToStart" },
    { text:"Bankadan 100 TL al.", type:"money", amount:100 },
    { text:"Bankaya 50 TL öde.", type:"pay", amount:50 },
    { text:"En yakın ulaşıma git.", type:"nearestTransport" },
    { text:"İleri 3 kare git.", type:"move", steps:3 },
    { text:"Geri 3 kare git.", type:"move", steps:-3 },
    { text:"Kodese gir.", type:"jail" },
    { text:"Hapisten dilediğin zaman çık.", type:"jailFree" },
    { text:"Doğum günü! Her oyuncu sana 20 TL versin.", type:"birthday", amount:20 },
    { text:"Arabam bozuldu, 75 TL öde.", type:"pay", amount:75 },
    { text:"Piyangodan 100 TL kazandın.", type:"money", amount:100 },
    { text:"Ev tamiri yap. Her mülk için 25 TL öde.", type:"repair", houseFee:25 },
    { text:"Belediye ödülü, 50 TL al.", type:"money", amount:50 },
    { text:"Zarını tekrar at.", type:"rollAgain" }
  ];

  function openChanceDraw(playerIndex){
    pendingChancePlayerIndex = playerIndex;
    chanceCardActive = false;

    const overlay = $("chanceOverlay");
    if(!overlay) return;

    $("chanceTitle").textContent = "ŞANS KARTI";
    $("chanceText").textContent = "Şans kartı çek.";
    $("drawChanceBtn").textContent = "ŞANS KARTI ÇEK";
    $("drawChanceBtn").disabled = false;
    $("closeChanceBtn").style.display = "block";

    overlay.classList.remove("hidden");
    requestAnimationFrame(() => overlay.classList.add("show"));
    playSound("card");
  }

  function closeChance(){
    if(chanceCardActive) return;
    const overlay = $("chanceOverlay");
    if(!overlay) return;
    overlay.classList.remove("show");
    setTimeout(() => overlay.classList.add("hidden"), 260);
  }

  function drawChanceCard(){
    if(pendingChancePlayerIndex === null) return;

    const card = chanceCardsV30[Math.floor(Math.random() * chanceCardsV30.length)];
    chanceCardActive = true;

    $("chanceTitle").textContent = "ŞANS KARTI";
    $("chanceText").textContent = card.text;
    $("drawChanceBtn").disabled = true;
    $("drawChanceBtn").textContent = "UYGULANIYOR...";
    $("closeChanceBtn").style.display = "none";

    playSound("card");

    setTimeout(async () => {
      await applyChanceCard(pendingChancePlayerIndex, card);
      chanceCardActive = false;
      const overlay = $("chanceOverlay");
      overlay?.classList.remove("show");
      setTimeout(() => overlay?.classList.add("hidden"), 260);
      pendingChancePlayerIndex = null;
    }, 1800);
  }

  async function applyChanceCard(playerIndex, card){
    const player = players[playerIndex];
    if(!player) return;

    if(card.type === "money"){
      player.money += card.amount;
      $("diceTotal").textContent = `Şans: +${card.amount} TL`;
      showMoneyPopup(playerIndex, card.amount);
      updatePanel();
      return;
    }

    if(card.type === "pay"){
      player.money = Math.max(0, player.money - card.amount);
      $("diceTotal").textContent = `Şans: -${card.amount} TL`;
      showPaymentPopup(playerIndex, card.amount);
      playPaymentSound();
      updatePanel();
      return;
    }

    if(card.type === "birthday"){
      players.forEach((p, i) => {
        if(i !== playerIndex && p.money > 0){
          p.money = Math.max(0, p.money - card.amount);
          player.money += card.amount;
          showPaymentPopup(i, card.amount);
        }
      });
      setTimeout(() => showMoneyPopup(playerIndex, card.amount * Math.max(0, players.length - 1)), 250);
      $("diceTotal").textContent = `Doğum günü! Her oyuncu ${card.amount} TL verdi.`;
      playSound("money");
      updatePanel();
      return;
    }

    if(card.type === "repair"){
      const total = player.owned.length * card.houseFee;
      player.money = Math.max(0, player.money - total);
      $("diceTotal").textContent = `Ev tamiri: -${total} TL`;
      if(total > 0){
        showPaymentPopup(playerIndex, total);
        playPaymentSound();
      }
      updatePanel();
      return;
    }

    if(card.type === "goToStart"){
      player.position = 0;
      moveTokenVisual(playerIndex);
      player.money += 200;
      $("diceTotal").textContent = "Başlangıca gittin. +200 TL";
      showMoneyPopup(playerIndex, 200);
      updatePanel();
      return;
    }

    if(card.type === "nearestTransport"){
      const transports = boardSpaces.map((s, i) => ({s, i})).filter(x => x.s.t === "transport");
      let target = transports[0].i;

      for(const t of transports){
        if(t.i > player.position){
          target = t.i;
          break;
        }
      }

      const steps = (target - player.position + boardSpaces.length) % boardSpaces.length;
      await movePlayerStepByStep(playerIndex, steps);
      $("diceTotal").textContent = "En yakın ulaşıma gidildi.";
      afterPlayerLands(playerIndex, player.position);
      updatePanel();
      return;
    }

    if(card.type === "move"){
      const steps = card.steps;
      if(steps > 0){
        await movePlayerStepByStep(playerIndex, steps);
      }else{
        for(let i=0;i<Math.abs(steps);i++){
          player.position = (player.position - 1 + boardSpaces.length) % boardSpaces.length;
          moveTokenVisual(playerIndex);
          await wait(330);
        }
      }
      $("diceTotal").textContent = steps > 0 ? `${steps} kare ileri gidildi.` : `${Math.abs(steps)} kare geri gidildi.`;
      afterPlayerLands(playerIndex, player.position);
      updatePanel();
      return;
    }

    if(card.type === "jail"){
      const jailGoIndex = boardSpaces.findIndex(s => String(s.n || "").toUpperCase().includes("KODESE"));
      if(jailGoIndex >= 0){
        player.position = jailGoIndex;
        moveTokenVisual(playerIndex);
        await wait(400);
        afterPlayerLands(playerIndex, jailGoIndex);
      }
      return;
    }

    if(card.type === "jailFree"){
      player.jailFree = (player.jailFree || 0) + 1;
      $("diceTotal").textContent = "Hapisten çık kartı aldın.";
      playSound("card");
      updatePanel();
      return;
    }

    if(card.type === "rollAgain"){
      hasRolledThisTurn = false;
      canEndTurn = false;
      $("diceTotal").textContent = "Zarını tekrar atabilirsin.";
      updatePanel();
      updateTurnButtons();
      return;
    }
  }

  function handleLandingSpace(playerIndex, spaceIndex){
    const space = boardSpaces[spaceIndex];
    if(!space) return "none";

    const name = String(space.n || "").toUpperCase();

    if(space.t === "chance" || name.includes("ŞANS")){
      $("diceTotal").textContent = "Şans karesine geldin.";
      addActivity(`🃏 ${players[playerIndex].name} şans karesine geldi.`);
      setTimeout(() => openChanceDraw(playerIndex), 450);
      updatePanel();
      return "chance";
    }

    if(name.includes("KODESE")){
      const jailIndex = boardSpaces.findIndex(s => String(s.n || "").toUpperCase().includes("HAPİS"));
      if(jailIndex >= 0){
        players[playerIndex].position = jailIndex;
        moveTokenVisual(playerIndex);
      }

      $("diceTotal").textContent = "Kodese girdin!";
      addActivity(`⛓️ ${players[playerIndex].name} kodese girdi.`);
      playSound("jail");
      setTimeout(() => openJailChoice(playerIndex), 450);
      updatePanel();
      return "jail";
    }

    if(space.t === "tax"){
      const player = players[playerIndex];
      const fee = space.fee || 0;
      player.money = Math.max(0, player.money - fee);
      $("diceTotal").textContent = `${space.n}: -${fee} TL`;
      addActivity(`💵 ${player.name}, ${space.n} için ${fee} TL ödedi.`);
      showPaymentPopup(playerIndex, fee);
      playPaymentSound();

      const tile = document.querySelectorAll(".tile")[spaceIndex];
      tile?.classList.add("tax-hit-flash");
      setTimeout(() => tile?.classList.remove("tax-hit-flash"), 800);

      updatePanel();
      return "tax";
    }

    if(canBuySpace(space)){
      const ownerIndex = getOwnerIndex(spaceIndex);

      if(ownerIndex >= 0 && ownerIndex !== playerIndex){
        const rent = getRentForSpace(space, spaceIndex);
        createPendingRent(playerIndex, ownerIndex, spaceIndex, rent);
        $("diceTotal").textContent = `${players[ownerIndex].name} mülküne geldin. Kira: ${rent} TL`;

        setTimeout(() => {
          currentBuyerIndex = playerIndex;
          openCard(space, spaceIndex);
        }, 450);

        updatePanel();
        return "rent";
      }

      return "buyable";
    }

    return "normal";
  }

  function afterPlayerLands(playerIndex, landedIndex){
    const landed = boardSpaces[landedIndex];
    if(!landed) return;

    const result = handleLandingSpace(playerIndex, landedIndex);

    if(result === "buyable"){
      setTimeout(() => {
        currentBuyerIndex = playerIndex;
        openCard(landed, landedIndex);
      }, 450);
    }
  }



  /* ===== V35 AI FOUNDATION ===== */

  let botTurnTimer = null;
  let botThinking = false;
  let botSkipAuctionClose = false;

  function isBotPlayer(index = activePlayerIndex){
    return !!players[index]?.isBot;
  }

  function isOverlayOpen(id){
    const el = $(id);
    return !!el && !el.classList.contains("hidden") && (el.classList.contains("show") || getComputedStyle(el).display !== "none");
  }

  function botDelay(ms = 900){
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function queueBotTurn(delay = 900){
    clearTimeout(botTurnTimer);

    if(!players.length) return;
    if(!isBotPlayer(activePlayerIndex)) return;

    botTurnTimer = setTimeout(() => {
      botTakeTurn().catch(err => {
        console.warn("Bot hata:", err);
        botThinking = false;
      });
    }, delay);
  }

  function botCanBuyCurrentCard(){
    if(currentOpenSpaceIndex === null) return false;

    const space = boardSpaces[currentOpenSpaceIndex];
    if(!canBuySpace(space)) return false;
    if(getOwnerIndex(currentOpenSpaceIndex) >= 0) return false;
    if(!isBuyAllowedForCurrentCard(currentOpenSpaceIndex)) return false;

    const price = getSpacePurchasePrice(space);
    const p = players[activePlayerIndex];

    return p && p.money - price >= 300;
  }

  function botClosePropertyWithoutAuction(){
    botSkipAuctionClose = true;
    closeCard();
  }

  function botHandlePropertyCard(){
    if(!isOverlayOpen("propertyOverlay")) return false;

    if(pendingRent && !pendingRent.paid){
      payPendingRent();
      queueBotTurn(900);
      return true;
    }

    if(botCanBuyCurrentCard()){
      buyCurrentSpace();
      queueBotTurn(1000);
      return true;
    }

    botClosePropertyWithoutAuction();
    queueBotTurn(700);
    return true;
  }

  function botHandleChance(){
    if(!isOverlayOpen("chanceOverlay")) return false;

    const drawBtn = $("drawChanceBtn");
    if(drawBtn && !drawBtn.disabled){
      drawChanceCard();
      queueBotTurn(2600);
      return true;
    }

    queueBotTurn(1200);
    return true;
  }

  function botHandleJailChoice(){
    if(!isOverlayOpen("jailChoiceOverlay")) return false;

    const p = players[activePlayerIndex];
    if(p.money >= 50){
      choosePayBail();
      addActivity(`🤖 ${p.name} 50 TL kefalet ödedi.`);
    }else{
      chooseStayInJail();
      addActivity(`🤖 ${p.name} 3 tur hapiste kalmayı seçti.`);
    }

    queueBotTurn(900);
    return true;
  }

  function botHandleAuction(){
    if(!auctionState) return false;

    const current = getAuctionCurrentPlayerIndex();
    if(current === null){
      queueBotTurn(700);
      return true;
    }

    if(!isBotPlayer(current)) return false;

    const bot = players[current];
    const space = auctionState.space;
    const basePrice = getSpacePurchasePrice(space);
    const nextBid = auctionState.highestBid + 10;

    const wants = bot.money - nextBid >= 350 && nextBid <= Math.max(basePrice, Math.floor(basePrice * 0.85));

    setTimeout(() => {
      if(!auctionState) return;
      if(wants) placeAuctionBid(10);
      else passAuction();
      queueBotTurn(700);
    }, 800);

    return true;
  }

  async function botTakeTurn(){
    if(botThinking) return;
    if(!players.length) return;
    if(!isBotPlayer(activePlayerIndex)) return;

    botThinking = true;

    try{
      await botDelay(650);

      if(botHandleAuction()) return;

      if(botHandleJailChoice()) return;

      if(botHandleChance()) return;

      if(botHandlePropertyCard()) return;

      if(!hasRolledThisTurn){
        addActivity(`🤖 ${players[activePlayerIndex].name} düşünüyor...`);
        await botDelay(650);
        rollDice();
        queueBotTurn(2600);
        return;
      }

      if(canEndTurn){
        await botDelay(900);
        finishTurn();
        return;
      }

      queueBotTurn(1000);
    }finally{
      botThinking = false;
    }
  }

  // Satın alınabilir kart kapanınca botlarda müzayede açılmasın; bot pas geçerse tur devam etsin.
  const _shouldStartAuctionOnCloseAI = shouldStartAuctionOnClose;
  shouldStartAuctionOnClose = function(){
    if(botSkipAuctionClose){
      botSkipAuctionClose = false;
      return false;
    }
    return _shouldStartAuctionOnCloseAI();
  };

  const _updatePanelAI = updatePanel;
  updatePanel = function(){
    _updatePanelAI();
    queueBotTurn(900);
  };

  const _startGameAI = startGame;
  startGame = function(){
    _startGameAI();
    queueBotTurn(1200);
  };

  const _openCardAI = openCard;
  openCard = function(space, index = null){
    _openCardAI(space, index);
    queueBotTurn(900);
  };

  const _openChanceDrawAI = openChanceDraw;
  openChanceDraw = function(playerIndex){
    _openChanceDrawAI(playerIndex);
    queueBotTurn(900);
  };

  const _openJailChoiceAI = openJailChoice;
  openJailChoice = function(playerIndex){
    _openJailChoiceAI(playerIndex);
    queueBotTurn(900);
  };

  const _finishAuctionAI = finishAuction;
  finishAuction = function(){
    _finishAuctionAI();
    queueBotTurn(900);
  };



  /* ===== V36 SMART AI ===== */

  function botReserveMoney(){
    const p = players[activePlayerIndex];
    if(!p) return 500;

    if(p.money >= 1400) return 450;
    if(p.money >= 900) return 500;
    return 650;
  }

  function botOwnsInSameColor(playerIndex, spaceIndex){
    const space = boardSpaces[spaceIndex];
    if(!space || space.t !== "property") return false;
    return players[playerIndex].owned.some(i => boardSpaces[i]?.t === "property" && boardSpaces[i].c === space.c);
  }

  function botWouldCompleteColor(playerIndex, spaceIndex){
    const space = boardSpaces[spaceIndex];
    if(!space || space.t !== "property") return false;

    const group = getColorGroupIndices(space.c);
    if(group.length <= 1) return false;

    return group.every(i => i === spaceIndex || players[playerIndex].owned.includes(i));
  }

  function botBuyLimitForSpace(spaceIndex){
    const space = boardSpaces[spaceIndex];
    const price = getSpacePurchasePrice(space);
    let reserve = botReserveMoney();

    if(space?.t === "transport") reserve -= 120;
    if(botOwnsInSameColor(activePlayerIndex, spaceIndex)) reserve -= 140;
    if(botWouldCompleteColor(activePlayerIndex, spaceIndex)) reserve -= 260;

    reserve = Math.max(250, reserve);
    return players[activePlayerIndex].money - price >= reserve;
  }

  // V35'teki basit satın alma kararını daha akıllı yapıyoruz.
  botCanBuyCurrentCard = function(){
    if(currentOpenSpaceIndex === null) return false;

    const space = boardSpaces[currentOpenSpaceIndex];
    if(!canBuySpace(space)) return false;
    if(getOwnerIndex(currentOpenSpaceIndex) >= 0) return false;
    if(!isBuyAllowedForCurrentCard(currentOpenSpaceIndex)) return false;

    return botBuyLimitForSpace(currentOpenSpaceIndex);
  };

  function botTryBuildOnce(){
    if(!isBotPlayer(activePlayerIndex)) return false;

    const p = players[activePlayerIndex];
    if(!p || !p.owned?.length) return false;

    ensureBuildData();

    // Önce otel dene: aynı renk grubunda her yerde 4 ev varsa.
    for(const spaceIndex of p.owned){
      const space = boardSpaces[spaceIndex];
      if(!space || space.t !== "property") continue;

      const hotelCheck = canBuildHotel(activePlayerIndex, spaceIndex);
      if(hotelCheck.ok && p.money - hotelCheck.cost >= 650){
        buildMode = "hotel";
        buildOnProperty(spaceIndex);
        addActivity(`🧠 ${p.name} stratejik olarak ${space.n} üstüne otel kurdu.`);
        return true;
      }
    }

    // Sonra ev dene: grup tamamlandıysa ve dengeli kurala uygunsa.
    const ownedProperties = p.owned.filter(i => boardSpaces[i]?.t === "property");

    // Öncelik: tamamlanmış gruplar
    const preferred = ownedProperties
      .filter(i => ownsFullColorGroup(activePlayerIndex, i))
      .sort((a,b) => {
        const ca = getBuildCost(boardSpaces[a]);
        const cb = getBuildCost(boardSpaces[b]);
        return ca - cb;
      });

    for(const spaceIndex of preferred){
      const space = boardSpaces[spaceIndex];
      const houseCheck = canBuildHouse(activePlayerIndex, spaceIndex);

      if(houseCheck.ok && p.money - houseCheck.cost >= 600){
        buildMode = "house";
        buildOnProperty(spaceIndex);
        addActivity(`🧠 ${p.name} renk grubunu güçlendirdi: ${space.n} üstüne ev koydu.`);
        return true;
      }
    }

    return false;
  }

  // Bot müzayedede daha akıllı teklif verir.
  botHandleAuction = function(){
    if(!auctionState) return false;

    const current = getAuctionCurrentPlayerIndex();
    if(current === null){
      queueBotTurn(700);
      return true;
    }

    if(!isBotPlayer(current)) return false;

    const bot = players[current];
    const space = auctionState.space;
    const spaceIndex = auctionState.spaceIndex;
    const basePrice = getSpacePurchasePrice(space);
    const nextBid10 = auctionState.highestBid + 10;
    const nextBid50 = auctionState.highestBid + 50;

    let maxBid = Math.floor(basePrice * 0.78);

    if(space?.t === "transport") maxBid = Math.floor(basePrice * 1.15);
    if(botOwnsInSameColor(current, spaceIndex)) maxBid = Math.floor(basePrice * 0.95);
    if(botWouldCompleteColor(current, spaceIndex)) maxBid = Math.floor(basePrice * 1.20);

    const reserve = bot.money >= 1300 ? 450 : 600;

    setTimeout(() => {
      if(!auctionState) return;

      if(bot.money - nextBid50 >= reserve && nextBid50 <= maxBid){
        placeAuctionBid(50);
      }else if(bot.money - nextBid10 >= reserve && nextBid10 <= maxBid){
        placeAuctionBid(10);
      }else{
        passAuction();
      }

      queueBotTurn(700);
    }, 900);

    return true;
  };

  // Kodeste daha akıllı karar: çok fakirse bekler, parası varsa çıkar.
  botHandleJailChoice = function(){
    if(!isOverlayOpen("jailChoiceOverlay")) return false;

    const p = players[activePlayerIndex];
    if(p.money >= 350){
      choosePayBail();
      addActivity(`🧠 ${p.name} kefalet ödeyip oyuna döndü.`);
    }else{
      chooseStayInJail();
      addActivity(`🧠 ${p.name} parasını korumak için hapiste beklemeyi seçti.`);
    }

    queueBotTurn(900);
    return true;
  };

  // V35 bot turunu geliştiriyoruz: zar atmadan veya tur bitirmeden önce ev/otel kurmayı dener.
  botTakeTurn = async function(){
    if(botThinking) return;
    if(!players.length) return;
    if(!isBotPlayer(activePlayerIndex)) return;

    botThinking = true;

    try{
      await botDelay(650);

      if(botHandleAuction()) return;
      if(botHandleJailChoice()) return;
      if(botHandleChance()) return;
      if(botHandlePropertyCard()) return;

      // Zar atmadan önce yatırım fırsatı varsa değerlendir.
      if(!hasRolledThisTurn){
        if(botTryBuildOnce()){
          queueBotTurn(1100);
          return;
        }

        addActivity(`🤖 ${players[activePlayerIndex].name} düşünüyor...`);
        await botDelay(650);
        rollDice();
        queueBotTurn(2600);
        return;
      }

      // Tur bitmeden önce de son bir ev/otel kurma denemesi.
      if(canEndTurn){
        if(botTryBuildOnce()){
          queueBotTurn(1100);
          return;
        }

        await botDelay(900);
        finishTurn();
        return;
      }

      queueBotTurn(1000);
    }finally{
      botThinking = false;
    }
  };



  /* ===== V37 ONLINE UI MOCK LAYER ===== */

  let mockRoomCode = null;
  let selectedCharacter = null;

  const characterOptions = ["🚗","🏍️","🧢","🐶","🐱","🛻","🚜","👑","🛹","🛸"];

  function openOnlineOverlay(){
    const overlay = $("onlineOverlay");
    if(!overlay) return;

    const firstName = document.querySelector(".player-name")?.value || "Oyuncu";
    if($("onlinePlayerName")) $("onlinePlayerName").value = firstName;
    if($("joinPlayerName")) $("joinPlayerName").value = firstName;

    showOnlinePage("onlineHome");
    overlay.classList.remove("hidden");
    requestAnimationFrame(() => overlay.classList.add("show"));
    playSound("click");
  }

  function closeOnlineOverlay(){
    const overlay = $("onlineOverlay");
    if(!overlay) return;
    overlay.classList.remove("show");
    setTimeout(() => overlay.classList.add("hidden"), 260);
    playSound("click");
  }

  function showOnlinePage(pageId){
    ["onlineHome","onlineJoin","onlineLobby","characterSelectPage","onlinePreparingPage"].forEach(id => {
      $(id)?.classList.toggle("active", id === pageId);
    });
  }

  function makeRoomCode(){
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let code = "";
    for(let i=0;i<6;i++) code += chars[Math.floor(Math.random() * chars.length)];
    return code;
  }

  function renderLobby(playerName, isHost=true){
    const holder = $("lobbyPlayers");
    if(!holder) return;

    holder.innerHTML = `
      <div class="lobby-player">
        <div class="lobby-avatar">👑</div>
        <div>
          <b>${playerName || "Oyuncu"}</b>
          <span>${isHost ? "HOST" : "OYUNCU"}</span>
        </div>
        <strong>Hazır</strong>
      </div>
      <div class="lobby-player">
        <div class="lobby-avatar">⏳</div>
        <div>
          <b>Arkadaş bekleniyor...</b>
          <span>Oda kodunu paylaş</span>
        </div>
        <strong>Bekliyor</strong>
      </div>
    `;
  }

  function createOnlineRoom(){
    const name = $("onlinePlayerName")?.value.trim() || "Oyuncu";
    mockRoomCode = makeRoomCode();

    $("roomCodeText").textContent = mockRoomCode;
    $("lobbyInfoText").textContent = "Şimdilik taslak lobi. Sonraki sürümde gerçek online bağlantı eklenecek.";
    renderLobby(name, true);
    showOnlinePage("onlineLobby");
    playSound("click");
  }

  function openJoinRoom(){
    showOnlinePage("onlineJoin");
    playSound("click");
  }

  function joinOnlineRoom(){
    const name = $("joinPlayerName")?.value.trim() || "Oyuncu";
    const code = $("joinRoomCode")?.value.trim().toUpperCase() || "ABC123";

    mockRoomCode = code;
    $("roomCodeText").textContent = mockRoomCode;
    $("lobbyInfoText").textContent = "Odaya katılma taslağı. Gerçek bağlantı sonraki sürümde.";
    renderLobby(name, false);
    showOnlinePage("onlineLobby");
    playSound("click");
  }

  function renderCharacters(){
    const grid = $("characterGrid");
    if(!grid) return;

    grid.innerHTML = "";
    characterOptions.forEach(ch => {
      const btn = document.createElement("button");
      btn.className = `character-option ${selectedCharacter === ch ? "selected" : ""}`;
      btn.textContent = ch;
      btn.type = "button";
      btn.addEventListener("click", () => {
        selectedCharacter = ch;
        renderCharacters();
        playSound("click");
      });
      grid.appendChild(btn);
    });
  }

  function goCharacterSelect(){
    renderCharacters();
    showOnlinePage("characterSelectPage");
    playSound("click");
  }

  function onlineStartGameMock(){
    if(!selectedCharacter){
      selectedCharacter = "🚗";
    }

    closeOnlineOverlay();
    showScreen("setup");
    addActivity?.(`🌐 Online taslak: karakter seçildi ${selectedCharacter}`);
  }



  /* ===== V38.0 FIREBASE REAL LOBBY ===== */

  const firebaseConfig = {
    apiKey: "AIzaSyDsTNfQ1nKidFHzTaa44LsoKKVOqC6StoE",
    authDomain: "barutpolyonline.firebaseapp.com",
    projectId: "barutpolyonline",
    storageBucket: "barutpolyonline.firebasestorage.app",
    messagingSenderId: "59416046600",
    appId: "1:59416046600:web:6b3e5d8a5bf67e423d75bd",
    measurementId: "G-N3GDTNESR9"
  };

  let bpFirebaseApp = null;
  let bpDb = null;
  let onlineRoomUnsubscribe = null;
  let onlineCurrentRoomCode = null;
  let onlinePlayerId = localStorage.getItem("barutpolyOnlinePlayerId");

  if(!onlinePlayerId){
    onlinePlayerId = "p_" + Math.random().toString(36).slice(2,10) + Date.now().toString(36).slice(-4);
    localStorage.setItem("barutpolyOnlinePlayerId", onlinePlayerId);
  }

  function initFirebaseLobby(){
    try{
      if(!window.firebase){
        setOnlineStatus("Firebase SDK yüklenemedi.", true);
        return false;
      }
      if(!bpFirebaseApp){
        bpFirebaseApp = firebase.apps?.length ? firebase.app() : firebase.initializeApp(firebaseConfig);
        bpDb = firebase.firestore();
      }
      setOnlineStatus("Firebase bağlı.", false);
      return true;
    }catch(err){
      console.error("Firebase init hata:", err);
      setOnlineStatus("Firebase bağlantı hatası: " + err.message, true);
      return false;
    }
  }

  function setOnlineStatus(text, isError=false){
    const el = $("onlineStatusText");
    if(!el) return;
    el.textContent = text;
    el.classList.toggle("error", !!isError);
  }

  function normalizeRoomCode(code){
    return String(code || "").trim().toUpperCase().replace(/[^A-Z0-9]/g,"").slice(0,6);
  }

  function getOnlineNameFromHome(){
    return $("onlinePlayerName")?.value.trim()
      || document.querySelector(".player-name")?.value?.trim()
      || "Oyuncu";
  }

  function getOnlineNameFromJoin(){
    return $("joinPlayerName")?.value.trim()
      || $("onlinePlayerName")?.value.trim()
      || document.querySelector(".player-name")?.value?.trim()
      || "Oyuncu";
  }

  function roomRef(code){
    return bpDb.collection("rooms").doc(code);
  }

  function playersRef(code){
    return roomRef(code).collection("players");
  }

  async function generateUniqueRoomCode(){
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    for(let attempt=0; attempt<20; attempt++){
      let code = "";
      for(let i=0;i<6;i++) code += chars[Math.floor(Math.random() * chars.length)];
      const snap = await roomRef(code).get();
      if(!snap.exists) return code;
    }
    return "BP" + Date.now().toString(36).slice(-4).toUpperCase();
  }

  createOnlineRoom = async function(){
    if(!initFirebaseLobby()) return;
    const name = getOnlineNameFromHome();
    setOnlineStatus("Oda oluşturuluyor...", false);

    try{
      const code = await generateUniqueRoomCode();
      onlineCurrentRoomCode = code;

      await roomRef(code).set({
        code,
        hostId: onlinePlayerId,
        status: "lobby",
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      });

      await playersRef(code).doc(onlinePlayerId).set({
        id: onlinePlayerId,
        name,
        host: true,
        ready: false,
        character: null,
        joinedAt: firebase.firestore.FieldValue.serverTimestamp(),
        lastSeen: firebase.firestore.FieldValue.serverTimestamp()
      });

      $("roomCodeText").textContent = code;
      $("lobbyInfoText").textContent = "Oda kodunu arkadaşına gönder. Katılanlar burada canlı gözükecek.";
      showOnlinePage("onlineLobby");
      listenOnlineRoom(code);
      playSound("click");
    }catch(err){
      console.error(err);
      setOnlineStatus("Oda oluşturulamadı: " + err.message, true);
    }
  };

  joinOnlineRoom = async function(){
    if(!initFirebaseLobby()) return;
    const name = getOnlineNameFromJoin();
    const code = normalizeRoomCode($("joinRoomCode")?.value);

    if(!code || code.length < 4){
      setOnlineStatus("Geçerli bir oda kodu yaz.", true);
      return;
    }

    setOnlineStatus("Odaya katılınıyor...", false);

    try{
      const snap = await roomRef(code).get();
      if(!snap.exists){
        setOnlineStatus("Bu oda bulunamadı.", true);
        return;
      }

      onlineCurrentRoomCode = code;

      await playersRef(code).doc(onlinePlayerId).set({
        id: onlinePlayerId,
        name,
        host: false,
        ready: false,
        character: null,
        joinedAt: firebase.firestore.FieldValue.serverTimestamp(),
        lastSeen: firebase.firestore.FieldValue.serverTimestamp()
      }, {merge:true});

      $("roomCodeText").textContent = code;
      $("lobbyInfoText").textContent = "Odaya katıldın. Oyuncular canlı güncelleniyor.";
      showOnlinePage("onlineLobby");
      listenOnlineRoom(code);
      playSound("click");
    }catch(err){
      console.error(err);
      setOnlineStatus("Odaya katılamadın: " + err.message, true);
    }
  };

  function listenOnlineRoom(code){
    if(!initFirebaseLobby()) return;
    if(onlineRoomUnsubscribe){
      onlineRoomUnsubscribe();
      onlineRoomUnsubscribe = null;
    }

    onlineRoomUnsubscribe = playersRef(code)
      .orderBy("joinedAt", "asc")
      .onSnapshot((snapshot) => {
        const roomPlayers = [];
        snapshot.forEach(doc => roomPlayers.push(doc.data()));
        renderFirebaseLobbyPlayers(roomPlayers);
        setOnlineStatus(`${roomPlayers.length} oyuncu lobide.`, false);
      }, (err) => {
        console.error(err);
        setOnlineStatus("Lobby dinleme hatası: " + err.message, true);
      });
  }

  function escapeHTML(value){
    return String(value ?? "")
      .replaceAll("&","&amp;")
      .replaceAll("<","&lt;")
      .replaceAll(">","&gt;")
      .replaceAll('"',"&quot;")
      .replaceAll("'","&#039;");
  }

  function renderFirebaseLobbyPlayers(roomPlayers){
    const holder = $("lobbyPlayers");
    if(!holder) return;

    if(!roomPlayers.length){
      holder.innerHTML = `<div class="lobby-player"><div class="lobby-avatar">⏳</div><div><b>Oyuncu bekleniyor...</b><span>Lobby boş</span></div><strong></strong></div>`;
      return;
    }

    holder.innerHTML = roomPlayers.map((p) => {
      const avatar = p.character || (p.host ? "👑" : "👤");
      const you = p.id === onlinePlayerId ? " • SEN" : "";
      const tag = p.host ? "HOST" : "OYUNCU";
      const ready = p.ready ? "Hazır" : "Bekliyor";
      return `
        <div class="lobby-player ${p.id === onlinePlayerId ? "me" : ""}">
          <div class="lobby-avatar">${avatar}</div>
          <div>
            <b>${escapeHTML(p.name || "Oyuncu")}${you}</b>
            <span>${tag}</span>
          </div>
          <strong>${ready}</strong>
        </div>
      `;
    }).join("");
  }

  async function toggleOnlineReady(){
    if(!onlineCurrentRoomCode || !initFirebaseLobby()) return;
    const ref = playersRef(onlineCurrentRoomCode).doc(onlinePlayerId);
    const snap = await ref.get();
    const current = snap.exists ? !!snap.data().ready : false;
    await ref.set({
      ready: !current,
      lastSeen: firebase.firestore.FieldValue.serverTimestamp()
    }, {merge:true});
    playSound("click");
  }

  async function saveSelectedCharacterToFirebase(){
    if(!onlineCurrentRoomCode || !selectedCharacter || !initFirebaseLobby()) return;
    await playersRef(onlineCurrentRoomCode).doc(onlinePlayerId).set({
      character: selectedCharacter,
      lastSeen: firebase.firestore.FieldValue.serverTimestamp()
    }, {merge:true});
  }

  const _renderCharactersV38 = renderCharacters;
  renderCharacters = function(){
    _renderCharactersV38();
    document.querySelectorAll(".character-option").forEach(btn => {
      btn.addEventListener("click", () => setTimeout(saveSelectedCharacterToFirebase, 80));
    });
  };

  const _closeOnlineOverlayV38 = closeOnlineOverlay;
  closeOnlineOverlay = function(){
    if(onlineRoomUnsubscribe){
      onlineRoomUnsubscribe();
      onlineRoomUnsubscribe = null;
    }
    _closeOnlineOverlayV38();
  };



  /* ===== V38.1 ONLINE LOBBY FLOW FIX ===== */

  let onlineRoomData = null;
  let onlineRoomDocUnsubscribe = null;
  let onlineLobbyPlayersCache = [];
  let onlineIsHost = false;

  function setOnlineHostHint(text, type="info"){
    const el = $("onlineHostHint");
    if(!el) return;
    el.textContent = text;
    el.dataset.type = type;
  }

  function updateOnlineLobbyButtons(){
    const characterBtn = $("goCharacterSelectBtn");
    const readyBtn = $("onlineReadyBtn");
    const startBtn = $("onlineStartGameBtn");

    if(characterBtn){
      characterBtn.disabled = !onlineIsHost;
      characterBtn.classList.toggle("disabled", !onlineIsHost);
      characterBtn.textContent = onlineIsHost ? "Karakter Seçimine Geç" : "Host karakter seçimine geçebilir";
    }

    if(readyBtn){
      readyBtn.textContent = "Hazırım";
    }

    if(startBtn){
      startBtn.disabled = !onlineIsHost;
      startBtn.classList.toggle("disabled", !onlineIsHost);
      startBtn.textContent = onlineIsHost ? "Oyunu Başlat" : "Oyunu sadece host başlatabilir";
    }
  }

  function listenOnlineRoomDoc(code){
    if(!initFirebaseLobby()) return;

    if(onlineRoomDocUnsubscribe){
      onlineRoomDocUnsubscribe();
      onlineRoomDocUnsubscribe = null;
    }

    onlineRoomDocUnsubscribe = roomRef(code).onSnapshot((snap) => {
      onlineRoomData = snap.exists ? snap.data() : null;
      onlineIsHost = !!onlineRoomData && onlineRoomData.hostId === onlinePlayerId;

      updateOnlineLobbyButtons();

      if(onlineRoomData?.status === "character"){
        setOnlineHostHint(onlineIsHost ? "Karakter seçimini yönetiyorsun." : "Host karakter seçimini başlattı.", "ok");
      }else if(onlineRoomData?.status === "started"){
        setOnlineHostHint("Oyun başlatıldı. Online oyun senkronu V39'da eklenecek.", "ok");
      }else{
        setOnlineHostHint(onlineIsHost ? "Bu odanın hostu sensin. Oyuncular hazır olunca karakter seçimine geç." : "Odaya katıldın. Hostun karakter seçimine geçmesini bekle.", "info");
      }
    }, (err) => {
      console.error(err);
      setOnlineHostHint("Oda bilgisi okunamadı: " + err.message, "error");
    });
  }

  const _listenOnlineRoomV381 = listenOnlineRoom;
  listenOnlineRoom = function(code){
    _listenOnlineRoomV381(code);
    listenOnlineRoomDoc(code);
    updateOnlineLobbyButtons();
  };

  const _renderFirebaseLobbyPlayersV381 = renderFirebaseLobbyPlayers;
  renderFirebaseLobbyPlayers = function(roomPlayers){
    onlineLobbyPlayersCache = roomPlayers || [];
    _renderFirebaseLobbyPlayersV381(roomPlayers);

    const holder = $("lobbyPlayers");
    if(holder){
      holder.classList.add("online-lobby-visible");
    }

    updateOnlineLobbyButtons();
  };

  const _toggleOnlineReadyV381 = toggleOnlineReady;
  toggleOnlineReady = async function(){
    await _toggleOnlineReadyV381();

    const me = onlineLobbyPlayersCache.find(p => p.id === onlinePlayerId);
    const btn = $("onlineReadyBtn");
    if(btn && me){
      btn.textContent = me.ready ? "Hazırım" : "Hazırım";
    }
  };

  goCharacterSelect = async function(){
    if(!onlineCurrentRoomCode || !initFirebaseLobby()){
      showOnlinePage("characterSelectPage");
      renderCharacters();
      return;
    }

    if(!onlineIsHost){
      setOnlineStatus("Karakter seçimine sadece oda kuran kişi geçebilir.", true);
      setOnlineHostHint("Hostun karakter seçimine geçmesini bekle.", "error");
      return;
    }

    try{
      await roomRef(onlineCurrentRoomCode).set({
        status: "character",
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      }, {merge:true});

      renderCharacters();
      showOnlinePage("characterSelectPage");
      playSound("click");
    }catch(err){
      console.error(err);
      setOnlineStatus("Karakter seçimi başlatılamadı: " + err.message, true);
    }
  };

  onlineStartGameMock = async function(){
    if(!onlineCurrentRoomCode || !initFirebaseLobby()){
      closeOnlineOverlay();
      showScreen("setup");
      return;
    }

    if(!onlineIsHost){
      setOnlineStatus("Oyunu sadece oda kuran kişi başlatabilir.", true);
      return;
    }

    if(!selectedCharacter){
      setOnlineStatus("Önce karakterini seç.", true);
      return;
    }

    const allPlayers = onlineLobbyPlayersCache || [];
    const missingReady = allPlayers.filter(p => !p.ready && p.id !== onlinePlayerId);
    const missingCharacter = allPlayers.filter(p => !p.character && p.id !== onlinePlayerId);

    if(allPlayers.length < 2){
      setOnlineStatus("Oyunu başlatmak için en az 2 oyuncu gerekli.", true);
      return;
    }

    if(missingReady.length){
      setOnlineStatus("Herkes hazır olmadan başlatamazsın.", true);
      return;
    }

    if(missingCharacter.length){
      setOnlineStatus("Herkes karakter seçmeden başlatamazsın.", true);
      return;
    }

    try{
      await roomRef(onlineCurrentRoomCode).set({
        status: "started",
        startedAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      }, {merge:true});

      setOnlineStatus("Online oyun başlatıldı. Oyun senkronu V39'da eklenecek.", false);
      setOnlineHostHint("V38.1: lobby tamam. V39'da gerçek oyun ekranı senkron bağlanacak.", "ok");
      showOnlinePage("onlineLobby");
      playSound("click");
    }catch(err){
      console.error(err);
      setOnlineStatus("Oyun başlatılamadı: " + err.message, true);
    }
  };

  const _closeOnlineOverlayV381 = closeOnlineOverlay;
  closeOnlineOverlay = function(){
    if(onlineRoomDocUnsubscribe){
      onlineRoomDocUnsubscribe();
      onlineRoomDocUnsubscribe = null;
    }
    _closeOnlineOverlayV381();
  };



  /* ===== V38.2 ONLINE CHARACTER SYSTEM ===== */

  function getTakenCharacters(){
    const taken = new Map();
    (onlineLobbyPlayersCache || []).forEach(p => {
      if(p.character) taken.set(p.character, p);
    });
    return taken;
  }

  function canCurrentPlayerUseCharacter(ch){
    const taken = getTakenCharacters();
    const owner = taken.get(ch);
    return !owner || owner.id === onlinePlayerId;
  }

  async function selectOnlineCharacter(ch){
    if(!onlineCurrentRoomCode || !initFirebaseLobby()) return;

    if(!canCurrentPlayerUseCharacter(ch)){
      const owner = getTakenCharacters().get(ch);
      setOnlineStatus(`${ch} karakteri ${owner?.name || "başka oyuncu"} tarafından seçildi.`, true);
      return;
    }

    selectedCharacter = ch;
    await playersRef(onlineCurrentRoomCode).doc(onlinePlayerId).set({
      character: ch,
      lastSeen: firebase.firestore.FieldValue.serverTimestamp()
    }, {merge:true});

    setOnlineStatus(`${ch} karakteri seçildi.`, false);
    renderCharacters();
    playSound("click");
  }

  renderCharacters = function(){
    const grid = $("characterGrid");
    if(!grid) return;

    const taken = getTakenCharacters();
    grid.innerHTML = "";

    characterOptions.forEach(ch => {
      const owner = taken.get(ch);
      const isMine = owner?.id === onlinePlayerId;
      const isTaken = !!owner && !isMine;

      const btn = document.createElement("button");
      btn.className = `character-option ${selectedCharacter === ch || isMine ? "selected" : ""} ${isTaken ? "taken" : ""}`;
      btn.type = "button";
      btn.innerHTML = `<span>${ch}</span>${isTaken ? `<small>${escapeHTML(owner.name || "Dolu")}</small>` : ""}`;

      btn.disabled = isTaken;
      btn.title = isTaken ? `${owner.name || "Oyuncu"} seçti` : "Seç";

      btn.addEventListener("click", () => selectOnlineCharacter(ch));
      grid.appendChild(btn);
    });
  };

  const _renderFirebaseLobbyPlayersV382 = renderFirebaseLobbyPlayers;
  renderFirebaseLobbyPlayers = function(roomPlayers){
    onlineLobbyPlayersCache = roomPlayers || [];
    _renderFirebaseLobbyPlayersV382(roomPlayers);

    if($("characterSelectPage")?.classList.contains("active")){
      renderCharacters();
    }

    updateStartRequirementText();
  };

  function updateStartRequirementText(){
    const startBtn = $("onlineStartGameBtn");
    if(!startBtn) return;

    const all = onlineLobbyPlayersCache || [];
    const everyoneReady = all.length >= 2 && all.every(p => p.ready || p.id === onlinePlayerId);
    const everyoneHasCharacter = all.length >= 2 && all.every(p => !!p.character || p.id === onlinePlayerId);
    const meHasCharacter = !!(all.find(p => p.id === onlinePlayerId)?.character || selectedCharacter);

    if(!onlineIsHost){
      startBtn.textContent = "Oyunu sadece host başlatabilir";
      return;
    }

    if(all.length < 2){
      startBtn.textContent = "En az 2 oyuncu gerekli";
      return;
    }

    if(!meHasCharacter){
      startBtn.textContent = "Önce karakterini seç";
      return;
    }

    if(!everyoneReady){
      startBtn.textContent = "Herkes hazır olmalı";
      return;
    }

    if(!everyoneHasCharacter){
      startBtn.textContent = "Herkes karakter seçmeli";
      return;
    }

    startBtn.textContent = "Oyunu Başlat";
  }

  function renderOnlinePreparingPlayers(){
    const holder = $("onlineFinalPlayers");
    if(!holder) return;

    const all = onlineLobbyPlayersCache || [];
    holder.innerHTML = all.map(p => `
      <div class="online-final-player">
        <span>${p.character || "❔"}</span>
        <b>${escapeHTML(p.name || "Oyuncu")}</b>
        <small>${p.host ? "HOST" : "OYUNCU"}</small>
      </div>
    `).join("");
  }

  onlineStartGameMock = async function(){
    if(!onlineCurrentRoomCode || !initFirebaseLobby()){
      return;
    }

    if(!onlineIsHost){
      setOnlineStatus("Oyunu sadece oda kuran kişi başlatabilir.", true);
      return;
    }

    const allPlayers = onlineLobbyPlayersCache || [];
    const me = allPlayers.find(p => p.id === onlinePlayerId);
    const meCharacter = me?.character || selectedCharacter;

    if(allPlayers.length < 2){
      setOnlineStatus("Oyunu başlatmak için en az 2 oyuncu gerekli.", true);
      return;
    }

    if(!meCharacter){
      setOnlineStatus("Önce karakterini seç.", true);
      return;
    }

    const notReady = allPlayers.filter(p => p.id !== onlinePlayerId && !p.ready);
    if(notReady.length){
      setOnlineStatus("Herkes hazır olmadan başlatamazsın.", true);
      return;
    }

    const noCharacter = allPlayers.filter(p => p.id !== onlinePlayerId && !p.character);
    if(noCharacter.length){
      setOnlineStatus("Herkes karakter seçmeden başlatamazsın.", true);
      return;
    }

    try{
      await roomRef(onlineCurrentRoomCode).set({
        status: "preparing",
        finalPlayers: allPlayers.map(p => ({
          id: p.id,
          name: p.name || "Oyuncu",
          host: !!p.host,
          character: p.id === onlinePlayerId ? meCharacter : p.character
        })),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      }, {merge:true});

      renderOnlinePreparingPlayers();
      showOnlinePage("onlinePreparingPage");
      setOnlineStatus("Online oyun hazırlanıyor.", false);
      playSound("click");
    }catch(err){
      console.error(err);
      setOnlineStatus("Oyun hazırlanamadı: " + err.message, true);
    }
  };

  const _listenOnlineRoomDocV382 = listenOnlineRoomDoc;
  listenOnlineRoomDoc = function(code){
    if(!_listenOnlineRoomDocV382) return;
    _listenOnlineRoomDocV382(code);

    // Ek dinleyici: oda preparing olursa herkes hazırlık ekranına geçsin.
    const extraUnsub = roomRef(code).onSnapshot((snap) => {
      const data = snap.exists ? snap.data() : null;
      if(data?.status === "preparing" || data?.status === "started"){
        if(Array.isArray(data.finalPlayers)){
          onlineLobbyPlayersCache = data.finalPlayers;
        }
        renderOnlinePreparingPlayers();
        showOnlinePage("onlinePreparingPage");
      }
    });

    const oldClose = closeOnlineOverlay;
    closeOnlineOverlay = function(){
      extraUnsub?.();
      oldClose();
    };
  };



  /* ===== V38.3 EXIT + CHARACTER SYNC FIX ===== */

  function openExitGameOverlay(){
    const overlay = $("exitGameOverlay");
    if(!overlay) return;
    overlay.classList.remove("hidden");
    requestAnimationFrame(() => overlay.classList.add("show"));
    playSound("click");
  }

  function closeExitGameOverlay(){
    const overlay = $("exitGameOverlay");
    if(!overlay) return;
    overlay.classList.remove("show");
    setTimeout(() => overlay.classList.add("hidden"), 220);
    playSound("click");
  }

  function resetClassicGameAndGoMenu(){
    try{
      stopAllLoopSounds();
      closeCard?.();
      closeSettings?.();
      closeSideInfo?.();
      closeExitGameOverlay();

      players = [];
      activePlayerIndex = 0;
      selectedPlayerCount = 2;
      currentOpenSpaceIndex = null;
      currentBuyerIndex = null;
      pendingRent = null;
      pendingChancePlayerIndex = null;
      chanceCardActive = false;
      buildMode = null;
      hasRolledThisTurn = false;
      canEndTurn = false;
      auctionState = null;
      activityLog = [];

      clearInterval(gameTimer);
      gameTimer = null;
      gameStartedAt = null;

      document.querySelectorAll(".tile").forEach(tile => {
        tile.classList.remove("owned","build-target","build-blocked");
        tile.style.removeProperty("--owner-color");
        tile.querySelector(".owner-badge")?.remove();
        tile.querySelector(".build-marker")?.remove();
      });

      const tokenLayer = $("tokenLayer");
      if(tokenLayer) tokenLayer.innerHTML = "";

      if($("diceOne")) $("diceOne").textContent = "⚀";
      if($("diceTwo")) $("diceTwo").textContent = "⚀";
      if($("diceTotal")) $("diceTotal").textContent = "Toplam: -";

      renderNameInputs?.();
      showScreen("menu");
    }catch(err){
      console.error("Oyundan çıkış hatası:", err);
      location.reload();
    }
  }

  // Online karakter ekranı senkronu:
  // Host status=character yapınca tüm cihazlar otomatik karakter sayfasına geçer.
  const _listenOnlineRoomDocV383 = listenOnlineRoomDoc;
  listenOnlineRoomDoc = function(code){
    _listenOnlineRoomDocV383(code);

    const unsubCharacterSync = roomRef(code).onSnapshot((snap) => {
      const data = snap.exists ? snap.data() : null;
      if(!data) return;

      if(data.status === "character"){
        if(!$("characterSelectPage")?.classList.contains("active")){
          renderCharacters();
          showOnlinePage("characterSelectPage");
          setOnlineStatus("Host karakter seçimini başlattı.", false);
        }
      }

      if(data.status === "lobby"){
        if($("characterSelectPage")?.classList.contains("active") || $("onlinePreparingPage")?.classList.contains("active")){
          showOnlinePage("onlineLobby");
        }
      }

      if(data.status === "preparing" || data.status === "started"){
        if(Array.isArray(data.finalPlayers)){
          onlineLobbyPlayersCache = data.finalPlayers;
        }
        renderOnlinePreparingPlayers?.();
        showOnlinePage("onlinePreparingPage");
      }
    });

    const prevClose = closeOnlineOverlay;
    closeOnlineOverlay = function(){
      try{ unsubCharacterSync?.(); }catch(e){}
      prevClose();
    };
  };

  async function backFromCharacterToLobby(){
    if(onlineCurrentRoomCode && onlineIsHost && initFirebaseLobby()){
      try{
        await roomRef(onlineCurrentRoomCode).set({
          status: "lobby",
          updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        }, {merge:true});
      }catch(err){
        console.error(err);
      }
    }
    showOnlinePage("onlineLobby");
    playSound("click");
  }



  /* ===== V39 ONLINE GAME START ===== */

  let isOnlineGame = false;
  let onlineGameRoomCode = null;
  let onlineGamePlayers = [];
  let onlineGameUnsubscribe = null;

  function buildOnlinePlayers(finalPlayers){
    return (finalPlayers || []).map((p, index) => ({
      id: p.id,
      name: p.name || `Oyuncu ${index + 1}`,
      character: p.character || "🚗",
      host: !!p.host,
      money: 1500,
      position: 0,
      owned: [],
      housesAvailable: 12,
      hotelsAvailable: 4,
      jailTurns: 0,
      isBot: false,
      className: `p${index + 1}`
    }));
  }

  function decorateOnlineTokens(){
    if(!isOnlineGame) return;

    players.forEach((p,index) => {
      const token = $(`playerToken${index}`);
      if(!token) return;
      token.classList.add("online-character-token");
      token.textContent = p.character || "🚗";
      token.title = p.name;
    });
  }

  const _createTokensV39 = createTokens;
  createTokens = function(){
    _createTokensV39();
    decorateOnlineTokens();
  };

  const _updateTokensV39 = updateTokens;
  updateTokens = function(){
    _updateTokensV39();
    decorateOnlineTokens();
  };

  function applyOnlineGameState(data){
    if(!data) return;

    if(Array.isArray(data.players)){
      onlineGamePlayers = data.players;
      players = buildOnlinePlayers(data.players);
    }

    activePlayerIndex = data.activePlayerIndex || 0;
    hasRolledThisTurn = !!data.hasRolledThisTurn;
    canEndTurn = !!data.canEndTurn;

    renderPlayers();
    createBoard();
    createTokens();
    refreshTileOwnership();
    updatePanel();
    updateTurnButtons();
    renderLeftPlayerPanel();

    if($("diceTotal")){
      $("diceTotal").textContent = data.message || "Online oyun başladı.";
    }
  }

  async function writeInitialOnlineGameState(){
    if(!onlineCurrentRoomCode || !initFirebaseLobby()) return;

    const finalPlayers = onlineLobbyPlayersCache.map(p => ({
      id: p.id,
      name: p.name || "Oyuncu",
      host: !!p.host,
      character: p.character || (p.id === onlinePlayerId ? selectedCharacter : "🚗")
    }));

    await roomRef(onlineCurrentRoomCode).set({
      status: "playing",
      gameState: {
        players: finalPlayers,
        activePlayerIndex: 0,
        hasRolledThisTurn: false,
        canEndTurn: false,
        round: 1,
        message: "Online oyun başladı. Sıra ilk oyuncuda."
      },
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    }, {merge:true});
  }

  async function startOnlineGameFromRoom(data){
    if(!data?.gameState) return;

    isOnlineGame = true;
    onlineGameRoomCode = onlineCurrentRoomCode || data.code || onlineGameRoomCode;

    closeOnlineOverlay();

    showScreen("game");
    startGameClock?.();

    applyOnlineGameState(data.gameState);
    setOnlineControls();
    listenOnlineGameState(onlineGameRoomCode);

    addActivity?.(`🌐 Online oyun başladı. Oda: ${onlineGameRoomCode || "?"}`);
  }

  function listenOnlineGameState(code){
    if(!code || !initFirebaseLobby()) return;

    if(onlineGameUnsubscribe){
      onlineGameUnsubscribe();
      onlineGameUnsubscribe = null;
    }

    onlineGameUnsubscribe = roomRef(code).onSnapshot((snap) => {
      const data = snap.exists ? snap.data() : null;
      if(!data?.gameState) return;

      if(data.status === "playing"){
        isOnlineGame = true;
        applyOnlineGameState(data.gameState);
        setOnlineControls();
      }
    });
  }

  function isMyOnlineTurn(){
    if(!isOnlineGame) return true;
    const current = players[activePlayerIndex];
    return current?.id === onlinePlayerId;
  }

  function setOnlineControls(){
    if(!isOnlineGame) return;

    const myTurn = isMyOnlineTurn();
    const rollBtn = $("rollDiceBtn");
    const endBtn = $("endTurnBtn");

    if(rollBtn){
      rollBtn.disabled = !myTurn || hasRolledThisTurn;
      rollBtn.textContent = myTurn ? "🎲 Zar At" : "⏳ Rakip Sırası";
    }

    if(endBtn){
      endBtn.disabled = !myTurn || !canEndTurn;
      endBtn.textContent = myTurn ? "✅ Turunu Bitir" : "⏳ Bekle";
    }

    const pill = $("turnPill");
    if(pill){
      const current = players[activePlayerIndex];
      pill.textContent = myTurn ? `Sıra sende: ${current?.name || ""}` : `Sıra: ${current?.name || ""}`;
    }
  }

  const _onlineStartGameMockV39 = onlineStartGameMock;
  onlineStartGameMock = async function(){
    if(!onlineCurrentRoomCode || !initFirebaseLobby()){
      return _onlineStartGameMockV39();
    }

    if(!onlineIsHost){
      setOnlineStatus("Oyunu sadece oda kuran kişi başlatabilir.", true);
      return;
    }

    const allPlayers = onlineLobbyPlayersCache || [];
    const me = allPlayers.find(p => p.id === onlinePlayerId);
    const meCharacter = me?.character || selectedCharacter;

    if(allPlayers.length < 2){
      setOnlineStatus("Oyunu başlatmak için en az 2 oyuncu gerekli.", true);
      return;
    }

    if(!meCharacter){
      setOnlineStatus("Önce karakterini seç.", true);
      return;
    }

    const notReady = allPlayers.filter(p => p.id !== onlinePlayerId && !p.ready);
    if(notReady.length){
      setOnlineStatus("Herkes hazır olmadan başlatamazsın.", true);
      return;
    }

    const noCharacter = allPlayers.filter(p => p.id !== onlinePlayerId && !p.character);
    if(noCharacter.length){
      setOnlineStatus("Herkes karakter seçmeden başlatamazsın.", true);
      return;
    }

    try{
      await writeInitialOnlineGameState();
      setOnlineStatus("Online oyun başlatıldı.", false);
      playSound("click");
    }catch(err){
      console.error(err);
      setOnlineStatus("Online oyun başlatılamadı: " + err.message, true);
    }
  };

  const _listenOnlineRoomDocV39 = listenOnlineRoomDoc;
  listenOnlineRoomDoc = function(code){
    _listenOnlineRoomDocV39(code);

    const unsubPlaySync = roomRef(code).onSnapshot((snap) => {
      const data = snap.exists ? snap.data() : null;
      if(data?.status === "playing" && data?.gameState){
        onlineCurrentRoomCode = code;
        startOnlineGameFromRoom(data);
      }
    });

    const prevClose = closeOnlineOverlay;
    closeOnlineOverlay = function(){
      try{ unsubPlaySync?.(); }catch(e){}
      prevClose();
    };
  };

  const _rollDiceV39 = rollDice;
  rollDice = async function(){
    if(isOnlineGame && !isMyOnlineTurn()){
      playSound("fail");
      return;
    }

    _rollDiceV39();

    if(isOnlineGame && onlineGameRoomCode && initFirebaseLobby()){
      setTimeout(async () => {
        try{
          const statePlayers = players.map(p => ({
            id:p.id,
            name:p.name,
            host:!!p.host,
            character:p.character || "🚗",
            money:p.money,
            position:p.position,
            owned:p.owned || [],
            housesAvailable:p.housesAvailable ?? 12,
            hotelsAvailable:p.hotelsAvailable ?? 4,
            jailTurns:p.jailTurns || 0
          }));

          await roomRef(onlineGameRoomCode).set({
            gameState:{
              players: statePlayers,
              activePlayerIndex,
              hasRolledThisTurn,
              canEndTurn,
              message: `${players[activePlayerIndex]?.name || "Oyuncu"} zar attı.`
            },
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
          }, {merge:true});
        }catch(err){
          console.error("Online zar state yazılamadı:", err);
        }
      }, 1800);
    }
  };

  const _finishTurnV39 = finishTurn;
  finishTurn = async function(){
    if(isOnlineGame && !isMyOnlineTurn()){
      playSound("fail");
      return;
    }

    _finishTurnV39();

    if(isOnlineGame && onlineGameRoomCode && initFirebaseLobby()){
      try{
        const statePlayers = players.map(p => ({
          id:p.id,
          name:p.name,
          host:!!p.host,
          character:p.character || "🚗",
          money:p.money,
          position:p.position,
          owned:p.owned || [],
          housesAvailable:p.housesAvailable ?? 12,
          hotelsAvailable:p.hotelsAvailable ?? 4,
          jailTurns:p.jailTurns || 0
        }));

        await roomRef(onlineGameRoomCode).set({
          gameState:{
            players: statePlayers,
            activePlayerIndex,
            hasRolledThisTurn,
            canEndTurn,
            message: `Sıra ${players[activePlayerIndex]?.name || "oyuncuda"}.`
          },
          updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        }, {merge:true});
      }catch(err){
        console.error("Online tur state yazılamadı:", err);
      }
    }
  };



  /* ===== V39.1 ONLINE BOARD + DICE FIX ===== */

  function normalizeOnlineGamePlayers(rawPlayers){
    return (rawPlayers || []).map((p, index) => ({
      id: p.id || ("online_" + index),
      name: p.name || `Oyuncu ${index + 1}`,
      character: p.character || "🚗",
      host: !!p.host,
      money: Number.isFinite(Number(p.money)) ? Number(p.money) : 1500,
      position: Number.isFinite(Number(p.position)) ? Number(p.position) : 0,
      owned: Array.isArray(p.owned) ? p.owned : [],
      housesAvailable: Number.isFinite(Number(p.housesAvailable)) ? Number(p.housesAvailable) : 12,
      hotelsAvailable: Number.isFinite(Number(p.hotelsAvailable)) ? Number(p.hotelsAvailable) : 4,
      jailTurns: Number.isFinite(Number(p.jailTurns)) ? Number(p.jailTurns) : 0,
      isBot: false,
      className: `p${index + 1}`
    }));
  }

  function forceBuildBoardForOnline(){
    const board = $("board");
    if(!board) return;

    // Eski bozuk/yarım tile varsa temizle.
    board.querySelectorAll(".tile").forEach(t => t.remove());

    // Tahtayı tekrar bas.
    boardSpaces.forEach((space,index) => {
      const rect = getTileRect(index);
      const tile = document.createElement("div");
      tile.className = `tile ${space.t}`;
      if(isLongName(space.n)) tile.classList.add("small-text");
      tile.style.left = `${rect.x}%`;
      tile.style.top = `${rect.y}%`;
      tile.style.width = `${rect.w}%`;
      tile.style.height = `${rect.h}%`;
      tile.innerHTML = tileHTML(space);
      tile.addEventListener("click", () => openCard(space, index));
      board.appendChild(tile);
    });
  }

  function setDiceFaceNumber(el, value){
    if(!el) return;
    const n = Math.max(1, Math.min(6, Number(value) || 1));
    el.textContent = "";
    el.classList.remove("dice-1","dice-2","dice-3","dice-4","dice-5","dice-6");
    el.classList.add(`dice-${n}`);
    el.dataset.value = String(n);
  }

  function resetDiceFacesVisual(){
    setDiceFaceNumber($("diceOne"), 1);
    setDiceFaceNumber($("diceTwo"), 1);
    if($("diceTotal")) $("diceTotal").textContent = "Toplam: -";
  }

  const _applyOnlineGameStateV391 = applyOnlineGameState;
  applyOnlineGameState = function(data){
    if(!data) return;

    if(Array.isArray(data.players)){
      onlineGamePlayers = data.players;
      players = normalizeOnlineGamePlayers(data.players);
    }

    activePlayerIndex = Number.isFinite(Number(data.activePlayerIndex)) ? Number(data.activePlayerIndex) : 0;
    hasRolledThisTurn = !!data.hasRolledThisTurn;
    canEndTurn = !!data.canEndTurn;

    forceBuildBoardForOnline();
    renderPlayers();
    createTokens();
    refreshTileOwnership();
    updatePanel();
    updateTurnButtons();
    renderLeftPlayerPanel();
    setActiveToken?.();

    if(data.diceOne && data.diceTwo){
      setDiceFaceNumber($("diceOne"), data.diceOne);
      setDiceFaceNumber($("diceTwo"), data.diceTwo);
      if($("diceTotal")) $("diceTotal").textContent = `Toplam: ${Number(data.diceOne) + Number(data.diceTwo)}`;
    }else{
      resetDiceFacesVisual();
    }

    if($("diceTotal") && data.message){
      $("diceTotal").textContent = data.message;
    }

    setOnlineControls();
  };

  const _startOnlineGameFromRoomV391 = startOnlineGameFromRoom;
  startOnlineGameFromRoom = async function(data){
    if(!data?.gameState) return;

    isOnlineGame = true;
    onlineGameRoomCode = onlineCurrentRoomCode || data.code || onlineGameRoomCode;

    // Önce game ekranını aç, sonra DOM içinde board'u kur.
    closeOnlineOverlay();
    showScreen("game");

    await wait(80);

    applyOnlineGameState(data.gameState);
    listenOnlineGameState(onlineGameRoomCode);

    addActivity?.(`🌐 Online oyun başladı. Oda: ${onlineGameRoomCode || "?"}`);
  };

  const _writeInitialOnlineGameStateV391 = writeInitialOnlineGameState;
  writeInitialOnlineGameState = async function(){
    if(!onlineCurrentRoomCode || !initFirebaseLobby()) return;

    const finalPlayers = onlineLobbyPlayersCache.map((p, index) => ({
      id: p.id,
      name: p.name || `Oyuncu ${index + 1}`,
      host: !!p.host,
      character: p.character || (p.id === onlinePlayerId ? selectedCharacter : "🚗"),
      money: 1500,
      position: 0,
      owned: [],
      housesAvailable: 12,
      hotelsAvailable: 4,
      jailTurns: 0
    }));

    await roomRef(onlineCurrentRoomCode).set({
      status: "playing",
      gameState: {
        players: finalPlayers,
        activePlayerIndex: 0,
        hasRolledThisTurn: false,
        canEndTurn: false,
        round: 1,
        diceOne: 1,
        diceTwo: 1,
        message: "Online oyun başladı. Sıra ilk oyuncuda."
      },
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    }, {merge:true});
  };

  const _rollDiceV391 = rollDice;
  rollDice = async function(){
    if(isOnlineGame && !isMyOnlineTurn()){
      playSound("fail");
      return;
    }

    // Zar sayılarını önceden yakalayabilmek için manuel sayı üret.
    if(isOnlineGame){
      const d1 = Math.ceil(Math.random() * 6);
      const d2 = Math.ceil(Math.random() * 6);
      setDiceFaceNumber($("diceOne"), d1);
      setDiceFaceNumber($("diceTwo"), d2);
    }

    _rollDiceV391();

    if(isOnlineGame && onlineGameRoomCode && initFirebaseLobby()){
      setTimeout(async () => {
        try{
          const statePlayers = normalizeOnlineGamePlayers(players).map(p => ({
            id:p.id,
            name:p.name,
            host:!!p.host,
            character:p.character || "🚗",
            money:p.money,
            position:p.position,
            owned:p.owned || [],
            housesAvailable:p.housesAvailable ?? 12,
            hotelsAvailable:p.hotelsAvailable ?? 4,
            jailTurns:p.jailTurns || 0
          }));

          const diceOneValue = Number($("diceOne")?.dataset.value || 1);
          const diceTwoValue = Number($("diceTwo")?.dataset.value || 1);

          await roomRef(onlineGameRoomCode).set({
            gameState:{
              players: statePlayers,
              activePlayerIndex,
              hasRolledThisTurn,
              canEndTurn,
              diceOne: diceOneValue,
              diceTwo: diceTwoValue,
              message: `${players[activePlayerIndex]?.name || "Oyuncu"} zar attı.`
            },
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
          }, {merge:true});
        }catch(err){
          console.error("Online zar state yazılamadı:", err);
        }
      }, 1900);
    }
  };

  // Classic tarafında da zar emoji yerine noktalı CSS olsun.
  resetDiceFacesVisual();



  /* ===== V39.2 ONLINE DICE RESULT FIX ===== */

  function writeDiceValuesToDom(d1,d2){
    renderDice(d1,d2);
    const one = $("diceOne");
    const two = $("diceTwo");
    if(one) one.dataset.value = String(d1);
    if(two) two.dataset.value = String(d2);
  }

  function serializeOnlinePlayers(){
    return normalizeOnlineGamePlayers(players).map(p => ({
      id:p.id,
      name:p.name,
      host:!!p.host,
      character:p.character || "🚗",
      money:p.money,
      position:p.position,
      owned:p.owned || [],
      housesAvailable:p.housesAvailable ?? 12,
      hotelsAvailable:p.hotelsAvailable ?? 4,
      jailTurns:p.jailTurns || 0
    }));
  }

  async function saveOnlineGameState(extra = {}){
    if(!isOnlineGame || !onlineGameRoomCode || !initFirebaseLobby()) return;

    await roomRef(onlineGameRoomCode).set({
      gameState:{
        players: serializeOnlinePlayers(),
        activePlayerIndex,
        hasRolledThisTurn,
        canEndTurn,
        ...extra
      },
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    }, {merge:true});
  }

  // Eski apply state mesajı zar toplamını ezmesin.
  const _applyOnlineGameStateV392 = applyOnlineGameState;
  applyOnlineGameState = function(data){
    _applyOnlineGameStateV392(data);

    if(data?.diceOne && data?.diceTwo){
      const d1 = Number(data.diceOne);
      const d2 = Number(data.diceTwo);
      writeDiceValuesToDom(d1,d2);
      if($("diceTotal")) $("diceTotal").textContent = `Toplam: ${d1 + d2}`;
    }
  };

  // Online zar: eski nested override'ları kullanmadan temiz akış.
  rollDice = async function(){
    if(!players.length) return;

    if(isOnlineGame && !isMyOnlineTurn()){
      playSound("fail");
      return;
    }

    if(hasRolledThisTurn) return;

    const currentPlayer = players[activePlayerIndex];

    if(currentPlayer?.jailTurns > 0){
      $("diceTotal").textContent = `${currentPlayer.name} hapiste. Turunu bitir.`;
      canEndTurn = true;
      updateTurnButtons();
      updatePanel();
      if(isOnlineGame){
        await saveOnlineGameState({
          message:`${currentPlayer.name} hapiste.`,
          diceOne:Number($("diceOne")?.dataset.value || 1),
          diceTwo:Number($("diceTwo")?.dataset.value || 1)
        });
      }
      return;
    }

    if(!isOnlineGame){
      // Klasik oyunda mevcut orijinal mantık kullanılsın diye eski V39.1 fonksiyonunu çağır.
      // _rollDiceV391 varsa onu, yoksa fail-safe olarak temel akışı kullan.
      if(typeof _rollDiceV391 === "function"){
        return _rollDiceV391();
      }
    }

    hasRolledThisTurn = true;
    canEndTurn = false;
    updateTurnButtons();

    const btn = $("rollDiceBtn");
    const diceBox = document.querySelector(".dice-box");

    btn.disabled = true;
    btn.classList.add("rolling-btn");
    diceBox?.classList.add("rolling-glow");

    $("diceTotal").textContent = "Zar atılıyor...";
    $("diceTotal").classList.add("rolling-text");
    $("diceOne").classList.add("rolling");
    $("diceTwo").classList.add("rolling");
    startLoopSound("dice");

    const rollDuration = 900;
    const startedAt = Date.now();

    while(Date.now() - startedAt < rollDuration){
      writeDiceValuesToDom(rand(1,6), rand(1,6));
      await wait(75);
    }

    const d1 = rand(1,6);
    const d2 = rand(1,6);
    const total = d1 + d2;

    writeDiceValuesToDom(d1,d2);

    $("diceOne").classList.remove("rolling");
    $("diceTwo").classList.remove("rolling");
    $("diceTotal").classList.remove("rolling-text");
    stopSound("dice");

    const playerIndex = activePlayerIndex;
    const player = players[playerIndex];
    const oldPos = player.position;
    const rawNewPos = oldPos + total;
    const passedStart = rawNewPos >= boardSpaces.length;

    $("diceTotal").textContent = `Toplam: ${total}`;
    addActivity?.(`🎲 ${player.name} ${total} attı.`);

    await movePlayerStepByStep(playerIndex, total);

    const landedIndex = player.position;

    if(passedStart){
      player.money += 200;
      $("diceTotal").textContent = `Toplam: ${total} | +200 TL`;
      showMoneyPopup(playerIndex, 200);
      addActivity?.(`💰 ${player.name} başlangıçtan geçti, 200 TL aldı.`);
    }

    afterPlayerLands(playerIndex, landedIndex);

    await wait(500);

    canEndTurn = true;
    updatePanel();

    diceBox?.classList.remove("rolling-glow");
    btn.classList.remove("rolling-btn");
    updateTurnButtons();

    await saveOnlineGameState({
      diceOne:d1,
      diceTwo:d2,
      message:`Toplam: ${total}`
    });

    // Firebase snapshot geldikten sonra bile sonucu hemen ekranda sabit tut.
    writeDiceValuesToDom(d1,d2);
    $("diceTotal").textContent = `Toplam: ${total}`;
  };

  const _finishTurnV392 = finishTurn;
  finishTurn = async function(){
    if(isOnlineGame && !isMyOnlineTurn()){
      playSound("fail");
      return;
    }

    const lastD1 = Number($("diceOne")?.dataset.value || 1);
    const lastD2 = Number($("diceTwo")?.dataset.value || 1);

    _finishTurnV392();

    if(isOnlineGame){
      await saveOnlineGameState({
        diceOne:lastD1,
        diceTwo:lastD2,
        message:`Sıra ${players[activePlayerIndex]?.name || "oyuncuda"}.`
      });
      writeDiceValuesToDom(lastD1,lastD2);
    }
  };



  /* ===== V40 MEGA ONLINE CORE =====
     Tek sürümde ana online senkron:
     - oyuncu para/konum/mülk
     - satın alma
     - kira ödeme
     - vergi/şans/hapis sonrası state
     - ev/otel state
     - tur state
  */

  let onlineSavingState = false;
  let onlineLastStateWrite = 0;

  function serializeOnlinePlayerFull(p){
    return {
      id:p.id,
      name:p.name,
      host:!!p.host,
      character:p.character || "🚗",
      money:Number.isFinite(Number(p.money)) ? Number(p.money) : 1500,
      position:Number.isFinite(Number(p.position)) ? Number(p.position) : 0,
      owned:Array.isArray(p.owned) ? [...p.owned] : [],
      housesAvailable:Number.isFinite(Number(p.housesAvailable)) ? Number(p.housesAvailable) : 12,
      hotelsAvailable:Number.isFinite(Number(p.hotelsAvailable)) ? Number(p.hotelsAvailable) : 4,
      jailTurns:Number.isFinite(Number(p.jailTurns)) ? Number(p.jailTurns) : 0,
      isBot:false
    };
  }

  function serializeOnlinePlayersFull(){
    return players.map(serializeOnlinePlayerFull);
  }

  function collectBuildState(){
    const build = {};
    document.querySelectorAll(".tile").forEach((tile, index) => {
      const marker = tile.querySelector(".build-marker");
      if(marker){
        const houses = marker.querySelectorAll("i").length;
        build[index] = {
          type: marker.classList.contains("hotel") ? "hotel" : "house",
          count: marker.classList.contains("hotel") ? 5 : houses
        };
      }
    });
    return build;
  }

  function applyBuildState(buildState){
    if(!buildState || typeof buildState !== "object") return;

    document.querySelectorAll(".tile .build-marker").forEach(m => m.remove());

    Object.entries(buildState).forEach(([indexRaw, info]) => {
      const index = Number(indexRaw);
      const tile = document.querySelectorAll(".tile")[index];
      if(!tile || !info) return;

      const marker = document.createElement("div");
      marker.className = "build-marker";
      if(info.type === "hotel") marker.classList.add("hotel");

      const count = info.type === "hotel" ? 1 : Math.max(1, Math.min(4, Number(info.count) || 1));
      for(let i=0;i<count;i++){
        const item = document.createElement("i");
        marker.appendChild(item);
      }

      tile.appendChild(marker);
    });
  }

  async function saveOnlineFullState(reason="Güncellendi", extra={}){
    if(!isOnlineGame || !onlineGameRoomCode || !initFirebaseLobby()) return;
    if(onlineSavingState) return;

    onlineSavingState = true;
    onlineLastStateWrite = Date.now();

    try{
      const diceOneValue = Number($("diceOne")?.dataset.value || 1);
      const diceTwoValue = Number($("diceTwo")?.dataset.value || 1);

      await roomRef(onlineGameRoomCode).set({
        gameState:{
          players: serializeOnlinePlayersFull(),
          activePlayerIndex,
          hasRolledThisTurn,
          canEndTurn,
          diceOne: diceOneValue,
          diceTwo: diceTwoValue,
          buildState: collectBuildState(),
          message: reason,
          ...extra
        },
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      }, {merge:true});
    }catch(err){
      console.error("Online state kaydedilemedi:", err);
    }finally{
      onlineSavingState = false;
    }
  }

  const _applyOnlineGameStateV40 = applyOnlineGameState;
  applyOnlineGameState = function(data){
    _applyOnlineGameStateV40(data);

    if(data?.buildState){
      applyBuildState(data.buildState);
    }

    refreshTileOwnership?.();
    renderPlayers?.();
    updatePanel?.();
    renderLeftPlayerPanel?.();

    if(data?.message && $("diceTotal")){
      $("diceTotal").textContent = data.message;
    }

    if(isOnlineGame){
      setOnlineControls?.();
    }
  };

  function isOnlineActionAllowed(){
    if(!isOnlineGame) return true;
    return isMyOnlineTurn();
  }

  async function afterOnlineActionSync(reason, delay=250){
    if(!isOnlineGame) return;
    setTimeout(() => saveOnlineFullState(reason), delay);
  }

  // Satın alma online senkron
  if(typeof buyCurrentSpace === "function"){
    const _buyCurrentSpaceV40 = buyCurrentSpace;
    buyCurrentSpace = function(){
      if(isOnlineGame && !isOnlineActionAllowed()){
        playSound("fail");
        return;
      }

      const beforeOwned = players[activePlayerIndex]?.owned?.length || 0;
      _buyCurrentSpaceV40();

      const afterOwned = players[activePlayerIndex]?.owned?.length || 0;
      if(isOnlineGame){
        const p = players[activePlayerIndex];
        const lastOwned = p?.owned?.[p.owned.length - 1];
        const name = boardSpaces[lastOwned]?.n || "mülk";
        afterOnlineActionSync(afterOwned > beforeOwned ? `${p.name} ${name} satın aldı.` : `${p?.name || "Oyuncu"} işlem yaptı.`, 350);
      }
    };
  }

  // Kira ödeme online senkron
  if(typeof payPendingRent === "function"){
    const _payPendingRentV40 = payPendingRent;
    payPendingRent = function(){
      if(isOnlineGame && !isOnlineActionAllowed()){
        playSound("fail");
        return;
      }

      _payPendingRentV40();

      if(isOnlineGame){
        const p = players[activePlayerIndex];
        afterOnlineActionSync(`${p?.name || "Oyuncu"} kira ödedi.`, 250);
      }
    };
  }

  // Şans kartı online senkron
  if(typeof drawChanceCard === "function"){
    const _drawChanceCardV40 = drawChanceCard;
    drawChanceCard = function(){
      if(isOnlineGame && !isOnlineActionAllowed()){
        playSound("fail");
        return;
      }

      _drawChanceCardV40();

      if(isOnlineGame){
        const p = players[activePlayerIndex];
        afterOnlineActionSync(`${p?.name || "Oyuncu"} şans kartı çekti.`, 1800);
      }
    };
  }

  // Hapis seçimleri online senkron
  if(typeof choosePayBail === "function"){
    const _choosePayBailV40 = choosePayBail;
    choosePayBail = function(){
      if(isOnlineGame && !isOnlineActionAllowed()){
        playSound("fail");
        return;
      }

      _choosePayBailV40();

      if(isOnlineGame){
        const p = players[activePlayerIndex];
        afterOnlineActionSync(`${p?.name || "Oyuncu"} kefalet ödedi.`, 250);
      }
    };
  }

  if(typeof chooseStayInJail === "function"){
    const _chooseStayInJailV40 = chooseStayInJail;
    chooseStayInJail = function(){
      if(isOnlineGame && !isOnlineActionAllowed()){
        playSound("fail");
        return;
      }

      _chooseStayInJailV40();

      if(isOnlineGame){
        const p = players[activePlayerIndex];
        afterOnlineActionSync(`${p?.name || "Oyuncu"} hapiste kalmayı seçti.`, 250);
      }
    };
  }

  // Ev/Otel online senkron
  if(typeof buildOnProperty === "function"){
    const _buildOnPropertyV40 = buildOnProperty;
    buildOnProperty = function(spaceIndex){
      if(isOnlineGame && !isOnlineActionAllowed()){
        playSound("fail");
        return;
      }

      _buildOnPropertyV40(spaceIndex);

      if(isOnlineGame){
        const p = players[activePlayerIndex];
        const name = boardSpaces[spaceIndex]?.n || "mülk";
        afterOnlineActionSync(`${p?.name || "Oyuncu"} ${name} üstüne yapı kurdu.`, 350);
      }
    };
  }

  // Karta tıklama: online modda sıra sende değilse satın alma/kira işlemi yaptırma, sadece göster.
  const _openCardV40 = openCard;
  openCard = function(space, index=null){
    _openCardV40(space, index);

    if(isOnlineGame && !isOnlineActionAllowed()){
      const buyBtn = $("buyBtn");
      if(buyBtn){
        buyBtn.disabled = true;
        buyBtn.textContent = "Sıra sende değil";
      }
    }
  };

  // Vergi ve özel kareler afterPlayerLands içinde değişiyorsa hemen state yaz.
  if(typeof afterPlayerLands === "function"){
    const _afterPlayerLandsV40 = afterPlayerLands;
    afterPlayerLands = function(playerIndex, landedIndex){
      _afterPlayerLandsV40(playerIndex, landedIndex);

      if(isOnlineGame && playerIndex === activePlayerIndex){
        const space = boardSpaces[landedIndex];
        const p = players[playerIndex];
        if(space?.t === "tax"){
          afterOnlineActionSync(`${p?.name || "Oyuncu"} ${space.n} ödedi.`, 450);
        }else if(space?.n === "KODESE GİR"){
          afterOnlineActionSync(`${p?.name || "Oyuncu"} kodese girdi.`, 450);
        }else if(space?.t === "empty" || space?.t === "corner"){
          afterOnlineActionSync(`${p?.name || "Oyuncu"} ${space.n} karesine geldi.`, 450);
        }
      }
    };
  }

  // Tur bitirme kesin state
  const _finishTurnV40 = finishTurn;
  finishTurn = async function(){
    if(isOnlineGame && !isOnlineActionAllowed()){
      playSound("fail");
      return;
    }

    _finishTurnV40();

    if(isOnlineGame){
      await saveOnlineFullState(`Sıra ${players[activePlayerIndex]?.name || "oyuncuda"}.`);
    }
  };

  // Online state gelince satın alma ve buton kilitleri doğru güncellensin.
  const _setOnlineControlsV40 = setOnlineControls;
  setOnlineControls = function(){
    _setOnlineControlsV40();

    if(!isOnlineGame) return;

    const myTurn = isMyOnlineTurn();
    ["buyBtn","drawChanceBtn","payRentBtn","stayJailBtn","payBailBtn","buildHouseBtn","buildHotelBtn"].forEach(id => {
      const btn = $(id);
      if(btn){
        btn.disabled = !myTurn || btn.disabled;
        if(!myTurn && id === "buyBtn") btn.textContent = "Sıra sende değil";
      }
    });
  };

  // Başlatırken tüm oyuncular için tam state yaz.
  const _writeInitialOnlineGameStateV40 = writeInitialOnlineGameState;
  writeInitialOnlineGameState = async function(){
    if(!onlineCurrentRoomCode || !initFirebaseLobby()) return;

    const finalPlayers = onlineLobbyPlayersCache.map((p, index) => ({
      id: p.id,
      name: p.name || `Oyuncu ${index + 1}`,
      host: !!p.host,
      character: p.character || (p.id === onlinePlayerId ? selectedCharacter : "🚗"),
      money: 1500,
      position: 0,
      owned: [],
      housesAvailable: 12,
      hotelsAvailable: 4,
      jailTurns: 0
    }));

    await roomRef(onlineCurrentRoomCode).set({
      status: "playing",
      gameState: {
        players: finalPlayers,
        activePlayerIndex: 0,
        hasRolledThisTurn: false,
        canEndTurn: false,
        round: 1,
        diceOne: 1,
        diceTwo: 1,
        buildState: {},
        message: "Online oyun başladı. Sıra ilk oyuncuda."
      },
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    }, {merge:true});
  };



  /* ===== V41 + V42 MEGA RULES SYNC =====
     Online kuralları tek pakette güçlendirme:
     - owner/rent/money tam state
     - iflas/yetersiz para kontrolü
     - şans kartı sonrası geç senkron
     - hapis/başlangıç/vergi güvenli state
     - oyun sonu kontrolü
     - online action lock
  */

  let onlineActionBusy = false;

  function isPlayerBankrupt(p){
    return !!p && Number(p.money) < 0;
  }

  function getAliveOnlinePlayers(){
    return players.filter(p => !p.bankrupt);
  }

  function normalizeFullOnlinePlayerState(raw, index){
    const p = normalizeOnlineGamePlayers([raw])[0] || {};
    return {
      ...p,
      id: raw.id || p.id || ("online_" + index),
      bankrupt: !!raw.bankrupt,
      propertiesValue: Number(raw.propertiesValue || 0)
    };
  }

  const _normalizeOnlineGamePlayersV4142 = normalizeOnlineGamePlayers;
  normalizeOnlineGamePlayers = function(rawPlayers){
    return (rawPlayers || []).map((raw, index) => {
      const base = _normalizeOnlineGamePlayersV4142([raw])[0];
      return {
        ...base,
        id: raw.id || base.id || ("online_" + index),
        bankrupt: !!raw.bankrupt,
        propertiesValue: Number(raw.propertiesValue || 0)
      };
    });
  };

  function serializeOnlinePlayerFull4142(p){
    return {
      id:p.id,
      name:p.name,
      host:!!p.host,
      character:p.character || "🚗",
      money:Number.isFinite(Number(p.money)) ? Number(p.money) : 1500,
      position:Number.isFinite(Number(p.position)) ? Number(p.position) : 0,
      owned:Array.isArray(p.owned) ? [...p.owned] : [],
      housesAvailable:Number.isFinite(Number(p.housesAvailable)) ? Number(p.housesAvailable) : 12,
      hotelsAvailable:Number.isFinite(Number(p.hotelsAvailable)) ? Number(p.hotelsAvailable) : 4,
      jailTurns:Number.isFinite(Number(p.jailTurns)) ? Number(p.jailTurns) : 0,
      bankrupt:!!p.bankrupt,
      propertiesValue:(p.owned || []).reduce((sum,i) => sum + getSpacePurchasePrice(boardSpaces[i]), 0)
    };
  }

  function serializeOnlinePlayersFull4142(){
    return players.map(serializeOnlinePlayerFull4142);
  }

  function checkOnlineBankruptcy(){
    let changed = false;

    players.forEach((p, index) => {
      if(!p.bankrupt && p.money < 0){
        p.bankrupt = true;
        addActivity?.(`💀 ${p.name} iflas etti.`);
        changed = true;
      }
    });

    const alive = players.filter(p => !p.bankrupt);

    if(alive.length === 1 && players.length > 1){
      const winner = alive[0];
      addActivity?.(`🏆 ${winner.name} online oyunu kazandı!`);
      showOnlineWinner?.(winner);
      changed = true;
    }

    return changed;
  }

  function showOnlineWinner(winner){
    const existing = $("onlineWinnerOverlay");
    if(existing) existing.remove();

    const overlay = document.createElement("div");
    overlay.id = "onlineWinnerOverlay";
    overlay.className = "online-winner-overlay show";
    overlay.innerHTML = `
      <div class="online-winner-card">
        <div class="online-winner-cup">🏆</div>
        <h2>${escapeHTML(winner.name)} Kazandı!</h2>
        <p>BarutPoly Online oyununun kazananı belli oldu.</p>
        <button id="onlineWinnerMenuBtn">Ana Menüye Dön</button>
      </div>
    `;
    document.body.appendChild(overlay);

    $("onlineWinnerMenuBtn")?.addEventListener("click", () => {
      overlay.remove();
      isOnlineGame = false;
      onlineGameRoomCode = null;
      showScreen("menu");
    });
  }

  async function saveOnlineFullState4142(reason="Güncellendi", extra={}){
    if(!isOnlineGame || !onlineGameRoomCode || !initFirebaseLobby()) return;

    checkOnlineBankruptcy();

    const diceOneValue = Number($("diceOne")?.dataset.value || 1);
    const diceTwoValue = Number($("diceTwo")?.dataset.value || 1);

    const alive = players.filter(p => !p.bankrupt);
    const status = alive.length === 1 && players.length > 1 ? "finished" : "playing";

    await roomRef(onlineGameRoomCode).set({
      status,
      gameState:{
        players: serializeOnlinePlayersFull4142(),
        activePlayerIndex,
        hasRolledThisTurn,
        canEndTurn,
        diceOne: diceOneValue,
        diceTwo: diceTwoValue,
        buildState: collectBuildState?.() || {},
        message: reason,
        winnerId: status === "finished" ? alive[0]?.id : null,
        winnerName: status === "finished" ? alive[0]?.name : null,
        ...extra
      },
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    }, {merge:true});
  }

  saveOnlineFullState = saveOnlineFullState4142;

  const _applyOnlineGameStateV4142 = applyOnlineGameState;
  applyOnlineGameState = function(data){
    _applyOnlineGameStateV4142(data);

    if(Array.isArray(data?.players)){
      players.forEach((p, i) => {
        p.bankrupt = !!data.players[i]?.bankrupt;
      });
    }

    renderPlayers?.();
    refreshTileOwnership?.();

    if(data?.winnerId){
      const winner = players.find(p => p.id === data.winnerId) || {name:data.winnerName || "Oyuncu"};
      showOnlineWinner(winner);
    }
  };

  function nextActiveOnlinePlayerIndex(fromIndex){
    if(!players.length) return 0;

    for(let step=1; step<=players.length; step++){
      const next = (fromIndex + step) % players.length;
      if(!players[next]?.bankrupt) return next;
    }

    return fromIndex;
  }

  function guardOnlineBusy(){
    if(onlineActionBusy){
      playSound("fail");
      return true;
    }
    return false;
  }

  async function withOnlineActionLock(fn){
    if(guardOnlineBusy()) return;
    onlineActionBusy = true;

    try{
      await fn();
    }finally{
      onlineActionBusy = false;
    }
  }

  // Online tur bitirme: iflas etmiş oyuncuları atla.
  finishTurn = async function(){
    if(isOnlineGame && !isMyOnlineTurn()){
      playSound("fail");
      return;
    }

    if(pendingRent && !pendingRent.paid){
      showRentWarning?.();
      return;
    }

    if(!canEndTurn) return;

    closeCard?.();

    const oldIndex = activePlayerIndex;
    activePlayerIndex = nextActiveOnlinePlayerIndex(activePlayerIndex);
    hasRolledThisTurn = false;
    canEndTurn = false;
    currentOpenSpaceIndex = null;
    currentBuyerIndex = null;

    const nextPlayer = players[activePlayerIndex];

    if(nextPlayer && nextPlayer.jailTurns > 0){
      nextPlayer.jailTurns -= 1;
      hasRolledThisTurn = true;
      canEndTurn = true;
      if($("diceTotal")) $("diceTotal").textContent = `${nextPlayer.name} hapiste. Kalan tur: ${nextPlayer.jailTurns}`;
      addActivity?.(`⛓️ ${nextPlayer.name} hapiste bekledi. Kalan tur: ${nextPlayer.jailTurns}`);
      playSound("jail");
    }else{
      if($("diceTotal")) $("diceTotal").textContent = "Sıra yeni oyuncuda.";
      addActivity?.(`➡️ Sıra ${nextPlayer?.name || "oyuncuda"}.`);
      playSound("click");
    }

    updatePanel?.();
    updateTurnButtons?.();
    renderLeftPlayerPanel?.();

    if(isOnlineGame){
      await saveOnlineFullState4142(`Sıra ${players[activePlayerIndex]?.name || "oyuncuda"}.`);
    }
  };

  // Online satın alma: mülk sahibi ve para kesin senkron.
  if(typeof buyCurrentSpace === "function"){
    buyCurrentSpace = function(){
      if(isOnlineGame && !isOnlineActionAllowed()){
        playSound("fail");
        return;
      }

      const index = currentOpenSpaceIndex;
      const player = players[activePlayerIndex];
      const space = boardSpaces[index];

      if(!space || !player || !canBuySpace(space)) return;
      if(getOwnerIndex(index) >= 0){
        playSound("fail");
        return;
      }

      const price = getSpacePurchasePrice(space);

      if(player.money < price){
        playSound("fail");
        if($("diceTotal")) $("diceTotal").textContent = "Yeterli paran yok.";
        return;
      }

      player.money -= price;
      player.owned.push(index);
      showMoneyPopup?.(activePlayerIndex, -price);
      playSound("buy");
      addActivity?.(`🏠 ${player.name} ${space.n} satın aldı.`);

      closeCard?.();
      refreshTileOwnership?.();
      updatePanel?.();
      renderLeftPlayerPanel?.();

      if(isOnlineGame){
        saveOnlineFullState4142(`${player.name} ${space.n} satın aldı.`);
      }
    };
  }

  // Online kira: iki taraf parası kesin senkron.
  if(typeof payPendingRent === "function"){
    payPendingRent = function(){
      if(isOnlineGame && !isOnlineActionAllowed()){
        playSound("fail");
        return;
      }

      if(!pendingRent || pendingRent.paid) return;

      const payer = players[pendingRent.payerIndex];
      const owner = players[pendingRent.ownerIndex];
      const amount = pendingRent.amount || 0;

      if(!payer || !owner) return;

      payer.money -= amount;
      owner.money += amount;
      pendingRent.paid = true;

      showMoneyPopup?.(pendingRent.payerIndex, -amount);
      showMoneyPopup?.(pendingRent.ownerIndex, amount);
      playPaymentSound?.();
      addActivity?.(`💸 ${payer.name}, ${owner.name} oyuncusuna ${amount} TL kira ödedi.`);

      closeCard?.();
      updatePanel?.();
      renderPlayers?.();
      checkOnlineBankruptcy();

      if(isOnlineGame){
        saveOnlineFullState4142(`${payer.name} ${amount} TL kira ödedi.`);
      }
    };
  }

  // Şans kartı sonrası biraz bekleyip state'i tekrar yaz.
  if(typeof drawChanceCard === "function"){
    const _drawChanceCardV4142 = drawChanceCard;
    drawChanceCard = function(){
      if(isOnlineGame && !isOnlineActionAllowed()){
        playSound("fail");
        return;
      }

      _drawChanceCardV4142();

      if(isOnlineGame){
        setTimeout(() => saveOnlineFullState4142(`${players[activePlayerIndex]?.name || "Oyuncu"} şans kartı çekti.`), 2300);
      }
    };
  }

  // Hapis seçimleri
  if(typeof choosePayBail === "function"){
    const _choosePayBailV4142 = choosePayBail;
    choosePayBail = function(){
      if(isOnlineGame && !isOnlineActionAllowed()){
        playSound("fail");
        return;
      }

      _choosePayBailV4142();
      if(isOnlineGame) saveOnlineFullState4142(`${players[activePlayerIndex]?.name || "Oyuncu"} kefalet ödedi.`);
    };
  }

  if(typeof chooseStayInJail === "function"){
    const _chooseStayInJailV4142 = chooseStayInJail;
    chooseStayInJail = function(){
      if(isOnlineGame && !isOnlineActionAllowed()){
        playSound("fail");
        return;
      }

      _chooseStayInJailV4142();
      if(isOnlineGame) saveOnlineFullState4142(`${players[activePlayerIndex]?.name || "Oyuncu"} hapiste kalmayı seçti.`);
    };
  }

  // Ev/otel state
  if(typeof buildOnProperty === "function"){
    const _buildOnPropertyV4142 = buildOnProperty;
    buildOnProperty = function(spaceIndex){
      if(isOnlineGame && !isOnlineActionAllowed()){
        playSound("fail");
        return;
      }

      _buildOnPropertyV4142(spaceIndex);
      if(isOnlineGame){
        saveOnlineFullState4142(`${players[activePlayerIndex]?.name || "Oyuncu"} yapı kurdu.`);
      }
    };
  }

  // Landing sonrası vergi, başlangıç, hapis, boş kareler state.
  if(typeof afterPlayerLands === "function"){
    const _afterPlayerLandsV4142 = afterPlayerLands;
    afterPlayerLands = function(playerIndex, landedIndex){
      _afterPlayerLandsV4142(playerIndex, landedIndex);

      if(isOnlineGame && playerIndex === activePlayerIndex){
        const p = players[playerIndex];
        const s = boardSpaces[landedIndex];
        setTimeout(() => {
          checkOnlineBankruptcy();
          saveOnlineFullState4142(`${p?.name || "Oyuncu"} ${s?.n || "kare"} karesine geldi.`);
        }, 500);
      }
    };
  }

  // Başlangıçtan geçince para zaten rollDice içinde ekleniyor; roll sonrası tam state yazılsın.
  const _rollDiceV4142 = rollDice;
  rollDice = async function(){
    if(isOnlineGame && !isMyOnlineTurn()){
      playSound("fail");
      return;
    }

    await _rollDiceV4142();

    if(isOnlineGame){
      setTimeout(() => saveOnlineFullState4142(`Toplam: ${Number($("diceOne")?.dataset.value || 1) + Number($("diceTwo")?.dataset.value || 1)}`), 2100);
    }
  };

  // UI: iflas edenleri panelde göster.
  const _renderPlayersV4142 = renderPlayers;
  renderPlayers = function(){
    _renderPlayersV4142();

    document.querySelectorAll(".player-row").forEach((row, index) => {
      if(players[index]?.bankrupt){
        row.classList.add("bankrupt-player");
        const b = row.querySelector("b");
        if(b && !b.textContent.includes("İFLAS")){
          b.innerHTML += `<em class="bankrupt-tag">İFLAS</em>`;
        }
      }
    });
  };



  /* ===== V43 + V44 STABILITY + POLISH =====
     - reconnect / heartbeat
     - disconnected player label
     - host leave fallback
     - action lock
     - sync indicator
     - smoother visual feedback
  */

  let onlineHeartbeatTimer = null;
  let onlineReconnectTimer = null;
  let onlineActionLockUntil = 0;
  let onlineLastRoomSnapshot = null;

  function showOnlineSyncPill(text="🌐 Online", mode="ok"){
    const pill = $("onlineSyncPill");
    if(!pill) return;
    pill.textContent = text;
    pill.className = `online-sync-pill ${mode}`;
    pill.classList.remove("hidden");
  }

  function hideOnlineSyncPill(){
    $("onlineSyncPill")?.classList.add("hidden");
  }

  function setOnlineBusyLock(ms=1200){
    onlineActionLockUntil = Date.now() + ms;
    document.body.classList.add("online-action-busy");
    setTimeout(() => {
      if(Date.now() >= onlineActionLockUntil){
        document.body.classList.remove("online-action-busy");
      }
    }, ms + 40);
  }

  function onlineIsBusyLocked(){
    return Date.now() < onlineActionLockUntil;
  }

  async function updateOnlineHeartbeat(){
    if(!onlineCurrentRoomCode || !initFirebaseLobby()) return;

    try{
      await playersRef(onlineCurrentRoomCode).doc(onlinePlayerId).set({
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
        connected: true
      }, {merge:true});
    }catch(err){
      console.warn("heartbeat hata", err);
      showOnlineSyncPill("⚠️ Bağlantı zayıf", "warn");
    }
  }

  function startOnlineHeartbeat(){
    stopOnlineHeartbeat();
    updateOnlineHeartbeat();
    onlineHeartbeatTimer = setInterval(updateOnlineHeartbeat, 12000);
  }

  function stopOnlineHeartbeat(){
    if(onlineHeartbeatTimer){
      clearInterval(onlineHeartbeatTimer);
      onlineHeartbeatTimer = null;
    }
  }

  async function markOnlineLeft(){
    if(!onlineCurrentRoomCode || !initFirebaseLobby()) return;
    try{
      await playersRef(onlineCurrentRoomCode).doc(onlinePlayerId).set({
        connected: false,
        leftAt: firebase.firestore.FieldValue.serverTimestamp()
      }, {merge:true});
    }catch(e){}
  }

  window.addEventListener("beforeunload", () => {
    try{ markOnlineLeft(); }catch(e){}
  });

  document.addEventListener("visibilitychange", () => {
    if(document.visibilityState === "visible"){
      updateOnlineHeartbeat();
      if(isOnlineGame && onlineGameRoomCode){
        listenOnlineGameState(onlineGameRoomCode);
        showOnlineSyncPill("🔄 Yeniden bağlandı", "ok");
        setTimeout(() => showOnlineSyncPill("🌐 Online", "ok"), 1400);
      }
    }
  });

  function playerLooksDisconnected(p){
    // Firestore Timestamp compatible
    if(p.connected === false) return true;
    if(!p.lastSeen || !p.lastSeen.toDate) return false;
    return Date.now() - p.lastSeen.toDate().getTime() > 35000;
  }

  function chooseNewHostIfNeeded(roomPlayers){
    if(!onlineCurrentRoomCode || !initFirebaseLobby()) return;
    if(!Array.isArray(roomPlayers) || !roomPlayers.length) return;

    const currentHost = roomPlayers.find(p => p.host);
    const hostDead = currentHost && playerLooksDisconnected(currentHost);

    if(currentHost && !hostDead) return;

    const alive = roomPlayers.find(p => !playerLooksDisconnected(p)) || roomPlayers[0];
    if(!alive) return;

    // Sadece yeni host adayı kendi cihazında hostluğu üstlensin.
    if(alive.id === onlinePlayerId){
      playersRef(onlineCurrentRoomCode).doc(onlinePlayerId).set({host:true}, {merge:true});
      roomRef(onlineCurrentRoomCode).set({
        hostId: onlinePlayerId,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      }, {merge:true});
      setOnlineHostHint?.("Host ayrıldı, yeni host sensin.", "ok");
    }
  }

  const _listenOnlineRoomV4344 = listenOnlineRoom;
  listenOnlineRoom = function(code){
    _listenOnlineRoomV4344(code);
    onlineCurrentRoomCode = code;
    startOnlineHeartbeat();
    showOnlineSyncPill("🌐 Lobby bağlı", "ok");
  };

  const _renderFirebaseLobbyPlayersV4344 = renderFirebaseLobbyPlayers;
  renderFirebaseLobbyPlayers = function(roomPlayers){
    chooseNewHostIfNeeded(roomPlayers);
    _renderFirebaseLobbyPlayersV4344(roomPlayers);

    document.querySelectorAll("#lobbyPlayers .lobby-player").forEach((el, index) => {
      const p = roomPlayers[index];
      if(!p) return;
      if(playerLooksDisconnected(p)){
        el.classList.add("disconnected");
        const strong = el.querySelector("strong");
        if(strong) strong.textContent = "Koptu";
      }
    });
  };

  const _setOnlineControlsV4344 = setOnlineControls;
  setOnlineControls = function(){
    _setOnlineControlsV4344();
    if(!isOnlineGame) return;

    const locked = onlineIsBusyLocked();
    ["rollDiceBtn","endTurnBtn","buyBtn","drawChanceBtn","payRentBtn","stayJailBtn","payBailBtn","buildHouseBtn","buildHotelBtn"].forEach(id => {
      const btn = $(id);
      if(btn && locked){
        btn.disabled = true;
      }
    });

    showOnlineSyncPill(isMyOnlineTurn() ? "✅ Sıra sende" : "⏳ Rakip sırası", isMyOnlineTurn() ? "ok" : "wait");
  };

  async function safeOnlineAction(label, fn){
    if(onlineIsBusyLocked()){
      playSound("fail");
      return;
    }

    setOnlineBusyLock(1500);
    showOnlineSyncPill("🔄 Senkronlanıyor...", "wait");

    try{
      await fn();
      showOnlineSyncPill("✅ Kaydedildi", "ok");
      setTimeout(() => {
        if(isOnlineGame) showOnlineSyncPill(isMyOnlineTurn() ? "✅ Sıra sende" : "⏳ Rakip sırası", isMyOnlineTurn() ? "ok" : "wait");
      }, 1100);
    }catch(err){
      console.error(label, err);
      showOnlineSyncPill("⚠️ Senkron hatası", "warn");
      playSound("fail");
    }
  }

  const _saveOnlineFullStateV4344 = saveOnlineFullState;
  saveOnlineFullState = async function(reason="Güncellendi", extra={}){
    showOnlineSyncPill("🔄 Kaydediliyor...", "wait");
    await _saveOnlineFullStateV4344(reason, extra);
    showOnlineSyncPill("🌐 Online", "ok");
  };

  const _listenOnlineGameStateV4344 = listenOnlineGameState;
  listenOnlineGameState = function(code){
    _listenOnlineGameStateV4344(code);

    // ekstra güvenlik: bağlantı koparsa otomatik tekrar dinle
    if(onlineReconnectTimer) clearInterval(onlineReconnectTimer);
    onlineReconnectTimer = setInterval(() => {
      if(isOnlineGame && onlineGameRoomCode && document.visibilityState === "visible"){
        updateOnlineHeartbeat();
      }
    }, 15000);
  };

  const _applyOnlineGameStateV4344 = applyOnlineGameState;
  applyOnlineGameState = function(data){
    onlineLastRoomSnapshot = data;
    _applyOnlineGameStateV4344(data);

    document.body.classList.toggle("online-my-turn", isOnlineGame && isMyOnlineTurn());
    document.body.classList.toggle("online-wait-turn", isOnlineGame && !isMyOnlineTurn());

    // Online oyuncu karakterini panelde küçük göster
    document.querySelectorAll(".player-row").forEach((row, index) => {
      const p = players[index];
      if(!p) return;
      if(!row.querySelector(".row-character")){
        const ch = document.createElement("i");
        ch.className = "row-character";
        ch.textContent = p.character || "";
        row.appendChild(ch);
      }else{
        row.querySelector(".row-character").textContent = p.character || "";
      }
    });
  };

  // Kritik aksiyonları kilit + görsel senkronla sar
  if(typeof buyCurrentSpace === "function"){
    const _buyCurrentSpaceV4344 = buyCurrentSpace;
    buyCurrentSpace = function(){
      if(isOnlineGame){
        return safeOnlineAction("buy", () => _buyCurrentSpaceV4344());
      }
      return _buyCurrentSpaceV4344();
    };
  }

  if(typeof payPendingRent === "function"){
    const _payPendingRentV4344 = payPendingRent;
    payPendingRent = function(){
      if(isOnlineGame){
        return safeOnlineAction("rent", () => _payPendingRentV4344());
      }
      return _payPendingRentV4344();
    };
  }

  if(typeof drawChanceCard === "function"){
    const _drawChanceCardV4344 = drawChanceCard;
    drawChanceCard = function(){
      if(isOnlineGame){
        return safeOnlineAction("chance", () => _drawChanceCardV4344());
      }
      return _drawChanceCardV4344();
    };
  }

  if(typeof buildOnProperty === "function"){
    const _buildOnPropertyV4344 = buildOnProperty;
    buildOnProperty = function(spaceIndex){
      if(isOnlineGame){
        return safeOnlineAction("build", () => _buildOnPropertyV4344(spaceIndex));
      }
      return _buildOnPropertyV4344(spaceIndex);
    };
  }

  const _rollDiceV4344 = rollDice;
  rollDice = function(){
    if(isOnlineGame){
      return safeOnlineAction("dice", () => _rollDiceV4344());
    }
    return _rollDiceV4344();
  };

  const _finishTurnV4344 = finishTurn;
  finishTurn = function(){
    if(isOnlineGame){
      return safeOnlineAction("turn", () => _finishTurnV4344());
    }
    return _finishTurnV4344();
  };

  const _closeOnlineOverlayV4344 = closeOnlineOverlay;
  closeOnlineOverlay = function(){
    stopOnlineHeartbeat();
    hideOnlineSyncPill();
    _closeOnlineOverlayV4344();
  };

  // Görsel: token hareket edince küçük pop efekti
  const _moveTokenVisualV4344 = moveTokenVisual;
  moveTokenVisual = function(playerIndex){
    _moveTokenVisualV4344(playerIndex);
    const token = $(`playerToken${playerIndex}`);
    if(token){
      token.classList.remove("token-pop");
      void token.offsetWidth;
      token.classList.add("token-pop");
    }
  };



  /* ===== V45 FINAL RELEASE CANDIDATE =====
     Final polish + güvenlik + performans:
     - global toast
     - final loading overlay
     - online throttled save
     - confetti winner
     - mobile fullscreen helper
     - safe refresh ownership
     - better error recovery
  */

  const BARUTPOLY_VERSION = "V45 RC";
  let finalSaveTimer = null;
  let lastFinalSavePayload = null;

  function showFinalToast(text, type="info", ms=2600){
    const holder = $("finalToastHolder");
    if(!holder) return;

    const toast = document.createElement("div");
    toast.className = `final-toast ${type}`;
    toast.textContent = text;
    holder.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add("show"));

    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 260);
    }, ms);
  }

  function showFinalLoading(text="Yükleniyor..."){
    const overlay = $("finalLoadingOverlay");
    if(!overlay) return;
    if($("finalLoadingText")) $("finalLoadingText").textContent = text;
    overlay.classList.remove("hidden");
    requestAnimationFrame(() => overlay.classList.add("show"));
  }

  function hideFinalLoading(){
    const overlay = $("finalLoadingOverlay");
    if(!overlay) return;
    overlay.classList.remove("show");
    setTimeout(() => overlay.classList.add("hidden"), 220);
  }

  function requestMobileFullscreen(){
    // Mobilde ilk dokunuşta daha iyi ekran alanı.
    try{
      if(window.innerWidth < 900 && !document.fullscreenElement){
        document.documentElement.requestFullscreen?.().catch?.(() => {});
      }
    }catch(e){}
  }

  document.addEventListener("click", requestMobileFullscreen, {once:true});

  // Online save'leri çakışmasın diye hafif throttle.
  const _saveOnlineFullStateV45 = saveOnlineFullState;
  saveOnlineFullState = async function(reason="Güncellendi", extra={}){
    if(!isOnlineGame){
      return _saveOnlineFullStateV45(reason, extra);
    }

    lastFinalSavePayload = {reason, extra};

    if(finalSaveTimer){
      clearTimeout(finalSaveTimer);
    }

    return new Promise((resolve) => {
      finalSaveTimer = setTimeout(async () => {
        const payload = lastFinalSavePayload || {reason, extra};
        finalSaveTimer = null;

        try{
          await _saveOnlineFullStateV45(payload.reason, payload.extra);
          resolve();
        }catch(err){
          console.error("V45 save hata:", err);
          showFinalToast("Senkron hatası, tekrar deneniyor.", "warn");
          resolve();
        }
      }, 220);
    });
  };

  // Online oyun açılışında loading.
  const _startOnlineGameFromRoomV45 = startOnlineGameFromRoom;
  startOnlineGameFromRoom = async function(data){
    showFinalLoading("Online oyun hazırlanıyor...");
    try{
      await _startOnlineGameFromRoomV45(data);
      showFinalToast("Online oyun başladı.", "ok");
    }finally{
      setTimeout(hideFinalLoading, 450);
    }
  };

  // Tahta sahiplikleri bazen geç basıyorsa güvenli yenile.
  function safeFullRefresh(){
    try{
      forceBuildBoardForOnline?.();
      refreshTileOwnership?.();
      renderPlayers?.();
      updatePanel?.();
      renderLeftPlayerPanel?.();
      updateTokens?.();
      setActiveToken?.();
    }catch(err){
      console.warn("safeFullRefresh hata:", err);
    }
  }

  const _applyOnlineGameStateV45 = applyOnlineGameState;
  applyOnlineGameState = function(data){
    _applyOnlineGameStateV45(data);
    setTimeout(safeFullRefresh, 80);

    if(data?.message){
      showOnlineSyncPill?.("🌐 " + data.message, "ok");
    }
  };

  // Kazanan ekranına konfeti.
  function spawnFinalConfetti(){
    const holder = document.createElement("div");
    holder.className = "final-confetti-holder";
    document.body.appendChild(holder);

    const emojis = ["🎉","✨","🏆","💰","👑","🎊"];
    for(let i=0;i<42;i++){
      const c = document.createElement("span");
      c.textContent = emojis[Math.floor(Math.random()*emojis.length)];
      c.style.left = Math.random()*100 + "vw";
      c.style.animationDelay = (Math.random()*0.9) + "s";
      c.style.animationDuration = (1.8 + Math.random()*1.8) + "s";
      holder.appendChild(c);
    }

    setTimeout(() => holder.remove(), 4200);
  }

  const _showOnlineWinnerV45 = showOnlineWinner;
  showOnlineWinner = function(winner){
    _showOnlineWinnerV45(winner);
    spawnFinalConfetti();
    playSound("win");
    showFinalToast(`${winner?.name || "Oyuncu"} kazandı!`, "ok", 4200);
  };

  // Klasik kazanan ekranı varsa ona da konfeti bağla.
  if(typeof showWinnerScreen === "function"){
    const _showWinnerScreenV45 = showWinnerScreen;
    showWinnerScreen = function(...args){
      _showWinnerScreenV45(...args);
      spawnFinalConfetti();
    };
  }

  // Oyundan çıkarken online ise odadan ayrıldı yaz.
  const _resetClassicGameAndGoMenuV45 = resetClassicGameAndGoMenu;
  resetClassicGameAndGoMenu = function(){
    try{
      if(isOnlineGame){
        markOnlineLeft?.();
        if(onlineGameUnsubscribe){
          onlineGameUnsubscribe();
          onlineGameUnsubscribe = null;
        }
        isOnlineGame = false;
        onlineGameRoomCode = null;
      }
    }catch(e){}
    _resetClassicGameAndGoMenuV45();
    showFinalToast("Ana menüye dönüldü.", "info");
  };

  // Kritik butonlara küçük titreşim/feedback.
  function finalButtonFeedback(btn){
    if(!btn) return;
    btn.classList.remove("final-tap");
    void btn.offsetWidth;
    btn.classList.add("final-tap");
  }

  ["rollDiceBtn","endTurnBtn","buyBtn","drawChanceBtn","onlineStartGameBtn","continueGameBtn"].forEach(id => {
    document.addEventListener("click", (e) => {
      if(e.target?.id === id || e.target?.closest?.("#"+id)){
        finalButtonFeedback($(id));
      }
    });
  });

  // Firebase offline/online browser durumu.
  window.addEventListener("online", () => {
    showFinalToast("Bağlantı geri geldi.", "ok");
    if(isOnlineGame && onlineGameRoomCode){
      listenOnlineGameState?.(onlineGameRoomCode);
      saveOnlineFullState?.("Bağlantı yenilendi.");
    }
  });

  window.addEventListener("offline", () => {
    showFinalToast("İnternet bağlantısı koptu.", "warn", 4000);
    showOnlineSyncPill?.("⚠️ Offline", "warn");
  });

  // Menüye versiyon aktivitesi
  setTimeout(() => {
    console.log("BarutPoly", BARUTPOLY_VERSION, "ready");
  }, 500);



  /* ===== V46 MEGA PACK =====
     - Aktivite paneli scroll
     - Online oyun içi sohbet
     - 8 oyuncu desteği
     - Basit profil/hesap
     - İstatistikler
     - 6 tema
     - Bildirim/toast sistemi
     - Günlük ödül
  */

  const V46_THEMES = [
    {id:"classic", name:"Klasik", icon:"👑", desc:"Orijinal BarutPoly"},
    {id:"dark", name:"Gece", icon:"🌙", desc:"Koyu neon"},
    {id:"gold", name:"Altın", icon:"🏆", desc:"Premium altın"},
    {id:"istanbul", name:"İstanbul", icon:"🌉", desc:"Mavi şehir"},
    {id:"forest", name:"Orman", icon:"🌲", desc:"Yeşil sakin"},
    {id:"fire", name:"Alev", icon:"🔥", desc:"Kırmızı enerji"}
  ];

  const profileState = {
    name: localStorage.getItem("barutpolyProfileName") || "",
    theme: localStorage.getItem("barutpolyTheme") || "classic",
    coins: Number(localStorage.getItem("barutpolyCoins") || 0),
    stats: JSON.parse(localStorage.getItem("barutpolyStats") || '{"games":0,"wins":0,"onlineGames":0,"properties":0}')
  };

  let chatUnsubscribe = null;
  let chatReady = false;

  function saveProfileState(){
    localStorage.setItem("barutpolyProfileName", profileState.name || "");
    localStorage.setItem("barutpolyTheme", profileState.theme || "classic");
    localStorage.setItem("barutpolyCoins", String(profileState.coins || 0));
    localStorage.setItem("barutpolyStats", JSON.stringify(profileState.stats || {}));
  }

  function addStat(key, amount=1){
    profileState.stats[key] = Number(profileState.stats[key] || 0) + amount;
    saveProfileState();
    renderProfileStats();
  }

  function applyTheme(themeId=profileState.theme){
    profileState.theme = themeId;
    document.body.dataset.theme = themeId;
    saveProfileState();
  }

  function renderThemeGrid(){
    const grid = $("themeGrid");
    if(!grid) return;
    grid.innerHTML = "";

    V46_THEMES.forEach(t => {
      const btn = document.createElement("button");
      btn.className = `theme-card ${profileState.theme === t.id ? "active" : ""}`;
      btn.innerHTML = `<span>${t.icon}</span><b>${t.name}</b><small>${t.desc}</small>`;
      btn.addEventListener("click", () => {
        applyTheme(t.id);
        renderThemeGrid();
        showFinalToast?.(`${t.name} teması aktif.`, "ok");
        playSound("click");
      });
      grid.appendChild(btn);
    });
  }

  function renderProfileStats(){
    const holder = $("profileStats");
    if(!holder) return;
    holder.innerHTML = `
      <div><b>${profileState.coins}</b><span>BP Coin</span></div>
      <div><b>${profileState.stats.games || 0}</b><span>Oyun</span></div>
      <div><b>${profileState.stats.wins || 0}</b><span>Galibiyet</span></div>
      <div><b>${profileState.stats.properties || 0}</b><span>Mülk</span></div>
    `;
  }

  function openProfileOverlay(){
    const overlay = $("profileOverlay");
    if(!overlay) return;
    if($("profileNameInput")) $("profileNameInput").value = profileState.name || "";
    renderThemeGrid();
    renderProfileStats();
    updateDailyRewardUI();
    overlay.classList.remove("hidden");
    requestAnimationFrame(() => overlay.classList.add("show"));
    playSound("click");
  }

  function closeProfileOverlay(){
    const overlay = $("profileOverlay");
    if(!overlay) return;
    overlay.classList.remove("show");
    setTimeout(() => overlay.classList.add("hidden"), 220);
    playSound("click");
  }

  function saveProfileName(){
    const name = $("profileNameInput")?.value.trim();
    profileState.name = name || "Oyuncu";
    saveProfileState();
    showFinalToast?.("Profil kaydedildi.", "ok");
    playSound("click");
  }

  function todayKey(){
    return new Date().toISOString().slice(0,10);
  }

  function updateDailyRewardUI(){
    const claimed = localStorage.getItem("barutpolyDailyReward") === todayKey();
    const btn = $("claimDailyRewardBtn");
    const txt = $("dailyRewardText");

    if(btn){
      btn.disabled = claimed;
      btn.textContent = claimed ? "Alındı" : "Ödülü Al";
    }
    if(txt){
      txt.textContent = claimed ? "Bugünkü ödülü aldın. Yarın tekrar gel." : "Bugün 100 BP Coin kazanabilirsin.";
    }
  }

  function claimDailyReward(){
    const key = todayKey();
    if(localStorage.getItem("barutpolyDailyReward") === key){
      showFinalToast?.("Bugünkü ödülü zaten aldın.", "warn");
      return;
    }

    localStorage.setItem("barutpolyDailyReward", key);
    profileState.coins += 100;
    saveProfileState();
    renderProfileStats();
    updateDailyRewardUI();
    showFinalToast?.("🎁 100 BP Coin kazandın!", "ok", 3600);
    playSound("money");
  }

  function getDisplayPlayerName(){
    if(profileState.name) return profileState.name;
    if(isOnlineGame){
      const me = players.find(p => p.id === onlinePlayerId);
      if(me?.name) return me.name;
    }
    return document.querySelector(".player-name")?.value?.trim() || "Oyuncu";
  }

  function localChatMessage(text){
    const holder = $("chatMessages");
    if(!holder) return;
    holder.querySelector(".chat-empty")?.remove();

    const row = document.createElement("div");
    row.className = "chat-message local";
    row.innerHTML = `<b>${escapeHTML(getDisplayPlayerName())}</b><span>${escapeHTML(text)}</span>`;
    holder.appendChild(row);
    holder.scrollTop = holder.scrollHeight;
  }

  async function sendChatMessage(){
    const input = $("chatInput");
    const text = input?.value.trim();
    if(!text) return;

    input.value = "";

    if(isOnlineGame && onlineGameRoomCode && initFirebaseLobby()){
      try{
        await roomRef(onlineGameRoomCode).collection("messages").add({
          playerId: onlinePlayerId,
          name: getDisplayPlayerName(),
          text,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        playSound("click");
      }catch(err){
        console.error("chat gönderilemedi", err);
        localChatMessage(text);
        showFinalToast?.("Mesaj yerel gösterildi, online gönderilemedi.", "warn");
      }
    }else{
      localChatMessage(text);
      playSound("click");
    }
  }

  function startChatListener(){
    if(chatUnsubscribe){
      chatUnsubscribe();
      chatUnsubscribe = null;
    }

    const holder = $("chatMessages");
    if(holder) holder.innerHTML = `<div class="chat-empty">Mesajlar yükleniyor...</div>`;

    if(!isOnlineGame || !onlineGameRoomCode || !initFirebaseLobby()){
      if(holder) holder.innerHTML = `<div class="chat-empty">Klasik modda mesajlar sadece bu ekranda görünür.</div>`;
      return;
    }

    chatUnsubscribe = roomRef(onlineGameRoomCode).collection("messages")
      .orderBy("createdAt", "asc")
      .limit(80)
      .onSnapshot((snapshot) => {
        const holder = $("chatMessages");
        if(!holder) return;
        holder.innerHTML = "";

        if(snapshot.empty){
          holder.innerHTML = `<div class="chat-empty">Henüz mesaj yok.</div>`;
          return;
        }

        snapshot.forEach(doc => {
          const m = doc.data();
          const row = document.createElement("div");
          row.className = `chat-message ${m.playerId === onlinePlayerId ? "me" : ""}`;
          row.innerHTML = `<b>${escapeHTML(m.name || "Oyuncu")}</b><span>${escapeHTML(m.text || "")}</span>`;
          holder.appendChild(row);
        });

        holder.scrollTop = holder.scrollHeight;
      }, (err) => {
        console.error("chat dinleme hata", err);
        showFinalToast?.("Sohbet bağlantısı koptu.", "warn");
      });
  }

  const _startOnlineGameFromRoomV46 = startOnlineGameFromRoom;
  startOnlineGameFromRoom = async function(data){
    await _startOnlineGameFromRoomV46(data);
    startChatListener();
    addStat("onlineGames", 1);
    addStat("games", 1);
  };

  const _showScreenV46 = showScreen;
  showScreen = function(name){
    _showScreenV46(name);
    if(name === "game"){
      setTimeout(() => {
        const feed = $("activityFeed");
        if(feed) feed.scrollTop = feed.scrollHeight;
        startChatListener();
      }, 200);
    }
  };

  const _addActivityV46 = typeof addActivity === "function" ? addActivity : null;
  if(_addActivityV46){
    addActivity = function(text){
      _addActivityV46(text);
      const feed = $("activityFeed");
      if(feed) feed.scrollTop = feed.scrollHeight;
    };
  }

  // 8 oyuncu token renkleri için renk fonksiyonunu genişlet
  getPlayerColor = function(index){
    const colors = ["#2563eb","#ef4444","#22c55e","#facc15","#ec4899","#06b6d4","#a855f7","#f97316"];
    return colors[index % colors.length];
  };

  // Satın alma istatistiği
  if(typeof buyCurrentSpace === "function"){
    const _buyCurrentSpaceV46 = buyCurrentSpace;
    buyCurrentSpace = function(){
      const before = players[activePlayerIndex]?.owned?.length || 0;
      const result = _buyCurrentSpaceV46();
      const after = players[activePlayerIndex]?.owned?.length || 0;
      if(after > before) addStat("properties", 1);
      return result;
    };
  }

  // Kazanma istatistiği
  const _showOnlineWinnerV46 = showOnlineWinner;
  showOnlineWinner = function(winner){
    _showOnlineWinnerV46(winner);
    if(winner?.id === onlinePlayerId){
      addStat("wins", 1);
      profileState.coins += 250;
      saveProfileState();
      showFinalToast?.("🏆 +250 BP Coin kazandın!", "ok", 4200);
    }
  };

  // Bildirimler
  function notifyGame(text){
    showFinalToast?.(text, "info", 3200);
    if("Notification" in window && Notification.permission === "granted"){
      new Notification("BarutPoly", {body:text});
    }
  }

  async function requestNotifications(){
    if(!("Notification" in window)){
      showFinalToast?.("Bu cihaz bildirim desteklemiyor.", "warn");
      return;
    }

    const perm = await Notification.requestPermission();
    showFinalToast?.(perm === "granted" ? "Bildirimler açıldı." : "Bildirim izni verilmedi.", perm === "granted" ? "ok" : "warn");
  }

  // Ayarlar butonuna ek olarak profil panelinde bildirim butonu oluştur
  function addNotificationButtonToProfile(){
    const box = document.querySelector(".reward-box");
    if(!box || $("enableNotifyBtn")) return;
    const btn = document.createElement("button");
    btn.id = "enableNotifyBtn";
    btn.textContent = "Bildirim Aç";
    btn.addEventListener("click", requestNotifications);
    box.appendChild(btn);
  }

  const _openProfileOverlayV46 = openProfileOverlay;
  openProfileOverlay = function(){
    _openProfileOverlayV46();
    addNotificationButtonToProfile();
  };

  // init
  applyTheme(profileState.theme);
  setTimeout(() => {
    renderProfileStats();
    updateDailyRewardUI();
  }, 500);



  /* ===== V47 PROFILE / THEME / CHAT LAYOUT FIX ===== */

  function openThemesOverlay(){
    const overlay = $("themesOverlay");
    if(!overlay) return;
    renderThemeGrid();
    overlay.classList.remove("hidden");
    requestAnimationFrame(() => overlay.classList.add("show"));
    playSound("click");
  }

  function closeThemesOverlay(){
    const overlay = $("themesOverlay");
    if(!overlay) return;
    overlay.classList.remove("show");
    setTimeout(() => overlay.classList.add("hidden"), 220);
    playSound("click");
  }

  const _applyThemeV47 = applyTheme;
  applyTheme = function(themeId=profileState.theme){
    _applyThemeV47(themeId);
    document.documentElement.dataset.theme = themeId;
    document.body.dataset.theme = themeId;
    const meta = V46_THEMES.find(t => t.id === themeId);
    showFinalToast?.(`${meta?.name || "Tema"} aktif edildi.`, "ok");
  };

  renderThemeGrid = function(){
    const grid = $("themeGrid");
    if(!grid) return;
    grid.innerHTML = "";

    V46_THEMES.forEach(t => {
      const btn = document.createElement("button");
      btn.className = `theme-card theme-${t.id} ${profileState.theme === t.id ? "active" : ""}`;
      btn.innerHTML = `
        <span>${t.icon}</span>
        <b>${t.name}</b>
        <small>${t.desc}</small>
        <em>${profileState.theme === t.id ? "AKTİF" : "SEÇ"}</em>
      `;
      btn.addEventListener("click", () => {
        profileState.theme = t.id;
        applyTheme(t.id);
        saveProfileState();
        renderThemeGrid();
        playSound("click");
      });
      grid.appendChild(btn);
    });
  };

  openProfileOverlay = function(){
    const overlay = $("profileOverlay");
    if(!overlay) return;
    if($("profileNameInput")) $("profileNameInput").value = profileState.name || "";
    renderProfileStats();
    updateDailyRewardUI();
    overlay.classList.remove("hidden");
    requestAnimationFrame(() => overlay.classList.add("show"));
    playSound("click");
  };

  function adjustChatPanelLayout(){
    const chat = $("chatPanel");
    const activity = $("activityPanel");
    const left = $("leftPlayerPanel");
    if(!chat || !activity || !left) return;

    const game = $("game");
    if(!game || game.classList.contains("hidden")) return;

    if(window.innerWidth > 950){
      const activityBottom = activity.offsetTop + activity.offsetHeight;
      const leftTop = left.offsetTop;
      const available = Math.max(150, leftTop - activityBottom - 24);

      chat.style.left = activity.offsetLeft + "px";
      chat.style.top = (activityBottom + 12) + "px";
      chat.style.width = activity.offsetWidth + "px";
      chat.style.maxHeight = available + "px";

      const messages = $("chatMessages");
      if(messages){
        messages.style.height = Math.max(78, available - 92) + "px";
      }
    }
  }

  const _showScreenV47 = showScreen;
  showScreen = function(name){
    _showScreenV47(name);
    setTimeout(adjustChatPanelLayout, 150);
    setTimeout(adjustChatPanelLayout, 500);
  };

  window.addEventListener("resize", () => setTimeout(adjustChatPanelLayout, 120));

  setTimeout(() => {
    applyTheme(profileState.theme || "classic");
    adjustChatPanelLayout();
  }, 300);



  /* ===== V47.1 THEME BUTTON + CHAT POSITION HOTFIX ===== */

  function openThemesOverlayFixed(){
    let overlay = $("themesOverlay");

    if(!overlay){
      overlay = document.createElement("div");
      overlay.id = "themesOverlay";
      overlay.className = "profile-overlay hidden";
      overlay.innerHTML = `
        <div class="profile-card themes-only-card">
          <button id="closeThemesBtn" class="profile-close">×</button>
          <div class="profile-small">BARUTPOLY TEMA MAĞAZASI</div>
          <h2>Temalar</h2>
          <p class="theme-page-desc">Bir tema seçtiğinde menü, tahta, paneller ve buton renkleri değişir.</p>
          <div id="themeGrid" class="theme-grid theme-grid-large"></div>
        </div>
      `;
      document.body.appendChild(overlay);
      $("closeThemesBtn")?.addEventListener("click", closeThemesOverlayFixed);
      overlay.addEventListener("click", (e) => { if(e.target === overlay) closeThemesOverlayFixed(); });
    }

    renderThemeGridFixed();
    overlay.classList.remove("hidden");
    requestAnimationFrame(() => overlay.classList.add("show"));
    playSound("click");
  }

  function closeThemesOverlayFixed(){
    const overlay = $("themesOverlay");
    if(!overlay) return;
    overlay.classList.remove("show");
    setTimeout(() => overlay.classList.add("hidden"), 220);
    playSound("click");
  }

  function renderThemeGridFixed(){
    const grid = $("themeGrid");
    if(!grid) return;

    const themeList = typeof V46_THEMES !== "undefined" ? V46_THEMES : [
      {id:"classic", name:"Klasik", icon:"👑", desc:"Orijinal"},
      {id:"dark", name:"Gece", icon:"🌙", desc:"Koyu neon"},
      {id:"gold", name:"Altın", icon:"🏆", desc:"Premium"},
      {id:"istanbul", name:"İstanbul", icon:"🌉", desc:"Mavi şehir"},
      {id:"forest", name:"Orman", icon:"🌲", desc:"Yeşil"},
      {id:"fire", name:"Alev", icon:"🔥", desc:"Kırmızı"}
    ];

    grid.innerHTML = "";

    themeList.forEach(t => {
      const btn = document.createElement("button");
      btn.className = `theme-card theme-${t.id} ${document.body.dataset.theme === t.id ? "active" : ""}`;
      btn.innerHTML = `
        <span>${t.icon}</span>
        <b>${t.name}</b>
        <small>${t.desc}</small>
        <em>${document.body.dataset.theme === t.id ? "AKTİF" : "SEÇ"}</em>
      `;

      btn.addEventListener("click", () => {
        try{
          profileState.theme = t.id;
          localStorage.setItem("barutpolyTheme", t.id);
          saveProfileState?.();
        }catch(e){}

        document.body.dataset.theme = t.id;
        document.documentElement.dataset.theme = t.id;

        if(typeof applyTheme === "function"){
          try{ applyTheme(t.id); }catch(e){}
        }

        renderThemeGridFixed();
        showFinalToast?.(`${t.name} teması aktif.`, "ok");
        playSound("click");
      });

      grid.appendChild(btn);
    });
  }

  function positionChatExactlyAbovePlayerArea(){
    const chat = $("chatPanel");
    const left = $("leftPlayerPanel");
    if(!chat || !left) return;

    if(window.innerWidth <= 950){
      return;
    }

    const gap = 12;
    const targetHeight = 220;
    const leftTop = left.offsetTop;
    const chatTop = Math.max(16, leftTop - targetHeight - gap);

    chat.style.left = left.offsetLeft + "px";
    chat.style.width = left.offsetWidth + "px";
    chat.style.top = chatTop + "px";
    chat.style.maxHeight = targetHeight + "px";

    const messages = $("chatMessages");
    if(messages){
      messages.style.height = "128px";
      messages.style.maxHeight = "128px";
    }
  }

  // Eski hizalamayı override et
  adjustChatPanelLayout = positionChatExactlyAbovePlayerArea;

  setTimeout(() => {
    $("themesBtn")?.addEventListener("click", openThemesOverlayFixed);
    $("closeThemesBtn")?.addEventListener("click", closeThemesOverlayFixed);
    $("themesOverlay")?.addEventListener("click", (e) => { if(e.target === $("themesOverlay")) closeThemesOverlayFixed(); });
    positionChatExactlyAbovePlayerArea();
  }, 400);

  window.addEventListener("resize", () => setTimeout(positionChatExactlyAbovePlayerArea, 120));

  const _showScreenV471 = showScreen;
  showScreen = function(name){
    _showScreenV471(name);
    setTimeout(positionChatExactlyAbovePlayerArea, 120);
    setTimeout(positionChatExactlyAbovePlayerArea, 500);
  };



  /* ===== V47.2 FINAL PROFILE + THEME FIX ===== */

  const V472_THEME_LIST = [
    {id:"classic", name:"Klasik", icon:"👑", desc:"Mor + altın orijinal"},
    {id:"night", name:"Neon Gece", icon:"🌙", desc:"Mavi neon karanlık"},
    {id:"royal", name:"Kraliyet", icon:"🏆", desc:"Altın premium"},
    {id:"sea", name:"Boğaz", icon:"🌉", desc:"İstanbul mavi"},
    {id:"emerald", name:"Zümrüt", icon:"🌲", desc:"Yeşil lüks"},
    {id:"volcano", name:"Volkan", icon:"🔥", desc:"Kırmızı ateş"}
  ];

  function forceProfileOnly(){
    const profile = $("profileOverlay");
    if(!profile) return;
    profile.querySelectorAll(".theme-section, #themeGrid, .theme-page-desc").forEach(el => {
      const parentCard = el.closest(".profile-card");
      if(parentCard && parentCard.classList.contains("profile-only-card")){
        el.remove();
      }
    });
    const h2 = profile.querySelector("h2");
    if(h2) h2.textContent = "Profil";
  }

  function setThemeHard(themeId){
    const normalized = {
      dark:"night",
      gold:"royal",
      istanbul:"sea",
      forest:"emerald",
      fire:"volcano"
    }[themeId] || themeId || "classic";

    profileState.theme = normalized;
    localStorage.setItem("barutpolyTheme", normalized);
    try{ saveProfileState?.(); }catch(e){}

    document.body.dataset.theme = normalized;
    document.documentElement.dataset.theme = normalized;

    showFinalToast?.(`${(V472_THEME_LIST.find(t=>t.id===normalized)||{}).name || "Tema"} aktif.`, "ok");
  }

  applyTheme = function(themeId=profileState.theme){
    setThemeHard(themeId);
  };

  renderThemeGrid = function(){
    const grid = $("themeGrid");
    if(!grid) return;
    grid.innerHTML = "";

    V472_THEME_LIST.forEach(t => {
      const active = (document.body.dataset.theme || profileState.theme || "classic") === t.id;
      const card = document.createElement("button");
      card.type = "button";
      card.className = `theme-card theme-${t.id} ${active ? "active" : ""}`;
      card.innerHTML = `
        <div class="theme-preview ${t.id}">
          <i></i><i></i><i></i>
        </div>
        <span>${t.icon}</span>
        <b>${t.name}</b>
        <small>${t.desc}</small>
        <em>${active ? "AKTİF" : "SEÇ"}</em>
      `;
      card.addEventListener("click", () => {
        setThemeHard(t.id);
        renderThemeGrid();
        playSound("click");
      });
      grid.appendChild(card);
    });
  };

  openProfileOverlay = function(){
    forceProfileOnly();
    const overlay = $("profileOverlay");
    if(!overlay) return;
    if($("profileNameInput")) $("profileNameInput").value = profileState.name || "";
    renderProfileStats?.();
    updateDailyRewardUI?.();
    overlay.classList.remove("hidden");
    requestAnimationFrame(() => overlay.classList.add("show"));
    playSound("click");
  };

  function closeProfileOverlayFinal(){
    const overlay = $("profileOverlay");
    if(!overlay) return;
    overlay.classList.remove("show");
    setTimeout(() => overlay.classList.add("hidden"), 220);
    playSound("click");
  }

  function openThemesOverlayFinal(){
    const overlay = $("themesOverlay");
    if(!overlay) return;
    renderThemeGrid();
    overlay.classList.remove("hidden");
    requestAnimationFrame(() => overlay.classList.add("show"));
    playSound("click");
  }

  function closeThemesOverlayFinal(){
    const overlay = $("themesOverlay");
    if(!overlay) return;
    overlay.classList.remove("show");
    setTimeout(() => overlay.classList.add("hidden"), 220);
    playSound("click");
  }

  // Eventleri direkt bağla, eski bozuk bağlar varsa üstüne yazar.
  setTimeout(() => {
    forceProfileOnly();
    setThemeHard(localStorage.getItem("barutpolyTheme") || profileState.theme || "classic");

    const profileBtn = $("profileBtn");
    const themesBtn = $("themesBtn");
    const closeProfile = $("closeProfileBtn");
    const closeThemes = $("closeThemesBtn");
    const profileOverlay = $("profileOverlay");
    const themesOverlay = $("themesOverlay");

    if(profileBtn) profileBtn.onclick = openProfileOverlay;
    if(themesBtn) themesBtn.onclick = openThemesOverlayFinal;
    if(closeProfile) closeProfile.onclick = closeProfileOverlayFinal;
    if(closeThemes) closeThemes.onclick = closeThemesOverlayFinal;

    if(profileOverlay){
      profileOverlay.onclick = (e) => { if(e.target === profileOverlay) closeProfileOverlayFinal(); };
    }
    if(themesOverlay){
      themesOverlay.onclick = (e) => { if(e.target === themesOverlay) closeThemesOverlayFinal(); };
    }
  }, 350);



  /* ===== V48-52 FINAL FAMILY PACK =====
     V48 Takas
     V49 İflas + Kazanma
     V50 Save / Continue
     V51 Premium animasyon + ayarlar
     V52 Bot AI 2.0 + profil level
  */

  const FAMILY_VERSION = "BarutPoly 1.0 Family";
  const SAVE_KEY_FINAL = "barutpolyFamilySaveV1";
  const SETTINGS_KEY_FINAL = "barutpolyFamilySettings";

  const finalSettings = JSON.parse(localStorage.getItem(SETTINGS_KEY_FINAL) || '{"sfx":true,"music":true,"animations":true,"perf":false}');

  function saveFinalSettings(){
    finalSettings.sfx = !!$("settingSfx")?.checked;
    finalSettings.music = !!$("settingMusic")?.checked;
    finalSettings.animations = !!$("settingAnimations")?.checked;
    finalSettings.perf = !!$("settingPerf")?.checked;
    localStorage.setItem(SETTINGS_KEY_FINAL, JSON.stringify(finalSettings));
    applyFinalSettings();
    showFinalToast?.("Ayarlar kaydedildi.", "ok");
  }

  function applyFinalSettings(){
    document.body.classList.toggle("no-animations", !finalSettings.animations);
    document.body.classList.toggle("performance-mode", !!finalSettings.perf);
    try{
      Object.values(sounds || {}).forEach(a => {
        if(a) a.muted = !finalSettings.sfx;
      });
      if(typeof musicAudio !== "undefined" && musicAudio){
        musicAudio.muted = !finalSettings.music;
      }
    }catch(e){}
  }

  function openFinalSettings(){
    const overlay = $("finalSettingsOverlay");
    if(!overlay) return;
    if($("settingSfx")) $("settingSfx").checked = finalSettings.sfx;
    if($("settingMusic")) $("settingMusic").checked = finalSettings.music;
    if($("settingAnimations")) $("settingAnimations").checked = finalSettings.animations;
    if($("settingPerf")) $("settingPerf").checked = finalSettings.perf;
    overlay.classList.remove("hidden");
    requestAnimationFrame(() => overlay.classList.add("show"));
  }

  function closeFinalSettings(){
    const overlay = $("finalSettingsOverlay");
    if(!overlay) return;
    overlay.classList.remove("show");
    setTimeout(() => overlay.classList.add("hidden"), 220);
  }

  // Existing settings button now opens final settings too.
  const _openSettingsVFinal = typeof openSettings === "function" ? openSettings : null;
  openSettings = function(){
    openFinalSettings();
  };

  function saveCurrentGameFinal(){
    if(!players || !players.length || $("game")?.classList.contains("hidden")) return;
    try{
      const save = {
        version:FAMILY_VERSION,
        createdAt:Date.now(),
        players:players.map(p => ({
          id:p.id,
          name:p.name,
          character:p.character,
          host:!!p.host,
          money:p.money,
          position:p.position,
          owned:p.owned || [],
          housesAvailable:p.housesAvailable ?? 12,
          hotelsAvailable:p.hotelsAvailable ?? 4,
          jailTurns:p.jailTurns || 0,
          bankrupt:!!p.bankrupt,
          isBot:!!p.isBot,
          className:p.className
        })),
        activePlayerIndex,
        hasRolledThisTurn,
        canEndTurn,
        activityLog:activityLog || [],
        buildState: typeof collectBuildState === "function" ? collectBuildState() : {}
      };
      localStorage.setItem(SAVE_KEY_FINAL, JSON.stringify(save));
      $("continueSaveBtn")?.classList.remove("hidden");
    }catch(err){
      console.warn("save hata", err);
    }
  }

  function hasSaveFinal(){
    return !!localStorage.getItem(SAVE_KEY_FINAL);
  }

  function updateContinueButtonFinal(){
    const btn = $("continueSaveBtn");
    if(!btn) return;
    btn.classList.toggle("hidden", !hasSaveFinal());
  }

  function continueSavedGameFinal(){
    const raw = localStorage.getItem(SAVE_KEY_FINAL);
    if(!raw){
      showFinalToast?.("Kayıtlı oyun yok.", "warn");
      return;
    }
    try{
      const save = JSON.parse(raw);
      players = (save.players || []).map((p,i) => ({
        ...p,
        className:p.className || `p${i+1}`,
        owned:Array.isArray(p.owned) ? p.owned : []
      }));
      activePlayerIndex = save.activePlayerIndex || 0;
      hasRolledThisTurn = !!save.hasRolledThisTurn;
      canEndTurn = !!save.canEndTurn;
      activityLog = save.activityLog || [];

      isOnlineGame = false;
      showScreen("game");
      setTimeout(() => {
        createBoard?.();
        createTokens?.();
        if(save.buildState && typeof applyBuildState === "function") applyBuildState(save.buildState);
        refreshTileOwnership?.();
        renderPlayers?.();
        renderLeftPlayerPanel?.();
        updatePanel?.();
        updateTurnButtons?.();
        updateTokens?.();
        showFinalToast?.("Kayıtlı oyun yüklendi.", "ok");
      }, 100);
    }catch(err){
      showFinalToast?.("Kayıt yüklenemedi.", "warn");
      console.error(err);
    }
  }

  setInterval(saveCurrentGameFinal, 15000);
  setTimeout(updateContinueButtonFinal, 500);

  // Takas Sistemi
  function openTradeOverlay(){
    if(!players?.length) return showFinalToast?.("Önce oyun başlat.", "warn");

    const overlay = $("tradeOverlay");
    if(!overlay) return;

    const from = $("tradeFromPlayer");
    const to = $("tradeToPlayer");
    const prop = $("tradePropertySelect");

    [from,to,prop].forEach(el => { if(el) el.innerHTML = ""; });

    players.forEach((p,i) => {
      const o1 = document.createElement("option");
      o1.value = i;
      o1.textContent = p.name;
      from?.appendChild(o1);

      const o2 = document.createElement("option");
      o2.value = i;
      o2.textContent = p.name;
      to?.appendChild(o2);
    });

    function refreshProps(){
      const pi = Number(from.value || 0);
      prop.innerHTML = "";
      (players[pi]?.owned || []).forEach(idx => {
        const o = document.createElement("option");
        o.value = idx;
        o.textContent = boardSpaces[idx]?.n || ("Mülk " + idx);
        prop.appendChild(o);
      });
      if(!prop.children.length){
        const o = document.createElement("option");
        o.value = "";
        o.textContent = "Mülk yok";
        prop.appendChild(o);
      }
    }

    from.onchange = refreshProps;
    refreshProps();

    overlay.classList.remove("hidden");
    requestAnimationFrame(() => overlay.classList.add("show"));
    playSound("click");
  }

  function closeTradeOverlay(){
    const overlay = $("tradeOverlay");
    if(!overlay) return;
    overlay.classList.remove("show");
    setTimeout(() => overlay.classList.add("hidden"), 220);
  }

  async function confirmTradeFinal(){
    const fromIndex = Number($("tradeFromPlayer")?.value || 0);
    const toIndex = Number($("tradeToPlayer")?.value || 0);
    const propIndexRaw = $("tradePropertySelect")?.value;
    const money = Math.max(0, Number($("tradeMoneyInput")?.value || 0));

    if(fromIndex === toIndex){
      return showFinalToast?.("Aynı oyuncuyla takas olmaz.", "warn");
    }

    const fromP = players[fromIndex];
    const toP = players[toIndex];
    if(!fromP || !toP) return;

    if(money > 0){
      if(toP.money < money) return showFinalToast?.("Alıcıda yeterli para yok.", "warn");
      toP.money -= money;
      fromP.money += money;
    }

    if(propIndexRaw !== ""){
      const propIndex = Number(propIndexRaw);
      if(!fromP.owned.includes(propIndex)) return showFinalToast?.("Bu mülk seçilen oyuncuda değil.", "warn");
      fromP.owned = fromP.owned.filter(i => i !== propIndex);
      toP.owned.push(propIndex);
    }

    addActivity?.(`🤝 ${fromP.name} ile ${toP.name} takas yaptı.`);
    refreshTileOwnership?.();
    renderPlayers?.();
    updatePanel?.();
    renderLeftPlayerPanel?.();
    saveCurrentGameFinal();
    if(isOnlineGame && typeof saveOnlineFullState === "function"){
      await saveOnlineFullState("Takas yapıldı.");
    }
    closeTradeOverlay();
    showFinalToast?.("Takas tamamlandı.", "ok");
  }

  // Player panel button insert
  function ensureTradeButtonFinal(){
    if($("tradeBtn")) return;
    const side = $("sidePanel");
    const ref = $("myPropertiesBtn") || $("gameSettingsBtn");
    if(!side || !ref) return;
    const btn = document.createElement("button");
    btn.id = "tradeBtn";
    btn.className = "panel-btn trade-btn-final";
    btn.textContent = "🤝 Takas";
    ref.insertAdjacentElement("afterend", btn);
    btn.addEventListener("click", openTradeOverlay);
  }

  const _showScreenFinal = showScreen;
  showScreen = function(name){
    _showScreenFinal(name);
    if(name === "game"){
      setTimeout(ensureTradeButtonFinal, 200);
      setTimeout(saveCurrentGameFinal, 1000);
    }
  };

  // İflas + kazanan final ekranı
  function checkBankruptcyAndWinnerFinal(){
    if(!players?.length) return;
    let changed = false;
    players.forEach(p => {
      if(!p.bankrupt && p.money < 0){
        p.bankrupt = true;
        addActivity?.(`💀 ${p.name} iflas etti.`);
        changed = true;
      }
    });

    const alive = players.filter(p => !p.bankrupt);
    if(alive.length === 1 && players.length > 1){
      showFamilyWinnerFinal(alive[0]);
      changed = true;
    }
    if(changed) saveCurrentGameFinal();
  }

  function showFamilyWinnerFinal(winner){
    if($("familyWinnerOverlay")) return;
    const overlay = document.createElement("div");
    overlay.id = "familyWinnerOverlay";
    overlay.className = "online-winner-overlay show";
    const totalValue = (winner.owned || []).reduce((s,i)=>s+getSpacePurchasePrice(boardSpaces[i]),0) + winner.money;
    overlay.innerHTML = `
      <div class="online-winner-card family-winner-card">
        <div class="online-winner-cup">🏆</div>
        <h2>${escapeHTML(winner.name)} Kazandı!</h2>
        <p>Toplam değer: <b>${totalValue} TL</b></p>
        <div class="winner-mini-stats">
          <div><b>${winner.money}</b><span>Para</span></div>
          <div><b>${(winner.owned||[]).length}</b><span>Mülk</span></div>
          <div><b>${formatTime?.(Math.floor((Date.now() - (gameStartedAt || Date.now()))/1000)) || "-"}</b><span>Süre</span></div>
        </div>
        <button id="familyWinnerMenuBtn">Ana Menüye Dön</button>
      </div>
    `;
    document.body.appendChild(overlay);
    try{ spawnFinalConfetti?.(); }catch(e){}
    try{ playSound("win"); }catch(e){}
    $("familyWinnerMenuBtn")?.addEventListener("click", () => {
      overlay.remove();
      localStorage.removeItem(SAVE_KEY_FINAL);
      updateContinueButtonFinal();
      showScreen("menu");
    });
  }

  // Finish turn ve save noktaları
  const _finishTurnFamily = finishTurn;
  finishTurn = async function(){
    const r = await _finishTurnFamily();
    checkBankruptcyAndWinnerFinal();
    saveCurrentGameFinal();
    return r;
  };

  const _buyCurrentSpaceFamily = buyCurrentSpace;
  buyCurrentSpace = function(){
    const r = _buyCurrentSpaceFamily();
    saveCurrentGameFinal();
    return r;
  };

  const _payPendingRentFamily = payPendingRent;
  payPendingRent = function(){
    const r = _payPendingRentFamily();
    checkBankruptcyAndWinnerFinal();
    saveCurrentGameFinal();
    return r;
  };

  // Bot AI 2.0 basit güçlendirme
  if(typeof botShouldBuy === "function"){
    botShouldBuy = function(bot, space, price){
      const ownedCount = bot.owned?.length || 0;
      if(bot.money < price + 250) return false;
      if(price <= 180) return true;
      if(ownedCount < 3 && bot.money > price + 400) return true;
      if(space?.color && bot.owned?.some(i => boardSpaces[i]?.color === space.color)) return true;
      return bot.money > price * 2;
    };
  }

  // Profil level / XP
  function getProfileLevelFinal(){
    const xp = Number(localStorage.getItem("barutpolyXP") || 0);
    return Math.max(1, Math.floor(xp / 500) + 1);
  }

  function addXPFinal(amount){
    const xp = Number(localStorage.getItem("barutpolyXP") || 0) + amount;
    localStorage.setItem("barutpolyXP", String(xp));
  }

  const _renderProfileStatsFamily = renderProfileStats;
  renderProfileStats = function(){
    _renderProfileStatsFamily();
    const holder = $("profileStats");
    if(holder && !holder.querySelector(".level-stat")){
      const div = document.createElement("div");
      div.className = "level-stat";
      div.innerHTML = `<b>Lv.${getProfileLevelFinal()}</b><span>Seviye</span>`;
      holder.prepend(div);
    }
  };


  /* ===== V53 MULTILANGUAGE SETTINGS ===== */

  const BP_LANG_KEY = "barutpolyLanguage";
  const BP_SUPPORTED_LANGS = ["tr","en","ru","de","fr","es","it","ar"];

  const BP_I18N = {
    tr:{
      play:"OYUNA BAŞLA", continueGame:"KAYITLI OYUNA DEVAM ET", online:"ONLINE OYNA", settings:"AYARLAR", howTo:"NASIL OYNANIR?", profile:"PROFİL", themes:"TEMALAR",
      settingsSmall:"BARUTPOLY AYARLAR", settingsTitle:"Ayarlar", sfx:"🔊 Ses Efektleri", music:"🎵 Arka Plan Müziği", animations:"✨ Animasyonlar", performance:"⚡ Performans Modu", language:"🌐 Dil", saveSettings:"Ayarları Kaydet",
      ready:"Hazırım", startGame:"Oyunu Başlat", back:"Geri Dön", exitGame:"🚪 Oyundan Çık", dailyReward:"🎁 Günlük Ödül", profileTitle:"Profil", themesTitle:"Temalar",
      roll:"🎲 Zar At", endTurn:"✅ Turunu Bitir", properties:"⌂ Mülklerim", cards:"▣ Kartlar", saveToast:"Dil değiştirildi."
    },
    en:{
      play:"PLAY", continueGame:"CONTINUE SAVED GAME", online:"PLAY ONLINE", settings:"SETTINGS", howTo:"HOW TO PLAY?", profile:"PROFILE", themes:"THEMES",
      settingsSmall:"BARUTPOLY SETTINGS", settingsTitle:"Settings", sfx:"🔊 Sound Effects", music:"🎵 Background Music", animations:"✨ Animations", performance:"⚡ Performance Mode", language:"🌐 Language", saveSettings:"Save Settings",
      ready:"Ready", startGame:"Start Game", back:"Back", exitGame:"🚪 Exit Game", dailyReward:"🎁 Daily Reward", profileTitle:"Profile", themesTitle:"Themes",
      roll:"🎲 Roll Dice", endTurn:"✅ End Turn", properties:"⌂ My Properties", cards:"▣ Cards", saveToast:"Language changed."
    },
    ru:{
      play:"ИГРАТЬ", continueGame:"ПРОДОЛЖИТЬ ИГРУ", online:"ОНЛАЙН ИГРА", settings:"НАСТРОЙКИ", howTo:"КАК ИГРАТЬ?", profile:"ПРОФИЛЬ", themes:"ТЕМЫ",
      settingsSmall:"НАСТРОЙКИ BARUTPOLY", settingsTitle:"Настройки", sfx:"🔊 Звуковые эффекты", music:"🎵 Фоновая музыка", animations:"✨ Анимации", performance:"⚡ Режим производительности", language:"🌐 Язык", saveSettings:"Сохранить",
      ready:"Готов", startGame:"Начать игру", back:"Назад", exitGame:"🚪 Выйти", dailyReward:"🎁 Ежедневная награда", profileTitle:"Профиль", themesTitle:"Темы",
      roll:"🎲 Бросить кубики", endTurn:"✅ Завершить ход", properties:"⌂ Мои владения", cards:"▣ Карты", saveToast:"Язык изменён."
    },
    de:{
      play:"SPIELEN", continueGame:"GESPEICHERTES SPIEL", online:"ONLINE SPIELEN", settings:"EINSTELLUNGEN", howTo:"WIE SPIELT MAN?", profile:"PROFIL", themes:"THEMEN",
      settingsSmall:"BARUTPOLY EINSTELLUNGEN", settingsTitle:"Einstellungen", sfx:"🔊 Soundeffekte", music:"🎵 Hintergrundmusik", animations:"✨ Animationen", performance:"⚡ Leistungsmodus", language:"🌐 Sprache", saveSettings:"Speichern",
      ready:"Bereit", startGame:"Spiel starten", back:"Zurück", exitGame:"🚪 Spiel verlassen", dailyReward:"🎁 Tägliche Belohnung", profileTitle:"Profil", themesTitle:"Themen",
      roll:"🎲 Würfeln", endTurn:"✅ Zug beenden", properties:"⌂ Meine Grundstücke", cards:"▣ Karten", saveToast:"Sprache geändert."
    },
    fr:{
      play:"JOUER", continueGame:"CONTINUER", online:"JOUER EN LIGNE", settings:"PARAMÈTRES", howTo:"COMMENT JOUER ?", profile:"PROFIL", themes:"THÈMES",
      settingsSmall:"PARAMÈTRES BARUTPOLY", settingsTitle:"Paramètres", sfx:"🔊 Effets sonores", music:"🎵 Musique", animations:"✨ Animations", performance:"⚡ Mode performance", language:"🌐 Langue", saveSettings:"Enregistrer",
      ready:"Prêt", startGame:"Démarrer", back:"Retour", exitGame:"🚪 Quitter", dailyReward:"🎁 Récompense quotidienne", profileTitle:"Profil", themesTitle:"Thèmes",
      roll:"🎲 Lancer", endTurn:"✅ Fin du tour", properties:"⌂ Mes propriétés", cards:"▣ Cartes", saveToast:"Langue changée."
    },
    es:{
      play:"JUGAR", continueGame:"CONTINUAR PARTIDA", online:"JUGAR ONLINE", settings:"AJUSTES", howTo:"¿CÓMO JUGAR?", profile:"PERFIL", themes:"TEMAS",
      settingsSmall:"AJUSTES BARUTPOLY", settingsTitle:"Ajustes", sfx:"🔊 Efectos de sonido", music:"🎵 Música", animations:"✨ Animaciones", performance:"⚡ Modo rendimiento", language:"🌐 Idioma", saveSettings:"Guardar",
      ready:"Listo", startGame:"Iniciar juego", back:"Volver", exitGame:"🚪 Salir", dailyReward:"🎁 Recompensa diaria", profileTitle:"Perfil", themesTitle:"Temas",
      roll:"🎲 Tirar dados", endTurn:"✅ Terminar turno", properties:"⌂ Mis propiedades", cards:"▣ Cartas", saveToast:"Idioma cambiado."
    },
    it:{
      play:"GIOCA", continueGame:"CONTINUA PARTITA", online:"GIOCA ONLINE", settings:"IMPOSTAZIONI", howTo:"COME SI GIOCA?", profile:"PROFILO", themes:"TEMI",
      settingsSmall:"IMPOSTAZIONI BARUTPOLY", settingsTitle:"Impostazioni", sfx:"🔊 Effetti sonori", music:"🎵 Musica", animations:"✨ Animazioni", performance:"⚡ Modalità prestazioni", language:"🌐 Lingua", saveSettings:"Salva",
      ready:"Pronto", startGame:"Inizia gioco", back:"Indietro", exitGame:"🚪 Esci", dailyReward:"🎁 Premio giornaliero", profileTitle:"Profilo", themesTitle:"Temi",
      roll:"🎲 Lancia dadi", endTurn:"✅ Fine turno", properties:"⌂ Le mie proprietà", cards:"▣ Carte", saveToast:"Lingua cambiata."
    },
    ar:{
      play:"ابدأ اللعب", continueGame:"متابعة اللعبة", online:"اللعب أونلاين", settings:"الإعدادات", howTo:"طريقة اللعب", profile:"الملف الشخصي", themes:"الثيمات",
      settingsSmall:"إعدادات BARUTPOLY", settingsTitle:"الإعدادات", sfx:"🔊 المؤثرات الصوتية", music:"🎵 موسيقى الخلفية", animations:"✨ الحركات", performance:"⚡ وضع الأداء", language:"🌐 اللغة", saveSettings:"حفظ الإعدادات",
      ready:"جاهز", startGame:"ابدأ اللعبة", back:"رجوع", exitGame:"🚪 خروج", dailyReward:"🎁 المكافأة اليومية", profileTitle:"الملف الشخصي", themesTitle:"الثيمات",
      roll:"🎲 ارمي النرد", endTurn:"✅ إنهاء الدور", properties:"⌂ ممتلكاتي", cards:"▣ البطاقات", saveToast:"تم تغيير اللغة."
    }
  };

  function getLang(){
    const saved = localStorage.getItem(BP_LANG_KEY) || "tr";
    return BP_SUPPORTED_LANGS.includes(saved) ? saved : "tr";
  }

  function t(key){
    const lang = getLang();
    return BP_I18N[lang]?.[key] || BP_I18N.tr[key] || key;
  }

  function setLang(lang){
    if(!BP_SUPPORTED_LANGS.includes(lang)) lang = "tr";
    localStorage.setItem(BP_LANG_KEY, lang);
    applyLanguage();
    showFinalToast?.(t("saveToast"), "ok");
  }

  function setButtonText(id, value){
    const el = $(id);
    if(!el) return;
    const b = el.querySelector("b");
    if(b) b.textContent = value;
    else el.textContent = value;
  }

  function applyLanguage(){
    const lang = getLang();
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.body.classList.toggle("rtl-ui", lang === "ar");

    setButtonText("startBtn", t("play"));
    setButtonText("continueSaveBtn", t("continueGame"));
    setButtonText("onlineBtn", t("online"));
    setButtonText("settingsBtn", t("settings"));
    setButtonText("howToBtn", t("howTo"));
    setButtonText("profileBtn", t("profile"));
    setButtonText("themesBtn", t("themes"));

    if($("rollDiceBtn") && !isOnlineGame) $("rollDiceBtn").textContent = t("roll");
    if($("endTurnBtn") && !isOnlineGame) $("endTurnBtn").textContent = t("endTurn");
    if($("myPropertiesBtn")) $("myPropertiesBtn").textContent = t("properties");
    if($("cardsPanelBtn")) $("cardsPanelBtn").textContent = t("cards");
    if($("exitGameBtn")) $("exitGameBtn").textContent = t("exitGame");

    if($("onlineReadyBtn")) $("onlineReadyBtn").textContent = t("ready");
    if($("onlineStartGameBtn")) $("onlineStartGameBtn").textContent = t("startGame");
    if($("backCharacterLobbyBtn")) $("backCharacterLobbyBtn").textContent = t("back");

    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.dataset.i18n;
      el.textContent = t(key);
    });

    const prof = $("profileOverlay")?.querySelector("h2");
    if(prof) prof.textContent = t("profileTitle");
    const themes = $("themesOverlay")?.querySelector("h2");
    if(themes) themes.textContent = t("themesTitle");
    const reward = $("dailyRewardText");
    if(reward && !reward.dataset.locked) reward.textContent = t("dailyReward");

    document.querySelectorAll(".language-option").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.lang === lang);
    });
  }

  // Ayarlar açılırken dil seçeneklerini aktif göster.
  const _openFinalSettingsLang = typeof openFinalSettings === "function" ? openFinalSettings : null;
  openFinalSettings = function(){
    if(_openFinalSettingsLang) _openFinalSettingsLang();
    setTimeout(applyLanguage, 60);
  };

  setTimeout(() => {
    document.querySelectorAll(".language-option").forEach(btn => {
      btn.addEventListener("click", () => setLang(btn.dataset.lang));
    });
    applyLanguage();
  }, 500);



  /* ===== V54 PREMIUM SETTINGS TABS ===== */

  const BP_PREMIUM_SETTINGS_KEY = "barutpolyPremiumSettingsV54";
  const bpPremiumSettings = JSON.parse(localStorage.getItem(BP_PREMIUM_SETTINGS_KEY) || '{"sfx":true,"music":true,"animations":true,"perf":false,"animSfx":true,"musicVolume":50,"sfxVolume":75}');

  function savePremiumSettings(){
    bpPremiumSettings.sfx = !!$("settingSfx")?.checked;
    bpPremiumSettings.music = !!$("settingMusic")?.checked;
    bpPremiumSettings.animations = !!$("settingAnimations")?.checked;
    bpPremiumSettings.perf = !!$("settingPerf")?.checked;
    bpPremiumSettings.animSfx = !!$("settingAnimSfx")?.checked;
    bpPremiumSettings.musicVolume = Number($("settingMusicVolume")?.value || 50);
    bpPremiumSettings.sfxVolume = Number($("settingSfxVolume")?.value || 75);
    localStorage.setItem(BP_PREMIUM_SETTINGS_KEY, JSON.stringify(bpPremiumSettings));
    applyPremiumSettings();
    showFinalToast?.("Ayarlar kaydedildi.", "ok");
  }

  function applyPremiumSettings(){
    document.body.classList.toggle("no-animations", !bpPremiumSettings.animations);
    document.body.classList.toggle("performance-mode", !!bpPremiumSettings.perf);

    const musicVol = Math.max(0, Math.min(100, bpPremiumSettings.musicVolume)) / 100;
    const sfxVol = Math.max(0, Math.min(100, bpPremiumSettings.sfxVolume)) / 100;

    try{
      Object.values(sfx || {}).forEach(a => {
        if(!a) return;
        a.muted = !bpPremiumSettings.sfx;
        a.volume = sfxVol * (a === sfx.step ? 0.45 : 0.75);
      });
    }catch(e){}

    try{
      const musicAudio = $("musicAudio");
      if(musicAudio){
        musicAudio.muted = !bpPremiumSettings.music;
        musicAudio.volume = musicVol * 0.45;
      }
    }catch(e){}

    if($("musicVolumeLabel")) $("musicVolumeLabel").textContent = `${bpPremiumSettings.musicVolume}%`;
    if($("sfxVolumeLabel")) $("sfxVolumeLabel").textContent = `${bpPremiumSettings.sfxVolume}%`;
  }

  function syncPremiumSettingsUI(){
    if($("settingSfx")) $("settingSfx").checked = !!bpPremiumSettings.sfx;
    if($("settingMusic")) $("settingMusic").checked = !!bpPremiumSettings.music;
    if($("settingAnimations")) $("settingAnimations").checked = !!bpPremiumSettings.animations;
    if($("settingPerf")) $("settingPerf").checked = !!bpPremiumSettings.perf;
    if($("settingAnimSfx")) $("settingAnimSfx").checked = !!bpPremiumSettings.animSfx;
    if($("settingMusicVolume")) $("settingMusicVolume").value = bpPremiumSettings.musicVolume;
    if($("settingSfxVolume")) $("settingSfxVolume").value = bpPremiumSettings.sfxVolume;
    applyPremiumSettings();
  }

  function showSettingsTab(pageId){
    ["settingsHomePage","screenSettingsPageFinal","soundSettingsPageFinal","languageSettingsPageFinal"].forEach(id => {
      $(id)?.classList.toggle("active", id === pageId);
    });
  }

  openFinalSettings = function(){
    const overlay = $("finalSettingsOverlay");
    if(!overlay) return;
    syncPremiumSettingsUI();
    showSettingsTab("settingsHomePage");
    overlay.classList.remove("hidden");
    requestAnimationFrame(() => overlay.classList.add("show"));
    playSound("click");
  };

  closeFinalSettings = function(){
    const overlay = $("finalSettingsOverlay");
    if(!overlay) return;
    overlay.classList.remove("show");
    setTimeout(() => overlay.classList.add("hidden"), 220);
    playSound("click");
  };

  openSettings = openFinalSettings;

  function toggleFullScreenFromSettings(){
    try{
      if(!document.fullscreenElement){
        document.documentElement.requestFullscreen?.();
      }else{
        document.exitFullscreen?.();
      }
      showFinalToast?.("Tam ekran değiştirildi.", "ok");
    }catch(e){
      showFinalToast?.("Tam ekran desteklenmedi.", "warn");
    }
  }

  setTimeout(() => {
    $("openScreenSettingsBtn")?.addEventListener("click", () => showSettingsTab("screenSettingsPageFinal"));
    $("openSoundSettingsBtn")?.addEventListener("click", () => showSettingsTab("soundSettingsPageFinal"));
    $("openLanguageSettingsBtn")?.addEventListener("click", () => showSettingsTab("languageSettingsPageFinal"));
    document.querySelectorAll("[data-settings-back]").forEach(btn => btn.addEventListener("click", () => showSettingsTab("settingsHomePage")));

    $("fullscreenSettingsBtn")?.addEventListener("click", toggleFullScreenFromSettings);
    $("saveScreenSettingsBtn")?.addEventListener("click", savePremiumSettings);
    $("saveSoundSettingsBtn")?.addEventListener("click", savePremiumSettings);
    $("saveLanguageSettingsBtn")?.addEventListener("click", () => showFinalToast?.("Dil ayarları kaydedildi.", "ok"));

    $("settingMusicVolume")?.addEventListener("input", () => {
      bpPremiumSettings.musicVolume = Number($("settingMusicVolume").value || 50);
      applyPremiumSettings();
    });

    $("settingSfxVolume")?.addEventListener("input", () => {
      bpPremiumSettings.sfxVolume = Number($("settingSfxVolume").value || 75);
      applyPremiumSettings();
    });

    $("closeFinalSettingsBtn")?.addEventListener("click", closeFinalSettings);
    $("finalSettingsOverlay")?.addEventListener("click", (e) => { if(e.target === $("finalSettingsOverlay")) closeFinalSettings(); });

    applyPremiumSettings();
  }, 500);


  // Events
  setTimeout(() => {
    $("continueSaveBtn")?.addEventListener("click", continueSavedGameFinal);
    $("closeTradeBtn")?.addEventListener("click", closeTradeOverlay);
    $("confirmTradeBtn")?.addEventListener("click", confirmTradeFinal);
    $("closeFinalSettingsBtn")?.addEventListener("click", closeFinalSettings);
    $("saveFinalSettingsBtn")?.addEventListener("click", saveFinalSettings);
    $("tradeOverlay")?.addEventListener("click", (e) => { if(e.target === $("tradeOverlay")) closeTradeOverlay(); });
    $("finalSettingsOverlay")?.addEventListener("click", (e) => { if(e.target === $("finalSettingsOverlay")) closeFinalSettings(); });
    updateContinueButtonFinal();
    applyFinalSettings();
  }, 500);

  // Family ready toast
  setTimeout(() => showFinalToast?.("BarutPoly 1.0 Family hazır.", "ok", 3500), 1200);


  // Events

  $("howToBtn")?.addEventListener("click", openHowTo);
  $("closeHowToBtn")?.addEventListener("click", closeHowTo);
  $("backFromHowToBtn")?.addEventListener("click", closeHowTo);
  $("howToOverlay")?.addEventListener("click", (e) => { if(e.target === $("howToOverlay")) closeHowTo(); });

  $("startFromHowToBtn")?.addEventListener("click", () => {
    closeHowTo();
    selectedPlayerCount = 2;
    renderNameInputs();
    setTimeout(() => showScreen("setup"), 260);
  });


  $("myPropertiesBtn")?.addEventListener("click", () => openSideInfo("properties"));
  $("cardsPanelBtn")?.addEventListener("click", () => openSideInfo("cards"));
  $("closeSideInfoBtn")?.addEventListener("click", closeSideInfo);
  $("sideInfoOverlay")?.addEventListener("click", (e) => { if(e.target === $("sideInfoOverlay")) closeSideInfo(); });
  $("gameSettingsBtn")?.addEventListener("click", openSettings);


  $("stayJailBtn")?.addEventListener("click", chooseStayInJail);
  $("payBailBtn")?.addEventListener("click", choosePayBail);


  $("drawChanceBtn")?.addEventListener("click", drawChanceCard);
  $("closeChanceBtn")?.addEventListener("click", closeChance);
  $("chanceOverlay")?.addEventListener("click", (e) => { if(e.target === $("chanceOverlay")) closeChance(); });

  $("buildHouseBtn")?.addEventListener("click", () => setBuildMode("house"));
  $("buildHotelBtn")?.addEventListener("click", () => setBuildMode("hotel"));
  $("cancelBuildBtn")?.addEventListener("click", cancelBuildMode);


  $("winnerMenuBtn")?.addEventListener("click", () => {
    $("winnerOverlay")?.classList.remove("show");
    setTimeout(() => $("winnerOverlay")?.classList.add("hidden"), 250);
    showScreen("menu");
  });

  $("winnerRestartBtn")?.addEventListener("click", () => {
    $("winnerOverlay")?.classList.remove("show");
    setTimeout(() => $("winnerOverlay")?.classList.add("hidden"), 250);
    showScreen("setup");
  });


  $("bid10Btn")?.addEventListener("click", () => placeAuctionBid(10));
  $("bid50Btn")?.addEventListener("click", () => placeAuctionBid(50));
  $("passAuctionBtn")?.addEventListener("click", passAuction);
  $("closeAuctionBtn")?.addEventListener("click", () => closeAuction(false));
  $("auctionOverlay")?.addEventListener("click", (e) => { if(e.target === $("auctionOverlay")) closeAuction(false); });


  $("onlineBtn")?.addEventListener("click", openOnlineOverlay);
  $("closeOnlineBtn")?.addEventListener("click", closeOnlineOverlay);
  $("createRoomBtn")?.addEventListener("click", createOnlineRoom);
  $("showJoinRoomBtn")?.addEventListener("click", openJoinRoom);
  $("joinRoomBtn")?.addEventListener("click", joinOnlineRoom);
  $("backOnlineHomeBtn")?.addEventListener("click", () => showOnlinePage("onlineHome"));
  $("onlineReadyBtn")?.addEventListener("click", toggleOnlineReady);
  $("goCharacterSelectBtn")?.addEventListener("click", goCharacterSelect);
  $("backLobbyBtn")?.addEventListener("click", () => showOnlinePage("onlineLobby"));
  $("onlineStartGameBtn")?.addEventListener("click", onlineStartGameMock);
  $("backToLobbyFromPreparingBtn")?.addEventListener("click", () => showOnlinePage("onlineLobby"));
  $("onlineOverlay")?.addEventListener("click", (e) => { if(e.target === $("onlineOverlay")) closeOnlineOverlay(); });

  $("exitGameBtn")?.addEventListener("click", openExitGameOverlay);
  $("closeExitGameBtn")?.addEventListener("click", closeExitGameOverlay);
  $("cancelExitGameBtn")?.addEventListener("click", closeExitGameOverlay);
  $("confirmExitGameBtn")?.addEventListener("click", resetClassicGameAndGoMenu);
  $("exitGameOverlay")?.addEventListener("click", (e) => { if(e.target === $("exitGameOverlay")) closeExitGameOverlay(); });
  $("backCharacterLobbyBtn")?.addEventListener("click", backFromCharacterToLobby);

  $("profileBtn")?.addEventListener("click", openProfileOverlay);
  $("themesBtn")?.addEventListener("click", openThemesOverlay);
  $("closeThemesBtn")?.addEventListener("click", closeThemesOverlay);
  $("themesOverlay")?.addEventListener("click", (e) => { if(e.target === $("themesOverlay")) closeThemesOverlay(); });
  $("closeProfileBtn")?.addEventListener("click", closeProfileOverlay);
  $("saveProfileBtn")?.addEventListener("click", saveProfileName);
  $("claimDailyRewardBtn")?.addEventListener("click", claimDailyReward);
  $("sendChatBtn")?.addEventListener("click", sendChatMessage);
  $("chatInput")?.addEventListener("keydown", (e) => { if(e.key === "Enter") sendChatMessage(); });
  $("profileOverlay")?.addEventListener("click", (e) => { if(e.target === $("profileOverlay")) closeProfileOverlay(); });

  $("intro").addEventListener("click", () => {
    playMusic();
    screens.intro.style.opacity = "0";
    setTimeout(() => showScreen("menu"), 2300);
  });

  $("startBtn").addEventListener("click", () => {
    selectedPlayerCount = 2;
    renderNameInputs();
    screens.menu.style.opacity = "0";
    setTimeout(() => {
      screens.menu.style.opacity = "";
      showScreen("setup");
    }, 900);
  });

  $("backMenuBtn").addEventListener("click", () => showScreen("menu"));
  $("continueGameBtn").addEventListener("click", () => {
    screens.setup.style.opacity = "0";
    setTimeout(() => {
      screens.setup.style.opacity = "";
      startGame();
    }, 900);
  });
  $("rollDiceBtn").addEventListener("click", rollDice);
  $("endTurnBtn")?.addEventListener("click", finishTurn);
  $("closePropertyCard").addEventListener("click", closeCard);
  $("propertyOverlay").addEventListener("click", (e) => { if(e.target === $("propertyOverlay")) closeCard(); });
  $("buyBtn")?.addEventListener("click", buyCurrentSpace);

  document.querySelectorAll(".countBtn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".countBtn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      selectedPlayerCount = Number(btn.dataset.count);
      renderNameInputs();
    });
  });

  $("musicToggle").addEventListener("click", () => $("musicPlayer").classList.toggle("hidden"));
  $("closePlayer").addEventListener("click", () => $("musicPlayer").classList.add("hidden"));
  $("playBtn").addEventListener("click", () => isPlaying ? pauseMusic() : playMusic());
  $("nextBtn").addEventListener("click", nextTrack);
  $("prevBtn").addEventListener("click", prevTrack);

  $("musicAudio").addEventListener("loadedmetadata", () => {
    $("duration").textContent = formatTime($("musicAudio").duration);
  });

  $("musicAudio").addEventListener("timeupdate", () => {
    const audio = $("musicAudio");
    if(!audio.duration) return;
    $("progressBar").value = (audio.currentTime / audio.duration) * 100;
    $("currentTime").textContent = formatTime(audio.currentTime);
    $("duration").textContent = formatTime(audio.duration);
  });

  $("progressBar").addEventListener("input", () => {
    const audio = $("musicAudio");
    if(!audio.duration) return;
    audio.currentTime = ($("progressBar").value / 100) * audio.duration;
  });

  $("volumeBar").addEventListener("input", () => {
    $("musicAudio").volume = Number($("volumeBar").value);
  });

  $("musicAudio").addEventListener("ended", nextTrack);

  document.querySelectorAll("button").forEach(btn => btn.addEventListener("click", () => playSound("click")));


  $("settingsBtn")?.addEventListener("click", openSettings);
  $("closeSettingsBtn")?.addEventListener("click", closeSettings);
  $("settingsBackMainBtn")?.addEventListener("click", closeSettings);

  $("soundSettingsBtn")?.addEventListener("click", () => showSettingsPage("soundSettingsPage"));
  $("screenSettingsBtn")?.addEventListener("click", () => showSettingsPage("screenSettingsPage"));

  $("backToSettingsFromSound")?.addEventListener("click", () => showSettingsPage("settingsHome"));
  $("backToSettingsFromScreen")?.addEventListener("click", () => showSettingsPage("settingsHome"));

  $("effectsToggle")?.addEventListener("click", () => {
    settings.effects = !settings.effects;
    saveSettings();
    applySettings();
    refreshSettingsUI();
  });

  $("musicToggleSetting")?.addEventListener("click", () => {
    settings.music = !settings.music;
    saveSettings();
    applySettings();
    refreshSettingsUI();

    if(settings.music){
      playMusic();
    }else{
      pauseMusic();
    }
  });

  $("masterVolumeSlider")?.addEventListener("input", (e) => {
    settings.volume = Number(e.target.value);
    saveSettings();
    applySettings();
    refreshSettingsUI();
  });

  $("fullscreenBtn")?.addEventListener("click", toggleFullscreen);

  document.addEventListener("keydown", (e) => {
    if(e.key === "Escape"){
      closeSettings();
    }
  });

  $("settingsOverlay")?.addEventListener("click", (e) => {
    if(e.target === $("settingsOverlay")) closeSettings();
  });

  loadSettings();

  setupLogo();
  renderNameInputs();
  loadTrack(0);
});

// V1.0.1 No Trade Patch
try{
window.openTradeOverlay=function(){};
window.confirmTradeFinal=function(){};
window.closeTradeOverlay=function(){};
const b=document.getElementById("tradeBtn"); if(b) b.remove();
} catch(e){}
