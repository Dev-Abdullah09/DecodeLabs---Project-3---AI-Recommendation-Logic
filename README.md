# AutoMatch AI — Intelligent Car Recommendation System

**DecodeLabs Artificial Intelligence — Project 3: AI Recommendation Logic**  
**Student:** Abdullah Zafar  
**Batch:** 2026  
**Primary Language:** Python  
**Framework:** Flask / TypeScript React Live Engine  

---

## 1. Project Overview

**AutoMatch AI** is a transparent, portfolio-quality AI recommendation engine that matches user preferences with an extensive automotive dataset. Rather than treating recommendation as an opaque black box, AutoMatch AI implements clear, interpretable mathematical logic: dynamic priority-weighted scoring, normalized numerical similarity, exact/partial categorical pattern matching, and explainable AI (XAI) justification reasoning.

---

## 2. DecodeLabs Project 3 Requirements Mapping

| Official Requirement | Implementation in AutoMatch AI |
| :--- | :--- |
| **Take user input** | Interactive multi-attribute preference profiler (Budget bounds, Brand, Body style, Fuel type, Transmission, Drivetrain, Horsepower, Seating, Mileage, Usage). |
| **Match preferences using logic or similarity** | Hybrid scoring engine: exact & partial categorical match + normalized distance metric: $\text{Sim} = \max(0, 1 - \frac{\|V_{\text{car}} - V_{\text{pref}}\|}{\text{Range}})$. |
| **Display recommended items** | Top-N ranked recommendation cards with compatibility badges (0–100%), full specs, and feature score breakdowns. |
| **Logic building** | Modular penalty curves for budget stretch, seating deficits, and mileage optimization. |
| **Pattern matching** | Multidimensional vector comparison between the user's preference profile and all cataloged vehicles. |
| **Recommendation concepts** | Preference modeling, dynamic feature weighting, normalized similarity matrix, Top-N ranking, and Explainable AI (XAI) reason generator. |

---

## 3. Recommendation Algorithm & Mathematical Formulation

### A. Dynamic Priority Weighting
The system adapts feature weights based on user goals:

$$\text{Final Score} = \frac{\sum_{i=1}^{m} w_i \times s_i}{\sum_{i=1}^{m} w_i} \times 100\%$$

Where:
- $w_i$ = dynamic weight assigned to feature $i$ based on selected priority (e.g. *Fuel Economy* increases weights for Fuel Type, MPG, and Mileage).
- $s_i$ = similarity score for feature $i \in [0.0, 1.0]$.

### B. Categorical Feature Matching
- **Exact Match:** $s_{\text{cat}} = 1.0$ if $\text{car} = \text{pref}$.
- **Partial Match:** $s_{\text{cat}} \in [0.60, 0.90]$ for related configurations (e.g., CVT $\leftrightarrow$ Automatic = 0.85, AWD $\leftrightarrow$ 4WD = 0.90).
- **Wildcard / Any:** $s_{\text{cat}} = 1.0$ when the user has no specific preference.

### C. Numerical Similarity Formulation
Constrained distance similarity strictly bounded between 0.0 and 1.0:

$$s_{\text{num}} = \max\left(0.0, 1.0 - \frac{|\text{car\_value} - \text{preferred\_value}|}{\text{acceptable\_range}}\right)$$

### D. Intelligent Budget Compatibility
- **Within $[\text{Min}, \text{Max}]$:** $1.0$ (Optimal match).
- **Below Min Budget:** $0.80 - 0.98$ (Cost-effective alternative).
- **Above Max Budget:** Soft penalty decay up to 15% stretch, dropping rapidly to 0.0 beyond 25% over budget.

---

## 4. Personalized Recommendation Explanations (XAI)
Every recommendation generates interpretable reasoning:
- *"94% AI Match"*
- ✓ Comfortably within budget at $31,500 (Target: $45,000)
- ✓ Exact match for preferred SUV body style
- ✓ Matches preferred Hybrid powertrain (40 MPG rating)
- ✓ Equipped with All-Wheel Drive (AWD)
- ✓ Provides required 5-passenger seating capacity

---

## 5. Technology Stack

