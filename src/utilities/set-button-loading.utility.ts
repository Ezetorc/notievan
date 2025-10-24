export function setButtonLoading($button: HTMLButtonElement) {
    $button.textContent = "Cargando..."
    $button.disabled = true
}