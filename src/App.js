import { BrowserRouter as Router, Route, Routes, redirect } from "react-router-dom";
import { Provider, useDispatch, useSelector } from "react-redux";

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
import { useEffect } from "react";
import Api from "./shop/api";
import Utils from "./shop/share/Utils";
import { setAccount } from "./shop/share/slices/Account";
import { setIsAppLoading } from "./shop/share/slices/App";

import {
	Login as AdminLogin,
	Product as AdminProduct,
	Collection as AdminCollection,
	Dashboard,
	Order,
	User
} from "./admin/pages";
import { AdminLayout } from "./admin/components";

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
	{ id: 12, path: "/admin/login", Layout: ({ children }) => (children), Page: AdminLogin },
	{ id: 11, path: "/admin", Layout: AdminLayout, Page: Dashboard },
	{ id: 13, path: "/admin/collection", Layout: AdminLayout, Page: AdminCollection },
	{ id: 13, path: "/admin/order", Layout: AdminLayout, Page: Order },
	{ id: 13, path: "/admin/product", Layout: AdminLayout, Page: AdminProduct },
	{ id: 13, path: "/admin/user", Layout: AdminLayout, Page: User },
]

function App() {

	return (
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
				<AppStart />
			</Router>
		</Provider>
	);
}

const AppStart = () => {

	const dispatch = useDispatch();

	useEffect(() => {
		const rememberLogin = async () => {
			const { email, password } = JSON.parse(localStorage.getItem("account")) ?? {};
			if (email && password) {
				const response = await Api.auth.login({
					email,
					password
				});
				await Utils.wait(1000);
				if (response.result == Api.RESULT_CODE.SUCCESS) {
					Utils.global.accessToken = response.data.access_token;
					dispatch(setAccount(response.data.userInfo));
				}
			}
			dispatch(setIsAppLoading(false));
		}
		rememberLogin();
	}, []);

	return <></>;
}

export default App;
