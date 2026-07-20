import type { Route } from "@angular/router";
import { Episodes } from "./component/episodes/episodes";

export const EPISODES_ROUTES: Route[] = [
    {
        path: '',
        component: Episodes,
    },
];