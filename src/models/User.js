import mongoose from 'mongoose';

const CustomerUserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userType: { type: String, required: true, value: "customer" },
    phone: { type: Number, required: false, default: '' }
});

const DriverUserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userType: { type: String, required: true, value: "driver" },
    licenseNumber: { type: String, required: false, default: '' },
    licenseVerified: { type: Boolean, required: false, default: "false", value: "true" || "false" },
    phone: { type: Number, required: false, default: '' },
    region: { type: String, required: false, default: '' },
    status: { type: String, required: false, default: "not active", value: "not active" || "active" || "suspended" || "rejected" },
    active: { type: Boolean, required: false, default: "false", value: "true" || "false" }
});

const ManagerUserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userType: { type: String, required: true, value: "customer" },
    phone: { type: Number, required: false, default: '' }
});

export const CustomerUser = mongoose.models.CustomerUserSchema || mongoose.model('CustomerUser', CustomerUserSchema);
export const DriverUser = mongoose.models.DriverUserSchema || mongoose.model('DriverUser', DriverUserSchema);
export const ManagerUser = mongoose.models.ManagerUserSchema || mongoose.model('ManagerUser', ManagerUserSchema);
