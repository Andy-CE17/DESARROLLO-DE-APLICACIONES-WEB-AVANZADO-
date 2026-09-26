document.addEventListener("DOMContentLoaded", () => {
  M.Sidenav.init(document.querySelectorAll(".sidenav"));
  M.FormSelect.init(document.querySelectorAll("select"));
  M.CharacterCounter.init(document.querySelectorAll("[data-length]"));
  M.updateTextFields();

  document.querySelectorAll("[data-delete-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      const confirmed = window.confirm("¿Deseas eliminar esta publicación? Esta acción no se puede deshacer.");
      if (!confirmed) event.preventDefault();
    });
  });

  const imageInput = document.querySelector("#imageUrl");
  const imageFileInput = document.querySelector("#imageFile");
  const previewImage = document.querySelector("#previewImg");
  const previewPlaceholder = document.querySelector(".preview-placeholder");

  const showPreview = (source) => {
    if (!previewImage) return;

    if (!source) {
      previewImage.hidden = true;
      previewImage.removeAttribute("src");
      if (previewPlaceholder) previewPlaceholder.hidden = false;
      return;
    }

    previewImage.src = source;
    previewImage.hidden = false;
    if (previewPlaceholder) previewPlaceholder.hidden = true;
  };

  if (imageInput && previewImage) {
    const updatePreview = () => {
      const url = imageInput.value.trim();
      showPreview(url);
    };

    imageInput.addEventListener("input", updatePreview);
    previewImage.addEventListener("error", () => {
      showPreview("");
    });
  }

  if (imageFileInput && previewImage) {
    imageFileInput.addEventListener("change", () => {
      const [file] = imageFileInput.files;
      if (!file) {
        showPreview(imageInput?.value.trim() || "");
        return;
      }

      showPreview(URL.createObjectURL(file));
    });
  }
});
