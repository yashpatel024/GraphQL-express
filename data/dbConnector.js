import mongoose from 'mongoose';

async function connectMongoDB() {
  try {
    await mongoose.connect('mongodb://localhost:27017/widgets');
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.log('Error connecting to MongoDB:', error);
  }
}

connectMongoDB();

const widgetSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  soldout: String,
  inventory: Number,
  stores: Array,
});

const Widget = mongoose.model('Widget', widgetSchema);

export { Widget };
