import React from "react";
import ProcessNav from "../ProcessNav/ProcessNav";
import CreateServiceForm from "./CreateServiceForm";
import RecentServiceList from "./RecentServiceList";
import PopularService from "./PopularService";

export default function CreateService() {
  return (
    <div className="progress-management pt-16 h-full">
      <div className="max-w-7xl mx-auto">
        <ProcessNav />
        <div className="mt-10 w-full space-x-6 grid grid-cols-[2fr_5fr]">
            {/* <RecentServiceList /> */}
            <PopularService/>
            <CreateServiceForm />
        </div>
      </div>
    </div>
  );
}