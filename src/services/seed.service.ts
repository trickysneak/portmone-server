import { User } from '../models/User.js';
import { Category } from '../models/Category.js';
import { Transaction } from '../models/Transaction.js';

export const SeedService = {
  async reset() {
    await Promise.all([User.deleteMany({}), Category.deleteMany({}), Transaction.deleteMany({})]);
  },
  async seed(txCount = 30) {
    const user = await User.create({ fullName: 'Demo User', balance: 0 });

    const cats = await Category.insertMany([
      { userId: user._id, name: 'Продукты', icon: '🍎', type: 'debit' },
      { userId: user._id, name: 'Транспорт', icon: '🚌', type: 'debit' },
      { userId: user._id, name: 'Развлечения', icon: '🍺', type: 'debit' },
      { userId: user._id, name: 'Зарплата', icon: '💼', type: 'credit' },
    ]);

    const now = Date.now();
    let balance = 0;
    const txs = [];
    for (let i = 0; i < txCount; i++) {
      const dir = Math.random() > 0.25 ? 'debit' : 'credit';
      const cat = cats[dir === 'debit' ? Math.floor(Math.random()*3) : 3];
      const amount = Math.floor(Math.random() * 5000) + 100;
      const title = dir === 'debit' ? 'Покупка' : 'Поступление';
      const emoji = dir === 'debit' ? '🛒' : '💰';
      const createdAt = new Date(now - Math.floor(Math.random() * 14) * 86400000);
      txs.push({ userId: user._id, categoryId: cat._id, title, amount, direction: dir as any, emoji, createdAt, updatedAt: createdAt });
      balance += dir === 'debit' ? -amount : amount;
    }

    await Transaction.insertMany(txs);
    await User.updateOne({ _id: user._id }, { $set: { balance } });

    return { userId: user._id, categories: cats.length, transactions: txs.length, balance };
  }
};
