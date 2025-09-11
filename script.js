// ======== Option Buttons ========
const damageBtn = document.getElementById('damageBtn');
const healthBtn = document.getElementById('healthBtn');
const calcContainer = document.getElementById('calculatorContainer');

damageBtn.addEventListener('click', () => selectCalculator('damage'));
healthBtn.addEventListener('click', () => selectCalculator('health'));

function selectCalculator(type) {
    if (type === 'damage') {
        damageBtn.classList.add('selected');
        healthBtn.classList.remove('selected');
        renderDamageCalculator();
    } else {
        healthBtn.classList.add('selected');
        damageBtn.classList.remove('selected');
        calcContainer.innerHTML = '<h2 style="text-align:center;">Health Calculator</h2><p style="text-align:center;">Coming soon!</p>';
    }
}

// ======== Sword Data ========
const swords = [
    {name: "Iron Sword", min: 2, max: 4, cooldown: 1.0},
    {name: "EvilStaff", min: 5, max: 10, cooldown: 1.0},
    {name: "DesStaff", min: 5, max: 15, cooldown: 1.0},
    {name: "LinkedSword", min: 8, max: 15, cooldown: 1.0},
    {name: "", min: 0, max: 0, cooldown: 0},
    {name: "", min: 0, max: 0, cooldown: 0},
    {name: "", min: 0, max: 0, cooldown: 0},
    {name: "", min: 0, max: 0, cooldown: 0},
    {name: "", min: 0, max: 0, cooldown: 0},
    {name: "", min: 0, max: 0, cooldown: 0},
    {name: "", min: 0, max: 0, cooldown: 0},
    {name: "", min: 0, max: 0, cooldown: 0},
    {name: "", min: 0, max: 0, cooldown: 0},
    {name: "", min: 0, max: 0, cooldown: 0},
    {name: "", min: 0, max: 0, cooldown: 0},
    {name: "", min: 0, max: 0, cooldown: 0},
    {name: "", min: 0, max: 0, cooldown: 0},
    {name: "", min: 0, max: 0, cooldown: 0},
    {name: "", min: 0, max: 0, cooldown: 0},
    {name: "", min: 0, max: 0, cooldown: 0},
    {name: "", min: 0, max: 0, cooldown: 0},
    {name: "", min: 0, max: 0, cooldown: 0},
    {name: "", min: 0, max: 0, cooldown: 0},
    {name: "", min: 0, max: 0, cooldown: 0},
    {name: "", min: 0, max: 0, cooldown: 0},
    {name: "", min: 0, max: 0, cooldown: 0},
    {name: "", min: 0, max: 0, cooldown: 0},
];

// ======== Enchantments ========
const normalEnchants = [
    {name: "Zap", level:0, max:8, color:"green"},
    {name: "Sharpness", level:0, max:10, color:"green"},
    {name: "Ignition", level:0, max:10, color:"green"},
    {name: "Bleed", level:0, max:50, color:"green"}
];

const mysticEnchants = [
    {name: "Smite", level:0, max:3, color:"green"},
    {name: "Sacrifice", level:0, max:1, color:"yellow"},
    {name: "Giant Slayer", level:0, max:3, color:"yellow"},
    {name: "Reckless", level:0, max:5, color:"orange"},
    {name: "Skewer", level:0, max:5, color:"red"},
    {name: "Culling", level:0, max:3, color:"yellow"}
];

// ======== Enchantment Popup ========
const openEnchantBtn = document.getElementById('openEnchantBtn');
const closeEnchantBtn = document.getElementById('closeEnchantBtn');
const enchantPopup = document.getElementById('enchantPopup');
const normalEnchantsDiv = document.getElementById('normalEnchants');
const mysticEnchantsDiv = document.getElementById('mysticEnchants');

document.addEventListener("click", (e)=>{
    if(e.target && e.target.id === "openEnchantBtn"){
        enchantPopup.style.display = "flex";
        populateEnchantGrid(normalEnchants, normalEnchantsDiv);
        populateEnchantGrid(mysticEnchants, mysticEnchantsDiv);
    }
});

closeEnchantBtn.addEventListener("click", ()=>{
    enchantPopup.style.display = "none";
});

function populateEnchantGrid(enchantments, container){
    container.innerHTML = "";
    enchantments.forEach(enchant=>{
        const box = document.createElement("div");
        box.className = "enchant-box";
        box.style.backgroundColor = enchant.color;

        box.innerHTML = `
            <div>${enchant.name}</div>
            <div class="enchant-controls">
                <button class="minusBtn">-</button>
                <span class="level">${enchant.level}</span>
                <button class="plusBtn">+</button>
            </div>
        `;

        box.querySelector(".minusBtn").addEventListener("click", ()=>{
            if(enchant.level > 0){
                enchant.level--;
                box.querySelector(".level").textContent = enchant.level;
            }
        });

        box.querySelector(".plusBtn").addEventListener("click", ()=>{
            if(enchant.level < enchant.max){
                enchant.level++;
                box.querySelector(".level").textContent = enchant.level;
            }
        });

        container.appendChild(box);
    });
}

