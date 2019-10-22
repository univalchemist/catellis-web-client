import React from 'react';

import { FadeInZoomAnimation } from 'shared/animations';
import { GridCol, GridRow } from 'shared/layout/grid';
import SideNav from 'restmgmt/SideNav';

export const RestaurantMgmtLayoutAlt = ({header, main}) => (
  <div>
    {header()}
    <SideNav />
    <FadeInZoomAnimation>
      <section className="rest-page__container">
        <GridRow>
          <GridCol s={4} m={9} l={12}>
            <div className="rest-page__section rest-page__section--header">
              {main()}
            </div>
          </GridCol>
        </GridRow>
      </section>
    </FadeInZoomAnimation>
  </div>
);

export default RestaurantMgmtLayoutAlt
