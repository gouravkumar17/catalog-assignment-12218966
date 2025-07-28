# 🔐 Secret Sharing Computation Visualizer

This is a web-based tool to **reconstruct hidden secrets** from a set of shares using **Lagrange interpolation**. It also supports **JSON input**, filters invalid shares, computes `(k-1)` degree polynomials, and allows the user to visualize internal calculations step-by-step.

## 🚀 Features

- Upload or input JSON data containing shares.
- Filters out invalid shares automatically.
- Computes Lagrange interpolated polynomial for given shares.
- Recovers hidden secrets.
- Shows detailed step-by-step internal computations (toggle button).
- Fully client-side (HTML, CSS, JavaScript) — **no backend required**.

---

## 🧪 How It Works

This tool reconstructs secrets based on **Shamir's Secret Sharing Scheme** using the Lagrange interpolation formula. When enough valid shares (`k`) are provided, the original secret (typically at `x=0`) can be computed.

1. User provides shares in JSON.
2. The system filters out invalid entries.
3. Applies the Lagrange interpolation formula.
4. Computes secret values and shows them.
5. You can toggle to show or hide the full internal computation logic.

---

## 📁 Project Structure

project-folder/
│
├── index.html # Main HTML file
├── styles.css # Styling for the UI
├── script.js # Logic for filtering, polynomial evaluation & UI toggle
├── test1.json # TestCase 1
├── test2.json # TestCase 2
└── README.md # This file



---

## ✅ How to Use

1. **Clone this repository**:

   ```bash
   git clone https://github.com/yourusername/secret-sharing-json.git
   cd secret-sharing-json

Open index.html in any browser.
Paste or upload your JSON-formatted shares.
Click "Compute Secrets".
Click "Show Internal Computation" to view step-by-step logic (it toggles to "Hide" when clicked again).


📌 Sample JSON Input
[
  { "x": 1, "y": 123 },
  { "x": 2, "y": 456 },
  { "x": 3, "y": 789 }
]

🛠 Technologies Used
HTML5
CSS3
JavaScript (Vanilla)


🧑‍💻 Author
Gourav Kumar
A Computer Science & Engineering student passionate about cryptographic computation and web development.
