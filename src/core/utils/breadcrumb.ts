export const breadcrumbLoader = (key: string) => {
  return async () => ({ breadcrumb: key });
};
