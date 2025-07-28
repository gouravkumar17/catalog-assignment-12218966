document.getElementById('form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const files = [
    document.getElementById('test1').files[0],
    document.getElementById('test2').files[0]
  ];

  const results = [];
  let allDebugLogs = [];

  for (const file of files) {
    const text = await file.text();
    const data = JSON.parse(text);

    const { n, k } = data.keys;
    const points = [];
    const debugLog = [];

    debugLog.push(`Decoding input from: ${file.name}`);
    debugLog.push(`n = ${n}, k = ${k}`);
    debugLog.push(`\n Decoded (x, y) pairs:`);

    Object.keys(data).forEach(key => {
      if (key !== "keys") {
        const x = BigInt(key);
        const base = parseInt(data[key].base);
        const encoded = data[key].value;
        const y = BigInt(parseInt(encoded, base));
        points.push([x, y]);
        debugLog.push(`x = ${x}, base = ${base}, encoded y = ${encoded} → decoded y = ${y}`);
      }
    });

    debugLog.push(`\n Generating all combinations of ${k} from ${n} points...`);

    const combinations = kCombinations(points, k);
    const secrets = new Map();
    let firstDebugPoly = '';

    for (let index = 0; index < combinations.length; index++) {
      const group = combinations[index];
      const secret = lagrangeInterpolation(group);

      if (index === 0) {
        firstDebugPoly += `\n Lagrange Interpolation for 1st combination:\n`;
        group.forEach(([xi, yi], i) => {
          let num = 1n, den = 1n;
          let steps = [];
          for (let j = 0; j < group.length; j++) {
            if (i !== j) {
              const [xj] = group[j];
              steps.push(`(-${xj}) / (${xi} - ${xj})`);
              num *= -xj;
              den *= xi - xj;
            }
          }
          const li = num / den;
          const term = yi * li;
          firstDebugPoly += `L_${i}(0) = ${steps.join(' * ')} = ${li}, y = ${yi} → term = ${term}\n`;
        });
        firstDebugPoly += `→ Sum of terms = ${secret}\n`;
      }

      const strSecret = secret.toString();
      secrets.set(strSecret, (secrets.get(strSecret) || 0) + 1);
    }

    const sorted = [...secrets.entries()].sort((a, b) => b[1] - a[1]);
    const finalSecret = sorted[0][0];

    debugLog.push(firstDebugPoly);
    debugLog.push(` Most frequent constant term among ${combinations.length} combinations: ${finalSecret}`);

    allDebugLogs.push(debugLog.join('\n'));
    results.push(finalSecret);
  }

  document.getElementById('output').innerHTML = `
    <h3> Computed Secrets</h3>
    <p>Secret 1: ${results[0]}</p>
    <p>Secret 2: ${results[1]}</p>
    <button id="toggleButton" onclick="toggleDetails()">Show Internal Computation</button>
    <pre id="details" style="display:none;">${allDebugLogs.join('\n\n' + '-'.repeat(60) + '\n\n')}</pre>
  `;
});

function lagrangeInterpolation(points) {
  let result = 0n;
  for (let i = 0; i < points.length; i++) {
    const [xi, yi] = points[i];
    let num = 1n, den = 1n;
    for (let j = 0; j < points.length; j++) {
      if (i !== j) {
        const [xj] = points[j];
        num *= -xj;
        den *= xi - xj;
      }
    }
    const li = num / den;
    result += yi * li;
  }
  return result;
}

function kCombinations(arr, k) {
  const res = [];
  const combo = (start, path) => {
    if (path.length === k) {
      res.push([...path]);
      return;
    }
    for (let i = start; i < arr.length; i++) {
      combo(i + 1, path.concat([arr[i]]));
    }
  };
  combo(0, []);
  return res;
}

function toggleDetails() {
  const details = document.getElementById('details');
  const button = document.getElementById('toggleButton');
  if (details.style.display === 'none') {
    details.style.display = 'block';
    button.textContent = 'Hide Internal Computation';
  } else {
    details.style.display = 'none';
    button.textContent = 'Show Internal Computation';
  }
}
