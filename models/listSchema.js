import mongoose, { Schema } from 'mongoose';

const listSchema = mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  genre: { type: String, required: true },
  contents: [{ type: Schema.Types.ObjectId, ref: 'Content' }],
});

const List = mongoose.model('List', listSchema);
export default List;
