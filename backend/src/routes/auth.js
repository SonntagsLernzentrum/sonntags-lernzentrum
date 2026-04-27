import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { pool } from '../config/db.js';
import { roleFromPersonalnummer, greeting } from '../utils/role.js';
const router=express.Router();
function token(payload){return jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'8h'});}
router.post('/parent-login',async(req,res)=>{
  const {customerNumber,password}=req.body;
  const [rows]=await pool.query('SELECT * FROM parents WHERE customer_number=?',[customerNumber]);
  const p=rows[0];
  if(!p || !await bcrypt.compare(password,p.password_hash)) return res.status(401).json({message:'Login fehlgeschlagen'});
  res.json({token:token({id:p.id,type:'parent',role:'parent',lastName:p.last_name}),user:{id:p.id,type:'parent',lastName:p.last_name,greeting:greeting()}});
});
router.post('/staff-login',async(req,res)=>{
  const {personnelNumber,password}=req.body;
  const [rows]=await pool.query('SELECT * FROM staff WHERE personnel_number=?',[personnelNumber]);
  const s=rows[0];
  const expected=roleFromPersonalnummer(personnelNumber||'');
  if(!s || expected!==s.role || !await bcrypt.compare(password,s.password_hash)) return res.status(401).json({message:'Login fehlgeschlagen'});
  res.json({token:token({id:s.id,type:'staff',role:s.role,lastName:s.last_name}),user:{id:s.id,type:'staff',role:s.role,lastName:s.last_name,greeting:greeting()}});
});
router.post('/forgot-password',async(req,res)=>{
  // In Produktion: Token speichern und Link per E-Mail senden.
  const resetToken=crypto.randomBytes(24).toString('hex');
  res.json({message:'Falls die E-Mail existiert, wurde ein Reset-Link gesendet.',demoResetToken:resetToken});
});
export default router;
