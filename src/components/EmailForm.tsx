import React, { useState } from "react";

const EmailForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      setMessage("Please enter your email address.");
      return;
    }

    try {
    const res = await fetch('http://localhost:4000/api/users/sendemail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Reset link sent to your email.");
      } else {
        setMessage("❌ Error: " + data);
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="email-form-container">
      <form onSubmit={handleSubmit} className="email-form">
        <label htmlFor="email">Enter your email to receive the reset link:</label>
        <input
          type="email"
          id="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Send Link</button>
      </form>
      {message && <p style={{ marginTop: '10px', color: message.startsWith("✅") ? "green" : "red" }}>{message}</p>}
    </div>
  );
};

export default EmailForm;
