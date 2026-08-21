import { useEffect, useMemo, useState } from "react";
import {
  findRenewingSoonCount,
  findTotalAmount,
  formatAmount,
  formatDate,
  sortByUrgencyAndPriority,
  syncExpiredSubscriptions,
} from "../helper";
import Card from "../components/Card";
import Button from "../components/Button";
import EmptyState from "../components/EmptyState";
import LoadingState from "../components/LoadingState";
import { categories } from "../data";
import SubscriptionCard from "../components/SubscriptionCard";
import { supabase } from "../../utils/supabase";
import { useNavigate } from "react-router-dom";
import type { CategoryItem, CategoryName } from "../types";
import ChipContainer from "../components/ChipContainer";
import { useAuth } from "../context/AuthContext";

function Hero() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryName>("All");
  const [isLoading, setIsLoading] = useState(true);

  const { profile } = useAuth();

  const fetchSubscriptionData = async () => {
    setIsLoading(true);
    const { data, error } = await supabase.from("Subscriptions").select();
    if (error) {
      console.error("Error fetching subscription data:", error);
    } else if (data) {
      const syncedData = await syncExpiredSubscriptions(data);
      setSubscriptions(syncedData);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const loadSubscriptionData = async () => {
      await fetchSubscriptionData();
    };

    loadSubscriptionData();
  }, []);

  const visibleSubscriptions = useMemo(() => {
    // 1. Filter by selected category tab
    const filtered =
      selectedCategory === "All"
        ? subscriptions
        : subscriptions.filter(
            (sub) => sub["category_name"] === selectedCategory,
          );

    // 2. Sort by active status, priority (High > Med > Low), and urgency
    const sorted = sortByUrgencyAndPriority(filtered);

    // 3. Keep at most 5 subscriptions
    return sorted.slice(0, 5);
  }, [subscriptions, selectedCategory]);

  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col gap-8">
      <section className="flex flex-col gap-">
        <h1 className="h1 text-light">
          Hello, {profile?.first_name || "User"}!
        </h1>

        <p className="text-accent-bg uppercase p">{formatDate(new Date())}</p>
      </section>
      <section className="flex flex-col gap-12 items-center">
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-3">
          <Card
            title="This Month"
            content={`₹${formatAmount(Number(findTotalAmount(subscriptions, "Monthly")))}`}
            description={`${formatDate(new Date(), true)}`}
          />
          <Card
            title="Yearly Est."
            content={`₹${formatAmount(Number(findTotalAmount(subscriptions, "Yearly")))}`}
            description={`at current spend`}
            highlight={true}
          />
          <Card
            title="Active"
            content={`${subscriptions.filter((sub) => sub.is_active !== false && sub.isActive !== false).length}`}
            description="subscriptions"
          />
          <Card
            title="Renewing Soon"
            content={`${findRenewingSoonCount(subscriptions)}`}
            description="within 7 days"
          />
        </div>
      </section>
      <ChipContainer
        options={categories.map((category) => category.categoryname)}
        onChange={(selectedItem: string) => {
          setSelectedCategory(selectedItem as CategoryItem["categoryname"]);
        }}
        value={selectedCategory}
      />
      <div className="flex flex-col gap-6 w-full">
        {isLoading ? (
          <LoadingState
            message="Syncing vault..."
            descritpion="Retrieving your active subscriptions"
          />
        ) : visibleSubscriptions.length > 0 ? (
          <>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
              {visibleSubscriptions.map((subscription) => (
                <SubscriptionCard
                  id={subscription["id"]}
                  key={subscription["id"]}
                  isActive={subscription["is_active"]}
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
                    if (error)
                      console.error("Error deleting subscription:", error);
                    await fetchSubscriptionData();
                  }}
                />
              ))}
            </div>
            {visibleSubscriptions.length === 5 && (
              <div className="w-full flex justify-center mt-2">
                <Button
                  label="View All Subscriptions"
                  onClick={() => navigate("/subscriptions")}
                />
              </div>
            )}
          </>
        ) : (
          <EmptyVaultState />
        )}
      </div>
    </div>
  );
}

function EmptyVaultState() {
  const navigate = useNavigate();
  return (
    <EmptyState
      tagText="Empty Vault"
      title="All Clear"
      description="We couldn't find any subscriptions in this category. You're all caught up!"
      buttonLabel="+ Add New"
      buttonAction={() => navigate("/addSubscription")}
    />
  );
}

export default Hero;
