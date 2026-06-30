import React, { useState } from "react";
import InputField from "../components/InputField";
import type { Subscription } from "../types";
import Select from "../components/Select";
import { categories } from "../data";
import Button from "../components/Button";
import { supabase } from "../../utils/supabase";
import { useNavigate } from "react-router-dom";

function AddSubscription() {
  const [showError, setShowError] = useState<boolean>(false);

  const [subscriptionData, setSubscriptionData] = useState<Subscription>({
    subscriptionName: "",
    amount: 0,
    categoryName: "Other",
    dayofPayment: 1,
  });

  const requiredFields: Array<keyof Subscription> = [
    "subscriptionName",
    "categoryName",
    "amount",
    "dayofPayment",
  ];

  const isFormValid = requiredFields.every((field) => {
    const value = subscriptionData[field];
    return typeof value === "string"
      ? value.trim() !== ""
      : typeof value === "number"
        ? value > 0
        : !!value;
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setSubscriptionData((prevData) => {
      return { ...prevData, [name]: value };
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setSubscriptionData((prevData) => {
      return { ...prevData, [name]: value };
    });
  };

  const navigate = useNavigate();

  const validationError = showError ? "This field is required" : "";
  return (
    <div className="w-[60%] flex flex-col items-center gap-16">
      <h1 className="font-primary text-3xl font-semibold">Add Subscription</h1>
      <form action="" className="w-full grid grid-cols-2 items-center gap-8">
        <InputField
          label="Subscription Name"
          name="subscriptionName"
          onChange={handleInputChange}
          value={subscriptionData.subscriptionName}
          error={validationError}
        />
        <InputField
          label="Amount"
          name="amount"
          onChange={handleInputChange}
          value={subscriptionData.amount}
          type="number"
          error={validationError}
        />
        <Select
          label="Category"
          options={categories.map((category) => category.categoryname)}
          onChange={handleSelectChange}
          value={subscriptionData.categoryName}
          name="categoryName"
          error={validationError}
        />
        <InputField
          label="Day of Payment"
          name="dayofPayment"
          onChange={handleInputChange}
          value={subscriptionData.dayofPayment}
          error={validationError}
        />
        <InputField
          label="Date of Expiry"
          type="date"
          name="expiryDate"
          onChange={handleInputChange}
          value={subscriptionData.expiryDate}
        />
        <Select
          label="Frequency"
          options={["Daily", "Monthly", "Yearly"]}
          onChange={handleSelectChange}
          value={subscriptionData.frequency}
          name="frequency"
        />
        <Select
          label="Priority"
          options={["None", "Low", "Medium", "High"]}
          onChange={handleSelectChange}
          value={subscriptionData.priority}
          name="priority"
        />
      </form>
      <Button
        label="Add Subscription"
        onClick={async () => {
          if (isFormValid) {
            const { data, error } = await supabase
              .from("Subscriptions")
              .insert({
                subscription_name: subscriptionData.subscriptionName,
                category_name: subscriptionData.categoryName,
                amount: subscriptionData.amount,
                day_of_payment: subscriptionData.dayofPayment,
                expiry_date: subscriptionData.expiryDate,
                frequency: subscriptionData.frequency,
                priority: subscriptionData.priority,
              });

            if (error) {
              console.error("Supabase insert failed:", error);
            } else {
              console.log("Inserted row:", data);
            }
            setShowError(false);
            navigate("/");
          } else {
            setShowError(true);
          }
        }}
      />
    </div>
  );
}

export default AddSubscription;
