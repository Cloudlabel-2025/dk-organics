import mongoose from 'mongoose';

const careerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  requirements: { type: String, required: true },
  roleAndResponsibility: { type: String, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Any'], required: true },
  experience: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Career || mongoose.model('Career', careerSchema);
