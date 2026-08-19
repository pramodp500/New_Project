import Database from 'better-sqlite3';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data', 'expenses.db');

let db: Database.Database | null = null;
let cachedTotalExpenses: number | null = null;

function getDb(): Database.Database {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');
    initializeDb(db);
  }
  return db;
}

function initializeDb(database: Database.Database) {
  database.exec(`
    CREATE TABLE IF NOT EXISTS expenses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      amount REAL NOT NULL,
      category TEXT NOT NULL,
      description TEXT NOT NULL,
      date TEXT NOT NULL,
      paymentMethod TEXT NOT NULL,
      createdAt TEXT NOT NULL DEFAULT (datetime('now')),
      updatedAt TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);

  const count = database.prepare('SELECT COUNT(*) as count FROM expenses').get() as { count: number };
  if (count.count === 0) {
    seedData(database);
  }
}

function seedData(database: Database.Database) {
  const insert = database.prepare(`
    INSERT INTO expenses (amount, category, description, date, paymentMethod, createdAt, updatedAt)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  const seedExpenses = [
    { amount: 45.99, category: 'Food', description: 'Lunch at downtown restaurant', date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-05`, paymentMethod: 'Credit Card' },
    { amount: 120.00, category: 'Travel', description: 'Uber rides for client meetings', date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-03`, paymentMethod: 'UPI' },
    { amount: 89.99, category: 'Shopping', description: 'New running shoes', date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-07`, paymentMethod: 'Debit Card' },
    { amount: 150.00, category: 'Bills', description: 'Monthly electricity bill', date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-01`, paymentMethod: 'Bank Transfer' },
    { amount: 35.00, category: 'Entertainment', description: 'Movie tickets for weekend', date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-08`, paymentMethod: 'Cash' },
    { amount: 200.00, category: 'Healthcare', description: 'Annual health checkup', date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-02`, paymentMethod: 'Credit Card' },
    { amount: 450.00, category: 'Education', description: 'Online course subscription', date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-04`, paymentMethod: 'Credit Card' },
    { amount: 25.50, category: 'Food', description: 'Grocery shopping at supermarket', date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-06`, paymentMethod: 'Debit Card' },
    { amount: 75.00, category: 'Other', description: 'Gym membership renewal', date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-09`, paymentMethod: 'UPI' },
    { amount: 320.00, category: 'Travel', description: 'Flight tickets for business trip', date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-10`, paymentMethod: 'Credit Card' },
    { amount: 65.00, category: 'Food', description: 'Dinner with team', date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-11`, paymentMethod: 'Cash' },
    { amount: 180.00, category: 'Shopping', description: 'Office supplies and accessories', date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-12`, paymentMethod: 'Debit Card' },
    { amount: 95.00, category: 'Bills', description: 'Internet and phone bill', date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-01`, paymentMethod: 'Bank Transfer' },
    { amount: 40.00, category: 'Entertainment', description: 'Concert tickets', date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-13`, paymentMethod: 'Credit Card' },
    { amount: 55.00, category: 'Food', description: 'Coffee and snacks for the week', date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-14`, paymentMethod: 'UPI' },
    { amount: 275.00, category: 'Healthcare', description: 'Dental cleaning and checkup', date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-15`, paymentMethod: 'Credit Card' },
    { amount: 120.00, category: 'Education', description: 'Programming book purchase', date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-16`, paymentMethod: 'Debit Card' },
    { amount: 30.00, category: 'Other', description: 'Parking fees for the week', date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-17`, paymentMethod: 'Cash' },
    { amount: 185.00, category: 'Travel', description: 'Hotel booking for conference', date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-18`, paymentMethod: 'Credit Card' },
    { amount: 42.00, category: 'Food', description: 'Takeout dinner from Italian place', date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-19`, paymentMethod: 'UPI' },
    { amount: 99.00, category: 'Shopping', description: 'Winter jacket purchase', date: `${currentYear}-${String(currentMonth + 2).padStart(2, '0')}-01`, paymentMethod: 'Credit Card' },
    { amount: 150.00, category: 'Bills', description: 'Monthly rent contribution', date: `${currentYear}-${String(currentMonth + 2).padStart(2, '0')}-01`, paymentMethod: 'Bank Transfer' },
    { amount: 55.00, category: 'Entertainment', description: 'Streaming service subscription', date: `${currentYear}-${String(currentMonth + 2).padStart(2, '0')}-05`, paymentMethod: 'Debit Card' },
    { amount: 300.00, category: 'Education', description: 'Workshop registration fee', date: `${currentYear}-${String(currentMonth + 2).padStart(2, '0')}-03`, paymentMethod: 'Credit Card' },
    { amount: 28.50, category: 'Food', description: 'Breakfast meeting at cafe', date: `${currentYear}-${String(currentMonth + 2).padStart(2, '0')}-07`, paymentMethod: 'Cash' },
  ];

  const transaction = database.transaction(() => {
    for (const expense of seedExpenses) {
      insert.run(
        expense.amount,
        expense.category,
        expense.description,
        expense.date,
        expense.paymentMethod,
        new Date().toISOString(),
        new Date().toISOString()
      );
    }
  });

  transaction();
}

// Expense CRUD operations
export function getAllExpenses(filters?: {
  search?: string;
  category?: string;
  dateFrom?: string;
  dateTo?: string;
  sortBy?: string;
  sortOrder?: string;
}) {
  const db = getDb();
  let query = 'SELECT * FROM expenses WHERE 1=1';
  const params: (string | number)[] = [];

  if (filters?.search) {
    query += ' AND (description LIKE ? OR category LIKE ?)';
    params.push(`%${filters.search}%`, `%${filters.search}%`);
  }

  if (filters?.category) {
    query += ' AND category = ?';
    params.push(filters.category);
  }

  if (filters?.dateFrom) {
    query += ' AND date >= ?';
    params.push(filters.dateFrom);
  }

  if (filters?.dateTo) {
    query += ' AND date <= ?';
    params.push(filters.dateTo);
  }

  if (filters?.sortBy === 'amount') {
    query += ` ORDER BY amount ${filters.sortOrder === 'desc' ? 'DESC' : 'ASC'}`;
  } else {
    query += ` ORDER BY date ${filters?.sortOrder === 'asc' ? 'ASC' : 'DESC'}, id DESC`;
  }

  return db.prepare(query).all(...params) as import('./types').Expense[];
}

export function getExpenseById(id: number) {
  const db = getDb();
  return db.prepare('SELECT * FROM expenses WHERE id = ?').get(id) as import('./types').Expense | undefined;
}

export function createExpense(data: import('./types').ExpenseFormData) {
  const db = getDb();
  const now = new Date().toISOString();
  const result = db.prepare(`
    INSERT INTO expenses (amount, category, description, date, paymentMethod, createdAt, updatedAt)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(data.amount, data.category, data.description, data.date, data.paymentMethod, now, now);

  return getExpenseById(result.lastInsertRowid as number)!;
}

export function updateExpense(id: number, data: import('./types').ExpenseFormData) {
  const db = getDb();
  const now = new Date().toISOString();
  db.prepare(`
    UPDATE expenses SET amount = ?, category = ?, description = ?, date = ?, paymentMethod = ?, updatedAt = ?
    WHERE id = ?
  `).run(data.amount, data.category, data.description, data.date, data.paymentMethod, now, id);

  return getExpenseById(id);
}

export function deleteExpense(id: number) {
  const db = getDb();
  const expense = getExpenseById(id);
  if (!expense) return false;
  db.prepare('DELETE FROM expenses WHERE id = ?').run(id);
  return true;
}

export function getDashboardStats() {
  const db = getDb();

  if (cachedTotalExpenses === null) {
    cachedTotalExpenses = (db.prepare('SELECT COALESCE(SUM(amount), 0) as total FROM expenses').get() as { total: number }).total;
  }
  const totalExpenses = cachedTotalExpenses;
  const numberOfExpenses = (db.prepare('SELECT COUNT(*) as count FROM expenses').get() as { count: number }).count;
  const highestExpense = (db.prepare('SELECT COALESCE(MAX(amount), 0) as max_amount FROM expenses').get() as { max_amount: number }).max_amount;
  const averageExpense = numberOfExpenses > 0 ? totalExpenses / numberOfExpenses : 0;

  const now = new Date();
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  const currentMonthExpenses = (db.prepare(
    "SELECT COALESCE(SUM(amount), 0) as total FROM expenses WHERE strftime('%Y-%m', date) = ?"
  ).get(currentMonth) as { total: number }).total;

  const expensesByCategory = db.prepare(
    'SELECT category, SUM(amount) as total FROM expenses GROUP BY category ORDER BY total DESC'
  ).all() as { category: string; total: number }[];

  const monthlyExpenses = db.prepare(`
    SELECT strftime('%Y-%m', date) as month, SUM(amount) as total
    FROM expenses
    GROUP BY month
    ORDER BY month DESC
    LIMIT 12
  `).all() as { month: string; total: number }[];

  const recentExpenses = db.prepare(
    'SELECT * FROM expenses ORDER BY date DESC, id DESC LIMIT 5'
  ).all() as import('./types').Expense[];

  return {
    totalExpenses,
    currentMonthExpenses,
    numberOfExpenses,
    highestExpense,
    averageExpense,
    expensesByCategory,
    monthlyExpenses: monthlyExpenses.reverse(),
    recentExpenses,
  };
}
