export enum THEMES {
  DEFAULT = 'DEFAULT',
  DARK = 'DARK',
  LIGHT = 'LIGHT',
  BLUE = 'BLUE',
  GREEN = 'GREEN',
  INDIGO = 'INDIGO',
}

export enum STORES {
  TOASTER = 'toaster',
  HANDLING = 'handling',
  USER = 'user', // account information
  ATTENDANCES = 'attendances',
  DISCOVERIES = 'discoveries',
  OPPORTUNITIES = 'opportunities',
  REALIZERS = 'realizers',
  TRAININGS = 'trainings',
  VISITORS = 'visitors',
  BADGES = 'badges',
  TRENDS = 'trends',
  USERS = 'users',
}

export enum URLS {
  SignIn = '/wp-json/jwt-auth/v1/token',
  User = '/wp-json/wp/v2/users',
  ResetPassword = '/wp-json/bdpwr/v1/',
  DiscoverySubmit = '/wp-json/business-discovery/v1/handle',
  DiscoverySummary = '/wp-json/business-discovery/v1/summary',
  OpportunitySubmit = '/wp-json/business-opportunity/v1/handle',
  OpportunitySummary = '/wp-json/business-opportunity/v1/summary',
  ValueRealisedSubmit = '/wp-json/business-value-realised/v1/handle',
  ValueRealisedSummary = '/wp-json/business-value-realised/v1/summary',
  VisitorSubmit = '/wp-json/visitor/v1/handle',
  VisitorSummary = '/wp-json/visitor/v1/summary',
}
