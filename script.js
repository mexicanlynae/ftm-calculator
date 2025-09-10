const damageBtn = document.getElementById('damageBtn');
const healthBtn = document.getElementById('healthBtn');
const calcContainer = document.getElementById('calculatorContainer');

// Enchantment popup elements
const openEnchantBtn = document.getElementById('openEnchantBtn');
const closeEnchantBtn = document.getElementById('closeEnchantBtn');
const enchantPopup = document.getElementById('enchantPopup');
const normalEnchantsDiv = document.getElementById('normalEnchants');
const mysticEnchantsDiv = document.getElementById('mysticEnchants');

// Example enchantments based on your new list

const normalEnchants = [
    {name: "Zap", level: 0, max: 5, color: "green"},
    {name: "Sharpness", level: 0, max: 5, color: "green"},
    {name: "Ignition", level: 0, max: 5, color: "green"},
    {name: "Bleed", level: 0, max: 5, color: "green"}
];

const mysticEnchants = [
    {name: "Smite", level: 0, max: 5, color: "green"},
    {name: "Sacrifice", level: 0, max: 5, color: "yellow"},
    {name: "Giant Slayer", level: 0, max: 5, color: "yellow"},
    {name: "Reckless", level: 0, max: 5, color: "orange"},
    {name: "Skewer", level: 0, max: 5, color: "red"},
    {name: "Culling", level: 0, max: 5, color: "yellow"}
];

// Option switching
function selectCalculator(type) {
    if(type === 'damage'){
        damageBtn.classList.add('selected');
        healthBtn.classList.remove('selected');
        renderDamageCalculator();
    } else {
        healthBtn.classList.add('selected');
        damageBtn.classList.remove('selected');
        calcContainer.innerHTML = '<h2 style="text-align:center;">Health Calculator</h2><p style="text-align:center;">Coming soon!</p>';
    }
}

damageBtn.addEventListener('click', () => selectCalculator('damage'));
healthBtn.addEventListener('click', () => selectCalculator('health'));

// Render Damage Calculator
function renderDamageCalculator() {
    const levelNames = [
        "+Legendary", "++Legendary", "+++Legendary",
        "+Mythical", "++Mythical", "+++Mythical",
        "+Godlike", "++Godlike", "+++Godlike", "Ultimate"
    ];

    let levelOptions = "";
    for(let i = 1; i <= 10; i++){
        levelOptions += `<option value="${i}">+${i}</option>`;
    }
    for(let i = 11; i <= 20; i++){
        levelOptions += `<option value="${i}">+${i} (${levelNames[i-11]})</option>`;
    }

    calcContainer.innerHTML = `
    <div class="section">
        <label for="swordSelect">Select Sword:</label>
        <select id="swordSelect">
            <option value="sword1" data-min="100" data-max="150">Sword 1</option>
            <option value="sword2" data-min="200" data-max="250">Sword 2</option>
            <option value="sword3" data-min="300" data-max="400">Sword 3</option>
        </select>

        <label for="levelSelect">Sword Level (+1 to +20):</label>
        <select id="levelSelect">
            ${levelOptions}
        </select>
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
    `;

    document.getElementById('calculateBtn').addEventListener('click', calculateDamage);
}

// Enchantment popup functions
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

// Damage calculation
function calculateDamage(){
    const sword = document.getElementById('swordSelect');
    const min = parseFloat(sword.selectedOptions[0].dataset.min);
    const max = parseFloat(sword.selectedOptions[0].dataset.max);

    const level = parseInt(document.getElementById('levelSelect').value);
    const story = parseFloat(document.getElementById('storyInput').value);

    // For now, sum enchantment multipliers (can adjust later)
    let enchantMultiplier = 1;
    normalEnchants.concat(mysticEnchants).forEach(e=>{
        if(e.level > 0) enchantMultiplier += e.level * 0.05; // temporary formula
    });

    const levelMultiplier = 1 + (level * 0.075);
    const storyMultiplier = 1 + (story / 100);

    const finalMin = (min * levelMultiplier * storyMultiplier * enchantMultiplier).toFixed(2);
    const finalMax = (max * levelMultiplier * storyMultiplier * enchantMultiplier).toFixed(2);
    const finalAvg = ((parseFloat(finalMin) + parseFloat(finalMax))/2).toFixed(2);

    document.getElementById('results').innerHTML = `
        <p>Min Damage: ${finalMin}</p>
        <p>Max Damage: ${finalMax}</p>
        <p>Average Damage: ${finalAvg}</p>
    `;
}

// Initial render
renderDamageCalculator();
