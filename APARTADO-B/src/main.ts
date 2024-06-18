const extraerLinksDeImágenes = (links: string): string[] => {
  const imgRegex = /<img[^>]+src="([^">]+)"/g;
  let linksDeImágenes: string[] = [];

  links.replace(imgRegex, (html, linksImágenes): string => {
    linksDeImágenes.push(linksImágenes);
    return html;
  });

  return linksDeImágenes;
};

const pintarDivImágenes = (links: string[]): void => {
  const divImágenes = document.getElementById("image-links");

  if (divImágenes && divImágenes instanceof HTMLDivElement) {
    divImágenes.innerHTML = "";

    const divPintado = document.createElement("div");
    divPintado.classList.add("image-divPintado");

    links.forEach((link): void => {
      const item = document.createElement("div");
      item.classList.add("image-item");

      const img = document.createElement("img");
      img.src = link;

      item.appendChild(img);
      divPintado.appendChild(item);
    });

    divImágenes.appendChild(divPintado);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const botónExtraer = document.getElementById("extraerBtn");
  const contenidoTextArea = document.getElementById(
    "textarea"
  ) as HTMLTextAreaElement;
  const divImágenes = document.getElementById("image-links");

  if (botónExtraer && contenidoTextArea && divImágenes) {
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
        divImágenes.innerHTML = "<p>No se encontraron enlaces a imágenes.</p>";
      }
    });
  }
});
