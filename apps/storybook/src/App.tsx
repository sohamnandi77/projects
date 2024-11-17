import React, { Key } from "react";

import {
  BreadcrumbItem,
  BreadcrumbLink,
  Breadcrumbs,
  BreadcrumbSeparator,
} from "@projects/ui/breadcrumbs";

export function BreadcrumbsItems() {
  let [breadcrumbs, setBreadcrumbs] = React.useState([
    { id: 1, label: "Home" },
    { id: 2, label: "Trendy" },
    { id: 3, label: "March 2022 Assets" },
  ]);

  let navigate = (id: Key) => {
    let i = breadcrumbs.findIndex((item) => item.id === id);
    setBreadcrumbs(breadcrumbs.slice(0, i + 1));
  };

  return (
    <Breadcrumbs items={breadcrumbs} onAction={navigate}>
      {(item) => (
        <BreadcrumbItem className="last:font-normal last:text-foreground last:[&>span]:last:hidden">
          <BreadcrumbLink>{item.label}</BreadcrumbLink>
          <BreadcrumbSeparator />
        </BreadcrumbItem>
      )}
    </Breadcrumbs>
  );
}

function App() {
  return <BreadcrumbsItems />;
}

export default App;
