const API=import.meta.env.VITE_API_URL||'http://localhost:4000/api';
export function getToken(){return localStorage.getItem('token');}
export function setSession(data){localStorage.setItem('token',data.token);localStorage.setItem('user',JSON.stringify(data.user));}
export function user(){try{return JSON.parse(localStorage.getItem('user')||'null')}catch{return null}}
export function logout(){localStorage.clear();location.href='/';}
export async function api(path,{method='GET',body,form=false}={}){
 const res=await fetch(API+path,{method,headers:{...(form?{}:{'Content-Type':'application/json'}),...(getToken()?{Authorization:'Bearer '+getToken()}:{})},body:form?body:body?JSON.stringify(body):undefined});
 if(!res.ok) throw new Error((await res.json().catch(()=>({message:'Fehler'}))).message);
 return res.json();
}