- **Core Algorithm:** Python 3.10+, NumPy, Pandas
- **Backend Server:** Flask, RESTful APIs
- **Frontend Dashboard:** HTML5, CSS3, JavaScript / React + Tailwind CSS + Lucide Icons + Recharts
- **Testing & Verification:** PyTest, Python standard `unittest`
- **Data Format:** CSV (`data/cars.csv`) with 185+ verified vehicle records

---

## 6. Project Directory Structure

```text
AutoMatch-AI/
├── app.py                     # Flask web server and REST API routes
├── requirements.txt           # Python dependency declarations
├── README.md                  # Complete technical & setup documentation
├── PROJECT_REPORT.md          # 17-section formal academic project report
├── .gitignore                 # Standard Python & web build ignore rules
│
├── data/
│   ├── cars.csv               # 185+ rich vehicle records dataset
│   └── generate_dataset.py    # Automated dataset generation script
│
├── models/
│   └── recommendation_engine.py  # Standalone CarRecommendationEngine class
│
├── utils/
│   ├── preprocessing.py       # Data validation, imputation & normalization
│   └── scoring.py             # Distance metrics & priority weight matrices
│
├── templates/
│   ├── index.html             # Main preference profiler & dashboard
│   ├── recommendations.html   # Results view with XAI explanations
│   └── compare.html           # Side-by-side vehicle comparison table
│
├── static/
│   ├── css/
│   │   └── style.css          # Responsive styling & design tokens
│   └── js/
│       └── script.js          # Interactive UI behaviors
│
├── results/
│   ├── recommendation_results.csv  # Pre-computed benchmark scenarios
│   ├── evaluation.txt              # Metric logs & coverage statistics
│   └── generate_evaluation.py      # Automated benchmark suite runner
│
└── tests/
    ├── test_recommendation.py # Unit tests for scoring & ranking
    └── test_preprocessing.py   # Unit tests for data cleaning & imputation
```

---

## 7. Installation & Running Instructions

### Windows / macOS / Linux Setup

1. **Clone or Download the Repository:**
   ```bash
   git clone YOUR_REPOSITORY_URL
   cd AutoMatch-AI
   ```

2. **Create a Virtual Environment:**
   ```bash
   # Windows
   python -m venv venv
   venv\Scripts\activate

   # macOS / Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install Dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Verify Dataset & Run Evaluation Benchmarks:**
   ```bash
   python results/generate_evaluation.py
   ```

5. **Start the Flask Web Application:**
   ```bash
   python app.py
   ```

6. **Open in Browser:**
   Navigate to `http://127.0.0.1:5000` (or the live app preview port).

---

## 8. Running Unit Tests

Run test suites using `unittest` or `pytest`:

```bash
# Using Python unittest
python -m unittest discover tests

# Or using pytest
pytest tests/
```

All 13 test cases will execute and verify mathematical bounds, clamped similarities, dynamic priority weight adjustments, and edge case resilience.

---

## 9. Evaluator Demonstration Walkthrough

When presenting AutoMatch AI to an evaluator:

1. **Step 1: Introduction** — State the project goal: DecodeLabs Project 3 (AI Recommendation Logic by Abdullah Zafar, Batch 2026).
2. **Step 2: Input Profiling** — Demonstrate selecting a scenario (e.g., Budget: $25k–$40k, Body: SUV, Fuel: Hybrid, Priority: Fuel Economy).
3. **Step 3: Weight Demonstration** — Explain how choosing "Fuel Economy" dynamically shifts weight to fuel type, MPG, and mileage.
4. **Step 4: Recommendation Results** — Point out the Top 5 ranked vehicles with compatibility percentages.
5. **Step 5: Explainable AI (XAI)** — Show the "Why Recommended" breakdown with checkmarks explaining exact feature alignments.
6. **Step 6: Vehicle Comparison** — Select 2–3 vehicles to compare specs in the side-by-side comparison matrix.
7. **Step 7: Code Inspection** — Highlight modular separation (`scoring.py`, `preprocessing.py`, `recommendation_engine.py`).

---

## 10. Author & Academic Information

- **Student:** Abdullah Zafar
- **Batch:** 2026
- **Program:** DecodeLabs Artificial Intelligence
- **Project:** Project 3 — AI Recommendation System
