import React from "react";
import SustainabilityList from "../../components/dashboard/SustainabilityList";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

export default function Sustainability() {
  return (
    <>
      <PageBreadcrumb pageTitle="Sostenibilità" />
      <SustainabilityList />
    </>
  );
}
