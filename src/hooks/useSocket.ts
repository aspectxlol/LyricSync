import { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

export const useSocket = (options = {}) => {
  const socketRef = useRef<Socket>(io('localhost:3000/', options));
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");

  useEffect(() => {
    console.log(isConnected)
  }, [isConnected])

  useEffect(() => {
    socketRef.current.on("connect", () => {
      setIsConnected(true);
      setTransport(socketRef.current.io.engine.transport.name);
    });

    socketRef.current.on("disconnect", () => {
      setIsConnected(false);
      setTransport("N/A");
    });

    // Handle transport upgrades
    socketRef.current.io.engine.on("upgrade", (transport) => {
      setIsConnected(true)
      setTransport(transport.name);
    });

    // Cleanup function to disconnect socket on unmount and prevent memory leaks
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current.removeAllListeners();
      }
    };
  }, [options]); // Only recreate socket on URL or options change
  // Return values relevant for component usage
  return { isConnected, transport, socket: socketRef.current };
};