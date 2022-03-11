import Vue from "vue";

import VueRouter from "vue-router";

// OTHER PAGES
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ExpendituresPage from "./pages/ExpendituresPage";
import TestPage from "./pages/TestPage";

// PRINCIPAL
import Principals from "./pages/Principals";

// MASTERFILES
import MasterCustomers from "./pages/MasterCustomers";
import MasterProducts from "./pages/MasterProducts";
import MasterPrincipals from "./pages/MasterPrincipals";

// ACCOUNT
import AccountPage from "./pages/AccountPage";
import ManageAccounts from "./pages/ManageAccounts";

// ERROR PAGES
import ErrorPage404 from "./pages/ErrorPages/ErrorPage404";


Vue.use(VueRouter);

const router = new VueRouter({
    mode: "history",
    routes: [

        // OTHER PAGES ===============================================
        {
            path: "/",
            component: HomePage,
            meta: {
                name: "Home"
            }
        },
        {
            path: "/about",
            component: AboutPage,
            meta: {
                name: "AboutPage"
            }
        },
        {
            path: "/expenditures",
            component: ExpendituresPage,
            meta: {
                name: "ExpendituresPage"
            }
        },
        {
            path: "/principals/:principal_id",
            component: Principals,
            meta: {
                name: "Principals"
            },
        },
        {
            path: "/test",
            component: TestPage,
            meta: {
                name: "TestPage"
            }
        },


        // MASTERFILES =========================================
        {
            path: "/master/customers",
            component: MasterCustomers,
            meta: {
                name: "Customers Masterfile"
            }
        },
        {
            path: "/master/products",
            component: MasterProducts,
            meta: {
                name: "Products Masterfile"
            }
        },
        {
            path: "/master/principals",
            component: MasterPrincipals,
            meta: {
                name: "Principals Masterfile"
            }
        },


        // ACCOUNT =============================================
        {
            path: "/manage-accounts",
            component: ManageAccounts,
            meta: {
                name: "Manage Accounts"
            }
        },
        {
            path: "/account",
            component: AccountPage,
            meta: {
                name: "Account"
            }
        },


        // ==========================================================================
        {
            path: "/:pathMatch(.*)*",
            component: ErrorPage404
        }
    ]
});


router.beforeEach((to, from, next) => {
    next();
})

export default router;
