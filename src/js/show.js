export default function showElement(element, isVisible) {
  element.classList.toggle('hidden', !isVisible);
}