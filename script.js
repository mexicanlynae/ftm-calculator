const damageBtn = document.getElementById('damageBtn');
const healthBtn = document.getElementById('healthBtn');
const calcContainer = document.getElementById('calculatorContainer');

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

// Render damage calculator GUI
function renderDamageCalculator() {
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
            ${Array.from({length:20}, (_,i) => `<option value="${i+1}">+${i+1}</option>`).join('')}
        </select>
    </div>

    <div class="section">
        <label for="storyInput">Story Damage Level:</label>
        <input type="number" id="storyInput" min="0" value="0">
    </div>

    <div class="section">
        <label for="enchantSelect">Select Enchantment:</label>
        <select id="enchantSelect">
            <option value="1">None (1x)</option>
            <option value="1.1">Enchant 1 (1.1x)</option>
            <option value="1.25">Enchant 2 (1.25x)</option>
            <option value="1.5">Enchant 3 (1.5x)</option>
        </select>
    </div>

    <button id="calculateBtn">Calculate Damage</button>
    <div id="results">Results will appear here.</div>
    `;

    document.getElementById('calculateBtn').addEventListener('click', calculateDamage);
}

// Damage calculation logic
function calculateDamage(){
    const sword = document.getElementById('swordSelect');
    const min = parseFloat(sword.selectedOptions[0].dataset.min);
    const max = parseFloat(sword.selectedOptions[0].dataset.max);

    const level = parseInt(document.getElementById('levelSelect').value);
    const story = parseFloat(document.getElementById('storyInput').value);
    const enchant = parseFloat(document.getElementById('enchantSelect').value);

    const levelMultiplier = 1 + (level * 0.075);
    const storyMultiplier = 1 + (story / 100);

    const finalMin = (min * levelMultiplier * storyMultiplier * enchant).toFixed(2);
    const finalMax = (max * levelMultiplier * storyMultiplier * enchant).toFixed(2);
    const finalAvg = ((parseFloat(finalMin) + parseFloat(finalMax))/2).toFixed(2);

    document.getElementById('results').innerHTML = `
        <p>Min Damage: ${finalMin}</p>
        <p>Max Damage: ${finalMax}</p>
        <p>Average Damage: ${finalAvg}</p>
    `;
}

// Initial render
renderDamageCalculator();
