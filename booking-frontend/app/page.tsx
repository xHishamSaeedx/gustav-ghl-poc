"use client";

import { useState } from "react";
import styles from "./page.module.css";

export default function BookingForm() {
  const [formData, setFormData] = useState({
    clientName: "",
    subaccountToken: "",
    subaccountLocationId: "",
    subaccountCalendarId: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setError("");

    try {
      const response = await fetch("http://localhost:8000/create-workflow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Booking Setup</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="clientName">Client Name</label>
          <input
            type="text"
            id="clientName"
            name="clientName"
            value={formData.clientName}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="subaccountToken">Subaccount Token</label>
          <input
            type="text"
            id="subaccountToken"
            name="subaccountToken"
            value={formData.subaccountToken}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="subaccountLocationId">Subaccount Location ID</label>
          <input
            type="text"
            id="subaccountLocationId"
            name="subaccountLocationId"
            value={formData.subaccountLocationId}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="subaccountCalendarId">Subaccount Calendar ID</label>
          <input
            type="text"
            id="subaccountCalendarId"
            name="subaccountCalendarId"
            value={formData.subaccountCalendarId}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className={styles.button}
          disabled={status === "loading"}
        >
          {status === "loading" ? "Processing..." : "Submit"}
        </button>
      </form>

      {status === "success" && (
        <div className={styles.success}>
          Success! Scenarios have been cloned, updated with client information,
          and placed in client's folder. Vapi tools and assistants have been
          created.
        </div>
      )}

      {status === "error" && (
        <div className={styles.error}>
          {error || "An error occurred. Please try again."}
        </div>
      )}
    </div>
  );
}
