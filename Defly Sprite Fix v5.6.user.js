// ==UserScript==
// @name         Defly Sprite Fix v5.6
// @namespace    https://defly.io/
// @version      5.6
// @description  Fixes modified sprites not saving upon refresh, allows for creating/uploading sprite packs
// @match        *://defly.io/?skin-editor*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
    'use strict';

    /***** Keys *****/
    const STORAGE_KEY = "defly_sprites";
    const PACKS_KEY = "defly_packs_v1";

    /***** State *****/
    let savedSprites = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    let spriteDropdown, fileInput, replaceLabel;

    /***** PANEL SETUP *****/
    const panel = document.createElement("div");
    panel.id = "spriteMenu";
    Object.assign(panel.style, {
        position: "fixed",
        top: "80px",
        right: "0",
        width: "320px",
        height: "500px",
        backgroundColor: "rgba(25,25,35,0.95)",
        borderRadius: "12px 0 0 12px",
        boxShadow: "-4px 0 10px rgba(0,0,0,0.4)",
        fontFamily: "Segoe UI, sans-serif",
        color: "#fff",
        transition: "transform 0.6s ease",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        zIndex: "999999"
    });

    const header = document.createElement("h2");
    header.textContent = "Sprites"; // renamed from "Saved Sprites"
    Object.assign(header.style, {margin: "12px", fontSize: "18px", textAlign: "center"});
    panel.appendChild(header);

    const spriteList = document.createElement("div");
    spriteList.id = "savedSprites";
    Object.assign(spriteList.style, {
        flex: "1",
        overflowY: "auto",
        padding: "0 10px",
        marginBottom: "5px"
    });
    panel.appendChild(spriteList);

    /* ---------- PACK AREA ---------- */
    const packSection = document.createElement("div");
    packSection.id = "packSection";
    Object.assign(packSection.style, {
        borderTop: "1px solid rgba(255,255,255,0.2)",
        padding: "8px",
        height: "33%",
        display: "flex",
        flexDirection: "column"
    });

    const packButtons = document.createElement("div");
    packButtons.id = "packButtons";
    Object.assign(packButtons.style, {display:"flex", justifyContent:"space-around", marginBottom:"8px"});

    const downloadPackBtn = document.createElement("button");
    downloadPackBtn.textContent = "Download Sprites"; // renamed
    const uploadPackBtn = document.createElement("button");
    uploadPackBtn.textContent = "Upload Sprites"; // renamed

    [downloadPackBtn, uploadPackBtn].forEach(btn=>{
        Object.assign(btn.style,{
            background: "#333", color: "#fff", border:"none", padding:"6px 10px", borderRadius:"6px",
            cursor:"pointer", transition:"background 0.2s"
        });
        btn.onmouseenter=()=>btn.style.background="#444";
        btn.onmouseleave=()=>btn.style.background="#333";
    });

    packButtons.appendChild(downloadPackBtn);
    packButtons.appendChild(uploadPackBtn);
    packSection.appendChild(packButtons);

    const packScrollArea = document.createElement("div");
    packScrollArea.id = "packScrollArea";
    Object.assign(packScrollArea.style,{
        flex:"1", overflowY:"auto", borderRadius:"6px", background:"rgba(255,255,255,0.05)", padding:"5px"
    });
    packSection.appendChild(packScrollArea);

    panel.appendChild(packSection);
    document.body.appendChild(panel);

    /***** SLIDE HIDE/SHOW *****/
    let hideTimeout;
    const HIDE_OFFSET = 310;
    function startHideTimer(){
        clearTimeout(hideTimeout);
        hideTimeout = setTimeout(()=>{ panel.style.transform = `translateX(${HIDE_OFFSET}px)`; }, 3000);
    }
    function showPanelImmediate(){
        clearTimeout(hideTimeout);
        panel.style.transform = "translateX(0px)";
        panel.style.boxShadow = "-4px 0 15px rgba(0,255,255,0.12)";
    }
    panel.addEventListener("mouseenter", showPanelImmediate);
    panel.addEventListener("mouseleave", ()=>{ panel.style.boxShadow = "-4px 0 10px rgba(0,0,0,0.4)"; startHideTimer(); });
    startHideTimer();

    /***** STYLE CLASSES *****/
    const style = document.createElement("style");
    style.textContent = `
    .sprite-item, .pack-entry {
        display:flex;
        align-items:center;
        margin:6px 0;
        padding:5px;
        border-radius:6px;
        background:rgba(50,50,60,0.85);
        transition: background 0.2s;
    }
    .sprite-item:hover, .pack-entry:hover {
        background:rgba(70,70,80,0.9);
    }
    .sprite-item img, .pack-entry img {
        width:32px;
        height:32px;
        border-radius:4px;
        margin-right:8px;
        object-fit:contain;
    }
    .pack-entry .name {
        color:#E5FAFF;
        font-weight:600;
        margin-right:8px;
    }
    .pack-entry .rem {
        color:#FFAAAA;
        font-weight:700;
        cursor:pointer;
    }
    `;
    document.head.appendChild(style);

    /***** SPRITE LIST FUNCTIONS *****/
    function rebuildList(){
        spriteList.innerHTML="";
        const keys = Object.keys(savedSprites).filter(k=>savedSprites[k]);
        if(!keys.length){ const none=document.createElement("div"); none.textContent="No sprites saved."; none.style.opacity="0.7"; spriteList.appendChild(none); return; }
        keys.forEach(name=>{
            const row=document.createElement("div");
            row.className="sprite-item";

            const img=document.createElement("img");
            img.src=savedSprites[name];

            const label=document.createElement("div");
            label.textContent=name;
            label.style.color="#E5FAFF";
            label.style.fontWeight="600";
            label.style.cursor="pointer";
            label.onclick=()=>{ if(spriteDropdown){spriteDropdown.value=name; spriteDropdown.dispatchEvent(new Event("change",{bubbles:true}));} };

            const del=document.createElement("button");
            del.textContent="❌";
            Object.assign(del.style,{background:"transparent",border:"none",cursor:"pointer",color:"#FFAAAA",fontSize:"16px"});
            del.onclick=e=>{ e.stopPropagation(); delete savedSprites[name]; localStorage.setItem(STORAGE_KEY,JSON.stringify(savedSprites)); rebuildList(); };

            row.appendChild(img);
            row.appendChild(label);
            row.appendChild(del);
            spriteList.appendChild(row);
        });
    }
    rebuildList();

    /***** ATTACH UPLOAD *****/
    function attachUploadListener(){
        spriteDropdown=document.getElementById("skin-editor-game-sprites");
        fileInput=document.getElementById("skin-editor-input2");
        replaceLabel=document.querySelector('label[for="skin-editor-input2"]');
        if(!spriteDropdown || !fileInput || !replaceLabel) return false;

        fileInput.addEventListener("change",()=>{
            const file=fileInput.files[0]; if(!file) return;
            const name=spriteDropdown.value;
            const r=new FileReader();
            r.onload=e=>{
                savedSprites[name]=e.target.result;
                localStorage.setItem(STORAGE_KEY, JSON.stringify(savedSprites));
                rebuildList();
            };
            r.readAsDataURL(file);
        });
        return true;
    }

    function applySprites(){
        const names = Object.keys(savedSprites).filter(name => savedSprites[name]);
        if(!names.length) return;
        const queue = [...names];
        function processUploadQueue(){
            if(!queue.length) return;
            const name = queue.shift();
            if(!spriteDropdown || !fileInput) return;
            if([...spriteDropdown.options].some(o=>o.value===name)){
                spriteDropdown.value = name;
                spriteDropdown.dispatchEvent(new Event("change",{bubbles:true}));
                fetch(savedSprites[name]).then(r=>r.blob()).then(blob=>{
                    const dt=new DataTransfer();
                    dt.items.add(new File([blob],`${name}.png`,{type:blob.type}));
                    fileInput.files = dt.files;
                    fileInput.dispatchEvent(new Event("change",{bubbles:true}));
                    setTimeout(processUploadQueue,50);
                });
            } else {
                setTimeout(processUploadQueue,50);
            }
        }
        processUploadQueue();
    }

    function initWhenReady(){
        const t = setInterval(()=>{
            if(attachUploadListener() && spriteDropdown.options.length > 0){
                clearInterval(t);
                applySprites();
            }
        }, 200);
    }
    initWhenReady();

    /***** PACKS: storage, render, wiring *****/
    function loadPacks() { try { return JSON.parse(localStorage.getItem(PACKS_KEY) || "[]"); } catch(e){ return []; } }
    function savePacks(packs) { try { localStorage.setItem(PACKS_KEY, JSON.stringify(packs)); } catch(e){} }
    function buildPackObject(name) {
        const sprites = {};
        for (const k in savedSprites) if(savedSprites[k]) sprites[k]=savedSprites[k];
        return { id: Date.now(), name: name, sprites: sprites };
    }

    function renderPacks() {
        packScrollArea.innerHTML = "";

        const noneRow = document.createElement("div");
        noneRow.className = "pack-entry";
        noneRow.style.justifyContent = "space-between";
        noneRow.style.padding = "8px";
        noneRow.style.background = "rgba(255,255,255,0.02)";
        noneRow.style.marginBottom = "6px";
        const noneLabel = document.createElement("div");
        noneLabel.textContent = "None (reset to default)";
        noneLabel.style.color = "#E5FAFF";
        noneLabel.style.fontWeight = "700";
        noneLabel.style.cursor = "pointer";
        noneLabel.onclick = () => {
            savedSprites = {};
            localStorage.setItem(STORAGE_KEY, JSON.stringify(savedSprites));
            rebuildList();
        };
        noneRow.appendChild(noneLabel);
        packScrollArea.appendChild(noneRow);

        const packs = loadPacks();
        packs.forEach((pack) => {
            const row = document.createElement("div");
            row.className = "pack-entry";

            const img = document.createElement("img");
            const firstKey = Object.keys(pack.sprites || {})[0];
            if (firstKey && pack.sprites[firstKey]) img.src = pack.sprites[firstKey];
            else img.src = '';
            row.appendChild(img);

            const nameDiv = document.createElement("div");
            nameDiv.className = "name";
            nameDiv.textContent = pack.name || `Pack`;
            row.appendChild(nameDiv);

            const rem = document.createElement("div");
            rem.className = "rem";
            rem.textContent = "❌";
            rem.onclick = (e) => { e.stopPropagation();
                const p = loadPacks();
                const idx = p.findIndex(x => x.id === pack.id);
                if (idx !== -1) { p.splice(idx,1); savePacks(p); renderPacks(); }
            };
            row.appendChild(rem);

            row.onclick = () => {
                savedSprites = {};
                for (const k in pack.sprites) savedSprites[k] = pack.sprites[k];
                localStorage.setItem(STORAGE_KEY, JSON.stringify(savedSprites));
                rebuildList();
                applySprites();
            };

            packScrollArea.appendChild(row);
        });
    }

    downloadPackBtn.addEventListener('click', () => {
        const name = prompt("Pack name?"); if (!name) return;
        const pack = buildPackObject(name);
        const packs = loadPacks(); packs.push(pack); savePacks(packs); renderPacks();
        const blob = new Blob([JSON.stringify(pack,null,2)],{type:"application/json"});
        const url = URL.createObjectURL(blob);
        const a=document.createElement('a'); a.href=url; a.download=`${pack.name}.json`;
        document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
    });

    uploadPackBtn.addEventListener('click', () => {
        const input=document.createElement('input'); input.type='file'; input.accept='.json,application/json';
        input.onchange=()=>{
            if(!input.files || !input.files[0]) return;
            const f=input.files[0];
            const reader=new FileReader();
            reader.onload=(e)=>{
                try{
                    const pack=JSON.parse(e.target.result);
                    if(!pack.name || !pack.sprites) throw new Error('Invalid pack format');
                    const packs=loadPacks();
                    if(!pack.id) pack.id=Date.now();
                    packs.push(pack); savePacks(packs); renderPacks();
                } catch(err){ alert('Failed to load pack: '+err.message); }
            };
            reader.readAsText(f);
        };
        input.click();
    });

    renderPacks();

    /***** HIDE PANEL ON PLAY CLICK *****/
    function attachPlayHide(){
        const playBtn=document.getElementById("play-button");
        if(!playBtn) return setTimeout(attachPlayHide,300);
        playBtn.addEventListener("click",()=>{ try{ panel.remove(); } catch(e){} });
    }
    attachPlayHide();

})();
