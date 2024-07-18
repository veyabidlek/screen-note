import mongoose, { Document, Schema, Types } from "mongoose";
import { IUser } from "../../auth/models/User";
export interface INote extends Document {
  title: string;
  content: string;
  date: Date;
  user: Types.ObjectId;
}

const NoteSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String },
  date: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const Note = mongoose.model<INote>("Note", NoteSchema);

export default Note;
