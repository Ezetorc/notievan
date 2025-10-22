export function $(selector: string) {
    return document.querySelector(selector) as HTMLElement | null
}