let expenses = [];
let editingId = null;

const form = document.getElementById("expense-form");
const list = document.getElementById("expense-list");
const totalAmountEl = document.getElementById("total-amount");
const totalCountEl = document.getElementById("total-count");
const searchInput = document.getElementById("search");
const categoryFilter = document.getElementById("filter-category");
const sortSelect = document.getElementById("sort");

function saveToLocalStorage() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

function loadFromLocalStorage() {
  const data = localStorage.getItem("expenses");
  if (data) expenses = JSON.parse(data);
}

function showModal(title, message, type = "success") {
  const modal = new bootstrap.Modal(document.getElementById("feedbackModal"));

  document.getElementById("modalTitle").textContent = title;
  document.getElementById("modalBody").textContent = message;

  const header = document.getElementById("modalHeader");
  header.className = "modal-header";

  if (type === "success") header.classList.add("bg-success", "text-white");
  if (type === "error") header.classList.add("bg-danger", "text-white");
  if (type === "info") header.classList.add("bg-primary", "text-white");

  modal.show();
}

searchInput.addEventListener("input", renderExpenses);
categoryFilter.addEventListener("change", renderExpenses);
sortSelect.addEventListener("change", renderExpenses);

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const description = document.getElementById("description").value.trim();
  const amount = parseFloat(document.getElementById("amount").value.replace(",", "."));
  const category = document.getElementById("category").value;
  const date = document.getElementById("date").value;

  if (!description || isNaN(amount) || amount <= 0 || !category || !date) {
    showModal("Errore", "Compila tutti i campi", "error");
    return;
  }

  expenses.push({
    id: Date.now(),
    description,
    amount,
    category,
    date
  });

  saveToLocalStorage();
  renderExpenses();
  updateSummary();
  form.reset();

  showModal("Successo", "Spesa aggiunta", "success");
});

function getCategoryBadge(category) {
  const map = {
    "Casa": "bg-casa",
    "Cibo": "bg-cibo",
    "Trasporti": "bg-trasporti",
    "Tempo libero": "bg-primary",
    "Salute": "bg-success",
    "Altro": "bg-secondary"
  };

  return `<span class="badge ${map[category]}">${category}</span>`;
}

function renderExpenses() {
  list.innerHTML = "";

  let filtered = expenses.filter(exp =>
    exp.description.toLowerCase().includes(searchInput.value.toLowerCase()) &&
    (categoryFilter.value === "" || exp.category === categoryFilter.value)
  );

  if (sortSelect.value === "amount") {
    filtered.sort((a, b) => b.amount - a.amount);
  }

  if (sortSelect.value === "date") {
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  const maxAmount = Math.max(...expenses.map(e => e.amount), 0);

  filtered.forEach(exp => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${exp.description}</td>
      <td class="${exp.amount === maxAmount ? "value-primary" : ""}">
        € ${exp.amount.toFixed(2)}
      </td>
      <td>${getCategoryBadge(exp.category)}</td>
      <td>${exp.date}</td>
      <td>
        <button class="btn btn-warning btn-sm" onclick="editExpense(${exp.id})">Modifica</button>
        <button class="btn btn-danger btn-sm" onclick="deleteExpense(${exp.id})">Elimina</button>
      </td>
    `;

    list.appendChild(row);
  });
}

function editExpense(id) {
  const exp = expenses.find(e => e.id === id);

  document.getElementById("edit-description").value = exp.description;
  document.getElementById("edit-amount").value = exp.amount;
  document.getElementById("edit-category").value = exp.category;
  document.getElementById("edit-date").value = exp.date;

  editingId = id;
  new bootstrap.Modal(document.getElementById("editModal")).show();
}

function saveEdit() {
  const exp = expenses.find(e => e.id === editingId);

  exp.description = document.getElementById("edit-description").value;
  exp.amount = parseFloat(document.getElementById("edit-amount").value);
  exp.category = document.getElementById("edit-category").value;
  exp.date = document.getElementById("edit-date").value;

  saveToLocalStorage();
  renderExpenses();
  updateSummary();

  bootstrap.Modal.getInstance(document.getElementById("editModal")).hide();
  showModal("Aggiornato", "Spesa modificata", "info");
}

function deleteExpense(id) {
  expenses = expenses.filter(e => e.id !== id);

  saveToLocalStorage();
  renderExpenses();
  updateSummary();

  showModal("Eliminata", "Spesa rimossa", "error");
}

function updateSummary() {
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  totalAmountEl.textContent = `€ ${total.toFixed(2)}`;
  totalCountEl.textContent = expenses.length;
}

loadFromLocalStorage();
renderExpenses();
updateSummary();