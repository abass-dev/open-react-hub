const fs = require('fs-extra');
const path = require('path');

async function updateRegistry() {
  try {
    const registry = await fs.readJSON('registry.json');
    
    // Validate registry format
    if (!registry.components) {
      throw new Error('Invalid registry format');
    }

    // You can add additional validation or modification here

    // Write back the updated registry
    await fs.writeJSON('registry.json', registry, { spaces: 2 });
    console.log('Registry updated successfully');
  } catch (error) {
    console.error('Error updating registry:', error);
    process.exit(1);
  }
}

updateRegistry();