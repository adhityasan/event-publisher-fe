declare namespace Layout {
  type names = 'public-user' | 'registered-user' | 'event-organizer' | 'plain';
}
declare interface IRouteProps {
  path: string;
  component: any;
  exact: boolean;
  strict: boolean;
  auth: boolean;
  layout: Layout.names;
  restricted?: boolean;
}
