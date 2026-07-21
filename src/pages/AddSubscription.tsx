import React, { useEffect, useState } from "react";
import InputField from "../components/InputField";
import type { Subscription } from "../types";
import { categories } from "../data";
import Button from "../components/Button";
import { supabase } from "../../utils/supabase";
import { useNavigate, useParams } from "react-router-dom";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft02Icon } from "@hugeicons/core-free-icons";
import ChipContainer from "../components/ChipContainer";

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
    <div className="w-full flex flex-col gap-8">
      <h1 className="font-primary text-3xl font-semibold flex items-center gap-4 text-light">
        <HugeiconsIcon icon={ArrowLeft02Icon} className="text-accent" />
        Add Subscription
      </h1>
      <form action="" className="w-full flex flex-col gap-8 items-center">
        <ChipContainer
          options={categories
            .filter((category) => category.categoryname !== "All")
            .map((category) => category.categoryname)}
          onChange={(value) => handleSelectChange("categoryName", value)}
          value={subscriptionData.categoryName}
        />
        <ChipContainer
          options={["Daily", "Monthly", "Yearly"]}
          className="justify-center"
          onChange={(value) => handleSelectChange("frequency", value)}
          value={subscriptionData.frequency}
        />
        <InputField
          label="Subscription Name"
          name="subscriptionName"
          onChange={handleInputChange}
          value={subscriptionData.subscriptionName}
          error={validationError}
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
        <InputField
          label="Date of Expiry"
          type="date"
          name="expiryDate"
          onChange={handleInputChange}
          value={subscriptionData.expiryDate}
        />
        <ChipContainer
          options={["Low", "Medium", "High"]}
          className="justify-center"
          onChange={(value) => handleSelectChange("priority", value)}
          value={subscriptionData.priority}
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
