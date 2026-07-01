import React, { useEffect, useState } from "react";
import InputField from "../components/InputField";
import type { Subscription } from "../types";
import Select from "../components/Select";
import { categories } from "../data";
import Button from "../components/Button";
import { supabase } from "../../utils/supabase";
import { useNavigate, useParams } from "react-router-dom";

function AddSubscription() {
  const [showError, setShowError] = useState<boolean>(false);
  const { subscriptionId } = useParams<{ subscriptionId: string }>();
  const isEditMode = Boolean(subscriptionId);

  const [subscriptionData, setSubscriptionData] = useState<Subscription>({
    subscriptionName: "",
    amount: 0,
    categoryName: "Other",
    frequency: "Monthly",
    renewalDayOfMonth: 1,
  });

  const requiredFields: Array<keyof Subscription> = [
    "subscriptionName",
    "categoryName",
    "amount",
    ...(subscriptionData.frequency === "Monthly"
      ? (["renewalDayOfMonth"] as const)
      : subscriptionData.frequency === "Yearly"
        ? (["renewalDate"] as const)
        : []),
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

  const handleAddSubcription = async () => {
    const subscriptionToInsert = {
      subscription_name: subscriptionData.subscriptionName,
      category_name: subscriptionData.categoryName,
      amount: subscriptionData.amount,
      renewal_day_of_month: subscriptionData.renewalDayOfMonth,
      renewal_date: subscriptionData.renewalDate,
      expiry_date: subscriptionData.expiryDate,
      frequency: subscriptionData.frequency,
      priority: subscriptionData.priority,
    };

    if (isEditMode) {
      const { error } = await supabase
        .from("Subscriptions")
        .update(subscriptionToInsert)
        .eq("id", subscriptionId);
      if (error) console.log("Error updating subscription:", error);
    } else {
      const { error } = await supabase
        .from("Subscriptions")
        .insert(subscriptionToInsert);
      if (error) console.log("Error updating subscription:", error);
    }

    setShowError(false);
  };

  useEffect(() => {
    if (subscriptionId) {
      const fetchSubscription = async () => {
        const { data, error } = await supabase
          .from("Subscriptions")
          .select("*")
          .eq("id", subscriptionId)
          .single();

        if (data) {
          setSubscriptionData({
            subscriptionName: data.subscription_name,
            categoryName: data.category_name,
            amount: data.amount,
            frequency: data.frequency,
            renewalDayOfMonth: data.renewal_day_of_month,
            renewalDate: data.renewal_date,
            expiryDate: data.expiry_date,
            priority: data.priority,
          });
        } else {
          console.error("Error fetching subscription:", error);
        }
      };

      fetchSubscription();
    }
  }, []);

  return (
    <div className="w-[60%] flex flex-col items-center gap-16">
      <h1 className="font-primary text-3xl font-semibold">Add Subscription</h1>
      <form action="" className="w-full grid grid-cols-2 gap-8 items-start">
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
        {subscriptionData.frequency === "Monthly" && (
          <InputField
            label="Renewal Day of Month"
            name="renewalDayOfMonth"
            onChange={handleInputChange}
            value={subscriptionData.renewalDayOfMonth}
            error={validationError}
          />
        )}
        {subscriptionData.frequency === "Yearly" && (
          <InputField
            label="Renewal Date"
            type="date"
            name="renewalDate"
            onChange={handleInputChange}
            value={subscriptionData.renewalDate}
            error={validationError}
          />
        )}
        <Select
          label="Priority"
          options={["None", "Low", "Medium", "High"]}
          onChange={handleSelectChange}
          value={subscriptionData.priority}
          name="priority"
        />
      </form>
      <Button
        label={isEditMode ? "Update Subscription" : "Add Subscription"}
        onClick={async () => {
          if (isFormValid) {
            await handleAddSubcription();
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
