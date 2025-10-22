export function getLocaleDate(date: string): string {
    return new Date(date).toLocaleDateString("es-AR", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}