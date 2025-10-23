import EasyMDE from "easymde";
import "easymde/dist/easymde.min.css";

export class MarkdownEditor extends HTMLElement {
    private editor?: EasyMDE;
    private textarea!: HTMLTextAreaElement;

    connectedCallback() {
        this.textarea = document.createElement("textarea");
        this.appendChild(this.textarea);

        this.editor = new EasyMDE({
            element: this.textarea,
            placeholder: this.getAttribute("placeholder") || "Escribí algo...",
            spellChecker: false,
            autofocus: this.hasAttribute("autofocus"),
            minHeight: "500px",
            toolbar: [
                "preview",
                "|",
                "bold",
                "italic",
                "heading",
                "|",
                "quote",
                "unordered-list",
                "ordered-list",
                "|",
                "link",
                "image",
                "table",
                "|",
                "guide",
            ],
        });

        this.editor.codemirror.getWrapperElement().style.fontSize = "24px";
        this.editor.codemirror.getWrapperElement().style.lineHeight = "1.6";
    }

    disconnectedCallback() {
        this.editor?.toTextArea();
        this.editor = undefined;
    }

    get value(): string {
        return this.editor?.value().trimEnd().trimStart() || "";
    }

    set value(val: string) {
        if (this.editor) this.editor.value(val);
    }
}

if (!customElements.get("markdown-editor")) {
    customElements.define("markdown-editor", MarkdownEditor);
}
