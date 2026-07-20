import type { Route } from "@angular/router";
import { Planetes } from "./component/planetes/planetes";

export const PLANETES_ROUTES: Route[] = [
    {
        path: '',
        component: Planetes,
    },
];