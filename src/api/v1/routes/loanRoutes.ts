import { Router } from 'express';
import { getLoans, createLoan, updateLoanStatus } from '../controllers/loanController';

const router = Router();

// Define the API routes
router.post("/loans", createLoan);
router.put("/loans/:id/review", updateLoanStatus);
router.get("/loans", getLoans);
router.put("/loans/:id/approve", updateLoanStatus);

export default router;
