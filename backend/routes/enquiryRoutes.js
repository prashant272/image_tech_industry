import express from "express";
import Enquiry from "../models/Enquiry.js";
import { verifyAdmin } from "../middleware/auth.js";

const router = express.Router();

// Submit new enquiry (public route)
router.post("/submit", async (req, res) => {
    try {
        const { name, company, email, phone, subject, message } = req.body;

        if (!name || !company || !email || !phone || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields"
            });
        }

        const enquiry = new Enquiry({
            name,
            company,
            email,
            phone,
            subject,
            message
        });

        await enquiry.save();

        res.status(201).json({
            success: true,
            message: "Enquiry submitted successfully",
            data: enquiry
        });
    } catch (error) {
        console.error("Error submitting enquiry:", error);
        res.status(500).json({
            success: false,
            message: "Failed to submit enquiry",
            error: error.message
        });
    }
});

// Get all enquiries (admin only)
router.get("/all", verifyAdmin, async (req, res) => {
    try {
        const enquiries = await Enquiry.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: enquiries.length,
            data: enquiries
        });
    } catch (error) {
        console.error("Error fetching enquiries:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch enquiries",
            error: error.message
        });
    }
});

// Update enquiry status (admin only)
router.put("/:id/status", verifyAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!["new", "read", "replied"].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status value"
            });
        }

        const enquiry = await Enquiry.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!enquiry) {
            return res.status(404).json({
                success: false,
                message: "Enquiry not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Status updated successfully",
            data: enquiry
        });
    } catch (error) {
        console.error("Error updating status:", error);
        res.status(500).json({
            success: false,
            message: "Failed to update status",
            error: error.message
        });
    }
});

// Delete enquiry (admin only)
router.delete("/:id", verifyAdmin, async (req, res) => {
    try {
        const { id } = req.params;

        const enquiry = await Enquiry.findByIdAndDelete(id);

        if (!enquiry) {
            return res.status(404).json({
                success: false,
                message: "Enquiry not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Enquiry deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting enquiry:", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete enquiry",
            error: error.message
        });
    }
});

export default router;
