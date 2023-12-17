const inventory = [
    { id: 1, name: 'Item 1', quantity: 3 },
    { id: 2, name: 'Item 2', quantity: 1 },
    { id: 3, name: 'Item 3', quantity: 0 },
    // Add more items as needed
  ];

  function updateInventory() {
    const inventoryElement = document.getElementById('inventory');
    inventoryElement.innerHTML = '';

    inventory.forEach(item => {
      const itemElement = document.createElement('div');
      itemElement.className = 'item';
      itemElement.innerText = `${item.name} (${item.quantity})`;
      inventoryElement.appendChild(itemElement);
    });
  }

  // Initial update
  updateInventory();