// ======== Render Damage Calculator ========
function renderDamageCalculator(){
    const levelNames = [
        "+Legendary","++Legendary","+++Legendary",
        "+Mythical","++Mythical","+++Mythical",
        "+Godlike","++Godlike","+++Godlike","Ultimate"
    ];

    let levelOptions = "";
    for(let i=1;i<=10;i++) levelOptions+=`<option value="${i}">+${i}</option>`;
    for(let i=11;i<=20;i++) levelOptions+=`<option value="${i}">+${i} (${levelNames[i-11]})</option>`;

    let swordOptions = "";
    swords.forEach(s=>{
        swordOptions += `<option value="${s.name}">${s.name}</option>`;
    });

    calcContainer.innerHTML = `
        <div class="section">
            <label for="swordSelect">Select Sword:</label>
            <select id="swordSelect">${swordOptions}</select>

            <label for="levelSelect">Sword Level (+1 to +20):</label>
            <select id="levelSelect">${levelOptions}</select>
        </div>

        <div class="section">
            <label for="storyInput">Story Damage Level:</label>
            <input type="number" id="storyInput" min="0" value="0">
        </div>

        <div class="section">
            <label>Select Enchantments:</label>
            <button id="openEnchantBtn">Select Enchantments</button>
        </div>

        <button id="calculateBtn">Calculate Damage</button>

        <div id="results">Results will appear here.</div>

        <div style="margin-top:10px;">
            <input type="checkbox" id="dpsModeCheckbox">
            <label for="dpsModeCheckbox">DPS Mode</label>
        </div>

        <div id="enchantCheckboxes"></div>
    `;

    document.getElementById('calculateBtn').addEventListener('click', calculateDamage);
}

// ======== Calculate Damage (with cooldown for future DPS) ========
function calculateDamage(){
    const swordName = document.getElementById('swordSelect').value;
    const sword = swords.find(s=>s.name===swordName);
    const level = parseInt(document.getElementById('levelSelect').value);
    const story = parseFloat(document.getElementById('storyInput').value);
    const dpsMode = document.getElementById('dpsModeCheckbox').checked;

    // Level & story multipliers
    const levelMultiplier = 1 + level*0.075;
    const storyMultiplier = 1 + story/100;

    let baseMin = sword.min * levelMultiplier * storyMultiplier;
    let baseMax = sword.max * levelMultiplier * storyMultiplier;

    // Fire tick (Ignition)
    const ignition = normalEnchants.find(e=>e.name==="Ignition").level;
    let fireTick = ignition>0 ? baseMin*0.06*ignition : 0;

    // Render enchant checkboxes
    const allEnchants = normalEnchants.concat(mysticEnchants).filter(e=>e.level>0);
    const checkboxDiv = document.getElementById('enchantCheckboxes');
    checkboxDiv.innerHTML = "<h3>Apply Enchants:</h3>";
    allEnchants.forEach(e=>{
        const label = document.createElement('label');
        label.style.marginRight = "10px";
        label.innerHTML = `<input type="checkbox" class="enchantCheck" id="${e.name}" checked> ${e.name} ${e.level}`;
        checkboxDiv.appendChild(label);
    });

    function updateDamage(){
        let modifiedMin = baseMin;
        let modifiedMax = baseMax;
        let modifiedFire = fireTick;

        const active = Array.from(document.getElementsByClassName("enchantCheck"))
                            .filter(c=>c.checked).map(c=>c.id);

        if(active.includes("Smite") && active.includes("Culling")){
            alert("Smite and Culling do not work together!");
            document.getElementById("Culling").checked=false;
            active.splice(active.indexOf("Culling"),1);
        }

        // Enchant effects (basic examples)
        if(active.includes("Sharpness")){
            const lvl = normalEnchants.find(e=>e.name==="Sharpness").level;
            modifiedMin*=(1+0.05*lvl);
            modifiedMax*=(1+0.05*lvl);
            modifiedFire*=(1+0.05*lvl);
        }
        if(active.includes("Bleed")){
            const lvl = normalEnchants.find(e=>e.name==="Bleed").level;
            modifiedMin += baseMin*0.005*lvl;
            modifiedMax += baseMax*0.005*lvl;
        }
        if(active.includes("Zap")){
            const lvl = normalEnchants.find(e=>e.name==="Zap").level;
            modifiedMin*=(1+0.1*lvl);
            modifiedMax*=(1+0.1*lvl);
            modifiedFire*=(1+0.1*lvl);
        }

        if(active.includes("Ignition")){
            modifiedFire = fireTick * (active.includes("Sharpness") ? 1+0.05*normalEnchants.find(e=>e.name==="Sharpness").level : 1);
        }

        if(active.includes("Smite")){
            const lvl = mysticEnchants.find(e=>e.name==="Smite").level;
            modifiedMin*=(1+0.125+0.025*(lvl-1));
            modifiedMax*=(1+0.125+0.025*(lvl-1));
            modifiedFire*=(1+0.125+0.025*(lvl-1));
        }

        if(active.includes("Culling")){
            const lvl = mysticEnchants.find(e=>e.name==="Culling").level;
            modifiedMin*=(1+0.125+0.025*(lvl-1));
            modifiedMax*=(1+0.125+0.025*(lvl-1));
            modifiedFire*=(1+0.125+0.025*(lvl-1));
        }

        // Show results
        const resultsDiv = document.getElementById("results");
        resultsDiv.innerHTML = `
            <p>Base Damage: ${modifiedMin.toFixed(2)} - ${modifiedMax.toFixed(2)}</p>
            <p>Fire Tick: ${modifiedFire.toFixed(2)} / sec</p>
        `;

        if(dpsMode){
            resultsDiv.innerHTML += `<p>DPS Mode ON - cooldown ${sword.cooldown}s (future calculation)</p>`;
        }
    }

    const checkboxes = document.getElementsByClassName("enchantCheck");
    Array.from(checkboxes).forEach(cb=>cb.addEventListener("change", updateDamage));

    updateDamage();
}

// ======== Initial Render ========
selectCalculator('damage');
