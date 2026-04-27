import express from 'express';
import { pool } from '../config/db.js';
import { auth, requireRole } from '../middleware/auth.js';
import { upload } from '../config/upload.js';
const router=express.Router();
router.use(auth,requireRole('parent'));
router.get('/dashboard',async(req,res)=>{
  const [[parent]]=await pool.query('SELECT id, salutation, first_name, last_name, payment_method FROM parents WHERE id=?',[req.user.id]);
  const [[nextInvoice]]=await pool.query('SELECT * FROM invoices WHERE parent_id=? AND status<>"bezahlt" ORDER BY due_date ASC LIMIT 1',[req.user.id]);
  res.json({parent,nextInvoice});
});
router.get('/invoices',async(req,res)=>{const [r]=await pool.query('SELECT * FROM invoices WHERE parent_id=? ORDER BY created_at DESC',[req.user.id]);res.json(r);});
router.get('/children',async(req,res)=>{
  const [r]=await pool.query('SELECT s.*, sc.name school, t.name tariff FROM students s LEFT JOIN schools sc ON s.school_id=sc.id LEFT JOIN tariffs t ON s.tariff_id=t.id WHERE s.parent_id=?',[req.user.id]);res.json(r);
});
router.get('/children/:id/documents',async(req,res)=>{const [r]=await pool.query('SELECT d.* FROM documents d JOIN students s ON d.student_id=s.id WHERE d.student_id=? AND s.parent_id=?',[req.params.id,req.user.id]);res.json(r);});
router.get('/contracts',async(req,res)=>{const [r]=await pool.query('SELECT c.*, s.name student FROM contracts c JOIN students s ON c.student_id=s.id WHERE s.parent_id=?',[req.user.id]);res.json(r);});
router.post('/requests',async(req,res)=>{const {contractId,type,message}=req.body; await pool.query('INSERT INTO requests(parent_id,contract_id,type,message) VALUES(?,?,?,?)',[req.user.id,contractId,type,message]); res.status(201).json({message:'Anfrage übermittelt'});});
router.put('/account',upload.single('proof'),async(req,res)=>{
  const b=req.body; const proof=req.file?.path||null;
  await pool.query('UPDATE parents SET salutation=?, first_name=?, last_name=?, email=?, phone=?, street=?, zip=?, city=?, sole_custody=?, proof_file=COALESCE(?,proof_file), payment_method=? WHERE id=?',[b.salutation,b.firstName,b.lastName,b.email,b.phone,b.street,b.zip,b.city,b.soleCustody==='true',proof,b.paymentMethod,req.user.id]);
  res.json({message:'Konto aktualisiert'});
});
export default router;
