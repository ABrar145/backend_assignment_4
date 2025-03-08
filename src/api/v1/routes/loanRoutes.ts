import { Router } from 'express';
import { getLoans, createLoan, updateLoanStatus } from '../controllers/loanController';
import authenticate from '../middleware/authenticate'; 

const router = Router();

// Define the API routes
router.post("/loans",authenticate, createLoan);
router.put("/loans/:id/review", authenticate,updateLoanStatus);
router.get("/loans",authenticate, getLoans);
router.put("/loans/:id/approve",authenticate, updateLoanStatus);

export default router;
