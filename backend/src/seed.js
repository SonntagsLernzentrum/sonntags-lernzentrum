import bcrypt from 'bcryptjs';
import { pool } from './config/db.js';
const hash=await bcrypt.hash('Start123!',10);
await pool.query('INSERT IGNORE INTO staff(personnel_number,password_hash,role,salutation,first_name,last_name,email) VALUES ?',[ [
 ['LV432085',hash,'verwaltung','Herr','Jason','Sonntag','leitung@example.com'],
 ['L658934',hash,'lehrer','Herr','Max','Lehrer','lehrer@example.com'],
 ['B45385',hash,'buchhaltung','Frau','Berta','Buchhaltung','buchhaltung@example.com']
] ]);
await pool.query('INSERT IGNORE INTO parents(customer_number,password_hash,salutation,first_name,last_name,email,phone,street,zip,city,payment_method) VALUES(?,?,?,?,?,?,?,?,?,?,?)',['K10001',hash,'Frau','Maria','Mustermann','maria@example.com','0911 123456','Musterstr. 1','90402','Nürnberg','Rechnung 14 Tage']);
await pool.query('INSERT IGNORE INTO schools(id,name,type) VALUES(1,?,?)',['Johann Daniel Preissler Mittelschule','Mittelschule']);
await pool.query('INSERT IGNORE INTO tariffs(id,name) VALUES(1,?),(2,?),(3,?),(4,?),(5,?),(6,?),(7,?)',['LernBasis','FörderPlus','ChancenPass+','Individuell','BuT','Sozialtarif','Standard']);
await pool.query('INSERT IGNORE INTO students(id,parent_id,name,birthdate,class_name,school_id,school_type,tariff_id,subject) VALUES(1,1,?,?,?,?,?,?,?)',['Max','2013-05-10','6',1,'Mittelschule',2,'Mathematik']);
await pool.query('INSERT IGNORE INTO contracts(contract_number,type,student_id,subject,tariff,start_date,end_date) VALUES(?,?,?,?,?,?,?)',['NH4-836','Nachhilfe',1,'Mathematik','FörderPlus','2026-02-14','2026-07-31']);
await pool.query('INSERT IGNORE INTO invoices(parent_id,invoice_number,title,amount,travel_zone_amount,travel_zone,total,due_date,status) VALUES(?,?,?,?,?,?,?,?,?)',[1,'RE-2604-001','Einzelstunde Nachhilfe Mittelschule',35,0,1,35,'2026-05-03','offen']);
console.log('Seed fertig. Standardpasswort: Start123!');
process.exit(0);
