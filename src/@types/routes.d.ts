declare interface IRouteProps {
  path: string;
  component: any;
  exact: boolean;
  strict: boolean;
  auth: boolean;
  layout: Layout.names;
  restricted?: boolean;
}
