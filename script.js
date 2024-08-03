document.addEventListener('DOMContentLoaded', () => {
    const inventoryList = document.getElementById('inventory-list');
    const productForm = document.getElementById('product-form');
    const productNameInput = document.getElementById('product-name');
    const productQuantityInput = document.getElementById('product-quantity');
    const historyList = document.getElementById('history-list');
    const searchBar = document.getElementById('search-bar');
    const categoryForm = document.getElementById('category-form');
    const categoryNameInput = document.getElementById('category-name');
    const categoryList = document.getElementById('category-list');
    const exportBtn = document.getElementById('export-btn');

    let inventory = [];
    let history = [];
    let categories = [];

    // Cargar el inventario inicial desde un archivo JSON
    fetch('data/inventory.json')
        .then(response => response.json())
        .then(data => {
            inventory = data;
            renderInventory();
        });

    // Renderizar el inventario en la lista
    function renderInventory() {
        inventoryList.innerHTML = '';
        inventory.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - Cantidad: ${item.quantity}`;
            inventoryList.appendChild(li);
        });
    }

    // Renderizar el historial en la lista
    function renderHistory() {
        historyList.innerHTML = '';
        history.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.action} - Producto: ${item.name}, Cantidad: ${item.quantity}`;
            historyList.appendChild(li);
        });
    }

    // Renderizar las categorías en la lista
    function renderCategories() {
        categoryList.innerHTML = '';
        categories.forEach(category => {
            const li = document.createElement('li');
            li.textContent = category.name;
            categoryList.appendChild(li);
        });
    }

    // Manejar el envío del formulario para agregar productos
    productForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newProduct = {
            name: productNameInput.value,
            quantity: parseInt(productQuantityInput.value, 10)
        };
        inventory.push(newProduct);
        history.push({
            action: 'Agregado',
            name: newProduct.name,
            quantity: newProduct.quantity
        });
        renderInventory();
        renderHistory();
        checkLowStock();
        productForm.reset();
    });

    // Manejar el envío del formulario para agregar categorías
    categoryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newCategory = {
            name: categoryNameInput.value
        };
        categories.push(newCategory);
        renderCategories();
        categoryForm.reset();
    });

    // Manejar la búsqueda de productos
    searchBar.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredInventory = inventory.filter(item => item.name.toLowerCase().includes(searchTerm));
        renderFilteredInventory(filteredInventory);
    });

    function renderFilteredInventory(filteredInventory) {
        inventoryList.innerHTML = '';
        filteredInventory.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - Cantidad: ${item.quantity}`;
            inventoryList.appendChild(li);
        });
    }

    // Verificar el stock bajo
    function checkLowStock() {
        inventory.forEach(item => {
            if (item.quantity < 5) { // Umbral de stock bajo
                alert(`Stock bajo: ${item.name} - Cantidad: ${item.quantity}`);
            }
        });
    }

    // Exportar datos a PDF usando jsPDF
    exportBtn.addEventListener('click', () => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        let yPosition = 10;

        inventory.forEach(item => {
            doc.text(`Producto: ${item.name} Cantidad: ${item.quantity}`, 10, yPosition);
            yPosition += 10;
        });

        doc.save('inventario.pdf');
    });
});
