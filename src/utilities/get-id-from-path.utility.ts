import type { Article } from "@prisma/client";
import { ArticlesService } from "../services/articles.service";

export async function getArticleFromPath(): Promise<Article | undefined> {
    const pathParts = window.location.pathname.split("/");
    const id = pathParts[pathParts.length - 1] || undefined;

    if (!id) {
        console.error("No se encontró el parámetro ID en la URL")
        return
    }

    let article: Article | undefined;

    try {
        article = await ArticlesService.getById(id);
    } catch (error) {
        console.error("Error al obtener el artículo:", error);

        alert("No se pudo cargar el artículo");

        return undefined;
    }

    if (!article) {
        console.error("Artículo no encontrado")
        return
    }

    return article
}