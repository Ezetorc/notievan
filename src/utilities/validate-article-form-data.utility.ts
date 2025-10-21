export function validateArticleFormData(formData: FormData) {
  const title = String(formData.get("title") || "");
  const subtitle = String(formData.get("subtitle") || "");
  const description = String(formData.get("description") || "");
  const content = String(formData.get("content") || "");
  const thumbnailAlt = String(formData.get("thumbnailAlt") || "");
  const file = formData.get("thumbnailFile") as File | null;

  console.log(title, subtitle, description, content, thumbnailAlt, file);

  if (
    !title ||
    !subtitle ||
    !description ||
    !content ||
    !thumbnailAlt ||
    !file
  ) {
    throw new Error("Faltan campos obligatorios");
  }

  return { title, subtitle, description, content, thumbnailAlt, file };
}
