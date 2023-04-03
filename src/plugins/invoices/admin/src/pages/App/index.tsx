/**
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from "react";
import { Switch, Route } from "react-router-dom";
import { NotFound } from "@strapi/helper-plugin";
import pluginId from "../../pluginId";
import HomePage from "../HomePage";
import Month from "../InvoicesPerMonth";
import "../../style/tailwind.min.css";
import AffiliateSites from "../AffiliateSites";

const App = () => {
  return (
    <div>
      <Switch>
        <Route path={`/plugins/${pluginId}/home`} component={HomePage} exact />
        <Route
          path={`/plugins/${pluginId}/home/month/:id`}
          component={Month}
          exact
        />
        <Route
          path={`/plugins/${pluginId}/revenue-issues`}
          component={() => Month({ revenueIssue: true })}
          exact
        />
        <Route
          path={`/plugins/${pluginId}/affiliate-sites`}
          component={AffiliateSites}
          exact
        />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default App;
