import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft02Icon, Search02Icon } from "@hugeicons/core-free-icons";
import SubscriptionCard from "../components/SubscriptionCard";
import Button from "../components/Button";
import EmptyState from "../components/EmptyState";
import LoadingState from "../components/LoadingState";
import { supabase } from "../../utils/supabase";
import { syncExpiredSubscriptions, sortByUrgencyAndPriority } from "../helper";

function AllSubscriptions() {
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(10);
  const [isLoading, setIsLoading] = useState(true);

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
    fetchSubscriptionData();
  }, []);

  const filteredSubscriptions = useMemo(() => {
    let filtered = subscriptions;
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((sub) =>
        (sub.subscription_name || sub.subscriptionName || "")
          .toLowerCase()
          .includes(query)
      );
    }
    return sortByUrgencyAndPriority(filtered);
  }, [subscriptions, searchQuery]);

  const displayedSubscriptions = useMemo(() => {
    return filteredSubscriptions.slice(0, visibleCount);
  }, [filteredSubscriptions, visibleCount]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 10);
  };

  return (
    <div className="w-full flex flex-col gap-8 pb-12">
      <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate("/")}>
        <HugeiconsIcon icon={ArrowLeft02Icon} className="text-accent w-8 h-8" />
        <h1 className="font-primary text-3xl font-semibold text-light">
          All Subscriptions
        </h1>
      </div>

      <div className="relative w-full">
        <HugeiconsIcon 
          icon={Search02Icon} 
          className="absolute left-4 top-1/2 -translate-y-1/2 text-accent-bg w-6 h-6" 
        />
        <input
          type="text"
          placeholder="Search subscriptions..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setVisibleCount(10); // Reset pagination on search
          }}
          className="w-full bg-dark-accent p-[1rem_1rem_1rem_3.5rem] border border-transparent rounded-[15px] text-light placeholder:text-accent-bg outline-none focus:border-accent transition-all duration-300"
        />
      </div>

      <div className="flex flex-col gap-6 w-full">
        {isLoading ? (
           <LoadingState />
        ) : displayedSubscriptions.length > 0 ? (
          <>
            {displayedSubscriptions.map((subscription) => (
              <SubscriptionCard
                id={subscription.id}
                key={subscription.id}
                isActive={subscription.is_active}
                subscriptionName={subscription.subscription_name}
                categoryName={subscription.category_name}
                amount={subscription.amount}
                expiryDate={subscription.expiry_date}
                renewalDayOfMonth={subscription.renewal_day_of_month}
                renewalDate={subscription.renewal_date}
                frequency={subscription.frequency}
                priority={subscription.priority}
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
            ))}
            
            {visibleCount < filteredSubscriptions.length && (
              <div className="w-full flex justify-center mt-2">
                <Button label="Load More" onClick={handleLoadMore} />
              </div>
            )}
          </>
        ) : (
          <EmptyState
            tagText={subscriptions.length === 0 ? "Empty Vault" : "No Matches"}
            title={subscriptions.length === 0 ? "All Clear" : "Nothing Found"}
            description={
              subscriptions.length === 0 
                ? "You haven't added any subscriptions yet."
                : "We couldn't find any subscriptions matching your search."
            }
          />
        )}
      </div>
    </div>
  );
}

export default AllSubscriptions;
