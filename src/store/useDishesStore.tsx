// useDishesStore.ts

import {create} from 'zustand';
import {Dish} from "@/types/api";
import {persist} from "zustand/middleware";


type DishState = {
    dishes: Dish[]
}


// export const useDishesStore = create<DishState>()(
//
// )


