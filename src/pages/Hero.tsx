import React, { useEffect, useMemo, useState } from "react";
import {
  findRenewingSoonCount,
  findTotalAmount,
  formatAmount,
  formatDate,
} from "../helper";
import Card from "../components/Card";
import { categories } from "../data";
import Chip from "../components/Chip";
import SubscriptionCard from "../components/SubscriptionCard";
import { supabase } from "../../utils/supabase";
import { useNavigate } from "react-router-dom";
import type { CategoryName } from "../types";
import CalendarStrip from "../components/CalendarStrip";

function Hero() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryName>("All");
  const fetchSubscriptionData = async () => {
    const { data, error } = await supabase.from("Subscriptions").select();
    if (error) {
      console.error("Error fetching subscription data:", error);
      return;
    }
    setSubscriptions(data);
  };

  useEffect(() => {
    const loadSubscriptionData = async () => {
      await fetchSubscriptionData();
    };

    loadSubscriptionData();
  }, []);

  const visibleSubscriptions = useMemo(() => {
    if (selectedCategory === "All") return subscriptions;
    return subscriptions.filter(
      (sub) => sub["category_name"] === selectedCategory,
    );
  }, [subscriptions, selectedCategory]);

  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col gap-8">
      <section className="flex flex-col gap-">
        <h1 className="h1 text-light">Hello, User!</h1>
        <p className="text-accent-bg uppercase p">
          {subscriptions.length} Active . {formatDate(new Date())}
        </p>
      </section>
      <CalendarStrip date={new Date()} />
      <section className="flex flex-col gap-12 items-center">
        <div className="w-fit grid grid-cols-2 gap-2 place-items-center">
          <Card
            title="Daily"
            content={`₹${formatAmount(Number(findTotalAmount(subscriptions, "Daily")))}`}
            description={`at current spend`}
          />
          <Card
            title="Monthly Est."
            content={`₹${formatAmount(Number(findTotalAmount(subscriptions, "Monthly")))}`}
            description={`at current spend`}
          />
          {/*TODO: Add proper calculation for yearly estimate*/}
          <Card
            title="Yearly Est."
            content={`₹${formatAmount(Number(findTotalAmount(subscriptions, "Yearly")))}`}
            description="at current spend"
          />
          <Card
            title="Renewing Soon"
            content={`${findRenewingSoonCount(subscriptions)}`}
            description="within 7 days"
          />
        </div>
      </section>
      <div className="flex items-start gap-2 overflow-x-scroll">
        {categories.map((category) => (
          <Chip
            key={category.categoryname}
            label={category.categoryname}
            onClick={() => {
              setSelectedCategory(category.categoryname);
            }}
            selected={selectedCategory === category.categoryname}
          />
        ))}
      </div>
      <div className="flex flex-col gap-6 w-full">
        {visibleSubscriptions.length > 0 ? (
          visibleSubscriptions.map((subscription) => (
            <SubscriptionCard
              id={subscription["id"]}
              key={subscription["id"]}
              subscriptionName={subscription["subscription_name"]}
              categoryName={subscription["category_name"]}
              amount={subscription["amount"]}
              expiryDate={subscription["expiry_date"]}
              renewalDayOfMonth={subscription["renewal_day_of_month"]}
              renewalDate={subscription["renewal_date"]}
              frequency={subscription["frequency"]}
              priority={subscription["priority"]}
              onEdit={(id) => navigate(`/editSubscription/${id}`)}
              onDelete={async (id) => {
                const { error } = await supabase
                  .from("Subscriptions")
                  .delete()
                  .eq("id", id);
                if (error) console.error("Error deleting subscription:", error);
                await fetchSubscriptionData();
              }}
            />
          ))
        ) : (
          <h1 className="text-dark w-full text-center p-4 font-primary text-3xl font-semibold">
            No subscriptions found
          </h1>
        )}
      </div>
    </div>
  );
}

export default Hero;
