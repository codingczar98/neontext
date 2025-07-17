// Neon Text Customizer Script

// Elements
const textarea = document.getElementById("mytextarea");
const savedText = document.getElementById("savedtext");
const fontButtons = document.querySelectorAll(".fonts");
const colorButtons = document.querySelectorAll(".colors");
const sizeButtons = document.querySelectorAll(".size");
const cssBox = document.getElementById("css-box");
const copyCssButton = document.getElementById("copyCssButton");
const generateCodeButton = document.getElementById("generateCode");

// Font families (fixed typos and spacing)
const fonts = [
  "Antic Didone, serif", "Roboto Condensed, sans-serif", "Oswald, sans-serif", "League Script, cursive",
  "Caveat, cursive", "Wallpoet, sans-serif", "Homemade Apple, cursive", "Modern Antiqua, serif",
  "Sassy Frass, cursive", "Alfa Slab One, serif", "Cinzel, serif", "Bebas Neue, sans-serif",
  "Raleway Dots, sans-serif", "Architects Daughter, cursive", "Cabin Sketch, sans-serif",
  "Lobster, sans-serif", "Great Vibes, cursive", "Abril Fatface, serif", "Bree Serif, serif",
  "Pacifico, cursive", "Roboto Slab, serif"
];

// Colors (fixed duplicate blue)
const colors = [
  'white', 'pink', 'rgb(21, 189, 21)', 'blue', 'purple', 'orange',
  'lightblue', 'gray', 'teal', 'crimson'
];

// Font size options
const sizes = ['3em', '4em', '5em'];

// Live preview
if (textarea && savedText) {
  textarea.addEventListener("input", () => {
    savedText.innerText = textarea.value;
  });
}

// Font change
fontButtons.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    savedText.style.fontFamily = fonts[i];
  });
});

// Color change
colorButtons.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    savedText.style.color = colors[i];
  });
});

// Size change
sizeButtons.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    savedText.style.fontSize = sizes[i] || '3em';
  });
});

// Generate CSS code
function generateCssCode() {
  const style = window.getComputedStyle(savedText);
  return [
    `font-family: ${style.fontFamily};`,
    `color: ${style.color};`,
    `font-size: ${style.fontSize};`
  ].join('\n');
}

// Display CSS code
function displayCssCode() {
  cssBox.value = generateCssCode();
}

// Copy CSS code to clipboard
function copyCssToClipboard() {
  displayCssCode();
  navigator.clipboard.writeText(cssBox.value)
    .then(() => {
      copyCssButton.classList.add('copied');
      setTimeout(() => copyCssButton.classList.remove('copied'), 1200);
    })
    .catch(err => {
      alert('Unable to copy CSS code.');
      console.error(err);
    });
}

// Event listeners
if (generateCodeButton) {
  generateCodeButton.addEventListener('click', displayCssCode);
}
if (copyCssButton) {
  copyCssButton.addEventListener('click', copyCssToClipboard);
}

// Initial preview and CSS box update
window.addEventListener('DOMContentLoaded', () => {
  displayCssCode();
  if (textarea) savedText.innerText = textarea.value;
});