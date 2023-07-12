import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider, useSelector } from "react-redux";

import ShopLayout from "./shop/components/ShopLayout";
import {
	Home,
	Account,
	Cart,
	CheckOut,
	Collection,
	Login,
	Product,
	Register,
	Search
} from "./shop/pages";
import store from "./shop/share/Store";

const pages = [
	{ id: 0, path: "/", Layout: ShopLayout, Page: Home },
	{ id: 1, path: "/product", Layout: ShopLayout, Page: Product },
	{ id: 2, path: "/login", Layout: ShopLayout, Page: Login },
	{ id: 3, path: "/register", Layout: ShopLayout, Page: Register },
	{ id: 4, path: "/collection", Layout: ShopLayout, Page: Collection },
	{ id: 5, path: "/collection/:collection", Layout: ShopLayout, Page: Collection },
	{ id: 6, path: "/cart", Layout: ShopLayout, Page: Cart },
	{ id: 7, path: "/search", Layout: ShopLayout, Page: Search },
	{ id: 8, path: "/checkout", Layout: ShopLayout, Page: CheckOut },
	{ id: 9, path: "/account", Layout: ShopLayout, Page: Account, requireLogin: true },
	{ id: 10, path: "/account/:type", Layout: ShopLayout, Page: Account, requireLogin: true },
]

function App() {
	return (
		<>
			<Provider store={store}>
				<Router>
					<Routes>
						{pages.map(({ id, path, requireLogin, Layout, Page }) => (
							<Route
								key={id}
								path={path}
								element={
									<Layout
										requireLogin={requireLogin}>
										<Page />
									</Layout>
								} />
						))}
					</Routes>
				</Router>
			</Provider>

		</>
	);
}

export default App;
