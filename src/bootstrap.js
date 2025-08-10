import React, { Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import "./index.css";
import ErrorBoundary from "./components/ErrorBoundary";

const TodoList = lazy(() => import("todoApp/TodoList"));

const App = () => {
	return (
		<>
			<Header />
			<main className="flex">
				<Sidebar />
				<div className="flex-1">
					<Suspense fallback={<div>Loading...</div>}>
						<ErrorBoundary>
							<TodoList />
						</ErrorBoundary>
					</Suspense>
				</div>
			</main>
			<Footer />
		</>
	);
};

const root = createRoot(document.getElementById("root"));
root.render(<App />);
