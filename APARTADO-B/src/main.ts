const extraerLinksDeImágenes = (links: string): string[] => {
  const imgRegex = /<img[^>]+src="([^">]+)"/g;
  let linksEncontrados: RegExpExecArray | null;
  let linksDeImágenes: string[] = [];

  while ((linksEncontrados = imgRegex.exec(links)) !== null) {
    linksDeImágenes.push(linksEncontrados[1]);
  }

  return linksDeImágenes;
};

const pintarDivImágenes = (links: string[]): void => {
  const container = document.getElementById("image-links");

  if (container && container instanceof HTMLDivElement) {
    container.innerHTML = "";

    const divPintado = document.createElement("div");
    divPintado.classList.add("image-divPintado");

    links.forEach((link) => {
      const item = document.createElement("div");
      item.classList.add("image-item");

      const img = document.createElement("img");
      img.src = link;

      item.appendChild(img);
      divPintado.appendChild(item);
    });

    container.appendChild(divPintado);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const botónExtraer = document.getElementById("extraerBtn");
  const contenidoTextArea = document.getElementById(
    "textarea"
  ) as HTMLTextAreaElement;
  const linksDeImágenesContainer = document.getElementById("image-links");

  if (botónExtraer && contenidoTextArea && linksDeImágenesContainer) {
    botónExtraer.addEventListener("click", () => {
      const contenidoTextarea = contenidoTextArea.value.trim();
      if (contenidoTextarea === "") {
        alert(
          "El área de texto está vacía. Por favor, pega el contenido HTML."
        );
        return;
      }

      const linksDeImágenes = extraerLinksDeImágenes(contenidoTextarea);

      if (linksDeImágenes.length > 0) {
        pintarDivImágenes(linksDeImágenes);
      } else {
        linksDeImágenesContainer.innerHTML =
          "<p>No se encontraron enlaces a imágenes.</p>";
      }
    });
  }
});
