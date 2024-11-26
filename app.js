// app.js
const express = require('express');
const bodyParser = require('body-parser');
const { sequelize, Product, Category } = require('./models');  // models/index.js'yi dahil ediyoruz
const productService = require('./services/productService');
const categoryService = require('./services/categoryService');
const methodOverride = require('method-override');
const path = require('path');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // views dizinini ayarlamak için
app.use(express.static('public'));

// Method Override Middleware
app.use(methodOverride('_method'));

// Senkronizasyon
(async () => {
  // Veritabanını sıfırla ve ilişkileri oluştur
  await sequelize.sync({ force: true });
  console.log('Veritabanı senkronize edildi!');

  // Örnek kategoriler ve ürünler ekleyin
  const category1 = await Category.create({ name: 'Elektronik' });
  const category2 = await Category.create({ name: 'Mobilya' });

  await Product.create({ name: 'Telefon', price: 5000, categoryId: category1.id });
  await Product.create({ name: 'Koltuk', price: 2000, categoryId: category2.id });
})();

// Rotalar
// Tüm ürünleri listele
app.get('/products', async (req, res) => {
  const products = await productService.findAll();
  console.log(JSON.stringify(products, null, 2)); // Ürünlerin içeriğini kontrol et
  const categories = await categoryService.findAll();
  res.render('product', { products, categories });
});

// Yeni ürün ekle
app.post('/products', async (req, res) => {
  await productService.create(req.body);
  res.redirect('/products');
});

// Ürün güncelle
app.put('/products/:id', async (req, res) => {
  await productService.update(req.params.id, req.body);
  res.redirect('/products');
});

// Ürün sil
app.delete('/products/:id', async (req, res) => {
  await productService.delete(req.params.id);
  res.redirect('/products');
});

// Tüm kategorileri listele
app.get('/categories', async (req, res) => {
  const categories = await categoryService.findAll();
  res.render('categories', { categories });
});

// Yeni kategori ekle
app.post('/categories', async (req, res) => {
  await categoryService.create(req.body);
  res.redirect('/categories');
});

// Kategori Güncelleme
app.put('/categories/:id', async (req, res) => {
  await categoryService.update(req.params.id, req.body);
  res.redirect('/categories');
});

// Kategori Silme
app.delete('/categories/:id', async (req, res) => {
  await categoryService.delete(req.params.id);
  res.redirect('/categories');
});

app.listen(3000, () => console.log('Uygulama 3000 portunda çalışıyor!'));
