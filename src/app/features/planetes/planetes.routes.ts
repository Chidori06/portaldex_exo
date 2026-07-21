import type { Route } from "@angular/router";
import { Planetes } from "./pages/planetes/planetes";

export const PLANETES_ROUTES: Route[] = [
    {
        path: '',
        component: Planetes,
    },
];