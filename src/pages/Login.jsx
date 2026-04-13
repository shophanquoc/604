  

export default function Login() {
  

  const login = async () => { 
    
    alert("Login success");
  };

  return (
    <div>
      <input placeholder="email"   />
      <input type="password"   />
      <button onClick={login}>Login</button>
    </div>
  );
}