const mongoose = require('mongoose');
require('dotenv').config();

const User = require('../src/models/userModel');
const Category = require('../src/models/categoryModel');
const Product = require('../src/models/productModel');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Conectado a MongoDB');

    // Limpiar datos existentes
    await User.deleteMany({});
    await Category.deleteMany({});
    await Product.deleteMany({});
    console.log('🗑️  Datos anteriores eliminados');

    // Crear usuarios
    const users = await User.create([
      {
        name: 'Administrador',
        email: 'admin@test.com',
        password: '123456',
        role: 'admin'
      },
      {
        name: 'Usuario Test',
        email: 'user@test.com',
        password: '123456',
        role: 'user'
      }
    ]);
    console.log(`👥 ${users.length} usuarios creados`);

    // Crear categorías
    const categories = await Category.create([
      { name: 'Desayuno', description: 'Comidas para el desayuno' },
      { name: 'Almuerzo', description: 'Comidas para el almuerzo' },
      { name: 'Merienda', description: 'Snacks y meriendas' },
      { name: 'Cena', description: 'Comidas para la cena' },
      { name: 'Postre', description: 'Postres y dulces' }
    ]);
    console.log(`📂 ${categories.length} categorías creadas`);

    // Crear productos
    const products = await Product.create([
      {
        name: 'Tortilla de Espinacas',
        description: 'Tortilla nutritiva con espinacas frescas',
        category: categories[0]._id, // Desayuno
        ingredients: ['4 huevos', '1 taza de espinacas frescas', 'sal y pimienta'],
        instructions: ['Batir los huevos', 'Agregar espinacas', 'Cocinar a fuego medio'],
        cookingTime: '10 minutos',
        calories: '180 kcal',
        price: 250,
        createdBy: users[0]._id
      },
      {
        name: 'Ensalada César Fitness',
        description: 'Ensalada fresca con pollo a la plancha',
        category: categories[1]._id, // Almuerzo
        ingredients: ['Lechuga romana', 'Pollo a la plancha', 'Aderezo césar light'],
        instructions: ['Cortar lechuga', 'Cocinar pollo', 'Mezclar ingredientes'],
        cookingTime: '15 minutos',
        calories: '250 kcal',
        price: 380,
        createdBy: users[1]._id
      },
      {
        name: 'Smoothie Verde',
        description: 'Smoothie energizante con espinacas y frutas',
        category: categories[2]._id, // Merienda
        ingredients: ['1 taza espinacas', '1 banana', '1 manzana', 'agua de coco'],
        instructions: ['Lavar espinacas', 'Pelar frutas', 'Licuar todo', 'Servir frío'],
        cookingTime: '5 minutos',
        calories: '120 kcal',
        price: 180,
        createdBy: users[0]._id
      }
    ]);
    console.log(`🍽️  ${products.length} productos creados`);

    console.log('\n📊 Resumen:');
    console.log(`   👥 Usuarios: ${users.length}`);
    console.log(`   📂 Categorías: ${categories.length}`);
    console.log(`   🍽️  Productos: ${products.length}`);
    
    console.log('\n🔑 Credenciales de prueba:');
    console.log('   Admin: admin@test.com / 123456');
    console.log('   User:  user@test.com / 123456');

    console.log('\n🎉 Datos cargados exitosamente');
    process.exit(0);

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

if (require.main === module) {
  seedData();
}