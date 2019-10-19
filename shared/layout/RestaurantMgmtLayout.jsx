import React from 'react';

import { FadeInZoomAnimation } from 'shared/animations';
import { GridCol } from 'shared/layout/grid';
import SideNav from 'restmgmt/SideNav';

export const RestaurantMgmtLayout = ({header, sidebar, main}) => {
  const isSidebarPresent = !!sidebar;

  let sidebarM = isSidebarPresent ? 3 : 0,
      sidebarL = isSidebarPresent ? 4 : 0,
      mainM = isSidebarPresent ? 6 : 9,
      mainL = isSidebarPresent ? 8 : 12,
      sidebarContent = null;

  if (isSidebarPresent) {
    sidebarContent = (
      <GridCol s={4} m={sidebarM} l={sidebarL}>
        <aside className="rest-page__aside">
          {sidebar()}
        </aside>
      </GridCol>
    );
  }

  return (
      <div>
        {header()}
        <SideNav />
        <FadeInZoomAnimation>
          <section className="rest-page__container">
            {sidebarContent}
            <GridCol s={4} m={mainM} l={mainL}>
              <div className="rest-page__section rest-page__section--header">
                {main()}
              </div>
            </GridCol>
          </section>
        </FadeInZoomAnimation>
      </div>
  );
}

export default RestaurantMgmtLayout
