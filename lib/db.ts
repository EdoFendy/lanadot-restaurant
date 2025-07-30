import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'menu.db');
const db = new Database(dbPath);

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Create tables
const createTables = () => {
  // Menu categories table
  db.exec(`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      display_order INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Menu items table
  db.exec(`
    CREATE TABLE IF NOT EXISTS menu_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      category_id INTEGER,
      price REAL,
      display_order INTEGER DEFAULT 0,
      is_available INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE SET NULL
    )
  `);

  // Menu item images table
  db.exec(`
    CREATE TABLE IF NOT EXISTS menu_item_images (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      menu_item_id INTEGER NOT NULL,
      image_path TEXT NOT NULL,
      image_alt TEXT,
      display_order INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (menu_item_id) REFERENCES menu_items (id) ON DELETE CASCADE
    )
  `);

  // Admin users table (simple authentication)
  db.exec(`
    CREATE TABLE IF NOT EXISTS admin_users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Insert default categories
  const insertCategory = db.prepare(`
    INSERT OR IGNORE INTO categories (name, display_order) VALUES (?, ?)
  `);
  
  insertCategory.run('Antipasti', 1);
  insertCategory.run('Primi', 2);
  insertCategory.run('Carne', 3);
  insertCategory.run('Pesce e Crudité', 4);
  insertCategory.run('Dolci', 5);
  insertCategory.run('Vini', 6);
};

// Initialize database
createTables();

// Menu item queries
export const menuQueries = {
  // Get all categories with their menu items
  getAllCategoriesWithItems: db.prepare(`
    SELECT 
      c.id as category_id,
      c.name as category_name,
      c.display_order as category_order,
      mi.id as item_id,
      mi.title as item_title,
      mi.description as item_description,
      mi.price as item_price,
      mi.display_order as item_order,
      mi.is_available as item_available
    FROM categories c
    LEFT JOIN menu_items mi ON c.id = mi.category_id AND mi.is_available = 1
    ORDER BY c.display_order, mi.display_order
  `),

  // Get all categories
  getAllCategories: db.prepare(`
    SELECT * FROM categories ORDER BY display_order
  `),

  // Get menu items by category
  getItemsByCategory: db.prepare(`
    SELECT * FROM menu_items 
    WHERE category_id = ? AND is_available = 1 
    ORDER BY display_order
  `),

  // Get all menu items (admin)
  getAllItems: db.prepare(`
    SELECT 
      mi.*,
      c.name as category_name
    FROM menu_items mi
    LEFT JOIN categories c ON mi.category_id = c.id
    ORDER BY c.display_order, mi.display_order
  `),

  // Get single menu item with images
  getItemWithImages: db.prepare(`
    SELECT 
      mi.*,
      c.name as category_name
    FROM menu_items mi
    LEFT JOIN categories c ON mi.category_id = c.id
    WHERE mi.id = ?
  `),

  // Get images for menu item
  getItemImages: db.prepare(`
    SELECT * FROM menu_item_images 
    WHERE menu_item_id = ? 
    ORDER BY display_order
  `),

  // Insert new menu item
  insertMenuItem: db.prepare(`
    INSERT INTO menu_items (title, description, category_id, price, display_order, is_available)
    VALUES (?, ?, ?, ?, ?, ?)
  `),

  // Update menu item
  updateMenuItem: db.prepare(`
    UPDATE menu_items 
    SET title = ?, description = ?, category_id = ?, price = ?, display_order = ?, is_available = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `),

  // Delete menu item
  deleteMenuItem: db.prepare(`
    DELETE FROM menu_items WHERE id = ?
  `),

  // Insert menu item image
  insertItemImage: db.prepare(`
    INSERT INTO menu_item_images (menu_item_id, image_path, image_alt, display_order)
    VALUES (?, ?, ?, ?)
  `),

  // Delete menu item images
  deleteItemImages: db.prepare(`
    DELETE FROM menu_item_images WHERE menu_item_id = ?
  `),

  // Delete specific image
  deleteImage: db.prepare(`
    DELETE FROM menu_item_images WHERE id = ?
  `),

  // Admin user authentication
  getAdminUser: db.prepare(`
    SELECT * FROM admin_users WHERE username = ?
  `),

  // Insert admin user
  insertAdminUser: db.prepare(`
    INSERT INTO admin_users (username, password_hash) VALUES (?, ?)
  `)
};

export default db; 