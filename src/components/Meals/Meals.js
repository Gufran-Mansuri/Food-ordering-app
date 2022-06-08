import React, {Fragment} from 'react';

import MealsSummary from './MealsSummary';
import AvailableMeals from './AvailbleMeals';

const Meals = () => {
    return(
        <Fragment>
            <MealsSummary />
            <AvailableMeals />
        </Fragment>
    )
};

export default Meals;