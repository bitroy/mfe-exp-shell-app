import React from "react";
import { createRoot } from "react-dom/client";
import ErrorBoundary from "./components/ErrorBoundary";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { useRemoteComponent } from "./hooks/useRemoteComponent";
import "./index.css";

const App = () => {
	const {
		Component: TodoList,
		loading,
		error,
	} = useRemoteComponent("todoApp", "TodoList");

	if (loading) return <div>Loading remote…</div>;
	if (error) return <div>Error: {error.message}</div>;

	return (
		<>
			<Header />
			<main className="flex">
				<Sidebar />
				<div className="flex-1">
					<ErrorBoundary>{TodoList && <TodoList />}</ErrorBoundary>
				</div>
			</main>
			<Footer />
		</>
	);
};

createRoot(document.getElementById("root")).render(<App />);
