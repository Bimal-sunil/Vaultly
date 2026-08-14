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
import DatePicker from "../components/DatePicker";
import { parseDate } from "@internationalized/date";
import HeroInput from "../components/HeroInput";
import { isSubscriptionExpired } from "../helper";
import ToggleGroup from "../components/ToggleGroup";
import Switch from "../components/Switch";
import Slider from "../components/Slider";

function AddSubscription() {
  const [showError, setShowError] = useState<boolean>(false);
  const { subscriptionId } = useParams<{ subscriptionId: string }>();
  const [showExpiry, setShowExpiry] = useState<boolean>(false);
  const isEditMode = Boolean(subscriptionId);

  const [subscriptionData, setSubscriptionData] = useState<Subscription>({
    isActive: true,
    subscriptionName: "",
    amount: 0,
    categoryName: "Other",
    frequency: "Monthly",
    renewalDayOfMonth: 1,
    priority: "Low",
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

  const handleInputChange = (name: string, value: string | null) => {
    setSubscriptionData((prevData) => {
      return { ...prevData, [name]: value };
    });
  };

  const handleSelectChange = (name: string, value: any) => {
    setSubscriptionData((prevData) => {
      return { ...prevData, [name]: value };
    });
  };

  const navigate = useNavigate();

  const validationError = showError ? "This field is required" : "";

  const handleAddSubcription = async () => {
    const isExpired = subscriptionData.expiryDate
      ? isSubscriptionExpired(subscriptionData.expiryDate)
      : false;

    const subscriptionToInsert = {
      is_active: !isExpired,
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
            isActive: data.is_active,
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
      <h1
        className="font-primary text-3xl font-semibold flex items-center gap-4 text-light"
        onClick={() => navigate("/")}
      >
        <HugeiconsIcon icon={ArrowLeft02Icon} className="text-accent" />
        Add Subscription
      </h1>
      <form action="" className="w-full flex flex-col gap-8 items-center">
        <HeroInput
          icon={
            categories.find(
              (category) =>
                category.categoryname === subscriptionData.categoryName,
            )?.icon
          }
          value={subscriptionData.amount}
          onChange={(value) => handleSelectChange("amount", value)}
          label="Amount"
          autoFocus={true}
        />
        <ChipContainer
          label="Category"
          options={categories
            .filter((category) => category.categoryname !== "All")
            .map((category) => category.categoryname)}
          onChange={(value) => handleSelectChange("categoryName", value)}
          value={subscriptionData.categoryName}
        />
        <ToggleGroup
          options={[
            { label: "Daily", value: "Daily" },
            { label: "Monthly", value: "Monthly" },
            { label: "Yearly", value: "Yearly" },
          ]}
          onChange={(value) => handleSelectChange("frequency", value)}
          label="Billing Frequency"
          value={subscriptionData.frequency}
        />
        <InputField
          label="Subscription Name"
          name="subscriptionName"
          onChange={(e) => handleInputChange(e.target.name, e.target.value)}
          value={subscriptionData.subscriptionName}
          error={validationError}
        />
        {subscriptionData.frequency === "Monthly" && (
          <Slider
            label="When is your next payment?"
            formatOutput={(value) => `Day ${value}`}
            minValue={1}
            maxValue={31}
            onChange={(value) =>
              handleSelectChange(
                "renewalDayOfMonth",
                typeof value === "number" ? value : value[0],
              )
            }
            value={subscriptionData.renewalDayOfMonth || 1}
          />
        )}
        {subscriptionData.frequency === "Yearly" && (
          <DatePicker
            label="Renewal Date"
            onChange={(value) => {
              handleSelectChange("renewalDate", value ? value.toString() : "");
              handleInputChange("renewalDayOfMonth", null);
            }}
            value={
              subscriptionData.renewalDate
                ? parseDate(subscriptionData.renewalDate)
                : null
            }
          />
        )}
        <div className="w-full flex items-center justify-between">
          <span className="p text-accent-bg">Set Expiry Date</span>
          <Switch onChange={(isSelected) => setShowExpiry(isSelected)} />
        </div>
        {showExpiry && (
          <DatePicker
            label="Date of Expiry"
            onChange={(value) =>
              handleSelectChange("expiryDate", value ? value.toString() : "")
            }
            value={
              subscriptionData.expiryDate
                ? parseDate(subscriptionData.expiryDate)
                : null
            }
          />
        )}
        <ToggleGroup
          options={[
            { label: "Low", value: "Low" },
            { label: "Medium", value: "Medium" },
            { label: "High", value: "High" },
          ]}
          onChange={(value) => handleSelectChange("priority", value)}
          label="Priority"
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
