const $ = (selector) => document.querySelector(selector);

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    // Simple show/hide for small screens
    const isOpen = navLinks.style.display === 'flex';
    navLinks.style.display = isOpen ? 'none' : 'flex';
    navLinks.style.flexDirection = 'column';
    navLinks.style.gap = '10px';
    navLinks.style.position = 'absolute';
    navLinks.style.right = '4%';
    navLinks.style.top = '58px';
    navLinks.style.padding = '12px';
    navLinks.style.background = 'rgba(15, 23, 42, 0.9)';
    navLinks.style.border = '1px solid rgba(148, 163, 184, 0.18)';
    navLinks.style.borderRadius = '10px';
  });
}

// Smooth "Get Started" scroll (also works via anchor)
const getStartedBtn = $('#get-started-btn');
if (getStartedBtn) {
  getStartedBtn.addEventListener('click', (e) => {
    // Default anchor already scrolls smoothly via CSS; this ensures behavior if JS is used
    const target = document.getElementById('predict');
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
}

// Footer year
const yearSpan = $('#year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Prediction logic
const form = $('#predict-form');
const resultEl = $('#result');
if (form && resultEl) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // Read values safely
    const ph = parseFloat($('#ph')?.value || 'NaN');
    const turbidity = parseFloat($('#turbidity')?.value || 'NaN');
    const hardness = parseFloat($('#hardness')?.value || 'NaN'); // Included for completeness

    // Basic validation for numbers
    const invalid =
      Number.isNaN(ph) || Number.isNaN(turbidity) || Number.isNaN(hardness);
    if (invalid) {
      renderMessage('Please enter valid numeric values.', 'unsafe');
      return;
    }

    // Simulated rule-based "AI" decision:
    // Requirement example:
    // If pH between 6.5–8.5 AND turbidity < 5 => "Safe"; else "Unsafe"
    const isPhOk = ph >= 6.5 && ph <= 8.5;
    const isTurbidityOk = turbidity < 5;
    const isSafe = isPhOk && isTurbidityOk;

    // Show a short description with the values
    const details = `pH: ${ph.toFixed(2)}, Turbidity: ${turbidity.toFixed(
      2
    )}, Hardness: ${Number.isFinite(hardness) ? hardness.toFixed(0) : '-'}`;
    renderMessage(
      `${isSafe ? 'Safe' : 'Unsafe'} • ${details}`,
      isSafe ? 'safe' : 'unsafe'
    );
  });
}

/**
 * Renders a colored badge-style message.
 * @param {string} text
 * @param {'safe'|'unsafe'} type
 */
function renderMessage(text, type) {
  resultEl.innerHTML = `
    <span class="badge ${type}">
      ${type === 'safe' ? '✅' : '⚠️'} ${text}
    </span>
  `;
}