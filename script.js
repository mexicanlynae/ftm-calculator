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
        calcContainer.innerHTML = '<h2>Health Calculator</h2><p>Coming soon!</p>';
    }
}

// ======== Sword Data ========
const swords = [
    {name: "Iron Sword", min: 2, max: 4, cooldown: 1.0},
    {name: "EvilStaff", min: 5, max: 10, cooldown: 1.0},
    {name: "DesStaff", min: 5, max: 15, cooldown: 1.0},
    {name: "LinkedSword", min: 8, max: 15, cooldown: 1.0},
];

// ======== Enchantments ========
const normalEnchants = [
    {name: "Zap", level:0, max:8, color:"green"},      // always applied
    {name: "Sharpness", level:0, max:10, color:"green"},
    {name: "Ignition", level:0, max:10, color:"green"}, // always applied
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
const openEnchantBtn = document.createElement('button');
openEnchantBtn.id = "openEnchantBtn";
openEnchantBtn.textContent = "Select Enchantments";

const enchantPopup = document.getElementById('enchantPopup');
const closeEnchantBtn = document.getElementById('closeEnchantBtn');
const normalEnchantsDiv = document.getElementById('normalEnchants');
const mysticEnchantsDiv = document.getElementById('mysticEnchants');

document.addEventListener("click", (e)=>{
    if(e.target && e.target.id === "openEnchantBtn"){
        enchantPopup.style.display = "flex";
        populateEnchantGrid(normalEnchants.filter(e=>e.name!=="Ignition" && e.name!=="Zap"), normalEnchantsDiv);
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
    let swordOptions = "";
    swords.forEach(s=>{ swordOptions += `<option value="${s.name}">${s.name}</option>` });

    calcContainer.innerHTML = `
        <div class="section">
            <label for="levelInputNumber">Level (adds +1 damage per level):</label>
            <div class="level-input-container">
                <input type="number" id="levelInputNumber" min="0" value="0">
                <select id="levelUnit">
                    <option value="1"> </option>
                    <option value="1000">K</option>
                    <option value="1000000" selected>M</option>
                    <option value="1000000000">B</option>
                </select>
            </div>
        </div>

        <div class="section">
            <label for="swordSelect">Select Sword:</label>
            <select id="swordSelect">${swordOptions}</select>
        </div>

        <div class="section">
            <label for="storyInput">Story Damage Level:</label>
            <input type="number" id="storyInput" min="0" value="0">
        </div>

        <div class="section">
            <label>Select Enchantments:</label>
        </div>
    `;

    document.querySelector(".section:last-child").appendChild(openEnchantBtn);

    const calculateBtn = document.createElement("button");
    calculateBtn.id = "calculateBtn";
    calculateBtn.textContent = "Calculate Damage";
    calcContainer.appendChild(calculateBtn);

    const resultsDiv = document.createElement("div");
    resultsDiv.id = "results";
    calcContainer.appendChild(resultsDiv);

    const dpsDiv = document.createElement("div");
    dpsDiv.style.marginTop="10px";
    dpsDiv.innerHTML = `<input type="checkbox" id="dpsModeCheckbox"><label for="dpsModeCheckbox"> DPS Mode</label>`;
    calcContainer.appendChild(dpsDiv);

    const checkboxDiv = document.createElement("div");
    checkboxDiv.id = "enchantCheckboxes";
    calcContainer.appendChild(checkboxDiv);

    calculateBtn.addEventListener('click', calculateDamage);
}

// ======== Calculate Damage ========
function calculateDamage(){
    const swordName = document.getElementById('swordSelect').value;
    const sword = swords.find(s=>s.name===swordName);
    const story = parseFloat(document.getElementById('storyInput').value);

    const levelNum = parseFloat(document.getElementById('levelInputNumber').value) || 0;
    const levelUnit = parseInt(document.getElementById('levelUnit').value) || 1;
    const extraLevel = levelNum * levelUnit;

    let baseMin = sword.min + extraLevel;
    let baseMax = sword.max + extraLevel;
    const storyMultiplier = 1 + story/100;
    baseMin *= storyMultiplier;
    baseMax *= storyMultiplier;

    // Always-on effects
    const ignitionLvl = normalEnchants.find(e=>e.name==="Ignition").level;
    let fireTick = ignitionLvl>0 ? baseMin*0.06*ignitionLvl : 0;

    const zapLvl = normalEnchants.find(e=>e.name==="Zap").level;
    let zapDamage = zapLvl > 0 ? baseMin*0.06*zapLvl : 0;

    const allEnchants = normalEnchants.concat(mysticEnchants)
        .filter(e=>e.level>0 && e.name !== "Ignition" && e.name !== "Zap");

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
        let modifiedZap = zapDamage;

        const active = Array.from(document.getElementsByClassName("enchantCheck"))
                            .filter(c=>c.checked).map(c=>c.id);

        if(active.includes("Smite") && active.includes("Culling")){
            alert("Smite and Culling do not work together!");
            document.getElementById("Culling").checked=false;
            active.splice(active.indexOf("Culling"),1);
        }

        // Apply other enchantments
        if(active.includes("Sharpness")){
            const lvl = normalEnchants.find(e=>e.name==="Sharpness").level;
            modifiedMin*=(1+0.05*lvl);
            modifiedMax*=(1+0.05*lvl);
            modifiedFire*=(1+0.05*lvl);
            modifiedZap*=(1+0.05*lvl);
        }
        if(active.includes("Bleed")){
            const lvl = normalEnchants.find(e=>e.name==="Bleed").level;
            modifiedMin += baseMin*0.005*lvl;
            modifiedMax += baseMax*0.005*lvl;
        }
        if(active.includes("Smite")){
            const lvl = mysticEnchants.find(e=>e.name==="Smite").level;
            modifiedMin *= (1+0.125 + 0.025*(lvl-1));
            modifiedMax *= (1+0.125 + 0.025*(lvl-1));
        }
        if(active.includes("Culling")){
            const lvl = mysticEnchants.find(e=>e.name==="Culling").level;
            modifiedMin *= (1+0.125 + 0.025*(lvl-1));
            modifiedMax *= (1+0.125 + 0.025*(lvl-1));
        }

        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = `
            <p>Base Damage: ${modifiedMin.toFixed(1)} - ${modifiedMax.toFixed(1)}</p>
            <p>Fire Tick Damage: ${modifiedFire.toFixed(1)}</p>
            <p>Zap Damage: ${modifiedZap.toFixed(1)}</p>
        `;
    }

    updateDamage();

    // Update when checkboxes change
    Array.from(document.getElementsByClassName("enchantCheck")).forEach(c=>{
        c.addEventListener("change", updateDamage);
    });
}

// Initialize with damage calculator
selectCalculator('damage');
