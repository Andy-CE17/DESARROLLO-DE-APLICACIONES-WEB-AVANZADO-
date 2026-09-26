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
  const previewImage = document.querySelector("#previewImg");

  if (imageInput && previewImage) {
    const updatePreview = () => {
      const url = imageInput.value.trim();
      if (!url) {
        previewImage.hidden = true;
        previewImage.removeAttribute("src");
        return;
      }
      previewImage.src = url;
      previewImage.hidden = false;
    };

    imageInput.addEventListener("input", updatePreview);
    previewImage.addEventListener("error", () => {
      previewImage.hidden = true;
    });
  }
});
