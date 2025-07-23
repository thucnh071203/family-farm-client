import React from "react";
import Header from "../../components/Header/Header";
import NavbarHeader from "../../components/Header/NavbarHeader";
import PayInvoiceComponent from "../../components/PaymentManagement/PaymentInvoiceCard";
import "../../styles/globals.css";
import "../../styles/styleguilde.css";

export default function PaymentInvoicePage() {
 return(
    <div className="PaymentInvoicePage">
        <Header />
        <NavbarHeader />
        <PayInvoiceComponent/>
    </div>
 )
}