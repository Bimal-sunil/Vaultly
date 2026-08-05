import React from "react";
import { useNavigate } from "react-router-dom";
import EmptyState from "../components/EmptyState";

function NotFound() {
  const navigate = useNavigate();

  return (
    <EmptyState
      tagText="404 • Page Not Found"
      title="404"
      subtitle="Lost in the Vault?"
      description="The subscription or page you are looking for has vanished into thin air, was deleted, or never existed."
      buttonLabel="Go Home"
      buttonAction={() => navigate("/")}
      is404={true}
    />
  );
}

export default NotFound;
