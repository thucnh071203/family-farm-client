import React, { createContext, useContext, useEffect, useState } from "react";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

const SignalRContext = createContext();

export const SignalRProvider = ({ children }) => {
    const [connection, setConnection] = useState(null);
    const currentUserId = localStorage.getItem("accId") || sessionStorage.getItem("accId");

    useEffect(() => {
        if (!currentUserId) return;

        const newConnection = new HubConnectionBuilder()
            .withUrl(`https://localhost:7280/chatHub?accId=${currentUserId}`, {
                accessTokenFactory: () => localStorage.getItem("token"),
            })
            .configureLogging(LogLevel.Information)
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);

        return () => {
            if (newConnection) {
                newConnection.stop().catch((err) => console.error("Error stopping SignalR:", err));
            }
        };
    }, [currentUserId]);

    useEffect(() => {
        if (connection) {
            if (connection.state === "Disconnected") {
                console.log("Starting SignalR connection...");
                connection
                    .start()
                    .then(() => {
                        console.log("SignalR Connected");
                    })
                    .catch((err) => {
                        console.error("SignalR Connection Error:", err);
                    });
            }

            // Handle reconnection events
            connection.onreconnecting((err) => {
                console.warn("SignalR Reconnecting:", err);
            });

            connection.onreconnected(() => {
                console.log("SignalR Reconnected");
            });

            return () => {
                connection.off("ReceiveMessage");
                connection.off("MessageSeen");
                connection.off("ChatRecalled");
                connection.off("ChatHistoryDeleted");
            };
        }
    }, [connection]);

    return (
        <SignalRContext.Provider value={{ connection, currentUserId }}>
            {children}
        </SignalRContext.Provider>
    );
};

export const useSignalR = () => useContext(SignalRContext);