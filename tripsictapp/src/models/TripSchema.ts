import mongoose, { Document, Schema } from "mongoose";

interface ITrip extends Document {
  name: string;
  date: string;
  description: string;
  location: string;
  user: mongoose.Schema.Types.ObjectId;  // Reference to User
}

const TripSchema = new Schema<ITrip>({
  name: { type: String, required: true },
  date: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },  // Reference to User
});

export const Trip = mongoose.models.Trip ?? mongoose.model<ITrip>("Trip", TripSchema);
