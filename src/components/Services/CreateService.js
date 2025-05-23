import React from "react";
import ProgressNav from "../ProgressNav/ProgressNav";
import CreateServiceForm from "./CreateServiceForm";
import RecentServiceList from "./RecentServiceList";

export default function CreateService() {
  return (
    <div className="progress-management pt-16 h-full">
      <div className="max-w-7xl mx-auto">
        <ProgressNav />
        <div className="mt-10 w-full space-x-6 grid grid-cols-[2fr_5fr]">
            <RecentServiceList />
            <CreateServiceForm />
        </div>
      </div>
    </div>
  );
}