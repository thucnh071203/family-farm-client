import React from "react";
import ProcessNav from "../ProcessNav/ProcessNav";
import EditServiceForm from "./EditServiceForm";
import RecentServiceList from "./RecentServiceList";

export default function EditService() {
  return (
    <div className="progress-management pt-16 h-full">
      <div className="max-w-7xl mx-auto">
        <ProcessNav />
        <div className="mt-10 w-full space-x-6 grid grid-cols-[2fr_5fr]">
            <RecentServiceList />
            <EditServiceForm />
        </div>
      </div>
    </div>
  );
}