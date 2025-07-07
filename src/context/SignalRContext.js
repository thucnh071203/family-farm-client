import React, { createContext, useContext, useEffect, useState } from "react";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

const SignalRContext = createContext();

export const SignalRProvider = ({ children }) => {
    const [connection, setConnection] = useState(null);
    const currentUserId = localStorage.getItem("accId") || sessionStorage.getItem("accId");

    useEffect(() => {
        if (!currentUserId) {
            console.warn("No currentUserId, SignalR connection will not be established");
            return;
        }

        const newConnection = new HubConnectionBuilder()
            .withUrl(`${process.env.REACT_APP_API_BASE_URL}/chatHub?accId=${currentUserId}`, {
                accessTokenFactory: () => localStorage.getItem("token"),
            })
            .configureLogging(LogLevel.Information)
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);

        newConnection
            .start()
            .then(() => {
                console.log("SignalR Connected");
            })
            .catch((err) => {
                console.error("SignalR Connection Error:", err);
            });

        newConnection.onreconnecting((err) => {
            console.warn("SignalR Reconnecting:", err);
        });

        newConnection.onreconnected(() => {
            console.log("SignalR Reconnected");
        });

        return () => {
            if (newConnection) {
                newConnection.stop().catch((err) => console.error("Error stopping SignalR:", err));
            }
        };
    }, [currentUserId]);

    return (
        <SignalRContext.Provider value={{ connection, currentUserId }}>
            {children}
        </SignalRContext.Provider>
    );
};

export const useSignalR = () => useContext(SignalRContext);